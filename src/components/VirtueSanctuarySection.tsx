'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Heart,
  Compass,
  Flame,
  Sparkles,
  Coins,
  Check,
  Palette,
  Feather,
  RefreshCw,
  Sun,
  Moon,
  Clock,
} from 'lucide-react';
import { Task, UserStats, VirtueTheme } from '@/lib/types';
import { getVirtueRankTitle } from '@/lib/progression';

interface Props {
  stats: UserStats;
  tasks: Task[];
  onCompleteTask: (taskId: string) => Promise<void>;
  onOpenReflectionModal: (task: Task) => void;
  onThemeChanged?: (themeId: string) => void;
}

const KINDNESS_SEEDS = [
  'Send an unprompted message of appreciation to someone who helped you in the past.',
  'Notice someone working diligently in silence today and offer genuine, specific praise.',
  'Let an agitated driver, shopper, or colleague move ahead of you with a genuine smile.',
  'Practice active listening in your next conversation: no interruptions or advice, just presence.',
  'Forgive a small irritation or slight without bringing it up to the other person.',
  'Leave a kind, anonymous encouraging note or positive review for a creator or worker.',
];

export const VirtueSanctuarySection: React.FC<Props> = ({
  stats,
  tasks,
  onCompleteTask,
  onOpenReflectionModal,
  onThemeChanged,
}) => {
  const [activeVirtueFilter, setActiveVirtueFilter] = useState<'ALL' | 'INTEGRITY' | 'COMPASSION' | 'DISCIPLINE' | 'WISDOM'>('ALL');
  const [currentSeedIndex, setCurrentSeedIndex] = useState(0);
  const [activeTheme, setActiveTheme] = useState<string>(stats.activeTheme || 'theme_mind_garden');
  const [themeFeedback, setThemeFeedback] = useState<string | null>(null);

  const moralTasks = tasks.filter((t) => 
    ['INTEGRITY', 'COMPASSION', 'DISCIPLINE', 'WISDOM'].includes(t.category) ||
    Boolean(t.moralAttribute) ||
    t.type === 'NEGATIVE_RESTRAINT' ||
    t.type === 'REFLECTION'
  );

  const filteredTasks = activeVirtueFilter === 'ALL'
    ? moralTasks
    : moralTasks.filter((t) => t.category === activeVirtueFilter || t.moralAttribute === activeVirtueFilter);

  const restraintTasks = moralTasks.filter((t) => t.type === 'NEGATIVE_RESTRAINT');

  const virtues = [
    {
      id: 'INTEGRITY' as const,
      name: 'Integrity',
      subtitle: 'Truth & Radical Ownership',
      points: stats.integrity || 14,
      level: Math.floor((stats.integrity || 14) / 10) + 1,
      icon: ShieldCheck,
      color: 'from-amber-500 to-yellow-600',
      glow: 'shadow-amber-500/20 border-amber-500/30',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      progress: ((stats.integrity || 14) % 10) * 10,
    },
    {
      id: 'COMPASSION' as const,
      name: 'Compassion',
      subtitle: 'Lovingkindness & Empathy',
      points: stats.compassion || 18,
      level: Math.floor((stats.compassion || 18) / 10) + 1,
      icon: Heart,
      color: 'from-emerald-500 to-teal-600',
      glow: 'shadow-emerald-500/20 border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      progress: ((stats.compassion || 18) % 10) * 10,
    },
    {
      id: 'DISCIPLINE' as const,
      name: 'Discipline',
      subtitle: 'Fortitude & Focused Will',
      points: stats.discipline || 16,
      level: Math.floor((stats.discipline || 16) / 10) + 1,
      icon: Compass,
      color: 'from-indigo-500 to-blue-600',
      glow: 'shadow-indigo-500/20 border-indigo-500/30',
      badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
      progress: ((stats.discipline || 16) % 10) * 10,
    },
    {
      id: 'WISDOM' as const,
      name: 'Wisdom',
      subtitle: 'Equanimity & Perspective',
      points: stats.wisdom || 19,
      level: Math.floor((stats.wisdom || 19) / 10) + 1,
      icon: Flame,
      color: 'from-purple-500 to-fuchsia-600',
      glow: 'shadow-purple-500/20 border-purple-500/30',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      progress: ((stats.wisdom || 19) % 10) * 10,
    },
  ];

  const sanctuaryThemes: VirtueTheme[] = [
    {
      id: 'theme_mind_garden',
      name: 'Mind Garden',
      description: 'Tranquil dark jade sanctuary for deep mindfulness and clarity.',
      previewBg: 'from-emerald-950/80 via-slate-900 to-slate-950',
      accentColor: '#10b981',
      costCoins: 0,
      isUnlocked: true,
    },
    {
      id: 'theme_astral_monastery',
      name: 'Astral Monastery',
      description: 'Celestial temple with ethereal violet stars and amber dawn aura.',
      previewBg: 'from-indigo-950/80 via-slate-900 to-slate-950',
      accentColor: '#8b5cf6',
      costCoins: 35,
      isUnlocked: (stats.virtueCoins || 0) >= 35 || activeTheme === 'theme_astral_monastery',
    },
    {
      id: 'theme_solitary_ember',
      name: 'Sanctum of the Sun',
      description: 'Radiant golden pillars evoking unshakable fortitude and warm light.',
      previewBg: 'from-amber-950/80 via-slate-900 to-slate-950',
      accentColor: '#f59e0b',
      costCoins: 60,
      isUnlocked: activeTheme === 'theme_solitary_ember',
    },
  ];

  const handleEquipTheme = async (theme: VirtueTheme) => {
    try {
      await fetch('/api/virtues/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId: theme.id }),
      });
      setActiveTheme(theme.id);
      if (onThemeChanged) onThemeChanged(theme.id);
      setThemeFeedback(`Sanctuary attuned to ${theme.name}!`);
      setTimeout(() => setThemeFeedback(null), 3000);
    } catch {
      setThemeFeedback('Could not update theme.');
    }
  };

  const currentVirtueTitle = getVirtueRankTitle(stats.level);

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Sanctuary Grand Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/40 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-emerald-600/15 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300">
              <Sparkles className="h-3.5 w-3.5" /> Sanctuary of Moral Virtues
            </div>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {currentVirtueTitle}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300 leading-relaxed">
              Transform everyday behavioral restraint and moral practice into enduring character progression. Nurture your 4 cardinal virtues through intentional reflection and kind actions.
            </p>
          </div>

          {/* Virtue Currency Balance */}
          <div className="flex items-center gap-4 rounded-2xl border border-amber-500/30 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/40 bg-gradient-to-br from-amber-500/30 to-amber-700/20 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400">Virtue Coins</span>
              <div className="text-2xl font-black text-amber-400">
                {stats.virtueCoins || 45} <span className="text-xs text-amber-300/70">VC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. The 4 Cardinal Virtue Orbs */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>🏛️</span> The 4 Cardinal Pillars
          </h2>
          <span className="text-xs text-slate-400">Balanced growth nurtures serenity</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {virtues.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.id}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-2xl border bg-slate-900/80 p-5 shadow-lg backdrop-blur-md transition-all ${v.glow}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${v.badgeBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${v.badgeBg}`}>
                    Tier {v.level}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white">{v.name}</h3>
                  <p className="text-xs text-slate-400">{v.subtitle}</p>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Virtue Points</span>
                    <span className="font-bold text-slate-200">{v.points} pts</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(15, v.progress)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${v.color}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Negative Restraint / Evening Settle Banner ("No Anger Day") */}
      {restraintTasks.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 p-6 shadow-xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-purple-400/40 bg-purple-500/20 text-purple-300">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-purple-300 border border-purple-500/30">
                    Restraint Quest
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {restraintTasks[0].streakCount}d active streak
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  {restraintTasks[0].title}
                </h3>
                <p className="text-xs text-slate-300">
                  Evening settlement: Reflect upon whether you managed irritation with patience and composure.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenReflectionModal(restraintTasks[0])}
              disabled={restraintTasks[0].isCompletedToday}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-lg transition-all ${
                restraintTasks[0].isCompletedToday
                  ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 opacity-70'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110 shadow-purple-900/30'
              }`}
            >
              {restraintTasks[0].isCompletedToday ? (
                <>
                  <Check className="h-4 w-4" /> Settled For Today
                </>
              ) : (
                <>
                  <Feather className="h-4 w-4" /> Reflect & Settle (+25 VC)
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 4. Compassion Seed (Random Act of Kindness Generator) */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900/80 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400">
            <Heart className="h-4 w-4 fill-emerald-400/20" />
            <span>Daily Compassion Seed (Random Act of Kindness)</span>
          </div>
          <button
            onClick={() => setCurrentSeedIndex((prev) => (prev + 1) % KINDNESS_SEEDS.length)}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition"
          >
            <RefreshCw className="h-3 w-3" /> Draw New Seed
          </button>
        </div>

        <motion.p
          key={currentSeedIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-base font-medium italic text-emerald-200/90 leading-relaxed"
        >
          "{KINDNESS_SEEDS[currentSeedIndex]}"
        </motion.p>
      </div>

      {/* 5. Moral Virtue Quests List */}
      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Daily Virtue Practice</h2>
            <p className="text-xs text-slate-400">Cultivate virtues consistently to earn XP and Virtue Coins</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 p-1">
            {(['ALL', 'INTEGRITY', 'COMPASSION', 'DISCIPLINE', 'WISDOM'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveVirtueFilter(tab)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                  activeVirtueFilter === tab
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-slate-400">
              No virtue tasks matching this filter.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between gap-4 rounded-2xl border bg-slate-900/70 p-4 transition-all ${
                  task.isCompletedToday
                    ? 'border-slate-800/80 opacity-60 grayscale-[30%]'
                    : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300">
                    {task.category === 'COMPASSION' ? (
                      <Heart className="h-5 w-5 text-emerald-400" />
                    ) : task.category === 'INTEGRITY' ? (
                      <ShieldCheck className="h-5 w-5 text-amber-400" />
                    ) : task.category === 'DISCIPLINE' ? (
                      <Compass className="h-5 w-5 text-indigo-400" />
                    ) : (
                      <Flame className="h-5 w-5 text-purple-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {task.category}
                      </span>
                      {task.streakCount > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400">
                          <Flame className="h-3 w-3 fill-amber-400" /> {task.streakCount}d streak
                        </span>
                      )}
                    </div>
                    <h4 className={`text-sm font-semibold text-white ${task.isCompletedToday ? 'line-through text-slate-400' : ''}`}>
                      {task.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden text-xs font-bold text-amber-400 sm:inline">
                    +{task.baseVirtueCoins || 5} VC
                  </span>
                  <button
                    onClick={() => {
                      if (task.requiresReflection) {
                        onOpenReflectionModal(task);
                      } else {
                        onCompleteTask(task.id);
                      }
                    }}
                    disabled={task.isCompletedToday}
                    className={`flex items-center gap-1 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      task.isCompletedToday
                        ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                        : 'border border-slate-700 bg-slate-800 hover:border-amber-400 hover:bg-amber-400/20 text-white'
                    }`}
                  >
                    {task.isCompletedToday ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Done
                      </>
                    ) : task.requiresReflection ? (
                      <>
                        <Feather className="h-3.5 w-3.5 text-purple-400" /> Reflect
                      </>
                    ) : (
                      <>+{task.baseXP} XP</>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 6. Sanctuary Atmosphere & Unlockable Themes */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-purple-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">Sanctuary Atmosphere</h2>
          </div>
          {themeFeedback && (
            <span className="text-xs font-semibold text-emerald-400 animate-pulse">
              {themeFeedback}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Attune your inner sanctum with serene visual aesthetics unlocked via Virtue Coins
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {sanctuaryThemes.map((theme) => {
            const isEquipped = activeTheme === theme.id;
            return (
              <div
                key={theme.id}
                className={`relative overflow-hidden rounded-2xl border p-5 transition-all ${
                  isEquipped
                    ? 'border-purple-500 bg-slate-900/90 shadow-lg ring-1 ring-purple-500'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className={`h-16 w-full rounded-xl bg-gradient-to-r ${theme.previewBg} border border-slate-800/80 mb-3`} />
                <h4 className="font-bold text-white text-sm">{theme.name}</h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{theme.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-400">
                    {theme.costCoins === 0 ? 'Free' : `${theme.costCoins} VC`}
                  </span>
                  <button
                    onClick={() => handleEquipTheme(theme)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      isEquipped
                        ? 'bg-purple-600 text-white'
                        : 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {isEquipped ? 'Active' : 'Attune'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
