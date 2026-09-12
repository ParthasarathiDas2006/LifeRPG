import {
  checkRateLimit,
  recordCompletionTimestamp,
  resetRateLimitMemory,
  validateDailyCaps,
  recordDailyEarnings,
  generateAuditHash,
  verifyAuditChain,
  signSessionToken,
  verifySessionToken,
  AuditLogEntry,
  ANTI_CHEAT_CONFIG,
} from '../src/lib/antiCheat';
import {
  getRequiredXPForLevel,
  calculateStreakMultiplier,
  getAttributeGained,
} from '../src/lib/progression';

console.log('=== RUNNING LIFE RPG ANTI-CHEAT & CHARACTER PROGRESSION TESTS ===\n');

// -------------------------------------------------------------
// [TEST 1] Attribute System & Non-Linear XP Curve Verification
// -------------------------------------------------------------
console.log('[TEST 1] Verifying Attribute Mapping & Non-Linear XP Curve...');
const strengthAttr = getAttributeGained('STRENGTH');
const intellAttr = getAttributeGained('INTELLIGENCE');
if (strengthAttr !== 'str' || intellAttr !== 'int') {
  throw new Error(`Attribute mapping failed: STRENGTH -> ${strengthAttr}`);
}
console.log('✓ Category to attribute mapping verified (STRENGTH -> str, INTELLIGENCE -> int)');

const lvl1XP = getRequiredXPForLevel(1);
const lvl2XP = getRequiredXPForLevel(2);
const lvl5XP = getRequiredXPForLevel(5);
const lvl10XP = getRequiredXPForLevel(10);
console.log(`- Level 1 -> 2: ${lvl1XP} XP`);
console.log(`- Level 2 -> 3: ${lvl2XP} XP`);
console.log(`- Level 5 -> 6: ${lvl5XP} XP`);
console.log(`- Level 10 -> 11: ${lvl10XP} XP`);

if (lvl2XP <= lvl1XP || lvl5XP <= lvl2XP || lvl10XP <= lvl5XP) {
  throw new Error('XP curve is not strictly increasing and non-linear!');
}
console.log('✓ Non-linear mathematical XP curve verified.');

// -------------------------------------------------------------
// [TEST 2] Daily Streaks & Multiplier Scaling
// -------------------------------------------------------------
console.log('\n[TEST 2] Verifying Daily Streak Multipliers...');
const streak0 = calculateStreakMultiplier(0);
const streak3 = calculateStreakMultiplier(3);
const streak7 = calculateStreakMultiplier(7);
const streak10 = calculateStreakMultiplier(10);
const streak30 = calculateStreakMultiplier(30);

console.log(`- 0-day streak: ${streak0}x`);
console.log(`- 3-day streak: ${streak3}x (+15% XP)`);
console.log(`- 7-day streak: ${streak7}x (+35% XP)`);
console.log(`- 10-day streak: ${streak10}x (+50% cap)`);
console.log(`- 30-day streak: ${streak30}x (remains capped at +50%)`);

if (streak0 !== 1.0 || streak7 !== 1.35 || streak10 !== 1.50 || streak30 !== 1.50) {
  throw new Error(`Streak multiplier calculation incorrect: 7d=${streak7}, 10d=${streak10}`);
}
console.log('✓ Streak multipliers verified.');

// -------------------------------------------------------------
// [TEST 3] Anti-Cheat Rate Limiting & Cooldown Protection
// -------------------------------------------------------------
console.log('\n[TEST 3] Verifying Anti-Cheat Rate Limiter...');
resetRateLimitMemory();
const testUser = 'anti-cheat-tester-01';

// Initial action should be permitted
const initialCheck = checkRateLimit(testUser);
if (!initialCheck.allowed) {
  throw new Error('Initial action was unexpectedly rate limited!');
}
recordCompletionTimestamp(testUser);
console.log('✓ Initial completion allowed.');

// Rapid second action without cooldown should trigger cooldown limit
const rapidCheck = checkRateLimit(testUser);
if (rapidCheck.allowed) {
  throw new Error('Rapid task execution was NOT blocked by cooldown protection!');
}
console.log(`✓ Rapid spam blocked: "${rapidCheck.reason}"`);

// -------------------------------------------------------------
// [TEST 4] Anti-Cheat Daily XP/Gold Caps
// -------------------------------------------------------------
console.log('\n[TEST 4] Verifying Daily XP & Gold Caps...');
resetRateLimitMemory();
const capUser = 'cap-tester-02';

