'use client';

import React, { useState } from 'react';
import { InventoryItem, Item } from '@/lib/types';
import {
  Shield,
  Sparkles,
  Hammer,
  Flame,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Zap,
  User,
} from 'lucide-react';
import { soundEngine } from '@/lib/sound';

interface ArmorySectionProps {
  inventory: InventoryItem[];
  playerGold: number;
  onEquipChange: () => void;
  onOpenCharacterStudio: () => void;
}

export function ArmorySection({
  inventory,
  playerGold,
  onEquipChange,
  onOpenCharacterStudio,
}: ArmorySectionProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isForging, setIsForging] = useState(false);
  const [forgeResult, setForgeResult] = useState<{
    success: boolean;
    message: string;
    newLevel: number;
  } | null>(null);

  // Equip / Unequip
  const handleToggleEquip = async (invItem: InventoryItem) => {
    try {
      soundEngine.playEquip();
      const res = await fetch('/api/inventory/equip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inventoryId: invItem.id,
          equip: !invItem.isEquipped,
        }),
      });
      if (res.ok) {
        onEquipChange();
      }
    } catch (err) {
      console.error(err);
      soundEngine.playError();
    }
  };

  // Blacksmith Forge Enhancement (+1 to +10)
  const handleEnhance = async () => {
    if (!selectedItem) return;
    try {
      setIsForging(true);
      setForgeResult(null);
      soundEngine.playEquip();

      const res = await fetch('/api/game/forge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventoryId: selectedItem.id }),
      });

      const data = await res.json();

      setTimeout(() => {
        setIsForging(false);
        if (data.success) {
          soundEngine.playEnhanceSuccess();
          setForgeResult({
            success: true,
            message: data.message,
            newLevel: data.enhancedLevel,
          });
          onEquipChange();
        } else {
          soundEngine.playEnhanceFail();
          setForgeResult({
            success: false,
            message: data.message || 'Enhancement failed!',
            newLevel: data.enhancedLevel || 0,
          });
          onEquipChange();
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsForging(false);
      soundEngine.playError();
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'COMMON':
        return 'border-slate-600 bg-slate-800/40 text-slate-300';
      case 'UNCOMMON':
        return 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300';
      case 'RARE':
        return 'border-sky-500/60 bg-sky-950/30 text-sky-300';
      case 'EPIC':
        return 'border-purple-500/60 bg-purple-950/30 text-purple-300 shadow-glow-xp';
      case 'LEGENDARY':
        return 'border-amber-500/80 bg-amber-950/40 text-amber-300 shadow-glow-gold';
      default:
        return 'border-slate-700 bg-slate-900 text-slate-300';
    }
  };

  const currentLevel = selectedItem?.item.enhancementLevel || 0;
  const nextLevel = currentLevel + 1;
  const forgeCost = (currentLevel + 1) * 120;
  const canAfford = playerGold >= forgeCost;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Hammer className="h-5 w-5 text-amber-400" />
            Hero Armory &amp; Blacksmith's Forge
          </h3>
          <p className="text-xs text-slate-400">
            Equip relics, boost stats, and forge weapons &amp; armor from +1 to +10
          </p>
        </div>

        <button
          onClick={onOpenCharacterStudio}
          className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition self-start sm:self-auto"
        >
          <User className="h-4 w-4 text-amber-400" />
          <span>Character Studio &amp; AI Styles</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inventory Items List (8 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Armory Storage ({inventory.length} Items)
          </h4>

          {inventory.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center text-xs text-slate-500">
              Your Armory is empty! Complete quests or open Lucky Royale Crates to discover weapons and artifacts.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inventory.map((inv) => {
                const isSelected = selectedItem?.id === inv.id;
                const enh = inv.item.enhancementLevel || 0;
                return (
                  <div
                    key={inv.id}
                    onClick={() => setSelectedItem(inv)}
                    className={`rounded-2xl border p-4 cursor-pointer transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-400 bg-slate-900 shadow-glow-gold'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${getRarityColor(
                              inv.item.rarity
                            )}`}
                          >
                            {inv.item.icon}
                          </div>
                          <div>
                            <h5 className="text-xs font-black text-white flex items-center gap-1.5">
                              {inv.item.name}
                              {enh > 0 && (
                                <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[10px] font-black text-amber-300">
                                  +{enh}
                                </span>
                              )}
                            </h5>
                            <span className="text-[10px] uppercase font-bold text-slate-400">
                              {inv.item.slot} • {inv.item.rarity}
                            </span>
                          </div>
                        </div>

                        {inv.isEquipped && (
                          <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-300">
                            EQUIPPED
                          </span>
                        )}
                      </div>

                      {/* Stats preview */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {Object.entries(inv.item.statModifiers).map(([key, val]) => {
                          if (!val) return null;
                          return (
                            <span
                              key={key}
                              className="rounded bg-slate-950/80 px-1.5 py-0.5 text-[10px] font-mono text-purple-300 border border-slate-800"
                            >
                              +{val} {key.toUpperCase()}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleEquip(inv);
                        }}
                        className={`rounded-lg px-3 py-1 text-[11px] font-black transition ${
                          inv.isEquipped
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-emerald-600 text-white hover:bg-emerald-500'
                        }`}
                      >
                        {inv.isEquipped ? 'Unequip' : 'Equip Gear'}
                      </button>

                      <span className="text-[10px] text-amber-400/80 font-bold">
                        Tap to Inspect &amp; Forge
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: The Blacksmith's Forge (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 rounded-3xl border border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 mb-4 pb-3 border-b border-slate-800">
              <Hammer className="h-5 w-5 animate-pulse" />
              <h4 className="text-sm font-black uppercase tracking-wider text-white">
                Anvil of Enhancement (+1 to +10)
              </h4>
            </div>

            {selectedItem ? (
              <div className="space-y-4">
                {/* Selected Item Card */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-3xl">
                    {selectedItem.item.icon}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-white">
                      {selectedItem.item.name}{' '}
                      <span className="text-amber-400">
                        {currentLevel > 0 ? `+${currentLevel}` : ''}
                      </span>
                    </h5>
                    <p className="text-[11px] text-slate-400">{selectedItem.item.description}</p>
                  </div>
                </div>

                {/* Forge Progression Bar (+0 to +10) */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400">Enhancement Tier</span>
                    <span className="font-mono text-amber-300">
                      Level {currentLevel} / 10
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                          i < currentLevel
                            ? 'bg-gradient-to-r from-amber-400 to-yellow-500 shadow-glow-gold'
                            : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Forge Details */}
                <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Upgrade:</span>
                    <span className="font-black text-white">
                      +{currentLevel} ➔ <span className="text-amber-400">+{nextLevel}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Stat Power Boost:</span>
                    <span className="font-bold text-emerald-400">+20% All Stat Mods</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Gold Required:</span>
                    <span className="font-mono font-bold text-amber-300">{forgeCost} GP</span>
                  </div>
                </div>

                {/* Result Notice */}
                {forgeResult && (
                  <div
                    className={`rounded-xl border p-3 text-xs font-bold text-center animate-in fade-in ${
                      forgeResult.success
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                        : 'border-rose-500 bg-rose-950/40 text-rose-300'
                    }`}
                  >
                    {forgeResult.message}
                  </div>
                )}

                {/* Forge Action Button */}
                <button
                  onClick={handleEnhance}
                  disabled={isForging || currentLevel >= 10 || !canAfford}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 py-3 text-sm font-black text-slate-950 shadow-glow-gold hover:from-amber-400 hover:to-yellow-400 transition active:scale-95 disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <Hammer className={`h-4 w-4 ${isForging ? 'animate-bounce' : ''}`} />
                  <span>
                    {isForging
                      ? 'Striking Anvil...'
                      : currentLevel >= 10
                      ? 'MAX LEVEL ACHIEVED'
                      : !canAfford
                      ? `Need ${forgeCost} Gold`
                      : `Forge Item (${forgeCost} GP)`}
                  </span>
                </button>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500">
                Select an item from the armory on the left to place it onto the Blacksmith's Anvil.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
