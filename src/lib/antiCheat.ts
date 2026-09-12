import crypto from 'crypto';

/**
 * ANTI-CHEAT & SECURITY CONFIGURATION
 */
export const ANTI_CHEAT_CONFIG = {
  // Rate limiting
  MAX_TASKS_PER_HOUR: 10,
  MAX_TASKS_PER_MINUTE: 3,
  MIN_COOLDOWN_SECONDS: 5, // minimum gap between task submissions

  // Daily caps
  MAX_DAILY_XP: 5000,
  MAX_DAILY_GOLD: 3000,

  // Cryptographic signing secret
  HMAC_SECRET: process.env.ANTI_CHEAT_SECRET || 'liferpg-anticheat-core-secret-2026-auth',

  // Session JWT secret
  JWT_SECRET: process.env.JWT_SECRET || 'liferpg-jwt-session-secret-key-32chars',
  TOKEN_EXPIRY_SECONDS: 7 * 24 * 60 * 60, // 7 days
};

export interface AuditLogEntry {
  id: string;
  userId: string;
  taskId: string;
  action: 'TASK_COMPLETION' | 'SHOP_PURCHASE' | 'STAT_UPDATE' | 'LEVEL_UP';
  deltaXP: number;
  deltaGold: number;
  finalLevel: number;
  finalXP: number;
  finalGold: number;
  timestamp: string;
  previousHash: string;
  hash: string;
  isFlaggedAnomaly: boolean;
  anomalyReason?: string;
}

export interface UserSessionPayload {
  userId: string;
  username: string;
  role: 'USER' | 'ADMIN';
  issuedAt: number;
  expiresAt: number;
}

// In-memory sliding window tracking: userId -> timestamp[]
const userCompletionTimestamps = new Map<string, number[]>();

// In-memory daily tracker: userId -> { date: string, xpEarned: number, goldEarned: number }
const userDailyTotals = new Map<string, { date: string; xpEarned: number; goldEarned: number }>();

/**
 * Sliding Window Rate Limiter
 * Validates that the user is not completing tasks faster than humanly possible or spamming scripts.
 */
export function checkRateLimit(userId: string = 'default-player'): {
  allowed: boolean;
  retryAfterSeconds?: number;
  reason?: string;
} {
  const now = Date.now();
  const timestamps = userCompletionTimestamps.get(userId) || [];

  // Filter timestamps within last 1 hour
  const oneHourAgo = now - 60 * 60 * 1000;
  const oneMinuteAgo = now - 60 * 1000;
  const validTimestamps = timestamps.filter((t) => t > oneHourAgo);

  // 1. Check minimum interval between consecutive actions
  if (validTimestamps.length > 0) {
    const lastTimestamp = validTimestamps[validTimestamps.length - 1];
    const diffSeconds = (now - lastTimestamp) / 1000;
    if (diffSeconds < ANTI_CHEAT_CONFIG.MIN_COOLDOWN_SECONDS) {
      const waitTime = Math.ceil(ANTI_CHEAT_CONFIG.MIN_COOLDOWN_SECONDS - diffSeconds);
      return {
        allowed: false,
        retryAfterSeconds: waitTime,
        reason: `Action too rapid. Please wait ${waitTime}s cooldown before submitting again.`,
      };
    }
  }

  // 2. Check per-minute burst limit
  const recentMinuteCount = validTimestamps.filter((t) => t > oneMinuteAgo).length;
  if (recentMinuteCount >= ANTI_CHEAT_CONFIG.MAX_TASKS_PER_MINUTE) {
    return {
      allowed: false,
      retryAfterSeconds: 60,
      reason: `Rate limit reached: Max ${ANTI_CHEAT_CONFIG.MAX_TASKS_PER_MINUTE} tasks per minute allowed.`,
    };
  }

  // 3. Check per-hour limit
  if (validTimestamps.length >= ANTI_CHEAT_CONFIG.MAX_TASKS_PER_HOUR) {
    const oldestInWindow = validTimestamps[0];
    const resetInSeconds = Math.ceil((oldestInWindow + 60 * 60 * 1000 - now) / 1000);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, resetInSeconds),
      reason: `Hourly cap reached: Max ${ANTI_CHEAT_CONFIG.MAX_TASKS_PER_HOUR} tasks per hour allowed. Resets in ${Math.ceil(resetInSeconds / 60)}m.`,
    };
  }

  return { allowed: true };
}

/**
 * Record a valid completion timestamp for rate-limiting
 */
export function recordCompletionTimestamp(userId: string = 'default-player'): void {
  const now = Date.now();
  const timestamps = userCompletionTimestamps.get(userId) || [];
  timestamps.push(now);
  userCompletionTimestamps.set(userId, timestamps);
}

/**
 * Reset rate limit memory (useful for tests)
 */
export function resetRateLimitMemory(): void {
  userCompletionTimestamps.clear();
  userDailyTotals.clear();
}

/**
 * Daily Cap Enforcement
 * Enforces server-authoritative maximum daily limits on XP and Gold.
 */
