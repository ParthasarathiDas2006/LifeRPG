'use client';

import React, { useState } from 'react';
import { Item, ItemRarity } from '@/lib/types';
import {
  Gift,
  Sparkles,
  Coins,
  ShoppingBag,
  Flame,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { soundEngine } from '@/lib/sound';

interface LuckyRoyaleSectionProps {
  playerGold: number;
  shopItems: Item[];
  onPurchaseSuccess: () => void;
}

export function LuckyRoyaleSection({
  playerGold,
  shopItems,
  onPurchaseSuccess,
}: LuckyRoyaleSectionProps) {
  const [isOpeningCrate, setIsOpeningCrate] = useState(false);
  const [unboxedItem, setUnboxedItem] = useState<Item | null>(null);
  const [pityCount, setPityCount] = useState<number>(3);
  const [buyingId, setBuyingId] = useState<string | null>(null);

  const crateCost = 150;
  const canAffordCrate = playerGold >= crateCost;

  // Handle Lucky Crate Opening
  const handleOpenCrate = async () => {
    if (!canAffordCrate) {
      soundEngine.playError();
      return;
    }

    try {
      setIsOpeningCrate(true);
      setUnboxedItem(null);
      soundEngine.playCrateOpen();

      const res = await fetch('/api/game/lucky-crate', { method: 'POST' });
      const data = await res.json();

      setTimeout(() => {
        setIsOpeningCrate(false);
        if (data.item) {
          setUnboxedItem(data.item);
          setPityCount(data.pityCount || 0);
          onPurchaseSuccess();
        }
      }, 1400);
    } catch (err) {
      console.error(err);
      setIsOpeningCrate(false);
      soundEngine.playError();
    }
  };

  // Buy from Black Market
  const handleBuyItem = async (item: Item) => {
    try {
      setBuyingId(item.id);
      soundEngine.playCoin();

      const res = await fetch('/api/shop/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        soundEngine.playError();
        alert(data.error || 'Failed to purchase item');
        return;
      }

      soundEngine.playTaskComplete();
      onPurchaseSuccess();
    } catch (err) {
      console.error(err);
      soundEngine.playError();
    } finally {
      setBuyingId(null);
    }
  };

  const getRarityBadge = (rarity: ItemRarity) => {
    switch (rarity) {
      case 'LEGENDARY':
        return 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-glow-gold';
      case 'EPIC':
        return 'border-purple-400 bg-purple-500/20 text-purple-300 shadow-glow-xp';
      case 'RARE':
        return 'border-sky-400 bg-sky-500/20 text-sky-300';
      case 'UNCOMMON':
        return 'border-emerald-400 bg-emerald-500/20 text-emerald-300';
      default:
        return 'border-slate-600 bg-slate-700/40 text-slate-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Gift className="h-5 w-5 text-rose-400" />
            Lucky Royale Crate &amp; Black Market Bazaar
          </h3>
          <p className="text-xs text-slate-400">
            Open mystery supply crates or procure elite gear from the underground merchant
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-black text-amber-300 shadow-glow-gold">
          <Coins className="h-4 w-4 text-amber-400 animate-pulse" />
          <span>{playerGold.toLocaleString()} GP Available</span>
        </div>
      </div>

      {/* Life RPG Lucky Royale Crate Station */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-500/50 bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-950 p-8 shadow-2xl text-center">
        {/* Glow lights */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-rose-600/20 blur-3xl" />

        <div className="relative z-10 max-w-lg mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-rose-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Grand Lucky Royale</span>
          </div>

          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Elite Mythic Supply Crate
          </h2>
          <p className="text-xs text-slate-400">
            Guaranteed high-tier weapon, armor relic, or consumable artifact. Includes guaranteed Rare+ loot pity counter!
          </p>

          {/* Glowing Animated Chest Container */}
          <div className="relative py-6">
            <div
              className={`mx-auto flex h-36 w-36 items-center justify-center rounded-3xl border-2 border-rose-400 bg-gradient-to-tr from-rose-600/40 via-purple-600/30 to-amber-500/30 text-6xl shadow-2xl transition-transform duration-300 ${
                isOpeningCrate ? 'scale-125 animate-bounce shadow-glow-xp' : 'hover:scale-105'
              }`}
            >
              🎁
            </div>

            {/* Radiant Beam when opening */}
            {isOpeningCrate && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-64 w-12 bg-gradient-to-t from-transparent via-amber-400/80 to-transparent blur-md animate-pulse" />
              </div>
            )}
          </div>

          {/* Pity Counter Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400">Rare+ Guaranteed Pity Meter</span>
              <span className="font-mono text-amber-300">
                {pityCount} / 10 Spins
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-300"
                style={{ width: `${(pityCount / 10) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 text-left">
              Guaranteed Rare, Epic, or Legendary artifact when the pity meter reaches 10.
            </p>
          </div>

          {/* Spin Action */}
          <button
            onClick={handleOpenCrate}
            disabled={isOpeningCrate || !canAffordCrate}
            className="w-full rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-yellow-500 py-3.5 text-sm font-black text-slate-950 shadow-glow-gold hover:from-rose-400 hover:to-yellow-400 transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Gift className="h-4 w-4" />
            <span>
              {isOpeningCrate
                ? 'Unlocking Secret Relic...'
                : !canAffordCrate
                ? `Need ${crateCost} GP`
                : `Open Lucky Crate (${crateCost} GP)`}
            </span>
          </button>
        </div>

        {/* Unboxed Item Modal / Result Card */}
        {unboxedItem && (
          <div className="mt-8 rounded-2xl border-2 border-amber-400 bg-slate-900/95 p-6 max-w-md mx-auto shadow-glow-gold animate-in zoom-in-95">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">
              ✨ UNBOXED ITEM ACQUIRED!
            </span>
            <div className="flex items-center gap-4 text-left">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/80 bg-amber-500/20 text-4xl shadow-glow-gold">
                {unboxedItem.icon}
              </div>
              <div>
                <h4 className="text-base font-black text-white">{unboxedItem.name}</h4>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase ${getRarityBadge(
                      unboxedItem.rarity
                    )}`}
                  >
                    {unboxedItem.rarity}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    {unboxedItem.slot}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{unboxedItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Black Market Items Bazaar */}
      <div className="space-y-4">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-purple-400" />
          Black Market Catalog
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {shopItems.map((item) => {
            const canAffordItem = playerGold >= item.buyPrice;
            const isBuying = buyingId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between shadow-glow-card hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700 text-2xl">
                      {item.icon}
                    </div>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase ${getRarityBadge(
                        item.rarity
                      )}`}
                    >
                      {item.rarity}
                    </span>
                  </div>

                  <h5 className="mt-3 text-sm font-black text-white">{item.name}</h5>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{item.description}</p>

                  {/* Stat boosts */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {Object.entries(item.statModifiers).map(([key, val]) => {
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

                <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3">
                  <div className="flex items-center gap-1 font-mono text-xs font-black text-amber-300">
                    <Coins className="h-3.5 w-3.5 text-amber-400" />
                    <span>{item.buyPrice} GP</span>
                  </div>

                  <button
                    onClick={() => handleBuyItem(item)}
                    disabled={isBuying || !canAffordItem}
                    className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-glow-xp hover:from-purple-500 hover:to-indigo-500 transition active:scale-95 disabled:opacity-40"
                  >
                    {isBuying ? 'Purchasing...' : !canAffordItem ? 'Need Gold' : 'Purchase'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
