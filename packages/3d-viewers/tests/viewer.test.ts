import { describe, it, expect } from 'vitest';

describe('3d-viewers package', () => {
  it('exports createGlbViewer', async () => {
    const mod = await import('../src/index');
    expect(typeof mod.createGlbViewer).toBe('function');
  });

  it('exports lighting presets', async () => {
    const mod = await import('../src/index');
    expect(mod.LIGHTING_PRESETS).toBeDefined();
    expect(mod.STUDIO_PRESET).toBeDefined();
    expect(mod.DRAMATIC_PRESET).toBeDefined();
  });

  it('exports lighting functions', async () => {
    const mod = await import('../src/index');
    expect(typeof mod.applyLighting).toBe('function');
    expect(typeof mod.removeLighting).toBe('function');
  });
});
