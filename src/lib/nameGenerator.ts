/**
 * Life RPG - Hero & Callsign Name Generator
 * Provides battle-tested, unique gamer tags and titles for
 * Original 3D Champions, Solo Leveling, and Cyberpunk RPG archetypes.
 */

export const HERO_RANDOM_NAMES: Record<string, string[]> = {
  // Original Battle Royale Vanguard Apex
  'hero-apex-vanguard': [
    'Vanguard "Apex Commander"',
    'Apex_Vanguard',
    'Titan_Cross',
    'Obsidian_Commando',
    'ZoneBreaker_99',
    'TacticalApex',
    'Overdrive_Vanguard',
    'ExtractionKing',
    'ZeroZone_Apex',
    'DropZoneVanguard',
    'Ironclad_Cross',
    'ApexStrike_Prime',
  ],

  // Original Battle Royale Nova Valkyrie
  'hero-nova-valkyrie': [
    'Nova "Valkyrie Prime"',
    'Nova_CyanStrike',
    'ValkyrieDrop',
    'ExtractionQueen',
    'NovaLuminescent',
    'Apex_Valkyrie',
    'CyanGhost_Nova',
    'HighGroundNova',
    'PulseValkyrie',
    'AirfieldNova',
    'TacticalNova_X',
    'ApexHuntress_Nova',
  ],

  // Original Solaris
  'hero-original-solaris': [
    'Solaris "Solar Vanguard"',
    'Solaris_Prime',
    'SolarFlare_X',
    'OrbitalHuntress',
    'Sunfire_Solaris',
    'Astraea_Drake',
    'NovaSolaris',
    'SolarDrop_99',
    'RadiantAegis',
    'Solaris_Apex',
  ],

  // Original Commander Aegis
  'hero-original-aegis': [
    'Commander Aegis "Ironclad"',
    'Aegis_Commander',
    'Ironclad_Vane',
    'HighlandAegis',
    'TitanBulwark',
    'Ronan_Aegis',
    'HeavyRecon_99',
    'AegisOverwatch',
    'PlateCarrier_Aegis',
    'VanguardAegis',
  ],

  // Original 3D Cyber-Audio Hero Echo
  'hero-original-echo': [
    'Echo "Soundwave Sentinel"',
    'Echo_SonicBeat',
    'ResonantSentinel',
    'Soundwave_Echo',
    'FrequencyOverlord',
    'Echo_BassPrime',
    'HarmonicWarrior',
    'EchoPulse_99',
    'AudioAegis_Echo',
    'BeatMaster_Echo',
    'CyberBass_Echo',
    'PulseCommander',
  ],

  // Original 3D Cyber-Hacker Heroine Cipher
  'hero-original-cipher': [
    'Cipher "Neon Infiltrator"',
    'Cipher_NeonGlitch',
    'DataCore_Cipher',
    'InfiltratorCipher',
    'ZeroDay_Cipher',
    'QuantumCipher',
    'NeuralBreaker_Cipher',
    'Cipher_MatrixPrime',
    'GhostProtocol_Cipher',
    'FirewallSpectre',
    'NetRunner_Cipher',
    'DecryptionQueen',
  ],

  // Backward compatibility aliases mapping to original champions
  'hero-ff-kelly': [
    'Solaris "Solar Vanguard"',
    'Solaris_Prime',
    'SolarFlare_X',
    'OrbitalHuntress',
    'Sunfire_Solaris',
    'NovaSolaris',
  ],
  'hero-pubg-lone-survivor': [
    'Commander Aegis "Ironclad"',
    'Aegis_Commander',
    'Ironclad_Vane',
    'HighlandAegis',
    'TitanBulwark',
    'VanguardAegis',
  ],
  'hero-ff-alok': [
    'Echo "Soundwave Sentinel"',
    'Echo_SonicBeat',
    'ResonantSentinel',
    'Soundwave_Echo',
    'FrequencyOverlord',
  ],
  'hero-pubg-valkyrie': [
    'Nova "Valkyrie Prime"',
    'Nova_CyanStrike',
    'ValkyrieDrop',
    'ExtractionQueen',
  ],
  'hero-ff-moco': [
    'Cipher "Neon Infiltrator"',
    'Cipher_NeonGlitch',
    'DataCore_Cipher',
    'InfiltratorCipher',
  ],
  'hero-pubg-pharaoh': [
    'Vanguard "Apex Commander"',
    'Apex_Vanguard',
    'Titan_Cross',
  ],
  'hero-ff-hayato': [
    'Commander Aegis "Ironclad"',
    'Aegis_Commander',
  ],
  'hero-ff-chrono': [
    'Vanguard "Apex Commander"',
    'Apex_Vanguard',
  ],
  'hero-pubg-desert': [
    'Solaris "Solar Vanguard"',
    'Solaris_Prime',
  ],

  // Solo Leveling Sung Jin-Woo
  'hero-sl-jinwoo': [
    'Sung Jin-Woo',
    'ShadowMonarch_Jinwoo',
    'Arise_Sovereign',
    'SRank_Jinwoo',
    'DarkMonarch',
    'VoidEmperor_Jinwoo',
    'IgrisCommander',
    'KasakaFang_Jinwoo',
    'DaggerGod_Jinwoo',
    'AbyssalSovereign',
    'ShadowLord_Jinwoo',
    'Sung_VoidHunter',
  ],
};

