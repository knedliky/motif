import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in an ES module context, since it is not available natively.
// This is required so that join(__dirname, ...) works correctly for alias paths.
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  // Story files are co-located with components under src/, using either
  // the native Svelte CSF format (.stories.svelte) or the standard
  // JS/TS CSF format (.stories.ts / .stories.js)
  stories: ['../src/**/*.stories.@(js|ts|svelte)'],

  // Addons bundled with this setup:
  // - addon-svelte-csf: enables native Svelte story format (.stories.svelte)
  // Note: In Storybook 10, essentials (controls, actions, viewport, backgrounds,
  // docs, toolbars) are bundled into the core — no separate addon-essentials needed.
  addons: [
    '@storybook/addon-svelte-csf',
  ],

  // Svelte + Vite framework — matches the project's existing build toolchain
  framework: {
    name: '@storybook/svelte-vite',
    options: {},
  },

  // Vite configuration override: add a module alias so that any component
  // importing $env/dynamic/public is redirected to the mock module.
  // This prevents Storybook from failing when it cannot resolve SvelteKit
  // virtual modules that are only available inside the SvelteKit runtime.
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '$env/dynamic/public': join(__dirname, 'mocks/env-dynamic-public.js'),
    };
    return config;
  },
};
