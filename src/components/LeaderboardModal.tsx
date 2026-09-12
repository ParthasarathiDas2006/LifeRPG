'use client';

import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/lib/types';
import { X, Trophy, Flame, Sparkles, Award } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/leaderboard')
        .then((res) => res.json())
        .then((data) => {
          if (data.leaderboard) setEntries(data.leaderboard);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Hall of Grandmasters</h3>
            <p className="text-xs text-slate-400">Global rankings ranked by total XP and discipline streaks</p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400">Summoning rankings...</div>
          ) : (
            <div className="divide-y divide-slate-850">
              {entries.map((player) => {
                const isUser = player.username.includes('You');
                return (
                  <div
                    key={player.username}
                    className={`flex items-center justify-between p-3.5 transition ${
                      isUser
                        ? 'bg-purple-950/40 border-l-4 border-purple-500'
                        : 'hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${
                          player.rank === 1
                            ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                            : player.rank === 2
                            ? 'bg-slate-300 text-slate-950'
                            : player.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {player.rank}
                      </span>

                      {player.avatar && (player.avatar.startsWith('data:image') || player.avatar.startsWith('http')) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={player.avatar}
                          alt={player.username}
                          className="h-8 w-8 rounded-lg object-cover border border-slate-700 shadow-sm"
                        />
                      ) : (
                        <span className="text-xl">{player.avatar}</span>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className={`text-xs font-black ${isUser ? 'text-purple-300' : 'text-white'}`}>
                            {player.username}
                          </h5>
                          {isUser && (
                            <span className="rounded bg-purple-500/20 px-1.5 py-0.2 text-[9px] font-bold text-purple-400">
                              YOU
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">{player.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span>{player.streak}d</span>
                      </div>

                      <div>
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-extrabold text-slate-200">
                          LVL {player.level}
                        </span>
                        <div className="text-[10px] text-purple-400 font-mono">
                          {player.totalXP.toLocaleString()} XP
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
