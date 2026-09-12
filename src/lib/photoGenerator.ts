import { AvatarStyle, CharacterClass, CharacterGender, SpritePartsConfig } from './types';
import { HERO_GAME_ART } from './characterArt/heroArt';

export interface HumanBodySpecs {
  physique: string;
  faceAndEyes: string;
  torsoAndOutfit: string;
  armsAndGloves: string;
  legsAndBoots: string;
}

export interface HeroPreset {
  id: string;
  name: string;
  gameInspiration: 'FREE_FIRE' | 'PUBG' | 'SOLO_LEVELING';
  inspirationLabel: string;
  class: CharacterClass;
  gender: CharacterGender;
  title: string;
  rarity: 'MYTHIC' | 'LEGENDARY' | 'EPIC';
  quote: string;
  ability: {
    name: string;
    description: string;
    icon: string;
    buffText: string;
  };
  battleStats: {
    winRate: number;
    kdRatio: number;
    agility: number;
    combatPower: number;
  };
  portraitUrl: string; // High-resolution authentic human character splash art
  humanSpecs: HumanBodySpecs;
  parts: SpritePartsConfig;
  description: string;
}

/**
 * Curated AAA Roster of 10 Highly Attractive Human Characters
 * Inspired by Free Fire, PUBG Mobile, and Solo Leveling
 */
