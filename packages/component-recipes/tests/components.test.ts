/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest';
import { createBadge, createStatusBadge, createTechBadge } from '../src/badge';
import { createEvidenceLabel, createMetricCallout } from '../src/evidence';
import { createArtifactCard } from '../src/artifact-card';

describe('createBadge', () => {
  it('creates an element with label text', () => {
    const badge = createBadge({ label: 'Shipped' });
    expect(badge).toBeInstanceOf(HTMLElement);
    expect(badge.textContent).toContain('Shipped');
  });

  it('applies phenotype-badge class', () => {
    const badge = createBadge({ label: 'Test' });
    expect(badge.className).toContain('phenotype-badge');
  });
});

describe('createStatusBadge', () => {
  it('creates status badge', () => {
    const badge = createStatusBadge('shipped');
    expect(badge).toBeInstanceOf(HTMLElement);
    expect(badge.className).toContain('phenotype-badge');
  });
});

describe('createTechBadge', () => {
  it('creates tech badge with technology name', () => {
    const badge = createTechBadge('TypeScript');
    expect(badge.textContent).toContain('TypeScript');
  });
});

describe('createEvidenceLabel', () => {
  it('creates label element', () => {
    const label = createEvidenceLabel({ text: 'Evidence' });
    expect(label).toBeInstanceOf(HTMLElement);
    expect(label.textContent).toBeTruthy();
  });
});

describe('createMetricCallout', () => {
  it('creates metric callout with value', () => {
    const callout = createMetricCallout({ value: '99%', label: 'Uptime' });
    expect(callout).toBeInstanceOf(HTMLElement);
    expect(callout.textContent).toContain('99%');
  });
});

describe('createArtifactCard', () => {
  it('creates card element with title', () => {
    const card = createArtifactCard({
      title: 'Test Project',
      summary: 'A test project',
    });
    expect(card).toBeInstanceOf(HTMLElement);
    expect(card.textContent).toContain('Test Project');
  });

  it('applies phenotype-artifact class', () => {
    const card = createArtifactCard({
      title: 'Test',
      summary: 'Test',
    });
    expect(card.className).toContain('phenotype-artifact');
  });
});
