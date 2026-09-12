'use client';

import React from 'react';
import { Dumbbell, BookOpen, HeartPulse, Zap, Users, Flame } from 'lucide-react';

interface AttributeRadarProps {
  attributes: {
    str: number;
    int: number;
    vit: number;
    agi: number;
    cha: number;
    wil: number;
  };
  gearBonuses: {
    bonusStr: number;
    bonusInt: number;
    bonusVit: number;
    bonusAgi: number;
    bonusCha: number;
    bonusWil: number;
  };
}

export function AttributeRadar({ attributes, gearBonuses }: AttributeRadarProps) {
  const statList = [
    {
      key: 'str',
      label: 'Strength (STR)',
      desc: 'Workouts & Physical Power',
      base: attributes.str,
      bonus: gearBonuses.bonusStr,
      icon: Dumbbell,
      color: 'text-amber-500',
      bgBar: 'bg-amber-500',
      border: 'border-amber-500/30',
    },
    {
      key: 'int',
      label: 'Intelligence (INT)',
      desc: 'Study, Reading & Coding',
      base: attributes.int,
      bonus: gearBonuses.bonusInt,
      icon: BookOpen,
      color: 'text-sky-400',
      bgBar: 'bg-sky-500',
      border: 'border-sky-500/30',
    },
    {
      key: 'vit',
      label: 'Vitality (VIT)',
      desc: 'Sleep, Hydration & Health',
      base: attributes.vit,
      bonus: gearBonuses.bonusVit,
      icon: HeartPulse,
      color: 'text-emerald-400',
      bgBar: 'bg-emerald-500',
      border: 'border-emerald-500/30',
    },
    {
      key: 'agi',
      label: 'Agility (AGI)',
      desc: 'Speed, Chores & Errands',
      base: attributes.agi,
      bonus: gearBonuses.bonusAgi,
      icon: Zap,
      color: 'text-yellow-400',
      bgBar: 'bg-yellow-500',
      border: 'border-yellow-500/30',
    },
    {
      key: 'cha',
      label: 'Charisma (CHA)',
      desc: 'Social, Networking & Voice',
      base: attributes.cha,
      bonus: gearBonuses.bonusCha,
      icon: Users,
      color: 'text-pink-400',
      bgBar: 'bg-pink-500',
      border: 'border-pink-500/30',
    },
    {
      key: 'wil',
      label: 'Willpower (WIL)',
      desc: 'Discipline & Deep Focus',
      base: attributes.wil,
      bonus: gearBonuses.bonusWil,
      icon: Flame,
      color: 'text-purple-400',
      bgBar: 'bg-purple-500',
      border: 'border-purple-500/30',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-glow-card backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            Character Attributes
          </h3>
          <p className="text-xs text-slate-400">
            Stats grow as you complete relevant life quests
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {statList.map((stat) => {
          const Icon = stat.icon;
          const total = stat.base + stat.bonus;
          const progressPercent = Math.min(100, Math.round((total / 30) * 100));

          return (
            <div
              key={stat.key}
              className={`rounded-xl border ${stat.border} bg-slate-950/60 p-3 transition hover:border-slate-600`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg bg-slate-900 ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">
                      {stat.label}
                    </h4>
                    <p className="text-[10px] text-slate-400">{stat.desc}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-white">
                    {total}
                  </span>
                  {stat.bonus > 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 ml-1">
                      (+{stat.bonus})
                    </span>
                  )}
                </div>
              </div>

              {/* Stat Progress Bar */}
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${stat.bgBar} transition-all duration-500`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
