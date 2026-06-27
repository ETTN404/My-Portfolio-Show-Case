/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          bg:        '#E8E4DE',   // Warm off-white page background
          surface:   '#EDEAE4',   // Slightly lighter card surface
          raised:    '#F2EFEA',   // Raised element surface
          inset:     '#D9D5CF',   // Inset/pressed areas
          border:    '#D4D0CA',   // Subtle warm border
          accent:    '#7A8EA0',   // Muted dusty blue primary accent
          accentSoft:'#A8BCC8',   // Lighter blue for hover states
          accentDeep:'#5C7080',   // Deeper blue for active states
          text:      '#3A3A3A',   // Primary dark text
          textMuted: '#7A7A72',   // Muted secondary text
          textLight: '#9E9E96',   // Light tertiary text
          highlight: '#FFFFFF',   // Pure white inner highlight
          shadow:    '#B8B4AE',   // Warm shadow color
          shadowDeep:'#A09C96',   // Deeper shadow
        }
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'clay': '20px',
        'clay-sm': '14px',
        'clay-lg': '28px',
        'clay-pill': '50px',
      },
      boxShadow: {
        'clay-raised': '8px 8px 16px #c8c4be, -8px -8px 16px #ffffff',
        'clay-raised-sm': '4px 4px 8px #c8c4be, -4px -4px 8px #ffffff',
        'clay-raised-lg': '12px 12px 24px #c8c4be, -12px -12px 24px #ffffff',
        'clay-inset': 'inset 4px 4px 8px #c8c4be, inset -4px -4px 8px #ffffff',
        'clay-inset-sm': 'inset 2px 2px 4px #c8c4be, inset -2px -2px 4px #ffffff',
        'clay-button': '4px 4px 10px #c8c4be, -4px -4px 10px #ffffff',
        'clay-button-active': 'inset 3px 3px 6px #c8c4be, inset -3px -3px 6px #ffffff',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s infinite ease-in-out',
        'gentle-pulse': 'gentlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}