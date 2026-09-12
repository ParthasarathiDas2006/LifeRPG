import { AvatarStyle, CharacterClass, CharacterGender, SpritePartsConfig } from './types';

export interface HeroPreset {
  id: string;
  name: string;
  gameInspiration: 'FREE_FIRE' | 'SOLO_LEVELING' | 'GENSHIN_STAR_RAIL';
  inspirationLabel: string;
  class: CharacterClass;
  gender: CharacterGender;
  title: string;
  rarity: 'S' | 'SS' | 'SSS';
  quote: string;
  stats: {
    atk: number;
    spd: number;
    arc: number;
    def: number;
  };
  parts: SpritePartsConfig;
  description: string;
}

/**
 * Curated AAA Roster inspired by iconic heroes from Free Fire, Solo Leveling, Genshin Impact & Honkai: Star Rail
 */
export const HERO_PRESETS: HeroPreset[] = [
  // 1. FREE FIRE - KELLY
  {
    id: 'hero-kelly-phoenix',
    name: 'Kelly "The Swift"',
    gameInspiration: 'FREE_FIRE',
    inspirationLabel: 'Free Fire • S-Rank Sprinter',
    class: 'HUNTRESS',
    gender: 'FEMALE',
    title: 'Flash Sprinter & Phoenix Blaze',
    rarity: 'SSS',
    quote: "Run faster than your doubts! No habit can outpace my sprint.",
    stats: { atk: 88, spd: 99, arc: 70, def: 80 },
    description: 'Free Fire\'s most famous speedster. Awakened with blazing phoenix adrenaline, turning high-intensity productivity sprints into unstoppable momentum.',
    parts: {
      gender: 'FEMALE',
      body: 'fair',
      hair: 'kelly_bob',
      hairColor: '#fbbf24',
      outfit: 'kelly_track',
      outfitColor: '#eab308',
      weapon: 'dual_sabers',
      aura: 'phoenix_blaze',
    },
  },

  // 2. SOLO LEVELING - SUNG JIN-WOO
  {
    id: 'hero-jinwoo-shadow',
    name: 'Sung Jin-Woo',
    gameInspiration: 'SOLO_LEVELING',
    inspirationLabel: 'Solo Leveling • Shadow Sovereign',
    class: 'ROGUE',
    gender: 'MALE',
    title: 'Monarch of Shadows & Void Emperor',
    rarity: 'SSS',
    quote: "Arise. Every cleared task becomes a soldier in my shadow army.",
    stats: { atk: 100, spd: 96, arc: 95, def: 88 },
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

  // 3. GENSHIN / STAR RAIL - RAIDEN ACHERON
  {
    id: 'hero-raiden-acheron',
    name: 'Raiden Acheron',
    gameInspiration: 'GENSHIN_STAR_RAIL',
    inspirationLabel: 'Genshin / Star Rail • Thunder Empress',
    class: 'VALKYRIE',
    gender: 'FEMALE',
    title: 'Goddess of the Violet Thunderstorm',
    rarity: 'SSS',
    quote: "Torn to oblivion! Cleave hesitation with the eternal lightning.",
    stats: { atk: 98, spd: 92, arc: 96, def: 85 },
    description: 'Inspired by Raiden Shogun and Acheron. Wields a dimension-slashing lightning katana adorned in royal gold-filigree battle kimono and crackling plasma.',
    parts: {
      gender: 'FEMALE',
      body: 'ivory',
      hair: 'raiden_braid',
      hairColor: '#a855f7',
      outfit: 'raiden_kimono',
      outfitColor: '#4c1d95',
      weapon: 'katana',
      aura: 'electro_storm',
    },
  },

  // 4. FREE FIRE - MOCO
  {
    id: 'hero-moco-cyber',
    name: 'Moco "Cyber Matrix"',
    gameInspiration: 'FREE_FIRE',
    inspirationLabel: 'Free Fire • Elite Hacker',
    class: 'CYBER_VALKYRIE',
    gender: 'FEMALE',
    title: 'Grand Infiltrator of the Neural Grid',
    rarity: 'SS',
    quote: "Firewalls breached. Your next milestone has already been tagged.",
    stats: { atk: 86, spd: 94, arc: 98, def: 78 },
    description: 'Free Fire\'s celebrated hacker. Features neon turquoise dreadlocks, digital HUD visors, and nanotech cybernetics that automate complex deep work.',
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

  // 5. SOLO LEVELING - CHA HAE-IN
  {
    id: 'hero-cha-haein',
    name: 'Cha Hae-In',
    gameInspiration: 'SOLO_LEVELING',
    inspirationLabel: 'Solo Leveling • Grand Sword-Saint',
    class: 'VALKYRIE',
    gender: 'FEMALE',
    title: 'Radiant Sword-Dancer of the Golden Halo',
    rarity: 'SSS',
    quote: "With a pure heart and poised blade, no trial can pierce my resolve.",
    stats: { atk: 94, spd: 95, arc: 86, def: 92 },
    description: 'Solo Leveling\'s supreme female hunter. Features flowing golden blonde hair, silver and crimson duelist plate armor, and glowing holy angelic wings.',
    parts: {
      gender: 'FEMALE',
      body: 'fair',
      hair: 'cha_blonde',
      hairColor: '#fde047',
      outfit: 'cha_armor',
      outfitColor: '#e2e8f0',
      weapon: 'spear',
      aura: 'holy_radiance',
    },
  },

  // 6. FREE FIRE - HAYATO
  {
    id: 'hero-hayato-bushido',
    name: 'Hayato Shimada',
    gameInspiration: 'FREE_FIRE',
    inspirationLabel: 'Free Fire • Flame Bushido',
    class: 'WARRIOR',
    gender: 'MALE',
    title: 'Scorching Heir of the Shimada Katana',
    rarity: 'SS',
    quote: "Honor is not given—it is forged in the furnace of discipline!",
    stats: { atk: 95, spd: 87, arc: 75, def: 93 },
    description: 'Free Fire\'s legendary samurai. Increases armor penetration as the heat of battle rises, clad in an indigo and crimson battle haori.',
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

  // 7. HONKAI: STAR RAIL - KAFKA
  {
    id: 'hero-kafka-destiny',
    name: 'Kafka "Destiny Weaver"',
    gameInspiration: 'GENSHIN_STAR_RAIL',
    inspirationLabel: 'Star Rail • Stellaron Hunter',
    class: 'SORCERESS',
    gender: 'FEMALE',
    title: 'Maestro of Arcane Whispers',
    rarity: 'SSS',
    quote: "Listen... surrender your doubts, and let destiny fulfill your goals.",
    stats: { atk: 92, spd: 91, arc: 99, def: 84 },
    description: 'Star Rail\'s iconic mystery hunter. Features wine-magenta wavy locks, spider-silk velvet duster, and hypnotic arcane threads that command destiny.',
    parts: {
      gender: 'FEMALE',
      body: 'ivory',
      hair: 'kafka_waves',
      hairColor: '#9d174d',
      outfit: 'kafka_coat',
      outfitColor: '#500724',
      weapon: 'staff',
      aura: 'arcane',
    },
  },

  // 8. GENSHIN IMPACT - ZHONGLI
  {
    id: 'hero-zhongli-geo',
    name: 'Zhongli "Geo Archon"',
    gameInspiration: 'GENSHIN_STAR_RAIL',
    inspirationLabel: 'Genshin Impact • Dragon Sovereign',
    class: 'PALADIN',
    gender: 'MALE',
    title: 'Prime of the Adepti & Lord of Geo',
    rarity: 'SSS',
    quote: "I will have order! Solidify your habits and become unshakeable.",
    stats: { atk: 91, spd: 82, arc: 95, def: 100 },
    description: 'Genshin\'s God of Contracts. Features glowing golden dragon eyes, formal high-collar Archon trench coat with gold geo filigree, and jade barrier shields.',
    parts: {
      gender: 'MALE',
      body: 'tanned',
      hair: 'zhongli_tail',
      hairColor: '#78350f',
      outfit: 'zhongli_coat',
      outfitColor: '#451a03',
      weapon: 'spear',
      aura: 'celestial',
    },
  },
];

/**
 * Procedural AAA Vector Character Renderer
 * Produces crisp, beautiful 400x400 SVG artwork with layered anime shading, glowing elemental auras,
 * game-inspired costumes, and glowing SSS-Tier frames.
 */
export function generateProceduralSprite(
  parts: SpritePartsConfig,
  charClass: CharacterClass
): string {
  const {
    gender = 'FEMALE',
    body = 'fair',
    hair = 'kelly_bob',
    hairColor = '#fbbf24',
    outfit = 'kelly_track',
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

  // 1. Dynamic Elemental Aura Rendering
  let auraBackSvg = '';
  let auraFrontSvg = '';

  if (aura === 'phoenix_blaze') {
    // Free Fire Kelly Phoenix Aura
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#fireBackGlow)" opacity="0.65" filter="url(#glowBlur)" />
      <!-- Radiant fiery wings / speed flame streaks -->
      <path d="M70,280 C30,200 40,110 120,60 C80,120 90,190 120,240 Z" fill="url(#phoenixGrad)" opacity="0.7" />
      <path d="M330,280 C370,200 360,110 280,60 C320,120 310,190 280,240 Z" fill="url(#phoenixGrad)" opacity="0.7" />
      <circle cx="90" cy="140" r="3.5" fill="#fef08a" opacity="0.8" />
      <circle cx="310" cy="130" r="4" fill="#fef08a" opacity="0.8" />
      <circle cx="60" cy="210" r="2.5" fill="#f97316" opacity="0.7" />
      <circle cx="340" cy="220" r="3" fill="#f97316" opacity="0.7" />
    `;
    auraFrontSvg = `
      <!-- Ember particles in foreground -->
      <circle cx="110" cy="300" r="2" fill="#fed7aa" opacity="0.9" />
      <circle cx="290" cy="310" r="2.5" fill="#fed7aa" opacity="0.9" />
      <circle cx="200" cy="360" r="3" fill="#f97316" opacity="0.7" />
    `;
  } else if (aura === 'shadow_monarch') {
    // Solo Leveling Sung Jin-Woo Shadow Aura
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#shadowBackGlow)" opacity="0.85" filter="url(#glowBlur)" />
      <!-- Shadow tendrils rising upward -->
      <path d="M60,320 Q90,180 130,80 Q150,160 110,270 Z" fill="#1e1b4b" opacity="0.6" />
      <path d="M340,320 Q310,180 270,80 Q250,160 290,270 Z" fill="#1e1b4b" opacity="0.6" />
      <path d="M120,340 Q160,160 200,40 Q220,140 180,310 Z" fill="#311042" opacity="0.4" />
      <!-- Cyan lightning sparks -->
      <polyline points="100,240 120,210 112,190 135,160" fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0.85" filter="url(#sharpGlow)" />
      <polyline points="300,240 280,210 288,190 265,160" fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0.85" filter="url(#sharpGlow)" />
      <circle cx="135" cy="160" r="3" fill="#67e8f9" />
      <circle cx="265" cy="160" r="3" fill="#67e8f9" />
    `;
    auraFrontSvg = `
      <path d="M140,380 Q200,340 260,380" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
    `;
  } else if (aura === 'electro_storm') {
    // Genshin / Star Rail Raiden Electro Lightning Storm
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#electroGlow)" opacity="0.7" filter="url(#glowBlur)" />
      <!-- Crackling lightning rings -->
      <circle cx="200" cy="200" r="150" fill="none" stroke="#c084fc" stroke-width="1.5" stroke-dasharray="8,12" opacity="0.6" />
      <!-- Electric bolts -->
      <polyline points="70,120 110,160 100,180 140,220" fill="none" stroke="#e879f9" stroke-width="3" filter="url(#sharpGlow)" />
      <polyline points="330,120 290,160 300,180 260,220" fill="none" stroke="#e879f9" stroke-width="3" filter="url(#sharpGlow)" />
      <polyline points="160,50 180,90 170,105 200,130" fill="none" stroke="#a855f7" stroke-width="2" />
      <circle cx="140" cy="220" r="4" fill="#f5d0fe" />
      <circle cx="260" cy="220" r="4" fill="#f5d0fe" />
    `;
  } else if (aura === 'cyber_matrix') {
    // Free Fire Moco Cyberpunk Matrix
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#cyberBackGlow)" opacity="0.6" filter="url(#glowBlur)" />
      <!-- Digital HUD grid lines -->
      <line x1="50" y1="200" x2="350" y2="200" stroke="#06b6d4" stroke-width="1" opacity="0.35" stroke-dasharray="6,6" />
      <line x1="200" y1="50" x2="200" y2="350" stroke="#06b6d4" stroke-width="1" opacity="0.35" stroke-dasharray="6,6" />
      <circle cx="200" cy="200" r="155" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.5" stroke-dasharray="16,8" />
      <rect x="75" y="90" width="18" height="18" fill="none" stroke="#22d3ee" stroke-width="1.5" opacity="0.8" />
      <text x="78" y="103" fill="#22d3ee" font-size="9" font-family="monospace" font-weight="bold">AI</text>
      <rect x="305" y="90" width="22" height="18" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.8" />
      <text x="308" y="103" fill="#10b981" font-size="8" font-family="monospace" font-weight="bold">HUD</text>
    `;
  } else if (aura === 'holy_radiance') {
    // Solo Leveling Cha Hae-In Angelic Wings
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#holyGlow)" opacity="0.65" filter="url(#glowBlur)" />
      <!-- Angelic Feather Wings -->
      <path d="M80,240 C30,160 50,70 140,50 C120,100 110,170 140,220 Z" fill="url(#goldGrad)" opacity="0.75" />
      <path d="M320,240 C370,160 350,70 260,50 C280,100 290,170 260,220 Z" fill="url(#goldGrad)" opacity="0.75" />
      <circle cx="200" cy="110" r="60" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="4,6" opacity="0.7" />
    `;
  } else if (aura === 'fire') {
    // Hayato Flame Aura
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#fireBackGlow)" opacity="0.7" filter="url(#glowBlur)" />
      <path d="M100,320 Q130,170 180,80 Q190,190 140,290 Z" fill="#dc2626" opacity="0.6" />
      <path d="M300,320 Q270,170 220,80 Q210,190 260,290 Z" fill="#ea580c" opacity="0.6" />
    `;
  } else if (aura === 'arcane') {
    // Kafka Arcane Web
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#arcaneGlow)" opacity="0.7" filter="url(#glowBlur)" />
      <!-- Spiderweb threads -->
      <line x1="100" y1="100" x2="300" y2="300" stroke="#f43f5e" stroke-width="1" opacity="0.5" />
      <line x1="300" y1="100" x2="100" y2="300" stroke="#f43f5e" stroke-width="1" opacity="0.5" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#c084fc" stroke-width="1.5" stroke-dasharray="10,6" opacity="0.6" />
    `;
  } else {
    // celestial / default
    auraBackSvg = `
      <circle cx="200" cy="200" r="180" fill="url(#celestialGlow)" opacity="0.6" filter="url(#glowBlur)" />
      <polygon points="200,60 215,90 245,95 220,115 225,145 200,130 175,145 180,115 155,95 185,90" fill="#facc15" opacity="0.5" />
    `;
  }

  // 2. High-Quality Anime Eyes & Expressions
  let eyesSvg = '';
  if (isFemale) {
    // Gorgeous Female Anime Eyes (Genshin / Star Rail / Free Fire style)
    let irisColor1 = '#fb7185';
    let irisColor2 = '#e11d48';
    if (hair === 'raiden_braid' || outfit === 'raiden_kimono') {
      irisColor1 = '#c084fc'; irisColor2 = '#7e22ce'; // Raiden Violet
    } else if (hair === 'moco_dreads' || outfit === 'moco_cyber') {
      irisColor1 = '#22d3ee'; irisColor2 = '#0891b2'; // Moco Cyan
    } else if (hair === 'kelly_bob' || outfit === 'kelly_track') {
      irisColor1 = '#fb923c'; irisColor2 = '#c2410c'; // Kelly Amber
    } else if (hair === 'cha_blonde' || outfit === 'cha_armor') {
      irisColor1 = '#facc15'; irisColor2 = '#b45309'; // Cha Gold
    } else if (hair === 'kafka_waves' || outfit === 'kafka_coat') {
      irisColor1 = '#f43f5e'; irisColor2 = '#881337'; // Kafka Wine
    }

    eyesSvg = `
      <!-- Left Eye -->
      <g id="leftEye">
        <!-- White base -->
        <path d="M150,185 Q165,175 182,185 Q165,195 150,185 Z" fill="#ffffff" />
        <!-- Iris -->
        <ellipse cx="166" cy="185" rx="9" ry="10" fill="${irisColor2}" />
        <ellipse cx="166" cy="187" rx="7" ry="7" fill="${irisColor1}" />
        <circle cx="166" cy="186" r="4.5" fill="#0f172a" />
        <!-- Highlights -->
        <circle cx="163" cy="182" r="2.8" fill="#ffffff" />
        <circle cx="169" cy="189" r="1.5" fill="#ffffff" opacity="0.85" />
        <!-- Eyelash / Eyeliner -->
        <path d="M148,185 Q165,173 184,182" fill="none" stroke="#090d16" stroke-width="3" stroke-linecap="round" />
        <path d="M180,181 L187,178" fill="none" stroke="#090d16" stroke-width="2.5" stroke-linecap="round" />
        <path d="M150,187 Q165,195 180,188" fill="none" stroke="#334155" stroke-width="1.2" />
        <!-- Eyebrow -->
        <path d="M148,171 Q165,163 182,168" fill="none" stroke="${hairColor}" stroke-width="3" stroke-linecap="round" />
      </g>

      <!-- Right Eye -->
      <g id="rightEye">
        <!-- White base -->
        <path d="M218,185 Q235,175 250,185 Q235,195 218,185 Z" fill="#ffffff" />
        <!-- Iris -->
        <ellipse cx="234" cy="185" rx="9" ry="10" fill="${irisColor2}" />
        <ellipse cx="234" cy="187" rx="7" ry="7" fill="${irisColor1}" />
        <circle cx="234" cy="186" r="4.5" fill="#0f172a" />
        <!-- Highlights -->
        <circle cx="231" cy="182" r="2.8" fill="#ffffff" />
        <circle cx="237" cy="189" r="1.5" fill="#ffffff" opacity="0.85" />
        <!-- Eyelash / Eyeliner -->
        <path d="M216,182 Q235,173 252,185" fill="none" stroke="#090d16" stroke-width="3" stroke-linecap="round" />
        <path d="M220,181 L213,178" fill="none" stroke="#090d16" stroke-width="2.5" stroke-linecap="round" />
        <path d="M220,188 Q235,195 250,187" fill="none" stroke="#334155" stroke-width="1.2" />
        <!-- Eyebrow -->
        <path d="M218,168 Q235,163 252,171" fill="none" stroke="${hairColor}" stroke-width="3" stroke-linecap="round" />
      </g>

      <!-- Soft Anime Blush -->
      <ellipse cx="152" cy="198" rx="14" ry="6" fill="${skin.blush}" opacity="0.4" filter="url(#glowBlur)" />
      <ellipse cx="248" cy="198" rx="14" ry="6" fill="${skin.blush}" opacity="0.4" filter="url(#glowBlur)" />

      <!-- Refined Anime Nose & Glossy Lips -->
      <path d="M198,198 L201,207 L197,208" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" />
      <path d="M193,222 Q200,225 207,222" fill="none" stroke="#be123c" stroke-width="2.5" stroke-linecap="round" />
      <ellipse cx="200" cy="225" rx="4" ry="2" fill="#f43f5e" opacity="0.75" />
    `;
  } else {
    // Sharp Masculine Game Eyes (Solo Leveling Sung Jin-Woo / Free Fire Hayato style)
    let isJinWoo = hair === 'jinwoo_shadow' || outfit === 'jinwoo_duster' || aura === 'shadow_monarch';
    let irisGlow = isJinWoo ? '#38bdf8' : '#f59e0b';
    let pupilColor = isJinWoo ? '#0284c7' : '#78350f';

    eyesSvg = `
      <!-- Left Eye -->
      <g id="leftEyeMale">
        <polygon points="152,185 182,182 178,192 155,192" fill="#ffffff" />
        <ellipse cx="167" cy="186" rx="7" ry="7" fill="${pupilColor}" />
        <circle cx="167" cy="186" r="3.5" fill="${irisGlow}" />
        <circle cx="165" cy="184" r="1.5" fill="#ffffff" />
        <!-- Sharp brow and lid -->
        <path d="M150,185 L184,181" stroke="#090d16" stroke-width="3" stroke-linecap="round" />
        <path d="M148,172 L182,168" stroke="${hairColor}" stroke-width="3.5" stroke-linecap="round" />
        ${isJinWoo ? `<circle cx="167" cy="186" r="8" fill="#38bdf8" opacity="0.35" filter="url(#glowBlur)" />` : ''}
      </g>

      <!-- Right Eye -->
      <g id="rightEyeMale">
        <polygon points="218,182 248,185 245,192 222,192" fill="#ffffff" />
        <ellipse cx="233" cy="186" rx="7" ry="7" fill="${pupilColor}" />
        <circle cx="233" cy="186" r="3.5" fill="${irisGlow}" />
        <circle cx="231" cy="184" r="1.5" fill="#ffffff" />
        <!-- Sharp brow and lid -->
        <path d="M216,181 L250,185" stroke="#090d16" stroke-width="3" stroke-linecap="round" />
        <path d="M218,168 L252,172" stroke="${hairColor}" stroke-width="3.5" stroke-linecap="round" />
        ${isJinWoo ? `<circle cx="233" cy="186" r="8" fill="#38bdf8" opacity="0.35" filter="url(#glowBlur)" />` : ''}
      </g>

      <!-- Defined Jawline Shadow & Nose -->
      <path d="M198,197 L202,208 L196,209" fill="none" stroke="#b45309" stroke-width="2" stroke-linecap="round" />
      <path d="M192,223 L208,223" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />
    `;
  }

  // 3. Hair Rendering (Layered Anime Volumes & Highlights)
  let hairBackSvg = '';
  let hairFrontSvg = '';

  if (hair === 'kelly_bob') {
    // Free Fire Kelly - Dynamic layered sport bob with anime bangs & highlight
    hairBackSvg = `
      <path d="M130,160 Q90,210 110,260 Q130,230 140,190 Z" fill="#d97706" />
      <path d="M270,160 Q310,210 290,260 Q270,230 260,190 Z" fill="#d97706" />
    `;
    hairFrontSvg = `
      <!-- Crown volume -->
      <path d="M120,170 Q130,85 200,85 Q270,85 280,170 Q270,130 200,125 Q130,130 120,170 Z" fill="${hairColor}" />
      <!-- Sharp layered bangs -->
      <path d="M125,155 Q150,185 160,195 Q165,160 175,185 Q185,160 200,190 Q215,160 225,185 Q235,160 240,195 Q250,185 275,155 Q200,110 125,155 Z" fill="${hairColor}" />
      <!-- Side lock strands -->
      <path d="M120,165 Q115,225 130,250 Q135,210 138,180 Z" fill="${hairColor}" />
      <path d="M280,165 Q285,225 270,250 Q265,210 262,180 Z" fill="${hairColor}" />
      <!-- Anime Gloss Sheen Halo -->
      <path d="M145,115 Q200,98 255,115" fill="none" stroke="#fef9c3" stroke-width="4" stroke-linecap="round" opacity="0.75" />
    `;
  } else if (hair === 'jinwoo_shadow') {
    // Solo Leveling Sung Jin-Woo - Dark swept hair with sharp spikes & cyan tips
    hairBackSvg = `
      <path d="M110,160 Q80,140 90,200 Q120,180 130,170 Z" fill="#020617" />
      <path d="M290,160 Q320,140 310,200 Q280,180 270,170 Z" fill="#020617" />
    `;
    hairFrontSvg = `
      <!-- Dark mane -->
      <path d="M115,160 Q120,75 200,75 Q280,75 285,160 Q275,120 200,115 Q125,120 115,160 Z" fill="#0f172a" />
      <!-- Sharp stylish front bangs falling over brow -->
      <polygon points="120,150 145,185 150,155 175,195 180,155 205,200 215,155 240,195 248,155 275,185 280,150 200,105" fill="#090d16" />
      <!-- Electric cyan highlight locks -->
      <path d="M165,160 L175,195 L177,175" fill="#0284c7" opacity="0.8" />
      <path d="M195,160 L205,200 L207,175" fill="#38bdf8" opacity="0.9" />
    `;
  } else if (hair === 'raiden_braid') {
    // Genshin Raiden / Acheron - Regal violet flowing locks with long braided mane
    hairBackSvg = `
      <path d="M110,160 C70,220 80,310 130,360 C110,300 120,220 140,180 Z" fill="#581c87" />
      <path d="M290,160 C330,220 320,310 270,360 C290,300 280,220 260,180 Z" fill="#581c87" />
    `;
    hairFrontSvg = `
      <!-- Violet crown -->
      <path d="M120,170 Q130,80 200,80 Q270,80 280,170 Q270,130 200,125 Q130,130 120,170 Z" fill="${hairColor}" />
      <!-- Hime side cuts -->
      <path d="M118,160 L125,235 L138,210 L132,165 Z" fill="${hairColor}" />
      <path d="M282,160 L275,235 L262,210 L268,165 Z" fill="${hairColor}" />
      <!-- Curved bangs -->
      <path d="M130,155 Q160,190 175,170 Q190,190 205,170 Q225,190 270,155 Q200,110 130,155 Z" fill="${hairColor}" />
      <!-- Golden Electro Hairpin -->
      <polygon points="255,140 275,120 265,155" fill="#facc15" stroke="#ca8a04" stroke-width="1.5" />
      <circle cx="265" cy="140" r="4" fill="#a855f7" />
    `;
  } else if (hair === 'moco_dreads') {
    // Free Fire Moco - Cyber turquoise dreadlocks with glowing clips
    hairBackSvg = `
      <path d="M110,160 Q80,240 100,340 Q120,260 135,190 Z" fill="#0891b2" />
      <path d="M290,160 Q320,240 300,340 Q280,260 265,190 Z" fill="#0891b2" />
    `;
    hairFrontSvg = `
      <path d="M120,160 Q130,80 200,80 Q270,80 280,160 Q270,130 200,125 Q130,130 120,160 Z" fill="${hairColor}" />
      <!-- Braided strands -->
      <path d="M120,160 Q105,240 125,310" fill="none" stroke="${hairColor}" stroke-width="8" stroke-linecap="round" />
      <path d="M280,160 Q295,240 275,310" fill="none" stroke="${hairColor}" stroke-width="8" stroke-linecap="round" />
      <!-- Neon cyber clips -->
      <rect x="110" y="220" width="10" height="6" rx="2" fill="#10b981" />
      <rect x="280" y="220" width="10" height="6" rx="2" fill="#10b981" />
      <!-- Neon visor HUD overlay -->
      <path d="M140,175 L260,175 L250,195 L150,195 Z" fill="#06b6d4" opacity="0.45" />
      <line x1="140" y1="175" x2="260" y2="175" stroke="#22d3ee" stroke-width="2" />
    `;
  } else if (hair === 'cha_blonde') {
    // Solo Leveling Cha Hae-In - Golden wavy hair with side braid
    hairBackSvg = `
      <path d="M120,160 C70,220 90,320 135,350 C110,280 125,220 140,180 Z" fill="#eab308" />
      <path d="M280,160 C330,220 310,320 265,350 C290,280 275,220 260,180 Z" fill="#eab308" />
    `;
    hairFrontSvg = `
      <path d="M120,165 Q130,80 200,80 Q270,80 280,165 Q270,125 200,120 Q130,125 120,165 Z" fill="${hairColor}" />
      <!-- Elegant sweep -->
      <path d="M125,160 Q160,195 180,180 Q210,195 275,160 Q200,110 125,160 Z" fill="${hairColor}" />
      <!-- Soft flowing side curls -->
      <path d="M125,160 Q110,230 135,260 Q140,210 138,180 Z" fill="${hairColor}" />
      <path d="M275,160 Q290,230 265,260 Q260,210 262,180 Z" fill="${hairColor}" />
      <!-- Golden sheen -->
      <path d="M145,115 Q200,95 255,115" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.8" />
    `;
  } else if (hair === 'hayato_ponytail') {
    // Free Fire Hayato - Spiky black topknot with samurai hair tie
    hairBackSvg = `
      <!-- High ponytail swept over shoulder -->
      <path d="M230,110 Q280,70 310,120 Q320,180 280,240 Q280,190 245,140 Z" fill="#020617" />
      <rect x="238" y="110" width="12" height="8" rx="2" fill="#dc2626" />
    `;
    hairFrontSvg = `
      <!-- Spiky warrior mane -->
      <path d="M115,160 L125,120 L140,135 L160,95 L180,125 L200,85 L220,125 L240,95 L260,135 L275,120 L285,160 Q200,115 115,160 Z" fill="${hairColor}" />
      <polygon points="120,150 145,190 155,160 175,200 185,160 215,200 225,160 255,190 280,150 200,115" fill="#090d16" />
    `;
  } else if (hair === 'kafka_waves') {
    // Honkai Star Rail Kafka - Wine-crimson wavy locks
    hairBackSvg = `
      <path d="M110,160 C60,220 70,330 130,370 C100,300 110,220 135,180 Z" fill="#4c0519" />
      <path d="M290,160 C340,220 330,330 270,370 C300,300 290,220 265,180 Z" fill="#4c0519" />
    `;
    hairFrontSvg = `
      <path d="M120,165 Q130,80 200,80 Q270,80 280,165 Q270,125 200,120 Q130,125 120,165 Z" fill="${hairColor}" />
      <path d="M125,160 Q155,195 185,175 Q215,195 275,160 Q200,110 125,160 Z" fill="${hairColor}" />
      <!-- Stylish waves -->
      <path d="M120,170 Q105,240 135,270 Q140,220 135,185 Z" fill="${hairColor}" />
      <path d="M280,170 Q295,240 265,270 Q260,220 265,185 Z" fill="${hairColor}" />
    `;
  } else if (hair === 'zhongli_tail') {
    // Genshin Zhongli - Amber-tipped queue and noble fringe
    hairBackSvg = `
      <!-- Low regal ponytail -->
      <path d="M185,250 L180,360 L220,360 L215,250 Z" fill="#451a03" />
      <polygon points="180,360 200,390 220,360" fill="#f59e0b" />
    `;
    hairFrontSvg = `
      <path d="M120,160 Q130,85 200,85 Q270,85 280,160 Q270,125 200,120 Q130,125 120,160 Z" fill="${hairColor}" />
      <polygon points="120,150 145,195 155,165 175,205 185,165 215,205 225,165 255,195 280,150 200,115" fill="#291102" />
      <path d="M170,185 L175,205 L178,190" fill="#f59e0b" />
      <path d="M222,185 L225,205 L228,190" fill="#f59e0b" />
    `;
  } else {
    // Default dynamic bangs
    hairBackSvg = `
      <path d="M120,160 Q90,220 120,280 Q135,230 140,190 Z" fill="#b45309" />
      <path d="M280,160 Q310,220 280,280 Q265,230 260,190 Z" fill="#b45309" />
    `;
    hairFrontSvg = `
      <path d="M120,165 Q130,85 200,85 Q270,85 280,165 Q270,125 200,120 Q130,125 120,165 Z" fill="${hairColor}" />
      <path d="M125,160 Q150,190 175,175 Q200,195 225,175 Q250,190 275,160 Q200,115 125,160 Z" fill="${hairColor}" />
    `;
  }

  // 4. Detailed Battle Outfits & Costumes
  let outfitSvg = '';
  if (outfit === 'kelly_track') {
    // Free Fire Kelly Athletic Yellow Track Jacket
    outfitSvg = `
      <!-- High Collar Athletic Jacket -->
      <path d="M140,255 L110,380 L290,380 L260,255 L225,265 L200,285 L175,265 Z" fill="${outfitColor}" stroke="#ca8a04" stroke-width="2" />
      <!-- Black Racing Stripes -->
      <line x1="130" y1="280" x2="115" y2="380" stroke="#090d16" stroke-width="8" />
      <line x1="270" y1="280" x2="285" y2="380" stroke="#090d16" stroke-width="8" />
      <!-- Sport Zipper & White Inner Shirt -->
      <polygon points="180,265 200,285 220,265 210,380 190,380" fill="#f8fafc" stroke="#334155" stroke-width="1.5" />
      <line x1="200" y1="285" x2="200" y2="380" stroke="#090d16" stroke-width="3" />
      <circle cx="200" cy="290" r="3.5" fill="#f59e0b" />
    `;
  } else if (outfit === 'jinwoo_duster') {
    // Solo Leveling Sung Jin-Woo High Collar Duster Coat
    outfitSvg = `
      <!-- High Gothic Collar -->
      <path d="M130,245 L110,215 L145,260 L200,280 L255,260 L290,215 L270,245 L285,380 L115,380 Z" fill="#090d16" stroke="#1e293b" stroke-width="2.5" />
      <!-- Inner dark shirt -->
      <polygon points="175,265 200,290 225,265 220,380 180,380" fill="#1e1b4b" />
      <!-- Glowing cyan trim lines -->
      <line x1="145" y1="260" x2="135" y2="380" stroke="#0284c7" stroke-width="2" opacity="0.85" filter="url(#sharpGlow)" />
      <line x1="255" y1="260" x2="265" y2="380" stroke="#0284c7" stroke-width="2" opacity="0.85" filter="url(#sharpGlow)" />
    `;
  } else if (outfit === 'raiden_kimono') {
    // Genshin Raiden / Acheron Kimono with Gold Pauldrons
    outfitSvg = `
      <!-- Deep violet kimono mantle -->
      <path d="M135,255 L105,380 L295,380 L265,255 L200,280 Z" fill="${outfitColor}" stroke="#3b0764" stroke-width="2" />
      <!-- Kimono wrap collar -->
      <polygon points="160,255 200,300 240,255 220,380 180,380" fill="#f5d0fe" />
      <path d="M165,260 L210,310" stroke="#facc15" stroke-width="2.5" />
      <!-- Gold Ornate Pauldrons -->
      <path d="M100,260 Q120,240 145,265 L115,300 Z" fill="#facc15" stroke="#a16207" stroke-width="1.5" />
      <path d="M300,260 Q280,240 255,265 L285,300 Z" fill="#facc15" stroke="#a16207" stroke-width="1.5" />
      <!-- Electro Sigil Emblem -->
      <circle cx="200" cy="330" r="14" fill="#581c87" stroke="#facc15" stroke-width="2" />
      <polygon points="200,320 205,330 213,330 207,335 209,343 200,338 191,343 193,335 187,330 195,330" fill="#facc15" />
    `;
  } else if (outfit === 'moco_cyber') {
    // Free Fire Moco Tactical Hacker Vest
    outfitSvg = `
      <path d="M135,255 L110,380 L290,380 L265,255 L200,275 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="2" />
      <!-- Neon turquoise & emerald armor panels -->
      <rect x="140" y="285" width="45" height="35" rx="4" fill="#0891b2" stroke="#22d3ee" stroke-width="1.5" />
      <rect x="215" y="285" width="45" height="35" rx="4" fill="#0891b2" stroke="#22d3ee" stroke-width="1.5" />
      <line x1="200" y1="275" x2="200" y2="380" stroke="#10b981" stroke-width="3" />
      <!-- Neon circuit traces -->
      <polyline points="150,335 160,350 185,350" fill="none" stroke="#22d3ee" stroke-width="2" />
      <polyline points="250,335 240,350 215,350" fill="none" stroke="#22d3ee" stroke-width="2" />
    `;
  } else if (outfit === 'cha_armor') {
    // Solo Leveling Cha Hae-In Silver & Crimson Plate
    outfitSvg = `
      <!-- Polished Silver Breastplate -->
      <path d="M135,255 L115,380 L285,380 L265,255 L200,275 Z" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" />
      <!-- Crimson Corset Accents -->
      <polygon points="175,275 200,305 225,275 215,380 185,380" fill="#dc2626" />
      <!-- Winged Silver Pauldrons -->
      <path d="M95,255 Q125,235 145,265 L115,310 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2" />
      <path d="M305,255 Q275,235 255,265 L285,310 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2" />
      <!-- Golden Cross Emblem -->
      <circle cx="200" cy="330" r="12" fill="#fbbf24" />
      <polygon points="200,320 203,328 211,328 205,333 207,341 200,336 193,341 195,333 189,328 197,328" fill="#ffffff" />
    `;
  } else if (outfit === 'hayato_haori') {
    // Free Fire Hayato Combat Haori
    outfitSvg = `
      <path d="M130,250 L100,380 L300,380 L270,250 L200,275 Z" fill="#1e3a8a" stroke="#172554" stroke-width="2" />
      <!-- Crimson lining -->
      <polygon points="160,255 200,310 240,255 225,380 175,380" fill="#991b1b" />
      <!-- Belt & Sash -->
      <rect x="130" y="340" width="140" height="20" fill="#0f172a" />
      <rect x="185" y="338" width="30" height="24" fill="#f59e0b" rx="3" />
    `;
  } else if (outfit === 'kafka_coat') {
    // Honkai Star Rail Kafka Velvet Duster & Spider Lace
    outfitSvg = `
      <path d="M135,250 L110,380 L290,380 L265,250 L200,275 Z" fill="#500724" stroke="#831843" stroke-width="2" />
      <!-- White high lace blouse -->
      <polygon points="170,255 200,295 230,255 215,380 185,380" fill="#fdf2f8" />
      <!-- Spider brooch -->
      <circle cx="200" cy="295" r="7" fill="#831843" stroke="#f43f5e" stroke-width="1.5" />
      <line x1="190" y1="290" x2="210" y2="300" stroke="#f43f5e" stroke-width="1.5" />
      <line x1="210" y1="290" x2="190" y2="300" stroke="#f43f5e" stroke-width="1.5" />
    `;
  } else if (outfit === 'zhongli_coat') {
    // Genshin Zhongli Geo Archon Coat
    outfitSvg = `
      <path d="M135,250 L105,380 L295,380 L265,250 L200,275 Z" fill="#451a03" stroke="#78350f" stroke-width="2" />
      <!-- Gold Geo Scale filigree -->
      <polygon points="170,255 200,295 230,255 220,380 180,380" fill="#78350f" />
      <path d="M140,280 Q200,310 260,280" stroke="#facc15" stroke-width="3" fill="none" />
      <rect x="188" y="320" width="24" height="24" transform="rotate(45 200 332)" fill="#f59e0b" stroke="#fef08a" stroke-width="2" />
    `;
  } else {
    // Classic fantasy armor
    outfitSvg = `
      <path d="M135,255 L110,380 L290,380 L265,255 L200,275 Z" fill="${outfitColor}" stroke="#1e293b" stroke-width="2" />
      <polygon points="175,275 200,305 225,275 215,380 185,380" fill="#94a3b8" />
    `;
  }

  // 5. Signature Weapons & Energy Effects
  let weaponSvg = '';
  if (weapon === 'shadow_daggers') {
    // Jin-Woo Dual Shadow Daggers
    weaponSvg = `
      <!-- Left Dagger -->
      <g transform="rotate(-30 90 280)">
        <polygon points="90,210 98,280 82,280" fill="#0f172a" stroke="#38bdf8" stroke-width="2" filter="url(#sharpGlow)" />
        <rect x="80" y="280" width="20" height="6" fill="#1e293b" />
        <rect x="86" y="286" width="8" height="25" fill="#020617" />
      </g>
      <!-- Right Dagger -->
      <g transform="rotate(30 310 280)">
        <polygon points="310,210 318,280 302,280" fill="#0f172a" stroke="#38bdf8" stroke-width="2" filter="url(#sharpGlow)" />
        <rect x="300" y="280" width="20" height="6" fill="#1e293b" />
        <rect x="306" y="286" width="8" height="25" fill="#020617" />
      </g>
    `;
  } else if (weapon === 'katana') {
    // Raiden / Hayato Katana
    weaponSvg = `
      <g transform="rotate(35 300 260)">
        <path d="M300,100 Q305,220 295,320" fill="none" stroke="#f8fafc" stroke-width="4" filter="url(#sharpGlow)" />
        <line x1="298" y1="100" x2="293" y2="320" stroke="#c084fc" stroke-width="1.5" />
        <rect x="288" y="320" width="20" height="6" rx="2" fill="#facc15" />
        <rect x="293" y="326" width="10" height="40" fill="#090d16" />
        <line x1="294" y1="335" x2="302" y2="335" stroke="#f43f5e" stroke-width="2" />
        <line x1="294" y1="345" x2="302" y2="345" stroke="#f43f5e" stroke-width="2" />
      </g>
    `;
  } else if (weapon === 'dual_sabers') {
    // Kelly / Moco Neon Photon Sabers
    weaponSvg = `
      <!-- Left Saber -->
      <g transform="rotate(-35 85 270)">
        <line x1="85" y1="130" x2="85" y2="280" stroke="#22d3ee" stroke-width="6" stroke-linecap="round" filter="url(#sharpGlow)" />
        <line x1="85" y1="130" x2="85" y2="280" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
        <rect x="80" y="280" width="10" height="30" rx="3" fill="#0f172a" />
      </g>
      <!-- Right Saber -->
      <g transform="rotate(35 315 270)">
        <line x1="315" y1="130" x2="315" y2="280" stroke="#f43f5e" stroke-width="6" stroke-linecap="round" filter="url(#sharpGlow)" />
        <line x1="315" y1="130" x2="315" y2="280" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
        <rect x="310" y="280" width="10" height="30" rx="3" fill="#0f172a" />
      </g>
    `;
  } else if (weapon === 'spear') {
    // Zhongli / Cha Hae-In Celestial Spear
    weaponSvg = `
      <g transform="rotate(25 320 230)">
        <line x1="320" y1="40" x2="320" y2="380" stroke="#d97706" stroke-width="5" />
        <!-- Glowing Spear Tip -->
        <polygon points="320,30 332,95 320,85 308,95" fill="#facc15" stroke="#f59e0b" stroke-width="2" filter="url(#sharpGlow)" />
        <circle cx="320" cy="85" r="4" fill="#38bdf8" />
      </g>
    `;
  } else {
    // Magic Staff
    weaponSvg = `
      <g transform="rotate(25 320 230)">
        <line x1="320" y1="60" x2="320" y2="380" stroke="#78350f" stroke-width="6" />
        <circle cx="320" cy="60" r="18" fill="url(#arcaneGlow)" filter="url(#sharpGlow)" />
        <circle cx="320" cy="60" r="8" fill="#ffffff" />
      </g>
    `;
  }

  // 6. SSS-Rank Card Border & Frame Accents
  const frameSvg = `
    <!-- High-Tier SSS Gold Frame -->
    <rect x="8" y="8" width="384" height="384" rx="28" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.9" />
    <rect x="14" y="14" width="372" height="372" rx="22" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.65" />

    <!-- Corner Filigree Ornaments -->
    <!-- Top-Left -->
    <path d="M12,40 L12,18 C12,14 14,12 18,12 L40,12" fill="none" stroke="#fbbf24" stroke-width="4" />
    <polygon points="24,24 30,16 24,18" fill="#fbbf24" />
    <!-- Top-Right -->
    <path d="M388,40 L388,18 C388,14 386,12 382,12 L360,12" fill="none" stroke="#fbbf24" stroke-width="4" />
    <polygon points="376,24 370,16 376,18" fill="#fbbf24" />
    <!-- Bottom-Left -->
    <path d="M12,360 L12,382 C12,386 14,388 18,388 L40,388" fill="none" stroke="#fbbf24" stroke-width="4" />
    <!-- Bottom-Right -->
    <path d="M388,360 L388,382 C388,386 386,388 382,388 L360,388" fill="none" stroke="#fbbf24" stroke-width="4" />

    <!-- Top Rarity Banner -->
    <g transform="translate(145, 14)">
      <rect x="0" y="0" width="110" height="22" rx="11" fill="#090d16" stroke="#f59e0b" stroke-width="1.5" />
      <text x="55" y="15" fill="#facc15" font-size="11" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="2">
        ★★★★★
      </text>
    </g>
  `;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <!-- Atmospheric Glows -->
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

        <linearGradient id="phoenixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#f97316" />
          <stop offset="100%" stop-color="#dc2626" />
        </linearGradient>

        <radialGradient id="shadowBackGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3b0764" stop-opacity="0.9" />
          <stop offset="60%" stop-color="#1e1b4b" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#030712" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="electroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#c084fc" stop-opacity="0.85" />
          <stop offset="70%" stop-color="#7e22ce" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="cyberBackGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.75" />
          <stop offset="60%" stop-color="#0f766e" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#022c22" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="holyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fef08a" stop-opacity="0.8" />
          <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#78350f" stop-opacity="0" />
        </radialGradient>

        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="50%" stop-color="#fde047" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>

        <radialGradient id="arcaneGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.85" />
          <stop offset="60%" stop-color="#831843" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="celestialGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fde047" stop-opacity="0.85" />
          <stop offset="60%" stop-color="#ca8a04" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#451a03" stop-opacity="0" />
        </radialGradient>

        <!-- Shading Filters -->
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

      <!-- Background Canvas -->
      <rect width="400" height="400" rx="28" fill="url(#cardBg)" />

      <!-- Elemental Aura Back Layer -->
      ${auraBackSvg}

      <!-- Back Hair Layer -->
      ${hairBackSvg}

      <!-- Torso / Neck Base -->
      <path d="M175,230 L165,270 L235,270 L225,230 Z" fill="${skin.shadow}" />
      <path d="M182,230 L176,260 L224,260 L218,230 Z" fill="${skin.base}" />

      <!-- Anime Head Contour (Soft Chin & Jawline) -->
      <path d="M136,160 Q136,230 190,248 Q200,251 210,248 Q264,230 264,160 Q264,115 200,115 Q136,115 136,160 Z" fill="${skin.base}" stroke="#1e293b" stroke-width="1.5" />

      <!-- Anime Eyes & Facial Expressions -->
      ${eyesSvg}

      <!-- Front Hair Mane & Dynamic Bangs -->
      ${hairFrontSvg}

      <!-- Costume / Armor Layer -->
      ${outfitSvg}

      <!-- Weapons & Elemental Weapon FX -->
      ${weaponSvg}

      <!-- Foreground Aura Wisps -->
      ${auraFrontSvg}

      <!-- SSS-Rank Card Border & Frame Accents -->
      ${frameSvg}
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Transforms an uploaded photo into a 100% UNIQUE RPG Character Portrait
 * that does NOT match any default character in the game!
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

        // 1. Draw square crop of user's photo
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        // 2. Sample pixel characteristics for uniqueness
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

        // Compute unique hero attributes from photo perceptual hash
        const photoHash = Math.abs(
          (avgR * 31 + avgG * 17 + avgB * 7 + (seed % 10000)) | 0
        );

        const titles = [
          'Solo Monarch of the Void',
          'Free Fire Phoenix Slayer',
          'Genshin Astral Archon',
          'Shadow Sovereign of Dusk',
          'Starlight Blade Dancer',
          'Cyber Overdrive Enigma',
          'Valkyrie of the Sun-Goddess',
          'Dimensional Ronin',
          'Chrono Weaver Prime',
          'Aetherial Phantom God',
          'Master of Unbroken Will',
          'Thunder Strike Sovereign',
        ];

        const classes = [
          'Unique Photo-Born Sovereign',
          'Shadow Strike Duelist',
          'Astral Archon',
          'Neural Cyber Samurai',
          'Radiant Sun Paladin',
          'Dimension Walker',
          'Storm Harbinger',
        ];

        const uniqueTitle = titles[photoHash % titles.length];
        const uniqueClass = classes[(photoHash >> 2) % classes.length];
        const heroId = `RPG-HERO-${(photoHash % 89999 + 10000).toString(16).toUpperCase()}`;

        // 3. Pixelation & AI-Style Color Transformation
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
              // Free Fire Cyberpunk style
              if (brightness > 0.55) {
                finalR = 34; finalG = 211; finalB = 238; // Neon Cyan
              } else if (brightness > 0.3) {
                finalR = 244; finalG = 63; finalB = 94; // Neon Magenta
              } else {
                finalR = 15; finalG = 23; finalB = 42; // Deep Dark
              }
            } else if (style === 'HOLY_PALADIN') {
              finalR = Math.floor(brightness * 255);
              finalG = Math.floor(brightness * 225 + 20);
              finalB = Math.floor(brightness * 100);
            } else if (style === 'SHADOW_ASSASSIN') {
              // Solo Leveling Shadow Monarch Noir
              const mono = Math.floor(brightness * 160);
              if (brightness > 0.6) {
                finalR = 56; finalG = 189; finalB = 248; // Electric Cyan Eye Glint
              } else {
                finalR = mono + 25;
                finalG = mono + 10;
                finalB = mono + 40;
              }
            } else if (style === 'ANIME_LEGEND') {
              // Genshin Cel-Shading
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

        // 4. Dramatic Vignette & Ambient Radial Glow
        const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.35, size / 2, size / 2, size * 0.72);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, 'rgba(7, 10, 19, 0.8)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // 5. Inscribed SSS-Tier Gold Filigree Frame
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 6;
        ctx.strokeRect(3, 3, size - 6, size - 6);

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(8, 8, size - 16, size - 16);

        // Corner Runes
        ctx.fillStyle = '#fbbf24';
        const runeSize = 12;
        ctx.fillRect(4, 4, runeSize, runeSize);
        ctx.fillRect(size - runeSize - 4, 4, runeSize, runeSize);
        ctx.fillRect(4, size - runeSize - 4, runeSize, runeSize);
        ctx.fillRect(size - runeSize - 4, size - runeSize - 4, runeSize, runeSize);

        // Unique Hero ID & Guarantee Watermark
        ctx.fillStyle = 'rgba(9, 13, 22, 0.9)';
        ctx.fillRect(12, size - 32, 175, 22);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1;
        ctx.strokeRect(12, size - 32, 175, 22);

        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`★ ${heroId}`, 18, size - 17);

        // Top 5-Star Tag
        ctx.fillStyle = 'rgba(9, 13, 22, 0.9)';
        ctx.fillRect(size / 2 - 45, 8, 90, 18);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1;
        ctx.strokeRect(size / 2 - 45, 8, 90, 18);
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('★★★★★ SSS', size / 2, 21);

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
