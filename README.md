# Life RPG ⚔️

> **Gamify Real-World Productivity, Habit Progression & Battle Royale Experience**

Life RPG is a full-stack gamified productivity platform inspired by AAA mobile titles like **Free Fire** and classic RPGs. It transforms everyday tasks and habits into RPG-style quests, boss raids, ranked arena duels, and lucky gacha unboxings while incorporating real-time dopamine-boosting Web Audio sound synthesis.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Automated Progression Tests
```bash
npx tsx scripts/test-progression.ts
```

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🏰 The 6 Distributed Game Zones

Rather than a single crowded dashboard, Life RPG divides player progression into **6 high-energy game zones**:

### 1. 🏰 Lobby Sanctuary (Command HQ)
- **3D Hero Stage Podium**: Character avatar framed by dynamic radiant class auras, displaying Level, Title, HP/MP orbs, and real-time **Combat Power (CP)**.
- **Daily Supply Airdrop Wheel**: Free Fire-style daily fortune wheel granting free Gold, XP, Streak Shields, or Mystery Crates.
- **Streak Inferno Multiplier**: Visual flame tier scaling from Bronze to Infernal Dragon Flame with up to $+50\%$ bonus rewards.
- **One-Tap IRL Habit Quick-Taps**: Instant one-click buttons for Water Hydration (+VIT), Posture Stretch (+AGI), and 10-Minute Reading (+INT).

### 2. ⚔️ Operations Hub (IRL Battle Pass & Focus Terminal)
- **Active Quests**: Dailies and habits filterable by attribute with streak multipliers and real-time floating combat text (`+160 XP`, `💥 CRIT!`).
- **Boss Raids (IRL Mega-Feats)**:
  - *The Iron Colossus* (STR/VIT): 5km run or 100 pushups.
  - *The Void Overlord* (INT/WIL): 3-hour zero-distraction deep work sprint.
  - *Hydra of Restlessness* (VIT): 8-hour sleep tracking.
  - Interactive boss integrity HP bars and victory bounties.
- **Focus Hyperdrive (IRL Pomodoro Combat Engine)**:
  - 25-minute deep focus sprint with sound alerts and instant XP/Willpower rewards.

### 3. 🛡️ Armory & Blacksmith Forge
- **Full Equipment Grid**: Manage Head, Chest, Weapon, Shield, Relic, and Wings loadouts.
- **The Blacksmith's Anvil (+1 to +10 Enhancement)**:
  - Forge weapons and armor using Gold.
  - Risk/reward success probabilities with dramatic anvil sound effects and +20% stat multipliers per level.
- **Character Studio & AI Style Transformer**:
  - Switch between procedural 16-bit sprite customizer and Canvas photo-to-RPG generator.

### 4. 🎰 Lucky Royale & Black Market Bazaar
- **Lucky Royale Supply Crate**:
  - Free Fire-style animated mystery crate unboxing with radiant beam effects, chest rattle animations, and dopamine-packed fanfare chords.
  - Guaranteed Rare+ drop pity counter (10-spin pity ceiling).
- **Black Market Vendor**:
  - Buy rotating high-tier weapons, armor, streak freeze shields, and XP elixirs.

### 5. 🏆 Battle Arena & Ranked Tiers (PvP)
- **Free Fire-Style Ranked Tier Hierarchy**:
  - **Bronze ➔ Silver ➔ Gold ➔ Platinum ➔ Diamond ➔ Heroic ➔ Grandmaster** based on Level, Combat Power, and Streaks.
- **Phantom Arena Duels**:
  - Asynchronous simulated PvP battles against leaderboard rivals with turn-by-turn combat logs, crits, and bounty rewards.
- **Global Hall of Legends**:
  - Dynamic ranking leaderboard showcasing top heroes and player standing.

### 6. 🌌 Talent Matrix (IRL Skill Tree)
- **Interactive Branching Skill Tree**:
  - **Body Tree (Physical Prowess)**: Iron Constitution, Kinetic Surge (+HP & workout adrenaline).
  - **Mind Tree (Cognitive Focus)**: Deep Flow State (+25% Pomodoro XP), Hyper Retention.
  - **Soul Tree (Discipline & Luck)**: Unbreakable Will (+8% Crit Chance), Fortune's Favor (+Drop Rates).
- **Attribute Radar Hexagon**:
  - Live visual radar diagram displaying your STR, INT, VIT, AGI, CHA, and WIL distribution.

---

## 🎵 Dynamic Dopamine-Boosting Audio Engine

Life RPG features a Web Audio API procedural polyphonic synthesizer with zero external asset dependencies:
- **3 Dynamic BGM Soundtracks**:
  1. **"Cyber Surge"** (132 BPM): Adrenaline synthwave battle beat with pulsing sub-bass, hi-hats, and saw leads.
  2. **"Hero's Triumph"** (116 BPM): Triumphant brass RPG chiptune anthem.
  3. **"Zen Hyperdrive"** (80 BPM): Warm lo-fi ambient focus chords for deep IRL work and study sessions.
- **Interactive Audio HUD**:
  - Live animated equalizer visualizer bars, track selector, BGM volume slider, and SFX mute toggle.
- **Hype SFX Suite**:
  - Crate unlock fanfare, Blacksmith hammer clank & shimmer chord, arena clash, level-up fanfare, and streak flame ignition.

---

## 📂 Project Structure
```
liferpg/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── character/route.ts
│   │   │   ├── profile/route.ts
│   │   │   ├── tasks/route.ts
│   │   │   ├── tasks/[id]/complete/route.ts
│   │   │   ├── inventory/route.ts
│   │   │   ├── inventory/equip/route.ts
│   │   │   ├── shop/route.ts
│   │   │   ├── shop/buy/route.ts
│   │   │   ├── leaderboard/route.ts
│   │   │   └── game/
│   │   │       ├── forge/route.ts
│   │   │       ├── lucky-crate/route.ts
│   │   │       ├── daily-spin/route.ts
│   │   │       ├── boss-raids/route.ts
│   │   │       ├── arena/route.ts
│   │   │       ├── talents/route.ts
│   │   │       └── quick-habit/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── AudioPlayerHUD.tsx
│   │   ├── LobbySection.tsx
│   │   ├── OperationsSection.tsx
│   │   ├── ArmorySection.tsx
│   │   ├── LuckyRoyaleSection.tsx
│   │   ├── ArenaSection.tsx
│   │   ├── TalentMatrixSection.tsx
│   │   ├── AttributeRadar.tsx
│   │   ├── QuestList.tsx
│   │   ├── CreateQuestModal.tsx
│   │   ├── CharacterCreationModal.tsx
│   │   └── LevelUpModal.tsx
│   └── lib/
│       ├── db.ts
│       ├── photoGenerator.ts
│       ├── progression.ts
│       ├── sound.ts
│       └── types.ts
├── scripts/
│   └── test-progression.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```
