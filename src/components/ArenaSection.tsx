'use client';

import React, { useState, useEffect } from 'react';
import {
  ArenaOpponent,
  ArenaBattleLog,
  RankedTier,
  LeaderboardEntry,
} from '@/lib/types';
import {
  Trophy,
  Swords,
  Crown,
  Shield,
  Sparkles,
  Flame,
  Award,
  Zap,
} from 'lucide-react';
import { soundEngine } from '@/lib/sound';

interface ArenaSectionProps {
  playerLevel: number;
  playerName: string;
  playerCombatPower: number;
  onRefreshData: () => void;
}

export function ArenaSection({
  playerLevel,
  playerName,
  playerCombatPower,
  onRefreshData,
}: ArenaSectionProps) {
  const [opponents, setOpponents] = useState<ArenaOpponent[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isDueling, setIsDueling] = useState(false);
  const [activeBattleLogs, setActiveBattleLogs] = useState<ArenaBattleLog[]>([]);
  const [battleResult, setBattleResult] = useState<{
    victory: boolean;
    xpGained: number;
    goldGained: number;
  } | null>(null);

  const loadArenaData = async () => {
    try {
      const [aRes, lRes] = await Promise.all([
        fetch('/api/game/arena'),
        fetch('/api/leaderboard'),
      ]);
      const [aData, lData] = await Promise.all([aRes.json(), lRes.json()]);
      if (aData.opponents) setOpponents(aData.opponents);
      if (lData.leaderboard) setLeaderboard(lData.leaderboard);
    } catch (err) {
      console.error('Failed to load arena data', err);
    }
  };

  useEffect(() => {
    loadArenaData();
  }, []);

  // Free Fire-style Ranked Tier system
  const tiers: Array<{ name: RankedTier; cpRequired: number; color: string; icon: string }> = [
    { name: 'BRONZE', cpRequired: 0, color: 'text-amber-600', icon: '🥉' },
    { name: 'SILVER', cpRequired: 250, color: 'text-slate-300', icon: '🥈' },
    { name: 'GOLD', cpRequired: 500, color: 'text-yellow-400', icon: '🏅' },
    { name: 'PLATINUM', cpRequired: 900, color: 'text-emerald-400', icon: '⭐' },
    { name: 'DIAMOND', cpRequired: 1300, color: 'text-cyan-300', icon: '💎' },
    { name: 'HEROIC', cpRequired: 1800, color: 'text-amber-400', icon: '🔥' },
    { name: 'GRANDMASTER', cpRequired: 2500, color: 'text-rose-400', icon: '👑' },
  ];

  const currentTier =
    [...tiers].reverse().find((t) => playerCombatPower >= t.cpRequired) || tiers[0];

  // Handle Arena Duel Simulation
  const handleDuel = async (opp: ArenaOpponent) => {
    try {
      setIsDueling(true);
      setActiveBattleLogs([]);
      setBattleResult(null);
      soundEngine.playArenaClash();

      const res = await fetch('/api/game/arena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opponentId: opp.id }),
      });
      const data = await res.json();

      setTimeout(() => {
        setIsDueling(false);
        setActiveBattleLogs(data.logs || []);
        setBattleResult({
          victory: data.victory,
          xpGained: data.xpGained,
          goldGained: data.goldGained,
        });

        if (data.victory) {
          soundEngine.playLevelUp();
        } else {
          soundEngine.playError();
        }

        onRefreshData();
      }, 1200);
    } catch (err) {
      console.error(err);
      setIsDueling(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-indigo-400" />
            Battle Arena &amp; Ranked Tiers
          </h3>
          <p className="text-xs text-slate-400">
            Climb from Bronze to Grandmaster through asynchronous duels and habit milestones
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-xs font-black text-indigo-300 shadow-glow-xp">
          <span className="text-lg">{currentTier.icon}</span>
          <span>Rank: {currentTier.name} ({playerCombatPower.toLocaleString()} CP)</span>
        </div>
      </div>

      {/* Free Fire Style Tier Hierarchy Bar */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Crown className="h-4 w-4 text-amber-400" />
          Season Ranked Progression Pathway
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {tiers.map((t) => {
            const isUnlocked = playerCombatPower >= t.cpRequired;
            const isCurrent = currentTier.name === t.name;
            return (
              <div
                key={t.name}
                className={`rounded-2xl border p-3 text-center transition ${
                  isCurrent
                    ? 'border-amber-400 bg-amber-500/20 shadow-glow-gold scale-105'
                    : isUnlocked
                    ? 'border-purple-500/40 bg-purple-950/30 text-white'
                    : 'border-slate-800/80 bg-slate-950/60 opacity-40'
                }`}
              >
                <span className="text-2xl block mb-1">{t.icon}</span>
                <span className={`text-[11px] font-black uppercase tracking-wider block ${t.color}`}>
                  {t.name}
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  {t.cpRequired.toLocaleString()} CP
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Asynchronous Phantom Arena Duels */}
      <div className="space-y-4">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Swords className="h-4 w-4 text-rose-400" />
          Phantom Champion Duels (Asynchronous Arena)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opponents.map((opp) => (
            <div
              key={opp.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between shadow-glow-card hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-2xl border border-slate-700">
                    {opp.avatar}
                  </div>
                  <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-black text-purple-300">
                    {opp.tier}
                  </span>
                </div>

                <h5 className="text-sm font-black text-white">{opp.name}</h5>
                <p className="text-xs text-slate-400">{opp.title} • LVL {opp.level}</p>

                {/* Opponent Combat Power */}
                <div className="mt-3 rounded-xl bg-slate-950/60 p-3 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Combat Power:</span>
                    <span className="font-mono font-bold text-amber-300">⚡ {opp.combatPower} CP</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Bounty on Win:</span>
                    <span className="font-bold text-purple-300">+{opp.winRewardXP} XP • +{opp.winRewardGold} GP</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDuel(opp)}
                disabled={isDueling}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 py-2.5 text-xs font-black text-white shadow-glow-xp hover:from-rose-500 hover:to-indigo-500 transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Swords className="h-4 w-4" />
                <span>{isDueling ? 'Simulating Combat...' : '⚔️ Challenge in Arena'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Battle Logs & Result Panel */}
        {battleResult && (
          <div
            className={`rounded-2xl border p-6 text-center space-y-4 animate-in zoom-in-95 ${
              battleResult.victory
                ? 'border-emerald-500/80 bg-emerald-950/30 text-emerald-300 shadow-glow-xp'
                : 'border-rose-500/80 bg-rose-950/30 text-rose-300 shadow-glow-card'
            }`}
          >
            <span className="text-4xl block">
              {battleResult.victory ? '🏆' : '💀'}
            </span>
            <h4 className="text-lg font-black tracking-wider">
              {battleResult.victory ? 'ARENA VICTORY!' : 'ARENA DEFEAT!'}
            </h4>
            <p className="text-xs">
              {battleResult.victory
                ? `You vanquished the phantom rival and claimed +${battleResult.xpGained} XP and +${battleResult.goldGained} GP!`
                : `The rival overwhelmed your defenses. Consolation reward: +${battleResult.xpGained} XP.`}
            </p>

            {/* Combat Turns Log */}
            <div className="max-h-40 overflow-y-auto rounded-xl bg-slate-950/80 p-3 text-left font-mono text-[11px] space-y-1 text-slate-300">
              {activeBattleLogs.map((log, idx) => (
                <div key={idx} className="border-b border-slate-900 pb-1">
                  <span className="text-purple-400 font-bold">Round {log.turn}:</span> {log.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Global Hall of Legends (Leaderboard) */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Award className="h-4 w-4 text-yellow-400" />
          Global Hall of Legends (Ranked Leaderboard)
        </h4>

        <div className="space-y-2">
          {leaderboard.map((entry) => {
            const isUser = entry.username.includes('(You)');
            return (
              <div
                key={entry.rank}
                className={`flex items-center justify-between rounded-2xl border p-3.5 transition ${
                  isUser
                    ? 'border-amber-400/80 bg-amber-500/10 shadow-glow-gold'
                    : 'border-slate-800/80 bg-slate-950/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 font-mono text-xs font-black text-amber-400">
                    #{entry.rank}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{entry.avatar}</span>
                    <div>
                      <h5 className="text-xs font-black text-white flex items-center gap-1.5">
                        {entry.username}
                        {isUser && (
                          <span className="rounded bg-amber-400/20 px-1 py-0.2 text-[9px] font-black text-amber-300">
                            YOU
                          </span>
                        )}
                      </h5>
                      <span className="text-[10px] text-slate-400">{entry.title}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-xs font-black text-purple-300 block font-mono">
                      LVL {entry.level}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {entry.totalXP.toLocaleString()} XP
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Flame className="h-3.5 w-3.5" />
                    <span>{entry.streak}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
