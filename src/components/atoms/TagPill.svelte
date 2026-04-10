<script lang="ts" module>
	export type TagPillColour =
		| 'default'
		| 'agents'
		| 'workflows'
		| 'synthesis'
		| 'data'
		| 'design'
		| 'infra';

	export interface TagPillProps {
		label: string;
		size?: 'sm' | 'md';
		colour?: TagPillColour;
		class?: string;
	}
</script>

<script lang="ts">
	/**
	 * TagPill — compact category label with accent or category-colour styling.
	 *
	 * Usage:
	 *   <TagPill label="Technology" />
	 *   <TagPill label="Agents" colour="agents" />
	 *   <TagPill label="Design" colour="design" size="sm" />
	 *
	 * Features:
	 * - Rectangular corners to distinguish from pill buttons
	 * - Default variant uses accent-red tint with semi-transparent border
	 * - Category colour variants map to --category-* design tokens
	 * - Uppercase text with letter-spacing
	 * - fit-content width wraps text exactly
	 */

	let { label, size = 'md', colour = 'default', class: className = '' }: TagPillProps = $props();
</script>

<span
	class="tag-pill tag-pill-{size} {className}"
	data-colour={colour !== 'default' ? colour : undefined}
>
	{label}
</span>

<style>
	.tag-pill {
		display: inline-block;
		width: fit-content;
		color: var(--accent);
		font-weight: 400;
		text-transform: uppercase;
		background: var(--accent-bg);
		border: 1px solid var(--accent-border);
		border-radius: 0;
	}

	/* Category colour variants — text uses the category token,
	   background and border use the same colour at reduced opacity */
	.tag-pill[data-colour='agents'] {
		color: var(--category-agents);
		background: oklch(from var(--category-agents) l c h / 0.1);
		border-color: oklch(from var(--category-agents) l c h / 0.3);
	}

	.tag-pill[data-colour='workflows'] {
		color: var(--category-workflows);
		background: oklch(from var(--category-workflows) l c h / 0.1);
		border-color: oklch(from var(--category-workflows) l c h / 0.3);
	}

	.tag-pill[data-colour='synthesis'] {
		color: var(--category-synthesis);
		background: oklch(from var(--category-synthesis) l c h / 0.1);
		border-color: oklch(from var(--category-synthesis) l c h / 0.3);
	}

	.tag-pill[data-colour='data'] {
		color: var(--category-data);
		background: oklch(from var(--category-data) l c h / 0.1);
		border-color: oklch(from var(--category-data) l c h / 0.3);
	}

	.tag-pill[data-colour='design'] {
		color: var(--category-design);
		background: oklch(from var(--category-design) l c h / 0.1);
		border-color: oklch(from var(--category-design) l c h / 0.3);
	}

	.tag-pill[data-colour='infra'] {
		color: var(--category-infra);
		background: oklch(from var(--category-infra) l c h / 0.1);
		border-color: oklch(from var(--category-infra) l c h / 0.3);
	}

	.tag-pill-md {
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		padding: var(--space-1) var(--space-2);
	}

	.tag-pill-sm {
		font-size: 0.625rem;
		letter-spacing: 0.04em;
		padding: 2px 6px;
	}
</style>
