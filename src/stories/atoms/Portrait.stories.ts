import type { Meta, StoryObj } from '@storybook/svelte';
import Portrait from '../../components/atoms/Portrait.svelte';

const meta = {
	title: 'Atoms/Portrait',
	component: Portrait,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['avatar', 'circle', 'portrait']
		},
		src: {
			control: { type: 'text' }
		},
		alt: {
			control: { type: 'text' }
		},
		initials: {
			control: { type: 'text' }
		},
		interactive: {
			control: { type: 'boolean' }
		}
	}
} satisfies Meta<typeof Portrait>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Avatar: Story = {
	args: {
		size: 'avatar',
		src: 'https://i.pravatar.cc/96',
		alt: 'User avatar'
	}
};

export const AvatarInitials: Story = {
	args: { size: 'avatar', initials: 'SM', alt: 'Sam Mitchell' }
};

export const Circle: Story = {
	args: {
		size: 'circle',
		src: 'https://i.pravatar.cc/480',
		alt: 'Profile photo'
	}
};

export const CircleInitials: Story = {
	args: { size: 'circle', initials: 'JD', alt: 'John Doe' }
};

export const PortraitSize: Story = {
	args: {
		size: 'portrait',
		src: 'https://i.pravatar.cc/600',
		alt: 'Portrait photo'
	}
};

export const PortraitInitials: Story = {
	args: { size: 'portrait', initials: 'AK', alt: 'Alex Kim' }
};

export const Interactive: Story = {
	args: {
		size: 'avatar',
		src: 'https://i.pravatar.cc/96?u=interactive',
		alt: 'Interactive avatar',
		interactive: true
	}
};
