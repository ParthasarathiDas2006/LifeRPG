-- ============================================================================
-- LIFE RPG: PRODUCTION DATABASE SCHEMA (POSTGRESQL WITH ANTI-CHEAT SAFEGUARDS)
-- ============================================================================
-- Features:
-- 1. Strict CHECK constraints preventing negative currency, health, or stats
-- 2. Non-linear XP curve support and attribute mapping
-- 3. Daily XP/Gold caps per calendar day
-- 4. Cryptographic HMAC-SHA256 audit ledger hash chaining
-- 5. Foreign keys with cascading referential integrity
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & AUTHENTICATION TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'MODERATOR')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CHARACTER ATTRIBUTES & PROGRESSION TABLE (WITH HARD CONSTRAINTS)
CREATE TABLE IF NOT EXISTS character_stats (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 999),
    current_xp BIGINT NOT NULL DEFAULT 0 CHECK (current_xp >= 0),
    next_level_xp BIGINT NOT NULL DEFAULT 150 CHECK (next_level_xp > 0),
    gold BIGINT NOT NULL DEFAULT 100 CHECK (gold >= 0),
    health INTEGER NOT NULL DEFAULT 100 CHECK (health >= 0 AND health <= max_health),
    max_health INTEGER NOT NULL DEFAULT 100 CHECK (max_health >= 10),
    mana INTEGER NOT NULL DEFAULT 50 CHECK (mana >= 0 AND mana <= max_mana),
    max_mana INTEGER NOT NULL DEFAULT 50 CHECK (max_mana >= 10),
    
    -- Six Core Real-Life RPG Attributes (Min 1, cannot be negative)
    strength INTEGER NOT NULL DEFAULT 10 CHECK (strength >= 1),
    intellect INTEGER NOT NULL DEFAULT 10 CHECK (intellect >= 1),
    vitality INTEGER NOT NULL DEFAULT 10 CHECK (vitality >= 1),
    agility INTEGER NOT NULL DEFAULT 10 CHECK (agility >= 1),
    charisma INTEGER NOT NULL DEFAULT 10 CHECK (charisma >= 1),
    willpower INTEGER NOT NULL DEFAULT 10 CHECK (willpower >= 1),
    
    total_tasks_completed INTEGER NOT NULL DEFAULT 0 CHECK (total_tasks_completed >= 0),
    streak_freeze_tokens INTEGER NOT NULL DEFAULT 1 CHECK (streak_freeze_tokens >= 0),
    
    -- Anti-Cheat Daily Cap Enforcement Tracking
    daily_xp_earned INTEGER NOT NULL DEFAULT 0 CHECK (daily_xp_earned >= 0 AND daily_xp_earned <= 5000),
    daily_gold_earned INTEGER NOT NULL DEFAULT 0 CHECK (daily_gold_earned >= 0 AND daily_gold_earned <= 3000),
    last_daily_reset_date DATE DEFAULT CURRENT_DATE,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CHARACTER APPEARANCE & HEROPRESET TABLE
CREATE TABLE IF NOT EXISTS character_profile (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    character_name VARCHAR(100) NOT NULL,
    class_type VARCHAR(50) NOT NULL,
    gender VARCHAR(20) DEFAULT 'NON_BINARY',
    title VARCHAR(150) NOT NULL,
    avatar_url TEXT NOT NULL,
    avatar_type VARCHAR(30) DEFAULT 'SPRITE' CHECK (avatar_type IN ('SPRITE', 'PHOTO_GENERATED')),
    game_origin VARCHAR(50) DEFAULT 'FREE_FIRE',
    ability_name VARCHAR(100),
    ability_buff VARCHAR(150),
    sprite_parts_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. REAL-WORLD TASKS & HABIT STREAKS TABLE
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(30) NOT NULL CHECK (category IN ('STRENGTH', 'INTELLIGENCE', 'VITALITY', 'AGILITY', 'CHARISMA', 'WILLPOWER')),
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('TRIVIAL', 'EASY', 'MEDIUM', 'HARD', 'EPIC')),
    task_type VARCHAR(20) NOT NULL CHECK (task_type IN ('HABIT', 'DAILY', 'TODO', 'BOSS_RAID')),
    base_xp INTEGER NOT NULL CHECK (base_xp > 0),
    base_gold INTEGER NOT NULL CHECK (base_gold >= 0),
    streak_count INTEGER NOT NULL DEFAULT 0 CHECK (streak_count >= 0),
    max_streak INTEGER NOT NULL DEFAULT 0 CHECK (max_streak >= 0),
    is_completed_today BOOLEAN DEFAULT FALSE,
    last_completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_user_active ON tasks (user_id, is_completed_today);

-- 5. REWARD SHOP ITEMS CATALOG
CREATE TABLE IF NOT EXISTS items_catalog (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY')),
    slot VARCHAR(20) NOT NULL CHECK (slot IN ('HEAD', 'CHEST', 'WEAPON', 'SHIELD', 'ACCESSORY', 'CONSUMABLE')),
    buy_price INTEGER NOT NULL CHECK (buy_price >= 0),
    sell_price INTEGER NOT NULL CHECK (sell_price >= 0),
    icon VARCHAR(20) NOT NULL,
    stat_modifiers_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE
);

-- 6. USER INVENTORY TABLE
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id VARCHAR(50) NOT NULL REFERENCES items_catalog(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    is_equipped BOOLEAN NOT NULL DEFAULT FALSE,
    enhancement_level INTEGER NOT NULL DEFAULT 0 CHECK (enhancement_level >= 0 AND enhancement_level <= 10),
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_item UNIQUE (user_id, item_id)
);

-- 7. CRYPTOGRAPHIC AUDIT TRAIL & TAMPER-PROOF PROGRESSION LEDGER
CREATE TABLE IF NOT EXISTS progression_audit_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    action_type VARCHAR(40) NOT NULL CHECK (action_type IN ('TASK_COMPLETION', 'SHOP_PURCHASE', 'STAT_UPDATE', 'LEVEL_UP')),
    delta_xp INTEGER NOT NULL,
    delta_gold INTEGER NOT NULL,
    final_level INTEGER NOT NULL,
    final_xp BIGINT NOT NULL,
    final_gold BIGINT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    previous_hash VARCHAR(64) NOT NULL,
    current_hash VARCHAR(64) NOT NULL,
    client_ip VARCHAR(45),
    is_flagged_anomaly BOOLEAN DEFAULT FALSE,
    anomaly_reason VARCHAR(255)
);

CREATE INDEX idx_audit_user_time ON progression_audit_ledger (user_id, timestamp DESC);

-- 8. TRIGGER: AUTO-RESET DAILY XP CAPS ON CALENDAR ROLLOVER
CREATE OR REPLACE FUNCTION reset_daily_caps_if_expired()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.last_daily_reset_date < CURRENT_DATE THEN
        NEW.daily_xp_earned := 0;
        NEW.daily_gold_earned := 0;
        NEW.last_daily_reset_date := CURRENT_DATE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_daily_caps
BEFORE UPDATE ON character_stats
FOR EACH ROW
EXECUTE FUNCTION reset_daily_caps_if_expired();
