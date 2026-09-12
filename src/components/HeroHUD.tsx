'use client';

import React from 'react';
import { UserStats, CharacterConfig } from '@/lib/types';
import { Shield, Sparkles, Heart, Zap, Flame, Award, Crosshair, Edit3 } from 'lucide-react';

interface HeroHUDProps {
  stats: UserStats;
  character: CharacterConfig;
  onEditCharacter: () => void;
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
}

export function HeroHUD({ stats, character, onEditCharacter, gearBonuses }: HeroHUDProps) {
  const xpPercentage = Math.min(
    100,
    Math.max(0, Math.round((stats.currentXP / stats.nextLevelXP) * 100))
  );

  const hpPercentage = Math.min(
    100,
    Math.max(0, Math.round((stats.health / stats.maxHealth) * 100))
  );

  const manaPercentage = Math.min(
    100,
    Math.max(0, Math.round((stats.mana / stats.maxMana) * 100))
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-glow-card backdrop-blur-xl sm:p-6">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Avatar & Identity */}
        <div className="flex items-center gap-4">
          <div
            onClick={onEditCharacter}
            className="relative group cursor-pointer"
            title="Click to customize character & avatar"
          >
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-slate-800 to-slate-950 shadow-glow-gold transition-transform group-hover:scale-105">
              {character.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={character.avatarUrl}
                  alt={character.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl">⚔️</span>
              )}
            </div>

            {/* Edit overlay icon */}
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity">
              <Edit3 className="h-6 w-6 text-amber-300" />
            </div>

            <div className="absolute -bottom-2 -right-2 rounded-full border-2 border-slate-900 bg-gradient-to-r from-purple-600 to-indigo-600 px-2 py-0.5 text-xs font-black text-white shadow-md">
              LVL {stats.level}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white sm:text-2xl">
                {character.name}
              </h2>
              <span className="rounded-md border border-purple-500/40 bg-purple-500/10 px-2 py-0.5 text-xs font-bold text-purple-300">
                {character.class}
              </span>
              <button
                onClick={onEditCharacter}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-amber-300 transition"
                title="Edit Character Appearance"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {character.title} • Tier {Math.floor(stats.level / 5) + 1} Champion
            </p>

            {/* Passive Buff Badges */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {gearBonuses.bonusXP > 0 && (
                <span className="inline-flex items-center gap-1 rounded bg-purple-950/80 border border-purple-800/80 px-2 py-0.5 text-[11px] font-semibold text-purple-300">
                  <Sparkles className="h-3 w-3 text-purple-400" />
                  +{gearBonuses.bonusXP}% XP Boost
                </span>
              )}
              {gearBonuses.bonusGold > 0 && (
                <span className="inline-flex items-center gap-1 rounded bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  +{gearBonuses.bonusGold}% Gold Boost
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                <Award className="h-3 w-3 text-emerald-400" />
                {stats.totalTasksCompleted} Quests Cleared
              </span>
            </div>
          </div>
        </div>

        {/* Right: Health, Mana, and XP Bars */}
        <div className="flex-1 max-w-xl flex flex-col gap-3">
          {/* Health Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="flex items-center gap-1.5 text-rose-400">
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                HP (Vigor)
              </span>
              <span className="text-slate-300">
                {stats.health} / {stats.maxHealth}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800 p-0.5 border border-slate-700/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-600 to-red-500 transition-all duration-500"
                style={{ width: `${hpPercentage}%` }}
              />
            </div>
          </div>

          {/* Mana Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Zap className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
                Focus Mana
              </span>
              <span className="text-slate-300">
                {stats.mana} / {stats.maxMana}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 p-0.5 border border-slate-700/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
                style={{ width: `${manaPercentage}%` }}
              />
            </div>
          </div>

          {/* Experience Bar (High dopamine styling) */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="flex items-center gap-1.5 text-purple-400 font-extrabold">
                <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                EXPERIENCE (XP)
              </span>
              <span className="font-mono text-purple-300">
                {stats.currentXP.toLocaleString()} / {stats.nextLevelXP.toLocaleString()} XP ({xpPercentage}%)
              </span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-800 p-0.5 border border-purple-500/40 shadow-glow-xp">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 transition-all duration-700 ease-out"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
