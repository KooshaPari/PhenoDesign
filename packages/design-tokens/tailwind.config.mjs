/**
 * Phenotype Tailwind CSS preset.
 *
 * CANONICAL TOKEN HOME: `@phenotype/design` (repo root, v2.0.1+).
 * The DTCG store of record is `tokens/keycap.json`; the CSS projection is
 * `css/keycap-palette.css`. This preset is a *Tailwind-shaped projection* of
 * that store -- it is not an independent palette.
 *
 * DTCG keycap paths marked [canonical] below are transcribed verbatim from
 * `tokens/keycap.json` (verified 2026-10-17). Any change to those values must
 * land in `tokens/keycap.json` FIRST, then be mirrored here. Paths marked
 * [subpackage] have no canonical equivalent yet and are NOT governed by the
 * keycap store -- see CONSUMERS.md section 3.
 *
 * Usage:
 *   // tailwind.config.js
 *   import phenoPreset from '@kooshapari/phenotype-design-tokens/tailwind';
 *   export default { presets: [phenoPreset], content: [...] }
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  theme: {
    extend: {
      // --- Seed & surface colors -------------------------------------------
      // [canonical] values transcribed from tokens/keycap.json
      colors: {
        seed: {
          // keycap.dark.bg = #090a0c
          obsidian: '#090a0c',
          // keycap.color.slate = #353a40
          slate: '#353a40',
          // [subpackage] no canonical keycap equivalent
          ceramic: '#F6F5F5',
          // keycap.color.accent = #7ebab5
          teal: '#7ebab5',
        },
        surface: {
          // keycap.light.bg = #f8f9fa
          DEFAULT: '#f8f9fa',
          // keycap.light.bg-alt = #f0f1f3
          raised: '#f0f1f3',
          // keycap.light.bg-soft = #e8eaed
          inset: '#e8eaed',
          // keycap.dark.bg = #090a0c
          obsidian: '#090a0c',
          // keycap.color.slate = #353a40
          slate: '#353a40',
          // [subpackage] no canonical keycap equivalent
          ceramic: '#F6F5F5',
          // keycap.color.accent = #7ebab5
          teal: '#7ebab5',
        },
        ink: {
          // keycap.light.text-1 = #1a1c1e
          DEFAULT: '#1a1c1e',
          // keycap.light.text-2 = #4a4f57
          muted: '#4a4f57',
        },

        // --- Derived families -----------------------------------------------
        // [subpackage] no canonical keycap equivalent. Retained for landing-page
        // utility classes; NOT part of the keycap store. Do not treat these as
        // canonical -- see CONSUMERS.md section 3.
        graphite: {
          950: '#171a18',
          900: '#20231f',
          800: '#30332e',
        },
        paper: {
          // [subpackage] retained as-is; the canonical light surface is
          // surface.DEFAULT (#f8f9fa), which these shadowing shades do not match.
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
        // [canonical] accent.DEFAULT = keycap.color.accent
        accent: {
          DEFAULT: '#7ebab5',
          // [canonical] engineering = keycap.color.accent
          engineering: '#7ebab5',
          // [canonical] product = keycap.color.accent-dim (#569691)
          product: '#569691',
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
      // [subpackage] PARTIAL overlap only. tokens/keycap.json keycap.font
      // defines exactly two families: family-base (Inter stack) and
      // family-mono (JetBrains Mono stack). The Mac-first fallback chains
      // below are the subpackage's own; `display` (Space Grotesk) has no
      // canonical keycap equivalent. Left as-is pending a keycap.font
      // expansion -- see CONSUMERS.md section 3.
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
