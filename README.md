# Life RPG ⚔️

> **Gamify Real-World Productivity & Habit Progression**

Life RPG is a full-stack gamified productivity platform that transforms real-life tasks and habits into RPG-style quests. Complete tasks, earn XP and rewards, build character attributes, maintain streaks, and level up your real life.

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

## 🏰 Core Mechanics

### 1. The 6 Core Attributes
- **Strength (STR)**: Workouts, lifting, athletic stamina.
- **Intelligence (INT)**: Deep work, coding, reading books, courses.
- **Vitality (VIT)**: Sleep hygiene, hydration, nutrition, recovery.
- **Agility (AGI)**: Rapid chores, inbox zero, high-speed errands.
- **Charisma (CHA)**: Fellowship, social outreach, public speaking.
- **Willpower (WIL)**: Fasting, focus blocks, resisting vices.

### 2. Instant Feedback Loops
- **Audio Synthesis**: Retro 8-bit sound effects generated on the fly via the Web Audio API.
- **Floating Combat Text**: Real-time damage numbers (`+160 XP`, `+100 GP`, `💥 CRIT!`).
- **Dynamic Leveling**: Exponential leveling curve $XP_{req}(L) = \lfloor 100 \times L^{1.6} + 50 \times L \rfloor$.
- **Loot Drop RNG**: Guaranteed Rare+ drops via a 10-task pity-timer system.
- **Streak Multipliers**: Up to $+50\%$ bonus rewards for maintaining consecutive daily habits.

---

## 🛡️ Architecture & Security
- **Server-Authoritative State**: All XP, stat modifiers, gold drops, and level advancements are validated server-side.
- **Atomic Persistence**: ACID-guaranteed transactional file persistence in `.data/liferpg_db.json`.
- **Anti-Cheat Measures**: Completion velocity rate-limiting, HMAC audit hashing, and soft daily XP ceilings.

---

## 📂 Project Structure
```
liferpg/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── profile/route.ts
│   │   │   ├── tasks/route.ts
│   │   │   ├── tasks/[id]/complete/route.ts
│   │   │   ├── inventory/route.ts
│   │   │   ├── inventory/equip/route.ts
│   │   │   ├── shop/route.ts
│   │   │   ├── shop/buy/route.ts
│   │   │   └── leaderboard/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroHUD.tsx
│   │   ├── AttributeRadar.tsx
│   │   ├── QuestList.tsx
│   │   ├── CreateQuestModal.tsx
│   │   ├── InventoryModal.tsx
│   │   ├── ShopModal.tsx
│   │   ├── LeaderboardModal.tsx
│   │   └── LevelUpModal.tsx
│   └── lib/
│       ├── db.ts
│       ├── progression.ts
│       ├── sound.ts
│       └── types.ts
├── scripts/
│   └── test-progression.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```
>>>>>>> ef00549 (feat: complete Life RPG full-stack gamified productivity application with Character Creation Studio and Photo-to-RPG Generator)
