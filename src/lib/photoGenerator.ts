import { AvatarStyle, CharacterClass, SpritePartsConfig } from './types';

/**
 * Procedural SVG Sprite Generator
 * Generates an SVG data URL for a customized modular RPG hero sprite.
 */
export function generateProceduralSprite(
  parts: SpritePartsConfig,
  charClass: CharacterClass
): string {
  const {
    body = 'fair',
    hair = 'spiky',
    hairColor = '#f59e0b',
    outfit = 'plate',
    outfitColor = '#3b82f6',
    weapon = 'sword',
    aura = 'none',
  } = parts;

  // Skin tones
  const skinColors: Record<string, string> = {
    fair: '#fcd34d',
    tanned: '#d97706',
    dark: '#78350f',
    elf: '#a7f3d0',
    cyber: '#94a3b8',
  };
  const skin = skinColors[body] || '#fcd34d';

  // Aura definitions
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
      <ellipse cx="64" cy="24" rx="28" ry="8" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.9" />
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
  }

  // Hair definitions
  let hairSvg = '';
  if (hair === 'spiky') {
    hairSvg = `
      <path d="M38,50 L42,32 L50,38 L64,24 L78,38 L86,32 L90,50 Q64,36 38,50 Z" fill="${hairColor}" />
      <polygon points="54,26 64,14 74,26" fill="${hairColor}" />
    `;
  } else if (hair === 'long') {
    hairSvg = `
      <path d="M36,50 Q64,28 92,50 L96,85 Q88,80 88,60 L88,52 Q64,40 40,52 L40,60 Q40,80 32,85 Z" fill="${hairColor}" />
    `;
  } else if (hair === 'ponytail') {
    hairSvg = `
      <path d="M40,50 Q64,32 88,50 Q64,40 40,50 Z" fill="${hairColor}" />
      <path d="M78,42 Q105,35 100,65 Q88,60 80,48 Z" fill="${hairColor}" />
    `;
  } else if (hair === 'short') {
    hairSvg = `
      <path d="M38,52 Q64,30 90,52 Q64,42 38,52 Z" fill="${hairColor}" />
    `;
  }

  // Outfit definitions
  let outfitSvg = '';
  if (outfit === 'plate') {
    outfitSvg = `
      <path d="M44,78 L84,78 L90,118 L38,118 Z" fill="${outfitColor}" stroke="#1e293b" stroke-width="2" />
      <rect x="52" y="82" width="24" height="28" rx="3" fill="#94a3b8" />
      <circle cx="64" cy="96" r="4" fill="#fbbf24" />
      <!-- Pauldrons -->
      <path d="M34,80 Q44,72 50,86 L36,92 Z" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5" />
      <path d="M94,80 Q84,72 78,86 L92,92 Z" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5" />
    `;
  } else if (outfit === 'robe') {
    outfitSvg = `
      <path d="M42,76 L86,76 L96,120 L32,120 Z" fill="${outfitColor}" stroke="#1e1b4b" stroke-width="2" />
      <polygon points="64,76 72,120 56,120" fill="#facc15" opacity="0.8" />
      <circle cx="64" cy="80" r="5" fill="#c084fc" />
    `;
  } else if (outfit === 'cyber') {
    outfitSvg = `
      <path d="M44,76 L84,76 L92,120 L36,120 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="2" />
      <line x1="64" y1="76" x2="64" y2="120" stroke="#06b6d4" stroke-width="2" />
      <rect x="54" y="88" width="20" height="12" fill="#3b82f6" opacity="0.6" />
      <circle cx="48" cy="94" r="3" fill="#f43f5e" />
    `;
  } else {
    // Tunic / Leather
    outfitSvg = `
      <path d="M44,78 L84,78 L90,120 L38,120 Z" fill="${outfitColor}" stroke="#451a03" stroke-width="2" />
      <line x1="64" y1="78" x2="64" y2="105" stroke="#78350f" stroke-width="3" />
      <rect x="42" y="102" width="44" height="6" fill="#78350f" />
      <rect x="60" y="100" width="8" height="10" fill="#f59e0b" />
    `;
  }

  // Weapon definitions
  let weaponSvg = '';
  if (weapon === 'sword') {
    weaponSvg = `
      <g transform="rotate(-30 96 85)">
        <rect x="94" y="30" width="6" height="55" rx="1" fill="#e2e8f0" stroke="#475569" stroke-width="1" />
        <line x1="97" y1="32" x2="97" y2="80" stroke="#94a3b8" stroke-width="1.5" />
        <rect x="88" y="85" width="18" height="4" rx="1" fill="#f59e0b" />
        <rect x="95" y="89" width="4" height="14" rx="1" fill="#78350f" />
        <circle cx="97" cy="104" r="3" fill="#f59e0b" />
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
        <rect x="94" y="88" width="4" height="8" fill="#1e293b" />
      </g>
      <g transform="rotate(40 32 90)">
        <polygon points="32,60 36,85 28,85" fill="#cbd5e1" stroke="#334155" stroke-width="1" />
        <rect x="26" y="85" width="12" height="3" fill="#f59e0b" />
        <rect x="30" y="88" width="4" height="8" fill="#1e293b" />
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

  // Class-specific headgear/accent
  let classAccent = '';
  if (charClass === 'CYBER_HERO') {
    classAccent = `
      <!-- Cybernetic Visor -->
      <rect x="48" y="58" width="32" height="8" rx="2" fill="#06b6d4" opacity="0.9" filter="url(#blurEffect)" />
      <rect x="50" y="59" width="28" height="6" rx="1" fill="#22d3ee" />
    `;
  } else if (charClass === 'MAGE') {
    classAccent = `
      <polygon points="64,52 67,58 64,64 61,58" fill="#38bdf8" />
    `;
  } else if (charClass === 'ROGUE') {
    classAccent = `
      <!-- Shadow Mask -->
      <path d="M46,64 L82,64 L78,76 L50,76 Z" fill="#0f172a" opacity="0.85" />
    `;
  } else if (charClass === 'PALADIN') {
    classAccent = `
      <!-- Holy Crown Circlet -->
      <path d="M48,46 L54,38 L64,44 L74,38 L80,46 Z" fill="#fbbf24" stroke="#d97706" stroke-width="1" />
      <circle cx="64" cy="42" r="2.5" fill="#38bdf8" />
    `;
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
      <circle cx="64" cy="62" r="20" fill="${skin}" stroke="#1e293b" stroke-width="1.5"/>

      <!-- Eyes -->
      <circle cx="56" cy="60" r="2.5" fill="#0f172a"/>
      <circle cx="72" cy="60" r="2.5" fill="#0f172a"/>
      <circle cx="57" cy="59" r="0.8" fill="#ffffff"/>
      <circle cx="73" cy="59" r="0.8" fill="#ffffff"/>

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
 * Transforms an uploaded photo into a stylized RPG character portrait
 * using Canvas pixelation, color quantization, and class-specific shader overlays.
 */
export async function generateAvatarFromPhoto(
  imageSource: string,
  style: AvatarStyle,
  seed: number = Date.now(),
  options: { pixelSize?: number; glow?: number } = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) throw new Error('Canvas 2D context unavailable');

        const size = 256;
        canvas.width = size;
        canvas.height = size;

        // 1. Draw centered square crop of original image
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        // 2. Pixelation / Mosaic Downsampling
        const pixelSize = options.pixelSize || (style === 'PIXEL_HERO' ? 6 : 4);
        const imgData = ctx.getImageData(0, 0, size, size);
        const data = imgData.data;

        // Seeded random variation offset
        const pseudoRand = (offset: number) => {
          const x = Math.sin(seed + offset) * 10000;
          return x - Math.floor(x);
        };

        // Color Quantization & Stylization Loop
        for (let y = 0; y < size; y += pixelSize) {
          for (let x = 0; x < size; x += pixelSize) {
            // Sample average block color
            let r = 0,
              g = 0,
              b = 0,
              count = 0;
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

            // Apply style transformations
            const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

            let finalR = r,
              finalG = g,
              finalB = b;

            if (style === 'PIXEL_HERO') {
              // 16-bit RPG Palette snap
              finalR = Math.round(r / 32) * 32;
              finalG = Math.round(g / 32) * 32;
              finalB = Math.round(b / 32) * 32;
              // Warm golden tint for heroes
              finalR = Math.min(255, finalR + 15);
              finalG = Math.min(255, finalG + 8);
            } else if (style === 'MYSTIC_ARCANE') {
              // Violet / Arcane shift
              finalR = Math.floor(brightness * 180 + 30);
              finalG = Math.floor(brightness * 80 + 20);
              finalB = Math.floor(brightness * 255 + 50);
            } else if (style === 'CYBER_ROGUE') {
              // Cyan / Neon Magenta duality
              if (brightness > 0.5) {
                finalR = 34;
                finalG = 211;
                finalB = 238; // Bright cyan
              } else {
                finalR = Math.floor(r * 0.5 + 40);
                finalG = Math.floor(g * 0.2);
                finalB = Math.floor(b * 0.6 + 60); // Dark synthwave purple
              }
            } else if (style === 'HOLY_PALADIN') {
              // Radiant gold & warm ivory
              finalR = Math.floor(brightness * 255);
              finalG = Math.floor(brightness * 220 + 20);
              finalB = Math.floor(brightness * 120);
            } else if (style === 'SHADOW_ASSASSIN') {
              // High contrast monochrome with stealth crimson highlights
              const mono = Math.floor(brightness * 180);
              finalR = mono;
              finalG = mono;
              finalB = mono;
              if (brightness > 0.75) {
                finalR = 239; // Crimson eye highlight
                finalG = 68;
                finalB = 68;
              }
            }

            // Fill the pixel block
            for (let dy = 0; dy < pixelSize && y + dy < size; dy++) {
              for (let dx = 0; dx < pixelSize && x + dx < size; dx++) {
                const idx = ((y + dy) * size + (x + dx)) * 4;
                data[idx] = finalR;
                data[idx + 1] = finalG;
                data[idx + 2] = finalB;
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        // 3. Procedural Shader Overlays (Vignette, Auras, Class Crests)
        ctx.save();

        // Style Overlays
        if (style === 'CYBER_ROGUE') {
          // Horizontal CRT Scanlines
          ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
          for (let y = 0; y < size; y += 4) {
            ctx.fillRect(0, y, size, 1.5);
          }

          // Cybernetic Visor / Reticle
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(size / 2, size * 0.42, 28, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.arc(size / 2 + 10, size * 0.42, 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (style === 'MYSTIC_ARCANE') {
          // Arcane Runic Circle
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.6)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size * 0.44, 0, Math.PI * 2);
          ctx.stroke();

          // Swirling Arcane Motes
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + pseudoRand(i) * Math.PI;
            const dist = size * 0.38;
            const px = size / 2 + Math.cos(angle) * dist;
            const py = size / 2 + Math.sin(angle) * dist;
            ctx.fillStyle = '#c084fc';
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (style === 'HOLY_PALADIN') {
          // Divine Halo
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 4;
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.ellipse(size / 2, size * 0.2, 50, 14, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else if (style === 'SHADOW_ASSASSIN') {
          // Dark Vignette
          const grad = ctx.createRadialGradient(
            size / 2,
            size / 2,
            size * 0.3,
            size / 2,
            size / 2,
            size * 0.6
          );
          grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          grad.addColorStop(1, 'rgba(11, 15, 25, 0.85)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, size, size);
        }

        // 4. RPG Border & Crest
        ctx.strokeStyle =
          style === 'HOLY_PALADIN'
            ? '#f59e0b'
            : style === 'CYBER_ROGUE'
            ? '#06b6d4'
            : style === 'MYSTIC_ARCANE'
            ? '#a855f7'
            : '#e2e8f0';
        ctx.lineWidth = 6;
        ctx.strokeRect(3, 3, size - 6, size - 6);

        // Corner Rivets
        ctx.fillStyle = '#fbbf24';
        const corners = [
          [8, 8],
          [size - 8, 8],
          [8, size - 8],
          [size - 8, size - 8],
        ];
        corners.forEach(([cx, cy]) => {
          ctx.beginPath();
          ctx.arc(cx, cy, 3, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();

        // Return compressed PNG data URL
        resolve(canvas.toDataURL('image/png', 0.92));
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image for transformation'));
    img.src = imageSource;
  });
}
