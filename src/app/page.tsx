'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroHUD } from '@/components/HeroHUD';
import { AttributeRadar } from '@/components/AttributeRadar';
import { QuestList } from '@/components/QuestList';
import { CreateQuestModal } from '@/components/CreateQuestModal';
import { InventoryModal } from '@/components/InventoryModal';
import { ShopModal } from '@/components/ShopModal';
import { LeaderboardModal } from '@/components/LeaderboardModal';
import { LevelUpModal } from '@/components/LevelUpModal';
import { CharacterCreationModal } from '@/components/CharacterCreationModal';
import {
  UserStats,
  Task,
  InventoryItem,
  Item,
  TaskCompletionResult,
  Achievement,
  CharacterConfig,
} from '@/lib/types';
import { Sparkles, Gift, CheckCircle2 } from 'lucide-react';

export default function LifeRPGApp() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{
    stats: UserStats;
    character: CharacterConfig;
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
    effectiveStats: {
      str: number;
      int: number;
      vit: number;
      agi: number;
      cha: number;
      wil: number;
    };
    achievements: Array<Achievement & { isUnlocked: boolean }>;
  } | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [shopItems, setShopItems] = useState<Item[]>([]);

  // Modals
  const [isCharacterOpen, setIsCharacterOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{
    isOpen: boolean;
    level: number;
    achievements: Achievement[];
  }>({
    isOpen: false,
    level: 1,
    achievements: [],
  });

  // Loot drop toast
  const [lootToast, setLootToast] = useState<Item | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [pRes, tRes, iRes, sRes] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/tasks'),
        fetch('/api/inventory'),
        fetch('/api/shop'),
      ]);

      const [pData, tData, iData, sData] = await Promise.all([
        pRes.json(),
        tRes.json(),
        iRes.json(),
        sRes.json(),
      ]);

      if (pData.profile) setProfile(pData.profile);
      if (tData.tasks) setTasks(tData.tasks);
      if (iData.inventory) setInventory(iData.inventory);
      if (sData.items) setShopItems(sData.items);
    } catch (err) {
      console.error('Failed to load Life RPG game state', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCompleteTask = (result: TaskCompletionResult) => {
    // If loot dropped, show notification banner
    if (result.rewards.lootDrop) {
      setLootToast(result.rewards.lootDrop);
      setTimeout(() => setLootToast(null), 5000);
    }

    // Check if leveled up
    if (result.progression.leveledUp) {
      setLevelUpData({
        isOpen: true,
        level: result.progression.newLevel,
        achievements: result.progression.unlockedAchievements,
      });
    }

    // Refresh state
    loadData();
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks?id=${taskId}`, { method: 'DELETE' });
      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      }
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  if (loading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
          <p className="text-sm font-bold text-slate-400">Loading Character World...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        gold={profile.stats.gold}
        streakFreezeTokens={profile.stats.streakFreezeTokens}
        character={profile.character}
        onOpenCharacter={() => setIsCharacterOpen(true)}
        onOpenCreate={() => setIsCreateOpen(true)}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* Loot Drop Toast Notification */}
      {lootToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-amber-500/80 bg-slate-900/95 p-4 shadow-glow-gold backdrop-blur-md animate-in slide-in-from-bottom-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-2xl">
            {lootToast.icon}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <Gift className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                Rare Loot Acquired!
              </span>
            </div>
            <h5 className="text-xs font-black text-white">{lootToast.name}</h5>
            <p className="text-[10px] text-slate-400">Added to your Hero Armory</p>
          </div>
        </div>
      )}

      {/* Main Content Dashboard */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 space-y-6">
        {/* Hero Character HUD (Level, HP, Mana, XP) */}
        <HeroHUD
          stats={profile.stats}
          character={profile.character}
          onEditCharacter={() => setIsCharacterOpen(true)}
          gearBonuses={profile.gearBonuses}
        />

        {/* Core Attributes Radar (STR, INT, VIT, AGI, CHA, WIL) */}
        <AttributeRadar
          attributes={profile.effectiveStats}
          gearBonuses={profile.gearBonuses}
        />

        {/* Quests & Habits Dashboard */}
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 backdrop-blur-sm sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-800 gap-2 mb-4">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                Active Quest Log & Daily Habits
              </h3>
              <p className="text-xs text-slate-400">
                Complete quests to earn immediate XP, gold, and attribute boosts
              </p>
            </div>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="self-start sm:self-auto rounded-xl bg-purple-600/20 border border-purple-500/40 px-3 py-1.5 text-xs font-bold text-purple-300 hover:bg-purple-600/30 transition"
            >
              + Create Custom Quest
            </button>
          </div>

          <QuestList
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>Life RPG • Instant Feedback &amp; Habit Progression Engine</p>
      </footer>

      {/* Modals */}
      <CreateQuestModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onQuestCreated={loadData}
      />

      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        inventory={inventory}
        onEquipChange={loadData}
      />

      <ShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        shopItems={shopItems}
        playerGold={profile.stats.gold}
        onPurchaseSuccess={loadData}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      <LevelUpModal
        isOpen={levelUpData.isOpen}
        onClose={() => setLevelUpData((prev) => ({ ...prev, isOpen: false }))}
        newLevel={levelUpData.level}
        unlockedAchievements={levelUpData.achievements}
      />

      <CharacterCreationModal
        isOpen={isCharacterOpen}
        onClose={() => setIsCharacterOpen(false)}
        currentCharacter={profile.character}
        onCharacterSaved={loadData}
      />
    </div>
  );
}
