import type { Meta, StoryObj } from '@storybook/html';
import { createArtifactCard } from '../src/artifact-card';

const meta: Meta = {
  title: 'Components/ArtifactCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => createArtifactCard({
    title: 'Omniroute',
    summary: 'AI model routing proxy with 40+ providers',
    type: 'app',
    family: 'omniroute',
    status: 'shipped',
  }),
};

export const Library: Story = {
  render: () => createArtifactCard({
    title: 'phenoDesign',
    summary: 'Shared design system for Phenotype projects',
    type: 'library',
    family: 'phenotype',
    status: 'building',
  }),
};

export const Agent: Story = {
  render: () => createArtifactCard({
    title: 'ForgeCode',
    summary: 'Autonomous coding agent framework',
    type: 'agent',
    family: 'forge',
    status: 'shipped',
  }),
};

export const Research: Story = {
  render: () => createArtifactCard({
    title: 'Agentora',
    summary: 'Hexagonal architecture framework for AI agents',
    type: 'research_otheranalysis',
    family: 'phenotype',
    status: 'researching',
  }),
};

export const WithMetrics: Story = {
  name: 'With Metrics',
  render: () => createArtifactCard({
    title: 'koosha-phenotype',
    summary: 'Personal portfolio site',
    type: 'app',
    family: 'phenotype',
    status: 'shipped',
    metrics: [
      { label: 'Stars', value: '42' },
      { label: 'Forks', value: '7' },
    ],
  }),
};

export const AllTypes: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;';

    const types = [
      { type: 'app', title: 'App', summary: 'Application project' },
      { type: 'library', title: 'Library', summary: 'Reusable library' },
      { type: 'agent', title: 'Agent', summary: 'AI agent' },
      { type: 'dataset', title: 'Dataset', summary: 'Data collection' },
      { type: 'infra', title: 'Infrastructure', summary: 'Infrastructure tool' },
      { type: 'research_otheranalysis', title: 'Research', summary: 'Research project' },
    ] as const;

    types.forEach(({ type, title, summary }) => {
      container.appendChild(createArtifactCard({
        title,
        summary,
        type,
        family: 'phenotype',
        status: 'shipped',
      }));
    });

    return container;
  },
};
