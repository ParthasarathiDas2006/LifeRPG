'use client';

import React, { useState } from 'react';
import { Task, TaskCategory, TaskCompletionResult } from '@/lib/types';
import {
  Flame,
  CheckCircle2,
  Sparkles,
  Coins,
  Trash2,
  Dumbbell,
  BookOpen,
  HeartPulse,
  Zap,
  Users,
  Swords,
} from 'lucide-react';
import { soundEngine } from '@/lib/sound';

interface QuestListProps {
  tasks: Task[];
  onCompleteTask: (result: TaskCompletionResult) => void;
  onDeleteTask: (taskId: string) => void;
}

export function QuestList({ tasks, onCompleteTask, onDeleteTask }: QuestListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [combatText, setCombatText] = useState<{
    id: string;
    text: string;
    isCrit: boolean;
  } | null>(null);

  const categories: Array<{ key: string; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { key: 'ALL', label: 'All Quests', icon: Swords },
    { key: 'STRENGTH', label: 'Strength', icon: Dumbbell },
    { key: 'INTELLIGENCE', label: 'Intellect', icon: BookOpen },
    { key: 'VITALITY', label: 'Vitality', icon: HeartPulse },
    { key: 'AGILITY', label: 'Agility', icon: Zap },
    { key: 'CHARISMA', label: 'Charisma', icon: Users },
    { key: 'WILLPOWER', label: 'Willpower', icon: Flame },
  ];

  const filteredTasks = tasks.filter((t) => {
    if (selectedCategory === 'ALL') return true;
    return t.category === selectedCategory;
  });

  const handleComplete = async (taskId: string) => {
    try {
      setCompletingId(taskId);
      const res = await fetch(`/api/tasks/${taskId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data: TaskCompletionResult = await res.json();
      if (!res.ok) {
        soundEngine.playError();
        alert((data as unknown as { error: string }).error || 'Failed to complete task');
        return;
      }

      // Play audio feedback
      if (data.rewards.isCrit) {
        soundEngine.playCritStrike();
      } else {
        soundEngine.playTaskComplete();
      }

      // Display floating combat text
      const critPrefix = data.rewards.isCrit ? '💥 CRIT! ' : '';
      const text = `${critPrefix}+${data.rewards.xpEarned} XP  +${data.rewards.goldEarned} GP`;
      setCombatText({ id: taskId, text, isCrit: data.rewards.isCrit });
      setTimeout(() => setCombatText(null), 1500);

      // Trigger parent handler
      onCompleteTask(data);
    } catch (err) {
      console.error(err);
      soundEngine.playError();
    } finally {
      setCompletingId(null);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'TRIVIAL':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'EASY':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      case 'MEDIUM':
        return 'bg-sky-950/80 text-sky-300 border-sky-800';
      case 'HARD':
        return 'bg-amber-950/80 text-amber-300 border-amber-800';
      case 'EPIC':
        return 'bg-purple-950/80 text-purple-300 border-purple-800 shadow-glow-xp';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                isActive
                  ? 'bg-purple-600 text-white shadow-glow-xp'
                  : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Task Cards Grid */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center">
            <Swords className="mx-auto h-8 w-8 text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-400">
              No quests found in this category.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Click &quot;New Quest&quot; to embark on a new habit journey.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.isCompletedToday;
            const isPending = completingId === task.id;

            return (
              <div
                key={task.id}
                className={`relative overflow-hidden rounded-2xl border transition-all ${
                  isCompleted
                    ? 'border-emerald-900/40 bg-slate-950/40 opacity-75'
                    : 'border-slate-800 bg-slate-900/90 shadow-md hover:border-slate-700'
                } p-4 sm:p-5`}
              >
                {/* Floating Combat Text Overlay */}
                {combatText && combatText.id === task.id && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
                    <div
                      className={`text-lg sm:text-xl font-black floating-combat-text ${
                        combatText.isCrit
                          ? 'text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                          : 'text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                      }`}
                    >
                      {combatText.text}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* Left: Quest Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${getDifficultyColor(
                          task.difficulty
                        )}`}
                      >
                        {task.difficulty}
                      </span>

                      <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                        {task.category}
                      </span>

                      {task.streakCount > 0 && (
                        <span className="flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                          <Flame className="h-3 w-3 fill-amber-500 text-amber-500" />
                          {task.streakCount} Day Streak
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-base font-bold text-white ${
                        isCompleted ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    {/* Reward Preview */}
                    <div className="flex items-center gap-3 pt-1 text-xs">
                      <span className="flex items-center gap-1 font-bold text-purple-400">
                        <Sparkles className="h-3.5 w-3.5" />
                        +{task.baseXP} Base XP
                      </span>
                      <span className="flex items-center gap-1 font-bold text-amber-400">
                        <Coins className="h-3.5 w-3.5" />
                        +{task.baseGold} Gold
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 sm:self-center">
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-950/40 hover:text-rose-400"
                      title="Abandon Quest"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleComplete(task.id)}
                      disabled={isCompleted || isPending}
                      className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all active:scale-95 ${
                        isCompleted
                          ? 'border border-emerald-800/80 bg-emerald-950/40 text-emerald-400 cursor-default'
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-xp hover:from-purple-500 hover:to-indigo-500'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{isCompleted ? 'Completed Today' : isPending ? 'Claiming...' : 'Complete Quest'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
