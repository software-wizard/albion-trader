import type { StorybookConfig } from '@storybook/angular';
import * as path from 'path';

const config: StorybookConfig = {
  framework: '@storybook/angular',
  core: { builder: '@storybook/builder-webpack5' },
  stories: ['../src/**/*.stories.@(ts|mdx)'],
  staticDirs: [{ from: '../src/assets', to: '/assets' }],
  webpackFinal: async (cfg) => {
    cfg.devtool = 'source-map';
    cfg.optimization = { minimize: false };
    cfg.output = cfg.output || {};
    cfg.output.devtoolModuleFilenameTemplate = (info: { absoluteResourcePath: string; }) =>
      'webpack:///' + path.relative(process.cwd(), info.absoluteResourcePath).replace(/\\/g, '/');
    cfg.module = cfg.module || { rules: [] };
    cfg.module.rules = [
      ...(cfg.module.rules || []),
      { test: /\.[jt]s$/, enforce: 'pre', use: ['source-map-loader'], exclude: /node_modules/ }
    ];
    return cfg;
  },
  typescript: { check: false }
};
export default config;
