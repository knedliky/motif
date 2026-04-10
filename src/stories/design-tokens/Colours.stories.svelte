<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ColourSwatch from './_components/ColourSwatch.svelte';

	const { Story } = defineMeta({
		title: 'Design Tokens/Colours'
	});
</script>

<Story name="Brand Colours">
	<div class="grid">
		<ColourSwatch tokenName="--fire-engine-red" label="Fire Engine Red" />
		<ColourSwatch tokenName="--burnt-sunset" label="Burnt Sunset" />
		<ColourSwatch tokenName="--aubergine" label="Aubergine" />
		<ColourSwatch tokenName="--sky-blue" label="Sky Blue" />
		<ColourSwatch tokenName="--blush-pink" label="Blush Pink" />
		<ColourSwatch tokenName="--powder-sand" label="Powder Sand" />
		<ColourSwatch tokenName="--olive-green" label="Olive Green" />
		<ColourSwatch tokenName="--navy-royal" label="Navy Royal" />
		<ColourSwatch tokenName="--amber" label="Amber" />
		<ColourSwatch tokenName="--charcoal-ember" label="Charcoal Ember" />
	</div>
</Story>

<Story name="Semantic Colours">
	<div class="grid">
		<ColourSwatch tokenName="--bg-primary" label="Background Primary" />
		<ColourSwatch tokenName="--bg-glass" label="Background Glass" />
		<ColourSwatch tokenName="--bg-glass-solid" label="Background Glass Solid" />
		<ColourSwatch tokenName="--text-primary" label="Text Primary" />
		<ColourSwatch tokenName="--text-secondary" label="Text Secondary" />
		<ColourSwatch tokenName="--text-muted" label="Text Muted" />
		<ColourSwatch tokenName="--accent" label="Accent" />
		<ColourSwatch tokenName="--accent-hover" label="Accent Hover" />
		<ColourSwatch tokenName="--card-bg" label="Card Background" />
		<ColourSwatch tokenName="--card-border" label="Card Border" />
	</div>
</Story>

<Story name="Admin Colours">
	<div class="grid">
		<ColourSwatch tokenName="--admin-bg" label="Admin Background" />
		<ColourSwatch tokenName="--admin-bg-elevated" label="Admin Elevated" />
		<ColourSwatch tokenName="--admin-border" label="Admin Border" />
		<ColourSwatch tokenName="--admin-text" label="Admin Text" />
		<ColourSwatch tokenName="--admin-text-secondary" label="Admin Text Secondary" />
		<ColourSwatch tokenName="--admin-text-muted" label="Admin Text Muted" />
	</div>
</Story>

<Story name="SVG/Hex Colours">
	<div class="grid">
		<ColourSwatch tokenName="--hex-red" label="Hex Red" />
		<ColourSwatch tokenName="--hex-sunset" label="Hex Sunset" />
		<ColourSwatch tokenName="--hex-aubergine" label="Hex Aubergine" />
		<ColourSwatch tokenName="--hex-sky" label="Hex Sky" />
		<ColourSwatch tokenName="--hex-blush" label="Hex Blush" />
		<ColourSwatch tokenName="--hex-sand" label="Hex Sand" />
		<ColourSwatch tokenName="--hex-olive" label="Hex Olive" />
		<ColourSwatch tokenName="--hex-navy" label="Hex Navy" />
		<ColourSwatch tokenName="--hex-amber" label="Hex Amber" />
		<ColourSwatch tokenName="--hex-dark" label="Hex Dark" />
		<ColourSwatch tokenName="--hex-light" label="Hex Light" />
	</div>
</Story>

<Story name="State Colours">
	<div class="grid">
		<ColourSwatch tokenName="--colour-success" label="Success" />
		<ColourSwatch tokenName="--colour-warning" label="Warning" />
		<ColourSwatch tokenName="--colour-error" label="Error" />
		<ColourSwatch tokenName="--colour-info" label="Info" />
		<ColourSwatch tokenName="--colour-success-bg" label="Success BG" />
		<ColourSwatch tokenName="--colour-warning-bg" label="Warning BG" />
		<ColourSwatch tokenName="--colour-error-bg" label="Error BG" />
		<ColourSwatch tokenName="--colour-info-bg" label="Info BG" />
	</div>
</Story>

<Story name="Chart Series">
	<div class="grid">
		<ColourSwatch tokenName="--chart-series-1" label="Series 1" />
		<ColourSwatch tokenName="--chart-series-2" label="Series 2" />
		<ColourSwatch tokenName="--chart-series-3" label="Series 3" />
		<ColourSwatch tokenName="--chart-series-4" label="Series 4" />
		<ColourSwatch tokenName="--chart-series-5" label="Series 5" />
		<ColourSwatch tokenName="--chart-axis-colour" label="Chart Axis" />
		<ColourSwatch tokenName="--chart-grid-colour" label="Chart Grid" />
	</div>
</Story>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 16px;
		padding: 16px;
	}
</style>
