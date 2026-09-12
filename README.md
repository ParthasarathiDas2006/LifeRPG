# Life RPG: Sanctuary of Virtues ⚔️🏛️

> **Full-Stack Behavior & Moral Training Web Application with Modern Gamification**

Life RPG transforms daily moral practice, emotional restraint, and character development into an engaging RPG journey. By blending AAA game mechanics (inspired by Solo Leveling and modern RPGs) with deep philosophical principles, the app gamifies **4 Cardinal Virtues**: **Integrity**, **Compassion**, **Discipline**, and **Wisdom**.

---

## 🌟 Core Features

### 1. The 4 Cardinal Moral Virtues
* 🛡️ **Integrity (Truth & Radical Ownership)**: Keeping commitments, admitting mistakes without excuses, honesty checks.
* 💚 **Compassion (Lovingkindness & Empathy)**: Active listening, helping colleagues, unprompted encouragement, Random Acts of Kindness (RAKs).
* 🧭 **Discipline (Fortitude & Restraint)**: Screen-free digital fasting, deep work blocks, consistent physical and mental habits.
* 🔥 **Wisdom (Equanimity & Reflection)**: Emotional regulation, *"No Anger Day"*, evening introspection, daily micro-journaling.

### 2. Restraint & Negative Habit Tracking ("No Anger Day")
* **Evening Settlement Gate**: Negative restraint quests unlock for evening review.
* **Radical Honesty Bonus**: Players who honestly admit stumbling receive an **Integrity Bonus (+2 Integrity XP)** and maintain their commitment through an *Equanimity Grace Token*, preventing streak burnout.
* **Micro-Journaling & Mood Rating**: Log daily emotional states on a 5-point scale (*Weary*, *Tested*, *Neutral*, *Calm*, *Radiant*).

### 3. Non-Linear Progression Engine
* **Mathematical XP Scaling Curve**:
  $$\text{RequiredXP}(L) = \lfloor 100 \times L^{1.6} + 50 \times L \rfloor$$
  Leveling avoids linear monotony and grinding fatigue.
* **Streak Multipliers**:
  * 1–3 Days: $1.0\times$
  * 4–7 Days: $1.1\times$ ($+10\%$)
  * 8–29 Days: $1.25\times$ ($+25\%$)
  * 30+ Days: $1.5\times$ (Capped at $+50\%$ bonus)
* **Philosophical Virtue Titles**:
  * Level 1–4: *Seeker of the Four Virtues*
  * Level 5–9: *Practitioner of Inner Peace*
  * Level 10–14: *Guardian of the Moral Path* / *Beacon of Lovingkindness*
  * Level 15–19: *Adept of the Cardinal Virtues*
  * Level 20+: *Grand Master of Equanimity*

### 4. Virtue Economy & Sanctuary Themes
* **Virtue Coins (VC)**: Earned through moral practice, reflections, and level-ups.
* **Aesthetic Sanctuaries**: Attune your inner sanctum to unlockable visual atmospheres:
  * 🍃 **Mind Garden**: Dark jade and slate serenity for deep focus.
  * 🌌 **Astral Monastery**: Celestial indigo with starlit ambient dawn.
  * ☀️ **Sanctum of the Sun**: Radiant amber pillars of fortitude.

### 5. Multi-Zone RPG Ecosystem
* 🏛️ **Sanctuary of Virtues**: The core moral training HQ with 4-Pillar Orbs, restraint settlements, and Kindness Seed drawer.
* 🏰 **Lobby Command HQ**: Character stage, daily supply wheel, combat power radar.
* ⚔️ **Operations Hub**: Daily habit quests, boss raids, and Pomodoro focus terminal.
* 🛡️ **Armory & Forge**: Equipment loadouts with $+1$ to $+10$ blacksmith enhancement.
* 🎰 **Lucky Royale**: Mystery loot unboxing with 10-spin pity counter.
* 🏆 **Arena PvP**: Simulated tactical turn-based duels.
* 🌌 **Talent Matrix**: Branching Body, Mind, and Soul skill tree.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14 (App Router) + React 18 | High-performance server/client architecture |
| **Styling** | Tailwind CSS + CSS Modules | Responsive, dark-mode first design |
| **Animations** | Framer Motion | Smooth springs, micro-interactions, float text |
| **Sound FX** | Web Audio API Synthesizer | Zero-asset procedural polyphonic audio |
| **Database** | PostgreSQL + Prisma ORM | Relational schema with cascading integrity |
| **Auth** | Supabase Auth + Guest Mode Fallback | Secure login, session management, instant preview |
| **Streak Engine** | Redis Bitfield / Sorted Sets | High-throughput sub-millisecond streak logic |
| **Deployment** | Vercel (Frontend) + Railway / Supabase | Globally distributed Edge deployment |

---

## 🗄️ Database Schema Overview

