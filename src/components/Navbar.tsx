'use client';

import React from 'react';
import { Shield, Sparkles, Coins, Flame, Backpack, ShoppingBag, Trophy, Plus, User } from 'lucide-react';
import { soundEngine } from '@/lib/sound';
import { CharacterConfig } from '@/lib/types';

interface NavbarProps {
  gold: number;
  streakFreezeTokens: number;
  character?: CharacterConfig;
  onOpenCharacter: () => void;
  onOpenCreate: () => void;
  onOpenInventory: () => void;
  onOpenShop: () => void;
  onOpenLeaderboard: () => void;
}

export function Navbar({
  gold,
  streakFreezeTokens,
  character,
  onOpenCharacter,
  onOpenCreate,
  onOpenInventory,
  onOpenShop,
  onOpenLeaderboard,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-glow-xp ring-1 ring-white/20">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-white text-lg">LIFE</span>
              <span className="rounded bg-gradient-to-r from-amber-400 to-yellow-500 px-1.5 py-0.5 text-xs font-black tracking-widest text-slate-950">
                RPG
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-400">Level Up Real Life</p>
          </div>
        </div>

        {/* Currency & Quick Stats */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 shadow-glow-gold">
            <Coins className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>{gold.toLocaleString()}</span>
            <span className="hidden sm:inline text-[10px] text-amber-400/70">GP</span>
          </div>

          <div
            className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300"
            title="Streak Freeze Shields active"
          >
            <Flame className="h-3.5 w-3.5 text-cyan-400" />
            <span>{streakFreezeTokens}</span>
            <span className="hidden sm:inline text-[10px] text-cyan-400/70">Shields</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                soundEngine.playEquip();
                onOpenCharacter();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-amber-500 hover:bg-slate-700 active:scale-95"
              title="Character Creation & Avatar Studio"
            >
              {character?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={character.avatarUrl}
                  alt="Hero"
                  className="h-4 w-4 rounded-full object-cover border border-amber-500/50"
                />
              ) : (
                <User className="h-4 w-4 text-amber-400" />
              )}
              <span className="hidden md:inline font-bold">Hero</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playEquip();
                onOpenInventory();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-purple-500 hover:bg-slate-700 active:scale-95"
              title="Inventory & Gear"
            >
              <Backpack className="h-4 w-4 text-purple-400" />
              <span className="hidden md:inline">Gear</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playCoin();
                onOpenShop();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-amber-500 hover:bg-slate-700 active:scale-95"
              title="Item Shop"
            >
              <ShoppingBag className="h-4 w-4 text-amber-400" />
              <span className="hidden md:inline">Shop</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playTaskComplete();
                onOpenLeaderboard();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-indigo-500 hover:bg-slate-700 active:scale-95"
              title="Rankings"
            >
              <Trophy className="h-4 w-4 text-indigo-400" />
              <span className="hidden md:inline">Ranks</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playTaskComplete();
                onOpenCreate();
              }}
              className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-glow-xp transition hover:from-purple-500 hover:to-indigo-500 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Quest</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
