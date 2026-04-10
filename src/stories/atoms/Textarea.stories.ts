import type { Meta, StoryObj } from '@storybook/svelte';
import Textarea from '../../components/atoms/Textarea.svelte';

const meta = {
	title: 'Atoms/Textarea',
	component: Textarea,
	tags: ['autodocs'],
	argTypes: {
		theme: {
			control: { type: 'select' },
			options: ['public', 'admin']
		},
		disabled: {
			control: { type: 'boolean' }
		},
		placeholder: {
			control: { type: 'text' }
		},
		value: {
			control: { type: 'text' }
		},
		rows: {
			control: { type: 'number' }
		}
	}
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: 'Enter your message...', theme: 'public' }
};

export const WithValue: Story = {
	args: {
		value:
			'This is some pre-filled content that demonstrates how the textarea looks with text inside it.',
		theme: 'public'
	}
};

export const Disabled: Story = {
	args: { value: 'Cannot edit this content', disabled: true, theme: 'public' }
};

export const AdminTheme: Story = {
	args: { placeholder: 'Admin notes...', theme: 'admin' }
};
