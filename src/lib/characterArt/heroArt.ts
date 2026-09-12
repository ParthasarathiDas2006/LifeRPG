/**
 * High-Fidelity AAA Battle Royale Vector Artwork Engine
 * Authentic video game styling inspired by Free Fire, PUBG Mobile, and Solo Leveling.
 * Full human proportions, battle outfits, weapons, lighting, and auras.
 */

// Helper to wrap SVG in base64 data URI
export function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

// 1. KELLY "THE SWIFT" (Free Fire Awakened Phoenix Legend)
export const KELLY_ART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" width="100%" height="100%">
  <defs>
    <radialGradient id="ffBg" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#451a03" />
      <stop offset="45%" stop-color="#1c0902" />
      <stop offset="100%" stop-color="#050201" />
    </radialGradient>
    <radialGradient id="phoenixBurst" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9" />
      <stop offset="35%" stop-color="#f97316" stop-opacity="0.6" />
      <stop offset="70%" stop-color="#dc2626" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="kellyTrackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#facc15" />
      <stop offset="100%" stop-color="#ca8a04" />
    </linearGradient>
    <linearGradient id="kellySkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#fde047" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <linearGradient id="hairKellyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="60%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#a16207" />
    </linearGradient>
    <filter id="flameBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12" />
    </filter>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="b" />
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="500" height="650" rx="36" fill="url(#ffBg)" />
  <circle cx="250" cy="260" r="230" fill="url(#phoenixBurst)" filter="url(#flameBlur)" />

  <!-- Phoenix Wings Particle Auras -->
  <g opacity="0.85" filter="url(#goldGlow)">
    <path d="M120,420 Q40,260 90,140 Q130,220 180,300 Z" fill="#f97316" opacity="0.6" />
    <path d="M380,420 Q460,260 410,140 Q370,220 320,300 Z" fill="#f97316" opacity="0.6" />
    <path d="M150,380 Q90,240 140,160 Q170,230 200,320 Z" fill="#fef08a" opacity="0.75" />
    <path d="M350,380 Q410,240 360,160 Q330,230 300,320 Z" fill="#fef08a" opacity="0.75" />
    <!-- Sparks -->
    <circle cx="110" cy="180" r="4" fill="#fef08a" />
    <circle cx="390" cy="190" r="3.5" fill="#fef08a" />
    <circle cx="140" cy="120" r="2.5" fill="#f97316" />
    <circle cx="360" cy="110" r="3" fill="#f97316" />
    <circle cx="250" cy="90" r="3.5" fill="#ffffff" />
  </g>

  <!-- Legs and Running Stance -->
  <g id="kellyLegs">
    <!-- Left Leg Athletic Cargo -->
    <path d="M210,410 L185,570 L215,575 L235,420 Z" fill="#18181b" stroke="#ca8a04" stroke-width="1.5" />
    <path d="M185,450 L175,510 L195,515 L200,455 Z" fill="#27272a" /> <!-- Pistol holster -->
    <rect x="180" y="445" width="22" height="6" rx="2" fill="#ca8a04" />
    <!-- Right Leg Athletic Cargo -->
    <path d="M290,410 L315,570 L285,575 L265,420 Z" fill="#18181b" stroke="#ca8a04" stroke-width="1.5" />
    <path d="M305,450 L315,510 L295,515 L290,455 Z" fill="#27272a" />
    <rect x="290" y="445" width="22" height="6" rx="2" fill="#ca8a04" />

    <!-- Combat Sprint Boots -->
    <path d="M175,565 L220,570 L225,605 L165,605 L165,585 Z" fill="#facc15" stroke="#09090b" stroke-width="2" />
    <path d="M165,595 L225,595 L225,608 L165,608 Z" fill="#09090b" />
    <path d="M325,565 L280,570 L275,605 L335,605 L335,585 Z" fill="#facc15" stroke="#09090b" stroke-width="2" />
    <path d="M275,595 L335,595 L335,608 L275,608 Z" fill="#09090b" />
  </g>

  <!-- Torso & Yellow Track Jacket -->
  <g id="kellyTorso">
    <!-- Body Core -->
    <path d="M180,240 L160,370 L220,420 L280,420 L340,370 L320,240 Z" fill="url(#kellyTrackGrad)" stroke="#a16207" stroke-width="2" />
    <!-- Black Racing Side Stripes -->
    <path d="M175,250 L160,365 L180,370 L195,255 Z" fill="#09090b" />
    <path d="M325,250 L340,365 L320,370 L305,255 Z" fill="#09090b" />
    <line x1="188" y1="250" x2="175" y2="365" stroke="#ffffff" stroke-width="2" />
    <line x1="312" y1="250" x2="325" y2="365" stroke="#ffffff" stroke-width="2" />

    <!-- Inner Kevlar Sport Top -->
    <polygon points="215,245 285,245 270,320 230,320" fill="#18181b" stroke="#facc15" stroke-width="1.5" />
    <!-- Exposed Midriff (Athletic Human Muscle Definition) -->
    <path d="M225,320 L275,320 L280,375 L220,375 Z" fill="url(#kellySkinGrad)" />
    <!-- Abdominal shading & belly button -->
    <line x1="250" y1="330" x2="250" y2="365" stroke="#d97706" stroke-width="1.5" opacity="0.6" />
    <circle cx="250" cy="360" r="2" fill="#b45309" />

    <!-- Utility Belt with Golden Buckle -->
    <rect x="195" y="390" width="110" height="18" rx="4" fill="#09090b" stroke="#713f12" stroke-width="1" />
    <rect x="238" y="387" width="24" height="24" rx="5" fill="#facc15" stroke="#a16207" stroke-width="2" />
    <circle cx="250" cy="399" r="4.5" fill="#09090b" />
  </g>

  <!-- Arms & Combat Gloves -->
  <g id="kellyArms">
    <!-- Left Arm -->
    <path d="M180,240 L130,320 L150,380 L170,370 L150,320 L195,255 Z" fill="url(#kellyTrackGrad)" stroke="#a16207" stroke-width="1.5" />
    <!-- Left Forearm & Fingerless Glove -->
    <path d="M145,360 L135,420 L155,425 L168,365 Z" fill="url(#kellySkinGrad)" />
    <path d="M132,410 L125,450 L150,455 L155,415 Z" fill="#18181b" stroke="#eab308" stroke-width="1.5" />
    <circle cx="140" cy="435" r="3.5" fill="#facc15" />

    <!-- Right Arm holding Dual Energy Kunai -->
    <path d="M320,240 L370,320 L350,380 L330,370 L350,320 L305,255 Z" fill="url(#kellyTrackGrad)" stroke="#a16207" stroke-width="1.5" />
    <!-- Right Forearm & Glove -->
    <path d="M355,360 L365,420 L345,425 L332,365 Z" fill="url(#kellySkinGrad)" />
    <path d="M368,410 L375,450 L350,455 L345,415 Z" fill="#18181b" stroke="#eab308" stroke-width="1.5" />
    <circle cx="360" cy="435" r="3.5" fill="#facc15" />

    <!-- Energy Kunai Blade (Right Hand) -->
    <g transform="rotate(35 365 440)" filter="url(#goldGlow)">
      <polygon points="365,340 372,440 358,440" fill="#fef08a" stroke="#f59e0b" stroke-width="2" />
      <line x1="365" y1="345" x2="365" y2="435" stroke="#ffffff" stroke-width="2" />
    </g>
  </g>

  <!-- Attractive Human Head & Face -->
  <g id="kellyHead">
    <!-- Neck -->
    <path d="M232,210 L228,255 L272,255 L268,210 Z" fill="#f59e0b" />
    <path d="M236,210 L234,250 L266,250 L264,210 Z" fill="url(#kellySkinGrad)" />

    <!-- Slender Female Jaw & Face Contour -->
    <path d="M195,145 C195,215 225,235 250,235 C275,235 305,215 305,145 C305,95 275,85 250,85 C225,85 195,95 195,145 Z" fill="url(#kellySkinGrad)" stroke="#b45309" stroke-width="1" />

    <!-- Soft Cheek Blush -->
    <ellipse cx="218" cy="180" rx="14" ry="7" fill="#f43f5e" opacity="0.35" filter="url(#flameBlur)" />
    <ellipse cx="282" cy="180" rx="14" ry="7" fill="#f43f5e" opacity="0.35" filter="url(#flameBlur)" />

    <!-- Big Sparkling Anime Amber Eyes -->
    <!-- Left Eye -->
    <g id="kellyLeftEye">
      <path d="M210,162 Q225,152 238,162 Q225,172 210,162 Z" fill="#ffffff" />
      <ellipse cx="225" cy="162" rx="7" ry="8" fill="#d97706" />
      <ellipse cx="225" cy="164" rx="5.5" ry="6" fill="#facc15" />
      <circle cx="225" cy="163" r="3" fill="#09090b" />
      <circle cx="222" cy="160" r="2.2" fill="#ffffff" />
      <circle cx="227" cy="165" r="1.2" fill="#ffffff" />
      <!-- Eyelash and Arch -->
      <path d="M208,162 Q225,150 240,160" fill="none" stroke="#09090b" stroke-width="3" stroke-linecap="round" />
      <path d="M210,150 Q225,143 238,147" fill="none" stroke="#a16207" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- Right Eye -->
    <g id="kellyRightEye">
      <path d="M262,162 Q275,152 290,162 Q275,172 262,162 Z" fill="#ffffff" />
      <ellipse cx="275" cy="162" rx="7" ry="8" fill="#d97706" />
      <ellipse cx="275" cy="164" rx="5.5" ry="6" fill="#facc15" />
      <circle cx="275" cy="163" r="3" fill="#09090b" />
      <circle cx="272" cy="160" r="2.2" fill="#ffffff" />
      <circle cx="277" cy="165" r="1.2" fill="#ffffff" />
      <path d="M260,160 Q275,150 292,162" fill="none" stroke="#09090b" stroke-width="3" stroke-linecap="round" />
      <path d="M262,147 Q275,143 290,150" fill="none" stroke="#a16207" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- Cute Nose & Confident Smile -->
    <path d="M248,172 L252,182 L247,183" fill="none" stroke="#b45309" stroke-width="1.8" stroke-linecap="round" />
    <path d="M241,198 Q250,206 259,198" fill="none" stroke="#be123c" stroke-width="2.8" stroke-linecap="round" />
    <ellipse cx="250" cy="201" rx="4" ry="2" fill="#fb7185" opacity="0.8" />

    <!-- Kelly's Signature Golden Anime Bob with Headband -->
    <!-- Hair Back Volume -->
    <path d="M185,150 Q160,200 175,250 Q195,220 205,170 Z" fill="#a16207" />
    <path d="M315,150 Q340,200 325,250 Q305,220 295,170 Z" fill="#a16207" />

    <!-- White Sports Headband -->
    <path d="M192,130 Q250,110 308,130 L306,144 Q250,124 194,144 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
    <!-- Free Fire Red Emblem on Headband -->
    <polygon points="247,126 253,126 255,134 250,138 245,134" fill="#dc2626" />

    <!-- Hair Front Bangs & Layers -->
    <path d="M188,140 Q250,70 312,140 Q285,115 250,110 Q215,115 188,140 Z" fill="url(#hairKellyGrad)" />
    <!-- Swept Bangs Framing the Face -->
    <path d="M190,140 Q220,180 230,195 Q235,160 245,185 Q255,160 270,195 Q280,180 310,140 Q250,95 190,140 Z" fill="url(#hairKellyGrad)" stroke="#78350f" stroke-width="1.2" />
    <!-- Hair Highlights -->
    <path d="M205,120 Q250,95 295,120" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.8" />
  </g>

  <!-- High-End Game Card Frame Overlay -->
  <rect x="10" y="10" width="480" height="630" rx="28" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.85" />
  <rect x="18" y="18" width="464" height="614" rx="20" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />

  <!-- Game Badges Header -->
  <g transform="translate(25, 25)">
    <rect x="0" y="0" width="160" height="28" rx="14" fill="#09090b" stroke="#f59e0b" stroke-width="1.5" />
    <circle cx="16" cy="14" r="7" fill="#f97316" />
    <text x="28" y="18" fill="#fde047" font-size="11" font-family="sans-serif" font-weight="900" letter-spacing="1">
      FREE FIRE • KELLY
    </text>
  </g>
  <g transform="translate(360, 25)">
    <rect x="0" y="0" width="115" height="28" rx="14" fill="#09090b" stroke="#eab308" stroke-width="1.5" />
    <text x="57" y="18" fill="#facc15" font-size="11" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">
      ★ MYTHIC ★
    </text>
  </g>

  <!-- Bottom Hero Name Banner -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#09090b" stroke="#f59e0b" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="900">
      KELLY "THE SWIFT"
    </text>
    <text x="420" y="27" fill="#facc15" font-size="13" font-family="monospace" font-weight="900" text-anchor="end">
      SPEED: 99 • AGI
    </text>
  </g>
