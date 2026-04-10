<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	export interface LabelProps extends HTMLLabelAttributes {
		class?: string;
		children: Snippet;
	}
</script>

<script lang="ts">
	/**
	 * Label — form field label with peer-disabled support.
	 *
	 * Usage:
	 *   <Label for="email">Email address</Label>
	 *
	 * Features:
	 * - 0.875rem semi-bold text at line-height 1
	 * - Visually dims when a peer input is disabled
	 * - Passes all HTML label attributes to the element
	 */
	let { class: className, children, ...rest }: LabelProps = $props();
</script>

<label class="label {className ?? ''}" {...rest}>
	{@render children()}
</label>

<style>
	.label {
		font-size: 0.875rem;
		line-height: 1;
		font-weight: 500;
		color: var(--text-primary);
	}

	/* Dim when the associated peer input is disabled */
	:global(.peer:disabled) ~ .label {
		cursor: not-allowed;
		opacity: 0.7;
	}
</style>
