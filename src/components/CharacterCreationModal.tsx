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
  Crown,
  Palette,
  Wand2,
  Check,
  Shield,
  Zap,
  Flame,
  Target,
  Crosshair,
  Dices,
} from 'lucide-react';
import { getRandomNameAndTitle, HERO_RANDOM_NAMES } from '@/lib/nameGenerator';

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
  const [activeTab, setActiveTab] = useState<'ROSTER' | 'PHOTO' | 'STUDIO'>('ROSTER');
  const [rosterFilter, setRosterFilter] = useState<'ALL' | 'FREE_FIRE' | 'PUBG' | 'SOLO_LEVELING' | 'FEMALE' | 'MALE'>('ALL');

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
      hair: 'kelly_freefire',
      hairColor: '#fbbf24',
      outfit: 'kelly_tracksuit',
      outfitColor: '#eab308',
      weapon: 'dual_sabers',
      aura: 'phoenix_blaze',
    }
  );
  const [generatedSpriteAvatar, setGeneratedSpriteAvatar] = useState<string>('');

  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Re-generate sprite preview
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
      const src = event.target?.result as string;
      setPhotoSrc(src);
      runPhotoGeneration(src, selectedStyle, seed);
      soundEngine.playCritStrike();
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (preset: HeroPreset, rollRandom: boolean = false) => {
    soundEngine.playEquip();
    if (rollRandom) {
      const generated = getRandomNameAndTitle(preset.id, preset.class);
      setName(generated.name);
      setTitle(generated.title);
    } else {
      setName(preset.name);
      setTitle(preset.title);
    }
    setCharClass(preset.class);
    setGender(preset.gender);
    setSpriteParts(preset.parts);
    setGeneratedPhotoAvatar(null);
  };

  const handleRandomizeCurrentName = () => {
    soundEngine.playEquip();
    const activePreset = HERO_PRESETS.find(
      (p) => p.name.toLowerCase() === name.toLowerCase() || p.class === charClass
    );
    const generated = getRandomNameAndTitle(activePreset?.id, charClass, name);
    setName(generated.name);
    setTitle(generated.title);
  };

  const handleSaveCharacter = async () => {
    try {
      setIsSaving(true);
      const avatarType = activeTab === 'PHOTO' && generatedPhotoAvatar ? 'PHOTO_GENERATED' : 'SPRITE';
      const activePreset = HERO_PRESETS.find((p) => p.name === name);
      const avatarUrl =
        activeTab === 'PHOTO' && generatedPhotoAvatar
          ? generatedPhotoAvatar!
          : activePreset?.portraitUrl || generatedSpriteAvatar;

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
        gameOrigin: activePreset ? activePreset.gameInspiration : undefined,
        abilityName: activePreset ? activePreset.ability.name : undefined,
        abilityBuff: activePreset ? activePreset.ability.buffText : undefined,
        humanSpecs: activePreset ? activePreset.humanSpecs : undefined,
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

  const stylesList: Array<{ id: AvatarStyle; label: string; icon: string; tag: string }> = [
    { id: 'ANIME_LEGEND', label: 'Free Fire Cel-Shaded', icon: '🔥', tag: 'Battle Royale' },
    { id: 'SHADOW_ASSASSIN', label: 'PUBG Tactical Noir', icon: '🪖', tag: 'Military Camo' },
    { id: 'CYBER_ROGUE', label: 'Cyberpunk 2077 Neon', icon: '⚡', tag: 'Neon Hacker' },
    { id: 'HOLY_PALADIN', label: 'Golden Pharaoh X-Suit', icon: '👑', tag: 'Mythic Gold' },
    { id: 'CELESTIAL_ASTRAL', label: 'Astral Apex God', icon: '✨', tag: 'Cosmic Sky' },
    { id: 'MYSTIC_ARCANE', label: 'Soundwave Cyber Beat', icon: '🎧', tag: 'Audio Wave' },
    { id: 'PIXEL_HERO', label: '16-Bit Retro Shooter', icon: '👾', tag: 'Classic 16-Bit' },
  ];

  const demoPhotos = [
    { label: 'Free Fire Kelly', desc: 'Awakened Phoenix', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=360&auto=format&fit=crop&q=80' },
    { label: 'PUBG Lone Survivor', desc: 'Level 3 Spetsnaz', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=360&auto=format&fit=crop&q=80' },
    { label: 'DJ Alok Beat', desc: 'Soundwave Maestro', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=360&auto=format&fit=crop&q=80' },
    { label: 'Valkyrie Sniper', desc: 'AWM Ghost Queen', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=360&auto=format&fit=crop&q=80' },
  ];

  const filteredPresets = HERO_PRESETS.filter((preset) => {
    if (rosterFilter === 'ALL') return true;
    if (rosterFilter === 'FEMALE') return preset.gender === 'FEMALE';
    if (rosterFilter === 'MALE') return preset.gender === 'MALE';
    return preset.gameInspiration === rosterFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md animate-in fade-in">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-800 bg-slate-950/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 text-slate-950 shadow-glow-gold">
              <Crosshair className="h-6 w-6 text-slate-950 animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                Battle Royale Hero Sanctum (Free Fire &amp; PUBG Legends)
              </h2>
              <p className="text-xs text-slate-400">
                Play as famous heroes inspired by Free Fire, PUBG Mobile, and Solo Leveling with unique combat abilities, or forge your photo into a unique warrior!
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button
              onClick={() => setActiveTab('ROSTER')}
              className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'ROSTER'
                  ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Crown className="h-4 w-4" />
              Battle Royale Roster (10 Legends)
            </button>
            <button
              onClick={() => setActiveTab('PHOTO')}
              className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'PHOTO'
                  ? 'bg-purple-600 text-white shadow-glow-xp'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Camera className="h-4 w-4" />
              Upload Photo &amp; Battle AI
            </button>
            <button
              onClick={() => setActiveTab('STUDIO')}
              className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'STUDIO'
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Palette className="h-4 w-4" />
              Tactical Gear Studio
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Identity Bar (Hero Name, Title, Archetype) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-950/60 shadow-inner">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Active Callsign / Hero Name
                </label>
                <button
                  type="button"
                  onClick={handleRandomizeCurrentName}
                  className="flex items-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/20 px-2 py-0.5 text-[9px] font-extrabold uppercase text-amber-300 hover:bg-amber-500/30 transition shadow-sm"
                  title="Roll Random Gaming Callsign"
                >
                  <Dices className="h-3 w-3 animate-spin" />
                  <span>Random</span>
                </button>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-white focus:border-purple-500 focus:outline-none"
              />
              {/* Quick Random Callsign Suggestion Chips */}
              {(() => {
                const currentPreset = HERO_PRESETS.find(
                  (p) => p.name.toLowerCase() === name.toLowerCase() || p.class === charClass
                );
                const suggested = currentPreset && HERO_RANDOM_NAMES[currentPreset.id] ? HERO_RANDOM_NAMES[currentPreset.id] : [];
                if (suggested.length === 0) return null;
                return (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {suggested.slice(0, 3).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => {
                          soundEngine.playEquip();
                          setName(n);
                        }}
                        className={`rounded-md border px-1.5 py-0.5 text-[8.5px] font-bold transition ${
                          name === n
                            ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                            : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                        }`}
                      >
                        {n.split('"')[1] || n.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Battle Royale Title
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
                Combat Class
              </label>
              <input
                type="text"
                disabled
                value={charClass}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-mono font-bold text-purple-300"
              />
            </div>
          </div>

          {/* TAB 1: BATTLE ROYALE ROSTER */}
          {activeTab === 'ROSTER' && (
            <div className="space-y-4">
              {/* Filter Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'ALL', label: 'All 10 Legends' },
                    { id: 'FREE_FIRE', label: '🔥 Free Fire Icons' },
                    { id: 'PUBG', label: '🪖 PUBG Legends' },
                    { id: 'SOLO_LEVELING', label: '🌑 Solo Leveling' },
                    { id: 'FEMALE', label: '🌸 Female Warriors' },
                    { id: 'MALE', label: '⚔️ Male Icons' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setRosterFilter(filter.id as any);
                        soundEngine.playMenuClick();
                      }}
                      className={`rounded-xl px-3 py-1.5 text-xs font-black uppercase tracking-wider transition ${
                        rosterFilter === filter.id
                          ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                          : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                    High-Res Battle Art ✓
                  </span>
                </div>
              </div>

              {/* Character Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredPresets.map((preset) => {
                  const isSelected = name === preset.name;
                  const previewSvg = generateProceduralSprite(preset.parts, preset.class);

                  // Origin Badge colors
                  let badgeBg = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                  if (preset.gameInspiration === 'PUBG') {
                    badgeBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
                  } else if (preset.gameInspiration === 'SOLO_LEVELING') {
                    badgeBg = 'bg-sky-500/20 text-sky-300 border-sky-500/40';
                  }

                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`cursor-pointer flex flex-col justify-between rounded-3xl border p-4 transition duration-300 group ${
                        isSelected
                          ? 'border-amber-400 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 shadow-glow-gold scale-[1.02]'
                          : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-900/80 hover:scale-[1.01]'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        {/* Inspiration Tag & Rarity */}
                        <div className="w-full flex items-center justify-between mb-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider border ${badgeBg}`}>
                            {preset.inspirationLabel}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectPreset(preset, true);
                            }}
                            className="flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900/90 px-2 py-0.5 text-[9px] font-bold text-amber-300 hover:border-amber-400 hover:bg-amber-500/20 transition shadow-sm"
                            title={`Select ${preset.name} with a random callsign`}
                          >
                            <Dices className="h-3 w-3" />
                            <span>Random</span>
                          </button>
                        </div>

                        {/* High-Definition Human Character Portrait & Canvas */}
                        <div className="relative h-56 w-full overflow-hidden rounded-2xl border-2 border-slate-800 bg-slate-950 shadow-lg group-hover:scale-102 group-hover:border-amber-400/80 transition duration-300">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={preset.portraitUrl || previewSvg}
                            alt={preset.name}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = previewSvg;
                            }}
                            className="h-full w-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                          <span className={`absolute bottom-2 right-2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-md ${
                            preset.gender === 'FEMALE' ? 'bg-pink-600 text-white' : 'bg-blue-600 text-white'
                          }`}>
                            {preset.gender}
                          </span>
                          <span className="absolute top-2 left-2 rounded-full bg-slate-950/85 border border-amber-400/70 px-2 py-0.5 text-[9px] font-black text-amber-300 shadow-md">
                            {preset.rarity}
                          </span>
                          <div className="absolute bottom-2 left-2 text-left">
                            <span className="rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-slate-300 backdrop-blur-xs">
                              {preset.humanSpecs.physique.split(' ')[0]} Body
                            </span>
                          </div>
                        </div>

                        {/* Name & Class */}
                        <h4 className="text-sm font-black text-white mt-2.5">{preset.name}</h4>
                        <span className="text-[11px] font-bold text-amber-400 font-mono">{preset.class}</span>

                        {/* Human Anatomy & Realistic Body Breakdown */}
                        <div className="w-full mt-2 rounded-xl bg-slate-900/90 p-2.5 border border-amber-500/20 text-left space-y-1 text-[9px]">
                          <div className="flex items-start gap-1 text-slate-300">
                            <span className="text-amber-400 font-bold">👤 Face:</span>
                            <span className="text-slate-300 line-clamp-1">{preset.humanSpecs.faceAndEyes}</span>
                          </div>
                          <div className="flex items-start gap-1 text-slate-300">
                            <span className="text-cyan-400 font-bold">👕 Torso:</span>
                            <span className="text-slate-300 line-clamp-1">{preset.humanSpecs.torsoAndOutfit}</span>
                          </div>
                          <div className="flex items-start gap-1 text-slate-300">
                            <span className="text-emerald-400 font-bold">🥊 Arms:</span>
                            <span className="text-slate-300 line-clamp-1">{preset.humanSpecs.armsAndGloves}</span>
                          </div>
                          <div className="flex items-start gap-1 text-slate-300">
                            <span className="text-purple-400 font-bold">👖 Legs:</span>
                            <span className="text-slate-300 line-clamp-1">{preset.humanSpecs.legsAndBoots}</span>
                          </div>
                        </div>

                        {/* Battle Royale Special Ability Pill */}
                        <div className="w-full mt-2 rounded-xl bg-slate-900/90 p-2 border border-purple-500/30 text-left">
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-purple-300">
                            <span>{preset.ability.icon}</span>
                            <span>{preset.ability.name}</span>
                          </div>
                          <p className="text-[9px] text-slate-300 mt-0.5 font-medium">
                            {preset.ability.buffText}
                          </p>
                        </div>

                        {/* Voice Quote */}
                        <p className="text-[10px] italic text-slate-400 mt-2 line-clamp-2 px-1">
                          "{preset.quote}"
                        </p>

                        {/* Battle Stats Grid */}
                        <div className="w-full mt-2.5 grid grid-cols-2 gap-1.5 text-[9px] font-mono bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                          <div className="flex items-center justify-between text-slate-400">
                            <span>WIN RATE</span>
                            <span className="text-emerald-400 font-bold">{preset.battleStats.winRate}%</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400">
                            <span>K/D RATIO</span>
                            <span className="text-amber-400 font-bold">{preset.battleStats.kdRatio}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400">
                            <span>AGILITY</span>
                            <span className="text-cyan-400 font-bold">{preset.battleStats.agility}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400">
                            <span>POWER</span>
                            <span className="text-rose-400 font-bold">{preset.battleStats.combatPower} CP</span>
                          </div>
                        </div>
                      </div>

                      <button
                        className={`w-full mt-3.5 rounded-xl py-2 text-xs font-black uppercase tracking-wider transition ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                            : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ Hero Equipped' : 'Equip Hero'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD PHOTO & BATTLE ROYALE AI FORGE */}
          {activeTab === 'PHOTO' && (
            <div className="space-y-6">
              {/* Unique Guarantee Banner */}
              <div className="rounded-2xl border border-purple-500/40 bg-purple-950/30 p-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600/30 text-purple-300">
                  <Wand2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white flex items-center gap-2">
                    100% Unique Battle Royale Character Guarantee
                    <span className="rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/40">
                      Cryptographic Verified
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your photo is analyzed and converted through our neural pixel quantization engine. It produces a bespoke Battle Royale character card stamped with a unique cryptographic hash—guaranteed to never match default game characters!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Upload Area & Style Selectors (6 cols) */}
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
                    <p className="text-[10px] text-slate-400 mt-1">Upload your portrait, selfie, or profile picture (PNG, JPG, WebP)</p>
                  </div>

                  {/* 1-Click Quick Demo Photos */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Or Try 1-Click Demo Portraits
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {demoPhotos.map((demo) => (
                        <button
                          key={demo.label}
                          onClick={() => {
                            setPhotoSrc(demo.url);
                            runPhotoGeneration(demo.url, selectedStyle, seed);
                            soundEngine.playCoin();
                          }}
                          className="rounded-xl border border-slate-800 bg-slate-950/60 p-2 text-center text-xs font-bold text-slate-300 hover:border-purple-500 hover:text-white transition"
                        >
                          <span className="block text-[11px] font-bold truncate">{demo.label}</span>
                          <span className="text-[9px] text-purple-400 block truncate">{demo.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Art Styles Grid */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Select Battle Royale Transformation Style
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stylesList.map((st) => (
                        <button
                          key={st.id}
                          onClick={() => {
                            setSelectedStyle(st.id);
                            if (photoSrc) runPhotoGeneration(photoSrc, st.id, seed);
                          }}
                          className={`rounded-xl border p-2.5 text-left transition flex items-center justify-between ${
                            selectedStyle === st.id
                              ? 'border-purple-500 bg-purple-500/20 text-white font-bold shadow-glow-xp'
                              : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-base">{st.icon}</span>
                            <span className="text-xs truncate">{st.label}</span>
                          </div>
                          <span className="text-[9px] font-mono text-purple-300/80 uppercase">
                            {st.tag}
                          </span>
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
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>Re-Roll Unique Battle Attributes &amp; Gear</span>
                  </button>
                </div>

                {/* Right: Generated Result Preview (6 cols) */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center">
                  <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-4 border-amber-400/80 bg-slate-950 shadow-glow-gold flex items-center justify-center">
                    {isGenerating ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-10 w-10 animate-spin rounded-full border-3 border-purple-400 border-t-transparent" />
                        <span className="text-xs font-bold text-purple-300">Forging Battle Avatar...</span>
                      </div>
                    ) : generatedPhotoAvatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={generatedPhotoAvatar} alt="Photo RPG" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-slate-500 p-4">
                        <Camera className="h-12 w-12 mb-2 opacity-50 text-purple-400" />
                        <span className="text-xs font-bold text-slate-300">No photo uploaded yet</span>
                        <span className="text-[10px] text-slate-500 mt-1">Upload a photo or try a 1-click demo to generate your unique warrior</span>
                      </div>
                    )}
                  </div>

                  {uniqueHeroData && (
                    <div className="mt-4 p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-left w-full max-w-sm animate-in fade-in">
                      <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-1">
                        <span>{uniqueHeroData.heroId}</span>
                        <span className="font-bold bg-amber-400/20 px-1.5 py-0.5 rounded">100% UNIQUE</span>
                      </div>
                      <h5 className="text-sm font-black text-white">{name || 'Your Hero'}</h5>
                      <p className="text-xs text-amber-300 font-bold">{uniqueHeroData.uniqueTitle}</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{uniqueHeroData.uniqueClass}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM TACTICAL GEAR STUDIO */}
          {activeTab === 'STUDIO' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Gender Toggle */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Hero Gender Identity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['FEMALE', 'MALE', 'NON_BINARY'] as CharacterGender[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          setGender(g);
                          setSpriteParts((prev) => ({ ...prev, gender: g }));
                          soundEngine.playMenuClick();
                        }}
                        className={`rounded-xl py-1.5 text-xs font-bold transition ${
                          gender === g
                            ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {g === 'FEMALE' ? '🌸 Female' : g === 'MALE' ? '⚔️ Male' : '⚡ Non-Binary'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hairstyle / Helmet */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Hairstyle / Headgear (Free Fire &amp; PUBG)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'kelly_freefire', label: 'Kelly Bob (FF)' },
                      { id: 'pubg_spetsnaz', label: 'Spetsnaz Lvl 3 (PUBG)' },
                      { id: 'alok_hair', label: 'Alok Undercut (FF)' },
                      { id: 'pubg_tactical_pony', label: 'Sniper Comms (PUBG)' },
                      { id: 'moco_dreads', label: 'Moco Dreads (FF)' },
                      { id: 'pubg_pharaoh_headdress', label: 'Pharaoh Crown (PUBG)' },
                      { id: 'hayato_ponytail', label: 'Hayato Samurai' },
                      { id: 'chrono_hair', label: 'Chrono Cyber (FF)' },
                    ].map((h) => (
                      <button
                        key={h.id}
                        onClick={() => setSpriteParts((prev) => ({ ...prev, hair: h.id }))}
                        className={`rounded-xl border p-2 text-xs font-bold transition ${
                          spriteParts.hair === h.id
                            ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                            : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {h.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tactical Outfit */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Tactical Outfit &amp; Armor
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'kelly_tracksuit', label: 'Yellow Track (FF)' },
                      { id: 'pubg_suit', label: 'Tie & Harness (PUBG)' },
                      { id: 'alok_coat', label: 'DJ Coat (FF)' },
                      { id: 'pubg_tactical_vest', label: 'Ammo Vest (PUBG)' },
                      { id: 'pubg_pharaoh_armor', label: 'Pharaoh Gold (PUBG)' },
                      { id: 'chrono_suit', label: 'Chrono Armor (FF)' },
                      { id: 'hayato_haori', label: 'Bushido Haori (FF)' },
                      { id: 'jinwoo_duster', label: 'Shadow Duster (SL)' },
                    ].map((o) => (
                      <button
                        key={o.id}
                        onClick={() => setSpriteParts((prev) => ({ ...prev, outfit: o.id }))}
                        className={`rounded-xl border p-2 text-xs font-bold transition ${
                          spriteParts.outfit === o.id
                            ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                            : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Signature Weapon */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Signature Battle Weapon
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'pubg_m416', label: 'PUBG M416' },
                      { id: 'dual_sabers', label: 'Dual Sabers' },
                      { id: 'katana', label: 'Flame Katana' },
                      { id: 'shadow_daggers', label: 'Shadow Daggers' },
                      { id: 'spear', label: 'Pharaoh Spear' },
                    ].map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setSpriteParts((prev) => ({ ...prev, weapon: w.id }))}
                        className={`rounded-xl border p-2 text-xs font-bold transition ${
                          spriteParts.weapon === w.id
                            ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                            : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Elemental / Tactical Aura */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Tactical Aura / Atmosphere
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'phoenix_blaze', label: 'Phoenix Blaze (FF)' },
                      { id: 'airdrop_smoke', label: 'Airdrop Flare (PUBG)' },
                      { id: 'soundwave_beat', label: 'Soundwave Beat (FF)' },
                      { id: 'desert_storm', label: 'Miramar Storm (PUBG)' },
                      { id: 'pharaoh_gold', label: 'Pharaoh Wings (PUBG)' },
                      { id: 'chrono_shield', label: 'Chrono Barrier (FF)' },
                      { id: 'shadow_monarch', label: 'Shadow Mist (SL)' },
                      { id: 'fire', label: 'Flame Bushido (FF)' },
                    ].map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setSpriteParts((prev) => ({ ...prev, aura: a.id }))}
                        className={`rounded-xl border p-2 text-xs font-bold transition ${
                          spriteParts.aura === a.id
                            ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                            : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
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
                <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-4 border-cyan-400/80 bg-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center">
                  {generatedSpriteAvatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={generatedSpriteAvatar} alt="Custom Sprite" className="h-full w-full object-cover" />
                  )}
                </div>
                <h5 className="text-sm font-black text-white mt-4">{name || 'Custom Hero'}</h5>
                <span className="text-xs font-bold text-cyan-400 font-mono">{charClass}</span>
                <p className="text-[11px] text-slate-400 mt-1">{title}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/80 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveCharacter}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-glow-gold hover:from-amber-400 hover:to-yellow-400 transition disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            <span>Lock In &amp; Deploy Hero</span>
          </button>
        </div>
      </div>
    </div>
  );
}