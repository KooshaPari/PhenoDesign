import { keycap } from './keycap.js'
import { glass } from './glass.js'
import { typography } from './typography.js'
import { MATERIALS } from './materials.js'
import { POLYGONS } from './polygons.js'
import { NEUMORPHISM } from './neumorphism.js'

export { keycap, type KeycapTokens } from './keycap.js'
export { glass, type GlassTokens } from './glass.js'
export { typography, type TypographyTokens } from './typography.js'
export { MATERIALS, type Materials } from './materials.js'
export { POLYGONS, type PolygonLayer, type PolygonPreset, type Polygons } from './polygons.js'
export { NEUMORPHISM, type Neumorphism } from './neumorphism.js'

export const designTokens = {
  keycap,
  glass,
  typography,
  materials: MATERIALS,
  polygons: POLYGONS,
  neumorphism: NEUMORPHISM,
} as const

export type DesignTokens = typeof designTokens
