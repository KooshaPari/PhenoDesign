/**
 * 3D Viewers
 *
 * Three.js GLB model viewer with orbit controls, auto-rotate, and
 * product photography lighting presets for Phenotype projects.
 *
 * @packageDocumentation
 */

export {
  createGlbViewer,
  type GlbViewerConfig,
  type GlbViewerHandle,
  type PosterConfig,
  type CameraPosition,
} from './glb-viewer.js';

export {
  LIGHTING_PRESETS,
  STUDIO_PRESET,
  DRAMATIC_PRESET,
  FLAT_PRESET,
  OUTDOOR_PRESET,
  applyLighting,
  removeLighting,
  type LightingPreset,
  type LightDefinition,
} from './lighting-presets.js';
