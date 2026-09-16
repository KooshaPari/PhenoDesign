import type { Preview } from '@storybook/html';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#090a0c' },
        { name: 'light', value: '#f8f9fa' },
        { name: 'card', value: '#1c2128' },
      ],
    },
  },
};

export default preview;