export const HERO_PRESETS: HeroPreset[] = [
  // 1. FREE FIRE - KELLY THE SWIFT
  {
    id: 'hero-ff-kelly',
    name: 'Kelly "The Swift"',
    gameInspiration: 'FREE_FIRE',
    inspirationLabel: 'Free Fire • Kelly The Swift',
    class: 'HUNTRESS',
    gender: 'FEMALE',
    title: 'Awakened Phoenix Sprinter',
    rarity: 'MYTHIC',
    quote: "Run faster than your doubts! No habit can outpace my sprint velocity.",
    ability: {
      name: 'Deadly Velocity',
      description: 'Activates sprint boost, multiplying task XP and streak momentum by +20%.',
      icon: '⚡',
      buffText: '+20% Sprint Speed & Momentum',
    },
    battleStats: { winRate: 84, kdRatio: 4.8, agility: 99, combatPower: 3100 },
    portraitUrl: HERO_GAME_ART['hero-ff-kelly'],
    humanSpecs: {
      physique: 'Toned Athletic Sprinter Physique',
      faceAndEyes: 'Radiant facial symmetry, sparkling amber eyes, determined battle smile',
      torsoAndOutfit: 'Yellow aerodynamic athletic track jacket with black racing stripes and Kevlar inner vest',
      armsAndGloves: 'Toned muscular arms, carbon-composite wrist bracers, fingerless combat gloves',
      legsAndBoots: 'Streamlined athletic leggings with dual pistol holsters and speed-sprint boots',
    },
    description: 'Free Fire\'s most beloved and attractive heroine. Awakened with blazing golden phoenix embers, turning daily IRL tasks into high-octane speedruns.',
    parts: {
      gender: 'FEMALE',
      body: 'fair',
      hair: 'kelly_freefire',
      hairColor: '#fbbf24',
      outfit: 'kelly_tracksuit',
      outfitColor: '#eab308',
      weapon: 'dual_sabers',
      aura: 'phoenix_blaze',
    },
  },

  // 2. PUBG - LONE SURVIVOR (LEVEL 3 HELMET)
  {
    id: 'hero-pubg-lone-survivor',
    name: 'PUBG Lone Survivor',
    gameInspiration: 'PUBG',
    inspirationLabel: 'PUBG • Lone Survivor (Level 3)',
    class: 'WARRIOR',
    gender: 'MALE',
    title: 'Winner Winner Chicken Dinner Legend',
    rarity: 'MYTHIC',
    quote: "Winner Winner Chicken Dinner! Solidify discipline under heavy fire.",
    ability: {
      name: 'Level 3 Spetsnaz Armor',
      description: 'High-grade ballistic protection grants +25% willpower and blocks distraction loss.',
      icon: '🪖',
      buffText: '+25% Willpower & Damage Shield',
    },
    battleStats: { winRate: 88, kdRatio: 5.4, agility: 92, combatPower: 3350 },
    portraitUrl: HERO_GAME_ART['hero-pubg-lone-survivor'],
    humanSpecs: {
      physique: 'Hardened Military Commando Build',
      faceAndEyes: 'Strong chiseled jawline, intense focused commando gaze under ballistic visor',
      torsoAndOutfit: 'Crisp white collared dress shirt, loosened red necktie, leather shoulder holster',
      armsAndGloves: 'Muscular rolled-up sleeves, tactical leather fingerless shooting gloves holding M416',
      legsAndBoots: 'Heavy-duty tactical cargo trousers, knee pads, combat assault boots',
    },
    description: 'The iconic protagonist of PUBG Mobile. Wearing the legendary Level 3 Spetsnaz helmet, white collared shirt with red tie, and tactical holster.',
    parts: {
      gender: 'MALE',
      body: 'fair',
      hair: 'pubg_spetsnaz',
      hairColor: '#334155',
      outfit: 'pubg_suit',
      outfitColor: '#f8fafc',
      weapon: 'pubg_m416',
      aura: 'airdrop_smoke',
    },
  },

  // 3. FREE FIRE - DJ ALOK
  {
    id: 'hero-ff-alok',
    name: 'DJ Alok "Beat Master"',
    gameInspiration: 'FREE_FIRE',
    inspirationLabel: 'Free Fire • DJ Alok',
    class: 'PALADIN',
    gender: 'MALE',
    title: 'Soundwave Apex & Beat Maestro',
    rarity: 'MYTHIC',
    quote: "Feel the frequency! Music heals the mind and ignites unstoppable focus.",
    ability: {
      name: 'Drop The Beat',
      description: 'Creates a 5-meter music aura restoring +15 Focus Mana and granting +15% XP.',
      icon: '🎧',
      buffText: '+15 HP/Mana Regen & Audio Aura',
    },
    battleStats: { winRate: 86, kdRatio: 5.1, agility: 95, combatPower: 3250 },
    portraitUrl: HERO_GAME_ART['hero-ff-alok'],
    humanSpecs: {
      physique: 'Chiseled Muscular Athletic Build',
      faceAndEyes: 'Ultra-handsome facial contours, neat designer beard, gold aviator sunglasses',
      torsoAndOutfit: 'Tactical black DJ duster coat with gold-trimmed cybernetic circuitry and open collar',
      armsAndGloves: 'Muscular defined forearms, gold-accented audio controllers on wrists',
      legsAndBoots: 'Designer dark combat joggers with gold side stripes and limited-edition sneakers',
    },
    description: 'Free Fire\'s world-famous charismatic DJ hero. Features styled undercut, groomed beard, gold sunglasses, and tactical black DJ coat with holographic soundwaves.',
    parts: {
      gender: 'MALE',
      body: 'tanned',
      hair: 'alok_hair',
      hairColor: '#0f172a',
      outfit: 'alok_coat',
      outfitColor: '#0f172a',
      weapon: 'dual_sabers',
      aura: 'soundwave_beat',
    },
  },

  // 4. PUBG - VALKYRIE COMMANDO (FEMALE SNIPER)
  {
    id: 'hero-pubg-valkyrie',
    name: 'Valkyrie Commando',
    gameInspiration: 'PUBG',
    inspirationLabel: 'PUBG • Valkyrie Sniper',
    class: 'HUNTRESS',
    gender: 'FEMALE',
    title: 'Ghost Sniper of Pochinki & AWM Queen',
    rarity: 'MYTHIC',
    quote: "One shot, one milestone. Zero room for hesitation.",
    ability: {
      name: '8x Precision Scope',
      description: 'Pinpoint laser targeting provides +30% Critical Hit Chance on difficult quests.',
      icon: '🎯',
      buffText: '+30% Critical Hit Chance',
    },
    battleStats: { winRate: 87, kdRatio: 5.3, agility: 96, combatPower: 3300 },
    portraitUrl: HERO_GAME_ART['hero-pubg-valkyrie'],
    humanSpecs: {
      physique: 'Lean Muscular Spec-Ops Physique',
      faceAndEyes: 'High cheekbones, piercing hazel-green eyes with laser-sharp sniper focus, subtle warpaint',
      torsoAndOutfit: 'Fitted desert digital camo shirt with high-tech plate carrier vest and magazine pouches',
      armsAndGloves: 'Toned arms with sniper sleeve brace, carbon knuckle tactical gloves gripping AWM',
      legsAndBoots: 'Reinforced tactical cargo trousers, thigh holster, desert assault boots',
    },
    description: 'PUBG\'s lethal and stunning tactical female operative. Equipped with ghillie camouflage accents, tactical headset, and pinpoint AWM sniper precision.',
    parts: {
      gender: 'FEMALE',
      body: 'fair',
      hair: 'pubg_tactical_pony',
      hairColor: '#78350f',
      outfit: 'pubg_tactical_vest',
      outfitColor: '#1e293b',
      weapon: 'pubg_m416',
      aura: 'desert_storm',
    },
  },

  // 5. FREE FIRE - MOCO
  {
    id: 'hero-ff-moco',
    name: 'Moco "Cyber Matrix"',
    gameInspiration: 'FREE_FIRE',
    inspirationLabel: 'Free Fire • Moco Hacker',
    class: 'CYBER_VALKYRIE',
    gender: 'FEMALE',
    title: 'Grand Infiltrator of the Neural Grid',
    rarity: 'LEGENDARY',
    quote: "Firewalls bypassed. Your next achievement has already been tagged.",
    ability: {
      name: 'Hacker\'s Eye',
      description: 'Tags upcoming milestones and reveals hidden daily gold bonus drops.',
      icon: '👁️',
      buffText: '+20% Extra Gold & Hidden Drops',
    },
    battleStats: { winRate: 80, kdRatio: 4.6, agility: 98, combatPower: 2950 },
    portraitUrl: HERO_GAME_ART['hero-ff-moco'],
    humanSpecs: {
      physique: 'Agile Cybernetic Infiltrator Body',
      faceAndEyes: 'Futuristic facial aesthetic, neon turquoise eyeliner, holographic digital retinal HUD',
      torsoAndOutfit: 'Nanotech carbon hacker crop vest with pulsating turquoise LED traces and high collar',
      armsAndGloves: 'Full cybernetic arm sleeve with data-port tattoos and tactile hacking gloves',
      legsAndBoots: 'Tactical cyber-pants with nanite pockets and glowing magnetic hover-boots',
    },
    description: 'Free Fire\'s celebrated cyber hacker. Features neon turquoise dreadlocks, digital HUD visors, and nanotech cybernetics that automate complex goals.',
    parts: {
      gender: 'FEMALE',
      body: 'cyber',
      hair: 'moco_dreads',
      hairColor: '#06b6d4',
      outfit: 'moco_cyber',
      outfitColor: '#0891b2',
      weapon: 'dual_sabers',
      aura: 'cyber_matrix',
    },
  },

  // 6. PUBG - GOLDEN PHARAOH X-SUIT
  {
    id: 'hero-pubg-pharaoh',
    name: 'Golden Pharaoh',
    gameInspiration: 'PUBG',
    inspirationLabel: 'PUBG • Golden Pharaoh X-Suit',
    class: 'PALADIN',
    gender: 'MALE',
    title: 'Eternal Sovereign of the Desert Sun',
    rarity: 'MYTHIC',
    quote: "Bow before the divine sun! Order and discipline will prevail.",
    ability: {
      name: 'Solar Ascendance',
      description: 'Radiant 24k gold aura grants +40% Gold GP loot from all habit completions.',
      icon: '👑',
      buffText: '+40% Gold Loot Multiplier',
    },
    battleStats: { winRate: 92, kdRatio: 5.9, agility: 94, combatPower: 3500 },
    portraitUrl: HERO_GAME_ART['hero-pubg-pharaoh'],
    humanSpecs: {
      physique: 'God-Like Regal Warrior Physique',
      faceAndEyes: 'Noble pharaonic features, glowing amber eyes with divine kohl eyeliner',
      torsoAndOutfit: '24-karat solid gold sculpted pectoral armor with lapis lazuli inlays and falcon wings',
      armsAndGloves: 'Gilded battle bracers engraved with ancient hieroglyphs of willpower',
      legsAndBoots: 'Royal Egyptian golden war skirt over armored mesh and gilded greaves',
    },
    description: 'The most prestigious Mythic X-Suit in PUBG Mobile. Radiant with 24k gold falcon wings, glowing amber eyes, and ancient Egyptian celestial battle plate.',
    parts: {
      gender: 'MALE',
      body: 'tanned',
      hair: 'pubg_pharaoh_headdress',
      hairColor: '#f59e0b',
      outfit: 'pubg_pharaoh_armor',
      outfitColor: '#d97706',
      weapon: 'spear',
      aura: 'pharaoh_gold',
    },
  },

  // 7. FREE FIRE - HAYATO
  {
    id: 'hero-ff-hayato',
    name: 'Hayato Shimada',
    gameInspiration: 'FREE_FIRE',
    inspirationLabel: 'Free Fire • Hayato Bushido',
    class: 'WARRIOR',
    gender: 'MALE',
    title: 'Scorching Heir of the Shimada Katana',
    rarity: 'LEGENDARY',
    quote: "Honor is not given—it is forged in the furnace of discipline!",
    ability: {
      name: 'Art of Bushido',
      description: 'Increases armor penetration and XP rewards by +25% on Boss Raids.',
      icon: '⚔️',
      buffText: '+25% Raid Boss Damage & XP',
    },
    battleStats: { winRate: 83, kdRatio: 4.7, agility: 91, combatPower: 3020 },
    portraitUrl: HERO_GAME_ART['hero-ff-hayato'],
    humanSpecs: {
      physique: 'Muscular Battle-Trained Ronin Physique',
      faceAndEyes: 'Handsome Japanese samurai warrior face, honorable scar on cheek, intense dark eyes',
      torsoAndOutfit: 'Traditional navy-blue and crimson combat haori worn over modern tactical body armor',
      armsAndGloves: 'Strong scarred forearms with wrapped leather gauntlets gripping the Shimada katana',
      legsAndBoots: 'Loose-fitting samurai combat trousers, reinforced shin guards, traditional split-toe boots',
    },
    description: 'Free Fire\'s legendary samurai. Strikes with incandescent flame slashes and impenetrable bushido resolve.',
    parts: {
      gender: 'MALE',
      body: 'tanned',
      hair: 'hayato_ponytail',
      hairColor: '#0f172a',
      outfit: 'hayato_haori',
      outfitColor: '#1e3a8a',
      weapon: 'katana',
      aura: 'fire',
    },
  },

  // 8. FREE FIRE - CHRONO
  {
    id: 'hero-ff-chrono',
    name: 'Chrono "Time Warper"',
    gameInspiration: 'FREE_FIRE',
    inspirationLabel: 'Free Fire • Chrono',
    class: 'CYBER_HERO',
    gender: 'MALE',
    title: 'Cyber Mercenary & Time Guardian',
    rarity: 'MYTHIC',
    quote: "Time waits for no one. Master your hours, master your destiny.",
    ability: {
      name: 'Time Turner',
      description: 'Deploys a temporal force field preventing streak reset if a daily habit is missed.',
      icon: '🛡️',
      buffText: 'Free Daily Streak Protection',
    },
    battleStats: { winRate: 85, kdRatio: 5.0, agility: 94, combatPower: 3180 },
    portraitUrl: HERO_GAME_ART['hero-ff-chrono'],
    humanSpecs: {
      physique: 'Peak International Athletic Body',
      faceAndEyes: 'Handsome angular jawline, confident cybernetic gaze with temporal blue eye glint',
      torsoAndOutfit: 'High-tech carbon-fiber trench coat with glowing blue energy conduits and magnetic collar',
      armsAndGloves: 'Titanium-alloy shoulder pauldrons, biometric chrono gauntlets generating force fields',
      legsAndBoots: 'Nanotech armored combat trousers, kinetic energy absorption boots',
    },
    description: 'Free Fire\'s futuristic operative in sleek carbon armor with glowing cyan energy shields that manipulate the flow of time.',
    parts: {
      gender: 'MALE',
      body: 'fair',
      hair: 'chrono_hair',
      hairColor: '#0f172a',
      outfit: 'chrono_suit',
      outfitColor: '#0f172a',
      weapon: 'dual_sabers',
      aura: 'chrono_shield',
    },
  },

  // 9. PUBG - DESERT ASSASSIN (FEMALE SPEC-OPS)
  {
    id: 'hero-pubg-desert',
    name: 'Miramar Desert Assassin',
    gameInspiration: 'PUBG',
    inspirationLabel: 'PUBG • Desert Assassin',
    class: 'ROGUE',
    gender: 'FEMALE',
    title: 'Miramar Phantom & Quickdraw Ace',
    rarity: 'LEGENDARY',
    quote: "Fast in the storm, silent in victory. Focus until the dinner is won.",
    ability: {
      name: 'Desert Camouflage',
      description: 'Blends into the storm, granting +25% Focus Mana conservation on deep work.',
      icon: '🌪️',
      buffText: '+25% Deep Work Focus Mana',
    },
    battleStats: { winRate: 82, kdRatio: 4.9, agility: 98, combatPower: 3060 },
    portraitUrl: HERO_GAME_ART['hero-pubg-desert'],
    humanSpecs: {
      physique: 'Agile Toned Desert Operative Body',
      faceAndEyes: 'Sun-kissed complexion, golden wind-swept bob, ballistic goggles on forehead, amber gaze',
      torsoAndOutfit: 'Tactical sand-camo crop vest with military web harness and desert shemagh scarf',
      armsAndGloves: 'Toned arms with utility tactical wrist bands, leather shooting gloves',
      legsAndBoots: 'Desert utility cargo trousers, drop-leg holster with quickdraw pistols, tactical sand boots',
    },
    description: 'Elite female PUBG operative in tactical crop vest, combat utility harness, and ballistic goggles, ruling Miramar with unmatched agility.',
    parts: {
      gender: 'FEMALE',
      body: 'tanned',
      hair: 'pubg_desert_bob',
      hairColor: '#d97706',
      outfit: 'pubg_desert_vest',
      outfitColor: '#78350f',
      weapon: 'pubg_m416',
      aura: 'desert_storm',
    },
  },

  // 10. SOLO LEVELING - SUNG JIN-WOO
  {
    id: 'hero-sl-jinwoo',
    name: 'Sung Jin-Woo',
    gameInspiration: 'SOLO_LEVELING',
    inspirationLabel: 'Solo Leveling • Shadow Sovereign',
    class: 'ROGUE',
    gender: 'MALE',
    title: 'Monarch of Shadows & Void Emperor',
    rarity: 'MYTHIC',
    quote: "Arise. Every cleared task becomes an eternal soldier in my shadow army.",
    ability: {
      name: 'Shadow Extraction',
      description: 'Extracts defeated tasks into shadow minions granting +30% permanent XP growth.',
      icon: '🌑',
      buffText: '+30% Permanent XP Multiplier',
    },
    battleStats: { winRate: 99, kdRatio: 6.2, agility: 100, combatPower: 3900 },
    portraitUrl: HERO_GAME_ART['hero-sl-jinwoo'],
    humanSpecs: {
      physique: 'Tall Slender Muscular Sovereign Physique',
      faceAndEyes: 'Sharp attractive Korean manhwa facial contour, glowing electric cyan pupils, calm dominance',
      torsoAndOutfit: 'Midnight gothic high-collar duster coat flowing with spectral purple shadow tendrils',
      armsAndGloves: 'Slender vascular forearms, dark combat gloves gripping glowing Kasaka and Rasaka daggers',
      legsAndBoots: 'Tailored dark trousers, shadowy mist trailing around high-tier hunter boots',
    },
    description: 'The legendary Shadow Monarch from Solo Leveling. Shrouded in flowing midnight coats and glowing electric cyan gaze, extracting discipline from chaos.',
    parts: {
      gender: 'MALE',
      body: 'fair',
      hair: 'jinwoo_shadow',
      hairColor: '#0f172a',
      outfit: 'jinwoo_duster',
      outfitColor: '#020617',
      weapon: 'shadow_daggers',
      aura: 'shadow_monarch',
    },
  },
];

