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
        'move-gradient': 'move-gradient 8s linear infinite',
        'draw-border': 'draw-border 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'undraw-border': 'undraw-border 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'draw-border-bg': 'draw-border-bg 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'undraw-border-bg': 'undraw-border-bg 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'draw-border-top': 'draw-border-top 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'draw-border-sides': 'draw-border-sides 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'draw-border-bottom': 'draw-border-bottom 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'undraw-border-top': 'undraw-border-top 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'undraw-border-right': 'undraw-border-right 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'undraw-border-left': 'undraw-border-left 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'undraw-border-bottom': 'undraw-border-bottom 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-shadow': 'fade-shadow 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'reveal-border': 'reveal-border 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'hide-border': 'hide-border 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        'infinite-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'move-gradient': {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          }
        },
        'reveal-border': {
          '0%': {
            margin: '0px'
          },
          '100%': {
            margin: '2px'
          }
        },
        'hide-border': {
          '0%': {
            margin: '2px'
          },
          '100%': {
            margin: '0px'
          }
        },
        'draw-border': {
          '0%': { 
            bottom: '100%'
          },
          '35%': {
            bottom: '100%'
          },
          '100%': {
            bottom: '2px'
          }
        },
        'draw-border-bg': {
          '0%': { 
            clipPath: 'polygon(2px 2px, 2px 2px, 2px 2px)'
          },
          '35%': {
            clipPath: 'polygon(2px 2px, calc(100% - 2px) 2px, calc(100% - 2px) 2px, 2px 2px)'
          },
          '85%': {
            clipPath: 'polygon(2px 2px, calc(100% - 2px) 2px, calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 2px, 2px 2px)'
          },
          '100%': {
            clipPath: 'polygon(2px 2px, calc(100% - 2px) 2px, calc(100% - 2px) calc(100% - 2px), 2px calc(100% - 2px), 2px calc(100% - 2px), 2px 2px)'
          }
        },
        'undraw-border': {
          '0%': {
            bottom: '2px'
          },
          '65%': {
            bottom: '100%'
          },
          '100%': {
            bottom: '100%'
          }
        },
        'undraw-border-bg': {
          '0%': {
            clipPath: 'polygon(2px 2px, calc(100% - 2px) 2px, calc(100% - 2px) calc(100% - 2px), 2px calc(100% - 2px), 2px calc(100% - 2px), 2px 2px)'
          },
          '15%': {
            clipPath: 'polygon(2px 2px, calc(100% - 2px) 2px, calc(100% - 2px) 2px, calc(100% - 2px) 2px, calc(100% - 2px) 2px, 2px 2px)'
          },
          '65%': {
            clipPath: 'polygon(2px 2px, 2px 2px, 2px 2px, 2px 2px, 2px 2px, 2px 2px)'
          },
          '100%': {
            clipPath: 'polygon(2px 2px, 2px 2px, 2px 2px)'
          }
        },
        'draw-border-top': {
          '0%': { 
            transform: 'scaleX(0)',
            opacity: '0'
          },
          '100%': {
            transform: 'scaleX(1)',
            opacity: '1'
          }
        },
        'draw-border-sides': {
          '0%': {
            transform: 'scaleY(0)',
            opacity: '0'
          },
          '100%': {
            transform: 'scaleY(1)',
            opacity: '1'
          }
        },
        'draw-border-bottom': {
          '0%': {
            transform: 'scaleX(0)',
            opacity: '0'
          },
          '100%': {
            transform: 'scaleX(1)',
            opacity: '1'
          }
        },
        'undraw-border-top': {
          '0%': {
            transform: 'scaleX(1)'
          },
          '25%': {
            transform: 'scaleX(0)'
          },
          '100%': {
            transform: 'scaleX(0)'
          }
        },
        'undraw-border-left': {
          '0%, 20%': {
            transform: 'scaleY(1)'
          },
          '45%': {
            transform: 'scaleY(0)'
          },
          '100%': {
            transform: 'scaleY(0)'
          }
        },
        'undraw-border-right': {
          '0%, 20%': {
            transform: 'scaleY(1)'
          },
          '45%': {
            transform: 'scaleY(0)'
          },
          '100%': {
            transform: 'scaleY(0)'
          }
        },
        'undraw-border-bottom': {
          '0%': {
            transform: 'scaleX(1)'
          },
          '25%': {
            transform: 'scaleX(0)'
          },
          '100%': {
            transform: 'scaleX(0)'
          }
        },
        'fade-shadow': {
          '0%, 40%': {
            boxShadow: '0px 2.5px 60px 0px hsla(317, 100%, 46%, 0)'
          },
          '100%': {
            boxShadow: '0px 2.5px 60px 0px hsla(317, 100%, 46%, 0.15)'
          }
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
