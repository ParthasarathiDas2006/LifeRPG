export type TaskCategory = 
  | 'STRENGTH' 
  | 'INTELLIGENCE' 
  | 'VITALITY' 
  | 'AGILITY' 
  | 'CHARISMA' 
  | 'WILLPOWER'
  | 'INTEGRITY'
  | 'COMPASSION'
  | 'DISCIPLINE'
  | 'WISDOM';

export type MoralAttribute = 'INTEGRITY' | 'COMPASSION' | 'DISCIPLINE' | 'WISDOM';

export type TaskDifficulty = 'TRIVIAL' | 'EASY' | 'MEDIUM' | 'HARD' | 'EPIC';

export type TaskType = 
  | 'HABIT' 
  | 'DAILY' 
  | 'TODO' 
  | 'BOSS_RAID'
  | 'NEGATIVE_RESTRAINT'
  | 'REFLECTION'
  | 'MILESTONE';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  moralAttribute?: MoralAttribute;
  difficulty: TaskDifficulty;
  type: TaskType;
  baseXP: number;
  baseGold: number;
  baseVirtueCoins?: number;
  streakCount: number;
  maxStreak: number;
  isCompletedToday: boolean;
  requiresReflection?: boolean;
  lastCompletedAt?: string;
  createdAt: string;
}

export interface UserStats {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  gold: number;
  virtueCoins: number;
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
  // 4 Cardinal Moral Virtues
  integrity: number;
  compassion: number;
  discipline: number;
  wisdom: number;
  totalTasksCompleted: number;
  streakFreezeTokens: number;
  activeTheme?: string;
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
  enhancementLevel?: number; // 0 to 10 (+1, +2, ..., +10)
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
  virtueCoinsEarned?: number;
  attributeXpEarned?: {
    attribute: TaskCategory;
    amount: number;
  };
  streakMultiplier: number;
  critMultiplier: number;
  isCrit: boolean;
  lootDrop?: Item;
}

export interface ReflectionEntry {
  id: string;
  taskId: string;
  taskTitle: string;
  attribute: MoralAttribute;
  text: string;
  moodRating?: number; // 1-5
  honestyAffirmed: boolean;
  xpEarned: number;
  virtueCoinsEarned: number;
  completedAt: string;
}

export interface VirtueTheme {
  id: string;
  name: string;
  description: string;
  previewBg: string;
  accentColor: string;
  costCoins: number;
  isUnlocked: boolean;
}

export interface VirtueBadge {
  id: string;
  code: string;
  title: string;
  description: string;
  attribute: MoralAttribute | 'SANCTUARY';
  icon: string;
  unlockedAt?: string;
}

export interface TaskCompletionResult {
  success: boolean;
  task: Task;
  rewards: TaskCompletionReward;
  reflection?: ReflectionEntry;
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

export type CharacterGender = 'FEMALE' | 'MALE' | 'NON_BINARY';

export type CharacterClass =
  | 'WARRIOR'
  | 'VALKYRIE'
  | 'MAGE'
  | 'SORCERESS'
  | 'ROGUE'
  | 'KUNOICHI'
  | 'PALADIN'
  | 'RANGER'
  | 'HUNTRESS'
  | 'CYBER_HERO'
  | 'CYBER_VALKYRIE'
  | 'PHOTO_AVATAR';

export type AvatarStyle =
  | 'PIXEL_HERO'
  | 'MYSTIC_ARCANE'
  | 'CYBER_ROGUE'
  | 'HOLY_PALADIN'
  | 'SHADOW_ASSASSIN'
  | 'ANIME_LEGEND'
  | 'CELESTIAL_ASTRAL';

export interface SpritePartsConfig {
  gender?: CharacterGender;
  body: string; // e.g. 'fair', 'tanned', 'dark', 'elf', 'cyber', 'ivory'
  hair: string; // e.g. 'short', 'spiky', 'long', 'ponytail', 'twin_braids', 'odango_buns', 'flowing_waves', 'side_bob'
  hairColor: string; // hex or name
  outfit: string; // 'plate', 'robe', 'tunic', 'cyber', 'valkyrie_plate', 'sorceress_dress', 'huntress_leather', 'kunoichi_suit'
  outfitColor: string;
  weapon: string; // 'sword', 'staff', 'daggers', 'bow', 'katana', 'spear', 'scythe', 'dual_sabers'
  aura: string; // 'none', 'fire', 'arcane', 'holy', 'shadow', 'lightning', 'sakura', 'celestial'
}

export interface CharacterConfig {
  name: string;
  class: CharacterClass;
  gender?: CharacterGender;
  title: string;
  avatarUrl: string; // data URI or sprite SVG
  avatarType: 'SPRITE' | 'PHOTO_GENERATED';
  spriteParts?: SpritePartsConfig;
  sourcePhotoUrl?: string;
  generationStyle?: AvatarStyle;
  generationSeed?: number;
  uniqueHeroId?: string;
  gameOrigin?: 'ORIGINAL_3D' | 'SOLO_LEVELING' | 'CYBER_RPG';
  abilityName?: string;
  abilityBuff?: string;
  humanSpecs?: {
    physique: string;
    faceAndEyes: string;
    torsoAndOutfit: string;
    armsAndGloves: string;
    legsAndBoots: string;
  };
}

// --- Battle Ranked Tier System ---
export type RankedTier =
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'DIAMOND'
  | 'HEROIC'
  | 'GRANDMASTER';

export interface BossRaidData {
  bossName: string;
  bossTitle: string;
  bossAvatar: string;
  currentHp: number;
  maxHp: number;
  phase: number;
  rewards: {
    xp: number;
    gold: number;
    guaranteedLoot: string;
    titleUnlock?: string;
  };
  participantsCount?: number;
}

export interface TalentNode {
  id: string;
  name: string;
  tree: 'BODY' | 'MIND' | 'SOUL';
  description: string;
  icon: string;
  currentRank: number;
  maxRank: number;
  requiredLevel: number;
  statBonus: {
    xpPct?: number;
    goldPct?: number;
    critPct?: number;
    hpBonus?: number;
    pomodoroXpBonus?: number;
  };
}

export interface ArenaOpponent {
  id: string;
  name: string;
  title: string;
  level: number;
  combatPower: number;
  class: CharacterClass;
  tier: RankedTier;
  avatar: string;
  str: number;
  vit: number;
  agi: number;
  int: number;
  winRewardGold: number;
  winRewardXP: number;
}

export interface ArenaBattleLog {
  turn: number;
  attacker: string;
  defender: string;
  damage: number;
  isCrit: boolean;
  message: string;
}

export interface DailyWheelSlice {
  id: string;
  label: string;
  icon: string;
  type: 'GOLD' | 'XP' | 'SHIELD' | 'CRATE' | 'JACKPOT';
  amount: number;
  color: string;
}

