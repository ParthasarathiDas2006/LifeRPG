'use client';

import React, { useState } from 'react';
import { Item } from '@/lib/types';
import { X, ShoppingBag, Coins, Sparkles, Check } from 'lucide-react';
import { soundEngine } from '@/lib/sound';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  shopItems: Item[];
  playerGold: number;
  onPurchaseSuccess: () => void;
}

export function ShopModal({
  isOpen,
  onClose,
  shopItems,
  playerGold,
  onPurchaseSuccess,
}: ShopModalProps) {
  const [buyingId, setBuyingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBuy = async (item: Item) => {
    if (playerGold < item.buyPrice) {
      soundEngine.playError();
      alert(`Insufficient gold! You need ${item.buyPrice} GP, but only have ${playerGold} GP.`);
      return;
    }

    try {
      setBuyingId(item.id);
      const res = await fetch('/api/shop/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to buy item');

      soundEngine.playCoin();
      onPurchaseSuccess();
    } catch (err: unknown) {
      console.error(err);
      soundEngine.playError();
      const message = err instanceof Error ? err.message : 'Purchase failed';
      alert(message);
    } finally {
      setBuyingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Merchant&apos;s Bazaar</h3>
              <p className="text-xs text-slate-400">Reinvest your hard-earned gold into relics and consumables</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-300">
            <Coins className="h-4 w-4 text-amber-400" />
            <span>{playerGold.toLocaleString()} GP</span>
          </div>
        </div>

        {/* Items Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {shopItems.map((item) => {
            const canAfford = playerGold >= item.buyPrice;
            const isBuying = buyingId === item.id;

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 transition hover:border-slate-700"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="text-xs font-black text-white">{item.name}</h4>
                        <span className="text-[10px] font-bold uppercase text-purple-400">
                          {item.rarity} • {item.slot}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-2 text-[11px] text-slate-400 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Modifiers */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {Object.entries(item.statModifiers).map(([k, v]) => (
                      <span
                        key={k}
                        className="rounded bg-slate-900 border border-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400"
                      >
                        +{v} {k.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-2.5">
                  <span className="flex items-center gap-1 text-xs font-black text-amber-400">
                    <Coins className="h-3.5 w-3.5" />
                    {item.buyPrice} GP
                  </span>

                  <button
                    onClick={() => handleBuy(item)}
                    disabled={!canAfford || isBuying}
                    className={`rounded-lg px-3 py-1.5 text-xs font-black transition active:scale-95 ${
                      canAfford
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-glow-gold'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isBuying ? 'Purchasing...' : canAfford ? 'Purchase' : 'Too Costly'}
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
