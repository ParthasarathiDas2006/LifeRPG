/**
 * Life RPG - Hero & Callsign Name Generator
 * Provides battle-tested, unique gamer tags and titles inspired by
 * Free Fire, PUBG Mobile, Solo Leveling, and Cyberpunk/RPG archetypes.
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

  // Free Fire Kelly
  'hero-ff-kelly': [
    'Kelly "The Swift"',
    'Kelly Phoenix',
    'SwiftValkyrie',
    'Velocity_Kelly',
    'BlazeSprinter',
    'GoldenStrike_Kelly',
    'HyperKelly',
    'FlashKelly',
    'SonicMirage',
    'Apex_Kelly',
    'PhoenixWing_Kelly',
    'WindrunnerKelly',
  ],

  // PUBG Lone Survivor
  'hero-pubg-lone-survivor': [
    'PUBG Lone Survivor',
    'Spetsnaz_Ghost',
    'WinnerWinner_Dinner',
    'AirdropCommando',
    'Level3_Reaper',
    'PochinkiPhantom',
    'ErangelSniper',
    'LoneWarlord',
    'RedZoneSurvivor',
    'ApexPredator_PUBG',
    'ChickenDinnerKing',
    'M416_Gunslinger',
  ],

  // Free Fire DJ Alok
  'hero-ff-alok': [
    'DJ Alok "Beat Master"',
    'DJ_Alok_Prime',
    'SoundwaveMaestro',
    'DropTheBeat_Alok',
    'NeonEqualizer',
    'BeatMaster_Alok',
    'CyberBass_Alok',
    'HarmonicOverload',
    'BassCannon_Alok',
    'PulseCommander',
    'Alok_AudioNexus',
    'FrequencyKing',
  ],

  // PUBG Valkyrie Sniper
  'hero-pubg-valkyrie': [
    'Valkyrie Commando',
    'Valkyrie_AWM',
    'GhostScope_8x',
    'OneShotElena',
    'SilentValkyrie',
    'BulletWhisper',
    'DeadEye_Elena',
    'MiramarWraith',
    'FrostbiteValkyrie',
    'EagleEyeValkyrie',
    'PochinkiQueen',
    'ValkyriePhantom',
  ],

  // Free Fire Moco
  'hero-ff-moco': [
    'Moco "Cyber Matrix"',
    'Moco_Matrix',
    'CyberDread_Moco',
    'NeuralBreaker',
    'ZeroDay_Moco',
    'FirewallGhost',
    'GlitchQueen_Moco',
    'CypherInfiltrator',
    'QuantumMoco',
    'NeonHacker_Moco',
    'NetRunner_Prime',
    'Moco_CodeBreaker',
  ],

  // PUBG Golden Pharaoh
  'hero-pubg-pharaoh': [
    'Golden Pharaoh',
    'Pharaoh_Ra',
    'SolarEmperor',
    'AnubisWarlord',
    'GoldenOsiris',
    'DynastyPharaoh',
    'SunGod_Horus',
    'GildedImmortal',
    'PyramidMonarch',
    'EternalPharaoh',
    'DesertSovereign',
    'Pharaoh_AmonRa',
  ],

  // Free Fire Hayato
  'hero-ff-hayato': [
    'Hayato Shimada',
    'Hayato_Bushido',
    'BladeMaster_Hayato',
    'CrimsonSlash_Hayato',
    'KatanaGhost',
    'FlameSamurai_Hayato',
    'HonorForged_Hayato',
    'ShadowRonin_Hayato',
    'SteelLotus_Hayato',
    'BloodlineKatana',
    'Shimada_Blaze',
    'BushidoStriker',
  ],

  // Free Fire Chrono
  'hero-ff-chrono': [
    'Chrono "Time Warper"',
    'Chrono_CR7',
    'TimeWarp_Commander',
    'TemporalAegis',
    'ForcefieldGod',
    'QuantumChrono',
    'ChronoSphere',
    'ClockworkReaper',
    'ParadoxWarper',
    'Chrono_Striker',
    'NexusVanguard',
    'ChronoMatrix',
  ],

  // PUBG Desert Assassin
  'hero-pubg-desert': [
    'Miramar Desert Assassin',
    'MiramarRebel',
    'QuickdrawSarah',
    'SandstormSpectre',
    'DesertViper',
    'DeagleDuellist',
    'DuneAssassin',
    'ScorpionQueen',
    'MiramarPhantom',
    'WildWestSarah',
    'DustReaper',
    'MiramarQuickdraw',
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
