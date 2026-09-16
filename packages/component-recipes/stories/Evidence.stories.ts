import type { Meta, StoryObj } from '@storybook/html';
import { createEvidenceLabel, createMetricCallout, createEvidencePanel } from '../src/evidence';

const meta: Meta = {
  title: 'Components/Evidence',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const EvidenceLabel: Story = {
  render: () => createEvidenceLabel({ text: 'Engineering evidence' }),
};

export const MetricCallout: Story = {
  render: () => createMetricCallout({ value: '99.9%', label: 'Uptime' }),
};

export const MetricCalloutCount: Story = {
  name: 'Metric: Count',
  render: () => createMetricCallout({ value: '86', label: 'Tests Passing' }),
};

export const MetricCalloutSmall: Story = {
  name: 'Metric: Small',
  render: () => createMetricCallout({ value: '5', label: 'Packages' }),
};

export const EvidencePanel: Story = {
  render: () => createEvidencePanel({
    title: 'Evidence Panel',
    items: [
      { label: 'Source', value: 'phenoDesign' },
      { label: 'Date', value: '2026-09-16' },
      { label: 'Status', value: 'Complete' },
    ],
  }),
};

export const AllMetrics: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 16px; align-items: flex-start;';

    const metrics = [
      createMetricCallout({ value: '99.9%', label: 'Uptime' }),
      createMetricCallout({ value: '86', label: 'Tests' }),
      createMetricCallout({ value: '5', label: 'Packages' }),
      createMetricCallout({ value: '15', label: 'Commits' }),
    ];

    metrics.forEach(m => container.appendChild(m));
    return container;
  },
};
