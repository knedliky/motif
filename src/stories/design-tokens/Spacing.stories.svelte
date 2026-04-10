<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SpacingBlock from './_components/SpacingBlock.svelte';

	const { Story } = defineMeta({
		title: 'Design Tokens/Spacing'
	});
</script>

<Story name="Scale">
	<div class="spacing-list">
		<SpacingBlock tokenName="--space-1" value="4px" />
		<SpacingBlock tokenName="--space-2" value="8px" />
		<SpacingBlock tokenName="--space-3" value="12px" />
		<SpacingBlock tokenName="--space-4" value="16px" />
		<SpacingBlock tokenName="--space-5" value="24px" />
		<SpacingBlock tokenName="--space-6" value="32px" />
		<SpacingBlock tokenName="--space-7" value="48px" />
		<SpacingBlock tokenName="--space-8" value="64px" />
		<SpacingBlock tokenName="--space-9" value="96px" />
		<SpacingBlock tokenName="--space-10" value="128px" />
	</div>
</Story>

<style>
	.spacing-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
		max-width: 600px;
	}
</style>
