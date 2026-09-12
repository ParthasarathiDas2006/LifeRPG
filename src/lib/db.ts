import fs from 'fs';
import path from 'path';
import {
  Task,
  UserStats,
  Item,
  InventoryItem,
  Achievement,
  TaskCompletionResult,
  LeaderboardEntry,
  CharacterConfig,
  RankedTier,
  BossRaidData,
  TalentNode,
  ArenaOpponent,
  ArenaBattleLog,
  DailyWheelSlice,
  VirtueTheme,
} from './types';
import { generateProceduralSprite, HERO_PRESETS } from './photoGenerator';
import {
  getRequiredXPForLevel,
  DIFFICULTY_CONFIG,
  calculateStreakMultiplier,
  evaluateCriticalSuccess,
  rollLootDrop,
  getAttributeGained,
} from './progression';
import {
  checkRateLimit,
  recordCompletionTimestamp,
  validateDailyCaps,
  recordDailyEarnings,
  generateAuditHash,
} from './antiCheat';

interface DatabaseSchema {
  userStats: UserStats;
  character: CharacterConfig;
  tasks: Task[];
  itemsCatalog: Item[];
  inventory: InventoryItem[];
  achievements: Achievement[];
  userAchievements: string[]; // achievement codes
  completionsLog: Array<{
    id: string;
    taskId: string;
    completedAt: string;
    xpEarned: number;
    goldEarned: number;
    validationHash: string;
  }>;
  pityCounter: number;
  bossRaids?: BossRaidData[];
  talentPoints?: number;
  unlockedTalents?: Record<string, number>;
  lastDailySpin?: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'liferpg_db.json');

// Ensure directory exists
function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const defaultData = getInitialDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

function getDefaultCharacter(): CharacterConfig {
  const preset = HERO_PRESETS[0];
  return {
    name: preset.name,
    class: preset.class,
    gender: preset.gender,
    title: preset.title,
    avatarUrl: preset.portraitUrl || generateProceduralSprite(preset.parts, preset.class),
    avatarType: 'SPRITE',
    spriteParts: preset.parts,
    gameOrigin: preset.gameInspiration,
    abilityName: preset.ability.name,
    abilityBuff: preset.ability.buffText,
    humanSpecs: preset.humanSpecs,
  };
}

function readDb(): DatabaseSchema {
  ensureDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.character) {
      parsed.character = getDefaultCharacter();
      writeDb(parsed);
    } else if (parsed.character.avatarType === 'SPRITE' && parsed.character.spriteParts) {
      const matchingPreset = HERO_PRESETS.find(
        (p) => p.name.toLowerCase() === parsed.character.name.toLowerCase()
      );
      if (matchingPreset && matchingPreset.portraitUrl) {
        parsed.character.avatarUrl = matchingPreset.portraitUrl;
      } else if (!parsed.character.avatarUrl) {
        parsed.character.avatarUrl = generateProceduralSprite(
          parsed.character.spriteParts,
          parsed.character.class
        );
      }
    }
    return parsed;
  } catch (err) {
    console.error('Error reading database file, resetting to defaults', err);
    const initial = getInitialDatabase();
    writeDb(initial);
    return initial;
  }
}

function writeDb(data: DatabaseSchema) {
  ensureDb();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    try {
      fs.copyFileSync(tempFile, DB_FILE);
      fs.unlinkSync(tempFile);
    } catch (_) {}
  }
}

