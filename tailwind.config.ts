/* Use tailwind.config.ts for:
 * Complex utilities that need variants
 * Custom color schemes
 * Theme extensions
 * Reusable utility patterns */

/* Use globals.css for:
 * Base element styles
 * Simple component classes
 * CSS reset/normalization
 * Global CSS variables */

import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

const config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 30s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        text: 'hsl(var(--text))',
        muted: 'hsl(var(--muted))',
        'muted-text': 'hsl(var(--muted-text))',
        primary: 'hsl(var(--primary))',
        'primary-text': 'hsl(var(--primary-text))',
        secondary: 'hsl(var(--secondary))',
        'secondary-text': 'hsl(var(--secondary-text))',
        green: 'hsl(var(--green))',
        pink: 'hsl(var(--pink))',
        orange: 'hsl(var(--orange))',
        purple: 'hsl(var(--purple))',
        blue: 'hsl(var(--blue))',
        darkblue: 'hsl(var(--darkblue))',
        maticblack: 'hsl(var(--maticblack))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          text: 'hsl(var(--card-text))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          text: 'hsl(var(--popover-text))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          text: 'hsl(var(--accent-text))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          text: 'hsl(var(--destructive-text))',
        },
        // Base colors
        white: '#FFFFFF',
        black: '#000000',
        transparent: 'transparent',
        current: 'currentColor',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'chalet-newyork': ['"Chalet NewYork"', 'system-ui', 'sans-serif']
      },
      opacity: {
        '85': '0.85',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [
    typography,
    tailwindcssAnimate,
    function({ addVariant }: { addVariant: Function }) {
      // Add theme variants
      addVariant('blue', ':is(.blue &)')
      addVariant('green', ':is(.green &)')
      addVariant('pink', ':is(.pink &)')
      addVariant('orange', ':is(.orange &)')
      addVariant('purple', ':is(.purple &)')
    }
  ]
} satisfies Config;

export default config;
