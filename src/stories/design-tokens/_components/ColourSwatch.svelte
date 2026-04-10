<script lang="ts">
	let { tokenName, label }: { tokenName: string; label?: string } = $props();

	let copied = $state(false);
	let computedValue = $state('');

	$effect(() => {
		const root = document.documentElement;
		const value = getComputedStyle(root).getPropertyValue(tokenName).trim();
		computedValue = value;
	});

	async function copyToken() {
		await navigator.clipboard.writeText(`var(${tokenName})`);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

<button class="swatch-container" onclick={copyToken} title="Click to copy var({tokenName})">
	<div class="swatch" style="background-color: var({tokenName})"></div>
	<div class="swatch-info">
		<span class="swatch-label">{label || tokenName}</span>
		<code class="swatch-token">{tokenName}</code>
		<span class="swatch-value">{computedValue || '...'}</span>
		{#if copied}
			<span class="swatch-copied">Copied!</span>
		{/if}
	</div>
</button>

<style>
	.swatch-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 12px;
		border: 1px solid var(--card-border);
		border-radius: 8px;
		background: var(--card-bg);
		cursor: pointer;
		transition: all 0.2s ease;
		min-width: 120px;
		font-family: system-ui, sans-serif;
	}

	.swatch-container:hover {
		border-color: var(--card-border-hover);
		background: var(--card-bg);
	}

	.swatch {
		width: 64px;
		height: 64px;
		border-radius: 8px;
		border: 1px solid var(--border-glass);
	}

	.swatch-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.swatch-label {
		font-size: 12px;
		font-weight: 600;
		color: var(--text-primary);
	}

	.swatch-token {
		font-size: 10px;
		color: var(--text-muted);
		font-family: monospace;
	}

	.swatch-value {
		font-size: 10px;
		color: var(--admin-text-muted);
		font-family: monospace;
	}

	.swatch-copied {
		font-size: 11px;
		color: var(--hex-olive);
		font-weight: 600;
	}
</style>
