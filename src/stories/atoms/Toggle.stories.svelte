<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toggle from '../../components/atoms/Toggle.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Toggle',
		component: Toggle,
		tags: ['autodocs'],
		argTypes: {
			checked: {
				control: { type: 'boolean' }
			},
			disabled: {
				control: { type: 'boolean' }
			},
			id: {
				control: { type: 'text' }
			},
			name: {
				control: { type: 'text' }
			}
		}
	});
</script>

<Story name="Default Off" asChild args={{ checked: false }}>
	<Toggle checked={false} />
</Story>

<Story name="Default On" asChild args={{ checked: true }}>
	<Toggle checked={true} />
</Story>

<Story name="Disabled Off" asChild args={{ checked: false, disabled: true }}>
	<Toggle checked={false} disabled={true} />
</Story>

<Story name="Disabled On" asChild args={{ checked: true, disabled: true }}>
	<Toggle checked={true} disabled={true} />
</Story>
