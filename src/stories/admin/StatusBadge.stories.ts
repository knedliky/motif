import type { Meta, StoryObj } from '@storybook/svelte';
import StatusBadge from '../../components/admin/StatusBadge.svelte';

// Inline mock config — no dependency on motivka's config.ts or PocketBase enums.
// Provides a representative set of status values covering all five colour variants.
const postStatusConfig = {
	draft: { label: 'Draft', colour: 'neutral' },
	review: { label: 'In Review', colour: 'warning' },
	published: { label: 'Published', colour: 'success' },
	archived: { label: 'Archived', colour: 'info' },
	rejected: { label: 'Rejected', colour: 'error' }
} as const;

const meta = {
	title: 'Admin/Atoms/StatusBadge',
	component: StatusBadge,
	tags: ['autodocs'],
	argTypes: {
		status: {
			control: { type: 'select' },
			options: ['draft', 'review', 'published', 'archived', 'rejected']
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md']
		}
	},
	// Config is shared across all stories — override per-story only when needed
	args: {
		config: postStatusConfig
	}
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: { status: 'published', size: 'sm' }
};

export const Warning: Story = {
	args: { status: 'review', size: 'sm' }
};

export const Error: Story = {
	args: { status: 'rejected', size: 'sm' }
};

export const Info: Story = {
	args: { status: 'archived', size: 'sm' }
};

export const Neutral: Story = {
	args: { status: 'draft', size: 'sm' }
};

export const MediumSize: Story = {
	args: { status: 'published', size: 'md' }
};
