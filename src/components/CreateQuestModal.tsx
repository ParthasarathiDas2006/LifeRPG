'use client';

import React, { useState } from 'react';
import { TaskCategory, TaskDifficulty, TaskType } from '@/lib/types';
import { DIFFICULTY_CONFIG } from '@/lib/progression';
import { X, Sparkles, Coins, Swords } from 'lucide-react';
import { soundEngine } from '@/lib/sound';

interface CreateQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestCreated: () => void;
}

export function CreateQuestModal({ isOpen, onClose, onQuestCreated }: CreateQuestModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('INTELLIGENCE');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>('MEDIUM');
  const [type, setType] = useState<TaskType>('DAILY');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const currentRewards = DIFFICULTY_CONFIG[difficulty];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category,
          difficulty,
          type,
        }),
      });

      if (!res.ok) throw new Error('Failed to create task');

      soundEngine.playTaskComplete();
      setTitle('');
      setDescription('');
      onQuestCreated();
      onClose();
    } catch (err) {
      console.error(err);
      soundEngine.playError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Swords className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Create New Quest</h3>
            <p className="text-xs text-slate-400">Map a real-life habit or task to RPG progression</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Quest Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Read 20 pages of System Design book"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Provide context or guidelines for this quest..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                RPG Attribute
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="STRENGTH">Strength (Workouts/Fitness)</option>
                <option value="INTELLIGENCE">Intelligence (Study/Coding)</option>
                <option value="VITALITY">Vitality (Sleep/Nutrition)</option>
                <option value="AGILITY">Agility (Speed/Errands)</option>
                <option value="CHARISMA">Charisma (Social/Networking)</option>
                <option value="WILLPOWER">Willpower (Discipline/Focus)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Difficulty Tier
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as TaskDifficulty)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="TRIVIAL">Trivial (Quick 2-minute habit)</option>
                <option value="EASY">Easy (10-15 minute task)</option>
                <option value="MEDIUM">Medium (30-45 minute focus)</option>
                <option value="HARD">Hard (60-90 min intensive block)</option>
                <option value="EPIC">Epic (Major milestone / boss project)</option>
              </select>
            </div>
          </div>

          {/* Reward Preview Badge */}
          <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Base Completion Yield:</span>
            <div className="flex items-center gap-3 text-xs font-black">
              <span className="flex items-center gap-1 text-purple-400">
                <Sparkles className="h-4 w-4" />
                +{currentRewards.xp} XP
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <Coins className="h-4 w-4" />
                +{currentRewards.gold} Gold
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-black text-white shadow-glow-xp hover:from-purple-500 hover:to-indigo-500 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Forging Quest...' : 'Accept Quest'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
