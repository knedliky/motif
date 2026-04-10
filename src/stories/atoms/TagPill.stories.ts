import type { Meta, StoryObj } from '@storybook/svelte';
import TagPill from '../../components/atoms/TagPill.svelte';

const meta = {
	title: 'Atoms/TagPill',
	component: TagPill,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: { type: 'text' }
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md']
		}
	}
} satisfies Meta<typeof TagPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: 'Category', size: 'md' }
};

export const Small: Story = {
	args: { label: 'Tag', size: 'sm' }
};
