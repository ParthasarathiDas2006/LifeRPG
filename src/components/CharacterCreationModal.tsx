'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  CharacterConfig,
  CharacterClass,
  AvatarStyle,
  SpritePartsConfig,
} from '@/lib/types';
import {
  generateProceduralSprite,
  generateAvatarFromPhoto,
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
  Sliders,
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
  const [activeTab, setActiveTab] = useState<'PHOTO' | 'SPRITE'>(
    currentCharacter.avatarType === 'PHOTO_GENERATED' ? 'PHOTO' : 'SPRITE'
  );

  // Character Details
  const [name, setName] = useState(currentCharacter.name);
  const [charClass, setCharClass] = useState<CharacterClass>(currentCharacter.class);
  const [title, setTitle] = useState(currentCharacter.title);

  // Photo Generator State
  const [photoSrc, setPhotoSrc] = useState<string | null>(
    currentCharacter.sourcePhotoUrl || null
  );
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>(
    currentCharacter.generationStyle || 'PIXEL_HERO'
  );
  const [seed, setSeed] = useState<number>(currentCharacter.generationSeed || 1);
  const [pixelSize, setPixelSize] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPhotoAvatar, setGeneratedPhotoAvatar] = useState<string | null>(
    currentCharacter.avatarType === 'PHOTO_GENERATED' ? currentCharacter.avatarUrl : null
  );

  // Sprite Studio State
  const [spriteParts, setSpriteParts] = useState<SpritePartsConfig>(
    currentCharacter.spriteParts || {
      body: 'fair',
      hair: 'spiky',
      hairColor: '#f59e0b',
      outfit: 'plate',
      outfitColor: '#3b82f6',
      weapon: 'sword',
      aura: 'fire',
    }
  );
  const [generatedSpriteAvatar, setGeneratedSpriteAvatar] = useState<string>('');

  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Re-generate procedural sprite when sprite parts or class changes
  useEffect(() => {
    const svgUrl = generateProceduralSprite(spriteParts, charClass);
    setGeneratedSpriteAvatar(svgUrl);
  }, [spriteParts, charClass]);

  // Re-generate photo avatar when photo, style, seed, or pixel size changes
  const runPhotoGeneration = async (
    source: string,
    style: AvatarStyle,
    genSeed: number,
    size: number
  ) => {
    try {
      setIsGenerating(true);
      const result = await generateAvatarFromPhoto(source, style, genSeed, {
        pixelSize: size,
      });
      setGeneratedPhotoAvatar(result);
    } catch (err) {
      console.error('Failed to generate avatar from photo', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setPhotoSrc(src);
      const newSeed = Date.now();
      setSeed(newSeed);
      runPhotoGeneration(src, selectedStyle, newSeed, pixelSize);
    };
    reader.readAsDataURL(file);
  };

  const handleStyleChange = (style: AvatarStyle) => {
    setSelectedStyle(style);
    if (photoSrc) {
      runPhotoGeneration(photoSrc, style, seed, pixelSize);
    }
  };

  const handleNewGeneration = () => {
    soundEngine.playCoin();
    const newSeed = Math.floor(Math.random() * 1000000);
    setSeed(newSeed);
    if (photoSrc) {
      runPhotoGeneration(photoSrc, selectedStyle, newSeed, pixelSize);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const finalAvatarUrl =
        activeTab === 'PHOTO' && generatedPhotoAvatar
          ? generatedPhotoAvatar
          : generatedSpriteAvatar;

      const payload: Partial<CharacterConfig> = {
        name: name.trim() || 'Hero',
        class: charClass,
        title: title.trim() || 'Novice Adventurer',
        avatarUrl: finalAvatarUrl,
        avatarType: activeTab === 'PHOTO' ? 'PHOTO_GENERATED' : 'SPRITE',
        spriteParts,
        sourcePhotoUrl: photoSrc || undefined,
        generationStyle: selectedStyle,
        generationSeed: seed,
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
      alert('Failed to save character updates');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const stylePresets: Array<{
    id: AvatarStyle;
    label: string;
    desc: string;
    icon: string;
    border: string;
  }> = [
    {
      id: 'PIXEL_HERO',
      label: 'Pixel Hero',
      desc: '16-bit retro RPG aesthetic with gold adventurer crest',
      icon: '⚔️',
      border: 'border-amber-500/40 hover:border-amber-400',
    },
    {
      id: 'MYSTIC_ARCANE',
      label: 'Mystic Arcane',
      desc: 'Arcane violet hues, glowing runes, and star motes',
      icon: '🔮',
      border: 'border-purple-500/40 hover:border-purple-400',
    },
    {
      id: 'CYBER_ROGUE',
      label: 'Cyber Rogue',
      desc: 'Synthwave cyan & neon pink with cybernetic visor',
      icon: '⚡',
      border: 'border-cyan-500/40 hover:border-cyan-400',
    },
    {
      id: 'HOLY_PALADIN',
      label: 'Holy Paladin',
      desc: 'Radiant divine halo, golden light rays, and ivory tone',
      icon: '🛡️',
      border: 'border-yellow-500/40 hover:border-yellow-400',
    },
    {
      id: 'SHADOW_ASSASSIN',
      label: 'Shadow Assassin',
      desc: 'Dark obsidian mist vignette with crimson eye accents',
      icon: '🗡️',
      border: 'border-rose-500/40 hover:border-rose-400',
    },
  ];

  const classDescriptions: Record<CharacterClass, { bonus: string; icon: string }> = {
    WARRIOR: { bonus: '+3 STR • +2 VIT', icon: '⚔️' },
    MAGE: { bonus: '+4 INT • +1 WIL', icon: '🔮' },
    ROGUE: { bonus: '+3 AGI • +2 WIL', icon: '🗡️' },
    PALADIN: { bonus: '+3 VIT • +2 STR', icon: '🛡️' },
    RANGER: { bonus: '+3 AGI • +2 INT', icon: '🏹' },
    CYBER_HERO: { bonus: '+2 INT • +3 WIL', icon: '⚡' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 sm:p-4 backdrop-blur-md animate-in fade-in">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-glow-xp">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Character Creation Studio</h3>
              <p className="text-xs text-slate-400">
                Design your hero sprite or transform a photo into multiple RPG art styles
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex gap-2 pt-3 pb-2">
          <button
            onClick={() => {
              soundEngine.playEquip();
              setActiveTab('PHOTO');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'PHOTO'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-xp'
                : 'border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="h-4 w-4" />
            <span>AI Photo to RPG Hero</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playEquip();
              setActiveTab('SPRITE');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'SPRITE'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-xp'
                : 'border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wand2 className="h-4 w-4" />
            <span>Modular Sprite Studio</span>
          </button>
        </div>

        {/* Body Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left: Avatar Live Preview & Generation Controls */}
            <div className="md:col-span-5 flex flex-col items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-center">
              <div className="w-full flex flex-col items-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3">
                  Live Hero Portrait
                </span>

                {/* Portrait Canvas Frame */}
                <div className="relative group flex h-48 w-48 items-center justify-center overflow-hidden rounded-3xl border-4 border-amber-500/60 bg-slate-950 shadow-glow-gold">
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="h-8 w-8 animate-spin text-purple-400" />
                      <span className="text-xs font-bold text-purple-300">
                        Synthesizing RPG Avatar...
                      </span>
                    </div>
                  ) : activeTab === 'PHOTO' ? (
                    generatedPhotoAvatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={generatedPhotoAvatar}
                        alt="Generated RPG Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center p-4 text-slate-500 hover:text-purple-400 cursor-pointer transition"
                      >
                        <Upload className="h-10 w-10 mb-2" />
                        <span className="text-xs font-bold">Upload a photo to start</span>
                        <span className="text-[10px] text-slate-600 mt-1">PNG, JPG, WEBP</span>
                      </div>
                    )
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={generatedSpriteAvatar}
                      alt="Modular Sprite Preview"
                      className="h-full w-full object-contain p-2"
                    />
                  )}

                  {/* Class Badge Floating */}
                  <div className="absolute bottom-2 left-2 rounded-lg border border-slate-900 bg-slate-950/90 px-2 py-0.5 text-[10px] font-black text-amber-400 shadow-md">
                    {charClass}
                  </div>
                </div>

                {/* Photo Generation Actions */}
                {activeTab === 'PHOTO' && photoSrc && (
                  <div className="mt-4 flex flex-col w-full gap-2">
                    <button
                      onClick={handleNewGeneration}
                      disabled={isGenerating}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-4 py-2.5 text-xs font-black text-slate-950 shadow-glow-gold hover:from-amber-400 hover:to-yellow-300 transition active:scale-95 disabled:opacity-50"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>✨ Generate New Variation</span>
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-300 hover:border-slate-700 hover:text-white transition"
                    >
                      Upload Different Photo
                    </button>
                  </div>
                )}

                {activeTab === 'PHOTO' && !photoSrc && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-glow-xp hover:bg-purple-500 transition"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Choose Photo File</span>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              {/* Pixel density slider for photo mode */}
              {activeTab === 'PHOTO' && photoSrc && (
                <div className="w-full mt-4 border-t border-slate-800/80 pt-3 text-left">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Sliders className="h-3 w-3" />
                      Pixel Density
                    </span>
                    <span className="text-purple-400 font-mono">{pixelSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    step="1"
                    value={pixelSize}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPixelSize(val);
                      if (photoSrc) {
                        runPhotoGeneration(photoSrc, selectedStyle, seed, val);
                      }
                    }}
                    className="w-full accent-purple-500"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 mt-0.5">
                    <span>Crisp (3px)</span>
                    <span>Retro 8-Bit (10px)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Customization Controls */}
            <div className="md:col-span-7 space-y-4">
              {/* TAB 1: Photo Styles */}
              {activeTab === 'PHOTO' ? (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Choose Transformation Style
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {stylePresets.map((style) => {
                      const isSelected = selectedStyle === style.id;
                      return (
                        <button
                          key={style.id}
                          onClick={() => handleStyleChange(style.id)}
                          className={`flex items-start gap-2.5 rounded-xl border p-3 text-left transition ${
                            isSelected
                              ? 'border-purple-500 bg-purple-950/40 ring-1 ring-purple-500'
                              : `bg-slate-950/60 ${style.border}`
                          }`}
                        >
                          <span className="text-2xl p-1 rounded-lg bg-slate-900 border border-slate-800">
                            {style.icon}
                          </span>
                          <div>
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-black text-white">{style.label}</h5>
                              {isSelected && (
                                <span className="rounded-full bg-purple-500 p-0.5 text-slate-950">
                                  <Check className="h-3 w-3 stroke-[3]" />
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                              {style.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* TAB 2: Modular Sprite Builder */
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Modular Sprite Assembly
                  </h4>

                  {/* Skin Tone & Hair */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Skin Complexion
                      </label>
                      <select
                        value={spriteParts.body}
                        onChange={(e) =>
                          setSpriteParts((prev) => ({ ...prev, body: e.target.value }))
                        }
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white"
                      >
                        <option value="fair">Fair Adventurer</option>
                        <option value="tanned">Tanned Warrior</option>
                        <option value="dark">Dark Knight</option>
                        <option value="elf">Emerald Elf</option>
                        <option value="cyber">Cyber Android</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Hairstyle
                      </label>
                      <select
                        value={spriteParts.hair}
                        onChange={(e) =>
                          setSpriteParts((prev) => ({ ...prev, hair: e.target.value }))
                        }
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white"
                      >
                        <option value="spiky">Spiky Anime</option>
                        <option value="long">Long Flowing</option>
                        <option value="ponytail">High Ponytail</option>
                        <option value="short">Short Crop</option>
                      </select>
                    </div>
                  </div>

                  {/* Outfit & Weapon */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Outfit / Armor
                      </label>
                      <select
                        value={spriteParts.outfit}
                        onChange={(e) =>
                          setSpriteParts((prev) => ({ ...prev, outfit: e.target.value }))
                        }
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white"
                      >
                        <option value="plate">Heavy Knight Plate</option>
                        <option value="robe">Arcane Mage Robes</option>
                        <option value="cyber">Cyber Exosuit</option>
                        <option value="leather">Leather Ranger Tunic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Equipped Weapon
                      </label>
                      <select
                        value={spriteParts.weapon}
                        onChange={(e) =>
                          setSpriteParts((prev) => ({ ...prev, weapon: e.target.value }))
                        }
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white"
                      >
                        <option value="sword">Enchanted Broadsword</option>
                        <option value="staff">Arcane Orb Staff</option>
                        <option value="daggers">Twin Shadow Daggers</option>
                        <option value="bow">Longbow of Precision</option>
                        <option value="katana">Demon Katana</option>
                      </select>
                    </div>
                  </div>

                  {/* Elemental Aura */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Elemental Aura / Energy
                    </label>
                    <select
                      value={spriteParts.aura}
                      onChange={(e) =>
                        setSpriteParts((prev) => ({ ...prev, aura: e.target.value }))
                      }
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white"
                    >
                      <option value="none">No Aura (Calm)</option>
                      <option value="fire">Inferno Blaze (Fire)</option>
                      <option value="arcane">Runic Seal (Arcane)</option>
                      <option value="holy">Divine Halo (Holy)</option>
                      <option value="shadow">Obsidian Smoke (Shadow)</option>
                      <option value="lightning">Volt Discharge (Lightning)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Hero Identity: Name, Class, Title */}
              <div className="border-t border-slate-800/80 pt-3 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Hero Identity & Attributes
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Hero Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kaelen"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Class & Bonus
                    </label>
                    <select
                      value={charClass}
                      onChange={(e) => setCharClass(e.target.value as CharacterClass)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="WARRIOR">Warrior (+3 STR, +2 VIT)</option>
                      <option value="MAGE">Mage (+4 INT, +1 WIL)</option>
                      <option value="ROGUE">Rogue (+3 AGI, +2 WIL)</option>
                      <option value="PALADIN">Paladin (+3 VIT, +2 STR)</option>
                      <option value="RANGER">Ranger (+3 AGI, +2 INT)</option>
                      <option value="CYBER_HERO">Cyber Hero (+2 INT, +3 WIL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Honor Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Master of Focus"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-amber-400" />
            <span>
              Chosen: <strong className="text-white">{name}</strong> ({charClass}) •{' '}
              <span className="text-amber-400 font-bold">{classDescriptions[charClass].bonus}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-black text-white shadow-glow-xp hover:from-purple-500 hover:to-indigo-500 transition active:scale-95 disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              <span>{isSaving ? 'Inscribing Hero...' : 'Save Character'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
