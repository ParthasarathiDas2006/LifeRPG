export type TaskCategory = 
  | 'STRENGTH' 
  | 'INTELLIGENCE' 
  | 'VITALITY' 
  | 'AGILITY' 
  | 'CHARISMA' 
  | 'WILLPOWER';

export type TaskDifficulty = 'TRIVIAL' | 'EASY' | 'MEDIUM' | 'HARD' | 'EPIC';

export type TaskType = 'HABIT' | 'DAILY' | 'TODO' | 'BOSS_RAID';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  difficulty: TaskDifficulty;
  type: TaskType;
  baseXP: number;
  baseGold: number;
  streakCount: number;
  maxStreak: number;
  isCompletedToday: boolean;
  lastCompletedAt?: string;
  createdAt: string;
}

export interface UserStats {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  gold: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  str: number;
  int: number;
  vit: number;
  agi: number;
  cha: number;
  wil: number;
  totalTasksCompleted: number;
  streakFreezeTokens: number;
}

export type ItemRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export type ItemSlot = 'HEAD' | 'CHEST' | 'WEAPON' | 'SHIELD' | 'ACCESSORY' | 'CONSUMABLE';

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: ItemRarity;
  slot: ItemSlot;
  statModifiers: {
    str?: number;
    int?: number;
    vit?: number;
    agi?: number;
    cha?: number;
    wil?: number;
    xpBonusPct?: number;
    goldBonusPct?: number;
    healthBonus?: number;
  };
  buyPrice: number;
  sellPrice: number;
  icon: string;
}

export interface InventoryItem {
  id: string;
  itemId: string;
  item: Item;
  quantity: number;
  isEquipped: boolean;
  acquiredAt: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  requirementType: 'LEVEL' | 'TASKS_TOTAL' | 'STREAK' | 'CATEGORY_COUNT';
  requirementCategory?: TaskCategory;
  threshold: number;
  rewardXP: number;
  rewardGold: number;
  unlockedAt?: string;
}

export interface TaskCompletionReward {
  xpEarned: number;
  goldEarned: number;
  streakMultiplier: number;
  critMultiplier: number;
  isCrit: boolean;
  lootDrop?: Item;
}

export interface TaskCompletionResult {
  success: boolean;
  task: Task;
  rewards: TaskCompletionReward;
  progression: {
    leveledUp: boolean;
    previousLevel: number;
    newLevel: number;
    currentXP: number;
    nextLevelXP: number;
    unlockedAchievements: Achievement[];
  };
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  title: string;
  level: number;
  totalXP: number;
  streak: number;
  avatar: string;
}

export type CharacterClass =
  | 'WARRIOR'
  | 'MAGE'
  | 'ROGUE'
  | 'PALADIN'
  | 'RANGER'
  | 'CYBER_HERO';

export type AvatarStyle =
  | 'PIXEL_HERO'
  | 'MYSTIC_ARCANE'
  | 'CYBER_ROGUE'
  | 'HOLY_PALADIN'
  | 'SHADOW_ASSASSIN';

export interface SpritePartsConfig {
  body: string; // e.g. 'fair', 'tanned', 'dark', 'elf'
  hair: string; // e.g. 'short', 'spiky', 'long', 'ponytail', 'bald'
  hairColor: string; // hex or name
  outfit: string; // 'plate', 'robe', 'tunic', 'cyber', 'leather'
  outfitColor: string;
  weapon: string; // 'sword', 'staff', 'daggers', 'bow', 'katana', 'unarmed'
  aura: string; // 'none', 'fire', 'arcane', 'holy', 'shadow', 'lightning'
}

export interface CharacterConfig {
  name: string;
  class: CharacterClass;
  title: string;
  avatarUrl: string; // data URI or sprite SVG
  avatarType: 'SPRITE' | 'PHOTO_GENERATED';
  spriteParts?: SpritePartsConfig;
  sourcePhotoUrl?: string;
  generationStyle?: AvatarStyle;
  generationSeed?: number;
}

