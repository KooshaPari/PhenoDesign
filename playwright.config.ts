import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  outputDir: './tests/visual/results',
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  use: {
    baseURL: 'file://',
    screenshot: 'only-on-failure',
    trace: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
