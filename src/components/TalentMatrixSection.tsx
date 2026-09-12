'use client';

import React, { useState, useEffect } from 'react';
import { TalentNode } from '@/lib/types';
import { AttributeRadar } from '@/components/AttributeRadar';
import {
  Brain,
  Shield,
  Flame,
  Zap,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import { soundEngine } from '@/lib/sound';

interface TalentMatrixSectionProps {
  playerLevel: number;
  effectiveStats: {
    str: number;
    int: number;
    vit: number;
    agi: number;
    cha: number;
    wil: number;
  };
  gearBonuses: {
    bonusXP: number;
    bonusGold: number;
    bonusStr: number;
    bonusInt: number;
    bonusVit: number;
    bonusAgi: number;
    bonusCha: number;
    bonusWil: number;
  };
  onRefreshData: () => void;
}

export function TalentMatrixSection({
  playerLevel,
  effectiveStats,
  gearBonuses,
  onRefreshData,
}: TalentMatrixSectionProps) {
  const [talentPoints, setTalentPoints] = useState(0);
  const [talents, setTalents] = useState<TalentNode[]>([]);
  const [upgradingId, setUpgradingId] = useState<string | null>(null);
  const [talentNotice, setTalentNotice] = useState<string | null>(null);

  const loadTalents = async () => {
    try {
      const res = await fetch('/api/game/talents');
      const data = await res.json();
      if (data.talents) {
        setTalents(data.talents);
        setTalentPoints(data.points ?? Math.max(0, playerLevel - 1));
      }
    } catch (err) {
      console.error('Failed to load talents', err);
    }
  };

  useEffect(() => {
    loadTalents();
  }, [playerLevel]);

  // Handle Talent Upgrade
  const handleUpgradeTalent = async (node: TalentNode) => {
    if (talentPoints <= 0 || node.currentRank >= node.maxRank) return;

    try {
      setUpgradingId(node.id);
      soundEngine.playEnhanceSuccess();

      const res = await fetch('/api/game/talents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ talentId: node.id }),
      });

      const data = await res.json();
      if (data.success) {
        setTalentNotice(`✨ Talent Activated: ${node.name} ascended to Rank ${node.currentRank + 1}!`);
        loadTalents();
        onRefreshData();
        setTimeout(() => setTalentNotice(null), 3500);
      } else {
        soundEngine.playError();
        alert(data.error || 'Failed to upgrade talent');
      }
    } catch (err) {
      console.error(err);
      soundEngine.playError();
    } finally {
      setUpgradingId(null);
    }
  };

  const getTreeColor = (tree: 'BODY' | 'MIND' | 'SOUL') => {
    switch (tree) {
      case 'BODY':
        return {
          border: 'border-rose-500/40',
          bg: 'bg-rose-950/20',
          text: 'text-rose-400',
          badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
        };
      case 'MIND':
        return {
          border: 'border-cyan-500/40',
          bg: 'bg-cyan-950/20',
          text: 'text-cyan-400',
          badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
        };
      case 'SOUL':
        return {
          border: 'border-amber-500/40',
          bg: 'bg-amber-950/20',
          text: 'text-amber-400',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            IRL Talent Matrix &amp; Attribute Hexagon
          </h3>
          <p className="text-xs text-slate-400">
            Allocate talent points earned upon leveling up to permanently amplify real-world habits
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-xs font-black text-purple-300 shadow-glow-xp">
          <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
          <span>Talent Points: {talentPoints} Available</span>
        </div>
      </div>

      {talentNotice && (
        <div className="rounded-2xl border border-purple-500/80 bg-slate-900/95 p-4 text-xs font-black text-purple-300 shadow-glow-xp backdrop-blur-md animate-in slide-in-from-top-3">
          {talentNotice}
        </div>
      )}

      {/* Grid: 6 Core Attribute Hexagon + Branching Talent Trees */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Attribute Radar Hexagon (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl">
          <AttributeRadar
            attributes={effectiveStats}
            gearBonuses={gearBonuses}
          />
        </div>

        {/* Talent Matrix Nodes (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Available Skill Perks
          </h4>

          <div className="space-y-3">
            {talents.map((node) => {
              const styling = getTreeColor(node.tree);
              const isLocked = playerLevel < node.requiredLevel;
              const isMaxed = node.currentRank >= node.maxRank;
              const canUpgrade = talentPoints > 0 && !isLocked && !isMaxed;

              return (
                <div
                  key={node.id}
                  className={`rounded-2xl border p-4 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                    node.currentRank > 0
                      ? `${styling.border} ${styling.bg} shadow-glow-card`
                      : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-2xl border border-slate-800 shrink-0">
                      {node.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-black text-white">{node.name}</h5>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase ${styling.badge}`}
                        >
                          {node.tree}
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-300">
                          Rank {node.currentRank}/{node.maxRank}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mt-1">{node.description}</p>

                      {isLocked && (
                        <span className="text-[10px] text-rose-400 font-bold block mt-1">
                          🔒 Unlocks at Character Level {node.requiredLevel}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleUpgradeTalent(node)}
                    disabled={!canUpgrade || upgradingId === node.id}
                    className="shrink-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-black text-white shadow-glow-xp hover:from-purple-500 hover:to-indigo-500 transition active:scale-95 disabled:opacity-40"
                  >
                    {isMaxed
                      ? 'MAX RANK'
                      : isLocked
                      ? 'LOCKED'
                      : talentPoints === 0
                      ? '0 POINTS'
                      : upgradingId === node.id
                      ? 'Activating...'
                      : '+ Upgrade'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
