// Mock for SvelteKit's $env/dynamic/public module.
// Storybook does not have access to the SvelteKit runtime, so this empty
// object satisfies any component that reads public environment variables
// at runtime without throwing a module-not-found error.
export const env = {};
