import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} */
const config = {
	// Use vitePreprocess to handle TypeScript, PostCSS, and other preprocessors
	// inside Svelte component <script> and <style> blocks
	preprocess: vitePreprocess(),
};

export default config;
