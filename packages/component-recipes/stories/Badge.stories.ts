import type { Meta, StoryObj } from '@storybook/html';
import { createBadge, createStatusBadge, createTechBadge } from '../src/badge';

const meta: Meta = {
  title: 'Components/Badge',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const badge = createBadge({
      label: 'Shipped',
      family: 'omniroute',
      familyAccent: 'var(--arch-500)',
    });
    return badge;
  },
};

export const StatusShipped: Story = {
  name: 'Status: Shipped',
  render: () => createStatusBadge('shipped'),
};

export const StatusBuilding: Story = {
  name: 'Status: Building',
  render: () => createStatusBadge('building'),
};

export const StatusFailed: Story = {
  name: 'Status: Failed',
  render: () => createStatusBadge('failed'),
};

export const StatusResearching: Story = {
  name: 'Status: Researching',
  render: () => createStatusBadge('researching'),
};

export const TechTypeScript: Story = {
  name: 'Tech: TypeScript',
  render: () => createTechBadge('TypeScript'),
};

export const TechRust: Story = {
  name: 'Tech: Rust',
  render: () => createTechBadge('Rust'),
};

export const TechPython: Story = {
  name: 'Tech: Python',
  render: () => createTechBadge('Python'),
};

export const AllBadges: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; align-items: center;';

    const badges = [
      createStatusBadge('shipped'),
      createStatusBadge('building'),
      createStatusBadge('failed'),
      createStatusBadge('researching'),
      createStatusBadge('deploying'),
      createTechBadge('TypeScript'),
      createTechBadge('Rust'),
      createTechBadge('Python'),
    ];

    badges.forEach(b => container.appendChild(b));
    return container;
  },
};
