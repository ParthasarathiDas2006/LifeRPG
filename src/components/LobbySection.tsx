'use client';

import React, { useState } from 'react';
import {
  UserStats,
  CharacterConfig,
  RankedTier,
  DailyWheelSlice,
} from '@/lib/types';
import {
  Shield,
  Sparkles,
  Flame,
  Zap,
  Heart,
  Droplets,
  BookOpen,
  Award,
  Crown,
  Gift,
  Crosshair,
  TrendingUp,
  Edit3,
  Check,
  X,
  Dices,
} from 'lucide-react';
import { soundEngine } from '@/lib/sound';
import { HERO_PRESETS, generateProceduralSprite } from '@/lib/photoGenerator';
import { getRandomNameAndTitle, HERO_RANDOM_NAMES } from '@/lib/nameGenerator';

interface LobbySectionProps {
  stats: UserStats;
  character: CharacterConfig;
  gearBonuses: {
    bonusXP: number;
    bonusGold: number;
    bonusStr: number;
    bonusInt: number;
    bonusVit: number;
    bonusAgi: number;
    bonusCha: number;
    bonusWil: number;
  };
  effectiveStats: {
    str: number;
    int: number;
    vit: number;
    agi: number;
    cha: number;
    wil: number;
  };
  onEditCharacter: () => void;
  onRefreshData: () => void;
  onNavigateToTab: (tabId: string) => void;
}

