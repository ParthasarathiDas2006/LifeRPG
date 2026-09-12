/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rpg: {
          dark: "#0b0f19",
          card: "#121b2a",
          border: "#1e293b",
          gold: "#f59e0b",
          goldBright: "#fbbf24",
          xp: "#8b5cf6",
          health: "#ef4444",
          mana: "#3b82f6",
          str: "#f97316",
          int: "#38bdf8",
          vit: "#22c55e",
          agi: "#eab308",
          cha: "#ec4899",
          wil: "#a855f7",
        },
      },
      boxShadow: {
        'glow-gold': '0 0 15px rgba(245, 158, 11, 0.4)',
        'glow-xp': '0 0 15px rgba(139, 92, 246, 0.4)',
        'glow-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
