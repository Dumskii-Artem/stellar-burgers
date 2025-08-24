import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@api': path.resolve(__dirname, '../src/utils/burger-api.ts'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@store': path.resolve(__dirname, '../src/services/store.ts'),
        '@ui': path.resolve(__dirname, '../src/components/ui'),
      };
    }
    return config;
  }
};
export default config;
