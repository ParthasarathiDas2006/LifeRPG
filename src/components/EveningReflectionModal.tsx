'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, X, MessageSquare, Flame, Check } from 'lucide-react';
import { Task } from '@/lib/types';

interface Props {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSubmit: (taskId: string, reflectionData: { text: string; moodRating: number; honestyAffirmed: boolean }) => Promise<void>;
}

export const EveningReflectionModal: React.FC<Props> = ({
  isOpen,
  task,
  onClose,
  onSubmit,
}) => {
  const [honestyAffirmed, setHonestyAffirmed] = useState<boolean>(true);
  const [reflectionText, setReflectionText] = useState('');
  const [moodRating, setMoodRating] = useState<number>(4);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !task) return null;

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(task.id, {
        text: reflectionText || (honestyAffirmed ? 'Preserved peace throughout the day.' : 'Admitted stumbling; recommitting tomorrow.'),
        moodRating,
        honestyAffirmed,
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const isRestraint = task.type === 'NEGATIVE_RESTRAINT';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        {/* Backdrop Ambient Aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.35, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute h-96 w-96 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 blur-3xl"
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reflection-modal-title"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-purple-500/30 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close reflection modal"
            className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              {isRestraint ? <ShieldCheck className="h-6 w-6" /> : <Flame className="h-6 w-6" />}
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                {isRestraint ? 'Evening Restraint Settlement' : 'Inner Sanctuary Reflection'}
              </span>
              <h2 id="reflection-modal-title" className="text-xl font-bold text-white">
                {task.title}
              </h2>
            </div>
          </div>

          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {task.description || 'Take a moment to center your mind and record your honest truth.'}
          </p>

          {/* Restraint Honesty Gate */}
          {isRestraint && (
            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Integrity Check: How did today unfold?
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setHonestyAffirmed(true)}
                  className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                    honestyAffirmed
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-white">I Preserved Peace</div>
                    <div className="text-[10px] text-emerald-400/80">Kept composure under testing</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setHonestyAffirmed(false)}
                  className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                    !honestyAffirmed
                      ? 'border-amber-500 bg-amber-500/15 text-amber-300 shadow-md shadow-amber-950/40 ring-1 ring-amber-500'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Heart className="h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <div className="text-xs font-bold text-white">I Stumbled (Grace)</div>
                    <div className="text-[10px] text-amber-300/80">+Honesty Bonus & Grace</div>
                  </div>
                </button>
              </div>

              {!honestyAffirmed && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-amber-400/90 italic"
                >
                  ✨ True integrity begins with radical honesty. Admitting a stumble awards +2 Integrity and preserves your commitment.
                </motion.p>
              )}
            </div>
          )}

          {/* Micro-Journaling Note */}
          <div className="mt-4">
            <label htmlFor="reflection-text" className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-purple-400" /> Micro-Journal / Lessons Learned
              </span>
              <span className="text-[10px] text-slate-500">Optional</span>
            </label>
            <textarea
              id="reflection-text"
              rows={3}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="What triggered your mind today, or what insight did you gain?"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-200 placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Mood State Rating */}
          <div className="mt-4">
            <span className="text-xs font-semibold text-slate-400">Current Inner State</span>
            <div className="mt-2 flex items-center justify-between gap-2">
              {[
                { level: 1, label: 'Weary', icon: '🌧️' },
                { level: 2, label: 'Tested', icon: '⚡' },
                { level: 3, label: 'Neutral', icon: '🍃' },
                { level: 4, label: 'Calm', icon: '🌸' },
                { level: 5, label: 'Radiant', icon: '✨' },
              ].map((m) => (
                <button
                  key={m.level}
                  type="button"
                  onClick={() => setMoodRating(m.level)}
                  className={`flex flex-1 flex-col items-center justify-center rounded-xl border py-2 text-center transition-all ${
                    moodRating === m.level
                      ? 'border-purple-500 bg-purple-500/20 shadow-md ring-1 ring-purple-500'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-base">{m.icon}</span>
                  <span className="text-[10px] font-medium mt-0.5 text-slate-300">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Submit */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-900/30 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            >
              <Sparkles className="h-4 w-4" />
              {submitting ? 'Cultivating...' : 'Seal in Sanctuary'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
