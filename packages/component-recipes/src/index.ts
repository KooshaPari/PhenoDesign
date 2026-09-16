/**
 * Component Recipes
 *
 * Reusable, parameterized visual component recipes for Phenotype projects.
 * Each factory function returns DOM elements ready to append.
 *
 * @packageDocumentation
 */

export {
  createArtifactCard,
  createArtifactSequence,
  type ArtifactCardConfig,
  type ArtifactType,
  type ArtifactAnnotation,
  type ArtifactMetric,
  type ArtifactMedia,
} from './artifact-card.js';

export {
  renderDiagram,
  validateDiagram,
  type DiagramDefinition,
  type DiagramNode,
  type DiagramEdge,
  type DiagramOptions,
} from './system-diagram.js';

export {
  createExperimentSheet,
  createExperimentSheetFromString,
  type ExperimentSheetConfig,
  type ExperimentRow,
} from './experiment-sheet.js';

export {
  createPhysicalPlate,
  type PhysicalPlateConfig,
} from './physical-plate.js';

export {
  createEvidenceLabel,
  createMetricCallout,
  createEvidencePanel,
  createLensAnnotation,
  type EvidenceLabelConfig,
  type MetricCalloutConfig,
  type EvidencePanelConfig,
} from './evidence.js';

export {
  createBadge,
  createStatusBadge,
  createTechBadge,
  type BadgeConfig,
  type BadgeVariant,
} from './badge.js';
