'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, GameTab } from '@/components/Navbar';
import { LobbySection } from '@/components/LobbySection';
import { OperationsSection } from '@/components/OperationsSection';
import { ArmorySection } from '@/components/ArmorySection';
import { LuckyRoyaleSection } from '@/components/LuckyRoyaleSection';
import { ArenaSection } from '@/components/ArenaSection';
import { TalentMatrixSection } from '@/components/TalentMatrixSection';
import { CreateQuestModal } from '@/components/CreateQuestModal';
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
import { Gift } from 'lucide-react';

export default function LifeRPGApp() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<GameTab>('lobby');

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

    // Refresh profile and task states
    loadData();
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
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
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent shadow-glow-xp" />
          <p className="text-xs font-black uppercase tracking-widest text-purple-300">
            Initializing Hero World &amp; Dopamine Audio Engine...
          </p>
        </div>
      </div>
    );
  }

  // Calculate Combat Power (CP)
  const totalStats =
    profile.effectiveStats.str +
    profile.effectiveStats.int +
    profile.effectiveStats.vit +
    profile.effectiveStats.agi +
    profile.effectiveStats.cha +
    profile.effectiveStats.wil;
  const combatPower =
    totalStats * 15 +
    profile.stats.level * 60 +
    (profile.gearBonuses.bonusXP + profile.gearBonuses.bonusGold) * 10;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Top Header & Section Navigation */}
      <Navbar
        gold={profile.stats.gold}
        streakFreezeTokens={profile.stats.streakFreezeTokens}
        character={profile.character}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenCharacter={() => setIsCharacterOpen(true)}
        onOpenCreate={() => setIsCreateOpen(true)}
      />

      {/* Loot Drop Toast Notification */}
      {lootToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-amber-500/80 bg-slate-900/95 p-4 shadow-glow-gold backdrop-blur-md animate-in slide-in-from-bottom-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-3xl">
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
            <p className="text-[10px] text-slate-400">Transferred into your Hero Armory</p>
          </div>
        </div>
      )}

      {/* Main Multi-Zone Game Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {/* Section 1: Lobby Sanctuary */}
        {activeTab === 'lobby' && (
          <LobbySection
            stats={profile.stats}
            character={profile.character}
            gearBonuses={profile.gearBonuses}
            effectiveStats={profile.effectiveStats}
            onEditCharacter={() => setIsCharacterOpen(true)}
            onRefreshData={loadData}
            onNavigateToTab={(tabId) => setActiveTab(tabId as GameTab)}
          />
        )}

        {/* Section 2: Operations & Quests Hub */}
        {activeTab === 'operations' && (
          <OperationsSection
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            onOpenCreate={() => setIsCreateOpen(true)}
            onRefreshData={loadData}
          />
        )}

        {/* Section 3: Armory & Blacksmith Forge */}
        {activeTab === 'armory' && (
          <ArmorySection
            inventory={inventory}
            playerGold={profile.stats.gold}
            onEquipChange={loadData}
            onOpenCharacterStudio={() => setIsCharacterOpen(true)}
          />
        )}

        {/* Section 4: Lucky Royale Crate & Black Market */}
        {activeTab === 'lucky' && (
          <LuckyRoyaleSection
            playerGold={profile.stats.gold}
            shopItems={shopItems}
            onPurchaseSuccess={loadData}
          />
        )}

        {/* Section 5: Battle Arena & Ranked Tiers */}
        {activeTab === 'arena' && (
          <ArenaSection
            playerLevel={profile.stats.level}
            playerName={profile.character.name}
            playerCombatPower={combatPower}
            onRefreshData={loadData}
          />
        )}

        {/* Section 6: Talent Matrix Skill Tree */}
        {activeTab === 'talents' && (
          <TalentMatrixSection
            playerLevel={profile.stats.level}
            effectiveStats={profile.effectiveStats}
            gearBonuses={profile.gearBonuses}
            onRefreshData={loadData}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <p>Life RPG ⚔️ • Next-Gen Gamified Habit Engine &amp; Battle Royale Productivity System</p>
      </footer>

      {/* Persistent Modals */}
      <CreateQuestModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onQuestCreated={loadData}
      />

      <CharacterCreationModal
        isOpen={isCharacterOpen}
        onClose={() => setIsCharacterOpen(false)}
        currentCharacter={profile.character}
        onCharacterSaved={loadData}
      />

      <LevelUpModal
        isOpen={levelUpData.isOpen}
        onClose={() => setLevelUpData((prev) => ({ ...prev, isOpen: false }))}
        newLevel={levelUpData.level}
        unlockedAchievements={levelUpData.achievements}
      />
    </div>
  );
}
