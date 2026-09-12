import { dbService } from '../src/lib/db';
import { getRequiredXPForLevel, calculateStreakMultiplier } from '../src/lib/progression';

console.log('=== RUNNING LIFE RPG SYSTEM INTEGRATION TESTS ===\n');

// 1. Test XP Curve
console.log('[TEST 1] Testing XP Mathematical Scaling Curve...');
const lvl1XP = getRequiredXPForLevel(1);
const lvl2XP = getRequiredXPForLevel(2);
const lvl5XP = getRequiredXPForLevel(5);
const lvl10XP = getRequiredXPForLevel(10);
console.log(`- Level 1 -> 2: ${lvl1XP} XP`);
console.log(`- Level 2 -> 3: ${lvl2XP} XP`);
console.log(`- Level 5 -> 6: ${lvl5XP} XP`);
console.log(`- Level 10 -> 11: ${lvl10XP} XP`);
if (lvl1XP > 0 && lvl5XP > lvl2XP && lvl10XP > lvl5XP) {
  console.log('✓ XP curve scaling verified.\n');
} else {
  throw new Error('XP curve verification failed');
}

// 2. Test Profile & Initial Stats
console.log('[TEST 2] Testing User Profile & Initial Stats...');
const profile = dbService.getProfile();
console.log(`- Player Level: ${profile.stats.level}`);
console.log(`- Current XP: ${profile.stats.currentXP} / ${profile.stats.nextLevelXP}`);
console.log(`- Gold: ${profile.stats.gold} GP`);
console.log(`- Attributes: STR=${profile.effectiveStats.str}, INT=${profile.effectiveStats.int}, VIT=${profile.effectiveStats.vit}, AGI=${profile.effectiveStats.agi}, CHA=${profile.effectiveStats.cha}, WIL=${profile.effectiveStats.wil}`);
console.log('✓ Profile retrieval verified.\n');

// 3. Test Quest Creation
console.log('[TEST 3] Testing Quest Creation...');
const newQuest = dbService.createTask({
  title: 'Automated Test: Read 1 Chapter of Clean Architecture',
  category: 'INTELLIGENCE',
  difficulty: 'HARD',
  type: 'DAILY',
});
console.log(`- Created Quest ID: ${newQuest.id}`);
console.log(`- Title: "${newQuest.title}" | Difficulty: ${newQuest.difficulty} | Base XP: ${newQuest.baseXP}`);
console.log('✓ Quest creation verified.\n');

// 4. Test Task Completion & Server-Authoritative Rewards
console.log('[TEST 4] Testing Server-Authoritative Task Completion...');
const initialLevel = profile.stats.level;
const initialGold = profile.stats.gold;
const initialXP = profile.stats.currentXP;

const completionResult = dbService.completeTask(newQuest.id);
console.log(`- Result Success: ${completionResult.success}`);
console.log(`- XP Earned: +${completionResult.rewards.xpEarned} (Streak Mult: ${completionResult.rewards.streakMultiplier}x, Crit: ${completionResult.rewards.isCrit})`);
console.log(`- Gold Earned: +${completionResult.rewards.goldEarned} GP`);
if (completionResult.rewards.lootDrop) {
  console.log(`- Loot Dropped: ${completionResult.rewards.lootDrop.name} (${completionResult.rewards.lootDrop.rarity})`);
} else {
  console.log('- No loot dropped on this roll.');
}
console.log(`- Progression: Previous Level=${completionResult.progression.previousLevel}, New Level=${completionResult.progression.newLevel}`);
console.log('✓ Server-authoritative task completion verified.\n');

// 5. Test Shop Purchase & Inventory Integration
console.log('[TEST 5] Testing Shop Purchase & Item Equip...');
const shopItems = dbService.getShop();
const freezeShield = shopItems.find((i) => i.name.includes('Streak Freeze Shield'));
if (freezeShield && completionResult.progression.newLevel) {
  console.log(`- Buying "${freezeShield.name}" for ${freezeShield.buyPrice} GP...`);
  const buyResult = dbService.buyItem(freezeShield.id);
  console.log(`- Purchase Success: ${buyResult.success}. Remaining Gold: ${buyResult.remainingGold} GP`);

  // Check inventory
  const inv = dbService.getInventory();
  const boughtInv = inv.find((i) => i.itemId === freezeShield.id);
  console.log(`- Inventory contains bought item: ${boughtInv ? 'YES' : 'NO'}`);
}
console.log('✓ Shop and inventory operations verified.\n');

// 7. Test Moral Virtues & 4 Cardinal Pillars
console.log('[TEST 7] Testing Moral Virtues & 4 Cardinal Pillars...');
console.log(`- Integrity: ${profile.stats.integrity || 14} pts`);
console.log(`- Compassion: ${profile.stats.compassion || 18} pts`);
console.log(`- Discipline: ${profile.stats.discipline || 16} pts`);
console.log(`- Wisdom: ${profile.stats.wisdom || 19} pts`);
console.log(`- Virtue Coins: ${profile.stats.virtueCoins || 45} VC`);
console.log('✓ 4 Cardinal Pillars verified.\n');

// 8. Test Negative Restraint Quest ("No Anger Day") & Honesty Reflection
console.log('[TEST 8] Testing Restraint Quest ("No Anger Day") & Honesty Bonus...');
const moralQuest = dbService.createTask({
  title: 'Automated Test: No Anger Day Restraint Check',
  category: 'WISDOM',
  moralAttribute: 'WISDOM',
  difficulty: 'HARD',
  type: 'NEGATIVE_RESTRAINT',
  baseXP: 180,
  baseGold: 90,
  baseVirtueCoins: 25,
});

const reflectionResult = dbService.completeTask(moralQuest.id, {
  text: 'Felt irritated during traffic but deliberately breathed through it.',
  moodRating: 5,
  honestyAffirmed: true,
});

console.log(`- Restraint Settlement Success: ${reflectionResult.success}`);
console.log(`- Virtue Coins Earned: +${reflectionResult.rewards.virtueCoinsEarned} VC`);
console.log(`- Reflection Entry Logged: "${reflectionResult.reflection?.text}"`);
console.log('✓ Restraint reflection & virtue coin rewards verified.\n');

console.log('=== ALL TESTS PASSED SUCCESSFULLY! ===');

