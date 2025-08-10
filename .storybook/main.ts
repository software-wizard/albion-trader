import type { StorybookConfig } from '@storybook/angular';
import { pathToFileURL } from 'url';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {}
  },
  core: {
    builder: '@storybook/builder-webpack5'
  },
  staticDirs: [{ from: '../src/assets', to: '/assets' }],
  webpackFinal: async (config) => {
    config.devtool = 'source-map';

    config.output = {
      ...config.output,
      devtoolModuleFilenameTemplate: (info: { absoluteResourcePath: string; }) =>
        pathToFileURL(info.absoluteResourcePath).href,
    };

    return config;
  }
};

export default config;
