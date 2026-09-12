'use client';

import React, { useState } from 'react';
import { InventoryItem } from '@/lib/types';
import { X, Backpack, Sparkles, Shield, Check } from 'lucide-react';
import { soundEngine } from '@/lib/sound';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: InventoryItem[];
  onEquipChange: () => void;
}

export function InventoryModal({ isOpen, onClose, inventory, onEquipChange }: InventoryModalProps) {
  const [activeItem, setActiveItem] = useState<InventoryItem | null>(
    inventory.length > 0 ? inventory[0] : null
  );
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleToggleEquip = async (item: InventoryItem) => {
    try {
      setLoading(true);
      const res = await fetch('/api/inventory/equip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventoryId: item.id }),
      });

      if (!res.ok) throw new Error('Equip action failed');

      soundEngine.playEquip();
      onEquipChange();
    } catch (err) {
      console.error(err);
      soundEngine.playError();
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'COMMON':
        return 'border-slate-700 bg-slate-800/40 text-slate-300';
      case 'UNCOMMON':
        return 'border-emerald-700/60 bg-emerald-950/30 text-emerald-300';
      case 'RARE':
        return 'border-blue-700/60 bg-blue-950/30 text-blue-300';
      case 'EPIC':
        return 'border-purple-700/60 bg-purple-950/30 text-purple-300 shadow-glow-xp';
      case 'LEGENDARY':
        return 'border-amber-500/80 bg-amber-950/40 text-amber-300 shadow-glow-gold';
      default:
        return 'border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Backpack className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Hero Inventory & Armory</h3>
            <p className="text-xs text-slate-400">Equip gear to gain permanent attribute multipliers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inventory Grid */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Carried Items ({inventory.length})
            </h4>

            {inventory.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                Your inventory is empty. Complete quests or visit the shop to acquire gear!
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {inventory.map((inv) => {
                  const isSelected = activeItem?.id === inv.id;
                  return (
                    <button
                      key={inv.id}
                      onClick={() => setActiveItem(inv)}
                      className={`relative flex flex-col items-center justify-center rounded-xl border p-2 text-2xl transition aspect-square ${getRarityColor(
                        inv.item.rarity
                      )} ${
                        isSelected
                          ? 'ring-2 ring-purple-500 scale-105'
                          : 'hover:scale-102'
                      }`}
                    >
                      <span>{inv.item.icon}</span>
                      {inv.isEquipped && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-black text-slate-950">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                      )}
                      {inv.quantity > 1 && (
                        <span className="absolute bottom-1 right-1 text-[10px] font-bold text-slate-300">
                          x{inv.quantity}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Item Inspector Panel */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between">
            {activeItem ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border text-3xl ${getRarityColor(
                      activeItem.item.rarity
                    )}`}
                  >
                    {activeItem.item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{activeItem.item.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-black uppercase text-purple-400">
                        {activeItem.item.rarity}
                      </span>
                      <span className="text-[10px] text-slate-500">•</span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {activeItem.item.slot}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic border-l-2 border-slate-700 pl-2">
                  &quot;{activeItem.item.description}&quot;
                </p>

                {/* Stat Modifiers */}
                <div className="rounded-lg bg-slate-900/80 p-2.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Stat Modifiers:
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {Object.entries(activeItem.item.statModifiers).map(([key, val]) => (
                      <span
                        key={key}
                        className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[11px] font-bold text-emerald-400"
                      >
                        +{val} {key.toUpperCase()}
                      </span>
                    ))}
                    {Object.keys(activeItem.item.statModifiers).length === 0 && (
                      <span className="text-xs text-slate-500">Special consumable utility</span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleToggleEquip(activeItem)}
                    disabled={loading}
                    className={`w-full rounded-xl py-2 text-xs font-black transition active:scale-95 ${
                      activeItem.item.slot === 'CONSUMABLE'
                        ? 'bg-amber-600 hover:bg-amber-500 text-white'
                        : activeItem.isEquipped
                        ? 'border border-rose-700 bg-rose-950/40 text-rose-300 hover:bg-rose-900/50'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-glow-xp'
                    }`}
                  >
                    {activeItem.item.slot === 'CONSUMABLE'
                      ? 'Use Consumable'
                      : activeItem.isEquipped
                      ? 'Unequip Gear'
                      : 'Equip Item'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-500">
                Select an item to inspect stats and equip
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
