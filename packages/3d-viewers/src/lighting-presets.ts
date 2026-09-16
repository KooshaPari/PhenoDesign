/**
 * Product Photography Lighting Presets
 *
 * Predefined Three.js lighting setups for product visualization.
 * Each preset configures ambient, directional, and optional rim/spot
 * lights for different photography styles.
 *
 * @example
 * ```ts
 * import { LIGHTING_PRESETS, applyLighting } from '@kooshapari/phenotype-3d-viewers/lighting-presets';
 * import * as THREE from 'three';
 *
 * const scene = new THREE.Scene();
 * applyLighting(scene, LIGHTING_PRESETS.studio);
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

import type { Scene, Light } from 'three';

/** A single light definition for a preset. */
export interface LightDefinition {
  /** Light type. */
  type: 'ambient' | 'directional' | 'point' | 'spot' | 'hemisphere';
  /** Light color as hex number. Default: 0xffffff. */
  color?: number;
  /** Light intensity. Default: 1. */
  intensity?: number;
  /** Position [x, y, z]. Ignored for ambient. */
  position?: [number, number, number];
  /** Target position [x, y, z]. For directional/spot lights. */
  target?: [number, number, number];
  /** Shadow casting. Default: false. */
  castShadow?: boolean;
  /** Shadow map size. Default: 1024. */
  shadowSize?: number;
  /** For hemisphere: ground color. */
  groundColor?: number;
  /** For spot: angle in radians. Default: Math.PI / 6. */
  angle?: number;
  /** For spot: penumbra (0-1). Default: 0.3. */
  penumbra?: number;
}

/** A complete lighting preset. */
export interface LightingPreset {
  /** Human-readable name. */
  name: string;
  /** Description of the lighting style. */
  description: string;
  /** Light definitions to add to the scene. */
  lights: LightDefinition[];
  /** Scene background color (hex). Optional override. */
  background?: number;
  /** Renderer tone mapping exposure. Optional override. */
  exposure?: number;
}

/* ------------------------------------------------------------------ */
/*  Presets                                                           */
/* ------------------------------------------------------------------ */

/** Studio lighting: clean product shot with neutral tones. */
export const STUDIO_PRESET: LightingPreset = {
  name: 'studio',
  description: 'Clean product photography with even, neutral illumination',
  background: 0x0f1012,
  exposure: 1.1,
  lights: [
    { type: 'ambient', color: 0xffffff, intensity: 0.4 },
    { type: 'directional', color: 0xffffff, intensity: 1.2, position: [5, 8, 5], castShadow: true },
    { type: 'directional', color: 0xddeeff, intensity: 0.5, position: [-3, 4, -2] },
    { type: 'point', color: 0xffeedd, intensity: 0.3, position: [0, -2, 3] },
  ],
};

/** Dramatic lighting: high contrast with rim lighting. */
export const DRAMATIC_PRESET: LightingPreset = {
  name: 'dramatic',
  description: 'High contrast lighting with strong rim and fill',
  background: 0x080808,
  exposure: 1.3,
  lights: [
    { type: 'ambient', color: 0x111122, intensity: 0.15 },
    { type: 'directional', color: 0xffffff, intensity: 1.8, position: [-4, 6, -3], castShadow: true },
    { type: 'spot', color: 0xffd4aa, intensity: 1.0, position: [3, 5, -4], angle: 0.4, penumbra: 0.6 },
    { type: 'point', color: 0x4488ff, intensity: 0.4, position: [-3, 1, 4] },
  ],
};

/** Flat lighting: even, shadowless illumination. */
export const FLAT_PRESET: LightingPreset = {
  name: 'flat',
  description: 'Even, shadowless illumination for technical documentation',
  background: 0xf5f5f5,
  exposure: 1.0,
  lights: [
    { type: 'ambient', color: 0xffffff, intensity: 0.7 },
    { type: 'directional', color: 0xffffff, intensity: 0.6, position: [0, 10, 0] },
    { type: 'hemisphere', color: 0xffffff, groundColor: 0xe0e0e0, intensity: 0.5 },
  ],
};

/** Outdoor lighting: warm natural light simulation. */
export const OUTDOOR_PRESET: LightingPreset = {
  name: 'outdoor',
  description: 'Warm natural light with sky simulation',
  background: 0x87ceeb,
  exposure: 1.0,
  lights: [
    { type: 'hemisphere', color: 0x87ceeb, groundColor: 0x8b7355, intensity: 0.6 },
    { type: 'directional', color: 0xfff4e0, intensity: 1.4, position: [10, 15, 8], castShadow: true },
    { type: 'ambient', color: 0xffeedd, intensity: 0.3 },
  ],
};

/** All presets indexed by name. */
export const LIGHTING_PRESETS: Record<string, LightingPreset> = {
  studio: STUDIO_PRESET,
  dramatic: DRAMATIC_PRESET,
  flat: FLAT_PRESET,
  outdoor: OUTDOOR_PRESET,
};

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * Apply a lighting preset to a Three.js scene.
 *
 * Creates and adds all lights defined in the preset.
 * Returns the created lights for later removal or adjustment.
 *
 * @param scene - Three.js scene to add lights to
 * @param preset - Lighting preset configuration
 * @returns Array of created Three.js Light objects
 */
export function applyLighting(scene: Scene, preset: LightingPreset): Light[] {
  // Dynamic import of three to avoid hard dependency
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const THREE = globalThis.THREE ?? (() => {
    throw new Error('Three.js must be available globally or imported before applyLighting');
  })();

  const created: Light[] = [];

  for (const def of preset.lights) {
    const color = new THREE.Color(def.color ?? 0xffffff);
    let light: Light;

    switch (def.type) {
      case 'ambient':
        light = new THREE.AmbientLight(color, def.intensity ?? 1);
        break;
      case 'directional': {
        const dl = new THREE.DirectionalLight(color, def.intensity ?? 1);
        if (def.position) dl.position.set(...def.position);
        if (def.target) dl.target.position.set(...def.target);
        if (def.castShadow) {
          dl.castShadow = true;
          const size = def.shadowSize ?? 1024;
          dl.shadow.mapSize.set(size, size);
        }
        light = dl;
        break;
      }
      case 'point': {
        const pl = new THREE.PointLight(color, def.intensity ?? 1);
        if (def.position) pl.position.set(...def.position);
        light = pl;
        break;
      }
      case 'spot': {
        const sl = new THREE.SpotLight(color, def.intensity ?? 1);
        if (def.position) sl.position.set(...def.position);
        sl.angle = def.angle ?? Math.PI / 6;
        sl.penumbra = def.penumbra ?? 0.3;
        light = sl;
        break;
      }
      case 'hemisphere':
        light = new THREE.HemisphereLight(
          color,
          new THREE.Color(def.groundColor ?? 0x444444),
          def.intensity ?? 1,
        );
        break;
      default:
        continue;
    }

    scene.add(light);
    created.push(light);
  }

  return created;
}

/**
 * Remove all lights from a scene that were created by applyLighting.
 *
 * @param scene - Three.js scene
 * @param lights - Array of lights to remove (from applyLighting return)
 */
export function removeLighting(scene: Scene, lights: Light[]): void {
  for (const light of lights) {
    scene.remove(light);
  }
}