export const CLASS_RANDOM_NAMES: Record<string, string[]> = {
  WARRIOR: [
    'Ares_Dominator',
    'Titan_Buster',
    'IronVanguard',
    'WarlordKael',
    'Bloodhowl',
    'ColossusStrike',
    'BerserkerRex',
    'Steelbreaker',
  ],
  VALKYRIE: [
    'Valkyrie_Freya',
    'ShieldMaiden_Signy',
    'SpearOfDawn',
    'CelestialValkyrie',
    'BattleSeraph',
    'StormValkyrie',
  ],
  PALADIN: [
    'Solaris_Knight',
    'Aegis_Crusader',
    'HolyVindicator',
    'DawnSentinel',
    'RadiantTemplar',
    'ShieldOfLight',
    'BastionOfValor',
  ],
  ROGUE: [
    'PhantomStep',
    'ViperDagger',
    'Ghostblade',
    'Nightshade',
    'ShadowSilent',
    'VoidRogue',
    'SilentWhisper',
    'DarkStalker',
  ],
  KUNOICHI: [
    'Sakura_Shadow',
    'CrimsonKunoichi',
    'LotusBlade',
    'NightRaven_Shinobi',
    'MistDancer',
    'SilentShuriken',
  ],
  MAGE: [
    'ArcaneWhisperer',
    'CosmicWeaver',
    'AstralSorcerer',
    'VoidMage',
    'Spellbreaker',
    'ChronoMage',
  ],
  SORCERESS: [
    'Sorceress_Morgana',
    'AstralWitch',
    'ArcaneEnchantress',
    'CelestialWeaver',
    'EclipseSorceress',
  ],
  HUNTRESS: [
    'DeadshotArtemis',
    'HawkEye_Hunter',
    'SwiftArrow',
    'ApexTracker',
    'Windrunner_Huntress',
    'SilverBow',
  ],
  RANGER: [
    'Strider_Ranger',
    'WildernessScout',
    'Pathfinder_Ranger',
    'GhillieHunter',
    'Falconer',
  ],
  CYBER_HERO: [
    'CyberPulse',
    'NeoMatrix',
    'NanoVanguard',
    'QuantumBreaker',
    'TechNova',
    'OverclockHero',
  ],
  CYBER_VALKYRIE: [
    'CyberValkyrie_Zero',
    'GlitchSeraph',
    'HoloShield',
    'MatrixValkyrie',
    'NeonEmpress',
  ],
  PHOTO_AVATAR: [
    'LegendaryHero',
    'ApexIcon',
    'SovereignPersona',
    'MythicAscendant',
    'DivineProtagonist',
  ],
};

export const RANDOM_TITLES = [
  'Awakened Phoenix Sprinter',
  'Winner Winner Chicken Dinner Legend',
  'Soundwave Apex & Beat Maestro',
  'Ghost Sniper of Pochinki & AWM Queen',
  'Grand Infiltrator of the Neural Grid',
  'Eternal Sovereign of the Desert Sun',
  'Scorching Heir of the Shimada Katana',
  'Cyber Mercenary & Time Guardian',
  'Miramar Phantom & Quickdraw Ace',
  'Monarch of Shadows & Void Emperor',
  'Undefeated Battle Royale Champion',
  'Ascendant S-Rank Discipline Monarch',
  'Mythic Grandmaster of Habit Mastery',
  'Apex Striker of the Daily Grind',
  'Iron Will Titan of Deep Work',
];

/**
 * Returns a random name and title tailored to the given hero preset ID or character class.
 */
export function getRandomNameAndTitle(
  heroPresetId?: string,
  charClass?: string,
  currentName?: string
): { name: string; title: string } {
  let pool: string[] = [];

  // Match hero ID first
  if (heroPresetId && HERO_RANDOM_NAMES[heroPresetId]) {
    pool = [...HERO_RANDOM_NAMES[heroPresetId]];
  }

  // Fallback to class pool
  if (pool.length === 0 && charClass && CLASS_RANDOM_NAMES[charClass]) {
    pool = [...CLASS_RANDOM_NAMES[charClass]];
  }

  // General fallback
  if (pool.length === 0) {
    pool = [
      'Apex_Legend',
      'Shadow_Hunter',
      'Phoenix_Striker',
      'Neon_Ghost',
      'Cyber_Phantom',
      'Vanguard_Hero',
      'Raid_Commander',
      'Frost_Reaper',
    ];
  }

  // Filter out current name if possible to ensure a change
  const eligibleNames = pool.filter((n) => n !== currentName);
  const selectedName =
    eligibleNames.length > 0
      ? eligibleNames[Math.floor(Math.random() * eligibleNames.length)]
      : pool[Math.floor(Math.random() * pool.length)];

  const selectedTitle = RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES.length)];

  return {
    name: selectedName,
    title: selectedTitle,
  };
}
