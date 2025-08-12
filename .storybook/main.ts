import type { StorybookConfig } from '@analogjs/storybook-angular';

const config: StorybookConfig = {
  framework: { name: '@analogjs/storybook-angular', options: {} },
  core: { builder: '@storybook/builder-vite' },
  stories: ['../src/app/**/*.stories.ts'],
  staticDirs: [{ from: '../src/assets', to: '/assets' }],
};
export default config;
