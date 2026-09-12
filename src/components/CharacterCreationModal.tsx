'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  CharacterConfig,
  CharacterClass,
  AvatarStyle,
  CharacterGender,
  SpritePartsConfig,
} from '@/lib/types';
import {
  generateProceduralSprite,
  generateAvatarFromPhoto,
  HERO_PRESETS,
  HeroPreset,
} from '@/lib/photoGenerator';
import { soundEngine } from '@/lib/sound';
import {
  X,
  Sparkles,
  Camera,
  Upload,
  RefreshCw,
  User,
  Shield,
  Wand2,
  Check,
  Palette,
  Crown,
  Flame,
  Swords,
  ChevronRight,
} from 'lucide-react';

interface CharacterCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCharacter: CharacterConfig;
  onCharacterSaved: () => void;
}

export function CharacterCreationModal({
  isOpen,
  onClose,
  currentCharacter,
  onCharacterSaved,
}: CharacterCreationModalProps) {
  const [activeTab, setActiveTab] = useState<'PHOTO' | 'ROSTER' | 'STUDIO'>('ROSTER');

  // Character Details
  const [name, setName] = useState(currentCharacter.name);
  const [charClass, setCharClass] = useState<CharacterClass>(currentCharacter.class);
  const [gender, setGender] = useState<CharacterGender>(currentCharacter.gender || 'FEMALE');
  const [title, setTitle] = useState(currentCharacter.title);

  // Photo Generator State
  const [photoSrc, setPhotoSrc] = useState<string | null>(currentCharacter.sourcePhotoUrl || null);
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>(currentCharacter.generationStyle || 'ANIME_LEGEND');
  const [seed, setSeed] = useState<number>(currentCharacter.generationSeed || 1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPhotoAvatar, setGeneratedPhotoAvatar] = useState<string | null>(
    currentCharacter.avatarType === 'PHOTO_GENERATED' ? currentCharacter.avatarUrl : null
  );
  const [uniqueHeroData, setUniqueHeroData] = useState<{
    uniqueTitle: string;
    uniqueClass: string;
    heroId: string;
  } | null>(null);

  // Sprite Studio State
  const [spriteParts, setSpriteParts] = useState<SpritePartsConfig>(
    currentCharacter.spriteParts || {
      gender: 'FEMALE',
      body: 'fair',
      hair: 'twin_braids',
      hairColor: '#f59e0b',
      outfit: 'valkyrie_plate',
      outfitColor: '#cbd5e1',
      weapon: 'spear',
      aura: 'holy',
    }
  );
  const [generatedSpriteAvatar, setGeneratedSpriteAvatar] = useState<string>('');

  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Re-generate sprite
  useEffect(() => {
    const svgUrl = generateProceduralSprite({ ...spriteParts, gender }, charClass);
    setGeneratedSpriteAvatar(svgUrl);
  }, [spriteParts, charClass, gender]);

  // Run photo transformation
  const runPhotoGeneration = async (source: string, style: AvatarStyle, genSeed: number) => {
    try {
      setIsGenerating(true);
      const res = await generateAvatarFromPhoto(source, style, genSeed);
      setGeneratedPhotoAvatar(res.avatarUrl);
      setUniqueHeroData({
        uniqueTitle: res.uniqueTitle,
        uniqueClass: res.uniqueClass,
        heroId: res.heroId,
      });
      setTitle(res.uniqueTitle);
      setCharClass('PHOTO_AVATAR');
    } catch (err) {
      console.error('Photo generation failed', err);
      soundEngine.playError();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPhotoSrc(dataUrl);
      runPhotoGeneration(dataUrl, selectedStyle, seed);
      soundEngine.playTaskComplete();
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (preset: HeroPreset) => {
    soundEngine.playEquip();
    setName(preset.name);
    setCharClass(preset.class);
    setGender(preset.gender);
    setTitle(preset.title);
    setSpriteParts(preset.parts);
    setGeneratedPhotoAvatar(null);
  };

  const handleSaveCharacter = async () => {
    try {
      setIsSaving(true);
      const avatarType = activeTab === 'PHOTO' && generatedPhotoAvatar ? 'PHOTO_GENERATED' : 'SPRITE';
      const avatarUrl = avatarType === 'PHOTO_GENERATED' ? generatedPhotoAvatar! : generatedSpriteAvatar;

      const payload: CharacterConfig = {
        name,
        class: charClass,
        gender,
        title,
        avatarUrl,
        avatarType,
        spriteParts: avatarType === 'SPRITE' ? spriteParts : undefined,
        sourcePhotoUrl: avatarType === 'PHOTO_GENERATED' ? photoSrc || undefined : undefined,
        generationStyle: avatarType === 'PHOTO_GENERATED' ? selectedStyle : undefined,
        generationSeed: avatarType === 'PHOTO_GENERATED' ? seed : undefined,
        uniqueHeroId: uniqueHeroData?.heroId,
      };

      const res = await fetch('/api/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save character');

      soundEngine.playLevelUp();
      onCharacterSaved();
      onClose();
    } catch (err) {
      console.error(err);
      soundEngine.playError();
      alert('Failed to save character');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const stylesList: Array<{ id: AvatarStyle; label: string; icon: string }> = [
    { id: 'ANIME_LEGEND', label: 'Anime Cel-Shaded', icon: '🌸' },
    { id: 'PIXEL_HERO', label: '16-Bit Retro Pixel', icon: '👾' },
    { id: 'CYBER_ROGUE', label: 'Cyberpunk 2077', icon: '🤖' },
    { id: 'HOLY_PALADIN', label: 'Gilded Paladin', icon: '⚔️' },
    { id: 'MYSTIC_ARCANE', label: 'Mystic Arcane', icon: '🔮' },
    { id: 'CELESTIAL_ASTRAL', label: 'Celestial Astral', icon: '✨' },
    { id: 'SHADOW_ASSASSIN', label: 'Dark Souls Noir', icon: '📜' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md animate-in fade-in">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-800 bg-slate-950/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                Character Studio &amp; AI Photo Forge
              </h2>
              <p className="text-xs text-slate-400">
                Choose from female &amp; male legendary heroes, or transform your photo into a 100% unique RPG warrior!
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setActiveTab('ROSTER')}
              className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 ${
                activeTab === 'ROSTER'
                  ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <Crown className="h-4 w-4" />
              Hero Roster (Female &amp; Male)
            </button>
            <button
              onClick={() => setActiveTab('PHOTO')}
              className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 ${
                activeTab === 'PHOTO'
                  ? 'bg-purple-600 text-white shadow-glow-xp'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <Camera className="h-4 w-4" />
              Upload Photo &amp; RPG AI
            </button>
            <button
              onClick={() => setActiveTab('STUDIO')}
              className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 ${
                activeTab === 'STUDIO'
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <Palette className="h-4 w-4" />
              Custom Sprite Builder
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Identity Bar (Name, Title, Class) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-950/50">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Hero Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Hero Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-amber-300 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Class Archetype
              </label>
              <input
                type="text"
                disabled
                value={charClass}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-mono font-bold text-purple-300"
              />
            </div>
          </div>

          {/* TAB 1: HERO ROSTER (FEMALE & MALE PRESETS) */}
          {activeTab === 'ROSTER' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Crown className="h-4 w-4 text-amber-400" />
                  Select a Pre-Forged Hero (8 Archetypes)
                </h3>
                <span className="text-[11px] font-bold text-emerald-400">
                  Female Warriors Included ✓
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {HERO_PRESETS.map((preset) => {
                  const isSelected = name === preset.name;
                  const previewSvg = generateProceduralSprite(preset.parts, preset.class);

                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`cursor-pointer flex flex-col justify-between rounded-2xl border p-3.5 transition group ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/15 shadow-glow-gold scale-[1.02]'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        {/* Avatar Image */}
                        <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-slate-800 bg-slate-950 shadow-md group-hover:scale-105 transition">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={previewSvg} alt={preset.name} className="h-full w-full object-cover" />
                          <span className={`absolute bottom-1 right-1 rounded-full px-1.5 py-0.2 text-[8px] font-black uppercase tracking-wider ${
                            preset.gender === 'FEMALE' ? 'bg-pink-600 text-white' : 'bg-blue-600 text-white'
                          }`}>
                            {preset.gender}
                          </span>
                        </div>

                        <h4 className="text-xs font-black text-white mt-2.5">{preset.name}</h4>
                        <span className="text-[10px] font-bold text-amber-400 font-mono">{preset.class}</span>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{preset.description}</p>
                      </div>

                      <button
                        className={`w-full mt-3 rounded-xl py-1 text-xs font-black uppercase tracking-wider transition ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Choose Hero'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD PHOTO & RPG AI FORGE */}
          {activeTab === 'PHOTO' && (
            <div className="space-y-6">
              {/* Unique Guarantee Banner */}
              <div className="rounded-2xl border border-purple-500/40 bg-purple-950/30 p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/30 text-purple-300">
                  <Wand2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white flex items-center gap-2">
                    100% Unique Character Guarantee
                    <span className="rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5">
                      Unique DNA
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your photo is analyzed for skin tone, contour, and palette. It generates a bespoke RPG warrior that will never duplicate any other player or default character!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Upload Area & Controls (6 cols) */}
                <div className="lg:col-span-6 space-y-4">
                  {/* File Upload Box */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-2xl p-6 text-center bg-slate-950/60 transition group flex flex-col items-center justify-center"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="h-10 w-10 text-slate-500 group-hover:text-purple-400 transition mb-2" />
                    <h5 className="text-xs font-black text-white">Click or Drag &amp; Drop Photo</h5>
                    <p className="text-[10px] text-slate-400 mt-1">Upload a portrait, selfie, or avatar (PNG, JPG)</p>
                  </div>

                  {/* Art Styles Grid */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Select RPG Transformation Style
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {stylesList.map((st) => (
                        <button
                          key={st.id}
                          onClick={() => {
                            setSelectedStyle(st.id);
                            if (photoSrc) runPhotoGeneration(photoSrc, st.id, seed);
                          }}
                          className={`rounded-xl border p-2 text-left transition flex items-center gap-2 ${
                            selectedStyle === st.id
                              ? 'border-purple-500 bg-purple-500/20 text-white font-bold shadow-glow-xp'
                              : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-base">{st.icon}</span>
                          <span className="text-[11px] truncate">{st.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seed Reroll Button */}
                  <button
                    onClick={() => {
                      const newSeed = Math.floor(Math.random() * 999999);
                      setSeed(newSeed);
                      if (photoSrc) runPhotoGeneration(photoSrc, selectedStyle, newSeed);
                      soundEngine.playCoin();
                    }}
                    disabled={!photoSrc || isGenerating}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>Re-Roll Unique RPG Variations</span>
                  </button>
                </div>

                {/* Right: Generated Result Preview (6 cols) */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center">
                  <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-2 border-amber-400/80 bg-slate-950 shadow-glow-gold flex items-center justify-center">
                    {isGenerating ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
                        <span className="text-[10px] font-bold text-purple-300">Forging RPG Likeness...</span>
                      </div>
                    ) : generatedPhotoAvatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={generatedPhotoAvatar} alt="Photo RPG" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-slate-500 p-4">
                        <Camera className="h-10 w-10 mb-2 opacity-50" />
                        <span className="text-xs font-bold">No photo uploaded yet</span>
                        <span className="text-[10px] text-slate-600 mt-1">Upload a photo to generate your unique warrior</span>
                      </div>
                    )}
                  </div>

                  {uniqueHeroData && (
                    <div className="mt-4 p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-left w-full max-w-xs animate-in fade-in">
                      <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-1">
                        <span>{uniqueHeroData.heroId}</span>
                        <span className="font-bold">VERIFIED UNIQUE</span>
                      </div>
                      <h5 className="text-xs font-black text-white">{name || 'Your Hero'}</h5>
                      <p className="text-[11px] text-amber-300 font-bold">{uniqueHeroData.uniqueTitle}</p>
                      <p className="text-[10px] text-slate-400">{uniqueHeroData.uniqueClass}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MODULAR SPRITE BUILDER */}
          {activeTab === 'STUDIO' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Gender Toggle */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Gender Identity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['FEMALE', 'MALE', 'NON_BINARY'] as CharacterGender[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          setGender(g);
                          setSpriteParts((prev) => ({ ...prev, gender: g }));
                        }}
                        className={`rounded-xl py-1.5 text-xs font-bold transition ${
                          gender === g
                            ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {g === 'FEMALE' ? '🌸 Female' : g === 'MALE' ? '⚔️ Male' : '⚡ Android'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hairstyle */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Hairstyle (Female &amp; Male)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'twin_braids', label: 'Twin Braids' },
                      { id: 'odango_buns', label: 'Odango Buns' },
                      { id: 'flowing_waves', label: 'Long Waves' },
                      { id: 'side_bob', label: 'Side Bob' },
                      { id: 'high_ponytail', label: 'High Ponytail' },
                      { id: 'spiky', label: 'Spiky Blade' },
                      { id: 'short', label: 'Short Crop' },
                      { id: 'long', label: 'Sage Long' },
                    ].map((h) => (
                      <button
                        key={h.id}
                        onClick={() => setSpriteParts((prev) => ({ ...prev, hair: h.id }))}
                        className={`rounded-xl p-1.5 text-center text-xs font-bold transition ${
                          spriteParts.hair === h.id
                            ? 'bg-purple-600 text-white shadow-glow-xp'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {h.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Outfit */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Armor &amp; Attire
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'valkyrie_plate', label: 'Valkyrie Armor' },
                      { id: 'sorceress_dress', label: 'Sorceress Gown' },
                      { id: 'huntress_leather', label: 'Huntress Mantle' },
                      { id: 'kunoichi_suit', label: 'Shinobi Suit' },
                      { id: 'plate', label: 'Heavy Plate' },
                      { id: 'cyber', label: 'Cyber Nanotech' },
                    ].map((o) => (
                      <button
                        key={o.id}
                        onClick={() => setSpriteParts((prev) => ({ ...prev, outfit: o.id }))}
                        className={`rounded-xl p-1.5 text-center text-xs font-bold transition ${
                          spriteParts.outfit === o.id
                            ? 'bg-purple-600 text-white shadow-glow-xp'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weapon */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Weapon Loadout
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'spear', label: 'Valkyrie Spear' },
                      { id: 'dual_sabers', label: 'Dual Sabers' },
                      { id: 'katana', label: 'Shadow Katana' },
                      { id: 'bow', label: 'Moon Bow' },
                      { id: 'staff', label: 'Arcane Staff' },
                      { id: 'sword', label: 'Broadsword' },
                      { id: 'daggers', label: 'Twin Daggers' },
                    ].map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setSpriteParts((prev) => ({ ...prev, weapon: w.id }))}
                        className={`rounded-xl p-1.5 text-center text-xs font-bold transition ${
                          spriteParts.weapon === w.id
                            ? 'bg-purple-600 text-white shadow-glow-xp'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aura */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Elemental Aura
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'sakura', label: '🌸 Sakura' },
                      { id: 'celestial', label: '✨ Celestial' },
                      { id: 'holy', label: '👑 Holy' },
                      { id: 'fire', label: '🔥 Fire' },
                      { id: 'arcane', label: '🔮 Arcane' },
                      { id: 'lightning', label: '⚡ Lightning' },
                      { id: 'shadow', label: '🌑 Shadow' },
                    ].map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setSpriteParts((prev) => ({ ...prev, aura: a.id }))}
                        className={`rounded-xl p-1.5 text-center text-xs font-bold transition ${
                          spriteParts.aura === a.id
                            ? 'bg-purple-600 text-white shadow-glow-xp'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Preview (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center">
                <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-2 border-amber-400/80 bg-slate-950 shadow-glow-gold">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={generatedSpriteAvatar} alt="Sprite Preview" className="h-full w-full object-cover" />
                </div>
                <h4 className="text-sm font-black text-white mt-3">{name || 'Hero'}</h4>
                <p className="text-xs text-amber-300 font-bold">{title}</p>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                  {gender} • {charClass}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 bg-slate-950/80 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveCharacter}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 text-xs font-black text-white shadow-glow-xp hover:from-purple-500 hover:to-indigo-500 active:scale-95 transition disabled:opacity-50"
          >
            <Check className="h-4 w-4" />
            <span>{isSaving ? 'Awakening Hero...' : 'Confirm & Save Hero'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}