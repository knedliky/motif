# Motif Design Library — CLAUDE.md

## Project overview

`@motif/design` is a standalone Svelte 5 design library providing CSS design tokens and
component atoms for all externally-facing SvelteKit projects. It is built with Vite library
mode and consumed via local path (dev) or git URL (CI).

## Build Commands

```bash
# Build the library (emits dist/ with JS + .d.ts declarations)
bun run build

# Type-check Svelte components and TypeScript
bun run check

# Run Storybook dev server on port 6006
bun run storybook

# Build static Storybook catalogue
bun run build-storybook
```

## Tech stack

- **Svelte 5** — components use `$props()`, `$state()`, `$derived()`, `$effect()` runes only
- **TypeScript** — strict mode; all component props typed
- **Tailwind CSS 4** — via `@tailwindcss/vite`, no `tailwind.config.js`
- **Vite library mode** — `preserveModules: true`, ES format only
- **vite-plugin-dts** — generates `dist/index.d.ts` for TypeScript consumers
- **Storybook 10** — `@storybook/svelte-vite` framework; no `addon-essentials` (bundled in core)
- **Bun** — package manager for all installs and scripts

## Conventions

- **Australian English** in all identifiers, comments, and strings
  (`colour`, `initialise`, `behaviour`, `organise`, etc.)
- Svelte 5 runes only — no `export let`, no `$:`, no `createEventDispatcher`
- Component files: `PascalCase.svelte`
- Token files: lowercase with hyphens (`public.css`, `admin.css`, `base.css`)
- All CSS custom properties use OKLCH for colour values

## Source of truth for tokens

Tokens are extracted from `~/Code/motivka/apps/web/src/app.css`.
Atoms are extracted from `~/Code/motivka/apps/web/src/lib/ui/atoms/`.

## Package structure

```
src/
  tokens/
    public.css   — public UI design tokens
    admin.css    — admin UI tokens (requires public.css)
    base.css     — global styles, typography, utilities
  components/
    atoms/       — public atom components
    admin/       — admin atom components
  index.ts       — root barrel export
```

## Exports map

```json
{
  ".":        { "import": "./dist/index.js", "types": "./dist/index.d.ts" },
  "./public": "./src/tokens/public.css",
  "./admin":  "./src/tokens/admin.css",
  "./base":   "./src/tokens/base.css"
}
```

## Review Checklist

- No `export let` syntax — must use `$props()` rune
- No `$:` reactive statements — must use `$derived()` or `$effect()`
- No `createEventDispatcher` — use callback props or Svelte 5 events
- All colour values in OKLCH format in CSS files
- No `--admin-*` tokens in `public.css`
- No CSS custom property definitions in `base.css`
- `bun run build` exits 0 with `dist/index.d.ts` present after build
- `bun run check` exits 0 with no type errors
