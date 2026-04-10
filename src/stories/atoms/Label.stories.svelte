<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Label from '../../components/atoms/Label.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Label',
		component: Label,
		tags: ['autodocs'],
		argTypes: {
			for: {
				control: { type: 'text' }
			}
		}
	});
</script>

<Story name="Default" asChild>
	<Label>Form Label</Label>
</Story>

<Story name="With For" asChild args={{ for: 'email-input' }}>
	<Label for="email-input">Email Address</Label>
</Story>