export function validateDailyCaps(
  userId: string = 'default-player',
  attemptedXP: number,
  attemptedGold: number
): {
  allowed: boolean;
  clampedXP: number;
  clampedGold: number;
  isCapped: boolean;
  reason?: string;
} {
  const todayDate = new Date().toISOString().split('T')[0];
  const userDaily = userDailyTotals.get(userId) || { date: todayDate, xpEarned: 0, goldEarned: 0 };

  // Reset counters if day rolled over
  if (userDaily.date !== todayDate) {
    userDaily.date = todayDate;
    userDaily.xpEarned = 0;
    userDaily.goldEarned = 0;
  }

  const remainingXP = Math.max(0, ANTI_CHEAT_CONFIG.MAX_DAILY_XP - userDaily.xpEarned);
  const remainingGold = Math.max(0, ANTI_CHEAT_CONFIG.MAX_DAILY_GOLD - userDaily.goldEarned);

  if (remainingXP <= 0 && remainingGold <= 0) {
    return {
      allowed: false,
      clampedXP: 0,
      clampedGold: 0,
      isCapped: true,
      reason: `Daily rewards cap reached (${ANTI_CHEAT_CONFIG.MAX_DAILY_XP} XP / ${ANTI_CHEAT_CONFIG.MAX_DAILY_GOLD} GP). Resets at 00:00 UTC.`,
    };
  }

  const clampedXP = Math.min(attemptedXP, remainingXP);
  const clampedGold = Math.min(attemptedGold, remainingGold);
  const isCapped = clampedXP < attemptedXP || clampedGold < attemptedGold;

  return {
    allowed: true,
    clampedXP,
    clampedGold,
    isCapped,
    reason: isCapped
      ? `Daily cap partially clamped rewards to ${clampedXP} XP and ${clampedGold} GP.`
      : undefined,
  };
}

/**
 * Increment recorded daily earnings after confirmed completion
 */
export function recordDailyEarnings(
  userId: string = 'default-player',
  xp: number,
  gold: number
): void {
  const todayDate = new Date().toISOString().split('T')[0];
  const userDaily = userDailyTotals.get(userId) || { date: todayDate, xpEarned: 0, goldEarned: 0 };

  if (userDaily.date !== todayDate) {
    userDaily.date = todayDate;
    userDaily.xpEarned = 0;
    userDaily.goldEarned = 0;
  }

  userDaily.xpEarned += xp;
  userDaily.goldEarned += gold;
  userDailyTotals.set(userId, userDaily);
}

/**
 * Cryptographic Audit Hash Generator
 * Creates an immutable SHA-256 HMAC hash for every progression event.
 */
export function generateAuditHash(
  previousHash: string,
  userId: string,
  taskId: string,
  deltaXP: number,
  deltaGold: number,
  timestamp: string
): string {
  const payload = `${previousHash}|${userId}|${taskId}|${deltaXP}|${deltaGold}|${timestamp}`;
  return crypto
    .createHmac('sha256', ANTI_CHEAT_CONFIG.HMAC_SECRET)
    .update(payload)
    .digest('hex');
}

/**
 * Verifies the integrity of the audit log chain
 */
export function verifyAuditChain(logs: AuditLogEntry[]): {
  isValid: boolean;
  brokenIndex?: number;
  reason?: string;
} {
  let expectedPrevHash = 'GENESIS_HASH_LIFERPG_0000';

  for (let i = 0; i < logs.length; i++) {
    const entry = logs[i];
    if (entry.previousHash !== expectedPrevHash) {
      return {
        isValid: false,
        brokenIndex: i,
        reason: `Hash chain broken at index ${i}: expected prevHash ${expectedPrevHash}, found ${entry.previousHash}`,
      };
    }

    const calculatedHash = generateAuditHash(
      entry.previousHash,
      entry.userId,
      entry.taskId,
      entry.deltaXP,
      entry.deltaGold,
      entry.timestamp
    );

    if (calculatedHash !== entry.hash) {
      return {
        isValid: false,
        brokenIndex: i,
        reason: `Tampered log detected at index ${i}: hash signature mismatch.`,
      };
    }

    expectedPrevHash = entry.hash;
  }

  return { isValid: true };
}

/**
 * Lightweight Built-in JWT Authentication Generator & Verifier
 * (Uses native Node crypto, zero external package dependencies)
 */
export function signSessionToken(userId: string, username: string = 'Hero', role: 'USER' | 'ADMIN' = 'USER'): string {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: UserSessionPayload = {
    userId,
    username,
    role,
    issuedAt: now,
    expiresAt: now + ANTI_CHEAT_CONFIG.TOKEN_EXPIRY_SECONDS,
  };

  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', ANTI_CHEAT_CONFIG.JWT_SECRET)
    .update(`${b64Header}.${b64Payload}`)
    .digest('base64url');

  return `${b64Header}.${b64Payload}.${signature}`;
}

export function verifySessionToken(token?: string | null): {
  valid: boolean;
  payload?: UserSessionPayload;
  error?: string;
} {
  if (!token) {
    return { valid: false, error: 'No token provided' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Malformed token structure' };
  }

  const [b64Header, b64Payload, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', ANTI_CHEAT_CONFIG.JWT_SECRET)
    .update(`${b64Header}.${b64Payload}`)
    .digest('base64url');

  if (signature !== expectedSig) {
    return { valid: false, error: 'Invalid cryptographic signature' };
  }

  try {
    const payload: UserSessionPayload = JSON.parse(
      Buffer.from(b64Payload, 'base64url').toString('utf-8')
    );

    const now = Math.floor(Date.now() / 1000);
    if (payload.expiresAt < now) {
      return { valid: false, error: 'Session token has expired' };
    }

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: 'Failed to parse token payload' };
  }
}