</svg>
`;

// 2. PUBG LONE SURVIVOR (Level 3 Spetsnaz Legend)
export const PUBG_SURVIVOR_ART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" width="100%" height="100%">
  <defs>
    <radialGradient id="pubgBg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>
    <radialGradient id="airdropGlow" cx="50%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#dc2626" stop-opacity="0.8" />
      <stop offset="45%" stop-color="#991b1b" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="metalHelm" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64748b" />
      <stop offset="50%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="60%" stop-color="#f1f5f9" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>
    <filter id="redSmoke" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" />
    </filter>
    <filter id="visorGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="g" />
      <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="500" height="650" rx="36" fill="url(#pubgBg)" />
  <circle cx="250" cy="220" r="220" fill="url(#airdropGlow)" filter="url(#redSmoke)" />

  <!-- Airdrop Smoke Plumes -->
  <path d="M100,500 Q60,320 120,180 Q160,260 140,420 Z" fill="#ef4444" opacity="0.35" filter="url(#redSmoke)" />
  <path d="M400,500 Q440,320 380,180 Q340,260 360,420 Z" fill="#ef4444" opacity="0.35" filter="url(#redSmoke)" />

  <!-- Legs & Tactical Cargo Pants -->
  <g id="pubgLegs">
    <path d="M205,420 L175,570 L215,575 L235,430 Z" fill="#334155" stroke="#1e293b" stroke-width="2" />
    <path d="M295,420 L325,570 L285,575 L265,430 Z" fill="#334155" stroke="#1e293b" stroke-width="2" />
    <!-- Knee Pads -->
    <rect x="178" y="475" width="32" height="36" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1.5" />
    <rect x="290" y="475" width="32" height="36" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1.5" />
    <!-- Heavy Assault Boots -->
    <path d="M165,565 L218,570 L220,608 L155,608 L155,585 Z" fill="#0f172a" stroke="#475569" stroke-width="2" />
    <path d="M335,565 L282,570 L280,608 L345,608 L345,585 Z" fill="#0f172a" stroke="#475569" stroke-width="2" />
  </g>

  <!-- Torso: White Collared Shirt, Red Tie & Holster Harness -->
  <g id="pubgTorso">
    <!-- Crisp White Dress Shirt -->
    <path d="M170,240 L150,380 L225,430 L275,430 L350,380 L330,240 Z" fill="url(#shirtGrad)" stroke="#94a3b8" stroke-width="2" />

    <!-- Leather Shoulder Holster Straps -->
    <line x1="185" y1="240" x2="250" y2="400" stroke="#78350f" stroke-width="9" stroke-linecap="round" />
    <line x1="315" y1="240" x2="250" y2="400" stroke="#78350f" stroke-width="9" stroke-linecap="round" />
    <circle cx="250" cy="400" r="7" fill="#d97706" stroke="#451a03" stroke-width="2" />

    <!-- Loosened Red Tie -->
    <polygon points="245,245 255,245 260,350 250,375 240,350" fill="#dc2626" stroke="#991b1b" stroke-width="1.5" />
    <!-- Collar Triangles -->
    <polygon points="230,230 250,250 240,225" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
    <polygon points="270,230 250,250 260,225" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />

    <!-- Tactical Belt with Ammo Pouches -->
    <rect x="185" y="405" width="130" height="20" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
    <rect x="200" y="402" width="22" height="26" rx="3" fill="#451a03" stroke="#d97706" stroke-width="1" />
    <rect x="278" y="402" width="22" height="26" rx="3" fill="#451a03" stroke="#d97706" stroke-width="1" />
    <rect x="240" y="400" width="20" height="28" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
  </g>

  <!-- Muscular Arms with Rolled-Up Sleeves holding M416 -->
  <g id="pubgArms">
    <!-- Left Arm -->
    <path d="M170,240 L130,310 L150,370 L195,255 Z" fill="url(#shirtGrad)" stroke="#94a3b8" stroke-width="1.5" />
    <rect x="132" y="305" width="25" height="14" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1" />
    <!-- Toned Forearm -->
    <path d="M138,320 L125,410 L150,415 L158,325 Z" fill="#fbcfe8" />
    <!-- Fingerless Tactical Glove -->
    <path d="M123,405 L115,445 L145,450 L148,410 Z" fill="#0f172a" stroke="#475569" stroke-width="1.5" />

    <!-- Right Arm holding M416 Assault Rifle -->
    <path d="M330,240 L370,310 L350,370 L305,255 Z" fill="url(#shirtGrad)" stroke="#94a3b8" stroke-width="1.5" />
    <rect x="343" y="305" width="25" height="14" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1" />
    <path d="M362,320 L375,410 L350,415 L342,325 Z" fill="#fbcfe8" />
    <path d="M377,405 L385,445 L355,450 L352,410 Z" fill="#0f172a" stroke="#475569" stroke-width="1.5" />

    <!-- Signature PUBG M416 Rifle -->
    <g transform="rotate(35 340 370)">
      <rect x="330" y="160" width="18" height="260" rx="3" fill="#0f172a" stroke="#334155" stroke-width="2" />
      <!-- Barrel & Flash Hider -->
      <rect x="336" y="120" width="6" height="40" fill="#475569" />
      <rect x="334" y="112" width="10" height="10" fill="#0f172a" />
      <!-- Red Dot Sight with Hologram -->
      <rect x="325" y="240" width="28" height="20" rx="4" fill="#1e293b" stroke="#dc2626" stroke-width="1.5" />
      <circle cx="339" cy="250" r="3" fill="#ef4444" filter="url(#visorGlow)" />
      <!-- Magazine & Stock -->
      <polygon points="325,320 305,370 325,370 340,320" fill="#020617" />
      <rect x="328" y="380" width="22" height="60" rx="4" fill="#334155" />
    </g>
  </g>

  <!-- Iconic Spetsnaz Level 3 Helmet & Face -->
  <g id="pubgHelmet">
    <!-- Neck -->
    <path d="M230,200 L228,245 L272,245 L270,200 Z" fill="#e2e8f0" />

    <!-- Helmet Shell Dome -->
    <path d="M165,185 C160,80 340,80 335,185 L328,230 C328,255 172,255 172,230 Z" fill="url(#metalHelm)" stroke="#0f172a" stroke-width="3" />
    <!-- Helmet Top Rim & Rivets -->
    <path d="M172,170 C178,100 322,100 328,170 Z" fill="#475569" opacity="0.4" />
    <circle cx="178" cy="185" r="4.5" fill="#94a3b8" />
    <circle cx="322" cy="185" r="4.5" fill="#94a3b8" />

    <!-- Heavy Ballistic Face Visor Shield -->
    <path d="M180,180 L320,180 L312,225 L188,225 Z" fill="#0f172a" stroke="#020617" stroke-width="3" />
    <!-- Visor Slit (Iconic Spetsnaz Viewport) -->
    <polygon points="194,190 306,190 300,214 200,214" fill="#020617" />
    <!-- Glinting Visor Reflection -->
    <polygon points="204,194 255,194 240,210 208,210" fill="#38bdf8" opacity="0.75" filter="url(#visorGlow)" />
    <line x1="195" y1="202" x2="305" y2="202" stroke="#0284c7" stroke-width="1.5" opacity="0.8" />
    <!-- Heavy Metal Visor Screws -->
    <circle cx="186" cy="202" r="3.5" fill="#cbd5e1" />
    <circle cx="314" cy="202" r="3.5" fill="#cbd5e1" />
  </g>

  <!-- Frame Border -->
  <rect x="10" y="10" width="480" height="630" rx="28" fill="none" stroke="#22c55e" stroke-width="3" opacity="0.85" />
  <rect x="18" y="18" width="464" height="614" rx="20" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />

  <!-- Badges -->
  <g transform="translate(25, 25)">
    <rect x="0" y="0" width="180" height="28" rx="14" fill="#09090b" stroke="#22c55e" stroke-width="1.5" />
    <circle cx="16" cy="14" r="7" fill="#22c55e" />
    <text x="28" y="18" fill="#86efac" font-size="11" font-family="sans-serif" font-weight="900" letter-spacing="1">
      PUBG • LONE SURVIVOR
    </text>
  </g>
  <g transform="translate(360, 25)">
    <rect x="0" y="0" width="115" height="28" rx="14" fill="#09090b" stroke="#f59e0b" stroke-width="1.5" />
    <text x="57" y="18" fill="#fde047" font-size="11" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">
      ★ LEVEL 3 ★
    </text>
  </g>

  <!-- Footer Banner -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#09090b" stroke="#22c55e" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900">
      WINNER WINNER CHICKEN DINNER
    </text>
    <text x="420" y="27" fill="#4ade80" font-size="13" font-family="monospace" font-weight="900" text-anchor="end">
      DEF: 95 • ARMOR
    </text>
  </g>
</svg>
`;