// Initial Starter Dataset
function getInitialDatabase(): DatabaseSchema {
  const itemsCatalog: Item[] = [
    {
      id: 'item-1',
      name: "Novice's Iron Sword",
      description: 'A well-balanced blade forged for fledgling warriors.',
      rarity: 'COMMON',
      slot: 'WEAPON',
      statModifiers: { str: 4, xpBonusPct: 2 },
      buyPrice: 60,
      sellPrice: 25,
      icon: '⚔️',
    },
    {
      id: 'item-2',
      name: "Scholar's Reading Monocle",
      description: 'Enhances cognitive focus and memory retention.',
      rarity: 'UNCOMMON',
      slot: 'HEAD',
      statModifiers: { int: 6, xpBonusPct: 4 },
      buyPrice: 120,
      sellPrice: 50,
      icon: '🧐',
    },
    {
      id: 'item-3',
      name: 'Boots of Promptness',
      description: 'Enchanted with wind essence to clear daily errands quickly.',
      rarity: 'RARE',
      slot: 'CHEST',
      statModifiers: { agi: 8, wil: 3 },
      buyPrice: 250,
      sellPrice: 110,
      icon: '👢',
    },
    {
      id: 'item-4',
      name: 'Heartstone Amulet',
      description: 'Radiates a soothing glow that revitalizes sleep and hydration.',
      rarity: 'RARE',
      slot: 'ACCESSORY',
      statModifiers: { vit: 10, healthBonus: 30 },
      buyPrice: 300,
      sellPrice: 140,
      icon: '📿',
    },
    {
      id: 'item-5',
      name: 'Crown of Sovereign Will',
      description: 'Forged from concentrated determination. Greatly enhances critical focus.',
      rarity: 'EPIC',
      slot: 'HEAD',
      statModifiers: { wil: 15, int: 5, xpBonusPct: 8 },
      buyPrice: 650,
      sellPrice: 300,
      icon: '👑',
    },
    {
      id: 'item-6',
      name: 'Aegis of the Disciplined',
      description: 'A legendary tower shield that blocks procrastination impulses.',
      rarity: 'LEGENDARY',
      slot: 'SHIELD',
      statModifiers: { str: 12, wil: 14, xpBonusPct: 12, goldBonusPct: 15 },
      buyPrice: 1500,
      sellPrice: 700,
      icon: '🛡️',
    },
    {
      id: 'item-7',
      name: 'Streak Freeze Shield',
      description: 'Protects your active habit streak for 1 day if you miss a daily task.',
      rarity: 'UNCOMMON',
      slot: 'CONSUMABLE',
      statModifiers: {},
      buyPrice: 80,
      sellPrice: 30,
      icon: '🧊',
    },
    {
      id: 'item-8',
      name: 'Elixir of Deep Flow',
      description: 'Consumable that grants double XP on your next completed task.',
      rarity: 'RARE',
      slot: 'CONSUMABLE',
      statModifiers: { xpBonusPct: 100 },
      buyPrice: 150,
      sellPrice: 60,
      icon: '🧪',
    },
  ];

  const tasks: Task[] = [
    {
      id: 'task-1',
      title: 'Morning Physical Training (45 min)',
      description: 'Pushups, kettlebell swings, or running to condition the physical vessel.',
      category: 'STRENGTH',
      difficulty: 'MEDIUM',
      type: 'DAILY',
      baseXP: 75,
      baseGold: 45,
      streakCount: 4,
      maxStreak: 6,
      isCompletedToday: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-2',
      title: 'Deep Study / Algorithm Practice (60 min)',
      description: 'Read system design documents or solve computer science challenges.',
      category: 'INTELLIGENCE',
      difficulty: 'HARD',
      type: 'DAILY',
      baseXP: 160,
      baseGold: 100,
      streakCount: 7,
      maxStreak: 12,
      isCompletedToday: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-3',
      title: 'Hydration & Mindful Breathing (2L Water)',
      description: 'Keep hydration levels optimal and perform 5 minutes of mindful breathwork.',
      category: 'VITALITY',
      difficulty: 'TRIVIAL',
      type: 'HABIT',
      baseXP: 15,
      baseGold: 8,
      streakCount: 14,
      maxStreak: 14,
      isCompletedToday: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-4',
      title: 'Rapid Triage: Inbox Zero & Workspace Cleanup',
      description: 'Clear cluttered workspace and review pending messages under 20 minutes.',
      category: 'AGILITY',
      difficulty: 'EASY',
      type: 'DAILY',
      baseXP: 35,
      baseGold: 20,
      streakCount: 2,
      maxStreak: 5,
      isCompletedToday: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-5',
      title: 'Social Fellowship / Meaningful Check-in',
      description: 'Reach out to a colleague, friend, or family member with genuine appreciation.',
      category: 'CHARISMA',
      difficulty: 'EASY',
      type: 'DAILY',
      baseXP: 35,
      baseGold: 20,
      streakCount: 1,
      maxStreak: 4,
      isCompletedToday: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-6',
      title: '2-Hour Zero Distraction Deep Work Block',
      description: 'Put phone in another room, silence notifications, and execute high-value work.',
      category: 'WILLPOWER',
      difficulty: 'HARD',
      type: 'BOSS_RAID',
      baseXP: 160,
      baseGold: 100,
      streakCount: 3,
      maxStreak: 8,
      isCompletedToday: false,
      createdAt: new Date().toISOString(),
    },
    // 4 Cardinal Moral Virtue Tasks
    {
      id: 'task-moral-1',
      title: 'No Anger Day: Respond to irritation with calm composure',
      description: 'Observe triggers with mindful detachment. Cultivate patience over reactive anger.',
      category: 'WISDOM',
      moralAttribute: 'WISDOM',
      difficulty: 'HARD',
      type: 'NEGATIVE_RESTRAINT',
      baseXP: 180,
      baseGold: 90,
      baseVirtueCoins: 25,
      streakCount: 6,
      maxStreak: 12,
      isCompletedToday: false,
      requiresReflection: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-moral-2',
      title: 'Random Act of Kindness: Encourage someone unexpectedly',
      description: 'Brighten someone’s day through genuine praise, practical help, or a thoughtful message.',
      category: 'COMPASSION',
      moralAttribute: 'COMPASSION',
      difficulty: 'MEDIUM',
      type: 'DAILY',
      baseXP: 95,
      baseGold: 50,
      baseVirtueCoins: 15,
      streakCount: 5,
      maxStreak: 9,
      isCompletedToday: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-moral-3',
      title: 'Integrity Mirror: Acknowledge an error without excuses',
      description: 'Take radical ownership of a mistake or keep a tough commitment with complete honesty.',
      category: 'INTEGRITY',
      moralAttribute: 'INTEGRITY',
      difficulty: 'MEDIUM',
      type: 'HABIT',
      baseXP: 90,
      baseGold: 45,
      baseVirtueCoins: 15,
      streakCount: 3,
      maxStreak: 7,
      isCompletedToday: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-moral-4',
      title: 'Digital Fast: 2 hours screen-free disciplined focus',
      description: 'Discipline the senses and mind by disconnecting from algorithm feeds and notifications.',
      category: 'DISCIPLINE',
      moralAttribute: 'DISCIPLINE',
      difficulty: 'HARD',
      type: 'DAILY',
      baseXP: 150,
      baseGold: 80,
      baseVirtueCoins: 20,
      streakCount: 4,
      maxStreak: 10,
      isCompletedToday: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-moral-5',
      title: 'Evening Sanctuary: 5-minute gratitude & virtue reflection',
      description: 'Review your conduct, celebrate inner victories, and note areas of tomorrow’s growth.',
      category: 'WISDOM',
      moralAttribute: 'WISDOM',
      difficulty: 'EASY',
      type: 'REFLECTION',
      baseXP: 60,
      baseGold: 30,
      baseVirtueCoins: 10,
      streakCount: 7,
      maxStreak: 14,
      isCompletedToday: false,
      requiresReflection: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const userStats: UserStats = {
    level: 3,
    currentXP: 240,
    nextLevelXP: getRequiredXPForLevel(3),
    gold: 145,
    virtueCoins: 45,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    str: 14,
    int: 16,
    vit: 12,
    agi: 11,
    cha: 10,
    wil: 15,
    integrity: 14,
    compassion: 18,
    discipline: 16,
    wisdom: 19,
    totalTasksCompleted: 23,
    streakFreezeTokens: 2,
    activeTheme: 'theme_mind_garden',
  };

  const inventory: InventoryItem[] = [
    {
      id: 'inv-1',
      itemId: 'item-1',
      item: itemsCatalog[0],
      quantity: 1,
      isEquipped: true,
      acquiredAt: new Date().toISOString(),
    },
  ];

  const achievements: Achievement[] = [
    {
      id: 'ach-1',
      code: 'FIRST_STEP',
      title: 'First Step to Greatness',
      description: 'Complete your very first real-life quest.',
      icon: '🌱',
      requirementType: 'TASKS_TOTAL',
      threshold: 1,
      rewardXP: 50,
      rewardGold: 25,
    },
    {
      id: 'ach-2',
      code: 'STREAK_7',
      title: 'Iron Consistency',
      description: 'Maintain a 7-day streak on any daily habit.',
      icon: '🔥',
      requirementType: 'STREAK',
      threshold: 7,
      rewardXP: 150,
      rewardGold: 100,
    },
    {
      id: 'ach-3',
      code: 'LEVEL_5',
      title: 'Seasoned Adventurer',
      description: 'Reach Character Level 5.',
      icon: '⚔️',
      requirementType: 'LEVEL',
      threshold: 5,
      rewardXP: 250,
      rewardGold: 150,
    },
    {
      id: 'ach-4',
      code: 'TASK_MASTER',
      title: 'Productivity Titan',
      description: 'Complete 25 total quests across any category.',
      icon: '🏆',
      requirementType: 'TASKS_TOTAL',
      threshold: 25,
      rewardXP: 300,
      rewardGold: 200,
    },
  ];

  return {
    userStats,
    character: getDefaultCharacter(),
    tasks,
    itemsCatalog,
    inventory,
    achievements,
    userAchievements: ['FIRST_STEP'],
    completionsLog: [],
    pityCounter: 3,
  };
}

// Database Service API
export const dbService = {
  getProfile() {
    const db = readDb();
    // Compute gear bonuses
    const equippedItems = db.inventory.filter((i) => i.isEquipped);
    let bonusXP = 0;
    let bonusGold = 0;
    let bonusStr = 0;
    let bonusInt = 0;
    let bonusVit = 0;
    let bonusAgi = 0;
    let bonusCha = 0;
    let bonusWil = 0;

    for (const inv of equippedItems) {
      const mods = inv.item.statModifiers;
      if (mods.xpBonusPct) bonusXP += mods.xpBonusPct;
      if (mods.goldBonusPct) bonusGold += mods.goldBonusPct;
      if (mods.str) bonusStr += mods.str;
      if (mods.int) bonusInt += mods.int;
      if (mods.vit) bonusVit += mods.vit;
      if (mods.agi) bonusAgi += mods.agi;
      if (mods.cha) bonusCha += mods.cha;
      if (mods.wil) bonusWil += mods.wil;
    }

    return {
      stats: db.userStats,
      character: db.character,
      gearBonuses: {
        bonusXP,
        bonusGold,
        bonusStr,
        bonusInt,
        bonusVit,
        bonusAgi,
        bonusCha,
        bonusWil,
      },
      effectiveStats: {
        str: db.userStats.str + bonusStr,
        int: db.userStats.int + bonusInt,
        vit: db.userStats.vit + bonusVit,
        agi: db.userStats.agi + bonusAgi,
        cha: db.userStats.cha + bonusCha,
        wil: db.userStats.wil + bonusWil,
      },
      achievements: db.achievements.map((ach) => ({
        ...ach,
        isUnlocked: db.userAchievements.includes(ach.code),
      })),
    };
  },

  getCharacter(): CharacterConfig {
    const db = readDb();
    return db.character;
  },

  updateCharacter(update: Partial<CharacterConfig>): CharacterConfig {
    const db = readDb();
    db.character = {
      ...db.character,
      ...update,
    };
    writeDb(db);
    return db.character;
  },

  getTasks() {
    const db = readDb();
    return db.tasks;
  },

  createTask(data: Partial<Task>): Task {
    const db = readDb();
    const difficulty = data.difficulty || 'MEDIUM';
    const config = DIFFICULTY_CONFIG[difficulty];

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: data.title || 'Untitled Quest',
      description: data.description || '',
      category: data.category || 'WISDOM',
      moralAttribute: data.moralAttribute,
      difficulty,
      type: data.type || 'DAILY',
      baseXP: data.baseXP || config.xp,
      baseGold: data.baseGold || config.gold,
      baseVirtueCoins: data.baseVirtueCoins || config.virtueCoins || 5,
      streakCount: 0,
      maxStreak: 0,
      isCompletedToday: false,
      requiresReflection: Boolean(data.requiresReflection || data.type === 'NEGATIVE_RESTRAINT' || data.type === 'REFLECTION'),
      createdAt: new Date().toISOString(),
    };

    db.tasks.unshift(newTask);
    writeDb(db);
    return newTask;
  },

  deleteTask(taskId: string): boolean {
    const db = readDb();
    const initialLen = db.tasks.length;
    db.tasks = db.tasks.filter((t) => t.id !== taskId);
    if (db.tasks.length !== initialLen) {
      writeDb(db);
      return true;
    }
    return false;
  },

  completeTask(
    taskId: string,
    reflectionData?: { text?: string; moodRating?: number; honestyAffirmed?: boolean },
    userId: string = 'default-player'
  ): TaskCompletionResult {
    const db = readDb();
    const taskIndex = db.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const task = db.tasks[taskIndex];
    if (task.isCompletedToday) {
      throw new Error('Task already completed today');
    }

    // 0. Anti-Cheat Rate Limiter & Cooldown Verification
    const rateCheck = checkRateLimit(userId);
    if (!rateCheck.allowed) {
      const err = new Error(rateCheck.reason || 'Rate limit exceeded');
      (err as unknown as { statusCode: number; retryAfter?: number }).statusCode = 429;
      (err as unknown as { statusCode: number; retryAfter?: number }).retryAfter = rateCheck.retryAfterSeconds;
      throw err;
    }

    // 1. Calculate Multipliers
    const streakMult = calculateStreakMultiplier(task.streakCount);
    const critInfo = evaluateCriticalSuccess(db.userStats.wil);

    // Calculate equipment bonuses
    const equipped = db.inventory.filter((i) => i.isEquipped);
    const xpBonusPct = equipped.reduce((acc, curr) => acc + (curr.item.statModifiers.xpBonusPct || 0), 0);
    const goldBonusPct = equipped.reduce((acc, curr) => acc + (curr.item.statModifiers.goldBonusPct || 0), 0);

    const gearXpMult = 1.0 + xpBonusPct / 100;
    const gearGoldMult = 1.0 + goldBonusPct / 100;

    // 2. Compute final rewards with anti-cheat daily caps & virtue coins
    const rawXP = Math.round(task.baseXP * streakMult * critInfo.critMultiplier * gearXpMult);
    const rawGold = Math.round(task.baseGold * streakMult * critInfo.critMultiplier * gearGoldMult);
    const baseCoins = task.baseVirtueCoins || 5;
    let finalCoins = Math.round(baseCoins * streakMult);

    const capCheck = validateDailyCaps(userId, rawXP, rawGold);
    if (!capCheck.allowed) {
      const err = new Error(capCheck.reason || 'Daily rewards cap reached');
      (err as unknown as { statusCode: number }).statusCode = 403;
      throw err;
    }

    let finalXP = capCheck.clampedXP;
    let finalGold = capCheck.clampedGold;

    // Record action in rate limiter and daily tracker
    recordCompletionTimestamp(userId);
    recordDailyEarnings(userId, finalXP, finalGold);

    let reflectionEntry: any = null;

    // 3. Process Reflection / Restraint Logic
    if (reflectionData || task.requiresReflection) {
      const isHonestAdmission = reflectionData?.honestyAffirmed === false;
      if (isHonestAdmission) {
        // Honesty Bonus: User admitted stumbling today. Reward Integrity!
        finalXP = Math.max(30, Math.round(finalXP * 0.5));
        finalCoins = Math.max(5, Math.round(finalCoins * 0.5));
        db.userStats.integrity = (db.userStats.integrity || 10) + 2;
      }

      reflectionEntry = {
        id: `ref-${Date.now()}`,
        taskId: task.id,
        taskTitle: task.title,
        attribute: (task.moralAttribute || task.category) as any,
        text: reflectionData?.text || 'Completed daily mindful reflection.',
        moodRating: reflectionData?.moodRating || 4,
        honestyAffirmed: !isHonestAdmission,
        xpEarned: finalXP,
        virtueCoinsEarned: finalCoins,
        completedAt: new Date().toISOString(),
      };
    }

    // 4. Roll for loot drop
    db.pityCounter += 1;
    const lootResult = rollLootDrop(task.difficulty, db.itemsCatalog, db.pityCounter);
    if (lootResult.item) {
      db.pityCounter = 0; // reset pity timer
      const existingInv = db.inventory.find((i) => i.itemId === lootResult.item!.id);
      if (existingInv) {
        existingInv.quantity += 1;
      } else {
        db.inventory.push({
          id: `inv-${Date.now()}`,
          itemId: lootResult.item.id,
          item: lootResult.item,
          quantity: 1,
          isEquipped: false,
          acquiredAt: new Date().toISOString(),
        });
      }
    }

    // 5. Update Task State
    task.isCompletedToday = true;
    task.streakCount += 1;
    if (task.streakCount > task.maxStreak) {
      task.maxStreak = task.streakCount;
    }
    task.lastCompletedAt = new Date().toISOString();

    // 6. Update User Stats & Primary Attribute
    const attr = getAttributeGained(task.category);
    if (typeof (db.userStats as any)[attr] === 'number') {
      (db.userStats as any)[attr] += 1;
    }
    db.userStats.totalTasksCompleted += 1;
    db.userStats.gold += finalGold;
    db.userStats.virtueCoins = (db.userStats.virtueCoins || 0) + finalCoins;
    db.userStats.currentXP += finalXP;

    // 7. Check for Level Up
    const previousLevel = db.userStats.level;
    let leveledUp = false;

    while (db.userStats.currentXP >= db.userStats.nextLevelXP) {
      db.userStats.currentXP -= db.userStats.nextLevelXP;
      db.userStats.level += 1;
      db.userStats.nextLevelXP = getRequiredXPForLevel(db.userStats.level);
      db.userStats.health = db.userStats.maxHealth;
      db.userStats.mana = db.userStats.maxMana;
      db.userStats.virtueCoins += db.userStats.level * 5; // Level up virtue coin grant
      leveledUp = true;
    }

    // 8. Check for Achievements
    const unlockedAchievements: Achievement[] = [];
    for (const ach of db.achievements) {
      if (db.userAchievements.includes(ach.code)) continue;

      let isEligible = false;
      if (ach.requirementType === 'TASKS_TOTAL' && db.userStats.totalTasksCompleted >= ach.threshold) {
        isEligible = true;
      } else if (ach.requirementType === 'LEVEL' && db.userStats.level >= ach.threshold) {
        isEligible = true;
      } else if (ach.requirementType === 'STREAK' && task.streakCount >= ach.threshold) {
        isEligible = true;
      }

      if (isEligible) {
        db.userAchievements.push(ach.code);
        db.userStats.currentXP += ach.rewardXP;
        db.userStats.gold += ach.rewardGold;
        unlockedAchievements.push(ach);
      }
    }

    // 8. Cryptographic Hash Chain Audit Ledger
    const lastAuditEntry = db.completionsLog[db.completionsLog.length - 1];
    const prevHash = lastAuditEntry?.validationHash || 'GENESIS_HASH_LIFERPG_0000';
    const timestamp = new Date().toISOString();
    const validationHash = generateAuditHash(prevHash, userId, task.id, finalXP, finalGold, timestamp);
    db.completionsLog.push({
      id: `comp-${Date.now()}`,
      taskId: task.id,
      completedAt: timestamp,
      xpEarned: finalXP,
      goldEarned: finalGold,
      validationHash,
    });

    writeDb(db);

    return {
      success: true,
      task,
      rewards: {
        xpEarned: finalXP,
        goldEarned: finalGold,
        virtueCoinsEarned: finalCoins,
        attributeXpEarned: {
          attribute: task.category,
          amount: 1,
        },
        streakMultiplier: streakMult,
        critMultiplier: critInfo.critMultiplier,
        isCrit: critInfo.isCrit,
        lootDrop: lootResult.item,
      },
      reflection: reflectionEntry,
      progression: {
        leveledUp,
        previousLevel,
        newLevel: db.userStats.level,
        currentXP: db.userStats.currentXP,
        nextLevelXP: db.userStats.nextLevelXP,
        unlockedAchievements,
      },
    };
  },

  // --- Virtue Themes & Sanctuary ---
  getVirtueThemes(): VirtueTheme[] {
    const db = readDb();
    const active = db.userStats.activeTheme || 'theme_mind_garden';
    return [
      {
        id: 'theme_mind_garden',
        name: 'Mind Garden',
        description: 'A tranquil dark jade sanctuary for deep mindfulness and clarity.',
        previewBg: 'from-emerald-950/80 via-slate-900 to-slate-950',
        accentColor: '#10b981',
        costCoins: 0,
        isUnlocked: true,
      },
      {
        id: 'theme_astral_monastery',
        name: 'Astral Monastery',
        description: 'High celestial temple with ethereal violet stars and amber dawn aura.',
        previewBg: 'from-indigo-950/80 via-slate-900 to-slate-950',
        accentColor: '#8b5cf6',
        costCoins: 35,
        isUnlocked: (db.userStats.virtueCoins || 0) >= 35 || active === 'theme_astral_monastery',
      },
      {
        id: 'theme_solitary_ember',
        name: 'Sanctum of the Sun',
        description: 'Radiant golden pillars evoking unshakable fortitude and warm light.',
        previewBg: 'from-amber-950/80 via-slate-900 to-slate-950',
        accentColor: '#f59e0b',
        costCoins: 60,
        isUnlocked: active === 'theme_solitary_ember',
      },
    ];
  },

  setVirtueTheme(themeId: string) {
    const db = readDb();
    db.userStats.activeTheme = themeId;
    writeDb(db);
    return { success: true, activeTheme: themeId };
  },

  getInventory() {
    const db = readDb();
    return db.inventory;
  },

  toggleEquip(inventoryId: string) {
    const db = readDb();
    const itemToEquip = db.inventory.find((i) => i.id === inventoryId);
    if (!itemToEquip) {
      throw new Error('Item not found in inventory');
    }

    // If consumable, use it directly
    if (itemToEquip.item.slot === 'CONSUMABLE') {
      if (itemToEquip.item.name.includes('Streak Freeze')) {
        db.userStats.streakFreezeTokens += 1;
      } else if (itemToEquip.item.name.includes('Elixir')) {
        db.userStats.currentXP += 100;
      }

      itemToEquip.quantity -= 1;
      if (itemToEquip.quantity <= 0) {
        db.inventory = db.inventory.filter((i) => i.id !== inventoryId);
      }
      writeDb(db);
      return { success: true, message: `Used ${itemToEquip.item.name}!` };
    }

    // Unequip any existing item in that slot
    const slot = itemToEquip.item.slot;
    const currentlyEquippedInSlot = db.inventory.find(
      (i) => i.isEquipped && i.item.slot === slot && i.id !== inventoryId
    );

    if (currentlyEquippedInSlot) {
      currentlyEquippedInSlot.isEquipped = false;
    }

    // Toggle current item
    itemToEquip.isEquipped = !itemToEquip.isEquipped;
    writeDb(db);
    return {
      success: true,
      isEquipped: itemToEquip.isEquipped,
      itemName: itemToEquip.item.name,
    };
  },

  getShop() {
    const db = readDb();
    return db.itemsCatalog;
  },

  buyItem(itemId: string) {
    const db = readDb();
    const item = db.itemsCatalog.find((i) => i.id === itemId);
    if (!item) throw new Error('Item not found');

    if (db.userStats.gold < item.buyPrice) {
      throw new Error(`Insufficient gold! You need ${item.buyPrice} gold.`);
    }

    db.userStats.gold -= item.buyPrice;

    // Check if already in inventory
    const existing = db.inventory.find((i) => i.itemId === itemId);
    if (existing) {
      existing.quantity += 1;
    } else {
      db.inventory.push({
        id: `inv-${Date.now()}`,
        itemId: item.id,
        item,
        quantity: 1,
        isEquipped: false,
        acquiredAt: new Date().toISOString(),
      });
    }

    writeDb(db);
    return {
      success: true,
      item,
      remainingGold: db.userStats.gold,
    };
  },

  getLeaderboard(): LeaderboardEntry[] {
    const db = readDb();
    // Return sample global leaderboards featuring the player and competitive NPC rivals
    const playerTotalXP =
      getRequiredXPForLevel(db.userStats.level - 1) + db.userStats.currentXP;

    const baseEntries: LeaderboardEntry[] = [
      {
        rank: 1,
        username: 'Valkyrie_Elena',
        title: 'Grandmaster of Iron',
        level: 42,
        totalXP: 48900,
        streak: 114,
        avatar: '🛡️',
      },
      {
        rank: 2,
        username: 'Kaelen_Shadowmend',
        title: 'Archmage of Deep Focus',
        level: 38,
        totalXP: 39800,
        streak: 89,
        avatar: '🧙‍♂️',
      },
      {
        rank: 3,
        username: 'Aurelius_Stoic',
        title: 'Disciplined Ascetic',
        level: 31,
        totalXP: 27400,
        streak: 62,
        avatar: '⚔️',
      },
      {
        rank: 4,
        username: 'Lyra_Swiftfoot',
        title: 'Shadow Ranger',
        level: 24,
        totalXP: 18200,
        streak: 35,
        avatar: '🏹',
      },
      {
        rank: 5,
        username: `${db.character.name} (You)`,
        title: `${db.character.title} • Tier ${Math.floor(db.userStats.level / 5) + 1}`,
        level: db.userStats.level,
        totalXP: playerTotalXP,
        streak: Math.max(...db.tasks.map((t) => t.streakCount), 1),
        avatar: db.character.avatarUrl,
      },
      {
        rank: 6,
        username: 'Thorin_Anvil',
        title: 'Apprentice Blacksmith',
        level: 2,
        totalXP: 180,
        streak: 2,
        avatar: '🔨',
      },
    ];

    // Sort by level then totalXP descending
    baseEntries.sort((a, b) => b.totalXP - a.totalXP);
    // Reassign ranks
    return baseEntries.map((e, idx) => ({ ...e, rank: idx + 1 }));
  },

  // --- Life RPG Ranked Tier Calculator ---
  getRankedTier(level: number, totalStats: number, streak: number): RankedTier {
    const score = level * 100 + totalStats * 5 + streak * 50;
    if (score >= 8000) return 'GRANDMASTER';
    if (score >= 5500) return 'HEROIC';
    if (score >= 3800) return 'DIAMOND';
    if (score >= 2400) return 'PLATINUM';
    if (score >= 1200) return 'GOLD';
    if (score >= 500) return 'SILVER';
    return 'BRONZE';
  },

  // --- Blacksmith Forge Enhancement System (+1 to +10) ---
  enhanceItem(invId: string): { success: boolean; enhancedLevel: number; message: string; item: Item } {
    const db = readDb();
    const inv = db.inventory.find((i) => i.id === invId);
    if (!inv) throw new Error('Inventory item not found');

    const currentLevel = inv.item.enhancementLevel || 0;
    if (currentLevel >= 10) {
      throw new Error('Item has already achieved MAX Enhancement (+10)!');
    }

    const cost = (currentLevel + 1) * 120;
    if (db.userStats.gold < cost) {
      throw new Error(`Insufficient gold! You need ${cost} GP to forge this item.`);
    }

    db.userStats.gold -= cost;

    // Success probabilities: +1 (95%) down to +10 (15%)
    const successRates = [0.95, 0.9, 0.85, 0.75, 0.65, 0.5, 0.4, 0.3, 0.2, 0.15];
    const rate = successRates[currentLevel] ?? 0.2;
    const roll = Math.random();

    if (roll <= rate) {
      const nextLevel = currentLevel + 1;
      inv.item.enhancementLevel = nextLevel;

      // Boost item stat modifiers by +20% per enhancement level
      const multiplier = 1.2;
      const mods = inv.item.statModifiers;
      if (mods.str) mods.str = Math.round(mods.str * multiplier + 1);
      if (mods.int) mods.int = Math.round(mods.int * multiplier + 1);
      if (mods.vit) mods.vit = Math.round(mods.vit * multiplier + 1);
      if (mods.agi) mods.agi = Math.round(mods.agi * multiplier + 1);
      if (mods.cha) mods.cha = Math.round(mods.cha * multiplier + 1);
      if (mods.wil) mods.wil = Math.round(mods.wil * multiplier + 1);
      if (mods.xpBonusPct) mods.xpBonusPct = Math.round(mods.xpBonusPct + 1);
      if (mods.goldBonusPct) mods.goldBonusPct = Math.round(mods.goldBonusPct + 1);

      writeDb(db);
      return {
        success: true,
        enhancedLevel: nextLevel,
        message: `FORGE SUCCESS! ${inv.item.name} ascended to +${nextLevel}!`,
        item: inv.item,
      };
    } else {
      writeDb(db);
      return {
        success: false,
        enhancedLevel: currentLevel,
        message: `FORGE FAILED! The hammer slipped, but the item survived at +${currentLevel}.`,
        item: inv.item,
      };
    }
  },

  // --- Lucky Royale Gacha Crate Opening ---
  openLuckyCrate(): { item: Item; pityCount: number; isRareOrBetter: boolean } {
    const db = readDb();
    const crateCost = 150;
    if (db.userStats.gold < crateCost) {
      throw new Error(`Insufficient gold! Lucky Crate costs ${crateCost} GP.`);
    }

    db.userStats.gold -= crateCost;
    db.pityCounter += 1;

    // Roll loot
    const drop = rollLootDrop('EPIC', db.itemsCatalog, db.pityCounter);
    let item = drop.item;
    if (!item) {
      // Fallback to random item from catalog
      item = db.itemsCatalog[Math.floor(Math.random() * db.itemsCatalog.length)];
    }

    const isRareOrBetter = ['RARE', 'EPIC', 'LEGENDARY'].includes(item.rarity);
    if (isRareOrBetter) {
      db.pityCounter = 0;
    }

    // Add to inventory
    const existing = db.inventory.find((i) => i.itemId === item!.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      db.inventory.push({
        id: `inv-${Date.now()}`,
        itemId: item.id,
        item,
        quantity: 1,
        isEquipped: false,
        acquiredAt: new Date().toISOString(),
      });
    }

    writeDb(db);
    return {
      item,
      pityCount: db.pityCounter,
      isRareOrBetter,
    };
  },

  // --- Daily Fortune Spin Wheel ---
  spinDailyWheel(): { slice: DailyWheelSlice; message: string } {
    const db = readDb();
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    const wheelSlices: DailyWheelSlice[] = [
      { id: '1', label: '100 Gold', icon: '💰', type: 'GOLD', amount: 100, color: '#f59e0b' },
      { id: '2', label: '150 XP', icon: '⚡', type: 'XP', amount: 150, color: '#a855f7' },
      { id: '3', label: '1 Streak Shield', icon: '🛡️', type: 'SHIELD', amount: 1, color: '#06b6d4' },
      { id: '4', label: '250 Gold', icon: '💎', type: 'GOLD', amount: 250, color: '#eab308' },
      { id: '5', label: 'Lucky Crate', icon: '🎁', type: 'CRATE', amount: 1, color: '#ec4899' },
      { id: '6', label: 'JACKPOT 500 GP', icon: '🔥', type: 'JACKPOT', amount: 500, color: '#ef4444' },
    ];

    const selected = wheelSlices[Math.floor(Math.random() * wheelSlices.length)];

    if (selected.type === 'GOLD' || selected.type === 'JACKPOT') {
      db.userStats.gold += selected.amount;
    } else if (selected.type === 'XP') {
      db.userStats.currentXP += selected.amount;
      while (db.userStats.currentXP >= db.userStats.nextLevelXP) {
        db.userStats.currentXP -= db.userStats.nextLevelXP;
        db.userStats.level += 1;
        db.userStats.nextLevelXP = getRequiredXPForLevel(db.userStats.level);
      }
    } else if (selected.type === 'SHIELD') {
      db.userStats.streakFreezeTokens += selected.amount;
    } else if (selected.type === 'CRATE') {
      // Award random item directly
      const randomItem = db.itemsCatalog[Math.floor(Math.random() * db.itemsCatalog.length)];
      db.inventory.push({
        id: `inv-${Date.now()}`,
        itemId: randomItem.id,
        item: randomItem,
        quantity: 1,
        isEquipped: false,
        acquiredAt: new Date().toISOString(),
      });
    }

    db.lastDailySpin = todayStr;
    writeDb(db);

    return {
      slice: selected,
      message: `Daily Supply Drop Awarded: ${selected.label}!`,
    };
  },

  // --- Boss Raids (IRL Mega-Challenges) ---
  getBossRaids(): BossRaidData[] {
    const db = readDb();
    if (!db.bossRaids || db.bossRaids.length === 0) {
      db.bossRaids = [
        {
          bossName: 'The Iron Colossus',
          bossTitle: 'Overlord of Physical Stagnation',
          bossAvatar: '👹',
          currentHp: 640,
          maxHp: 1000,
          phase: 2,
          rewards: {
            xp: 800,
            gold: 500,
            guaranteedLoot: "Colossus's Adamantine Aegis",
            titleUnlock: 'Iron Titan Breaker',
          },
          participantsCount: 142,
        },
        {
          bossName: 'The Void Overlord',
          bossTitle: 'Devourer of Human Attention Span',
          bossAvatar: '👁️',
          currentHp: 890,
          maxHp: 1200,
          phase: 1,
          rewards: {
            xp: 1200,
            gold: 750,
            guaranteedLoot: 'Singularity Focus Diadem',
            titleUnlock: 'Void Mind Slayer',
          },
          participantsCount: 88,
        },
        {
          bossName: 'Hydra of Restlessness',
          bossTitle: 'Sleep Deprivation Fiend',
          bossAvatar: '🐉',
          currentHp: 420,
          maxHp: 800,
          phase: 3,
          rewards: {
            xp: 600,
            gold: 400,
            guaranteedLoot: 'Pillow of Eternal Solace',
            titleUnlock: 'Slumber Sovereign',
          },
          participantsCount: 215,
        },
      ];
      writeDb(db);
    }
    return db.bossRaids;
  },

  strikeBossRaid(
    bossName: string,
    damage: number
  ): { boss: BossRaidData; defeated: boolean; rewards?: BossRaidData['rewards'] } {
    const db = readDb();
    const raids = this.getBossRaids();
    const boss = raids.find((b) => b.bossName === bossName) || raids[0];

    boss.currentHp = Math.max(0, boss.currentHp - damage);
    let defeated = false;
    let rewards;

    if (boss.currentHp === 0) {
      defeated = true;
      rewards = boss.rewards;
      db.userStats.gold += rewards.gold;
      db.userStats.currentXP += rewards.xp;
      // Reset boss to next phase with higher HP
      boss.phase += 1;
      boss.maxHp = Math.round(boss.maxHp * 1.3);
      boss.currentHp = boss.maxHp;
    }

    writeDb(db);
    return { boss, defeated, rewards };
  },

  // --- IRL Skill Tree (Talent Matrix) ---
  getTalents(): { points: number; talents: TalentNode[] } {
    const db = readDb();
    const points = db.talentPoints !== undefined ? db.talentPoints : Math.max(0, db.userStats.level - 1);
    const unlocked = db.unlockedTalents || {};

    const talentNodes: TalentNode[] = [
      {
        id: 't-iron-constitution',
        name: 'Iron Constitution',
        tree: 'BODY',
        description: 'Hardens physical endurance; boosts maximum health by +50.',
        icon: '🛡️',
        currentRank: unlocked['t-iron-constitution'] || 0,
        maxRank: 3,
        requiredLevel: 2,
        statBonus: { hpBonus: 50 },
      },
      {
        id: 't-kinetic-surge',
        name: 'Kinetic Surge',
        tree: 'BODY',
        description: 'Physical workouts trigger a rush of adrenaline; +10% STR gain.',
        icon: '⚡',
        currentRank: unlocked['t-kinetic-surge'] || 0,
        maxRank: 3,
        requiredLevel: 4,
        statBonus: { xpPct: 10 },
      },
      {
        id: 't-deep-flow',
        name: 'Deep Flow State',
        tree: 'MIND',
        description: 'Each completed 25-minute Pomodoro focus block grants +25% bonus XP.',
        icon: '🧠',
        currentRank: unlocked['t-deep-flow'] || 0,
        maxRank: 3,
        requiredLevel: 2,
        statBonus: { pomodoroXpBonus: 25 },
      },
      {
        id: 't-hyper-retention',
        name: 'Hyper Retention',
        tree: 'MIND',
        description: 'Reading courses and coding tasks grant +15% more gold.',
        icon: '📚',
        currentRank: unlocked['t-hyper-retention'] || 0,
        maxRank: 3,
        requiredLevel: 3,
        statBonus: { goldPct: 15 },
      },
      {
        id: 't-unbreakable-will',
        name: 'Unbreakable Will',
        tree: 'SOUL',
        description: 'Steels focus against distraction; raises Critical Hit chance by +8%.',
        icon: '🔥',
        currentRank: unlocked['t-unbreakable-will'] || 0,
        maxRank: 3,
        requiredLevel: 2,
        statBonus: { critPct: 8 },
      },
      {
        id: 't-fortunes-favor',
        name: "Fortune's Favor",
        tree: 'SOUL',
        description: 'Increases Rare and Legendary item drop rates from all activities.',
        icon: '🍀',
        currentRank: unlocked['t-fortunes-favor'] || 0,
        maxRank: 3,
        requiredLevel: 5,
        statBonus: { goldPct: 20 },
      },
    ];

    return { points, talents: talentNodes };
  },

  upgradeTalent(talentId: string): { success: boolean; talent?: TalentNode; remainingPoints: number } {
    const db = readDb();
    let points = db.talentPoints !== undefined ? db.talentPoints : Math.max(0, db.userStats.level - 1);
    if (!db.unlockedTalents) db.unlockedTalents = {};

    if (points <= 0) {
      throw new Error('No Talent Points available! Level up your character to earn points.');
    }

    const { talents } = this.getTalents();
    const node = talents.find((t) => t.id === talentId);
    if (!node) throw new Error('Talent node not found');

    if (node.currentRank >= node.maxRank) {
      throw new Error('Talent already at maximum rank!');
    }

    if (db.userStats.level < node.requiredLevel) {
      throw new Error(`Requires Character Level ${node.requiredLevel}!`);
    }

    points -= 1;
    db.talentPoints = points;
    db.unlockedTalents[talentId] = (db.unlockedTalents[talentId] || 0) + 1;
    node.currentRank = db.unlockedTalents[talentId];

    writeDb(db);
    return { success: true, talent: node, remainingPoints: points };
  },

  // --- Asynchronous Arena Duels (PvP Simulation) ---
  getArenaOpponents(): ArenaOpponent[] {
    return [
      {
        id: 'opp-1',
        name: 'Shadow Viper',
        title: 'Cyber Assassin',
        level: 8,
        combatPower: 420,
        class: 'CYBER_HERO',
        tier: 'GOLD',
        avatar: '🤖',
        str: 18,
        vit: 14,
        agi: 24,
        int: 16,
        winRewardGold: 120,
        winRewardXP: 180,
      },
      {
        id: 'opp-2',
        name: 'Valkyrie Freya',
        title: 'Iron Shieldmaiden',
        level: 12,
        combatPower: 680,
        class: 'PALADIN',
        tier: 'PLATINUM',
        avatar: '🛡️',
        str: 26,
        vit: 32,
        agi: 14,
        int: 20,
        winRewardGold: 220,
        winRewardXP: 320,
      },
      {
        id: 'opp-3',
        name: 'Archon Ignis',
        title: 'Flame Overlord',
        level: 16,
        combatPower: 990,
        class: 'MAGE',
        tier: 'DIAMOND',
        avatar: '🧙‍♂️',
        str: 12,
        vit: 20,
        agi: 22,
        int: 48,
        winRewardGold: 380,
        winRewardXP: 550,
      },
    ];
  },

  simulateArenaBattle(
    opponentId: string
  ): { victory: boolean; logs: ArenaBattleLog[]; xpGained: number; goldGained: number } {
    const db = readDb();
    const opp = this.getArenaOpponents().find((o) => o.id === opponentId);
    if (!opp) throw new Error('Opponent not found in Arena');

    const profile = this.getProfile();
    const playerStats = profile.effectiveStats;
    let playerHp = db.userStats.maxHealth;
    let oppHp = opp.vit * 20;

    const logs: ArenaBattleLog[] = [];
    let turn = 1;
    let victory = false;

    while (playerHp > 0 && oppHp > 0 && turn <= 10) {
      // Player turn
      const playerCrit = Math.random() < (playerStats.wil * 0.02 + 0.1);
      const playerDamage = Math.round((playerStats.str * 3 + playerStats.agi * 2) * (playerCrit ? 1.8 : 1.0));
      oppHp -= playerDamage;
      logs.push({
        turn,
        attacker: db.character.name,
        defender: opp.name,
        damage: playerDamage,
        isCrit: playerCrit,
        message: `${db.character.name} strikes with full fury for ${playerDamage} DMG!${playerCrit ? ' 💥 CRITICAL HIT!' : ''}`,
      });

      if (oppHp <= 0) {
        victory = true;
        break;
      }

      // Opponent turn
      const oppCrit = Math.random() < 0.15;
      const oppDamage = Math.round((opp.str * 2.5 + opp.agi * 1.5) * (oppCrit ? 1.6 : 1.0));
      playerHp -= oppDamage;
      logs.push({
        turn,
        attacker: opp.name,
        defender: db.character.name,
        damage: oppDamage,
        isCrit: oppCrit,
        message: `${opp.name} counters aggressively dealing ${oppDamage} DMG!`,
      });

      turn++;
    }

    if (oppHp <= 0) victory = true;

    const xpGained = victory ? opp.winRewardXP : Math.round(opp.winRewardXP * 0.25);
    const goldGained = victory ? opp.winRewardGold : Math.round(opp.winRewardGold * 0.2);

    db.userStats.currentXP += xpGained;
    db.userStats.gold += goldGained;

    while (db.userStats.currentXP >= db.userStats.nextLevelXP) {
      db.userStats.currentXP -= db.userStats.nextLevelXP;
      db.userStats.level += 1;
      db.userStats.nextLevelXP = getRequiredXPForLevel(db.userStats.level);
    }

    writeDb(db);
    return { victory, logs, xpGained, goldGained };
  },

  // --- One-Tap IRL Quick Actions (Immediate Dopamine Feedback) ---
  claimQuickHabit(
    habitType: 'HYDRATE' | 'STRETCH' | 'READ' | 'FOCUS'
  ): { xp: number; gold: number; statGained: string; message: string } {
    const db = readDb();
    let xp = 40;
    let gold = 25;
    let statGained = 'vit';
    let message = 'Hydration boost applied! +1 VIT';

    if (habitType === 'HYDRATE') {
      db.userStats.vit += 1;
      statGained = 'Vitality';
      message = 'Gulp of Fresh Water logged! +1 VIT';
    } else if (habitType === 'STRETCH') {
      xp = 50;
      gold = 30;
      db.userStats.agi += 1;
      statGained = 'Agility';
      message = 'High-Speed Posture Stretch completed! +1 AGI';
    } else if (habitType === 'READ') {
      xp = 65;
      gold = 40;
      db.userStats.int += 1;
      statGained = 'Intelligence';
      message = '10-Minute Knowledge Deep Dive recorded! +1 INT';
    } else if (habitType === 'FOCUS') {
      xp = 120;
      gold = 75;
      db.userStats.wil += 2;
      statGained = 'Willpower';
      message = '25-Minute Focus Hyperdrive sprint finished! +2 WIL';
    }

    db.userStats.currentXP += xp;
    db.userStats.gold += gold;
    db.userStats.totalTasksCompleted += 1;

    while (db.userStats.currentXP >= db.userStats.nextLevelXP) {
      db.userStats.currentXP -= db.userStats.nextLevelXP;
      db.userStats.level += 1;
      db.userStats.nextLevelXP = getRequiredXPForLevel(db.userStats.level);
    }

    writeDb(db);
    return { xp, gold, statGained, message };
  },
};
