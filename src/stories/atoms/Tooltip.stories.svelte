<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from '../../components/atoms/Tooltip.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: { type: 'text' }
			},
			position: {
				control: { type: 'select' },
				options: ['top', 'bottom', 'left', 'right']
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'admin']
			}
		},
		parameters: {
			layout: 'centered'
		}
	});
</script>

<Story name="Default" asChild args={{ text: 'This is a tooltip', position: 'top' }}>
	<Tooltip text="This is a tooltip" position="top">
		<span>Hover me</span>
	</Tooltip>
</Story>

<Story name="Bottom" asChild args={{ text: 'Tooltip below', position: 'bottom' }}>
	<Tooltip text="Tooltip below" position="bottom">
		<span>Hover me</span>
	</Tooltip>
</Story>

<Story name="Left" asChild args={{ text: 'Tooltip left', position: 'left' }}>
	<Tooltip text="Tooltip left" position="left">
		<span>Hover me</span>
	</Tooltip>
</Story>

<Story name="Right" asChild args={{ text: 'Tooltip right', position: 'right' }}>
	<Tooltip text="Tooltip right" position="right">
		<span>Hover me</span>
	</Tooltip>
</Story>

<Story name="Admin" asChild args={{ text: 'Admin tooltip', position: 'top', variant: 'admin' }}>
	<Tooltip text="Admin tooltip" position="top" variant="admin">
		<span>Hover me</span>
	</Tooltip>
</Story>
