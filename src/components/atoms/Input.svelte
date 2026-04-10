<script lang="ts" module>
	import type { ThemeVariant } from '../../contexts/theme.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface InputProps extends Omit<HTMLInputAttributes, 'size'> {
		theme?: ThemeVariant;
		size?: 'default' | 'sm';
		class?: string;
		value?: string | number;
	}
</script>

<script lang="ts">
	/**
	 * Input — text input field with theme and size support.
	 *
	 * Usage:
	 *   <Input bind:value={name} placeholder="Your name" />
	 *   <Input type="email" size="sm" theme="admin" />
	 *
	 * Features:
	 * - Two sizes: default (h-12) and sm (h-10)
	 * - Automatic theme detection from context (public/admin)
	 * - Public theme: glassmorphic background with card border
	 * - Admin theme: transparent background with admin border
	 * - Design-token-first CSS with data-attribute selectors
	 */
	import { getThemeVariant } from '../../contexts/theme.js';

	let {
		theme,
		size = 'default',
		class: className,
		value = $bindable(),
		...rest
	}: InputProps = $props();

	const activeTheme = $derived(theme ?? getThemeVariant());
</script>

<input
	class="input {className ?? ''}"
	data-theme={activeTheme}
	data-size={size}
	bind:value
	{...rest}
/>

<style>
	/* shared input styling */
	.input {
		display: flex;
		width: 100%;
		font-size: 1rem;
		transition: border-color var(--transition-normal);
		border-radius: var(--card-radius);
	}

	.input:focus {
		outline: none;
	}

	.input:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	/* file input resets */
	.input::file-selector-button {
		border: 0;
		background: transparent;
		font-size: 0.875rem;
		font-weight: 500;
	}

	/* Sizes */

	.input[data-size='default'] {
		height: var(--input-height);
		padding: 0.75rem 1.25rem;
	}

	.input[data-size='sm'] {
		height: var(--input-height-sm);
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
	}

	/* Public theme */

	.input[data-theme='public'] {
		border: 1px solid var(--card-border);
		background: var(--input-bg);
		color: var(--text-primary);
		box-shadow: var(--input-shadow);
	}

	.input[data-theme='public']::placeholder {
		color: var(--text-muted);
	}

	.input[data-theme='public']:focus {
		border-color: var(--card-border-hover);
	}

	/* Admin theme */

	.input[data-theme='admin'] {
		border: 1px solid var(--admin-border);
		background: transparent;
		color: var(--admin-text);
	}

	.input[data-theme='admin']::placeholder {
		color: var(--admin-text-muted);
	}

	.input[data-theme='admin']:focus {
		border-color: var(--admin-text-muted);
	}
</style>
