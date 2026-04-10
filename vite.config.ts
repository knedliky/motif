import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

// Build configuration for the Motif design library.
// Produces an ES module output with each component individually importable,
// so consumers can import specific atoms without pulling in the entire library.
export default defineConfig({
	// Tailwind 4 is added via the official Vite plugin — no separate config file required.
	// The svelte plugin handles Svelte component compilation as before.
	// dts() generates TypeScript declaration files alongside the JS output so that
	// the exports["."].types field in package.json resolves correctly for consumers.
	plugins: [tailwindcss(), svelte(), dts({ insertTypesEntry: true })],

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
