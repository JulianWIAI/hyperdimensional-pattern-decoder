/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cyberpunk palette
        neon: {
          green: '#00ff88',
          cyan: '#00d4ff',
          orange: '#ff6b1a',
          red: '#ff2d55',
        },
        surface: {
          DEFAULT: '#0d0d1a',
          raised: '#111128',
          border: '#1a1a3e',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'laser-scan': 'laserScan 2.2s cubic-bezier(0.4, 0, 0.6, 1) forwards',
        'grid-fade': 'gridFadeIn 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        typewriter: 'typewriter 0.05s steps(1) forwards',
      },
      keyframes: {
        laserScan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0.9' },
          '100%': { transform: 'translateY(100vh)', opacity: '0.6' },
        },
        gridFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 4px #00ff88, 0 0 8px #00ff88' },
          '50%': { boxShadow: '0 0 12px #00ff88, 0 0 24px #00ff88' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
