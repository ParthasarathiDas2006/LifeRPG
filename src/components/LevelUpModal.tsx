'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Heart, Coins, Award } from 'lucide-react';
import { soundEngine } from '@/lib/sound';
import { getVirtueRankTitle } from '@/lib/progression';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  virtueCoinsEarned?: number;
  unlockedAchievements?: Array<{ title: string; icon: string; description: string }>;
}

export function LevelUpModal({
  isOpen,
  onClose,
  newLevel,
  virtueCoinsEarned,
  unlockedAchievements = [],
}: LevelUpModalProps) {
  useEffect(() => {
    if (isOpen) {
      soundEngine.playLevelUp();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const title = getVirtueRankTitle(newLevel);
  const coinsReward = virtueCoinsEarned || newLevel * 5;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
        {/* Radiant Backdrop Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1.2 }}
          className="pointer-events-none absolute h-96 w-96 rounded-full bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 blur-3xl"
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 280 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border-2 border-amber-500/60 bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center shadow-glow-gold"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-glow-gold mb-4 animate-bounce">
            <Trophy className="h-10 w-10" />
          </div>

          <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-amber-300">
            Ascension Achieved!
          </span>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
            LEVEL {newLevel}
          </h2>

          <p className="mt-1 text-sm font-semibold text-amber-300">
            "{title}"
          </p>

          <p className="mt-1 text-xs text-slate-300">
            Your sustained dedication and moral consistency have elevated your spiritual standing.
          </p>

          {/* Benefits list */}
          <div className="my-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 space-y-2.5 text-left text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
              <span>Health & Focus Mana Fully Restored</span>
            </div>

            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Coins className="h-4 w-4 text-amber-400" />
              <span>+{coinsReward} Virtue Coins Granted!</span>
            </div>

            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>Moral Attribute Capacities Expanded</span>
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
