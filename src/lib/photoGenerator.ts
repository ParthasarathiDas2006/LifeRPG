import { AvatarStyle, CharacterClass, CharacterGender, SpritePartsConfig } from './types';

export interface HeroPreset {
  id: string;
  name: string;
  class: CharacterClass;
  gender: CharacterGender;
  title: string;
  parts: SpritePartsConfig;
  description: string;
}

/**
 * Curated Roster of Distinct Female and Male Legendary Heroes
 */
export const HERO_PRESETS: HeroPreset[] = [
  // --- FEMALE HEROES ---
  {
    id: 'preset-valkyrie-elena',
    name: 'Valkyrie Elena',
    class: 'VALKYRIE',
    gender: 'FEMALE',
    title: 'Shield-Maiden of Valhalla',
    description: 'Fierce battle warrior adorned in celestial silver plate and winged golden pauldrons.',
    parts: {
      gender: 'FEMALE',
      body: 'fair',
      hair: 'twin_braids',
      hairColor: '#f59e0b',
      outfit: 'valkyrie_plate',
      outfitColor: '#cbd5e1',
      weapon: 'spear',
      aura: 'holy',
    },
  },
  {
    id: 'preset-sorceress-lyanna',
    name: 'Lyanna Arcana',
    class: 'SORCERESS',
    gender: 'FEMALE',
    title: 'Archmage of Celestial Starlight',
    description: 'Weaves cosmic ether and starry constellations into devastating arcane spells.',
    parts: {
      gender: 'FEMALE',
      body: 'ivory',
      hair: 'flowing_waves',
      hairColor: '#c084fc',
      outfit: 'sorceress_dress',
      outfitColor: '#581c87',
      weapon: 'staff',
      aura: 'celestial',
    },
  },
  {
    id: 'preset-huntress-aria',
    name: 'Aria Moonwhisper',
    class: 'HUNTRESS',
    gender: 'FEMALE',
    title: 'Silent Wind Ranger',
    description: 'Master marksman of the ancient silver forests, strikes targets with pinpoint gale arrows.',
    parts: {
      gender: 'FEMALE',
      body: 'elf',
      hair: 'side_bob',
      hairColor: '#34d399',
      outfit: 'huntress_leather',
      outfitColor: '#065f46',
      weapon: 'bow',
      aura: 'lightning',
    },
  },
  {
    id: 'preset-kunoichi-kasumi',
    name: 'Kasumi Nightshade',
    class: 'KUNOICHI',
    gender: 'FEMALE',
    title: 'Ghost Blade of the Cherry Blossom',
    description: 'Deadly shadow assassin moving between dimensions under raining sakura petals.',
    parts: {
      gender: 'FEMALE',
      body: 'fair',
      hair: 'odango_buns',
      hairColor: '#1e293b',
      outfit: 'kunoichi_suit',
      outfitColor: '#831843',
      weapon: 'katana',
      aura: 'sakura',
    },
  },
  {
    id: 'preset-cyber-valkyrie',
    name: 'Kira Neon-V',
    class: 'CYBER_VALKYRIE',
    gender: 'FEMALE',
    title: 'Holographic Cyber Paladin',
    description: 'Nanotech-augmented warrior wielding photon dual sabers in digital battlegrounds.',
    parts: {
      gender: 'FEMALE',
      body: 'cyber',
      hair: 'high_ponytail',
      hairColor: '#06b6d4',
      outfit: 'cyber',
      outfitColor: '#0891b2',
      weapon: 'dual_sabers',
      aura: 'lightning',
    },
  },

  // --- MALE & SPECIAL HEROES ---
  {
    id: 'preset-paladin-kaelen',
    name: 'Lord Kaelen',
    class: 'PALADIN',
    gender: 'MALE',
    title: 'Sunforged Crusader',
    description: 'Immovable defender of order clad in gilded heavy plate with unbreakable willpower.',
    parts: {
      gender: 'MALE',
      body: 'fair',
      hair: 'spiky',
      hairColor: '#b45309',
      outfit: 'plate',
      outfitColor: '#f59e0b',
      weapon: 'sword',
      aura: 'holy',
    },
  },
  {
    id: 'preset-ronin-nexus',
    name: 'Nexus-09',
    class: 'CYBER_HERO',
    gender: 'MALE',
    title: 'Cyberpunk Shadow Ronin',
    description: 'Equipped with a cybernetic heads-up visor and supersonic energy blade.',
    parts: {
      gender: 'MALE',
      body: 'cyber',
      hair: 'short',
      hairColor: '#38bdf8',
      outfit: 'cyber',
      outfitColor: '#1e293b',
      weapon: 'katana',
      aura: 'lightning',
    },
  },
  {
    id: 'preset-mage-malfurion',
    name: 'Arch-Mage Stoic',
    class: 'MAGE',
    gender: 'MALE',
    title: 'Grand Chronomancer',
    description: 'Controls temporal focus blocks and deep-work mana streams to bend productivity to his will.',
    parts: {
      gender: 'MALE',
      body: 'tanned',
      hair: 'long',
      hairColor: '#e2e8f0',
      outfit: 'robe',
      outfitColor: '#1e3a8a',
      weapon: 'staff',
      aura: 'arcane',
    },
  },
];