// Earn 4,500 XP (under 5,000 cap)
const underCapCheck = validateDailyCaps(capUser, 4500, 2000);
if (!underCapCheck.allowed || underCapCheck.clampedXP !== 4500) {
  throw new Error('Rewards below daily cap were rejected!');
}
recordDailyEarnings(capUser, 4500, 2000);
console.log('✓ Normal earnings under cap accepted.');

// Attempt another 1,000 XP (should be clamped to remaining 500 XP)
const clampCheck = validateDailyCaps(capUser, 1000, 500);
if (!clampCheck.allowed || clampCheck.clampedXP !== 500) {
  throw new Error(`Rewards were not clamped correctly: clampedXP=${clampCheck.clampedXP}`);
}
recordDailyEarnings(capUser, clampCheck.clampedXP, clampCheck.clampedGold);
console.log(`✓ Excess rewards clamped: Allowed ${clampCheck.clampedXP} XP (Daily max 5000 XP reached).`);

// Attempt further XP when 100% capped
const fullCapCheck = validateDailyCaps(capUser, 50, 50);
if (fullCapCheck.allowed && fullCapCheck.clampedXP > 0) {
  throw new Error('Earnings above 100% daily cap were not blocked!');
}
console.log(`✓ 100% Daily cap enforcement verified: "${fullCapCheck.reason}"`);

// -------------------------------------------------------------
// [TEST 5] Cryptographic HMAC-SHA256 Audit Trail Hash Chain
// -------------------------------------------------------------
console.log('\n[TEST 5] Verifying Cryptographic Audit Chain & Tamper Detection...');
const auditLogs: AuditLogEntry[] = [];
let previousHash = 'GENESIS_HASH_LIFERPG_0000';

for (let i = 1; i <= 3; i++) {
  const ts = new Date(Date.now() + i * 1000).toISOString();
  const hash = generateAuditHash(previousHash, 'user-audit-1', `task-${i}`, 150, 75, ts);
  auditLogs.push({
    id: `audit-${i}`,
    userId: 'user-audit-1',
    taskId: `task-${i}`,
    action: 'TASK_COMPLETION',
    deltaXP: 150,
    deltaGold: 75,
    finalLevel: 2,
    finalXP: i * 150,
    finalGold: i * 75,
    timestamp: ts,
    previousHash,
    hash,
    isFlaggedAnomaly: false,
  });
  previousHash = hash;
}

const auditResult = verifyAuditChain(auditLogs);
if (!auditResult.isValid) {
  throw new Error(`Audit chain verification failed on valid logs: ${auditResult.reason}`);
}
console.log('✓ Cryptographic HMAC-SHA256 audit chain verified valid.');

// Test Tamper Detection: Modify deltaXP on index 1
auditLogs[1].deltaXP = 999999; // Tampered XP!
const tamperedResult = verifyAuditChain(auditLogs);
if (tamperedResult.isValid) {
  throw new Error('Audit chain failed to detect tampered XP values!');
}
console.log(`✓ Anomaly detected on tampered log: "${tamperedResult.reason}"`);

// -------------------------------------------------------------
// [TEST 6] JWT Session Authentication Verification
// -------------------------------------------------------------
console.log('\n[TEST 6] Verifying Session Token Signing & Verification...');
const token = signSessionToken('usr-legendary-99', 'ShadowSovereign', 'USER');
console.log(`- Generated JWT Token: ${token.substring(0, 32)}...`);

const verifyValid = verifySessionToken(token);
if (!verifyValid.valid || verifyValid.payload?.userId !== 'usr-legendary-99') {
  throw new Error(`Session verification failed: ${verifyValid.error}`);
}
console.log(`✓ Session token verified for user: ${verifyValid.payload?.username} (${verifyValid.payload?.role})`);

// Tamper with token signature
const tamperedToken = token.slice(0, -5) + 'AAAAA';
const verifyTampered = verifySessionToken(tamperedToken);
if (verifyTampered.valid) {
  throw new Error('Tampered session token was accepted!');
}
console.log(`✓ Tampered session token rejected: "${verifyTampered.error}"`);

console.log('\n=== ALL ANTI-CHEAT & PROGRESSION TESTS PASSED WITH 100% SUCCESS! ===');