// 3. FREE FIRE - DJ ALOK "BEAT MASTER"
export const DJ_ALOK_ART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" width="100%" height="100%">
  <defs>
    <radialGradient id="alokBg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#164e63" />
      <stop offset="50%" stop-color="#082f49" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>
    <radialGradient id="alokAura" cx="50%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.8" />
      <stop offset="40%" stop-color="#0891b2" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="alokCoatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="60%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <filter id="neonSound" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="g" />
      <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="500" height="650" rx="36" fill="url(#alokBg)" />
  <circle cx="250" cy="220" r="220" fill="url(#alokAura)" opacity="0.8" filter="url(#neonSound)" />

  <!-- Equalizer Neon Audio Waveform Bars in Background -->
  <g opacity="0.8" filter="url(#neonSound)">
    <rect x="50" y="240" width="8" height="90" rx="4" fill="#22d3ee" />
    <rect x="65" y="200" width="8" height="130" rx="4" fill="#22d3ee" />
    <rect x="80" y="260" width="8" height="70" rx="4" fill="#facc15" />
    <rect x="410" y="260" width="8" height="70" rx="4" fill="#facc15" />
    <rect x="425" y="200" width="8" height="130" rx="4" fill="#22d3ee" />
    <rect x="440" y="240" width="8" height="90" rx="4" fill="#22d3ee" />
    <!-- Pulse audio rings -->
    <circle cx="250" cy="220" r="160" fill="none" stroke="#22d3ee" stroke-width="2" stroke-dasharray="14,10" />
    <circle cx="250" cy="220" r="190" fill="none" stroke="#facc15" stroke-width="2" stroke-dasharray="8,16" />
  </g>

  <!-- Legs & DJ Joggers -->
  <g id="alokLegs">
    <path d="M205,420 L180,570 L218,575 L235,430 Z" fill="#0f172a" stroke="#22d3ee" stroke-width="1.5" />
    <path d="M295,420 L320,570 L282,575 L265,430 Z" fill="#0f172a" stroke="#22d3ee" stroke-width="1.5" />
    <line x1="183" y1="430" x2="198" y2="570" stroke="#facc15" stroke-width="4" />
    <line x1="317" y1="430" x2="302" y2="570" stroke="#facc15" stroke-width="4" />
    <!-- High-top Gold & Cyan Sneakers -->
    <path d="M170,565 L220,570 L225,608 L160,608 L160,585 Z" fill="#22d3ee" stroke="#facc15" stroke-width="2" />
    <path d="M330,565 L280,570 L275,608 L340,608 L340,585 Z" fill="#22d3ee" stroke="#facc15" stroke-width="2" />
  </g>

  <!-- Torso & Open Black DJ Duster with Gold Trim -->
  <g id="alokTorso">
    <path d="M165,240 L140,440 L215,440 L235,270 Z" fill="url(#alokCoatGrad)" stroke="#facc15" stroke-width="2" />
    <path d="M335,240 L360,440 L285,440 L265,270 Z" fill="url(#alokCoatGrad)" stroke="#facc15" stroke-width="2" />
    <!-- Inner Athletic Tank Top & Gold Chain -->
    <polygon points="215,250 285,250 270,390 230,390" fill="#020617" />
    <path d="M225,255 Q250,290 275,255" fill="none" stroke="#facc15" stroke-width="3" />
    <!-- Muscular Chest Definition -->
    <line x1="250" y1="265" x2="250" y2="340" stroke="#ca8a04" stroke-width="2" />
    <!-- Gold Audio Equalizer on Vest -->
    <circle cx="250" cy="330" r="16" fill="#0f172a" stroke="#22d3ee" stroke-width="2" filter="url(#neonSound)" />
    <circle cx="250" cy="330" r="8" fill="#facc15" />
  </g>

  <!-- Muscular Arms with Gold Audio Controllers -->
  <g id="alokArms">
    <path d="M165,240 L120,310 L140,370 L185,260 Z" fill="url(#alokCoatGrad)" />
    <path d="M130,320 L115,410 L142,415 L150,330 Z" fill="#d97706" />
    <!-- Gold Controller Wristpad (Left) -->
    <rect x="110" y="400" width="36" height="24" rx="4" fill="#0f172a" stroke="#facc15" stroke-width="2" />
    <circle cx="120" cy="412" r="3" fill="#22d3ee" />
    <circle cx="135" cy="412" r="3" fill="#22d3ee" />

    <path d="M335,240 L380,310 L360,370 L315,260 Z" fill="url(#alokCoatGrad)" />
    <path d="M370,320 L385,410 L358,415 L350,330 Z" fill="#d97706" />
    <rect x="354" y="400" width="36" height="24" rx="4" fill="#0f172a" stroke="#facc15" stroke-width="2" />
    <circle cx="365" cy="412" r="3" fill="#22d3ee" />
    <circle cx="380" cy="412" r="3" fill="#22d3ee" />

    <!-- Tactile Hands -->
    <path d="M110,418 L100,455 L130,455 L135,420 Z" fill="#b45309" />
    <path d="M390,418 L400,455 L370,455 L365,420 Z" fill="#b45309" />
  </g>

  <!-- Chiseled Face, Designer Beard, Gold Aviators & Undercut -->
  <g id="alokHead">
    <path d="M228,205 L225,250 L275,250 L272,205 Z" fill="#b45309" />
    <!-- Chiseled Male Jaw -->
    <polygon points="205,145 250,230 295,145 250,95" fill="#f59e0b" stroke="#92400e" stroke-width="1.5" />

    <!-- Groomed Designer Beard -->
    <path d="M210,175 Q250,235 290,175 L285,190 Q250,240 215,190 Z" fill="#0f172a" />

    <!-- Nose & Confident Smile -->
    <path d="M247,165 L253,178 L246,180" fill="none" stroke="#78350f" stroke-width="2" stroke-linecap="round" />
    <path d="M240,195 Q250,202 260,195" fill="none" stroke="#09090b" stroke-width="2.5" />

    <!-- Iconic Gold Aviator Sunglasses -->
    <g filter="url(#neonSound)">
      <rect x="210" y="148" width="36" height="22" rx="6" fill="#020617" stroke="#facc15" stroke-width="2.5" />
      <rect x="254" y="148" width="36" height="22" rx="6" fill="#020617" stroke="#facc15" stroke-width="2.5" />
      <line x1="246" y1="156" x2="254" y2="156" stroke="#facc15" stroke-width="3" />
      <!-- Cyan Reflection on Lens -->
      <line x1="214" y1="162" x2="238" y2="154" stroke="#22d3ee" stroke-width="2" opacity="0.85" />
      <line x1="258" y1="162" x2="282" y2="154" stroke="#22d3ee" stroke-width="2" opacity="0.85" />
    </g>

    <!-- Stylized Modern Undercut Hair -->
    <path d="M200,150 Q205,75 250,70 Q295,75 300,150 Q285,115 250,110 Q215,115 200,150 Z" fill="#0f172a" />
    <!-- Fade Texture Lines on Temple -->
    <line x1="202" y1="135" x2="215" y2="128" stroke="#334155" stroke-width="2" />
    <line x1="200" y1="145" x2="215" y2="138" stroke="#334155" stroke-width="2" />
  </g>

  <!-- Frame Border -->
  <rect x="10" y="10" width="480" height="630" rx="28" fill="none" stroke="#22d3ee" stroke-width="3" opacity="0.85" />
  <rect x="18" y="18" width="464" height="614" rx="20" fill="none" stroke="#facc15" stroke-width="1.5" opacity="0.6" />

  <!-- Badges -->
  <g transform="translate(25, 25)">
    <rect x="0" y="0" width="180" height="28" rx="14" fill="#09090b" stroke="#22d3ee" stroke-width="1.5" />
    <circle cx="16" cy="14" r="7" fill="#22d3ee" />
    <text x="28" y="18" fill="#a5f3fc" font-size="11" font-family="sans-serif" font-weight="900" letter-spacing="1">
      FREE FIRE • DJ ALOK
    </text>
  </g>
  <g transform="translate(360, 25)">
    <rect x="0" y="0" width="115" height="28" rx="14" fill="#09090b" stroke="#facc15" stroke-width="1.5" />
    <text x="57" y="18" fill="#fde047" font-size="11" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">
      ★ MYTHIC ★
    </text>
  </g>

  <!-- Footer Banner -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#09090b" stroke="#22d3ee" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900">
      DJ ALOK "BEAT MASTER"
    </text>
    <text x="420" y="27" fill="#22d3ee" font-size="13" font-family="monospace" font-weight="900" text-anchor="end">
      AURA HEAL: +15 HP
    </text>
  </g>
