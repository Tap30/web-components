# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Package: `@tapsioss/react-components`

React wrappers for `@tapsioss/web-components`, auto-generated using
`@lit/react`'s `createComponent`.

## Commands

```bash
# Generate src/ from metadata.json (must run before build; wipes and rewrites all component files)
pnpm generate

# Build (runs generate then TypeScript compile to dist/)
pnpm build

# Watch mode (TypeScript only — re-run generate manually when web-components change)
pnpm dev
```

> `pnpm build` runs `generate` automatically via `prebuild`. When iterating on
> the generator itself, run `pnpm generate` standalone to inspect `src/` output
> before compiling.

## Architecture

### Generated code — do not hand-edit `src/`

All files under `src/` (except nothing — the entire directory) are **generated**
by `scripts/generate.ts`. They are overwritten on every `pnpm generate` run. To
change a component's React wrapper, change the web component's source or the
generator/template.

### How generation works

`scripts/generate.ts` reads `packages/web-components/metadata.json` (produced by
`gen:metadata` in the web-components package) as a streaming JSON source and for
each component:

1. Builds a `ReactMetadata` object: component name (PascalCase), element tag,
   element class, events (mapped to `onEventName` React props), slot variable
   names, import path, and optional parent info for compound components.
2. Renders `templates/component.txt` (Mustache template) with that metadata.
3. Writes `src/<ComponentName>/<ComponentName>.ts` and
   `src/<ComponentName>/index.ts`.
4. Appends the export to `src/index.ts` (the barrel file).
5. Runs `prettier` over `src/` after all files are written.

### Mustache template (`templates/component.txt`)

```
{{imports}}

{{register}}

export const {{componentName}}: {{componentType}} = createComponent({
  tagName: "{{elementTag}}",
  elementClass: {{elementClass}},
  react: React,
  events: {{events}},
});

{{exports}}
```

`{{imports}}` includes `React`, `createComponent` from `@lit/react`, the web
component element class, and the `register` call. `{{events}}` maps DOM event
names to `onX` React prop names.

### Component file layout

```
src/
  <ComponentName>/
    <ComponentName>.ts   # Generated: createComponent wrapper
    index.ts             # Generated: re-exports everything from <ComponentName>.ts
  index.ts               # Generated: barrel re-exporting all components
```

### Compound components

Components that consist of a parent + sub-parts (e.g., BottomNavigation +
BottomNavigationItem) are registered and exported as separate entries. The
generator resolves compound relationships from `compoundParts` in
`metadata.json` and emits a `registerX` call for each part inside the parent's
wrapper.

### Event mapping

Web component events become React prop names via a simple transformation:
`tapsi-event-name` → `onTapsiEventName`. The mapping is emitted in the `events`
object passed to `createComponent`.

### Dependency on web-components

This package depends on `@tapsioss/web-components` (workspace) and reads
`packages/web-components/metadata.json` directly by relative path during
generation. If the metadata file doesn't exist, `pnpm generate` will fail — run
`pnpm gen:metadata` in the web-components package first.
