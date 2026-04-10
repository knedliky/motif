<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../../components/atoms/Button.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'secondary', 'outline', 'ghost', 'link']
			},
			size: {
				control: { type: 'select' },
				options: ['default', 'sm', 'lg', 'icon']
			},
			theme: {
				control: { type: 'select' },
				options: ['public', 'admin']
			},
			disabled: {
				control: { type: 'boolean' }
			}
		}
	});
</script>

<Story name="Default" asChild args={{ variant: 'default', size: 'default', theme: 'public' }}>
	<Button variant="default" size="default" theme="public">Button</Button>
</Story>

<Story name="Secondary" asChild args={{ variant: 'secondary', size: 'default', theme: 'public' }}>
	<Button variant="secondary" size="default" theme="public">Button</Button>
</Story>

<Story name="Outline" asChild args={{ variant: 'outline', size: 'default', theme: 'public' }}>
	<Button variant="outline" size="default" theme="public">Button</Button>
</Story>

<Story name="Ghost" asChild args={{ variant: 'ghost', size: 'default', theme: 'public' }}>
	<Button variant="ghost" size="default" theme="public">Button</Button>
</Story>

<Story name="Link" asChild args={{ variant: 'link', size: 'default', theme: 'public' }}>
	<Button variant="link" size="default" theme="public">Button</Button>
</Story>

<Story name="Small" asChild args={{ variant: 'default', size: 'sm', theme: 'public' }}>
	<Button variant="default" size="sm" theme="public">Small Button</Button>
</Story>

<Story name="Large" asChild args={{ variant: 'default', size: 'lg', theme: 'public' }}>
	<Button variant="default" size="lg" theme="public">Large Button</Button>
</Story>

<Story name="Icon" asChild args={{ variant: 'default', size: 'icon', theme: 'public' }}>
	<Button variant="default" size="icon" theme="public">&#9733;</Button>
</Story>

<Story
	name="Disabled"
	asChild
	args={{ variant: 'default', size: 'default', theme: 'public', disabled: true }}
>
	<Button variant="default" size="default" theme="public" disabled>Button</Button>
</Story>

<Story name="Admin Default" asChild args={{ variant: 'default', size: 'default', theme: 'admin' }}>
	<Button variant="default" size="default" theme="admin">Button</Button>
</Story>

<Story
	name="Admin Secondary"
	asChild
	args={{ variant: 'secondary', size: 'default', theme: 'admin' }}
>
	<Button variant="secondary" size="default" theme="admin">Button</Button>
</Story>