/**
 * Procedural SVG Sprite Generator
 * Generates rich SVG graphics with female and male anatomical styles, unique hairstyles, armor, and elemental auras.
 */
export function generateProceduralSprite(
  parts: SpritePartsConfig,
  charClass: CharacterClass
): string {
  const {
    gender = 'MALE',
    body = 'fair',
    hair = 'spiky',
    hairColor = '#f59e0b',
    outfit = 'plate',
    outfitColor = '#3b82f6',
    weapon = 'sword',
    aura = 'none',
  } = parts;

  const isFemale = gender === 'FEMALE';

  // Skin tones
  const skinColors: Record<string, string> = {
    fair: '#fde68a',
    ivory: '#fef08a',
    tanned: '#d97706',
    dark: '#78350f',
    elf: '#a7f3d0',
    cyber: '#94a3b8',
  };
  const skin = skinColors[body] || '#fde68a';

  // --- Aura definitions ---
  let auraSvg = '';
  if (aura === 'fire') {
    auraSvg = `
      <circle cx="64" cy="64" r="54" fill="url(#fireGlow)" opacity="0.45" filter="url(#blurEffect)" />
      <path d="M40,95 Q64,20 88,95 Q76,60 64,85 Q52,60 40,95 Z" fill="#ef4444" opacity="0.6" />
    `;
  } else if (aura === 'arcane') {
    auraSvg = `
      <circle cx="64" cy="64" r="54" fill="url(#arcaneGlow)" opacity="0.45" filter="url(#blurEffect)" />
      <polygon points="64,18 80,45 106,50 86,70 90,98 64,84 38,98 42,70 22,50 48,45" fill="none" stroke="#c084fc" stroke-width="1.5" opacity="0.5" />
    `;
  } else if (aura === 'holy') {
    auraSvg = `
      <circle cx="64" cy="64" r="52" fill="url(#holyGlow)" opacity="0.5" filter="url(#blurEffect)" />
      <ellipse cx="64" cy="22" rx="28" ry="8" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.9" />
    `;
  } else if (aura === 'shadow') {
    auraSvg = `
      <circle cx="64" cy="64" r="54" fill="#0f172a" opacity="0.8" />
      <path d="M20,110 Q64,10 108,110 Z" fill="#581c87" opacity="0.5" filter="url(#blurEffect)" />
    `;
  } else if (aura === 'lightning') {
    auraSvg = `
      <circle cx="64" cy="64" r="54" fill="url(#lightningGlow)" opacity="0.4" filter="url(#blurEffect)" />
      <polyline points="30,30 50,60 40,65 60,100" fill="none" stroke="#38bdf8" stroke-width="2.5" />
      <polyline points="98,30 78,60 88,65 68,100" fill="none" stroke="#38bdf8" stroke-width="2.5" />
    `;
  } else if (aura === 'sakura') {
    auraSvg = `
      <circle cx="64" cy="64" r="54" fill="url(#sakuraGlow)" opacity="0.4" filter="url(#blurEffect)" />
      <!-- Floating Cherry Blossom Petals -->
      <path d="M30,40 C32,32 40,34 38,44 C34,42 30,48 30,40 Z" fill="#f43f5e" opacity="0.8" />
      <path d="M96,36 C98,28 106,30 104,40 C100,38 96,44 96,36 Z" fill="#fb7185" opacity="0.8" />
      <path d="M24,80 C26,72 34,74 32,84 C28,82 24,88 24,80 Z" fill="#fda4af" opacity="0.8" />
      <path d="M102,85 C104,77 112,79 110,89 C106,87 102,93 102,85 Z" fill="#f43f5e" opacity="0.8" />
    `;
  } else if (aura === 'celestial') {
    auraSvg = `
      <circle cx="64" cy="64" r="54" fill="url(#celestialGlow)" opacity="0.5" filter="url(#blurEffect)" />
      <circle cx="64" cy="64" r="48" fill="none" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,4" opacity="0.7" />
      <polygon points="64,12 67,20 75,20 69,25 71,33 64,28 57,33 59,25 53,20 61,20" fill="#facc15" />
    `;
  }

  // --- Hair definitions (Supporting Female and Male styles) ---
  let hairSvg = '';
  if (hair === 'twin_braids') {
    // Flowing Viking / Valkyrie Braids
    hairSvg = `
      <path d="M38,48 Q64,24 90,48 Q64,36 38,48 Z" fill="${hairColor}" />
      <!-- Left Braid -->
      <path d="M38,48 C30,60 34,75 30,92 C36,90 38,75 42,55 Z" fill="${hairColor}" stroke="#1e293b" stroke-width="1" />
      <circle cx="31" cy="93" r="2.5" fill="#fbbf24" />
      <!-- Right Braid -->
      <path d="M90,48 C98,60 94,75 98,92 C92,90 90,75 86,55 Z" fill="${hairColor}" stroke="#1e293b" stroke-width="1" />
      <circle cx="97" cy="93" r="2.5" fill="#fbbf24" />
    `;
  } else if (hair === 'odango_buns') {
    // Anime Twin Buns with Side Locks (Kunoichi style)
    hairSvg = `
      <circle cx="40" cy="36" r="10" fill="${hairColor}" stroke="#1e293b" stroke-width="1.5" />
      <circle cx="88" cy="36" r="10" fill="${hairColor}" stroke="#1e293b" stroke-width="1.5" />
      <path d="M40,50 Q64,28 88,50 Q64,40 40,50 Z" fill="${hairColor}" />
      <!-- Side hanging locks -->
      <path d="M34,50 Q28,70 32,82" fill="none" stroke="${hairColor}" stroke-width="3" stroke-linecap="round" />
      <path d="M94,50 Q100,70 96,82" fill="none" stroke="${hairColor}" stroke-width="3" stroke-linecap="round" />
    `;
  } else if (hair === 'flowing_waves') {
    // Lush long wavy hair
    hairSvg = `
      <path d="M36,46 Q64,20 92,46 C96,65 102,80 98,98 C90,85 88,70 88,52 Q64,36 40,52 C40,70 38,85 30,98 C26,80 32,65 36,46 Z" fill="${hairColor}" />
    `;
  } else if (hair === 'side_bob') {
    // Sleek angled bob
    hairSvg = `
      <path d="M36,48 Q64,24 92,48 L94,74 L86,64 L86,52 Q64,36 42,52 L42,64 L34,74 Z" fill="${hairColor}" />
    `;
  } else if (hair === 'high_ponytail') {
    hairSvg = `
      <path d="M40,48 Q64,28 88,48 Q64,38 40,48 Z" fill="${hairColor}" />
      <path d="M78,38 Q115,25 106,70 Q92,55 82,44 Z" fill="${hairColor}" />
      <circle cx="80" cy="40" r="3" fill="#f43f5e" />
    `;
  } else if (hair === 'spiky') {
    hairSvg = `
      <path d="M38,50 L42,30 L50,36 L64,20 L78,36 L86,30 L90,50 Q64,34 38,50 Z" fill="${hairColor}" />
      <polygon points="54,24 64,12 74,24" fill="${hairColor}" />
    `;
  } else if (hair === 'long') {
    hairSvg = `
      <path d="M36,50 Q64,28 92,50 L96,85 Q88,80 88,60 L88,52 Q64,40 40,52 L40,60 Q40,80 32,85 Z" fill="${hairColor}" />
    `;
  } else {
    // short
    hairSvg = `
      <path d="M38,52 Q64,28 90,52 Q64,40 38,52 Z" fill="${hairColor}" />
    `;
  }

  // --- Outfit definitions (Female & Male armor) ---
  let outfitSvg = '';
  if (outfit === 'valkyrie_plate') {
    // Gilded Valkyrie Armor with Winged Pauldrons
    outfitSvg = `
      <path d="M46,78 L82,78 L88,118 L40,118 Z" fill="${outfitColor}" stroke="#1e293b" stroke-width="2" />
      <rect x="52" y="80" width="24" height="24" rx="4" fill="#f1f5f9" />
      <polygon points="64,84 68,92 76,92 70,97 72,105 64,100 56,105 58,97 52,92 60,92" fill="#fbbf24" />
      <!-- Winged Pauldrons -->
      <path d="M32,76 Q42,66 52,82 L34,88 Z" fill="#e2e8f0" stroke="#1e293b" stroke-width="1.5" />
      <path d="M96,76 Q86,66 76,82 L94,88 Z" fill="#e2e8f0" stroke="#1e293b" stroke-width="1.5" />
      <!-- Warrior Sash -->
      <rect x="42" y="104" width="44" height="6" fill="#b91c1c" />
    `;
  } else if (outfit === 'sorceress_dress') {
    // Celestial Robe with Corset and Starfiligree
    outfitSvg = `
      <path d="M42,76 L86,76 L96,120 L32,120 Z" fill="${outfitColor}" stroke="#1e1b4b" stroke-width="2" />
      <polygon points="64,76 72,120 56,120" fill="#c084fc" opacity="0.6" />
      <circle cx="64" cy="86" r="4.5" fill="#facc15" />
      <!-- Shimmer Corset Lines -->
      <line x1="50" y1="88" x2="78" y2="88" stroke="#fbbf24" stroke-width="1.5" />
      <line x1="52" y1="96" x2="76" y2="96" stroke="#fbbf24" stroke-width="1.5" />
      <line x1="54" y1="104" x2="74" y2="104" stroke="#fbbf24" stroke-width="1.5" />
    `;
  } else if (outfit === 'huntress_leather') {
    // Archer Mantle & Quiver Strap
    outfitSvg = `
      <path d="M44,78 L84,78 L90,120 L38,120 Z" fill="${outfitColor}" stroke="#064e3b" stroke-width="2" />
      <line x1="46" y1="80" x2="82" y2="116" stroke="#78350f" stroke-width="3.5" />
      <circle cx="64" cy="98" r="4" fill="#10b981" />
      <rect x="42" y="104" width="44" height="5" fill="#78350f" />
    `;
  } else if (outfit === 'kunoichi_suit') {
    // Stealth Shinobi Bodysuit
    outfitSvg = `
      <path d="M44,76 L84,76 L90,120 L38,120 Z" fill="${outfitColor}" stroke="#0f172a" stroke-width="2" />
      <rect x="52" y="80" width="24" height="20" fill="#1e293b" opacity="0.8" />
      <!-- Mesh Texture -->
      <line x1="56" y1="82" x2="72" y2="98" stroke="#475569" stroke-width="1" />
      <line x1="72" y1="82" x2="56" y2="98" stroke="#475569" stroke-width="1" />
      <rect x="40" y="102" width="48" height="6" fill="#f43f5e" />
    `;
  } else if (outfit === 'plate') {
    outfitSvg = `
      <path d="M44,78 L84,78 L90,118 L38,118 Z" fill="${outfitColor}" stroke="#1e293b" stroke-width="2" />
      <rect x="52" y="82" width="24" height="28" rx="3" fill="#94a3b8" />
      <circle cx="64" cy="96" r="4" fill="#fbbf24" />
      <path d="M34,80 Q44,72 50,86 L36,92 Z" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5" />
      <path d="M94,80 Q84,72 78,86 L92,92 Z" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5" />
    `;
  } else if (outfit === 'cyber') {
    outfitSvg = `
      <path d="M44,76 L84,76 L92,120 L36,120 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="2" />
      <line x1="64" y1="76" x2="64" y2="120" stroke="#06b6d4" stroke-width="2" />
      <rect x="54" y="88" width="20" height="12" fill="#3b82f6" opacity="0.6" />
      <circle cx="48" cy="94" r="3" fill="#f43f5e" />
    `;
  } else {
    // Tunic
    outfitSvg = `
      <path d="M44,78 L84,78 L90,120 L38,120 Z" fill="${outfitColor}" stroke="#451a03" stroke-width="2" />
      <line x1="64" y1="78" x2="64" y2="105" stroke="#78350f" stroke-width="3" />
      <rect x="42" y="102" width="44" height="6" fill="#78350f" />
    `;
  }

  // --- Weapon definitions ---
  let weaponSvg = '';
  if (weapon === 'spear') {
    // Celestial Spear / Trident
    weaponSvg = `
      <g transform="rotate(20 96 80)">
        <rect x="94" y="15" width="4" height="105" rx="1.5" fill="#78350f" />
        <polygon points="96,10 102,30 90,30" fill="#facc15" stroke="#ca8a04" stroke-width="1" />
        <polygon points="96,2 99,10 93,10" fill="#e2e8f0" />
      </g>
    `;
  } else if (weapon === 'dual_sabers') {
    // Twin Glowing Photon Sabers
    weaponSvg = `
      <g transform="rotate(-30 96 85)">
        <rect x="94" y="25" width="5" height="60" rx="2" fill="#22d3ee" filter="url(#blurEffect)" opacity="0.8" />
        <rect x="95" y="28" width="3" height="55" rx="1" fill="#ffffff" />
        <rect x="93" y="85" width="7" height="14" rx="2" fill="#0f172a" />
      </g>
      <g transform="rotate(30 32 85)">
        <rect x="30" y="25" width="5" height="60" rx="2" fill="#f43f5e" filter="url(#blurEffect)" opacity="0.8" />
        <rect x="31" y="28" width="3" height="55" rx="1" fill="#ffffff" />
        <rect x="29" y="85" width="7" height="14" rx="2" fill="#0f172a" />
      </g>
    `;
  } else if (weapon === 'sword') {
    weaponSvg = `
      <g transform="rotate(-30 96 85)">
        <rect x="94" y="30" width="6" height="55" rx="1" fill="#e2e8f0" stroke="#475569" stroke-width="1" />
        <rect x="88" y="85" width="18" height="4" rx="1" fill="#f59e0b" />
        <rect x="95" y="89" width="4" height="14" rx="1" fill="#78350f" />
      </g>
    `;
  } else if (weapon === 'staff') {
    weaponSvg = `
      <g transform="rotate(15 96 80)">
        <rect x="94" y="20" width="5" height="95" rx="2" fill="#78350f" />
        <circle cx="96.5" cy="22" r="9" fill="url(#arcaneGlow)" stroke="#c084fc" stroke-width="2" />
      </g>
    `;
  } else if (weapon === 'daggers') {
    weaponSvg = `
      <g transform="rotate(-40 96 90)">
        <polygon points="96,60 100,85 92,85" fill="#cbd5e1" stroke="#334155" stroke-width="1" />
        <rect x="90" y="85" width="12" height="3" fill="#f59e0b" />
      </g>
      <g transform="rotate(40 32 90)">
        <polygon points="32,60 36,85 28,85" fill="#cbd5e1" stroke="#334155" stroke-width="1" />
        <rect x="26" y="85" width="12" height="3" fill="#f59e0b" />
      </g>
    `;
  } else if (weapon === 'bow') {
    weaponSvg = `
      <path d="M96,35 Q115,70 96,105" fill="none" stroke="#78350f" stroke-width="3" />
      <line x1="96" y1="35" x2="96" y2="105" stroke="#f1f5f9" stroke-width="1" />
    `;
  } else if (weapon === 'katana') {
    weaponSvg = `
      <g transform="rotate(-35 96 85)">
        <path d="M96,25 Q99,55 96,85" fill="none" stroke="#f1f5f9" stroke-width="3" />
        <rect x="91" y="85" width="12" height="4" rx="1" fill="#0f172a" />
        <rect x="94" y="89" width="4" height="18" fill="#f43f5e" />
      </g>
    `;
  }

  // --- Facial Details (Feminine / Masculine) ---
  let faceDetails = '';
  if (isFemale) {
    faceDetails = `
      <!-- Feminine Eyelashes / Winged liner -->
      <path d="M52,58 Q56,54 60,59" fill="none" stroke="#0f172a" stroke-width="1.8" />
      <line x1="52" y1="58" x2="49" y2="56" stroke="#0f172a" stroke-width="1.5" />
      <path d="M68,59 Q72,54 76,58" fill="none" stroke="#0f172a" stroke-width="1.8" />
      <line x1="76" y1="58" x2="79" y2="56" stroke="#0f172a" stroke-width="1.5" />
      <!-- Soft Cheek Blush -->
      <ellipse cx="52" cy="66" rx="4" ry="2" fill="#fb7185" opacity="0.45" />
      <ellipse cx="76" cy="66" rx="4" ry="2" fill="#fb7185" opacity="0.45" />
      <!-- Soft Lips Accent -->
      <ellipse cx="64" cy="72" rx="2.5" ry="1" fill="#f43f5e" opacity="0.75" />
    `;
  }

  // Class-specific Headgear/Accent
  let classAccent = '';
  if (charClass === 'VALKYRIE') {
    classAccent = `
      <!-- Valkyrie Winged Circlet -->
      <path d="M46,46 L54,36 L64,42 L74,36 L82,46 Z" fill="#e2e8f0" stroke="#f59e0b" stroke-width="1.5" />
      <circle cx="64" cy="40" r="3" fill="#38bdf8" />
    `;
  } else if (charClass === 'SORCERESS') {
    classAccent = `
      <!-- Celestial Tiara -->
      <polygon points="64,36 68,44 60,44" fill="#fbbf24" />
      <circle cx="64" cy="42" r="2.5" fill="#a855f7" />
    `;
  } else if (charClass === 'CYBER_HERO' || charClass === 'CYBER_VALKYRIE') {
    classAccent = `
      <rect x="48" y="56" width="32" height="8" rx="2" fill="#06b6d4" opacity="0.9" filter="url(#blurEffect)" />
      <rect x="50" y="57" width="28" height="6" rx="1" fill="#22d3ee" />
    `;
  } else if (charClass === 'MAGE') {
    classAccent = `<polygon points="64,52 67,58 64,64 61,58" fill="#38bdf8" />`;
  } else if (charClass === 'ROGUE' || charClass === 'KUNOICHI') {
    classAccent = `<path d="M48,66 L80,66 L76,74 L52,74 Z" fill="#0f172a" opacity="0.85" />`;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="256" height="256">
      <defs>
        <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f97316" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="arcaneGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#a855f7" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="holyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="lightningGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="sakuraGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#fda4af" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="celestialGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#facc15" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#c084fc" stop-opacity="0"/>
        </radialGradient>
        <filter id="blurEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>
      </defs>

      <!-- Background Card -->
      <rect width="128" height="128" rx="16" fill="#0b0f19"/>
      <rect x="2" y="2" width="124" height="124" rx="14" fill="none" stroke="#1e293b" stroke-width="2"/>

      <!-- Aura -->
      ${auraSvg}

      <!-- Body / Head -->
      <circle cx="64" cy="62" r="${isFemale ? 18.5 : 20}" fill="${skin}" stroke="#1e293b" stroke-width="1.5"/>

      <!-- Eyes -->
      <circle cx="56" cy="60" r="${isFemale ? 2.8 : 2.5}" fill="#0f172a"/>
      <circle cx="72" cy="60" r="${isFemale ? 2.8 : 2.5}" fill="#0f172a"/>
      <circle cx="57" cy="59" r="0.9" fill="#ffffff"/>
      <circle cx="73" cy="59" r="0.9" fill="#ffffff"/>

      <!-- Feminine Face Accents -->
      ${faceDetails}

      <!-- Hair -->
      ${hairSvg}

      <!-- Outfit -->
      ${outfitSvg}

      <!-- Class Accent -->
      ${classAccent}

      <!-- Weapon -->
      ${weaponSvg}
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

        const size = 320;
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
          'The Astral Sovereign',
          'Crimson Blademaster',
          'Shadow of the Eclipse',
          'Radiant Sun-Emperor',
          'Void Walker',
          'Storm Herald',
          'Chrono Weaver',
          'Valkyrie of Dawn',
          'Cyber Overdrive Enigma',
          'Aetherial Champion',
          'Master of the Unseen Realm',
          'Phoenix Harbinger',
        ];

        const classes = [
          'Photo-Born Paragon',
          'Astral Duelist',
          'Dimensional Sovereign',
          'Mystic Vanguard',
          'Hyper-Tech Ronin',
          'Celestial Sentinel',
        ];

        const uniqueTitle = titles[photoHash % titles.length];
        const uniqueClass = classes[(photoHash >> 2) % classes.length];
        const heroId = `HERO-${(photoHash % 8999 + 1000).toString(16).toUpperCase()}`;

        // 3. Pixelation & AI-Style Color Transformation
        const pixelSize = options.pixelSize || (style === 'PIXEL_HERO' ? 6 : 4);

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
              // 16-bit RPG Palette Snap with warm golden fantasy tones
              finalR = Math.min(255, Math.round(r / 32) * 32 + 20);
              finalG = Math.min(255, Math.round(g / 32) * 32 + 10);
              finalB = Math.round(b / 32) * 32;
            } else if (style === 'MYSTIC_ARCANE') {
              // Arcane violet & starlight cyan
              finalR = Math.floor(brightness * 180 + 40);
              finalG = Math.floor(brightness * 80 + 20);
              finalB = Math.floor(brightness * 255 + 60);
            } else if (style === 'CYBER_ROGUE') {
              // Cyberpunk Neon
              if (brightness > 0.55) {
                finalR = 34; finalG = 211; finalB = 238; // Neon Cyan
              } else if (brightness > 0.3) {
                finalR = 244; finalG = 63; finalB = 94; // Neon Pink
              } else {
                finalR = 15; finalG = 23; finalB = 42; // Deep Dark
              }
            } else if (style === 'HOLY_PALADIN') {
              // Gilded Holy Radiance
              finalR = Math.floor(brightness * 255);
              finalG = Math.floor(brightness * 220 + 25);
              finalB = Math.floor(brightness * 100);
            } else if (style === 'SHADOW_ASSASSIN') {
              // High contrast Dark Souls noir with crimson eyes
              const mono = Math.floor(brightness * 170);
              finalR = mono + 20;
              finalG = mono;
              finalB = mono;
            } else if (style === 'ANIME_LEGEND') {
              // Vibrant Anime Cel-Shading
              const steps = 4;
              const quantized = Math.floor(brightness * steps) / steps;
              finalR = Math.min(255, Math.floor(r * (quantized + 0.3) + 30));
              finalG = Math.min(255, Math.floor(g * (quantized + 0.3) + 20));
              finalB = Math.min(255, Math.floor(b * (quantized + 0.3) + 40));
            } else if (style === 'CELESTIAL_ASTRAL') {
              // Luminous Cosmic Gold & Indigo
              finalR = Math.floor(brightness * 240 + 30);
              finalG = Math.floor(brightness * 180 + 40);
              finalB = Math.floor(brightness * 255 + 30);
            }

            // Fill block
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

        // 4. Paint Unique RPG Frame & Hero Insignia Overlays
        // Vignette
        const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.35, size / 2, size / 2, size * 0.7);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, 'rgba(11, 15, 25, 0.75)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // Inscribed RPG Gold Border
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 6;
        ctx.strokeRect(3, 3, size - 6, size - 6);

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(8, 8, size - 16, size - 16);

        // Corner Runes
        ctx.fillStyle = '#fbbf24';
        const runeSize = 10;
        ctx.fillRect(4, 4, runeSize, runeSize);
        ctx.fillRect(size - runeSize - 4, 4, runeSize, runeSize);
        ctx.fillRect(4, size - runeSize - 4, runeSize, runeSize);
        ctx.fillRect(size - runeSize - 4, size - runeSize - 4, runeSize, runeSize);

        // Unique Hero ID Watermark tag
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(10, size - 26, 110, 18);
        ctx.fillStyle = '#fde68a';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`★ ${heroId}`, 16, size - 14);

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