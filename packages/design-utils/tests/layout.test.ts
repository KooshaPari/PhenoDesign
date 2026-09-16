import { describe, it, expect } from 'vitest';
import {
  breakpoints,
  minWidth,
  maxWidth,
  mediaRange,
  containerMinWidth,
  containerMaxWidth,
  gridCols,
  grid,
  fluidGrid,
  measure,
} from '../src/layout';

describe('breakpoints', () => {
  it('has 5 breakpoints', () => {
    expect(Object.keys(breakpoints)).toHaveLength(5);
  });
  it('sm starts at 640px', () => {
    expect(breakpoints.sm.px).toBe(640);
    expect(breakpoints.sm.minWidth).toBe('640px');
  });
  it('xl starts at 1280px', () => {
    expect(breakpoints.xl.px).toBe(1280);
  });
});

describe('minWidth', () => {
  it('passes string breakpoint name through', () => {
    expect(minWidth('md')).toBe('@media (min-width: md)');
  });
  it('generates media query from number', () => {
    expect(minWidth(1024)).toBe('@media (min-width: 1024px)');
  });
});

describe('maxWidth', () => {
  it('passes string breakpoint name through', () => {
    expect(maxWidth('lg')).toBe('@media (max-width: lg)');
  });
  it('generates from number', () => {
    expect(maxWidth(768)).toBe('@media (max-width: 768px)');
  });
});

describe('mediaRange', () => {
  it('generates range with string names', () => {
    const result = mediaRange('md', 'xl');
    expect(result).toContain('min-width: md');
    expect(result).toContain('max-width: xl');
  });
  it('generates range with numbers', () => {
    const result = mediaRange(768, 1280);
    expect(result).toContain('min-width: 768px');
    expect(result).toContain('max-width: 1280px');
  });
});

describe('container queries', () => {
  it('containerMinWidth generates correct query', () => {
    expect(containerMinWidth(400)).toBe('@container (min-width: 400px)');
  });
  it('containerMaxWidth generates correct query', () => {
    expect(containerMaxWidth(600)).toBe('@container (max-width: 600px)');
  });
});

describe('grid utilities', () => {
  it('gridCols returns repeat expression', () => {
    expect(gridCols(3)).toBe('repeat(3, 1fr)');
  });
  it('grid returns config object', () => {
    const config = grid(4, '2rem', '1200px');
    expect(config.columns).toBe('repeat(4, 1fr)');
    expect(config.gap).toBe('2rem');
    expect(config.maxWidth).toBe('1200px');
  });
  it('fluidGrid returns auto-fill expression', () => {
    const result = fluidGrid('300px');
    expect(result).toContain('auto-fill');
    expect(result).toContain('300px');
  });
});

describe('measure', () => {
  it('returns default 68ch', () => {
    expect(measure()).toBe('68ch');
  });
  it('accepts custom ch value', () => {
    expect(measure(50)).toBe('50ch');
  });
});