</svg>
`;

// 4. PUBG VALKYRIE COMMANDO (Female AWM Sniper Legend)
export const VALKYRIE_SNIPER_ART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" width="100%" height="100%">
  <defs>
    <radialGradient id="sniperBg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="50%" stop-color="#022c22" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>
    <radialGradient id="crosshairGlow" cx="50%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.8" />
      <stop offset="40%" stop-color="#059669" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="g" />
      <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="500" height="650" rx="36" fill="url(#sniperBg)" />
  <circle cx="250" cy="220" r="220" fill="url(#crosshairGlow)" filter="url(#emeraldGlow)" />

  <!-- Sniper Crosshair Radar Rings in Background -->
  <g opacity="0.6" stroke="#34d399" stroke-width="1.5">
    <circle cx="250" cy="200" r="140" fill="none" stroke-dasharray="10,6" />
    <circle cx="250" cy="200" r="80" fill="none" />
    <line x1="90" y1="200" x2="410" y2="200" />
    <line x1="250" y1="50" x2="250" y2="350" />
  </g>

  <!-- Legs & Woodland Camo Cargo Pants -->
  <g id="valkyrieLegs">
    <path d="M205,420 L180,570 L218,575 L235,430 Z" fill="#1e3a29" stroke="#065f46" stroke-width="1.5" />
    <path d="M295,420 L320,570 L282,575 L265,430 Z" fill="#1e3a29" stroke="#065f46" stroke-width="1.5" />
    <!-- Camo patches -->
    <ellipse cx="195" cy="480" rx="14" ry="8" fill="#14532d" />
    <ellipse cx="305" cy="510" rx="12" ry="7" fill="#14532d" />
    <!-- Sniper Combat Boots -->
    <path d="M170,565 L220,570 L225,608 L160,608 L160,585 Z" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <path d="M330,565 L280,570 L275,608 L340,608 L340,585 Z" fill="#0f172a" stroke="#10b981" stroke-width="2" />
  </g>

  <!-- Torso: Tactical Plate Carrier Vest over Fitted Camo Top -->
  <g id="valkyrieTorso">
    <path d="M175,240 L155,380 L225,430 L275,430 L345,380 L325,240 Z" fill="#047857" stroke="#065f46" stroke-width="2" />
    <!-- Heavy Spec-Ops Kevlar Plate Carrier -->
    <rect x="185" y="255" width="130" height="125" rx="8" fill="#064e3b" stroke="#34d399" stroke-width="2" />
    <!-- Ammo Magazine Pouches for AWM .300 Magnum -->
    <rect x="195" y="325" width="24" height="42" rx="3" fill="#022c22" stroke="#10b981" stroke-width="1.5" />
    <rect x="225" y="325" width="24" height="42" rx="3" fill="#022c22" stroke="#10b981" stroke-width="1.5" />
    <rect x="255" y="325" width="24" height="42" rx="3" fill="#022c22" stroke="#10b981" stroke-width="1.5" />
    <rect x="285" y="325" width="24" height="42" rx="3" fill="#022c22" stroke="#10b981" stroke-width="1.5" />
  </g>

  <!-- Arms & Tactical Shooting Gloves with Green Camo Wrist Bracer -->
  <g id="valkyrieArms">
    <path d="M175,240 L130,310 L150,370 L195,255 Z" fill="#047857" />
    <path d="M138,320 L125,410 L150,415 L158,325 Z" fill="#fde047" />
    <path d="M123,405 L115,445 L145,450 L148,410 Z" fill="#0f172a" stroke="#10b981" stroke-width="1.5" />

    <path d="M325,240 L370,310 L350,370 L305,255 Z" fill="#047857" />
    <path d="M362,320 L375,410 L350,415 L342,325 Z" fill="#fde047" />
    <path d="M377,405 L385,445 L355,450 L352,410 Z" fill="#0f172a" stroke="#10b981" stroke-width="1.5" />

    <!-- Iconic AWM Sniper Rifle (Arctic Warfare Magnum) -->
    <g transform="rotate(35 340 370)">
      <!-- Olive Green Stock -->
      <rect x="330" y="130" width="20" height="290" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="2" />
      <rect x="337" y="60" width="6" height="70" fill="#0f172a" />
      <rect x="334" y="50" width="12" height="15" fill="#334155" /> <!-- Muzzle Brake -->
      <!-- Massive 8x Scope -->
      <rect x="320" y="200" width="40" height="22" rx="6" fill="#0f172a" stroke="#34d399" stroke-width="1.5" />
      <circle cx="328" cy="211" r="5" fill="#10b981" filter="url(#emeraldGlow)" />
    </g>
  </g>

  <!-- Stunning Female Operative Face, Hazel Gaze, Camo Warpaint & Ponytail -->
  <g id="valkyrieHead">
    <path d="M232,205 L228,250 L272,250 L268,205 Z" fill="#fde047" />
    <!-- Elegant Sharp Jawline -->
    <path d="M195,145 C195,215 225,235 250,235 C275,235 305,215 305,145 C305,95 275,85 250,85 C225,85 195,95 195,145 Z" fill="#fef08a" stroke="#b45309" stroke-width="1" />

    <!-- Tactical Black/Green Warpaint Stripes across Cheekbones -->
    <line x1="205" y1="172" x2="225" y2="176" stroke="#064e3b" stroke-width="4" stroke-linecap="round" />
    <line x1="206" y1="180" x2="224" y2="183" stroke="#09090b" stroke-width="3" stroke-linecap="round" />
    <line x1="295" y1="172" x2="275" y2="176" stroke="#064e3b" stroke-width="4" stroke-linecap="round" />
    <line x1="294" y1="180" x2="276" y2="183" stroke="#09090b" stroke-width="3" stroke-linecap="round" />

    <!-- Piercing Hazel-Green Eyes -->
    <g id="valkLeftEye">
      <path d="M210,162 Q225,152 238,162 Q225,172 210,162 Z" fill="#ffffff" />
      <ellipse cx="225" cy="162" rx="7" ry="8" fill="#047857" />
      <ellipse cx="225" cy="164" rx="5" ry="6" fill="#34d399" />
      <circle cx="225" cy="163" r="3" fill="#09090b" />
      <circle cx="222" cy="160" r="2" fill="#ffffff" />
      <path d="M208,162 Q225,150 240,160" fill="none" stroke="#09090b" stroke-width="3" />
      <path d="M210,150 Q225,144 238,148" fill="none" stroke="#78350f" stroke-width="2.5" />
    </g>
    <g id="valkRightEye">
      <path d="M262,162 Q275,152 290,162 Q275,172 262,162 Z" fill="#ffffff" />
      <ellipse cx="275" cy="162" rx="7" ry="8" fill="#047857" />
      <ellipse cx="275" cy="164" rx="5" ry="6" fill="#34d399" />
      <circle cx="275" cy="163" r="3" fill="#09090b" />
      <circle cx="272" cy="160" r="2" fill="#ffffff" />
      <path d="M260,160 Q275,150 292,162" fill="none" stroke="#09090b" stroke-width="3" />
      <path d="M262,148 Q275,144 290,150" fill="none" stroke="#78350f" stroke-width="2.5" />
    </g>

    <path d="M248,172 L252,182 L247,183" fill="none" stroke="#b45309" stroke-width="1.8" />
    <path d="M242,198 Q250,204 258,198" fill="none" stroke="#be123c" stroke-width="2.8" />

    <!-- Tactical Comms Headset over Ears -->
    <rect x="186" y="160" width="14" height="26" rx="5" fill="#0f172a" stroke="#10b981" stroke-width="1.5" />
    <rect x="300" y="160" width="14" height="26" rx="5" fill="#0f172a" stroke="#10b981" stroke-width="1.5" />
    <path d="M190,160 Q250,110 310,160" fill="none" stroke="#0f172a" stroke-width="4" />
    <!-- Comms Mic -->
    <path d="M190,175 Q210,195 235,190" fill="none" stroke="#334155" stroke-width="2" />
    <circle cx="235" cy="190" r="3.5" fill="#10b981" />

    <!-- Sleek Brunette Ponytail Hair -->
    <path d="M250,90 Q330,60 350,140 Q330,220 290,260 Q300,190 270,140 Z" fill="#451a03" />
    <path d="M188,140 Q250,70 312,140 Q285,115 250,110 Q215,115 188,140 Z" fill="#78350f" />
    <path d="M190,140 Q220,175 230,190 Q235,160 250,185 Q265,160 270,190 Q280,175 310,140 Q250,95 190,140 Z" fill="#78350f" stroke="#451a03" stroke-width="1.2" />
  </g>

  <!-- Frame Border -->
  <rect x="10" y="10" width="480" height="630" rx="28" fill="none" stroke="#10b981" stroke-width="3" opacity="0.85" />
  <rect x="18" y="18" width="464" height="614" rx="20" fill="none" stroke="#34d399" stroke-width="1.5" opacity="0.6" />

  <!-- Badges -->
  <g transform="translate(25, 25)">
    <rect x="0" y="0" width="180" height="28" rx="14" fill="#09090b" stroke="#10b981" stroke-width="1.5" />
    <circle cx="16" cy="14" r="7" fill="#10b981" />
    <text x="28" y="18" fill="#a7f3d0" font-size="11" font-family="sans-serif" font-weight="900" letter-spacing="1">
      PUBG • VALKYRIE SNIPER
    </text>
  </g>
  <g transform="translate(360, 25)">
    <rect x="0" y="0" width="115" height="28" rx="14" fill="#09090b" stroke="#34d399" stroke-width="1.5" />
    <text x="57" y="18" fill="#6ee7b7" font-size="11" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">
      ★ 8x SCOPE ★
    </text>
  </g>

  <!-- Footer Banner -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#09090b" stroke="#10b981" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900">
      GHOST SNIPER OF POCHINKI
    </text>
    <text x="420" y="27" fill="#34d399" font-size="13" font-family="monospace" font-weight="900" text-anchor="end">
      CRIT: +30% • AWM
    </text>
  </g>
</svg>
`;
// 5. FREE FIRE - MOCO "CYBER MATRIX"
export const MOCO_HACKER_ART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" width="100%" height="100%">
  <defs>
    <radialGradient id="mocoBg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#0e7490" />
      <stop offset="50%" stop-color="#155e75" />
      <stop offset="100%" stop-color="#082f49" />
    </radialGradient>
    <radialGradient id="matrixGlow" cx="50%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.85" />
      <stop offset="45%" stop-color="#0891b2" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="g" />
      <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="500" height="650" rx="36" fill="url(#mocoBg)" />
  <circle cx="250" cy="220" r="220" fill="url(#matrixGlow)" filter="url(#cyanGlow)" />

  <!-- Cyber Hex Grid & Matrix Digits in Background -->
  <g opacity="0.6" stroke="#22d3ee" stroke-width="1.5" fill="none">
    <polygon points="120,120 150,105 180,120 180,150 150,165 120,150" />
    <polygon points="180,120 210,105 240,120 240,150 210,165 180,150" />
    <polygon points="260,120 290,105 320,120 320,150 290,165 260,150" />
    <polygon points="320,120 350,105 380,120 380,150 350,165 320,150" />
    <line x1="80" y1="280" x2="420" y2="280" stroke-dasharray="12,8" />
  </g>

  <!-- Legs & Cyber Cargo Pants -->
  <g id="mocoLegs">
    <path d="M205,420 L180,570 L218,575 L235,430 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5" />
    <path d="M295,420 L320,570 L282,575 L265,430 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5" />
    <line x1="185" y1="440" x2="200" y2="560" stroke="#22d3ee" stroke-width="4" filter="url(#cyanGlow)" />
    <line x1="315" y1="440" x2="300" y2="560" stroke="#22d3ee" stroke-width="4" filter="url(#cyanGlow)" />
    <!-- Glowing Hover Boots -->
    <path d="M170,565 L220,570 L225,608 L160,608 L160,585 Z" fill="#06b6d4" stroke="#e0f2fe" stroke-width="2" />
    <path d="M330,565 L280,570 L275,608 L340,608 L340,585 Z" fill="#06b6d4" stroke="#e0f2fe" stroke-width="2" />
  </g>

  <!-- Torso: Cyber Hacker Crop Vest & Holographic HUD Collar -->
  <g id="mocoTorso">
    <path d="M175,240 L155,370 L225,420 L275,420 L345,370 L325,240 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="2" />
    <!-- Glowing Turquoise Circuitry Lines -->
    <path d="M210,250 L185,340 L220,360 L240,320" fill="none" stroke="#22d3ee" stroke-width="3" filter="url(#cyanGlow)" />
    <path d="M290,250 L315,340 L280,360 L260,320" fill="none" stroke="#22d3ee" stroke-width="3" filter="url(#cyanGlow)" />
    <circle cx="240" cy="320" r="4.5" fill="#e0f2fe" />
    <circle cx="260" cy="320" r="4.5" fill="#e0f2fe" />
    <!-- Toned Midriff -->
    <path d="M225,370 L275,370 L280,410 L220,410 Z" fill="#cbd5e1" />
  </g>

  <!-- Arms with Cybernetic Prosthetic & Tactical Fingerless Gloves -->
  <g id="mocoArms">
    <path d="M175,240 L130,310 L150,370 L195,255 Z" fill="#0f172a" />
    <!-- Left Cybernetic Chrome Arm -->
    <path d="M138,320 L125,410 L150,415 L158,325 Z" fill="#94a3b8" stroke="#06b6d4" stroke-width="2" />
    <line x1="144" y1="330" x2="135" y2="405" stroke="#22d3ee" stroke-width="2.5" filter="url(#cyanGlow)" />
    <path d="M123,405 L115,445 L145,450 L148,410 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5" />

    <!-- Right Arm -->
    <path d="M325,240 L370,310 L350,370 L305,255 Z" fill="#0f172a" />
    <path d="M362,320 L375,410 L350,415 L342,325 Z" fill="#cbd5e1" />
    <path d="M377,405 L385,445 L355,450 L352,410 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5" />

    <!-- Holographic Wrist Cyberdeck (Right Arm) -->
    <g filter="url(#cyanGlow)">
      <polygon points="360,400 420,380 430,420 370,430" fill="#0891b2" opacity="0.6" stroke="#22d3ee" stroke-width="2" />
      <text x="395" y="410" fill="#ffffff" font-size="8" font-family="monospace" font-weight="900" text-anchor="middle">
        HACK: 100%
      </text>
    </g>
  </g>

  <!-- Gorgeous Cyberpunk Face with Glowing Retinal Eye & Neon Dreadlocks -->
  <g id="mocoHead">
    <path d="M232,205 L228,250 L272,250 L268,205 Z" fill="#cbd5e1" />
    <path d="M195,145 C195,215 225,235 250,235 C275,235 305,215 305,145 C305,95 275,85 250,85 C225,85 195,95 195,145 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1" />

    <!-- Digital Retinal Eye (Left Eye) -->
    <g id="mocoLeftEye" filter="url(#cyanGlow)">
      <path d="M210,162 Q225,152 238,162 Q225,172 210,162 Z" fill="#0f172a" />
      <circle cx="225" cy="162" r="7" fill="#0891b2" />
      <circle cx="225" cy="162" r="4.5" fill="#22d3ee" />
      <circle cx="225" cy="162" r="2" fill="#ffffff" />
      <path d="M208,162 Q225,150 240,160" fill="none" stroke="#22d3ee" stroke-width="3" />
      <polygon points="200,162 206,158 206,166" fill="#22d3ee" />
    </g>

    <!-- Natural Anime Eye (Right Eye) -->
    <g id="mocoRightEye">
      <path d="M262,162 Q275,152 290,162 Q275,172 262,162 Z" fill="#ffffff" />
      <ellipse cx="275" cy="162" rx="7" ry="8" fill="#0891b2" />
      <ellipse cx="275" cy="164" rx="5" ry="6" fill="#22d3ee" />
      <circle cx="275" cy="163" r="3" fill="#09090b" />
      <circle cx="272" cy="160" r="2" fill="#ffffff" />
      <path d="M260,160 Q275,150 292,162" fill="none" stroke="#09090b" stroke-width="3" />
      <path d="M262,148 Q275,144 290,150" fill="none" stroke="#0891b2" stroke-width="2.5" />
    </g>

    <path d="M248,172 L252,182 L247,183" fill="none" stroke="#64748b" stroke-width="1.8" />
    <path d="M242,198 Q250,204 258,198" fill="none" stroke="#0891b2" stroke-width="2.8" />

    <!-- Neon Turquoise Braided Cyber Dreadlocks -->
    <!-- Back dreads -->
    <path d="M175,140 Q130,240 150,360" fill="none" stroke="#0891b2" stroke-width="10" stroke-linecap="round" />
    <path d="M165,160 Q120,260 135,380" fill="none" stroke="#22d3ee" stroke-width="9" stroke-linecap="round" filter="url(#cyanGlow)" />
    <path d="M325,140 Q370,240 350,360" fill="none" stroke="#0891b2" stroke-width="10" stroke-linecap="round" />
    <path d="M335,160 Q380,260 365,380" fill="none" stroke="#22d3ee" stroke-width="9" stroke-linecap="round" filter="url(#cyanGlow)" />

    <!-- Front Bangs -->
    <path d="M188,140 Q250,70 312,140 Q285,115 250,110 Q215,115 188,140 Z" fill="#0f172a" />
    <path d="M195,130 Q225,185 240,195" fill="none" stroke="#22d3ee" stroke-width="7" stroke-linecap="round" filter="url(#cyanGlow)" />
    <path d="M305,130 Q275,185 260,195" fill="none" stroke="#22d3ee" stroke-width="7" stroke-linecap="round" filter="url(#cyanGlow)" />
  </g>

  <!-- Frame Border -->
  <rect x="10" y="10" width="480" height="630" rx="28" fill="none" stroke="#06b6d4" stroke-width="3" opacity="0.85" />
  <rect x="18" y="18" width="464" height="614" rx="20" fill="none" stroke="#22d3ee" stroke-width="1.5" opacity="0.6" />

  <!-- Badges -->
  <g transform="translate(25, 25)">
    <rect x="0" y="0" width="180" height="28" rx="14" fill="#09090b" stroke="#06b6d4" stroke-width="1.5" />
    <circle cx="16" cy="14" r="7" fill="#06b6d4" />
    <text x="28" y="18" fill="#67e8f9" font-size="11" font-family="sans-serif" font-weight="900" letter-spacing="1">
      FREE FIRE • MOCO
    </text>
  </g>
  <g transform="translate(360, 25)">
    <rect x="0" y="0" width="115" height="28" rx="14" fill="#09090b" stroke="#22d3ee" stroke-width="1.5" />
    <text x="57" y="18" fill="#a5f3fc" font-size="11" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">
      ★ CYBER ★
    </text>
  </g>

  <!-- Footer Banner -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#09090b" stroke="#06b6d4" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900">
      MOCO "CYBER MATRIX"
    </text>
    <text x="420" y="27" fill="#22d3ee" font-size="13" font-family="monospace" font-weight="900" text-anchor="end">
      HACKER'S EYE: +20% GP
    </text>
  </g>
