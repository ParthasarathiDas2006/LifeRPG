-- Supabase / PostgreSQL Migration: 20260912_init_moral_rpg.sql
-- Description: Schema for LifeRPG Moral Training Platform (4 Cardinal Virtues, Tasks, Reflections, Rewards)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Enums
DO $$ BEGIN
  CREATE TYPE attribute_type AS ENUM (
    'INTEGRITY', 'COMPASSION', 'DISCIPLINE', 'WISDOM',
    'STRENGTH', 'INTELLIGENCE', 'VITALITY', 'AGILITY', 'CHARISMA', 'WILLPOWER'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE task_type AS ENUM (
    'DAILY', 'HABIT', 'TODO', 'NEGATIVE_RESTRAINT', 'REFLECTION', 'BOSS_RAID', 'MILESTONE'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE task_difficulty AS ENUM ('TRIVIAL', 'EASY', 'MEDIUM', 'HARD', 'EPIC');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE reward_category AS ENUM ('THEME', 'BADGE', 'TITLE', 'AVATAR_AURA');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supabase_id UUID UNIQUE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  level INT DEFAULT 1,
  current_xp INT DEFAULT 0,
  total_xp INT DEFAULT 0,
  gold INT DEFAULT 100,
  virtue_coins INT DEFAULT 25,
  active_theme TEXT DEFAULT 'sanctuary_dawn',
  streak_freeze_tokens INT DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User Attributes (4 Cardinal Virtues + Base Stats)
CREATE TABLE IF NOT EXISTS user_attributes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  attribute attribute_type NOT NULL,
  level INT DEFAULT 1,
  current_xp INT DEFAULT 0,
  total_points INT DEFAULT 0,
  CONSTRAINT unique_user_attribute UNIQUE (user_id, attribute)
);

-- 4. Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  attribute attribute_type NOT NULL,
  difficulty task_difficulty DEFAULT 'MEDIUM',
  type task_type DEFAULT 'DAILY',
  base_xp INT DEFAULT 25,
  base_gold INT DEFAULT 10,
  base_virtue_coins INT DEFAULT 5,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  requires_reflection BOOLEAN DEFAULT FALSE,
  last_completed_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Task Logs & Reflections
CREATE TABLE IF NOT EXISTS task_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  xp_earned INT NOT NULL,
  gold_earned INT DEFAULT 0,
  virtue_coins_earned INT DEFAULT 0,
  streak_count INT NOT NULL,
  reflection_text TEXT,
  mood_rating INT,
  honesty_affirmed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Rewards & Sanctuary Themes
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cost_coins INT DEFAULT 50,
  category reward_category NOT NULL,
  asset_key TEXT NOT NULL,
  min_level INT DEFAULT 1
);

-- 7. User Unlocked Rewards
CREATE TABLE IF NOT EXISTS user_rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
  is_equipped BOOLEAN DEFAULT FALSE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_reward UNIQUE (user_id, reward_id)
);

-- 8. Badges Table
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  attribute attribute_type
);

-- 9. User Badges Table
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_badge UNIQUE (user_id, badge_id)
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_tasks_user_active ON tasks (user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_task_logs_user_date ON task_logs (user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_attributes_user ON user_attributes (user_id);

-- Seed Starter Rewards & Themes
INSERT INTO rewards (id, title, description, cost_coins, category, asset_key, min_level)
VALUES 
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Mind Garden Theme', 'A serene dark jade and slate aesthetic evoking deep peace.', 0, 'THEME', 'theme_mind_garden', 1),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Astral Monastery Theme', 'Celestial indigo and golden accents inspired by mountaintop temples.', 40, 'THEME', 'theme_astral_monastery', 3),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Solitary Ember Theme', 'Warm amber lanterns radiating disciplined fortitude.', 75, 'THEME', 'theme_solitary_ember', 5)
ON CONFLICT DO NOTHING;

-- Seed Badges
INSERT INTO badges (code, title, description, icon_url, attribute)
VALUES
  ('NO_ANGER_7_DAYS', 'Pillar of Equanimity', 'Maintained composure and anger-free peace for 7 consecutive days.', 'ShieldCheck', 'WISDOM'),
  ('COMPASSION_100', 'Guiding Lantern', 'Performed 10 random acts of kindness for friends or strangers.', 'Heart', 'COMPASSION'),
  ('TRUTH_SEEKER', 'Mirror of Truth', 'Demonstrated total honesty by admitting an error and rectifying it.', 'CheckCircle2', 'INTEGRITY'),
  ('IRON_WILL_30', 'Unbroken Vow', 'Maintained unbroken disciplined habits for 30 consecutive days.', 'Compass', 'DISCIPLINE')
ON CONFLICT (code) DO NOTHING;
