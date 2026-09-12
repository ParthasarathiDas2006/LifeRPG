import { TaskDifficulty, TaskCategory, MoralAttribute, Item, ItemRarity } from './types';

/**
 * Calculates XP required to advance from `level` to `level + 1`.
 * Uses a smooth non-linear curve: 100 * level^1.6 + 50 * level
 */
export function getRequiredXPForLevel(level: number): number {
  if (level <= 0) return 100;
  return Math.floor(100 * Math.pow(level, 1.6) + 50 * level);
}

/**
 * Base XP, Gold, and Virtue Coin rewards by task difficulty tier.
 */
export const DIFFICULTY_CONFIG: Record<TaskDifficulty, { xp: number; gold: number; virtueCoins: number; multiplier: number }> = {
  TRIVIAL: { xp: 15, gold: 8, virtueCoins: 2, multiplier: 1.0 },
  EASY: { xp: 35, gold: 20, virtueCoins: 5, multiplier: 1.2 },
  MEDIUM: { xp: 75, gold: 45, virtueCoins: 12, multiplier: 1.5 },
  HARD: { xp: 160, gold: 100, virtueCoins: 25, multiplier: 2.0 },
  EPIC: { xp: 350, gold: 250, virtueCoins: 60, multiplier: 3.0 },
};

/**
 * Calculates streak reward multiplier (capped at +50% after 10 days).
 */
export function calculateStreakMultiplier(streak: number): number {
  const bonus = Math.min(0.5, streak * 0.05);
  return Number((1.0 + bonus).toFixed(2));
}

/**
 * Determines if a completion triggers a Critical Success based on player Willpower.
 */
export function evaluateCriticalSuccess(willpower: number = 10): { isCrit: boolean; critMultiplier: number } {
  // Base 10% crit chance + 0.5% per willpower point above 10 (capped at 30%)
  const critChance = Math.min(0.30, 0.10 + Math.max(0, willpower - 10) * 0.005);
  const roll = Math.random();
  const isCrit = roll < critChance;
  return {
    isCrit,
    critMultiplier: isCrit ? 1.5 : 1.0,
  };
}

/**
 * Determines loot drop roll based on task difficulty.
 */
export function rollLootDrop(
  difficulty: TaskDifficulty,
  catalog: Item[],
  pityCount: number = 0
): { item?: Item; wasPity: boolean } {
  // Trivial tasks don't drop loot
  if (difficulty === 'TRIVIAL') return { wasPity: false };

  // Drop chances: Easy (15%), Medium (25%), Hard (45%), Epic (80%)
  const dropChances: Record<TaskDifficulty, number> = {
    TRIVIAL: 0,
    EASY: 0.15,
    MEDIUM: 0.28,
    HARD: 0.50,
    EPIC: 0.85,
  };

  const shouldDrop = Math.random() < dropChances[difficulty] || pityCount >= 10;
  if (!shouldDrop || catalog.length === 0) {
    return { wasPity: false };
  }

  const wasPity = pityCount >= 10;

  // Determine rarity weight
  // Weights: Common 60, Uncommon 25, Rare 10, Epic 4, Legendary 1
  const roll = Math.random() * 100;
  let targetRarity: ItemRarity = 'COMMON';

  if (wasPity) {
    targetRarity = roll < 70 ? 'RARE' : roll < 95 ? 'EPIC' : 'LEGENDARY';
  } else if (roll > 98) {
    targetRarity = 'LEGENDARY';
  } else if (roll > 90) {
    targetRarity = 'EPIC';
  } else if (roll > 75) {
    targetRarity = 'RARE';
  } else if (roll > 45) {
    targetRarity = 'UNCOMMON';
  }

  // Filter items of this rarity or lower if not found
  const matchingItems = catalog.filter((i) => i.rarity === targetRarity);
  if (matchingItems.length > 0) {
    const picked = matchingItems[Math.floor(Math.random() * matchingItems.length)];
    return { item: picked, wasPity };
  }

  // Fallback to random item
  const fallback = catalog[Math.floor(Math.random() * catalog.length)];
  return { item: fallback, wasPity };
}

/**
 * Maps task category to the primary attribute gained
 */
export function getAttributeGained(
  category: TaskCategory
): 'str' | 'int' | 'vit' | 'agi' | 'cha' | 'wil' | 'integrity' | 'compassion' | 'discipline' | 'wisdom' {
  switch (category) {
    case 'INTEGRITY':
      return 'integrity';
    case 'COMPASSION':
      return 'compassion';
    case 'DISCIPLINE':
      return 'discipline';
    case 'WISDOM':
      return 'wisdom';
    case 'STRENGTH':
      return 'str';
    case 'INTELLIGENCE':
      return 'int';
    case 'VITALITY':
      return 'vit';
    case 'AGILITY':
      return 'agi';
    case 'CHARISMA':
      return 'cha';
    case 'WILLPOWER':
    default:
      return 'wil';
  }
}

/**
 * Returns an inspiring philosophical rank title based on level and moral virtue focus.
 */
export function getVirtueRankTitle(level: number, dominantVirtue?: string): string {
  if (level >= 25) return 'Transcendent Sage of the Sanctuary';
  if (level >= 20) return 'Grand Master of Equanimity';
  if (level >= 15) return 'Adept of the Cardinal Virtues';
  if (level >= 10) {
    if (dominantVirtue === 'COMPASSION') return 'Beacon of Lovingkindness';
    if (dominantVirtue === 'INTEGRITY') return 'Pillar of Unyielding Truth';
    if (dominantVirtue === 'DISCIPLINE') return 'Master of Iron Resolve';
    if (dominantVirtue === 'WISDOM') return 'Keeper of Tranquil Insight';
    return 'Guardian of the Moral Path';
  }
  if (level >= 5) return 'Practitioner of Inner Peace';
  return 'Seeker of the Four Virtues';
}

