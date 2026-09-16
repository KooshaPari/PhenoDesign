import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-links'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.build = config.build || {};
    config.build.target = 'esnext';
    return config;
  },
};

export default config;
