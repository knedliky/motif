import type { Meta, StoryObj } from '@storybook/svelte';
import Input from '../../components/atoms/Input.svelte';

const meta = {
	title: 'Atoms/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		theme: {
			control: { type: 'select' },
			options: ['public', 'admin']
		},
		size: {
			control: { type: 'select' },
			options: ['default', 'sm']
		},
		disabled: {
			control: { type: 'boolean' }
		},
		placeholder: {
			control: { type: 'text' }
		},
		value: {
			control: { type: 'text' }
		}
	}
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: 'Enter text...', theme: 'public' }
};

export const WithValue: Story = {
	args: { value: 'Hello World', theme: 'public' }
};

export const Placeholder: Story = {
	args: { placeholder: 'Search components...', theme: 'public' }
};

export const Small: Story = {
	args: { placeholder: 'Small input', size: 'sm', theme: 'public' }
};

export const Disabled: Story = {
	args: { value: 'Cannot edit', disabled: true, theme: 'public' }
};

export const AdminTheme: Story = {
	args: { placeholder: 'Admin input', theme: 'admin' }
};
