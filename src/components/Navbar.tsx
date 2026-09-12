'use client';

import React from 'react';
import {
  Shield,
  Sparkles,
  Coins,
  Flame,
  User,
  Plus,
  Compass,
  Swords,
  Hammer,
  Gift,
  Trophy,
  Brain,
} from 'lucide-react';
import { soundEngine } from '@/lib/sound';
import { CharacterConfig } from '@/lib/types';
import { AudioPlayerHUD } from '@/components/AudioPlayerHUD';

export type GameTab = 'lobby' | 'sanctuary' | 'operations' | 'armory' | 'lucky' | 'arena' | 'talents';

interface NavbarProps {
  gold: number;
  virtueCoins?: number;
  streakFreezeTokens: number;
  character?: CharacterConfig;
  activeTab: GameTab;
  onSelectTab: (tab: GameTab) => void;
  onOpenCharacter: () => void;
  onOpenCreate: () => void;
}

export function Navbar({
  gold,
  virtueCoins = 45,
  streakFreezeTokens,
  character,
  activeTab,
  onSelectTab,
  onOpenCharacter,
  onOpenCreate,
}: NavbarProps) {
  const navItems: Array<{ id: GameTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'sanctuary', label: '🏛️ Sanctuary of Virtues', icon: Sparkles },
    { id: 'lobby', label: 'Lobby HQ', icon: Compass },
    { id: 'operations', label: 'Operations & Quests', icon: Swords },
    { id: 'armory', label: 'Armory & Forge', icon: Hammer },
    { id: 'lucky', label: 'Lucky Royale', icon: Gift },
    { id: 'arena', label: 'Arena PvP', icon: Trophy },
    { id: 'talents', label: 'Talents', icon: Brain },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Logo */}
        <div
          onClick={() => {
            soundEngine.playCoin();
            onSelectTab('sanctuary');
          }}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-glow-xp ring-1 ring-white/20">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black tracking-wider text-white text-lg">LIFE</span>
              <span className="rounded-md bg-gradient-to-r from-amber-400 to-yellow-500 px-1.5 py-0.5 text-xs font-black tracking-widest text-slate-950">
                RPG
              </span>
            </div>
            <p className="text-[10px] font-bold text-purple-400">Moral Training &amp; Virtues</p>
          </div>
        </div>

        {/* Center: Dopamine BGM Player */}
        <div className="hidden md:flex items-center">
          <AudioPlayerHUD />
        </div>

        {/* Currency & Hero Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Gold */}
          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-300 shadow-glow-gold">
            <Coins className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>{gold.toLocaleString()}</span>
            <span className="hidden sm:inline text-[10px] text-amber-400/80">GP</span>
          </div>

          {/* Virtue Coins */}
          <div
            className="flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 text-xs font-black text-purple-300"
            title="Virtue Coins for Sanctuary Attunement"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>{virtueCoins}</span>
            <span className="hidden sm:inline text-[10px] text-purple-400/80">VC</span>
          </div>

          {/* Streak Shields */}
          <div
            className="flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-black text-cyan-300"
            title="Streak Shields active"
          >
            <Flame className="h-3.5 w-3.5 text-cyan-400" />
            <span>{streakFreezeTokens}</span>
          </div>

          {/* Character Studio Avatar Button */}
          <button
            onClick={() => {
              soundEngine.playEquip();
              onOpenCharacter();
            }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 p-1.5 hover:border-amber-400 transition"
            title="Character Studio"
          >
            {character?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={character.avatarUrl}
                alt="Hero"
                className="h-6 w-6 rounded-lg object-cover border border-amber-400/50"
              />
            ) : (
              <User className="h-5 w-5 text-amber-400" />
            )}
          </button>

          {/* New Quest */}
          <button
            onClick={() => {
              soundEngine.playTaskComplete();
              onOpenCreate();
            }}
            className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 text-xs font-black text-white shadow-glow-xp hover:from-purple-500 hover:to-indigo-500 transition active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Quest</span>
          </button>
        </div>
      </div>

      {/* Mobile BGM Controller Strip */}
      <div className="flex md:hidden items-center justify-center border-t border-slate-900 py-1.5 bg-slate-950">
        <AudioPlayerHUD />
      </div>

      {/* Primary Game Section Tabs Bar */}
      <nav className="border-t border-slate-800/80 bg-slate-950/95 overflow-x-auto">
        <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6">
          <div className="flex space-x-1 sm:space-x-2 py-1.5 min-w-max">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundEngine.playEquip();
                    onSelectTab(item.id);
                  }}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-black tracking-wide transition relative ${
                    isActive
                      ? 'text-white bg-purple-600/30 border border-purple-500/50 shadow-glow-xp'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-purple-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
