<script lang="ts" module>
	export interface SelectOption {
		value: string;
		label: string;
		style?: string;
	}

	export interface SelectProps {
		value: string;
		options: SelectOption[];
		placeholder?: string;
		size?: 'default' | 'sm';
		class?: string;
		error?: boolean;
		disabled?: boolean;
		theme?: 'admin' | 'public';
		onchange?: (value: string) => void;
	}
</script>

<script lang="ts">
	/**
	 * Select — custom floating dropdown with keyboard navigation.
	 *
	 * Usage:
	 *   <Select
	 *     value={selectedFont}
	 *     options={fontOptions}
	 *     onchange={(v) => (selectedFont = v)}
	 *   />
	 *
	 * Features:
	 * - Floating fixed-position dropdown (escapes overflow containers)
	 * - Flips above trigger when insufficient space below viewport
	 * - Full keyboard navigation (arrows, enter, escape, home/end)
	 * - Admin and public theme contexts via CSS custom properties
	 * - Closes on outside click and page scroll
	 */
	import { getThemeVariant } from '../../contexts/theme.js';

	let {
		value = '',
		options = [],
		placeholder = 'Select an option',
		size = 'default',
		class: className,
		error = false,
		disabled = false,
		theme,
		onchange
	}: SelectProps = $props();

	let isOpen = $state(false);
	let triggerRef = $state<HTMLButtonElement | null>(null);
	let listRef = $state<HTMLDivElement | null>(null);
	let highlightedIndex = $state(-1);
	// Initialise off-screen to prevent flicker before position is calculated
	let dropdownPosition = $state({ top: -9999, left: -9999, minWidth: 0, showAbove: false });

	const DROPDOWN_MAX_HEIGHT = 280;
	const DROPDOWN_GAP = 8;

	const activeTheme = $derived(theme ?? getThemeVariant());

	function getThemeToken(publicToken: string, adminToken: string): string {
		return activeTheme === 'admin' ? `var(${adminToken})` : `var(${publicToken})`;
	}

	const tokens = $derived({
		text: getThemeToken('--text-primary', '--admin-text'),
		textSecondary: getThemeToken('--text-secondary', '--admin-text-secondary'),
		textMuted: getThemeToken('--text-muted', '--admin-text-muted'),
		border: getThemeToken('--card-border', '--admin-border'),
		background: getThemeToken('--card-bg', '--admin-bg'),
		backgroundElevated: getThemeToken('--card-bg', '--admin-bg-elevated'),
		inputBg: getThemeToken('--input-bg', '--admin-bg')
	});

	const selectedOption = $derived(options.find((opt) => opt.value === value));

	// Only show dropdown once position has been calculated
	const isPositioned = $derived(dropdownPosition.minWidth > 0);

	function calculateDropdownPosition() {
		if (!triggerRef) return;
		const rect = triggerRef.getBoundingClientRect();
		const viewportHeight = window.innerHeight;

		const spaceBelow = viewportHeight - rect.bottom - DROPDOWN_GAP;
		const spaceAbove = rect.top - DROPDOWN_GAP;

		// Flip above when there is more room above than below
		const showAbove = spaceBelow < DROPDOWN_MAX_HEIGHT && spaceAbove > spaceBelow;

		dropdownPosition = {
			top: showAbove ? rect.top - DROPDOWN_GAP : rect.bottom + DROPDOWN_GAP,
			left: rect.left,
			minWidth: rect.width,
			showAbove
		};
	}

	function toggleDropdown() {
		if (!isOpen) {
			// Open first, then calculate position — ensures DOM is ready
			isOpen = true;
			highlightedIndex = options.findIndex((opt) => opt.value === value);
			requestAnimationFrame(() => {
				calculateDropdownPosition();
			});
		} else {
			closeDropdown();
		}
	}

	function closeDropdown() {
		isOpen = false;
		highlightedIndex = -1;
		// Reset position so stale values don't appear on next open
		dropdownPosition = { top: -9999, left: -9999, minWidth: 0, showAbove: false };
	}

	function selectOption(option: SelectOption) {
		onchange?.(option.value);
		closeDropdown();
		triggerRef?.focus();
	}

	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault();
				if (isOpen && highlightedIndex >= 0) {
					selectOption(options[highlightedIndex]);
				} else {
					toggleDropdown();
				}
				break;

			case 'Escape':
				event.preventDefault();
				closeDropdown();
				break;

			case 'ArrowDown':
				event.preventDefault();
				if (!isOpen) {
					isOpen = true;
					highlightedIndex = options.findIndex((opt) => opt.value === value);
				} else {
					highlightedIndex = Math.min(highlightedIndex + 1, options.length - 1);
				}
				break;

			case 'ArrowUp':
				event.preventDefault();
				if (isOpen) {
					highlightedIndex = Math.max(highlightedIndex - 1, 0);
				}
				break;

			case 'Home':
				event.preventDefault();
				if (isOpen) {
					highlightedIndex = 0;
				}
				break;

			case 'End':
				event.preventDefault();
				if (isOpen) {
					highlightedIndex = options.length - 1;
				}
				break;

			case 'Tab':
				closeDropdown();
				break;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Node;
		if (triggerRef && !triggerRef.contains(target) && listRef && !listRef.contains(target)) {
			closeDropdown();
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});

	// Close on page scroll to prevent a disconnected-looking dropdown
	$effect(() => {
		if (isOpen) {
			const handleScroll = (event: Event) => {
				// Ignore scrolling within the dropdown itself
				if (listRef && listRef.contains(event.target as Node)) {
					return;
				}
				closeDropdown();
			};
			window.addEventListener('scroll', handleScroll, true);
			return () => window.removeEventListener('scroll', handleScroll, true);
		}
	});

	// Scroll highlighted option into view during keyboard navigation
	$effect(() => {
		if (isOpen && highlightedIndex >= 0 && listRef) {
			const highlightedElement = listRef.querySelector(
				`[data-index="${highlightedIndex}"]`
			) as HTMLElement;
			if (highlightedElement) {
				highlightedElement.scrollIntoView({ block: 'nearest' });
			}
		}
	});
