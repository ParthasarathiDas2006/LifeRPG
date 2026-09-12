'use client';

import React, { useState, useEffect } from 'react';
import { Task, TaskCompletionResult, BossRaidData } from '@/lib/types';
import { QuestList } from '@/components/QuestList';
import {
  Swords,
  Timer,
  Skull,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Award,
  Zap,
  Flame,
  ShieldAlert,
} from 'lucide-react';
import { soundEngine } from '@/lib/sound';

interface OperationsSectionProps {
  tasks: Task[];
  onCompleteTask: (result: TaskCompletionResult) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenCreate: () => void;
  onRefreshData: () => void;
}

export function OperationsSection({
  tasks,
  onCompleteTask,
  onDeleteTask,
  onOpenCreate,
  onRefreshData,
}: OperationsSectionProps) {
  const [subTab, setSubTab] = useState<'QUESTS' | 'BOSSES' | 'FOCUS'>('QUESTS');

  // Boss Raids State
  const [bossRaids, setBossRaids] = useState<BossRaidData[]>([]);
  const [attackingBoss, setAttackingBoss] = useState<string | null>(null);
  const [bossBattleNotice, setBossBattleNotice] = useState<string | null>(null);

  // Focus Hyperdrive (Pomodoro Timer) State
  const [focusDuration, setFocusDuration] = useState(25 * 60); // 25 min default
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusSessionsCompleted, setFocusSessionsCompleted] = useState(0);

  // Fetch Boss Raids
  const loadBossRaids = async () => {
    try {
      const res = await fetch('/api/game/boss-raids');
      const data = await res.json();
      if (data.raids) setBossRaids(data.raids);
    } catch (err) {
      console.error('Failed to load boss raids', err);
    }
  };

  useEffect(() => {
    loadBossRaids();
  }, []);

  // Timer Tick Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timeLeft === 0) {
      // Completed focus session!
      setIsTimerRunning(false);
      soundEngine.playLevelUp();
      setFocusSessionsCompleted((prev) => prev + 1);
      // Claim Focus habit rewards via quick-habit
      fetch('/api/game/quick-habit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitType: 'FOCUS' }),
      }).then(() => {
        onRefreshData();
      });
      alert('⚡ FOCUS HYPERDRIVE COMPLETE! You resisted distraction, earned +120 XP, +75 GP, and +2 Willpower!');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft, onRefreshData]);

  // Handle Boss Strike
  const handleStrikeBoss = async (boss: BossRaidData) => {
    try {
      setAttackingBoss(boss.bossName);
      soundEngine.playCritStrike();

      // Damage dealt between 150 and 300
      const damage = Math.floor(Math.random() * 150) + 150;
      const res = await fetch('/api/game/boss-raids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bossName: boss.bossName, damage }),
      });

      const data = await res.json();
      if (data.defeated) {
        soundEngine.playLevelUp();
        setBossBattleNotice(
          `⚔️ BOSS DEFEATED! ${boss.bossName} slain! You earned +${data.rewards?.xp} XP, +${data.rewards?.gold} GP and unlocked '${data.rewards?.loot}'!`
        );
      } else {
        soundEngine.playTaskComplete();
        setBossBattleNotice(`💥 Solid Strike! You dealt ${damage} DMG to ${boss.bossName}!`);
      }

      loadBossRaids();
      onRefreshData();
      setTimeout(() => setBossBattleNotice(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setAttackingBoss(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Sub-Tab Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('QUESTS')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black tracking-wide transition ${
              subTab === 'QUESTS'
                ? 'bg-purple-600 text-white shadow-glow-xp'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Swords className="h-4 w-4" />
            <span>Active Quests ({tasks.length})</span>
          </button>

          <button
            onClick={() => setSubTab('BOSSES')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black tracking-wide transition ${
              subTab === 'BOSSES'
                ? 'bg-rose-600 text-white shadow-glow-xp'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Skull className="h-4 w-4 text-rose-300" />
            <span>Boss Raids (IRL Feats)</span>
          </button>

          <button
            onClick={() => setSubTab('FOCUS')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black tracking-wide transition ${
              subTab === 'FOCUS'
                ? 'bg-cyan-600 text-white shadow-glow-xp'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Timer className="h-4 w-4 text-cyan-300" />
            <span>Focus Hyperdrive</span>
          </button>
        </div>

        {subTab === 'QUESTS' && (
          <button
            onClick={() => {
              soundEngine.playTaskComplete();
              onOpenCreate();
            }}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-glow-xp hover:from-purple-500 hover:to-indigo-500 transition"
          >
            <Plus className="h-4 w-4" />
            <span>+ Create Custom Quest</span>
          </button>
        )}
      </div>

      {/* Notice Banner */}
      {bossBattleNotice && (
        <div className="rounded-2xl border border-rose-500/80 bg-slate-900/95 p-4 text-xs font-black text-rose-300 shadow-glow-xp backdrop-blur-md animate-in slide-in-from-top-3">
          {bossBattleNotice}
        </div>
      )}

      {/* Sub-Tab 1: Standard Quests List */}
      {subTab === 'QUESTS' && (
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md">
          <QuestList
            tasks={tasks}
            onCompleteTask={onCompleteTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
      )}

      {/* Sub-Tab 2: Boss Raids (IRL Mega-Challenges) */}
      {subTab === 'BOSSES' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4">
            <h3 className="text-sm font-black text-rose-300 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              World Boss Encounters • Real-Life Mega Feats
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Bosses possess colossal health pools. Each time you execute a demanding real-world workout, marathon deep work sprint, or uninterrupted 8-hour sleep recovery, strike the boss to deplete its health and claim legendary artifacts!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bossRaids.map((boss) => {
              const hpPercent = Math.round((boss.currentHp / boss.maxHp) * 100);
              return (
                <div
                  key={boss.bossName}
                  className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 flex flex-col justify-between shadow-glow-card relative overflow-hidden group hover:border-rose-500/60 transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{boss.bossAvatar}</span>
                      <span className="rounded-full bg-rose-500/20 border border-rose-500/40 px-2.5 py-0.5 text-[10px] font-black text-rose-300">
                        PHASE {boss.phase}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-white">{boss.bossName}</h4>
                    <p className="text-xs text-rose-400/80 font-medium">{boss.bossTitle}</p>

                    {/* HP Bar */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-400">Boss Integrity</span>
                        <span className="font-mono text-rose-400">
                          {boss.currentHp} / {boss.maxHp} HP ({hpPercent}%)
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800 border border-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 transition-all duration-300"
                          style={{ width: `${hpPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Rewards Preview */}
                    <div className="mt-4 rounded-xl bg-slate-950/60 p-3 space-y-1 text-xs">
                      <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                        Victory Bounty
                      </span>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>XP Drop:</span>
                        <span className="font-bold text-purple-400">+{boss.rewards.xp} XP</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Gold Drop:</span>
                        <span className="font-bold text-amber-400">+{boss.rewards.gold} GP</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300 text-[11px]">
                        <span>Artifact:</span>
                        <span className="font-bold text-cyan-300 line-clamp-1">{boss.rewards.guaranteedLoot}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStrikeBoss(boss)}
                    disabled={attackingBoss === boss.bossName}
                    className="mt-5 w-full rounded-xl bg-gradient-to-r from-rose-600 to-red-600 py-2.5 text-xs font-black text-white shadow-glow-xp hover:from-rose-500 hover:to-red-500 transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <Flame className="h-4 w-4" />
                    <span>{attackingBoss === boss.bossName ? 'Attacking...' : '⚔️ Strike Boss (IRL Feat Done)'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: IRL Focus Hyperdrive (Pomodoro Combat Timer) */}
      {subTab === 'FOCUS' && (
        <div className="max-w-2xl mx-auto rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-xs font-black uppercase tracking-wider text-cyan-300">
            <Timer className="h-4 w-4" />
            <span>IRL Focus Hyperdrive Engine</span>
          </div>

          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Zero-distraction productivity protocol. Lock in for a 25-minute combat sprint. Resisting distractions generates Willpower points and massive XP gains.
          </p>

          {/* Glowing Circular Countdown */}
          <div className="relative mx-auto flex h-60 w-60 items-center justify-center rounded-full border-4 border-cyan-500/50 bg-slate-950 shadow-glow-xp">
            <div className="flex flex-col items-center">
              <span className="font-mono text-5xl font-black tracking-widest text-white">
                {formatTime(timeLeft)}
              </span>
              <span className="mt-1 text-[11px] font-black uppercase tracking-widest text-cyan-400">
                {isTimerRunning ? 'HYPERDRIVE ACTIVE' : 'STANDBY'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                soundEngine.playFocusChime();
                setIsTimerRunning(!isTimerRunning);
              }}
              className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black transition active:scale-95 ${
                isTimerRunning
                  ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-xp'
              }`}
            >
              {isTimerRunning ? (
                <>
                  <Pause className="h-4 w-4" /> Pause Sprint
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Engage Hyperdrive
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimeLeft(focusDuration);
              }}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-xs font-bold text-slate-300 hover:bg-slate-700 transition"
              title="Reset Timer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-6">
            <div className="rounded-xl bg-slate-900/80 p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Sprints Cleared Today
              </span>
              <span className="text-lg font-black text-cyan-300 font-mono">
                {focusSessionsCompleted} Sessions
              </span>
            </div>
            <div className="rounded-xl bg-slate-900/80 p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Reward per Sprint
              </span>
              <span className="text-lg font-black text-amber-300 font-mono">
                +120 XP • +75 GP
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
