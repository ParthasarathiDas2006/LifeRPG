/**
 * AI Prompt-to-Character Engine for Life RPG
 * Parses any prompt or famous game character description and generates
 * high-fidelity AAA video game hero configurations with rich cinematic splash art.
 */

import { CharacterConfig, CharacterClass, CharacterGender, SpritePartsConfig } from './types';
import { svgToDataUri } from './characterArt/heroArt';

export interface PromptHeroPreset {
  id: string;
  game: string;
  characterName: string;
  promptText: string;
  category: string;
  class: CharacterClass;
  gender: CharacterGender;
  title: string;
  abilityName: string;
  abilityBuff: string;
  abilityIcon: string;
  quote: string;
  combatPower: number;
  kdRatio: number;
  physique: string;
  faceAndEyes: string;
  torsoAndOutfit: string;
  weapon: string;
  aura: string;
  tags: string[];
}

export const FAMOUS_GAME_PROMPTS: PromptHeroPreset[] = [
  // 1. FREE FIRE - KELLY AWAKENED
  {
    id: 'prompt-ff-kelly',
    game: 'FREE FIRE',
    characterName: 'Kelly "The Swift"',
    promptText: 'Kelly from Free Fire, awakened golden phoenix sprinter in yellow aerodynamic racing tracksuit, glowing amber eyes, sprinting combat posture, dual energy blades, phoenix blaze aura',
    category: 'SPEED_SPRINTER',
    class: 'HUNTRESS',
    gender: 'FEMALE',
    title: 'Awakened Phoenix Sprinter',
    abilityName: 'Deadly Velocity',
    abilityBuff: '+25% Sprint Speed & Momentum XP',
    abilityIcon: '⚡',
    quote: "Run faster than your doubts! No habit can outpace my sprint velocity.",
    combatPower: 3350,
    kdRatio: 4.9,
    physique: 'Toned Athletic Sprinter Physique',
    faceAndEyes: 'Radiant anime game symmetry, glowing amber eyes, determined battle smile',
    torsoAndOutfit: 'Yellow aerodynamic racing tracksuit with Kevlar inner vest and carbon bracers',
    weapon: 'Dual Phoenix Sabers',
    aura: 'Golden Phoenix Flame Blaze',
    tags: ['Free Fire', 'Kelly', 'Phoenix', 'Sprinter', 'Yellow Suit'],
  },

  // 2. PUBG - LONE SURVIVOR (LEVEL 3 SPETSNAZ)
  {
    id: 'prompt-pubg-survivor',
    game: 'PUBG MOBILE',
    characterName: 'PUBG Lone Survivor',
    promptText: 'PUBG Mobile Lone Survivor with legendary Level 3 Spetsnaz ballistic helmet, white collared dress shirt, loosened red tie, leather shoulder holster, holding M416 assault rifle, airdrop red smoke',
    category: 'TACTICAL_SOLDIER',
    class: 'WARRIOR',
    gender: 'MALE',
    title: 'Winner Winner Chicken Dinner Legend',
    abilityName: 'Level 3 Ballistic Shield',
    abilityBuff: '+30% Willpower & Damage Resistance',
    abilityIcon: '🪖',
    quote: "Winner Winner Chicken Dinner! Solidify discipline under heavy fire.",
    combatPower: 3500,
    kdRatio: 5.6,
    physique: 'Hardened Military Commando Build',
    faceAndEyes: 'Strong chiseled jawline, glinting ballistic eye visor, battle scar',
    torsoAndOutfit: 'Crisp white collared shirt, loosened red necktie, leather holster, tactical cargo trousers',
    weapon: 'Custom M416 with Red Dot & Compensator',
    aura: 'Crimson Airdrop Signal Smoke',
    tags: ['PUBG', 'Spetsnaz', 'Level 3', 'Chicken Dinner', 'M416'],
  },

  // 3. FREE FIRE - DJ ALOK
  {
    id: 'prompt-ff-alok',
    game: 'FREE FIRE',
    characterName: 'DJ Alok "Beat Master"',
    promptText: 'DJ Alok from Free Fire, charismatic beat master in tactical black and gold equalizer duster coat, stylish undercut hair, neat designer beard, gold aviator sunglasses, holographic neon soundwave aura',
    category: 'AUDIO_PALADIN',
    class: 'PALADIN',
    gender: 'MALE',
    title: 'Soundwave Apex & Beat Maestro',
    abilityName: 'Drop The Beat',
    abilityBuff: '+20 HP/Mana Regen & Audio Aura',
    abilityIcon: '🎧',
    quote: "Feel the frequency! Music heals the mind and ignites unstoppable focus.",
    combatPower: 3400,
    kdRatio: 5.2,
    physique: 'Chiseled Muscular Athletic Build',
    faceAndEyes: 'Ultra-handsome facial contours, groomed designer beard, gold aviators',
    torsoAndOutfit: 'Tactical black DJ duster coat with gold-trimmed cyber circuitry and open collar',
    weapon: 'Holographic Audio Wave Gauntlets',
    aura: 'Cyan & Gold Soundwave Rings',
    tags: ['Free Fire', 'DJ Alok', 'Soundwave', 'Heal Aura', 'Beat Master'],
  },

  // 4. PUBG - VALKYRIE SNIPER
  {
    id: 'prompt-pubg-valkyrie',
    game: 'PUBG MOBILE',
    characterName: 'Valkyrie Commando',
    promptText: 'PUBG Mobile Valkyrie female sniper commando with 8x scope AWM sniper rifle, tactical ponytail, plate carrier vest, camouflage warpaint, radar laser target crosshair aura',
    category: 'SPEC_OPS_SNIPER',
    class: 'HUNTRESS',
    gender: 'FEMALE',
    title: 'Ghost Sniper of Pochinki & AWM Queen',
    abilityName: '8x Precision Scope',
    abilityBuff: '+35% Critical Hit Chance on Deep Quests',
    abilityIcon: '🎯',
    quote: "One shot, one milestone. Zero room for hesitation.",
    combatPower: 3450,
    kdRatio: 5.4,
    physique: 'Lean Muscular Spec-Ops Physique',
    faceAndEyes: 'High cheekbones, piercing hazel-green eyes with laser sniper focus, warpaint',
    torsoAndOutfit: 'Tactical olive desert camo shirt, heavy plate carrier vest, tactical cargo trousers',
    weapon: 'AWM Magnum Sniper with 8x Scope',
    aura: 'Laser Target Crosshair & Duststorm',
    tags: ['PUBG', 'Valkyrie', 'AWM', 'Sniper', 'Spec-Ops'],
  },

  // 5. FREE FIRE - MOCO CYBER MATRIX
  {
    id: 'prompt-ff-moco',
    game: 'FREE FIRE',
    characterName: 'Moco "Cyber Matrix"',
    promptText: 'Moco from Free Fire, legendary cyber hacker with neon turquoise braided dreadlocks, digital HUD retinal eye, nanotech crop top, cybernetic arm with pulsing data streams',
    category: 'CYBER_HACKER',
    class: 'CYBER_VALKYRIE',
    gender: 'FEMALE',
    title: 'Grand Infiltrator of the Neural Grid',
    abilityName: "Hacker's Eye",
    abilityBuff: '+25% Extra Gold & Hidden Bonus Drops',
    abilityIcon: '👁️',
    quote: "Firewalls bypassed. Your next achievement has already been tagged.",
    combatPower: 3200,
    kdRatio: 4.8,
    physique: 'Agile Cybernetic Infiltrator Body',
    faceAndEyes: 'Neon turquoise braided dreadlocks, digital HUD retinal eye, futuristic aesthetic',
    torsoAndOutfit: 'Nanotech carbon crop vest, chrome cybernetic arm sleeve, glowing magnetic boots',
    weapon: 'Wrist Holographic Cyberdeck',
    aura: 'Turquoise Binary Matrix Grid',
    tags: ['Free Fire', 'Moco', 'Hacker', 'Cyber Matrix', 'Dreadlocks'],
  },

  // 6. PUBG - GOLDEN PHARAOH X-SUIT
  {
    id: 'prompt-pubg-pharaoh',
    game: 'PUBG MOBILE',
    characterName: 'Golden Pharaoh X-Suit',
    promptText: 'PUBG Mobile Mythic Golden Pharaoh X-Suit with 24k solid gold armor, lapis lazuli inlays, royal Nemes headdress, divine kohl eyeliner, holding golden solar ankh spear',
    category: 'MYTHIC_SOVEREIGN',
    class: 'PALADIN',
    gender: 'MALE',
    title: 'Eternal Sovereign of the Desert Sun',
    abilityName: 'Solar Ascendance',
    abilityBuff: '+45% Gold GP Loot from Habit Mastery',
    abilityIcon: '👑',
    quote: "Bow before the divine sun! Order and discipline will prevail.",
    combatPower: 3800,
    kdRatio: 6.0,
    physique: 'God-Like Regal Warrior Physique',
    faceAndEyes: 'Noble pharaonic features, glowing golden eyes, Egyptian kohl eyeliner',
    torsoAndOutfit: '24-karat solid gold sculpted falcon armor with lapis lazuli inlays and Nemes headdress',
    weapon: 'Golden Solar Ankh Spear',
    aura: 'Radiant 24K Gold Falcon Wings',
    tags: ['PUBG', 'Golden Pharaoh', 'X-Suit', 'Mythic', 'Gold Armor'],
  },

  // 7. FREE FIRE - HAYATO BUSHIDO
  {
    id: 'prompt-ff-hayato',
    game: 'FREE FIRE',
    characterName: 'Hayato Shimada',
    promptText: 'Hayato from Free Fire, legendary samurai ronin with topknot hair, cheek warrior scar, crimson and navy battle haori, wielding flaming Shimada katana',
    category: 'BUSHIDO_RONIN',
    class: 'WARRIOR',
    gender: 'MALE',
    title: 'Scorching Heir of the Shimada Katana',
    abilityName: 'Art of Bushido',
    abilityBuff: '+35% Armor Pierce & Boss Raid Damage',
    abilityIcon: '⚔️',
    quote: "Honor is not given—it is forged in the furnace of discipline!",
    combatPower: 3300,
    kdRatio: 5.0,
    physique: 'Muscular Battle-Trained Ronin Physique',
    faceAndEyes: 'Handsome Japanese warrior face, cheek warrior scar, intense dark eyes, topknot',
    torsoAndOutfit: 'Traditional crimson and navy combat haori, samurai shoulder pauldrons, split-toe boots',
    weapon: 'Incandescent Shimada Katana',
    aura: 'Rising Crimson Flame Embers',
    tags: ['Free Fire', 'Hayato', 'Samurai', 'Katana', 'Bushido'],
  },

  // 8. FREE FIRE - CHRONO TIME WARPER
  {
    id: 'prompt-ff-chrono',
    game: 'FREE FIRE',
    characterName: 'Chrono "Time Warper"',
    promptText: 'Chrono from Free Fire, futuristic operative in high-tech black cyber trench coat with electric blue conduits, temporal force field shield sphere, sleek modern comb-over hair',
    category: 'TIME_GUARDIAN',
    class: 'CYBER_HERO',
    gender: 'MALE',
    title: 'Cyber Mercenary & Time Guardian',
    abilityName: 'Time Turner Barrier',
    abilityBuff: 'Free Daily Streak Loss Protection & 600HP Barrier',
    abilityIcon: '🛡️',
    quote: "Time waits for no one. Master your hours, master your destiny.",
    combatPower: 3420,
    kdRatio: 5.3,
    physique: 'Peak International Athletic Body',
    faceAndEyes: 'Angular confident jawline, temporal blue eye glint, textured comb-over haircut',
    torsoAndOutfit: 'High-tech carbon trench coat with glowing blue energy conduits and biometric gauntlets',
    weapon: 'Dual Chrono Energy Sabers',
    aura: 'Cyan Temporal Forcefield Hexagon Sphere',
    tags: ['Free Fire', 'Chrono', 'Time Warper', 'Shield', 'Forcefield'],
  },

  // 9. SOLO LEVELING - SUNG JIN-WOO
  {
    id: 'prompt-sl-jinwoo',
    game: 'SOLO LEVELING',
    characterName: 'Sung Jin-Woo',
    promptText: 'Sung Jin-Woo from Solo Leveling, Monarch of Shadows with glowing radiant electric cyan eyes, flowing black gothic trench coat, dual jagged Kasaka and Rasaka daggers, shadow soldiers rising',
    category: 'SHADOW_MONARCH',
    class: 'ROGUE',
    gender: 'MALE',
    title: 'Monarch of Shadows & Void Emperor',
    abilityName: 'Shadow Extraction (Arise)',
    abilityBuff: '+35% Permanent XP Growth & Shadow Minion Summons',
    abilityIcon: '🌑',
    quote: "Arise. Every cleared task becomes an eternal soldier in my shadow army.",
    combatPower: 3950,
    kdRatio: 6.5,
    physique: 'Tall Slender Muscular Sovereign Physique',
    faceAndEyes: 'Sharp Korean manhwa facial contour, glowing electric cyan pupils, calm dominance',
    torsoAndOutfit: 'Midnight gothic high-collar duster coat flowing with spectral violet shadow tendrils',
    weapon: 'Kasaka Fang & Knight Killer Daggers',
    aura: 'Violet Abyss Mist & Shadow Extraction Glyphs',
    tags: ['Solo Leveling', 'Sung Jin-Woo', 'Shadow Monarch', 'Arise', 'Daggers'],
  },

  // 10. CALL OF DUTY - SIMON "GHOST" RILEY
  {
    id: 'prompt-cod-ghost',
    game: 'CALL OF DUTY',
    characterName: 'Simon "Ghost" Riley',
    promptText: 'Simon Ghost Riley from Call of Duty Modern Warfare, iconic skull balaclava face mask, tactical plate carrier, dark combat hoodie, night vision goggles, holding suppressed assault rifle',
    category: 'SPEC_OPS_OPERATOR',
    class: 'WARRIOR',
    gender: 'MALE',
    title: 'Task Force 141 Legend & Shadow Ghost',
    abilityName: 'Dead Silence',
    abilityBuff: '+30% Stealth Focus & Distraction Immunity',
    abilityIcon: '💀',
    quote: "Bravo Six, going dark. Complete the mission, leave no doubts.",
    combatPower: 3600,
    kdRatio: 5.8,
    physique: 'Broad Heavy Tactical Operator Build',
    faceAndEyes: 'Iconic skull balaclava mask, cold calculating military gaze, tactical comms headset',
    torsoAndOutfit: 'Dark multicam combat fleece, heavy ballistic plate carrier, tactical combat gloves',
    weapon: 'Suppressed M4A1 / ACR Tactical Rifle',
    aura: 'Night Ops Thermal Smoke & Skull Insignia',
    tags: ['Call of Duty', 'Ghost', 'Skull Mask', 'Task Force 141', 'MW'],
  },

  // 11. VALORANT - JETT CLOUDBURST
  {
    id: 'prompt-val-jett',
    game: 'VALORANT',
    characterName: 'Jett "Windblade"',
    promptText: 'Jett from Valorant, agile South Korean radiant duelist with silver-white high ponytail, wind swirling around, holding glowing storm kunai throwing knives, wind gust dash aura',
    category: 'RADIANT_DUELIST',
    class: 'ROGUE',
    gender: 'FEMALE',
    title: 'Radiant Cloudburst Duelist',
    abilityName: 'Blade Storm & Tailwind',
    abilityBuff: '+40% Agility Rush on Timed Work Sessions',
    abilityIcon: '🌪️',
    quote: "Watch this! Fast on my feet, razor sharp till the round is won.",
    combatPower: 3480,
    kdRatio: 5.5,
    physique: 'Ultra-Agile Aerodynamic Radiant Body',
    faceAndEyes: 'Silver-white high ponytail with loose bangs, confident radiant smirk, sky-blue eyes',
    torsoAndOutfit: 'Dark teal and white windbreaker vest with radiant wind conduits, cropped utility joggers',
    weapon: 'Floating Storm Kunai Knives',
    aura: 'Swirling White Wind Vortex & Cloudburst',
    tags: ['Valorant', 'Jett', 'Kunai', 'Radiant', 'Wind'],
  },

  // 12. LEAGUE OF LEGENDS - YASUO THE UNFORGIVEN
  {
    id: 'prompt-lol-yasuo',
    game: 'LEAGUE OF LEGENDS',
    characterName: 'Yasuo "The Unforgiven"',
    promptText: 'Yasuo from League of Legends, master swordsman with spiky wild dark ponytail, steel samurai pauldron on left shoulder, rope belt, wind technique katana, wind wall shield aura',
    category: 'WIND_SWORDSMAN',
    class: 'WARRIOR',
    gender: 'MALE',
    title: 'The Unforgiven & Steel Tempest Master',
    abilityName: 'Wind Wall & Steel Tempest',
    abilityBuff: '+30% Critical Strike Chance & Streak Shield',
    abilityIcon: '🗡️',
    quote: "Death is like the wind—always by my side. Hasagi!",
    combatPower: 3550,
    kdRatio: 5.7,
    physique: 'Lean Muscular Ronin Physique',
    faceAndEyes: 'Weathered handsome samurai face, nose bridge scar, intense determined focus',
    torsoAndOutfit: 'Navy blue flowing samurai tunic, sculpted left steel pauldron, woven rope sash',
    weapon: 'Wind Technique Katana',
    aura: 'Spinning Steel Tempest Cyclone',
    tags: ['League of Legends', 'Yasuo', 'Hasagi', 'Wind Katana', 'Samurai'],
  },
];

