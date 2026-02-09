/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',    // Mobile small (iPhone SE)
        'sm': '640px',    // Mobile large / Tablet small
        'md': '768px',    // Tablet
        'lg': '1024px',   // Desktop small
        'xl': '1280px',   // Desktop
        '2xl': '1536px',  // Desktop large
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      minHeight: {
        'touch': '44px', // Minimum touch target size (Apple HIG)
      },
      minWidth: {
        'touch': '44px',
      },
      fontFamily: {
        'cairo': ['Cairo', 'system-ui', 'sans-serif'],
      },
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        yellow: {
          400: '#facc15',
          500: '#eab308',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.safe-area-pb': {
          'padding-bottom': 'env(safe-area-inset-bottom, 0px)',
        },
        '.safe-area-pt': {
          'padding-top': 'env(safe-area-inset-top, 0px)',
        },
        '.safe-area-pl': {
          'padding-left': 'env(safe-area-inset-left, 0px)',
        },
        '.safe-area-pr': {
          'padding-right': 'env(safe-area-inset-right, 0px)',
        },
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none',
          },
        },
        '.rtl': {
          'direction': 'rtl',
        },
        '.ltr': {
          'direction': 'ltr',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}
