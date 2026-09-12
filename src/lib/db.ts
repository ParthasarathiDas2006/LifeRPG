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
} from './types';
import { generateProceduralSprite } from './photoGenerator';
import {
  getRequiredXPForLevel,
  DIFFICULTY_CONFIG,
  calculateStreakMultiplier,
  evaluateCriticalSuccess,
  rollLootDrop,
  getAttributeGained,
} from './progression';

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
  return {
    name: 'Player One',
    class: 'WARRIOR',
    title: 'Novice Adventurer',
    avatarUrl: generateProceduralSprite(
      {
        body: 'fair',
        hair: 'spiky',
        hairColor: '#f59e0b',
        outfit: 'plate',
        outfitColor: '#3b82f6',
        weapon: 'sword',
        aura: 'fire',
      },
      'WARRIOR'
    ),
    avatarType: 'SPRITE',
    spriteParts: {
      body: 'fair',
      hair: 'spiky',
      hairColor: '#f59e0b',
      outfit: 'plate',
      outfitColor: '#3b82f6',
      weapon: 'sword',
      aura: 'fire',
    },
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
  const tempFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
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
  ];

  const userStats: UserStats = {
    level: 3,
    currentXP: 240,
    nextLevelXP: getRequiredXPForLevel(3),
    gold: 145,
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
    totalTasksCompleted: 18,
    streakFreezeTokens: 1,
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
      category: data.category || 'INTELLIGENCE',
      difficulty,
      type: data.type || 'DAILY',
      baseXP: config.xp,
      baseGold: config.gold,
      streakCount: 0,
      maxStreak: 0,
      isCompletedToday: false,
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

  completeTask(taskId: string): TaskCompletionResult {
    const db = readDb();
    const taskIndex = db.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const task = db.tasks[taskIndex];
    if (task.isCompletedToday) {
      throw new Error('Task already completed today');
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

    // 2. Compute final rewards
    const finalXP = Math.round(task.baseXP * streakMult * critInfo.critMultiplier * gearXpMult);
    const finalGold = Math.round(task.baseGold * streakMult * critInfo.critMultiplier * gearGoldMult);

    // 3. Roll for loot drop
    db.pityCounter += 1;
    const lootResult = rollLootDrop(task.difficulty, db.itemsCatalog, db.pityCounter);
    if (lootResult.item) {
      db.pityCounter = 0; // reset pity timer
      // Add to inventory
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

    // 4. Update Task State
    task.isCompletedToday = true;
    task.streakCount += 1;
    if (task.streakCount > task.maxStreak) {
      task.maxStreak = task.streakCount;
    }
    task.lastCompletedAt = new Date().toISOString();

    // 5. Update User Stats & Primary Attribute
    const attr = getAttributeGained(task.category);
    db.userStats[attr] += 1; // +1 attribute point on task completion
    db.userStats.totalTasksCompleted += 1;
    db.userStats.gold += finalGold;
    db.userStats.currentXP += finalXP;

    // 6. Check for Level Up (handles multiple levels if huge XP earned)
    const previousLevel = db.userStats.level;
    let leveledUp = false;

    while (db.userStats.currentXP >= db.userStats.nextLevelXP) {
      db.userStats.currentXP -= db.userStats.nextLevelXP;
      db.userStats.level += 1;
      db.userStats.nextLevelXP = getRequiredXPForLevel(db.userStats.level);
      db.userStats.health = db.userStats.maxHealth; // Restore health on level up!
      db.userStats.mana = db.userStats.maxMana;
      leveledUp = true;
    }

    // 7. Check for Achievements
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

    // 8. Log Completion Audit
    db.completionsLog.push({
      id: `comp-${Date.now()}`,
      taskId: task.id,
      completedAt: new Date().toISOString(),
      xpEarned: finalXP,
      goldEarned: finalGold,
      validationHash: `hmac_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    });

    writeDb(db);

    return {
      success: true,
      task,
      rewards: {
        xpEarned: finalXP,
        goldEarned: finalGold,
        streakMultiplier: streakMult,
        critMultiplier: critInfo.critMultiplier,
        isCrit: critInfo.isCrit,
        lootDrop: lootResult.item,
      },
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
};
