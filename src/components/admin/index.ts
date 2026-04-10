/**
 * Admin-specific Atomic UI Components
 *
 * Status badges and confirmation modals used exclusively in admin contexts.
 * All components reference --admin-* CSS custom properties defined in the
 * admin token layer (tokens/admin.css).
 */

export { default as StatusBadge } from './StatusBadge.svelte';
export type { StatusBadgeProps, StatusConfig } from './StatusBadge.svelte';

export { default as BulkActionModal } from './BulkActionModal.svelte';
export type { BulkActionModalProps } from './BulkActionModal.svelte';

export { default as DeleteConfirmModal } from './DeleteConfirmModal.svelte';
export type { DeleteConfirmModalProps } from './DeleteConfirmModal.svelte';