</svg>
`;

// 6. PUBG - GOLDEN PHARAOH X-SUIT
export const PHARAOH_ART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" width="100%" height="100%">
  <defs>
    <radialGradient id="pharaohBg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#78350f" />
      <stop offset="50%" stop-color="#451a03" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>
    <radialGradient id="pharaohSun" cx="50%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#fde047" stop-opacity="0.9" />
      <stop offset="45%" stop-color="#d97706" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="gold24k" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="30%" stop-color="#fde047" />
      <stop offset="70%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#92400e" />
    </linearGradient>
    <filter id="divineGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="g" />
      <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="500" height="650" rx="36" fill="url(#pharaohBg)" />
  <circle cx="250" cy="220" r="220" fill="url(#pharaohSun)" filter="url(#divineGlow)" />

  <!-- Massive Golden Falcon Wings Behind Back -->
  <g opacity="0.85" filter="url(#divineGlow)">
    <path d="M120,380 C30,220 50,110 160,80 C110,160 110,260 160,340 Z" fill="url(#gold24k)" />
    <path d="M380,380 C470,220 450,110 340,80 C390,160 390,260 340,340 Z" fill="url(#gold24k)" />
  </g>

  <!-- Legs & Armored Golden Greaves -->
  <g id="pharaohLegs">
    <path d="M205,420 L180,570 L218,575 L235,430 Z" fill="url(#gold24k)" stroke="#78350f" stroke-width="2" />
    <path d="M295,420 L320,570 L282,575 L265,430 Z" fill="url(#gold24k)" stroke="#78350f" stroke-width="2" />
    <!-- Royal Lapis Lazuli War Skirt -->
    <polygon points="190,410 310,410 270,470 230,470" fill="#1e3a8a" stroke="#facc15" stroke-width="2" />
    <!-- Gilded Boots -->
    <path d="M170,565 L220,570 L225,608 L160,608 L160,585 Z" fill="url(#gold24k)" stroke="#451a03" stroke-width="2" />
    <path d="M330,565 L280,570 L275,608 L340,608 L340,585 Z" fill="url(#gold24k)" stroke="#451a03" stroke-width="2" />
  </g>

  <!-- Torso: Sculpted 24K Solid Gold Pectoral Armor -->
  <g id="pharaohTorso">
    <path d="M170,240 L150,380 L225,430 L275,430 L350,380 L330,240 Z" fill="url(#gold24k)" stroke="#78350f" stroke-width="2" />
    <!-- Ankh Crest & Falcon Engraving -->
    <circle cx="250" cy="285" r="14" fill="none" stroke="#1e3a8a" stroke-width="3" />
    <line x1="250" y1="299" x2="250" y2="330" stroke="#1e3a8a" stroke-width="4" />
    <line x1="240" y1="310" x2="260" y2="310" stroke="#1e3a8a" stroke-width="4" />
    <!-- Golden Abdominal Muscle Plates -->
    <rect x="230" y="340" width="18" height="25" rx="3" fill="#ca8a04" />
    <rect x="252" y="340" width="18" height="25" rx="3" fill="#ca8a04" />
    <rect x="230" y="370" width="18" height="25" rx="3" fill="#ca8a04" />
    <rect x="252" y="370" width="18" height="25" rx="3" fill="#ca8a04" />
  </g>

  <!-- Gilded Arms & Solar Scepter -->
  <g id="pharaohArms">
    <path d="M170,240 L120,310 L140,370 L195,255 Z" fill="url(#gold24k)" />
    <path d="M138,320 L125,410 L150,415 L158,325 Z" fill="url(#gold24k)" stroke="#78350f" stroke-width="1.5" />
    <path d="M123,405 L115,445 L145,450 L148,410 Z" fill="#ca8a04" />

    <path d="M330,240 L380,310 L360,370 L305,255 Z" fill="url(#gold24k)" />
    <path d="M362,320 L375,410 L350,415 L342,325 Z" fill="url(#gold24k)" stroke="#78350f" stroke-width="1.5" />
    <path d="M377,405 L385,445 L355,450 L352,410 Z" fill="#ca8a04" />

    <!-- Royal Egyptian Solar Spear -->
    <g transform="rotate(35 340 370)" filter="url(#divineGlow)">
      <rect x="336" y="100" width="8" height="320" rx="4" fill="url(#gold24k)" />
      <!-- Cobra Sun Spearhead -->
      <polygon points="340,60 355,100 325,100" fill="#ffffff" stroke="#facc15" stroke-width="2" />
      <circle cx="340" cy="110" r="10" fill="#1e3a8a" />
    </g>
  </g>

  <!-- Majestic Pharaoh Head, Nemes Headdress & Golden Mask -->
  <g id="pharaohHead">
    <path d="M230,200 L228,245 L272,245 L270,200 Z" fill="url(#gold24k)" />

    <!-- Royal Nemes Headdress (Blue and Gold Stripes) -->
    <path d="M160,160 C160,70 340,70 340,160 L330,260 L300,240 L305,170 C305,110 195,110 195,170 L200,240 L170,260 Z" fill="url(#gold24k)" stroke="#1e3a8a" stroke-width="2" />
    <!-- Blue Stripes on Nemes -->
    <path d="M190,110 L310,110" stroke="#1e3a8a" stroke-width="6" />
    <path d="M175,135 L325,135" stroke="#1e3a8a" stroke-width="6" />
    <path d="M165,160 L335,160" stroke="#1e3a8a" stroke-width="6" />

    <!-- Golden Mask Face -->
    <polygon points="205,145 250,230 295,145 250,95" fill="url(#gold24k)" stroke="#78350f" stroke-width="1.5" />

    <!-- Divine Kohl Eyeliner & Glowing Amber Pupils -->
    <g id="pharaohEyes" filter="url(#divineGlow)">
      <polygon points="212,160 236,160 230,170 216,170" fill="#ffffff" />
      <polygon points="264,160 288,160 284,170 270,170" fill="#ffffff" />
      <circle cx="224" cy="165" r="4.5" fill="#facc15" />
      <circle cx="276" cy="165" r="4.5" fill="#facc15" />
      <!-- Kohl Lines -->
      <line x1="206" y1="160" x2="242" y2="160" stroke="#09090b" stroke-width="3" />
      <line x1="258" y1="160" x2="294" y2="160" stroke="#09090b" stroke-width="3" />
      <line x1="236" y1="160" x2="246" y2="166" stroke="#09090b" stroke-width="2" />
      <line x1="264" y1="160" x2="254" y2="166" stroke="#09090b" stroke-width="2" />
    </g>

    <!-- Golden Beard Scepter -->
    <rect x="244" y="225" width="12" height="30" rx="3" fill="#1e3a8a" stroke="#facc15" stroke-width="2" />
    <!-- Uraeus Golden Cobra on Forehead -->
    <circle cx="250" cy="100" r="7" fill="#dc2626" stroke="#facc15" stroke-width="2" filter="url(#divineGlow)" />
  </g>

  <!-- Frame Border -->
  <rect x="10" y="10" width="480" height="630" rx="28" fill="none" stroke="#facc15" stroke-width="3" opacity="0.9" />
  <rect x="18" y="18" width="464" height="614" rx="20" fill="none" stroke="#fef08a" stroke-width="1.5" opacity="0.6" />

  <!-- Badges -->
  <g transform="translate(25, 25)">
    <rect x="0" y="0" width="180" height="28" rx="14" fill="#09090b" stroke="#facc15" stroke-width="1.5" />
    <circle cx="16" cy="14" r="7" fill="#facc15" />
    <text x="28" y="18" fill="#fde047" font-size="11" font-family="sans-serif" font-weight="900" letter-spacing="1">
      PUBG • PHARAOH X-SUIT
    </text>
  </g>
  <g transform="translate(360, 25)">
    <rect x="0" y="0" width="115" height="28" rx="14" fill="#09090b" stroke="#facc15" stroke-width="1.5" />
    <text x="57" y="18" fill="#fef08a" font-size="11" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">
      ★ MYTHIC ★
    </text>
  </g>

  <!-- Footer Banner -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#09090b" stroke="#facc15" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900">
      GOLDEN PHARAOH X-SUIT
    </text>
    <text x="420" y="27" fill="#facc15" font-size="13" font-family="monospace" font-weight="900" text-anchor="end">
      GOLD DROP: +40% GP
    </text>
  </g>
</svg>
`;