/**
 * Builds a dynamic high-fidelity SVG character illustration from prompt data
 */
export function generatePromptCharacterSVG(preset: PromptHeroPreset): string {
  // Generate distinct, vibrant color palettes based on game and category
  let bgGradient1 = '#090d16';
  let bgGradient2 = '#1e1b4b';
  let accentColor = '#38bdf8';
  let secondaryAccent = '#facc15';
  let badgeColor = '#38bdf8';
  let auraGlow = '#00f0ff';

  if (preset.game === 'FREE FIRE') {
    if (preset.id.includes('kelly')) {
      bgGradient1 = '#1a0d00';
      bgGradient2 = '#78350f';
      accentColor = '#fbbf24';
      secondaryAccent = '#ef4444';
      badgeColor = '#fbbf24';
      auraGlow = '#f59e0b';
    } else if (preset.id.includes('alok')) {
      bgGradient1 = '#050c1a';
      bgGradient2 = '#1e1b4b';
      accentColor = '#06b6d4';
      secondaryAccent = '#fbbf24';
      badgeColor = '#38bdf8';
      auraGlow = '#22d3ee';
    } else if (preset.id.includes('hayato')) {
      bgGradient1 = '#1a0505';
      bgGradient2 = '#7f1d1d';
      accentColor = '#ef4444';
      secondaryAccent = '#fbbf24';
      badgeColor = '#ef4444';
      auraGlow = '#dc2626';
    } else if (preset.id.includes('chrono')) {
      bgGradient1 = '#040d1a';
      bgGradient2 = '#0c4a6e';
      accentColor = '#00f0ff';
      secondaryAccent = '#38bdf8';
      badgeColor = '#00f0ff';
      auraGlow = '#0284c7';
    } else {
      bgGradient1 = '#041417';
      bgGradient2 = '#115e59';
      accentColor = '#06b6d4';
      secondaryAccent = '#10b981';
      badgeColor = '#14b8a6';
      auraGlow = '#06b6d4';
    }
  } else if (preset.game === 'PUBG MOBILE') {
    if (preset.id.includes('pharaoh')) {
      bgGradient1 = '#1a1200';
      bgGradient2 = '#78350f';
      accentColor = '#fbbf24';
      secondaryAccent = '#f59e0b';
      badgeColor = '#facc15';
      auraGlow = '#eab308';
    } else if (preset.id.includes('valkyrie')) {
      bgGradient1 = '#08140c';
      bgGradient2 = '#14532d';
      accentColor = '#4ade80';
      secondaryAccent = '#fbbf24';
      badgeColor = '#22c55e';
      auraGlow = '#16a34a';
    } else {
      bgGradient1 = '#090d16';
      bgGradient2 = '#1e293b';
      accentColor = '#f59e0b';
      secondaryAccent = '#ef4444';
      badgeColor = '#fbbf24';
      auraGlow = '#ef4444';
    }
  } else if (preset.game === 'SOLO LEVELING') {
    bgGradient1 = '#030712';
    bgGradient2 = '#2e1065';
    accentColor = '#00f0ff';
    secondaryAccent = '#a855f7';
    badgeColor = '#c084fc';
    auraGlow = '#7c3aed';
  } else if (preset.game === 'CALL OF DUTY') {
    bgGradient1 = '#05070a';
    bgGradient2 = '#1c1917';
    accentColor = '#f8fafc';
    secondaryAccent = '#22c55e';
    badgeColor = '#94a3b8';
    auraGlow = '#22c55e';
  } else if (preset.game === 'VALORANT') {
    bgGradient1 = '#040d1a';
    bgGradient2 = '#0f766e';
    accentColor = '#2dd4bf';
    secondaryAccent = '#38bdf8';
    badgeColor = '#2dd4bf';
    auraGlow = '#00f0ff';
  } else {
    bgGradient1 = '#0a0f1d';
    bgGradient2 = '#1e3a8a';
    accentColor = '#60a5fa';
    secondaryAccent = '#fbbf24';
    badgeColor = '#3b82f6';
    auraGlow = '#60a5fa';
  }

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <defs>
    <linearGradient id="prompt-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradient1}" />
      <stop offset="50%" stop-color="${bgGradient2}" />
      <stop offset="100%" stop-color="${bgGradient1}" />
    </linearGradient>
    <radialGradient id="prompt-aura" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="${auraGlow}" stop-opacity="0.6" />
      <stop offset="60%" stop-color="${accentColor}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${bgGradient1}" stop-opacity="0" />
    </radialGradient>
    <filter id="prompt-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="500" height="640" fill="url(#prompt-bg)" />

  <!-- Ambient Radiant Energy Core -->
  <circle cx="250" cy="280" r="230" fill="url(#prompt-aura)" />

  <!-- Dynamic Game Backdrop Geometry & Atmospheric Rays -->
  <g stroke="${accentColor}" stroke-width="1.5" opacity="0.3">
    <circle cx="250" cy="280" r="190" stroke-dasharray="14 10" />
    <circle cx="250" cy="280" r="130" stroke-dasharray="8 6" />
    <polygon points="250,90 410,380 90,380" fill="none" stroke-dasharray="16 8" />
    <line x1="250" y1="20" x2="250" y2="580" stroke-dasharray="6 6" />
    <line x1="40" y1="280" x2="460" y2="280" stroke-dasharray="6 6" />
  </g>

  <!-- Character Silhouette & Body Posture -->
  <!-- Cloak / Outer Rig -->
  <path d="M 90,640 L 135,360 L 195,300 L 250,315 L 305,300 L 365,360 L 410,640 Z" fill="#090d16" stroke="${accentColor}" stroke-width="2" />
  
  <!-- Outer Armor / Jacket Folds -->
  <path d="M 135,360 L 110,640 L 200,640 L 180,420 Z" fill="${bgGradient2}" opacity="0.85" />
  <path d="M 365,360 L 390,640 L 300,640 L 320,420 Z" fill="${bgGradient2}" opacity="0.85" />

  <!-- Tactical Chest Armor & High-Tech Vest -->
  <rect x="180" y="315" width="140" height="150" rx="16" fill="#0f172a" stroke="${secondaryAccent}" stroke-width="2" />
  <line x1="180" y1="365" x2="320" y2="365" stroke="${accentColor}" stroke-width="2" />
  <line x1="180" y1="415" x2="320" y2="415" stroke="${accentColor}" stroke-width="2" />

  <!-- Glowing Core / Power Conduit on Chest -->
  <circle cx="250" cy="365" r="16" fill="#030712" stroke="${accentColor}" stroke-width="3" />
  <circle cx="250" cy="365" r="8" fill="${secondaryAccent}" filter="url(#prompt-glow)" />

  <!-- Arms with Armored Gauntlets & Shoulder Plates -->
  <path d="M 135,360 L 105,480 L 140,495 L 165,395 Z" fill="#1e293b" stroke="${accentColor}" stroke-width="1.5" />
  <path d="M 365,360 L 395,480 L 360,495 L 335,395 Z" fill="#1e293b" stroke="${accentColor}" stroke-width="1.5" />

  <!-- Shoulder Pauldrons -->
  <path d="M 115,350 L 175,320 L 180,365 L 120,395 Z" fill="#0f172a" stroke="${secondaryAccent}" stroke-width="2.5" />
  <path d="M 385,350 L 325,320 L 320,365 L 380,395 Z" fill="#0f172a" stroke="${secondaryAccent}" stroke-width="2.5" />

  <!-- Signature Weapon Element -->
  <g transform="translate(250, 430)">
    <line x1="-130" y1="-50" x2="130" y2="50" stroke="${accentColor}" stroke-width="6" stroke-linecap="round" filter="url(#prompt-glow)" />
    <circle cx="-130" cy="-50" r="8" fill="${secondaryAccent}" />
    <circle cx="130" cy="50" r="8" fill="${secondaryAccent}" />
  </g>

  <!-- Neck -->
  <rect x="232" y="245" width="36" height="35" fill="#fbd38d" />

  <!-- Stylized Game Hero Face -->
  <path d="M 200,185 C 200,140 300,140 300,185 C 300,245 272,272 250,280 C 228,272 200,245 200,185 Z" fill="#ffedd5" stroke="#f59e0b" stroke-width="1.5" />

  <!-- Glowing Focused Video Game Eyes -->
  <path d="M 216,202 Q 230,198 238,206" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round" />
  <ellipse cx="228" cy="206" rx="6" ry="3.5" fill="${accentColor}" filter="url(#prompt-glow)" />
  <ellipse cx="228" cy="206" rx="2" ry="1.5" fill="#ffffff" />

  <path d="M 284,202 Q 270,198 262,206" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round" />
  <ellipse cx="272" cy="206" rx="6" ry="3.5" fill="${accentColor}" filter="url(#prompt-glow)" />
  <ellipse cx="272" cy="206" rx="2" ry="1.5" fill="#ffffff" />

  <!-- Eye trails / combat warpaint -->
  <line x1="214" y1="215" x2="225" y2="225" stroke="${secondaryAccent}" stroke-width="2.5" stroke-linecap="round" />
  <line x1="286" y1="215" x2="275" y2="225" stroke="${secondaryAccent}" stroke-width="2.5" stroke-linecap="round" />

  <!-- Confident Mouth & Jaw -->
  <path d="M 240,248 L 260,248" stroke="#9a3412" stroke-width="2.5" stroke-linecap="round" />

  <!-- Stylized Anime / Video Game Hair (Dynamic Spikes / Ponytail) -->
  <path d="M 190,185 C 185,115 315,115 310,185 C 290,140 250,135 220,150 Z" fill="#090d16" stroke="${accentColor}" stroke-width="2" />
  <!-- Hair highlights -->
  <path d="M 215,155 Q 235,125 265,130" stroke="${accentColor}" stroke-width="3" fill="none" opacity="0.9" />
  <path d="M 245,135 Q 275,120 295,145" stroke="${secondaryAccent}" stroke-width="2" fill="none" opacity="0.8" />

  <!-- Header Badge: Famous Game Franchise -->
  <g transform="translate(30, 25)">
    <rect x="0" y="0" width="170" height="34" rx="8" fill="#050814" stroke="${badgeColor}" stroke-width="2" opacity="0.95" />
    <circle cx="18" cy="17" r="7" fill="${accentColor}" filter="url(#prompt-glow)" />
    <text x="35" y="23" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="900" letter-spacing="1">
      ${preset.game}
    </text>
  </g>

  <!-- Rarity / Combat Power Badge -->
  <g transform="translate(320, 25)">
    <rect x="0" y="0" width="150" height="34" rx="8" fill="#050814" stroke="${secondaryAccent}" stroke-width="2" opacity="0.95" />
    <text x="75" y="22" fill="${secondaryAccent}" font-size="12" font-family="monospace" font-weight="900" text-anchor="middle" letter-spacing="1">
      CP: ${preset.combatPower} ★
    </text>
  </g>

  <!-- Footer Banner with Character Name & Skill -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#050814" stroke="${accentColor}" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900">
      ${preset.characterName.toUpperCase()}
    </text>
    <text x="420" y="27" fill="${secondaryAccent}" font-size="12" font-family="monospace" font-weight="900" text-anchor="end">
      ${preset.abilityBuff.split('&')[0].trim()}
    </text>
  </g>
</svg>
`;

  return svg;
}

/**
 * Parses user input prompt to match or construct an optimized game character configuration
 */
export function generateCharacterFromPrompt(inputPrompt: string): {
  config: CharacterConfig;
  presetMatch: PromptHeroPreset;
} {
  const lower = inputPrompt.toLowerCase();

  // Find best matching famous game preset
  let matchedPreset = FAMOUS_GAME_PROMPTS[0]; // Kelly as default

  for (const p of FAMOUS_GAME_PROMPTS) {
    // Check tags or name
    const hasTagMatch = p.tags.some((tag) => lower.includes(tag.toLowerCase()));
    const hasGameMatch = lower.includes(p.game.toLowerCase());
    const hasNameMatch = lower.includes(p.characterName.toLowerCase().split(' ')[0]);

    if (hasNameMatch || (hasGameMatch && hasTagMatch)) {
      matchedPreset = p;
      break;
    }
  }

  // Fallback check by game keywords
  if (lower.includes('pubg') || lower.includes('spetsnaz') || lower.includes('helmet')) {
    matchedPreset = FAMOUS_GAME_PROMPTS.find((p) => p.id === 'prompt-pubg-survivor') || matchedPreset;
  } else if (lower.includes('alok') || lower.includes('dj')) {
    matchedPreset = FAMOUS_GAME_PROMPTS.find((p) => p.id === 'prompt-ff-alok') || matchedPreset;
  } else if (lower.includes('jinwoo') || lower.includes('solo leveling') || lower.includes('shadow')) {
    matchedPreset = FAMOUS_GAME_PROMPTS.find((p) => p.id === 'prompt-sl-jinwoo') || matchedPreset;
  } else if (lower.includes('hayato') || lower.includes('samurai') || lower.includes('katana')) {
    matchedPreset = FAMOUS_GAME_PROMPTS.find((p) => p.id === 'prompt-ff-hayato') || matchedPreset;
  } else if (lower.includes('pharaoh') || lower.includes('egypt')) {
    matchedPreset = FAMOUS_GAME_PROMPTS.find((p) => p.id === 'prompt-pubg-pharaoh') || matchedPreset;
  } else if (lower.includes('ghost') || lower.includes('call of duty') || lower.includes('cod')) {
    matchedPreset = FAMOUS_GAME_PROMPTS.find((p) => p.id === 'prompt-cod-ghost') || matchedPreset;
  } else if (lower.includes('jett') || lower.includes('valorant')) {
    matchedPreset = FAMOUS_GAME_PROMPTS.find((p) => p.id === 'prompt-val-jett') || matchedPreset;
  } else if (lower.includes('yasuo') || lower.includes('hasagi')) {
    matchedPreset = FAMOUS_GAME_PROMPTS.find((p) => p.id === 'prompt-lol-yasuo') || matchedPreset;
  }

  const PROMPT_PHOTO_MAP: Record<string, string> = {
    'prompt-ff-kelly': '/characters/kelly.jpg',
    'prompt-pubg-survivor': '/characters/pubg_survivor.jpg',
    'prompt-sl-jinwoo': '/characters/jinwoo.jpg',
    'prompt-ff-alok': '/characters/alok.jpg',
  };

  const svgContent = generatePromptCharacterSVG(matchedPreset);
  const avatarUrl = PROMPT_PHOTO_MAP[matchedPreset.id] || svgToDataUri(svgContent);

  const spriteParts: SpritePartsConfig = {
    gender: matchedPreset.gender,
    body: 'fair',
    hair: matchedPreset.characterName.toLowerCase().replace(/[^a-z]/g, '_'),
    hairColor: '#fbbf24',
    outfit: 'combat_suit',
    outfitColor: '#1e293b',
    weapon: 'dual_sabers',
    aura: 'phoenix_blaze',
  };

  const config: CharacterConfig = {
    name: matchedPreset.characterName,
    class: matchedPreset.class,
    gender: matchedPreset.gender,
    title: matchedPreset.title,
    avatarUrl,
    avatarType: 'SPRITE',
    spriteParts,
    gameOrigin: matchedPreset.game.includes('FREE FIRE')
      ? 'FREE_FIRE'
      : matchedPreset.game.includes('PUBG')
      ? 'PUBG'
      : 'SOLO_LEVELING',
    abilityName: matchedPreset.abilityName,
    abilityBuff: matchedPreset.abilityBuff,
    humanSpecs: {
      physique: matchedPreset.physique,
      faceAndEyes: matchedPreset.faceAndEyes,
      torsoAndOutfit: matchedPreset.torsoAndOutfit,
      armsAndGloves: `Muscular arms wielding ${matchedPreset.weapon}`,
      legsAndBoots: 'Reinforced combat trousers and tactical assault boots',
    },
  };

  return {
    config,
    presetMatch: matchedPreset,
  };
}