```prisma
// Users
model User {
  id                  String           @id @default(uuid())
  email               String           @unique
  username            String           @unique
  level               Int              @default(1)
  currentXp           Int              @default(0)
  virtueCoins         Int              @default(25)
  activeTheme         String           @default("sanctuary_dawn")
  streakFreezeTokens  Int              @default(2)
  attributes          UserAttribute[]
  tasks               Task[]
  taskLogs            TaskLog[]
}

// 4 Cardinal Virtues
model UserAttribute {
  id          String        @id @default(uuid())
  userId      String
  attribute   AttributeType // INTEGRITY, COMPASSION, DISCIPLINE, WISDOM
  level       Int           @default(1)
  totalPoints Int           @default(0)
}

// Tasks & Negative Restraints
model Task {
  id                 String          @id @default(uuid())
  title              String
  attribute          AttributeType
  type               TaskType        // DAILY, NEGATIVE_RESTRAINT, REFLECTION
  baseXp             Int
  baseVirtueCoins    Int
  currentStreak      Int
  requiresReflection Boolean         @default(false)
}

// Reflection Logs
model TaskLog {
  id                 String          @id @default(uuid())
  taskId             String
  reflectionText     String?
  moodRating         Int?            // 1-5 scale
  honestyAffirmed    Boolean         @default(true)
  completedAt        DateTime        @default(now())
}
```

* Pure PostgreSQL SQL migration is provided at `supabase/migrations/20260912_init_moral_rpg.sql`.

---

## 🚀 Getting Started Locally

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ParthasarathiDas2006/LifeRPG.git
cd LifeRPG/LifeRPG
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file:
```env
# Optional Supabase Connection (App has built-in local guest fallback)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional Database URL for Prisma migrations
DATABASE_URL=postgresql://postgres:password@localhost:5432/liferpg
```

### 3. Run Automated Progression Verification
```bash
npx tsx scripts/test-progression.ts
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Live Deployment Guide

### Deploying Frontend to Vercel
1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Set the **Root Directory** to `LifeRPG` (if nested).
4. Add environment variables:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**. Vercel will build the Next.js App Router project and provide your live URL.

### Deploying Database to Supabase
1. Create a new free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `supabase/migrations/20260912_init_moral_rpg.sql` and run.
4. Copy the project URL and Anon Key into your Vercel project settings.

---

## 🎬 90–180s Demo Video Script & Storyboard

Use this scene-by-scene script to record your showcase demonstration:

| Timecode | Scene / Screen Action | Spoken Narration Script |
| :--- | :--- | :--- |
| **0:00 - 0:25** | **Intro & Lobby HQ**<br>Display character stage podium, title *"Seeker of the Four Virtues"*, and top currency bar showing Gold & Virtue Coins. | *"Welcome to Life RPG: Sanctuary of Virtues. Unlike typical apps that reward endless grinding, Life RPG gamifies behavioral and moral training across four cardinal virtues: Integrity, Compassion, Discipline, and Wisdom."* |
| **0:25 - 0:55** | **The Sanctuary of Virtues**<br>Click **Sanctuary** in the top navbar. Showcase the 4 glowing Virtue Orbs, the current Virtue Points, and the Kindness Seed generator. Click *Draw New Seed*. | *"Here in the Sanctuary, your character's power reflects inner balance. The Kindness Seed generator offers daily Random Acts of Kindness, while the 4 Virtue Pillars track real-time level progress."* |
| **0:55 - 1:25** | **Evening Restraint Check-in ("No Anger Day")**<br>Click **Reflect & Settle** on the "No Anger Day" quest. Show the Evening Reflection Modal with the honesty check, mood rating (*Tested $\to$ Calm*), and micro-journaling. | *"Negative habits like emotional control require honest introspection. Notice the Integrity check: even if you stumble, admitting it honestly awards an Integrity Honesty Bonus, turning mistakes into real character growth."* |
| **1:25 - 1:55** | **Quest Completion & Level Up Celebration**<br>Complete a Compassion quest. Notice floating `+95 XP` and `+15 VC`. Trigger Level Up. Showcase the full-screen celebration modal with particle bursts and virtue title ascension. | *"Every action triggers non-linear XP scaling with active streak multipliers. Leveling up ascends your philosophical title, restores energy, and grants Virtue Coins."* |
| **1:55 - 2:20** | **Virtue Economy & Sanctuary Themes**<br>Scroll to Sanctuary Atmosphere. Select *Astral Monastery* or *Sanctum of the Sun* and click **Attune**. Show the instant visual transformation. Refresh the browser to prove state persistence. | *"Virtue Coins are spent in the Sanctuary to attune your environment with peaceful themes. Everything persists reliably to the database."* |
| **2:20 - 2:35** | **Closing Summary**<br>Show responsive layout on mobile view and conclude with repository link. | *"Modern UI, accessible controls, and meaningful self-mastery. The complete code and deployment guide are available on GitHub."* |

---

## 📄 License
MIT License. Created with dedication to mindful productivity and moral excellence.