/**
 * Procedural Battle Royale AAA Vector Character Renderer
 */
export function generateProceduralSprite(
  parts: SpritePartsConfig,
  charClass: CharacterClass
): string {
  const {
    gender = 'FEMALE',
    body = 'fair',
    hair = 'kelly_freefire',
    hairColor = '#fbbf24',
    outfit = 'kelly_tracksuit',
    outfitColor = '#eab308',
    weapon = 'dual_sabers',
    aura = 'phoenix_blaze',
  } = parts;

  const isFemale = gender === 'FEMALE';

  // Skin tones with soft highlight and ambient shadow
  const skinPalettes: Record<string, { base: string; shadow: string; highlight: string; blush: string }> = {
    fair: { base: '#fde047', shadow: '#fbbf24', highlight: '#fef08a', blush: '#fb7185' },
    ivory: { base: '#fef3c7', shadow: '#fde68a', highlight: '#ffffff', blush: '#f43f5e' },
    tanned: { base: '#f59e0b', shadow: '#d97706', highlight: '#fde68a', blush: '#e11d48' },
    dark: { base: '#92400e', shadow: '#78350f', highlight: '#b45309', blush: '#be123c' },
    elf: { base: '#a7f3d0', shadow: '#6ee7b7', highlight: '#d1fae5', blush: '#34d399' },
    cyber: { base: '#94a3b8', shadow: '#64748b', highlight: '#cbd5e1', blush: '#38bdf8' },
  };
  const skin = skinPalettes[body] || skinPalettes.fair;

  let auraBackSvg = '';
  let auraFrontSvg = '';

  if (aura === 'phoenix_blaze') {
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#fireBackGlow)" opacity="0.65" filter="url(#glowBlur)" />
      <path d="M70,280 C30,200 40,110 120,60 C80,120 90,190 120,240 Z" fill="url(#phoenixGrad)" opacity="0.75" />
      <path d="M330,280 C370,200 360,110 280,60 C320,120 310,190 280,240 Z" fill="url(#phoenixGrad)" opacity="0.75" />
      <circle cx="90" cy="140" r="3.5" fill="#fef08a" opacity="0.9" />
      <circle cx="310" cy="130" r="4" fill="#fef08a" opacity="0.9" />
      <circle cx="60" cy="210" r="2.5" fill="#f97316" opacity="0.8" />
      <circle cx="340" cy="220" r="3" fill="#f97316" opacity="0.8" />
    `;
    auraFrontSvg = `
      <circle cx="110" cy="300" r="2.5" fill="#fed7aa" opacity="0.9" />
      <circle cx="290" cy="310" r="3" fill="#fed7aa" opacity="0.9" />
      <circle cx="200" cy="360" r="3.5" fill="#f97316" opacity="0.8" />
    `;
  } else if (aura === 'airdrop_smoke') {
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#airdropSmokeGlow)" opacity="0.7" filter="url(#glowBlur)" />
      <path d="M60,340 Q100,220 80,140 Q140,200 110,290 Z" fill="#dc2626" opacity="0.5" filter="url(#glowBlur)" />
      <path d="M340,340 Q300,220 320,140 Q260,200 290,290 Z" fill="#dc2626" opacity="0.5" filter="url(#glowBlur)" />
      <rect x="175" y="60" width="50" height="35" rx="3" fill="#991b1b" stroke="#3b82f6" stroke-width="2" opacity="0.7" />
      <rect x="175" y="60" width="50" height="12" fill="#1d4ed8" opacity="0.85" />
    `;
  } else if (aura === 'soundwave_beat') {
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#alokGlow)" opacity="0.65" filter="url(#glowBlur)" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#22d3ee" stroke-width="2" stroke-dasharray="12,12" opacity="0.7" />
      <circle cx="200" cy="200" r="125" fill="none" stroke="#facc15" stroke-width="2" stroke-dasharray="8,16" opacity="0.75" />
      <rect x="65" y="160" width="6" height="40" rx="3" fill="#22d3ee" opacity="0.8" />
      <rect x="75" y="140" width="6" height="60" rx="3" fill="#22d3ee" opacity="0.9" />
      <rect x="85" y="150" width="6" height="50" rx="3" fill="#facc15" opacity="0.8" />
      <rect x="310" y="150" width="6" height="50" rx="3" fill="#facc15" opacity="0.8" />
      <rect x="320" y="140" width="6" height="60" rx="3" fill="#22d3ee" opacity="0.9" />
      <rect x="330" y="160" width="6" height="40" rx="3" fill="#22d3ee" opacity="0.8" />
    `;
  } else if (aura === 'desert_storm') {
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#desertGlow)" opacity="0.75" filter="url(#glowBlur)" />
      <polygon points="200,40 220,120 200,105 180,120" fill="#f59e0b" opacity="0.5" />
      <path d="M70,320 Q130,220 200,310 Q270,220 330,320 Z" fill="#b45309" opacity="0.3" filter="url(#glowBlur)" />
    `;
  } else if (aura === 'pharaoh_gold') {
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#holyGlow)" opacity="0.75" filter="url(#glowBlur)" />
      <path d="M75,250 C25,170 45,70 145,50 C120,110 110,180 140,230 Z" fill="url(#goldGrad)" opacity="0.8" />
      <path d="M325,250 C375,170 355,70 255,50 C280,110 290,180 260,230 Z" fill="url(#goldGrad)" opacity="0.8" />
    `;
  } else if (aura === 'chrono_shield') {
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#chronoGlow)" opacity="0.75" filter="url(#glowBlur)" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="14,10" opacity="0.85" />
    `;
  } else if (aura === 'shadow_monarch') {
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#shadowBackGlow)" opacity="0.85" filter="url(#glowBlur)" />
      <path d="M60,320 Q90,180 130,80 Q150,160 110,270 Z" fill="#1e1b4b" opacity="0.65" />
      <path d="M340,320 Q310,180 270,80 Q250,160 290,270 Z" fill="#1e1b4b" opacity="0.65" />
      <polyline points="100,240 120,210 112,190 135,160" fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0.9" filter="url(#sharpGlow)" />
      <polyline points="300,240 280,210 288,190 265,160" fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0.9" filter="url(#sharpGlow)" />
    `;
  } else {
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#fireBackGlow)" opacity="0.7" filter="url(#glowBlur)" />
      <path d="M100,320 Q130,170 180,80 Q190,190 140,290 Z" fill="#dc2626" opacity="0.6" />
      <path d="M300,320 Q270,170 220,80 Q210,190 260,290 Z" fill="#ea580c" opacity="0.6" />
    `;
  }

  let eyesSvg = '';
  let headgearSvg = '';
  const isSpetsnaz = hair === 'pubg_spetsnaz';

  if (isSpetsnaz) {
    headgearSvg = `
      <path d="M120,165 C120,80 280,80 280,165 L275,235 C275,260 125,260 125,235 Z" fill="#334155" stroke="#1e293b" stroke-width="3" />
      <path d="M128,155 C135,95 265,95 272,155 Z" fill="#475569" opacity="0.5" />
      <path d="M135,165 L265,165 L260,205 L140,205 Z" fill="#1e293b" stroke="#0f172a" stroke-width="3" />
      <polygon points="144,172 256,172 252,198 148,198" fill="#090d16" />
      <polygon points="152,176 210,176 195,194 156,194" fill="#38bdf8" opacity="0.6" filter="url(#sharpGlow)" />
      <line x1="145" y1="185" x2="255" y2="185" stroke="#0284c7" stroke-width="1" opacity="0.8" />
      <circle cx="132" cy="185" r="3" fill="#94a3b8" />
      <circle cx="268" cy="185" r="3" fill="#94a3b8" />
    `;
  } else if (isFemale) {
    let irisColor1 = '#fbbf24';
    let irisColor2 = '#d97706';
    if (hair === 'moco_dreads') {
      irisColor1 = '#22d3ee'; irisColor2 = '#0891b2';
    } else if (hair === 'pubg_tactical_pony' || hair === 'pubg_desert_bob') {
      irisColor1 = '#34d399'; irisColor2 = '#059669';
    }

    eyesSvg = `
      <g id="leftEye">
        <path d="M150,185 Q165,174 182,185 Q165,195 150,185 Z" fill="#ffffff" />
        <ellipse cx="166" cy="185" rx="9" ry="10" fill="${irisColor2}" />
        <ellipse cx="166" cy="187" rx="7" ry="7" fill="${irisColor1}" />
        <circle cx="166" cy="186" r="4" fill="#0f172a" />
        <circle cx="163" cy="182" r="2.8" fill="#ffffff" />
        <circle cx="169" cy="189" r="1.5" fill="#ffffff" opacity="0.85" />
        <path d="M148,185 Q165,172 184,182" fill="none" stroke="#090d16" stroke-width="3" stroke-linecap="round" />
        <path d="M148,171 Q165,163 182,168" fill="none" stroke="${hairColor}" stroke-width="3" stroke-linecap="round" />
      </g>
      <g id="rightEye">
        <path d="M218,185 Q235,174 250,185 Q235,195 218,185 Z" fill="#ffffff" />
        <ellipse cx="234" cy="185" rx="9" ry="10" fill="${irisColor2}" />
        <ellipse cx="234" cy="187" rx="7" ry="7" fill="${irisColor1}" />
        <circle cx="234" cy="186" r="4" fill="#0f172a" />
        <circle cx="231" cy="182" r="2.8" fill="#ffffff" />
        <circle cx="237" cy="189" r="1.5" fill="#ffffff" opacity="0.85" />
        <path d="M216,182 Q235,172 252,185" fill="none" stroke="#090d16" stroke-width="3" stroke-linecap="round" />
        <path d="M218,168 Q235,163 252,171" fill="none" stroke="${hairColor}" stroke-width="3" stroke-linecap="round" />
      </g>
      <ellipse cx="152" cy="198" rx="14" ry="6" fill="${skin.blush}" opacity="0.4" filter="url(#glowBlur)" />
      <ellipse cx="248" cy="198" rx="14" ry="6" fill="${skin.blush}" opacity="0.4" filter="url(#glowBlur)" />
      <path d="M198,198 L201,207 L197,208" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" />
      <path d="M193,222 Q200,225 207,222" fill="none" stroke="#be123c" stroke-width="2.5" stroke-linecap="round" />
      <ellipse cx="200" cy="225" rx="4" ry="2" fill="#f43f5e" opacity="0.75" />
    `;
  } else {
    let isJinWoo = hair === 'jinwoo_shadow' || outfit === 'jinwoo_duster';
    let isAlok = hair === 'alok_hair' || outfit === 'alok_coat';
    let irisGlow = isJinWoo ? '#38bdf8' : isAlok ? '#facc15' : '#f59e0b';
    let pupilColor = isJinWoo ? '#0284c7' : '#78350f';

    eyesSvg = `
      <g id="leftEyeMale">
        <polygon points="152,185 182,182 178,192 155,192" fill="#ffffff" />
        <ellipse cx="167" cy="186" rx="7" ry="7" fill="${pupilColor}" />
        <circle cx="167" cy="186" r="3.5" fill="${irisGlow}" />
        <circle cx="165" cy="184" r="1.5" fill="#ffffff" />
        <path d="M150,185 L184,181" stroke="#090d16" stroke-width="3" stroke-linecap="round" />
        <path d="M148,172 L182,168" stroke="${hairColor}" stroke-width="3.5" stroke-linecap="round" />
        ${isJinWoo ? `<circle cx="167" cy="186" r="8" fill="#38bdf8" opacity="0.4" filter="url(#glowBlur)" />` : ''}
      </g>
      <g id="rightEyeMale">
        <polygon points="218,182 248,185 245,192 222,192" fill="#ffffff" />
        <ellipse cx="233" cy="186" rx="7" ry="7" fill="${pupilColor}" />
        <circle cx="233" cy="186" r="3.5" fill="${irisGlow}" />
        <circle cx="231" cy="184" r="1.5" fill="#ffffff" />
        <path d="M216,181 L250,185" stroke="#090d16" stroke-width="3" stroke-linecap="round" />
        <path d="M218,168 L252,172" stroke="${hairColor}" stroke-width="3.5" stroke-linecap="round" />
        ${isJinWoo ? `<circle cx="233" cy="186" r="8" fill="#38bdf8" opacity="0.4" filter="url(#glowBlur)" />` : ''}
      </g>
      <path d="M198,197 L202,208 L196,209" fill="none" stroke="#b45309" stroke-width="2" stroke-linecap="round" />
      <path d="M192,223 L208,223" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />
      ${isAlok ? `
        <path d="M175,230 Q200,245 225,230 L220,242 Q200,252 180,242 Z" fill="#0f172a" />
        <rect x="145" y="176" width="44" height="20" rx="6" fill="#0f172a" stroke="#facc15" stroke-width="2" opacity="0.85" />
        <rect x="211" y="176" width="44" height="20" rx="6" fill="#0f172a" stroke="#facc15" stroke-width="2" opacity="0.85" />
        <line x1="189" y1="182" x2="211" y2="182" stroke="#facc15" stroke-width="2.5" />
      ` : ''}
    `;
  }

  let hairBackSvg = '';
  let hairFrontSvg = '';

  if (hair === 'kelly_freefire') {
    hairBackSvg = `
      <path d="M130,160 Q90,210 110,260 Q130,230 140,190 Z" fill="#d97706" />
      <path d="M270,160 Q310,210 290,260 Q270,230 260,190 Z" fill="#d97706" />
    `;
    hairFrontSvg = `
      <path d="M120,170 Q130,85 200,85 Q270,85 280,170 Q270,130 200,125 Q130,130 120,170 Z" fill="${hairColor}" />
      <path d="M125,155 Q150,185 160,195 Q165,160 175,185 Q185,160 200,190 Q215,160 225,185 Q235,160 240,195 Q250,185 275,155 Q200,110 125,155 Z" fill="${hairColor}" />
      <path d="M135,145 Q200,130 265,145" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />
    `;
  } else if (hair === 'alok_hair') {
    hairFrontSvg = `
      <path d="M125,155 Q130,70 200,68 Q270,70 275,155 Q265,115 200,110 Q135,115 125,155 Z" fill="#0f172a" />
      <path d="M135,140 Q170,105 230,105 Q265,115 260,145" fill="none" stroke="#334155" stroke-width="4" stroke-linecap="round" />
      <path d="M135,240 Q200,265 265,240" fill="none" stroke="#facc15" stroke-width="8" stroke-linecap="round" />
    `;
  } else if (hair === 'pubg_tactical_pony') {
    hairBackSvg = `
      <path d="M220,110 Q280,60 320,130 Q310,210 260,260 Q265,190 235,140 Z" fill="#581c87" />
    `;
    hairFrontSvg = `
      <path d="M120,165 Q130,85 200,85 Q270,85 280,165 Q270,125 200,120 Q130,125 120,165 Z" fill="${hairColor}" />
      <path d="M125,160 Q150,190 175,175 Q200,195 225,175 Q250,190 275,160 Q200,115 125,160 Z" fill="${hairColor}" />
      <path d="M130,150 Q200,120 270,150" fill="none" stroke="#1e293b" stroke-width="5" />
    `;
  } else if (hair === 'moco_dreads') {
    hairBackSvg = `
      <path d="M110,160 Q80,240 100,340 Q120,260 135,190 Z" fill="#0891b2" />
      <path d="M290,160 Q320,240 300,340 Q280,260 265,190 Z" fill="#0891b2" />
    `;
    hairFrontSvg = `
      <path d="M120,160 Q130,80 200,80 Q270,80 280,160 Q270,130 200,125 Q130,130 120,160 Z" fill="${hairColor}" />
      <path d="M120,160 Q105,240 125,310" fill="none" stroke="${hairColor}" stroke-width="8" stroke-linecap="round" />
      <path d="M280,160 Q295,240 275,310" fill="none" stroke="${hairColor}" stroke-width="8" stroke-linecap="round" />
    `;
  } else if (!isSpetsnaz) {
    hairFrontSvg = `
      <path d="M120,165 Q130,85 200,85 Q270,85 280,165 Q270,125 200,120 Q130,125 120,165 Z" fill="${hairColor}" />
      <path d="M125,160 Q150,190 175,175 Q200,195 225,175 Q250,190 275,160 Q200,115 125,160 Z" fill="${hairColor}" />
    `;
  }

  let outfitSvg = '';
  if (outfit === 'kelly_tracksuit') {
    outfitSvg = `
      <path d="M140,255 L110,380 L290,380 L260,255 L225,265 L200,285 L175,265 Z" fill="${outfitColor}" stroke="#ca8a04" stroke-width="2" />
      <line x1="130" y1="280" x2="115" y2="380" stroke="#090d16" stroke-width="8" />
      <line x1="270" y1="280" x2="285" y2="380" stroke="#090d16" stroke-width="8" />
      <polygon points="180,265 200,285 220,265 210,380 190,380" fill="#f8fafc" stroke="#334155" stroke-width="1.5" />
      <circle cx="200" cy="290" r="3.5" fill="#f59e0b" />
    `;
  } else if (outfit === 'pubg_suit') {
    outfitSvg = `
      <path d="M135,255 L110,380 L290,380 L265,255 L200,275 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
      <polygon points="196,275 204,275 208,350 200,365 192,350" fill="#dc2626" stroke="#991b1b" stroke-width="1" />
      <line x1="140" y1="260" x2="200" y2="360" stroke="#78350f" stroke-width="8" stroke-linecap="round" />
      <line x1="260" y1="260" x2="200" y2="360" stroke="#78350f" stroke-width="8" stroke-linecap="round" />
      <rect x="188" y="325" width="24" height="14" rx="2" fill="#d97706" />
    `;
  } else if (outfit === 'alok_coat') {
    outfitSvg = `
      <path d="M135,250 L105,380 L295,380 L265,250 L200,275 Z" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
      <line x1="140" y1="280" x2="115" y2="380" stroke="#facc15" stroke-width="4" />
      <line x1="260" y1="280" x2="285" y2="380" stroke="#facc15" stroke-width="4" />
      <rect x="180" y="310" width="40" height="25" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2" />
      <circle cx="200" cy="322" r="6" fill="#facc15" />
    `;
  } else {
    outfitSvg = `
      <path d="M135,255 L110,380 L290,380 L265,255 L200,275 Z" fill="${outfitColor}" stroke="#1e293b" stroke-width="2" />
      <polygon points="175,275 200,305 225,275 215,380 185,380" fill="#94a3b8" />
    `;
  }

  let weaponSvg = '';
  if (weapon === 'pubg_m416') {
    weaponSvg = `
      <g transform="rotate(35 300 270)">
        <rect x="290" y="80" width="14" height="260" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
        <rect x="294" y="50" width="6" height="30" fill="#0f172a" />
        <rect x="285" y="180" width="24" height="18" rx="2" fill="#0f172a" stroke="#dc2626" stroke-width="1.5" />
        <circle cx="297" cy="189" r="2.5" fill="#ef4444" filter="url(#sharpGlow)" />
        <path d="M285,240 L265,270 L275,275 L292,250 Z" fill="#0f172a" />
      </g>
    `;
  } else if (weapon === 'dual_sabers') {
    weaponSvg = `
      <g transform="rotate(-35 85 270)">
        <line x1="85" y1="130" x2="85" y2="280" stroke="#facc15" stroke-width="6" stroke-linecap="round" filter="url(#sharpGlow)" />
        <line x1="85" y1="130" x2="85" y2="280" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
        <rect x="80" y="280" width="10" height="30" rx="3" fill="#0f172a" />
      </g>
      <g transform="rotate(35 315 270)">
        <line x1="315" y1="130" x2="315" y2="280" stroke="#f97316" stroke-width="6" stroke-linecap="round" filter="url(#sharpGlow)" />
        <line x1="315" y1="130" x2="315" y2="280" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
        <rect x="310" y="280" width="10" height="30" rx="3" fill="#0f172a" />
      </g>
    `;
  } else if (weapon === 'katana') {
    weaponSvg = `
      <g transform="rotate(35 300 260)">
        <path d="M300,100 Q305,220 295,320" fill="none" stroke="#f8fafc" stroke-width="4" filter="url(#sharpGlow)" />
        <line x1="298" y1="100" x2="293" y2="320" stroke="#ea580c" stroke-width="1.5" />
        <rect x="288" y="320" width="20" height="6" rx="2" fill="#facc15" />
      </g>
    `;
  } else {
    weaponSvg = `
      <g transform="rotate(-30 90 280)">
        <polygon points="90,210 98,280 82,280" fill="#0f172a" stroke="#38bdf8" stroke-width="2" filter="url(#sharpGlow)" />
        <rect x="80" y="280" width="20" height="6" fill="#1e293b" />
      </g>
    `;
  }

  const frameSvg = `
    <rect x="8" y="8" width="384" height="384" rx="28" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.9" />
    <rect x="14" y="14" width="372" height="372" rx="22" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.65" />
    <g transform="translate(135, 14)">
      <rect x="0" y="0" width="130" height="22" rx="11" fill="#090d16" stroke="#f59e0b" stroke-width="1.5" />
      <text x="65" y="15" fill="#facc15" font-size="10" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1.5">
        ★ MYTHIC ★
      </text>
    </g>
  `;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="cardBg" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#181e36" />
          <stop offset="60%" stop-color="#0b0e1b" />
          <stop offset="100%" stop-color="#05070d" />
        </radialGradient>
        <radialGradient id="fireBackGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f97316" stop-opacity="0.85" />
          <stop offset="60%" stop-color="#ef4444" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#7c2d12" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="airdropSmokeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8" />
          <stop offset="60%" stop-color="#991b1b" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#090d16" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="alokGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.85" />
          <stop offset="60%" stop-color="#0891b2" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#082f49" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="desertGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8" />
          <stop offset="60%" stop-color="#b45309" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#451a03" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="chronoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85" />
          <stop offset="60%" stop-color="#0284c7" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#082f49" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="holyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fef08a" stop-opacity="0.85" />
          <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#78350f" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="phoenixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#f97316" />
          <stop offset="100%" stop-color="#dc2626" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="50%" stop-color="#fde047" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>
        <radialGradient id="shadowBackGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3b0764" stop-opacity="0.9" />
          <stop offset="60%" stop-color="#1e1b4b" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#030712" stop-opacity="0" />
        </radialGradient>
        <filter id="glowBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="sharpGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="400" rx="28" fill="url(#cardBg)" />
      ${auraBackSvg}
      ${hairBackSvg}
      <path d="M175,230 L165,270 L235,270 L225,230 Z" fill="${skin.shadow}" />
      <path d="M182,230 L176,260 L224,260 L218,230 Z" fill="${skin.base}" />
      <path d="M136,160 Q136,230 190,248 Q200,251 210,248 Q264,230 264,160 Q264,115 200,115 Q136,115 136,160 Z" fill="${skin.base}" stroke="#1e293b" stroke-width="1.5" />
      ${eyesSvg}
      ${hairFrontSvg}
      ${headgearSvg}
      ${outfitSvg}
      ${weaponSvg}
      ${auraFrontSvg}
      ${frameSvg}
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Transforms an uploaded photo into a 100% UNIQUE Battle Royale Character Portrait
 */
export async function generateAvatarFromPhoto(
  imageSource: string,
  style: AvatarStyle,
  seed: number = Date.now(),
  options: { pixelSize?: number; glow?: number } = {}
): Promise<{ avatarUrl: string; uniqueTitle: string; uniqueClass: string; heroId: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) throw new Error('Canvas 2D context unavailable');

        const size = 360;
        canvas.width = size;
        canvas.height = size;

        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        const imgData = ctx.getImageData(0, 0, size, size);
        const data = imgData.data;

        let totalR = 0, totalG = 0, totalB = 0;
        for (let i = 0; i < data.length; i += 16) {
          totalR += data[i];
          totalG += data[i + 1];
          totalB += data[i + 2];
        }
        const sampleCount = data.length / 16;
        const avgR = Math.round(totalR / sampleCount);
        const avgG = Math.round(totalG / sampleCount);
        const avgB = Math.round(totalB / sampleCount);

        const photoHash = Math.abs(
          (avgR * 31 + avgG * 17 + avgB * 7 + (seed % 10000)) | 0
        );

        const titles = [
          'PUBG Pochinki Victor',
          'Free Fire Booyah Apex',
          'Airdrop Phantom Specialist',
          'Level 3 Spetsnaz Veteran',
          'Miramar Quickdraw Sovereign',
          'Cyber Overdrive Enigma',
          'Bermuda Phoenix Slayer',
          'Solo Monarch of the Void',
          'Winner Winner Chicken Dinner Legend',
          'Soundwave Beat Infiltrator',
          'AWM Deathmatch Champion',
          'Eternal Sun Paladin',
        ];

        const classes = [
          'Battle Royale Apex Operative',
          'Pochinki Ghost Sniper',
          'Free Fire Rush Duelist',
          'Spetsnaz Heavy Vanguard',
          'Airdrop Assault Scout',
          'Neural Cyber Samurai',
        ];

        const uniqueTitle = titles[photoHash % titles.length];
        const uniqueClass = classes[(photoHash >> 2) % classes.length];
        const heroId = `PUBG-FF-${(photoHash % 89999 + 10000).toString(16).toUpperCase()}`;

        const pixelSize = options.pixelSize || (style === 'PIXEL_HERO' ? 5 : 4);

        for (let y = 0; y < size; y += pixelSize) {
          for (let x = 0; x < size; x += pixelSize) {
            let r = 0, g = 0, b = 0, count = 0;
            for (let dy = 0; dy < pixelSize && y + dy < size; dy++) {
              for (let dx = 0; dx < pixelSize && x + dx < size; dx++) {
                const idx = ((y + dy) * size + (x + dx)) * 4;
                r += data[idx];
                g += data[idx + 1];
                b += data[idx + 2];
                count++;
              }
            }
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);

            const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
            let finalR = r, finalG = g, finalB = b;

            if (style === 'PIXEL_HERO') {
              finalR = Math.min(255, Math.round(r / 32) * 32 + 20);
              finalG = Math.min(255, Math.round(g / 32) * 32 + 10);
              finalB = Math.round(b / 32) * 32;
            } else if (style === 'MYSTIC_ARCANE') {
              finalR = Math.floor(brightness * 190 + 45);
              finalG = Math.floor(brightness * 80 + 20);
              finalB = Math.floor(brightness * 255 + 60);
            } else if (style === 'CYBER_ROGUE') {
              if (brightness > 0.55) {
                finalR = 34; finalG = 211; finalB = 238;
              } else if (brightness > 0.3) {
                finalR = 244; finalG = 63; finalB = 94;
              } else {
                finalR = 15; finalG = 23; finalB = 42;
              }
            } else if (style === 'HOLY_PALADIN') {
              finalR = Math.floor(brightness * 255);
              finalG = Math.floor(brightness * 225 + 20);
              finalB = Math.floor(brightness * 100);
            } else if (style === 'SHADOW_ASSASSIN') {
              const mono = Math.floor(brightness * 160);
              if (brightness > 0.6) {
                finalR = 56; finalG = 189; finalB = 248;
              } else {
                finalR = mono + 25;
                finalG = mono + 10;
                finalB = mono + 40;
              }
            } else if (style === 'ANIME_LEGEND') {
              const steps = 4;
              const quantized = Math.floor(brightness * steps) / steps;
              finalR = Math.min(255, Math.floor(r * (quantized + 0.3) + 30));
              finalG = Math.min(255, Math.floor(g * (quantized + 0.3) + 20));
              finalB = Math.min(255, Math.floor(b * (quantized + 0.3) + 40));
            } else if (style === 'CELESTIAL_ASTRAL') {
              finalR = Math.floor(brightness * 240 + 30);
              finalG = Math.floor(brightness * 180 + 40);
              finalB = Math.floor(brightness * 255 + 30);
            }

            for (let dy = 0; dy < pixelSize && y + dy < size; dy++) {
              for (let dx = 0; dx < pixelSize && x + dx < size; dx++) {
                const idx = ((y + dy) * size + (x + dx)) * 4;
                data[idx] = Math.min(255, finalR);
                data[idx + 1] = Math.min(255, finalG);
                data[idx + 2] = Math.min(255, finalB);
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.35, size / 2, size / 2, size * 0.72);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, 'rgba(7, 10, 19, 0.85)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 6;
        ctx.strokeRect(3, 3, size - 6, size - 6);

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(8, 8, size - 16, size - 16);

        ctx.fillStyle = '#fbbf24';
        const runeSize = 12;
        ctx.fillRect(4, 4, runeSize, runeSize);
        ctx.fillRect(size - runeSize - 4, 4, runeSize, runeSize);
        ctx.fillRect(4, size - runeSize - 4, runeSize, runeSize);
        ctx.fillRect(size - runeSize - 4, size - runeSize - 4, runeSize, runeSize);

        ctx.fillStyle = 'rgba(9, 13, 22, 0.9)';
        ctx.fillRect(12, size - 32, 185, 22);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1;
        ctx.strokeRect(12, size - 32, 185, 22);

        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`★ ${heroId}`, 18, size - 17);

        ctx.fillStyle = 'rgba(9, 13, 22, 0.9)';
        ctx.fillRect(size / 2 - 55, 8, 110, 18);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1;
        ctx.strokeRect(size / 2 - 55, 8, 110, 18);
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('★ BOOYAH APEX ★', size / 2, 21);

        const avatarUrl = canvas.toDataURL('image/png');
        resolve({
          avatarUrl,
          uniqueTitle,
          uniqueClass,
          heroId,
        });
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error('Failed to load image source'));
    img.src = imageSource;
  });
}