export function LobbySection({
  stats,
  character,
  gearBonuses,
  effectiveStats,
  onEditCharacter,
  onRefreshData,
  onNavigateToTab,
}: LobbySectionProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<DailyWheelSlice | null>(null);
  const [spinMessage, setSpinMessage] = useState<string | null>(null);
  const [quickActionNotice, setQuickActionNotice] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(character.name);
  const [isSavingName, setIsSavingName] = useState(false);

  const handleSaveName = async (newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed || isSavingName) return;
    try {
      setIsSavingName(true);
      soundEngine.playEquip();
      const payload = {
        ...character,
        name: trimmed,
      };
      const res = await fetch('/api/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsEditingName(false);
        setQuickActionNotice(`Callsign changed: "${trimmed}"!`);
        setTimeout(() => setQuickActionNotice(null), 3500);
        onRefreshData();
      }
    } catch (err) {
      soundEngine.playError();
      console.error(err);
    } finally {
      setIsSavingName(false);
    }
  };

  const handleRollRandomName = async () => {
    const activePreset = HERO_PRESETS.find(
      (p) => p.name.toLowerCase() === character.name.toLowerCase() || p.class === character.class
    );
    const { name: randomName } = getRandomNameAndTitle(activePreset?.id, character.class, character.name);
    setEditedName(randomName);
    await handleSaveName(randomName);
  };

  // Compute Combat Power (CP)
  const totalStats =
    effectiveStats.str +
    effectiveStats.int +
    effectiveStats.vit +
    effectiveStats.agi +
    effectiveStats.cha +
    effectiveStats.wil;
  const combatPower =
    totalStats * 15 +
    stats.level * 60 +
    (gearBonuses.bonusXP + gearBonuses.bonusGold) * 10;

  // Compute Free Fire style Ranked Tier
  const getTier = (): { name: RankedTier; color: string; bg: string; icon: string } => {
    if (combatPower >= 2500)
      return { name: 'GRANDMASTER', color: 'text-rose-400', bg: 'from-rose-600 to-amber-600', icon: '👑' };
    if (combatPower >= 1800)
      return { name: 'HEROIC', color: 'text-amber-400', bg: 'from-amber-600 to-yellow-500', icon: '🔥' };
    if (combatPower >= 1300)
      return { name: 'DIAMOND', color: 'text-cyan-300', bg: 'from-cyan-600 to-blue-600', icon: '💎' };
    if (combatPower >= 900)
      return { name: 'PLATINUM', color: 'text-emerald-300', bg: 'from-emerald-600 to-teal-500', icon: '⭐' };
    if (combatPower >= 500)
      return { name: 'GOLD', color: 'text-yellow-400', bg: 'from-yellow-600 to-amber-500', icon: '🏅' };
    if (combatPower >= 250)
      return { name: 'SILVER', color: 'text-slate-300', bg: 'from-slate-500 to-slate-400', icon: '🥈' };
    return { name: 'BRONZE', color: 'text-amber-600', bg: 'from-amber-700 to-amber-900', icon: '🥉' };
  };

  const currentTier = getTier();

  // Streak Multiplier
  const streakMultiplier = 1 + Math.min(0.5, (stats.totalTasksCompleted > 0 ? 0.05 * stats.streakFreezeTokens : 0));

  // Handle Daily Fortune Spin
  const handleDailySpin = async () => {
    try {
      setIsSpinning(true);
      soundEngine.playSpinTick();

      // Mechanical tick loop simulation
      const interval = setInterval(() => {
        soundEngine.playSpinTick();
      }, 100);

      const res = await fetch('/api/game/daily-spin', { method: 'POST' });
      const data = await res.json();

      setTimeout(() => {
        clearInterval(interval);
        setIsSpinning(false);
        if (data.slice) {
          setSpinResult(data.slice);
          setSpinMessage(data.message);
          soundEngine.playLevelUp();
          onRefreshData();
        }
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsSpinning(false);
    }
  };

  // Handle Quick IRL Habit Claim
  const handleQuickHabit = async (habitType: 'HYDRATE' | 'STRETCH' | 'READ') => {
    try {
      soundEngine.playCoin();
      const res = await fetch('/api/game/quick-habit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitType }),
      });
      const data = await res.json();
      if (data.message) {
        setQuickActionNotice(`${data.message} (+${data.xp} XP, +${data.gold} GP)`);
        soundEngine.playTaskComplete();
        onRefreshData();
        setTimeout(() => setQuickActionNotice(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const xpPercentage = Math.min(
    100,
    Math.max(0, Math.round((stats.currentXP / stats.nextLevelXP) * 100))
  );

  return (
    <div className="space-y-6">
      {/* Quick Action Toast */}
      {quickActionNotice && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/80 bg-slate-900/95 px-4 py-2.5 text-xs font-bold text-emerald-300 shadow-glow-xp backdrop-blur-md animate-in slide-in-from-top-4">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span>{quickActionNotice}</span>
        </div>
      )}

      {/* Main Hero Battle Sanctuary Podium */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Radiant Ambient Background Glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Interactive Hero Avatar Podium */}
          <div className="flex flex-col items-center justify-center lg:col-span-5 text-center">
            {/* 3D-effect Avatar Pedestal */}
            {(() => {
              const activePreset = HERO_PRESETS.find(
                (p) => p.name.toLowerCase() === character.name.toLowerCase() || p.class === character.class
              );

              return (
                <>
                  <div className="relative group cursor-pointer" onClick={onEditCharacter}>
                    {/* Outer Aura Rings */}
                    <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/30 via-purple-500/30 to-cyan-500/30 blur-xl group-hover:blur-2xl transition duration-500" />

                    <div className="relative flex h-64 w-64 sm:h-72 sm:w-72 items-center justify-center overflow-hidden rounded-3xl border-2 border-amber-400/80 bg-slate-950 shadow-glow-gold transition-transform duration-300 group-hover:scale-105">
                      {character.avatarUrl || activePreset?.portraitUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={character.avatarUrl || activePreset?.portraitUrl}
                          alt={character.name}
                          className="h-full w-full object-cover object-top"
                          onError={(e) => {
                            if (activePreset) {
                              (e.currentTarget as HTMLImageElement).src = generateProceduralSprite(activePreset.parts, activePreset.class);
                            }
                          }}
                        />
                      ) : (
                        <span className="text-6xl">⚔️</span>
                      )}

                      {/* Full Human Body Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/85 opacity-0 group-hover:opacity-100 transition-opacity p-4">
                        <Sparkles className="h-8 w-8 text-amber-300 animate-pulse mb-1" />
                        <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                          Switch / Customize Hero
                        </span>
                        <span className="text-[10px] text-slate-300 mt-1 text-center font-semibold">
                          Free Fire • PUBG Mobile • AI Photo Forge
                        </span>
                      </div>

                      {/* Inspiration Tag */}
                      {activePreset && (
                        <div className="absolute top-2.5 left-2.5 rounded-full bg-slate-950/90 border border-amber-400/60 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-300 backdrop-blur-sm shadow-sm">
                          {activePreset.inspirationLabel}
                        </div>
                      )}

                      {/* Rarity Tag */}
                      {activePreset && (
                        <div className="absolute top-2.5 right-2.5 rounded-full bg-slate-950/90 border border-amber-400/60 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-300 backdrop-blur-sm shadow-sm">
                          {activePreset.rarity}
                        </div>
                      )}
                    </div>

                    {/* Class & Level Badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-400/80 bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-1 text-xs font-black text-slate-950 shadow-glow-gold">
                      LVL {stats.level} • {character.class}
                    </div>
                  </div>

                  {isEditingName ? (
                    <div className="mt-5 flex items-center justify-center gap-2">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="rounded-xl border border-amber-400 bg-slate-900 px-3 py-1.5 text-center text-lg font-black text-white focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner max-w-[220px]"
                        autoFocus
                        disabled={isSavingName}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveName(editedName);
                          if (e.key === 'Escape') setIsEditingName(false);
                        }}
                      />
                      <button
                        onClick={() => handleSaveName(editedName)}
                        disabled={isSavingName}
                        className="rounded-xl bg-emerald-600 p-2 text-white hover:bg-emerald-500 shadow-md transition"
                        title="Save Callsign"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setIsEditingName(false)}
                        className="rounded-xl bg-slate-800 p-2 text-slate-400 hover:text-white transition"
                        title="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="mt-5 flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center gap-2">
                        <h2 className="text-2xl font-black text-white sm:text-3xl tracking-wide">
                          {character.name}
                        </h2>
                        <button
                          onClick={() => {
                            setEditedName(character.name);
                            setIsEditingName(true);
                          }}
                          className="rounded-xl border border-slate-800 bg-slate-900/80 p-1.5 text-slate-400 hover:border-slate-700 hover:text-white transition"
                          title="Edit Hero Callsign"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleRollRandomName}
                          disabled={isSavingName}
                          className="flex items-center gap-1.5 rounded-xl border border-amber-500/50 bg-amber-500/20 px-2.5 py-1 text-xs font-black uppercase text-amber-300 hover:bg-amber-500/30 transition shadow-glow-gold active:scale-95"
                          title="Roll Random Gaming Callsign"
                        >
                          <Dices className="h-3.5 w-3.5 text-amber-400 animate-spin" />
                          <span>Random</span>
                        </button>
                      </div>

                      {/* Quick Name Suggestions for Active Hero */}
                      {activePreset && HERO_RANDOM_NAMES[activePreset.id] && (
                        <div className="mt-2 flex flex-wrap items-center justify-center gap-1 max-w-sm">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mr-0.5">
                            Random:
                          </span>
                          {HERO_RANDOM_NAMES[activePreset.id].slice(0, 4).map((suggestedName) => (
                            <button
                              key={suggestedName}
                              onClick={() => handleSaveName(suggestedName)}
                              disabled={isSavingName}
                              className={`rounded-full border px-2 py-0.5 text-[9px] font-bold transition ${
                                character.name === suggestedName
                                  ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-sm'
                                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                              }`}
                              title={`Switch callsign to ${suggestedName}`}
                            >
                              {suggestedName.split('"')[1] || suggestedName.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Human Body & Attractive Specs Summary */}
                  {activePreset && (
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 max-w-sm">
                      <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                        🏃 {activePreset.humanSpecs.physique}
                      </span>
                      <span className="rounded-full bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">
                        ✨ Realistic Human Model
                      </span>
                    </div>
                  )}

                  {/* Battle Royale Origin & Ability Pill */}
                  {activePreset && (
                    <div className="mt-3 rounded-2xl border border-purple-500/40 bg-purple-950/30 p-2.5 max-w-xs text-left backdrop-blur-sm shadow-md">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-amber-400 font-bold">{activePreset.inspirationLabel}</span>
                        <span className="text-emerald-400 font-bold">K/D {activePreset.battleStats.kdRatio}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs font-black text-white">
                        <span>{activePreset.ability.icon}</span>
                        <span>{activePreset.ability.name}</span>
                      </div>
                      <p className="text-[10px] text-purple-200 mt-0.5 font-medium">
                        {activePreset.ability.buffText}
                      </p>
                    </div>
                  )}

                  {/* Character Quote Banner */}
                  {activePreset && (
                    <p className="mt-2 text-xs italic text-amber-300/90 max-w-xs px-2 text-center">
                      "{activePreset.quote}"
                    </p>
                  )}

                  {/* 1-Click Battle Royale Hero Quick Switcher */}
                  <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 max-w-md">
                    {HERO_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={async () => {
                          soundEngine.playEquip();
                          const payload = {
                            name: preset.name,
                            class: preset.class,
                            gender: preset.gender,
                            title: preset.title,
                            avatarUrl: preset.portraitUrl,
                            avatarType: 'SPRITE',
                            spriteParts: preset.parts,
                            gameOrigin: preset.gameInspiration,
                            abilityName: preset.ability.name,
                            abilityBuff: preset.ability.buffText,
                            humanSpecs: preset.humanSpecs,
                          };
                          await fetch('/api/character', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                          });
                          onRefreshData();
                        }}
                        className={`flex items-center gap-1.5 rounded-xl border px-2 py-1 text-[10px] font-black uppercase tracking-wider transition ${
                          character.name === preset.name
                            ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-glow-gold'
                            : 'border-slate-800 bg-slate-900/70 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                        title={preset.name}
                      >
                        {/* Mini game art avatar icon */}
                        <div className="h-4 w-4 rounded-full overflow-hidden border border-slate-700">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={preset.portraitUrl} alt={preset.name} className="h-full w-full object-cover" />
                        </div>
                        <span>{preset.name.split(' ')[0]}</span>
                      </button>
                    ))}
                    <button
                      onClick={onEditCharacter}
                      className="rounded-xl border border-purple-500/40 bg-purple-500/20 px-2.5 py-1 text-[10px] font-black uppercase text-purple-300 hover:bg-purple-500/30 transition shadow-sm"
                      title="Open Full Character Studio & Customizer"
                    >
                      ⚡ Studio
                    </button>
                  </div>

                  {/* Combat Power (CP) Banner */}
                  <div className="mt-3 flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 shadow-glow-gold">
                    <Crosshair className="h-4 w-4 text-amber-400 animate-spin" />
                    <div className="text-left">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400/80 block">
                        Combat Power
                      </span>
                      <span className="font-mono text-base font-black text-amber-300 sm:text-lg">
                        ⚡ {combatPower.toLocaleString()} CP
                      </span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Right Column: Hero Vitals, Ranked Tier & Supply Airdrop */}
          <div className="space-y-5 lg:col-span-7">
            {/* Top Tier & Streaks Strip */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {/* Free Fire Style Ranked Tier */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Ranked Tier
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xl">{currentTier.icon}</span>
                  <div>
                    <span className={`text-xs font-black tracking-wider ${currentTier.color}`}>
                      {currentTier.name}
                    </span>
                    <p className="text-[9px] text-slate-500 font-mono">Season 1 Active</p>
                  </div>
                </div>
              </div>

              {/* Streak Inferno Tier */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400/80">
                  Habit Flame
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-amber-400 animate-pulse" />
                  <div>
                    <span className="text-xs font-black text-amber-300">
                      {Math.max(...[stats.totalTasksCompleted, 1])} STREAK
                    </span>
                    <p className="text-[9px] text-amber-400/70 font-bold">
                      +{Math.round((streakMultiplier - 1) * 100)}% Bonus Loot
                    </p>
                  </div>
                </div>
              </div>

              {/* Quests Cleared Counter */}
              <div className="col-span-2 rounded-2xl border border-purple-500/30 bg-purple-950/20 p-3 sm:col-span-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-400/80">
                  Total Victories
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-400" />
                  <div>
                    <span className="text-xs font-black text-purple-200">
                      {stats.totalTasksCompleted} Missions
                    </span>
                    <p className="text-[9px] text-purple-400/70">IRL Habit Victories</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vital Bars: Health, Mana, Level XP */}
            <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
              {/* HP Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-rose-400">
                    <Heart className="h-3.5 w-3.5 fill-rose-500" /> Health (HP)
                  </span>
                  <span className="font-mono text-slate-300">
                    {stats.health} / {stats.maxHealth}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-rose-600 to-red-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, (stats.health / stats.maxHealth) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Mana Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Zap className="h-3.5 w-3.5 fill-cyan-400" /> Mana (MP Focus)
                  </span>
                  <span className="font-mono text-slate-300">
                    {stats.mana} / {stats.maxMana}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, (stats.mana / stats.maxMana) * 100)}%` }}
                  />
                </div>
              </div>

              {/* XP Progression Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-purple-300">
                    <Sparkles className="h-3.5 w-3.5 text-purple-400" /> Progression XP
                  </span>
                  <span className="font-mono text-amber-400">
                    {stats.currentXP} / {stats.nextLevelXP} XP ({xpPercentage}%)
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800 border border-purple-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 4 Cardinal Moral Virtues Sanctuary Banner */}
            <div className="rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🏛️</span>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-purple-300">
                      Sanctuary of Moral Virtues
                    </h4>
                    <p className="text-[10px] text-slate-400">4 Cardinal Pillars of Character Training</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateToTab('sanctuary')}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-md hover:brightness-110 transition"
                >
                  Enter Sanctuary 🏛️
                </button>
              </div>

              {/* 4 Virtues Grid */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mt-3">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 text-center">
                  <span className="text-[10px] font-bold text-amber-300 block">🛡️ Integrity</span>
                  <span className="text-sm font-black text-white">{stats.integrity || 14} pts</span>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 text-center">
                  <span className="text-[10px] font-bold text-emerald-300 block">💚 Compassion</span>
                  <span className="text-sm font-black text-white">{stats.compassion || 18} pts</span>
                </div>
                <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-2 text-center">
                  <span className="text-[10px] font-bold text-indigo-300 block">🧭 Discipline</span>
                  <span className="text-sm font-black text-white">{stats.discipline || 16} pts</span>
                </div>
                <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-2 text-center">
                  <span className="text-[10px] font-bold text-purple-300 block">🔥 Wisdom</span>
                  <span className="text-sm font-black text-white">{stats.wisdom || 19} pts</span>
                </div>
              </div>
            </div>

            {/* Daily Airdrop Supply Wheel Banner */}
            <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-purple-600/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 text-2xl shadow-glow-gold">
                  🎁
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                    Daily Airdrop Supply Drop
                    <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[9px] font-black text-rose-300">
                      FREE
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Spin daily for Gold, XP, Streak Shields, and Mystery Crates!
                  </p>
                </div>
              </div>

              <button
                onClick={handleDailySpin}
                disabled={isSpinning}
                className="w-full sm:w-auto shrink-0 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-2.5 text-xs font-black text-slate-950 shadow-glow-gold hover:from-amber-300 hover:to-yellow-400 transition active:scale-95 disabled:opacity-50"
              >
                {isSpinning ? 'Rolling Drop...' : '🎯 Claim Daily Drop'}
              </button>
            </div>

            {spinResult && (
              <div className="rounded-xl border border-amber-500 bg-amber-950/40 p-3 text-center text-xs font-bold text-amber-300 animate-in fade-in zoom-in-95">
                🎉 {spinMessage} Received: {spinResult.icon} {spinResult.label}!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick IRL Habit Acceleration Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-cyan-400" />
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Instant IRL Habit Quick-Taps
            </h4>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Instant XP &amp; Stat Rewards</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleQuickHabit('HYDRATE')}
            className="flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 hover:bg-cyan-950/40 transition text-left group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl group-hover:scale-110 transition">💧</span>
              <div>
                <span className="text-xs font-black text-white block">Drink Water</span>
                <span className="text-[10px] text-cyan-300 font-bold">+1 Vitality • 40 XP</span>
              </div>
            </div>
            <span className="text-xs font-bold text-cyan-400 opacity-60 group-hover:opacity-100">+TAP</span>
          </button>

          <button
            onClick={() => handleQuickHabit('STRETCH')}
            className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 hover:bg-emerald-950/40 transition text-left group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl group-hover:scale-110 transition">🏃</span>
              <div>
                <span className="text-xs font-black text-white block">Posture &amp; Stretch</span>
                <span className="text-[10px] text-emerald-300 font-bold">+1 Agility • 50 XP</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 opacity-60 group-hover:opacity-100">+TAP</span>
          </button>

          <button
            onClick={() => handleQuickHabit('READ')}
            className="flex items-center justify-between rounded-xl border border-purple-500/30 bg-purple-950/20 p-3 hover:bg-purple-950/40 transition text-left group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl group-hover:scale-110 transition">📖</span>
              <div>
                <span className="text-xs font-black text-white block">10-Min Read</span>
                <span className="text-[10px] text-purple-300 font-bold">+1 Intellect • 65 XP</span>
              </div>
            </div>
            <span className="text-xs font-bold text-purple-400 opacity-60 group-hover:opacity-100">+TAP</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Gateways */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigateToTab('operations')}
          className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 text-left hover:border-purple-500 transition group"
        >
          <span className="text-2xl block mb-1">⚔️</span>
          <h5 className="text-xs font-black text-white group-hover:text-purple-300 transition">
            Quest Operations
          </h5>
          <p className="text-[10px] text-slate-400 mt-0.5">Active Quests &amp; Boss Raids</p>
        </button>

        <button
          onClick={() => onNavigateToTab('armory')}
          className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-left hover:border-amber-500 transition group"
        >
          <span className="text-2xl block mb-1">🔨</span>
          <h5 className="text-xs font-black text-white group-hover:text-amber-300 transition">
            Blacksmith Forge
          </h5>
          <p className="text-[10px] text-slate-400 mt-0.5">Upgrade weapons &amp; armor to +10</p>
        </button>

        <button
          onClick={() => onNavigateToTab('lucky')}
          className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4 text-left hover:border-rose-500 transition group"
        >
          <span className="text-2xl block mb-1">🎰</span>
          <h5 className="text-xs font-black text-white group-hover:text-rose-300 transition">
            Lucky Royale Crate
          </h5>
          <p className="text-[10px] text-slate-400 mt-0.5">Spin for Legendary RPG loot</p>
        </button>

        <button
          onClick={() => onNavigateToTab('arena')}
          className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4 text-left hover:border-cyan-500 transition group"
        >
          <span className="text-2xl block mb-1">🏆</span>
          <h5 className="text-xs font-black text-white group-hover:text-cyan-300 transition">
            Battle Arena PvP
          </h5>
          <p className="text-[10px] text-slate-400 mt-0.5">Ranked Duels &amp; Hall of Fame</p>
        </button>
      </div>
    </div>
  );
}
