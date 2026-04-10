import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Build configuration for the Motif design library.
// Produces an ES module output with each component individually importable,
// so consumers can import specific atoms without pulling in the entire library.
export default defineConfig({
	plugins: [svelte()],

	build: {
		lib: {
			// Entry point that re-exports all public components and tokens
			entry: 'src/index.ts',
			name: 'MotifDesign',
			// Produce ES module format only — tree-shakeable and compatible
			// with modern SvelteKit consumers
			formats: ['es'],
		},

		rollupOptions: {
			// Exclude Svelte itself from the bundle — consumers supply their own
			// version, preventing duplicate Svelte instances at runtime
			external: ['svelte', /^svelte\//],

			output: {
				// Preserve the original module structure so each component
				// file remains individually importable (e.g. @motif/design/Button)
				preserveModules: true,
			},
		},
	},
});