</script>

<div
	class="select-container"
	style="
		--select-text: {tokens.text};
		--select-text-secondary: {tokens.textSecondary};
		--select-text-muted: {tokens.textMuted};
		--select-border: {tokens.border};
		--select-bg: {tokens.background};
		--select-bg-elevated: {tokens.backgroundElevated};
		--select-input-bg: {tokens.inputBg};
	"
>
	<button
		bind:this={triggerRef}
		type="button"
		class="select-trigger {size === 'sm' ? 'select-trigger-sm' : ''} {className ?? ''}"
		style="
			border: 1px solid {error ? 'var(--accent)' : tokens.border};
			color: {tokens.text};
		"
		{disabled}
		onclick={toggleDropdown}
		onkeydown={handleKeydown}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		<span
			class="select-value"
			style="{selectedOption?.style ?? ''} color: {!selectedOption ? tokens.textMuted : 'inherit'};"
		>
			{selectedOption?.label ?? placeholder}
		</span>

		<svg
			class="select-arrow"
			class:open={isOpen}
			width="12"
			height="8"
			viewBox="0 0 12 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style="color: {tokens.textSecondary};"
		>
			<path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
		</svg>
	</button>

	{#if isOpen && isPositioned}
		<div
			bind:this={listRef}
			class="select-dropdown"
			class:select-dropdown-above={dropdownPosition.showAbove}
			role="listbox"
			tabindex="-1"
			style="
				position: fixed;
				top: {dropdownPosition.top}px;
				left: {dropdownPosition.left}px;
				min-width: {dropdownPosition.minWidth}px;
				background: {tokens.background};
				border: 1px solid {tokens.border};
			"
		>
			{#each options as option, index (option.value)}
				{@const isSelected = option.value === value}
				{@const isHighlighted = index === highlightedIndex}
				<button
					type="button"
					class="select-option"
					data-index={index}
					style="
						{option.style ?? ''}
						color: {isSelected ? 'var(--accent)' : tokens.text};
						background: {isSelected
						? isHighlighted
							? 'var(--select-selected-highlighted-bg)'
							: 'var(--select-selected-bg)'
						: isHighlighted
							? tokens.backgroundElevated
							: 'transparent'};
					"
					onclick={() => selectOption(option)}
					onmouseenter={() => (highlightedIndex = index)}
					role="option"
					aria-selected={isSelected}
				>
					{option.label}

					{#if isSelected}
						<svg
							class="select-check"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="20 6 9 17 4 12" />
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.select-container {
		position: relative;
		width: fit-content;
	}

	.select-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		min-height: var(--input-height);
		padding: 0 1.25rem;
		border-radius: var(--radius-pill);
		font-size: 1rem;
		font-family: inherit;
		cursor: pointer;
		background: var(--select-input-bg);
		transition:
			border-color var(--transition-normal),
			background-color var(--transition-normal);
		text-align: left;
		white-space: nowrap;
	}

	.select-trigger-sm {
		min-height: var(--input-height-sm);
		padding: 0 1rem;
		font-size: 0.875rem;
	}

	.select-trigger:hover:not(:disabled) {
		border-color: var(--select-text-muted);
	}

	.select-trigger:focus {
		outline: none;
		border-color: var(--select-text-secondary);
	}

	.select-trigger:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.select-value {
		white-space: nowrap;
	}

	.select-arrow {
		flex-shrink: 0;
		transition: transform var(--transition-normal);
	}

	.select-arrow.open {
		transform: rotate(180deg);
	}

	.select-dropdown {
		/* Fixed positioning escapes overflow containers */
		z-index: var(--z-dropdown);
		width: max-content;
		max-height: 280px;
		overflow-y: auto;
		border-radius: var(--card-radius);
		box-shadow: var(--select-dropdown-shadow);
		/* Fade in to prevent position-calculation flicker */
		animation: selectDropdownFadeIn 0.1s ease;
	}

	@keyframes selectDropdownFadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.select-dropdown-above {
		animation: selectDropdownFadeInAbove 0.1s ease forwards;
		transform-origin: bottom;
	}

	@keyframes selectDropdownFadeInAbove {
		from {
			opacity: 0;
			transform: translateY(calc(-100% + 4px));
		}
		to {
			opacity: 1;
			transform: translateY(-100%);
		}
	}

	.select-option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		padding: 0.75rem 1.25rem;
		background: transparent;
		border: none;
		font-size: 0.9375rem;
		font-family: inherit;
		cursor: pointer;
		text-align: left;
		white-space: nowrap;
		transition: background-color var(--transition-fast);
	}

	.select-option:first-child {
		border-radius: calc(var(--card-radius) - 1px) calc(var(--card-radius) - 1px) 0 0;
	}

	.select-option:last-child {
		border-radius: 0 0 calc(var(--card-radius) - 1px) calc(var(--card-radius) - 1px);
	}

	.select-option:only-child {
		border-radius: calc(var(--card-radius) - 1px);
	}

	.select-check {
		flex-shrink: 0;
		color: var(--accent);
	}

	.select-dropdown::-webkit-scrollbar {
		width: 6px;
	}

	.select-dropdown::-webkit-scrollbar-track {
		background: transparent;
	}

	.select-dropdown::-webkit-scrollbar-thumb {
		background: var(--select-border);
		border-radius: 3px;
	}

	.select-dropdown::-webkit-scrollbar-thumb:hover {
		background: var(--select-text-muted);
	}

	/* Light mode: neumorphic inset shadow on trigger for tactile feel */
	:global([data-colour-mode='light']) .select-trigger {
		box-shadow: var(--input-shadow);
	}
</style>
