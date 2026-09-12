'use client';

import React, { useEffect } from 'react';
import { Sparkles, Trophy, Heart, Zap, Award } from 'lucide-react';
import { soundEngine } from '@/lib/sound';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  unlockedAchievements?: Array<{ title: string; icon: string; description: string }>;
}

export function LevelUpModal({
  isOpen,
  onClose,
  newLevel,
  unlockedAchievements = [],
}: LevelUpModalProps) {
  useEffect(() => {
    if (isOpen) {
      soundEngine.playLevelUp();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md animate-in zoom-in-95">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border-2 border-amber-500/60 bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center shadow-glow-gold">
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-amber-500/20 blur-3xl" />

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-glow-gold mb-4 animate-bounce">
          <Trophy className="h-10 w-10" />
        </div>

        <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-amber-300">
          Ascension Achieved!
        </span>

        <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
          LEVEL {newLevel}
        </h2>

        <p className="mt-1 text-xs text-slate-300">
          Your sustained dedication has unlocked new thresholds of mental and physical mastery.
        </p>

        {/* Benefits list */}
        <div className="my-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 space-y-2 text-left text-xs">
          <div className="flex items-center gap-2 text-rose-400 font-bold">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            <span>Health & Focus Mana Fully Restored!</span>
          </div>
          <div className="flex items-center gap-2 text-purple-400 font-bold">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span>Maximum Attribute Limits Expanded</span>
          </div>

          {unlockedAchievements.length > 0 && (
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                Achievements Unlocked:
              </span>
              {unlockedAchievements.map((ach) => (
                <div key={ach.title} className="mt-1 flex items-center gap-2 font-bold text-slate-200">
                  <span className="text-base">{ach.icon}</span>
                  <div>
                    <div>{ach.title}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{ach.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 py-3 text-sm font-black text-slate-950 shadow-glow-gold transition hover:from-amber-400 hover:to-yellow-300 active:scale-95"
        >
          Claim Glory & Continue
        </button>
      </div>
    </div>
  );
}
