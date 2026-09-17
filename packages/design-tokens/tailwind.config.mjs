/**
 * Phenotype Tailwind CSS preset.
 *
 * Maps the canonical design tokens to Tailwind utility classes.
 * Usage:
 *   // tailwind.config.js
 *   import phenoPreset from '@<REDACTED>/phenotype-design-tokens/tailwind';
 *   export default { presets: [phenoPreset], content: [...] }
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  theme: {
    extend: {
      // --- Seed & surface colors -------------------------------------------
      colors: {
        seed: {
          obsidian: '#0F1012',
          slate: '#353A40',
          ceramic: '#F6F5F5',
          teal: '#7EBAB5',
        },
        surface: {
          DEFAULT: '#f3f0e8',
          raised: '#faf7ef',
          inset: '#e2dfd8',
          obsidian: '#0F1012',
          slate: '#353A40',
          ceramic: '#F6F5F5',
          teal: '#7EBAB5',
        },
        ink: {
          DEFAULT: '#171a18',
          muted: '#3d4239',
        },

        // --- Derived families -----------------------------------------------
        graphite: {
          950: '#171a18',
          900: '#20231f',
          800: '#30332e',
        },
        paper: {
          100: '#f3f0e8',
          200: '#e8e3d8',
        },
        concrete: {
          300: '#c8c5bb',
          500: '#8e9188',
        },
        olive: {
          300: '#a9b47a',
          500: '#737c4c',
        },
        arch: {
          300: '#76aeb5',
          500: '#3f8795',
        },
        acid: {
          500: '#b6d448',
        },

        // --- Semantic accents -----------------------------------------------
        accent: {
          DEFAULT: '#3f8795',
          engineering: '#3f8795',
          product: '#737c4c',
        },

        // --- Family accent colors -------------------------------------------
        family: {
          netweave: '#3f8795',
          sharecli: '#c76a3a',
          omniroute: '#457b9d',
          physical: '#b8962e',
          substrate: '#5a7a6e',
          omlx: '#7a6aad',
          'netweave-product': '#4ecdc4',
          'sharecli-product': '#e07a5f',
          'omniroute-product': '#577590',
          'physical-product': '#daa520',
          'substrate-product': '#6a8f7e',
          'omlx-product': '#9a8acd',
        },
      },

      // --- Typography -------------------------------------------------------
      fontFamily: {
        display: ['"Space Grotesk"', '"Avenir Next"', '"Helvetica Neue"', 'sans-serif'],
        reading: ['"Inter"', '"Avenir Next"', '"Helvetica Neue"', 'sans-serif'],
        meta: ['"JetBrains Mono"', '"SFMono-Regular"', 'Consolas', 'monospace'],
      },
      fontSize: {
        'step-1': ['clamp(0.75rem, 0.71rem + 0.16vw, 0.84rem)', { lineHeight: '1.5' }],
        'step-0': ['clamp(0.96rem, 0.9rem + 0.25vw, 1.08rem)', { lineHeight: '1.5' }],
        'step-1': ['clamp(1.18rem, 1.07rem + 0.48vw, 1.42rem)', { lineHeight: '1.4' }],
        'step-2': ['clamp(1.48rem, 1.25rem + 0.93vw, 1.95rem)', { lineHeight: '1.3' }],
        'step-3': ['clamp(1.88rem, 1.48rem + 1.63vw, 2.7rem)', { lineHeight: '1.2' }],
        'step-4': ['clamp(2.45rem, 1.73rem + 2.9vw, 3.9rem)', { lineHeight: '1.1' }],
      },

      // --- Spacing (Material Lab 4..64) -------------------------------------
      spacing: {
        '0': '0.25rem',
        '1': '0.375rem',
        '2': '0.625rem',
        '3': '1rem',
        '4': '1.5rem',
        '5': '2.25rem',
        '6': '3.5rem',
        '7': '5.5rem',
      },

      // --- Radii (sharp instrument, not plush) ------------------------------
      borderRadius: {
        control: '6px',
        panel: '10px',
        studio: '12px',
      },

      // --- Elevation --------------------------------------------------------
      boxShadow: {
        card: '0 1px 0 var(--precision-rule)',
        specimen: '0.65rem 0.65rem 0 color-mix(in oklch, var(--ink) 14%, transparent)',
      },
      zIndex: {
        chrome: '10',
        canvas: '5',
        overlay: '1',
        footer: '0',
      },

      // --- Motion -----------------------------------------------------------
      transitionDuration: {
        fast: '160ms',
        normal: '220ms',
        slow: '280ms',
        glacial: '380ms',
        short: '120ms',
        standard: '180ms',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // --- Layout -----------------------------------------------------------
      maxWidth: {
        measure: '68ch',
      },
    },
  },
};