export const HAYATO_ART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <defs>
    <linearGradient id="hy-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#180404" />
      <stop offset="45%" stop-color="#450a0a" />
      <stop offset="85%" stop-color="#7f1d1d" />
      <stop offset="100%" stop-color="#991b1b" />
    </linearGradient>
    <linearGradient id="hy-flame" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9" />
      <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#fef08a" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="hy-blade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#e2e8f0" />
      <stop offset="70%" stop-color="#94a3b8" />
      <stop offset="100%" stop-color="#f87171" />
    </linearGradient>
    <radialGradient id="hy-crimson-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.6" />
      <stop offset="70%" stop-color="#b91c1c" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#180404" stop-opacity="0" />
    </radialGradient>
    <filter id="hy-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="7" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="500" height="640" fill="url(#hy-bg)" />
  <circle cx="250" cy="270" r="230" fill="url(#hy-crimson-aura)" />

  <!-- Traditional Japanese Sun & Kanji Pattern in Background -->
  <circle cx="250" cy="240" r="140" fill="#dc2626" opacity="0.2" stroke="#ef4444" stroke-width="2" stroke-dasharray="10 6" />
  <path d="M70,300 L430,300 M250,110 L250,470" stroke="#f87171" stroke-width="1" opacity="0.2" />

  <!-- Fiery Flame Embers Rising -->
  <g opacity="0.75">
    <polygon points="120,440 126,420 122,410 116,424" fill="#fbbf24" />
    <polygon points="380,420 388,396 382,385 376,402" fill="#ef4444" />
    <polygon points="180,360 185,340 182,330 176,345" fill="#f87171" />
    <polygon points="320,330 326,308 322,298 316,314" fill="#facc15" />
    <polygon points="90,260 95,242 92,235 87,248" fill="#ef4444" />
    <polygon points="410,240 416,218 412,210 406,224" fill="#fbbf24" />
  </g>

  <!-- Bushido Katana Blade Slanted across Background -->
  <g transform="rotate(-35, 250, 260)">
    <!-- Scabbard & Blade Light -->
    <rect x="246" y="-80" width="8" height="660" fill="url(#hy-blade)" filter="url(#hy-glow)" />
    <!-- Tsuba / Katana Guard -->
    <rect x="235" y="380" width="30" height="10" rx="3" fill="#fbbf24" stroke="#78350f" stroke-width="2" />
    <!-- Tsuka / Katana Handle with Diamond Wrap -->
    <rect x="244" y="390" width="12" height="150" fill="#18181b" stroke="#dc2626" stroke-width="1.5" />
    <polygon points="244,405 250,415 256,405 250,395" fill="#ef4444" />
    <polygon points="244,435 250,445 256,435 250,425" fill="#ef4444" />
    <polygon points="244,465 250,475 256,465 250,455" fill="#ef4444" />
    <polygon points="244,495 250,505 256,495 250,485" fill="#ef4444" />
  </g>

  <!-- Hayato Body Silhouette & Samurai Armor -->
  <!-- Haori Cloak / Robes -->
  <path d="M 110,640 L 140,360 L 190,300 L 250,320 L 310,300 L 360,360 L 390,640 Z" fill="#7f1d1d" stroke="#ef4444" stroke-width="2" />
  <!-- Crimson Haori Folded Lapels -->
  <path d="M 180,300 L 250,460 L 210,640 L 130,640 Z" fill="#991b1b" stroke="#f87171" stroke-width="1.5" />
  <path d="M 320,300 L 250,460 L 290,640 L 370,640 Z" fill="#450a0a" stroke="#b91c1c" stroke-width="1.5" />

  <!-- Inner High-tech Mesh & Muscular Torso -->
  <path d="M 215,320 L 250,335 L 285,320 L 275,440 L 225,440 Z" fill="#1c1917" stroke="#fbbf24" stroke-width="1.5" />
  <!-- Cyber Samurai Chest Cord / Medallion -->
  <polygon points="250,370 262,382 250,394 238,382" fill="#fbbf24" stroke="#78350f" stroke-width="2" />
  <line x1="250" y1="335" x2="250" y2="370" stroke="#f59e0b" stroke-width="3" />

  <!-- Samurai Pauldrons (Shoulder Armor Plates) -->
  <path d="M 120,350 L 175,320 L 180,365 L 125,395 Z" fill="#18181b" stroke="#ef4444" stroke-width="3" />
  <line x1="122" y1="365" x2="177" y2="335" stroke="#fbbf24" stroke-width="2" />
  <line x1="124" y1="380" x2="179" y2="350" stroke="#fbbf24" stroke-width="2" />

  <path d="M 380,350 L 325,320 L 320,365 L 375,395 Z" fill="#18181b" stroke="#ef4444" stroke-width="3" />
  <line x1="378" y1="365" x2="323" y2="335" stroke="#fbbf24" stroke-width="2" />
  <line x1="376" y1="380" x2="321" y2="350" stroke="#fbbf24" stroke-width="2" />

  <!-- Neck & Sharp Jaw -->
  <path d="M 230,270 L 230,310 L 270,310 L 270,270 Z" fill="#e29578" />
  <!-- Stylized Anime Head & Face -->
  <path d="M 195,190 C 195,150 305,150 305,190 C 305,250 275,275 250,285 C 225,275 195,250 195,190 Z" fill="#ffddd2" stroke="#d48c70" stroke-width="1.5" />

  <!-- Bushido Cheek Warrior Scar -->
  <path d="M 220,215 L 235,245" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" />
  <line x1="223" y1="230" x2="232" y2="228" stroke="#dc2626" stroke-width="1.5" />

  <!-- Piercing Fierce Eyes -->
  <path d="M 215,208 Q 230,202 238,212" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round" />
  <circle cx="228" cy="214" r="4.5" fill="#991b1b" />
  <circle cx="227" cy="213" r="2" fill="#f87171" />
  <circle cx="229" cy="212" r="1" fill="#ffffff" />

  <path d="M 285,208 Q 270,202 262,212" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round" />
  <circle cx="272" cy="214" r="4.5" fill="#991b1b" />
  <circle cx="273" cy="213" r="2" fill="#f87171" />
  <circle cx="271" cy="212" r="1" fill="#ffffff" />

  <!-- Stern Anime Eyebrows & Mouth -->
  <path d="M 210,198 L 240,206" stroke="#1c1917" stroke-width="3.5" stroke-linecap="round" />
  <path d="M 290,198 L 260,206" stroke="#1c1917" stroke-width="3.5" stroke-linecap="round" />
  <path d="M 240,252 L 260,252" stroke="#7f1d1d" stroke-width="2" stroke-linecap="round" />

  <!-- Hayato Signature Anime Hair (Spiky Wild Black Topknot + Bangs) -->
  <!-- Topknot bun on top -->
  <ellipse cx="250" cy="115" rx="18" ry="24" fill="#0f172a" stroke="#334155" stroke-width="2" />
  <rect x="243" y="125" width="14" height="8" rx="2" fill="#dc2626" />
  <!-- Bangs falling over face -->
  <path d="M 185,190 Q 220,130 250,140 Q 280,130 315,190 Q 280,165 250,175 Q 220,165 185,190 Z" fill="#09090b" stroke="#1e293b" stroke-width="2" />
  <!-- Loose long strands framed on cheek -->
  <path d="M 188,185 Q 180,240 195,270 Q 192,230 198,195 Z" fill="#0f172a" />
  <path d="M 312,185 Q 320,240 305,270 Q 308,230 302,195 Z" fill="#0f172a" />
  <!-- Stray Forehead Strand -->
  <path d="M 242,160 Q 235,195 240,210 Q 244,195 248,170 Z" fill="#18181b" />

  <!-- Rising Flame Aura Layer at Bottom -->
  <rect x="0" y="480" width="500" height="160" fill="url(#hy-flame)" opacity="0.6" />

  <!-- Header Tactical Badge -->
  <g transform="translate(30, 25)">
    <rect x="0" y="0" width="165" height="34" rx="8" fill="#180404" stroke="#ef4444" stroke-width="2" opacity="0.95" />
    <circle cx="18" cy="17" r="7" fill="#ef4444" filter="url(#hy-glow)" />
    <text x="35" y="23" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="900" letter-spacing="1">
      BUSHIDO BLADE
    </text>
  </g>

  <!-- Game Icon: Free Fire Signature -->
  <g transform="translate(340, 25)">
    <rect x="0" y="0" width="130" height="34" rx="8" fill="#180404" stroke="#fbbf24" stroke-width="2" opacity="0.95" />
    <text x="65" y="22" fill="#fbbf24" font-size="12" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1.5">
      FREE FIRE ★
    </text>
  </g>

  <!-- Footer Banner -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#0f0202" stroke="#ef4444" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900">
      HAYATO • BUSHIDO
    </text>
    <text x="420" y="27" fill="#f87171" font-size="13" font-family="monospace" font-weight="900" text-anchor="end">
      ARMOR PIERCE: +35%
    </text>
  </g>
</svg>
`;

export const CHRONO_ART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <defs>
    <linearGradient id="cr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050814" />
      <stop offset="50%" stop-color="#0c1938" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <linearGradient id="cr-trench" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="60%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <radialGradient id="cr-forcefield" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.1" />
      <stop offset="70%" stop-color="#38bdf8" stop-opacity="0.3" />
      <stop offset="92%" stop-color="#22d3ee" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.95" />
    </radialGradient>
    <filter id="cr-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="500" height="640" fill="url(#cr-bg)" />

  <!-- Temporal Distortion Grid Lines -->
  <g stroke="#0ea5e9" stroke-width="1" opacity="0.25">
    <circle cx="250" cy="300" r="80" stroke-dasharray="8 6" />
    <circle cx="250" cy="300" r="150" stroke-dasharray="14 10" />
    <circle cx="250" cy="300" r="220" stroke-dasharray="20 12" />
    <line x1="250" y1="20" x2="250" y2="580" />
    <line x1="0" y1="300" x2="500" y2="300" />
    <line x1="70" y1="120" x2="430" y2="480" />
    <line x1="70" y1="480" x2="430" y2="120" />
  </g>

  <!-- Time Sphere / Chrono Forcefield Outer Aura -->
  <circle cx="250" cy="300" r="215" fill="url(#cr-forcefield)" filter="url(#cr-glow)" />

  <!-- Chrono Body (High-tech Cyber Trench Coat) -->
  <!-- Coat Tails -->
  <path d="M 120,640 L 150,380 L 200,320 L 250,335 L 300,320 L 350,380 L 380,640 Z" fill="url(#cr-trench)" stroke="#38bdf8" stroke-width="2" />
  <!-- Neon Blue Seam Highlights on Coat -->
  <path d="M 150,380 L 180,640" stroke="#00f0ff" stroke-width="3" filter="url(#cr-glow)" />
  <path d="M 350,380 L 320,640" stroke="#00f0ff" stroke-width="3" filter="url(#cr-glow)" />

  <!-- High-Tech Vest & Body Armor -->
  <path d="M 200,320 L 250,340 L 300,320 L 285,460 L 215,460 Z" fill="#0f172a" stroke="#0284c7" stroke-width="2" />
  <!-- Glowing Chest Reactor & Chrono Core -->
  <circle cx="250" cy="380" r="16" fill="#083344" stroke="#00f0ff" stroke-width="3" />
  <circle cx="250" cy="380" r="8" fill="#ffffff" filter="url(#cr-glow)" />

  <!-- Heavy High Collar & Lapels -->
  <path d="M 190,260 L 215,330 L 250,300 L 205,250 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
  <path d="M 310,260 L 285,330 L 250,300 L 295,250 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />

  <!-- Chrono Arms & Gauntlets -->
  <path d="M 150,380 L 120,490 L 155,500 L 175,410 Z" fill="#0f172a" stroke="#0284c7" stroke-width="2" />
  <circle cx="138" cy="495" r="10" fill="#00f0ff" filter="url(#cr-glow)" />

  <path d="M 350,380 L 380,490 L 345,500 L 325,410 Z" fill="#0f172a" stroke="#0284c7" stroke-width="2" />
  <circle cx="362" cy="495" r="10" fill="#00f0ff" filter="url(#cr-glow)" />

  <!-- Neck -->
  <rect x="233" y="245" width="34" height="35" fill="#f6d5b8" />

  <!-- Head & Confident Face -->
  <path d="M 202,185 C 202,140 298,140 298,185 C 298,240 270,268 250,274 C 230,268 202,240 202,185 Z" fill="#ffd8be" stroke="#e0a98b" stroke-width="1.5" />

  <!-- Designer Stubble Beard Outline -->
  <path d="M 220,225 C 220,260 280,260 280,225" stroke="#475569" stroke-width="4" stroke-dasharray="2 3" fill="none" />

  <!-- Focused Cyber Eyes -->
  <path d="M 220,200 L 240,204" stroke="#0f172a" stroke-width="3" stroke-linecap="round" />
  <circle cx="230" cy="207" r="4" fill="#0369a1" />
  <circle cx="230" cy="207" r="1.5" fill="#38bdf8" />

  <path d="M 280,200 L 260,204" stroke="#0f172a" stroke-width="3" stroke-linecap="round" />
  <circle cx="270" cy="207" r="4" fill="#0369a1" />
  <circle cx="270" cy="207" r="1.5" fill="#38bdf8" />

  <!-- Confident Smile -->
  <path d="M 238,242 Q 250,248 262,242" stroke="#64748b" stroke-width="2.5" fill="none" stroke-linecap="round" />

  <!-- Chrono Hair (Sleek Textured Comb-Over Undercut) -->
  <path d="M 195,178 C 195,120 305,115 305,175 C 285,145 255,145 220,155 Z" fill="#09090b" stroke="#1e293b" stroke-width="2" />
  <!-- Side Fade -->
  <path d="M 196,175 L 202,210 L 210,185 Z" fill="#18181b" />
  <path d="M 304,175 L 298,210 L 290,185 Z" fill="#18181b" />
  <!-- Highlights -->
  <path d="M 225,140 Q 250,132 275,138" stroke="#38bdf8" stroke-width="2" fill="none" opacity="0.8" />

  <!-- Floating Chrono Forcefield Hexagonal Hologram Nodes -->
  <g stroke="#00f0ff" stroke-width="2" fill="none" opacity="0.8" filter="url(#cr-glow)">
    <polygon points="90,290 105,280 120,290 120,310 105,320 90,310" />
    <polygon points="380,290 395,280 410,290 410,310 395,320 380,310" />
    <polygon points="150,170 165,160 180,170 180,190 165,200 150,190" />
    <polygon points="320,170 335,160 350,170 350,190 335,200 320,190" />
    <polygon points="235,490 250,480 265,490 265,510 250,520 235,510" />
  </g>

  <!-- Header Badge -->
  <g transform="translate(30, 25)">
    <rect x="0" y="0" width="180" height="34" rx="8" fill="#050814" stroke="#00f0ff" stroke-width="2" opacity="0.95" />
    <circle cx="18" cy="17" r="7" fill="#00f0ff" filter="url(#cr-glow)" />
    <text x="35" y="23" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="900" letter-spacing="1">
      TIME TURNER S-RANK
    </text>
  </g>

  <!-- Free Fire Badge -->
  <g transform="translate(340, 25)">
    <rect x="0" y="0" width="130" height="34" rx="8" fill="#050814" stroke="#38bdf8" stroke-width="2" opacity="0.95" />
    <text x="65" y="22" fill="#38bdf8" font-size="12" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1.5">
      FREE FIRE ★
    </text>
  </g>

  <!-- Footer Banner -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#050814" stroke="#00f0ff" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900">
      CHRONO • TIME WARPER
    </text>
    <text x="420" y="27" fill="#38bdf8" font-size="13" font-family="monospace" font-weight="900" text-anchor="end">
      FORCEFIELD: 600 HP
    </text>
  </g>
</svg>
`;

export const DESERT_ASSASSIN_ART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <defs>
    <linearGradient id="da-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1208" />
      <stop offset="45%" stop-color="#451a03" />
      <stop offset="85%" stop-color="#78350f" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="da-sand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#d97706" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#b45309" stop-opacity="0.2" />
    </linearGradient>
    <filter id="da-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="500" height="640" fill="url(#da-bg)" />

  <!-- Miramar Desert Dunes & Sun -->
  <circle cx="250" cy="180" r="90" fill="#f59e0b" opacity="0.3" />
  <path d="M 0,340 Q 150,280 300,320 Q 420,350 500,310 L 500,640 L 0,640 Z" fill="#29180c" opacity="0.7" />
  <path d="M 0,420 Q 180,380 340,430 Q 440,460 500,430 L 500,640 L 0,640 Z" fill="#1c1007" />

  <!-- Sandstorm Haze Lines -->
  <g stroke="#f59e0b" stroke-width="1.5" opacity="0.4">
    <line x1="20" y1="120" x2="180" y2="100" />
    <line x1="320" y1="150" x2="480" y2="135" />
    <line x1="60" y1="240" x2="220" y2="225" />
    <line x1="300" y1="280" x2="460" y2="260" />
    <line x1="40" y1="460" x2="200" y2="445" />
  </g>

  <!-- Desert Guns: Dual Golden Revolvers / Deagles in Hands -->
  <!-- Left Holstered / Drawn Handgun -->
  <g transform="translate(100, 390) rotate(25)">
    <rect x="0" y="0" width="70" height="24" rx="4" fill="#fbbf24" stroke="#78350f" stroke-width="2" />
    <rect x="20" y="24" width="18" height="40" rx="3" fill="#1e1b18" stroke="#78350f" stroke-width="1.5" />
    <circle cx="60" cy="12" r="4" fill="#d97706" />
    <!-- Muzzle Flash Ember -->
    <polygon points="75,12 85,7 80,12 85,17" fill="#fbbf24" filter="url(#da-glow)" />
  </g>

  <!-- Right Handgun Ready -->
  <g transform="translate(330, 420) rotate(-25)">
    <rect x="0" y="0" width="70" height="24" rx="4" fill="#fbbf24" stroke="#78350f" stroke-width="2" />
    <rect x="32" y="24" width="18" height="40" rx="3" fill="#1e1b18" stroke="#78350f" stroke-width="1.5" />
    <circle cx="10" cy="12" r="4" fill="#d97706" />
  </g>

  <!-- Character Torso & Desert Camo Gear -->
  <path d="M 140,640 L 160,370 L 200,310 L 250,325 L 300,310 L 340,370 L 360,640 Z" fill="#3d2614" stroke="#78350f" stroke-width="2" />
  <!-- Heavy Tactical Plate Carrier Vest -->
  <rect x="185" y="325" width="130" height="150" rx="14" fill="#593a1c" stroke="#d97706" stroke-width="2" />
  <!-- Ammo Magazine Pouches -->
  <rect x="195" y="410" width="30" height="45" rx="4" fill="#2d1c10" stroke="#f59e0b" stroke-width="1.5" />
  <rect x="235" y="410" width="30" height="45" rx="4" fill="#2d1c10" stroke="#f59e0b" stroke-width="1.5" />
  <rect x="275" y="410" width="30" height="45" rx="4" fill="#2d1c10" stroke="#f59e0b" stroke-width="1.5" />
  <!-- Grenade & Radiophone on Vest -->
  <circle cx="210" cy="360" r="10" fill="#2d1c10" stroke="#16a34a" stroke-width="2" />
  <rect x="275" y="345" width="14" height="30" rx="3" fill="#1e1b18" stroke="#94a3b8" stroke-width="1" />
  <line x1="282" y1="345" x2="282" y2="330" stroke="#94a3b8" stroke-width="2" />

  <!-- Tactical Gloves & Arms -->
  <path d="M 160,370 L 120,440 L 140,460 L 180,390 Z" fill="#2d1c10" stroke="#78350f" stroke-width="1.5" />
  <path d="M 340,370 L 380,440 L 360,460 L 320,390 Z" fill="#2d1c10" stroke="#78350f" stroke-width="1.5" />

  <!-- Shemagh / Desert Scarf (Wrapped tightly around neck and lower face) -->
  <path d="M 180,240 Q 250,230 320,240 L 330,300 Q 250,340 170,300 Z" fill="#d97706" stroke="#92400e" stroke-width="2" />
  <!-- Shemagh Houndstooth Pattern lines -->
  <g stroke="#78350f" stroke-width="1.5" opacity="0.6">
    <line x1="190" y1="255" x2="310" y2="255" stroke-dasharray="6 4" />
    <line x1="180" y1="275" x2="320" y2="275" stroke-dasharray="6 4" />
    <line x1="200" y1="295" x2="300" y2="295" stroke-dasharray="6 4" />
    <line x1="210" y1="240" x2="230" y2="310" />
    <line x1="250" y1="235" x2="250" y2="320" />
    <line x1="290" y1="240" x2="270" y2="310" />
  </g>

  <!-- Head & Upper Face Silhouette -->
  <path d="M 205,175 C 205,145 295,145 295,175 L 295,240 L 205,240 Z" fill="#ffd8be" />

  <!-- Tactical Ballistic Goggles with Glowing Amber Lenses -->
  <rect x="200" y="190" width="100" height="34" rx="10" fill="#0f172a" stroke="#d97706" stroke-width="3" />
  <ellipse cx="228" cy="207" rx="18" ry="11" fill="#f59e0b" filter="url(#da-glow)" />
  <ellipse cx="228" cy="207" rx="12" ry="7" fill="#fef08a" />
  <ellipse cx="272" cy="207" rx="18" ry="11" fill="#f59e0b" filter="url(#da-glow)" />
  <ellipse cx="272" cy="207" rx="12" ry="7" fill="#fef08a" />
  <!-- Goggle Strap -->
  <line x1="185" y1="207" x2="200" y2="207" stroke="#1e293b" stroke-width="5" />
  <line x1="300" y1="207" x2="315" y2="207" stroke="#1e293b" stroke-width="5" />

  <!-- Desert Hood / Shemagh Cowl draped over head -->
  <path d="M 180,240 C 175,140 210,120 250,120 C 290,120 325,140 320,240 C 310,160 290,145 250,145 C 210,145 190,160 180,240 Z" fill="#b45309" stroke="#78350f" stroke-width="2" />
  <path d="M 180,240 Q 165,180 200,140 Q 250,110 300,140 Q 335,180 320,240" stroke="#f59e0b" stroke-width="2" fill="none" />

  <!-- Header Badge -->
  <g transform="translate(30, 25)">
    <rect x="0" y="0" width="180" height="34" rx="8" fill="#1c1208" stroke="#f59e0b" stroke-width="2" opacity="0.95" />
    <circle cx="18" cy="17" r="7" fill="#f59e0b" filter="url(#da-glow)" />
    <text x="35" y="23" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="900" letter-spacing="1">
      MIRAMAR QUICKDRAW
    </text>
  </g>

  <!-- PUBG Badge -->
  <g transform="translate(340, 25)">
    <rect x="0" y="0" width="130" height="34" rx="8" fill="#1c1208" stroke="#fbbf24" stroke-width="2" opacity="0.95" />
    <text x="65" y="22" fill="#fbbf24" font-size="12" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1.5">
      PUBG MOBILE
    </text>
  </g>

  <!-- Footer Banner -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#180e06" stroke="#f59e0b" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900">
      DESERT ASSASSIN • MIRAMAR
    </text>
    <text x="420" y="27" fill="#fbbf24" font-size="13" font-family="monospace" font-weight="900" text-anchor="end">
      DEAD-EYE: +30% CRIT
    </text>
  </g>
</svg>
`;

export const JINWOO_ART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <defs>
    <linearGradient id="jw-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712" />
      <stop offset="45%" stop-color="#0f0c29" />
      <stop offset="85%" stop-color="#1e103a" />
      <stop offset="100%" stop-color="#2e1065" />
    </linearGradient>
    <linearGradient id="jw-shadow-mist" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.8" />
      <stop offset="40%" stop-color="#6366f1" stop-opacity="0.5" />
      <stop offset="80%" stop-color="#00f0ff" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#030712" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="jw-dagger" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="30%" stop-color="#c4b5fd" />
      <stop offset="70%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
    <radialGradient id="jw-abyss" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#6d28d9" stop-opacity="0.5" />
      <stop offset="60%" stop-color="#3b0764" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#030712" stop-opacity="0" />
    </radialGradient>
    <filter id="jw-glow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="500" height="640" fill="url(#jw-bg)" />
  <circle cx="250" cy="270" r="230" fill="url(#jw-abyss)" />

  <!-- Shadow Extraction Summoning Circle -->
  <g stroke="#a855f7" stroke-width="1.5" opacity="0.4">
    <circle cx="250" cy="300" r="180" stroke-dasharray="16 8" />
    <circle cx="250" cy="300" r="120" stroke-dasharray="10 6" />
    <polygon points="250,120 390,360 110,360" fill="none" stroke="#7c3aed" stroke-width="1" />
    <polygon points="250,480 390,240 110,240" fill="none" stroke="#7c3aed" stroke-width="1" />
  </g>

  <!-- Shadow Soldier Silhouette in Background (Igris & Shadows) -->
  <g opacity="0.35" fill="#4c1d95">
    <!-- Left Shadow Knight Horned Helmet -->
    <path d="M 60,350 L 80,240 L 95,200 L 105,240 L 125,350 Z" />
    <circle cx="85" cy="235" r="2.5" fill="#00f0ff" filter="url(#jw-glow)" />
    <!-- Right Shadow Knight Helmet -->
    <path d="M 375,350 L 395,240 L 405,200 L 415,240 L 440,350 Z" />
    <circle cx="410" cy="235" r="2.5" fill="#00f0ff" filter="url(#jw-glow)" />
  </g>

  <!-- Flowing Violet Shadow Flames at Bottom -->
  <path d="M 0,640 Q 70,490 140,550 Q 210,470 280,560 Q 350,480 420,540 Q 470,500 500,530 L 500,640 Z" fill="url(#jw-shadow-mist)" />

  <!-- Jin-Woo Kasaka Fang & Knight Killer Daggers -->
  <!-- Left Shadow Dagger (Fanged Serrated Edge) -->
  <g transform="translate(135, 340) rotate(42)">
    <path d="M 0,0 L 12,-110 L 22,-80 L 28,-140 L 32,0 Z" fill="url(#jw-dagger)" filter="url(#jw-glow)" />
    <!-- Dagger Hilt -->
    <rect x="8" y="0" width="16" height="40" rx="3" fill="#09090b" stroke="#a855f7" stroke-width="2" />
    <circle cx="16" cy="45" r="5" fill="#00f0ff" />
    <!-- Violet Poison Blade Drip -->
    <circle cx="28" cy="-145" r="4" fill="#a855f7" filter="url(#jw-glow)" />
  </g>

  <!-- Right Shadow Dagger -->
  <g transform="translate(365, 340) rotate(-42)">
    <path d="M 0,0 L -12,-110 L -22,-80 L -28,-140 L -32,0 Z" fill="url(#jw-dagger)" filter="url(#jw-glow)" />
    <!-- Dagger Hilt -->
    <rect x="-24" y="0" width="16" height="40" rx="3" fill="#09090b" stroke="#a855f7" stroke-width="2" />
    <circle cx="-16" cy="45" r="5" fill="#00f0ff" />
    <!-- Blue Shadow Spark -->
    <circle cx="-28" cy="-145" r="4" fill="#00f0ff" filter="url(#jw-glow)" />
  </g>

  <!-- Jin-Woo Signature Gothic Longcoat & Muscular Physique -->
  <path d="M 100,640 L 140,360 L 195,300 L 250,315 L 305,300 L 360,360 L 400,640 Z" fill="#09090b" stroke="#7c3aed" stroke-width="2" />
  <!-- Longcoat Tails Tattered in Shadow Wind -->
  <path d="M 140,360 L 100,580 L 160,540 L 190,640 Z" fill="#030712" stroke="#a855f7" stroke-width="1.5" />
  <path d="M 360,360 L 400,580 L 340,540 L 310,640 Z" fill="#030712" stroke="#a855f7" stroke-width="1.5" />

  <!-- Inner Dark Fitted Compression Top -->
  <path d="M 205,310 L 250,325 L 295,310 L 285,450 L 215,450 Z" fill="#111827" stroke="#6366f1" stroke-width="1" />
  <line x1="250" y1="325" x2="250" y2="430" stroke="#374151" stroke-width="2" />

  <!-- Wide Shoulders & High Sharp Collar -->
  <path d="M 195,250 L 210,310 L 250,295 L 205,245 Z" fill="#030712" stroke="#9333ea" stroke-width="2" />
  <path d="M 305,250 L 290,310 L 250,295 L 295,245 Z" fill="#030712" stroke="#9333ea" stroke-width="2" />

  <!-- Sleek Pale Neck -->
  <rect x="235" y="240" width="30" height="35" fill="#f8fafc" />

  <!-- Sharp S-Rank Anime Face Structure -->
  <path d="M 202,185 C 202,145 298,145 298,185 C 298,245 272,272 250,280 C 228,272 202,245 202,185 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />

  <!-- Iconic Radiant Glowing Cyan Eyes (Jin-Woo Signature Gaze) -->
  <!-- Left Eye -->
  <path d="M 218,202 Q 230,198 238,206" stroke="#030712" stroke-width="3" fill="none" />
  <ellipse cx="228" cy="206" rx="6" ry="3.5" fill="#00f0ff" filter="url(#jw-glow)" />
  <ellipse cx="228" cy="206" rx="2.5" ry="1.5" fill="#ffffff" />
  <!-- Left Eye Shadow Trail Emanating -->
  <path d="M 222,206 Q 200,195 190,205" stroke="#00f0ff" stroke-width="2.5" fill="none" opacity="0.9" filter="url(#jw-glow)" />

  <!-- Right Eye -->
  <path d="M 282,202 Q 270,198 262,206" stroke="#030712" stroke-width="3" fill="none" />
  <ellipse cx="272" cy="206" rx="6" ry="3.5" fill="#00f0ff" filter="url(#jw-glow)" />
  <ellipse cx="272" cy="206" rx="2.5" ry="1.5" fill="#ffffff" />
  <!-- Right Eye Shadow Trail Emanating -->
  <path d="M 278,206 Q 300,195 310,205" stroke="#00f0ff" stroke-width="2.5" fill="none" opacity="0.9" filter="url(#jw-glow)" />

  <!-- Cool, Stoic Expression -->
  <path d="M 242,248 L 258,248" stroke="#475569" stroke-width="2" stroke-linecap="round" />

  <!-- Sleek Korean Webtoon Jet-Black Hair with Front Spikes -->
  <path d="M 190,185 C 190,110 310,110 310,185 C 290,140 250,140 220,150 Z" fill="#030712" stroke="#1e1b4b" stroke-width="2" />
  <!-- Front Bangs Shading the Forehead -->
  <polygon points="215,160 226,200 232,165" fill="#09090b" />
  <polygon points="230,165 244,212 250,170" fill="#09090b" />
  <polygon points="248,170 262,210 268,165" fill="#09090b" />
  <polygon points="266,165 280,195 286,160" fill="#09090b" />
  <!-- Purple Tint Hair Highlights -->
  <path d="M 220,135 Q 250,122 280,132" stroke="#a855f7" stroke-width="2" fill="none" opacity="0.7" />

  <!-- Header Badge: S-Rank Hunter -->
  <g transform="translate(30, 25)">
    <rect x="0" y="0" width="180" height="34" rx="8" fill="#030712" stroke="#a855f7" stroke-width="2" opacity="0.95" />
    <circle cx="18" cy="17" r="7" fill="#00f0ff" filter="url(#jw-glow)" />
    <text x="35" y="23" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="900" letter-spacing="1">
      S-RANK MONARCH
    </text>
  </g>

  <!-- Solo Leveling Badge -->
  <g transform="translate(340, 25)">
    <rect x="0" y="0" width="130" height="34" rx="8" fill="#030712" stroke="#00f0ff" stroke-width="2" opacity="0.95" />
    <text x="65" y="22" fill="#00f0ff" font-size="12" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1.5">
      SOLO LEVELING
    </text>
  </g>

  <!-- Footer Banner -->
  <g transform="translate(30, 580)">
    <rect x="0" y="0" width="440" height="42" rx="16" fill="#030712" stroke="#a855f7" stroke-width="2" opacity="0.95" />
    <text x="20" y="27" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="900">
      JIN-WOO • SHADOW MONARCH
    </text>
    <text x="420" y="27" fill="#00f0ff" font-size="13" font-family="monospace" font-weight="900" text-anchor="end">
      ARISE: SHADOW ARMY LVL 99
    </text>
  </g>
</svg>
`;

/**
 * Global Mapping of Hero Preset IDs to their authentic AAA Game Art SVG Data URIs
 */
export const HERO_GAME_ART: Record<string, string> = {
  'hero-ff-kelly': svgToDataUri(KELLY_ART_SVG),
  'hero-pubg-lone-survivor': svgToDataUri(PUBG_SURVIVOR_ART_SVG),
  'hero-ff-alok': svgToDataUri(DJ_ALOK_ART_SVG),
  'hero-pubg-valkyrie': svgToDataUri(VALKYRIE_SNIPER_ART_SVG),
  'hero-ff-moco': svgToDataUri(MOCO_HACKER_ART_SVG),
  'hero-pubg-pharaoh': svgToDataUri(PHARAOH_ART_SVG),
  'hero-ff-hayato': svgToDataUri(HAYATO_ART_SVG),
  'hero-ff-chrono': svgToDataUri(CHRONO_ART_SVG),
  'hero-pubg-desert': svgToDataUri(DESERT_ASSASSIN_ART_SVG),
  'hero-sl-jinwoo': svgToDataUri(JINWOO_ART_SVG),
};

export function getHeroGameArt(heroId: string, fallback?: string): string {
  return HERO_GAME_ART[heroId] || fallback || HERO_GAME_ART['hero-ff-kelly'];
}

