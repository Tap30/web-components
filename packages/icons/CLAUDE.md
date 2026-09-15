# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Package: `@tapsioss/icons`

SVG path metadata and definitions for Tapsi Design System icons. Provides raw
path data and base64 data URLs — not rendered SVG elements. Consumed by
`@tapsioss/web-icons` and `@tapsioss/react-icons` to generate their respective
component wrappers.

## Commands

```bash
# Build (generate paths.json + index.ts from SVGs, then TypeScript compile)
pnpm build
```

There is no dev/watch mode. Rebuild after adding or modifying SVG files.

## Architecture

### Source SVGs (`src/`)

All icons are plain SVG files in `src/`. Naming convention: `kebab-case.svg`
(e.g., `arrow-down.svg`, `camera-plus.svg`). The kebab name becomes the
PascalCase export key (e.g., `ArrowDown`, `CameraPlus`).

### Build process (`scripts/build.ts`)

The build script processes SVGs into a typed JS/TS module:

1. **Glob** all `src/**/*.svg` files.
2. For each SVG, **strip** unwanted attributes (`fill`, `fill-opacity`,
   `clip-path`, `<clipPath>` elements) to produce generic, themeable paths.
3. **Extract** individual `<path>` elements into `SVGPathInfo[]` objects with
   `d`, `clipRule`, `fillRule`, and `xlinkHref` fields.
4. **Generate a base64 data URL** from the original SVG (with a white background
   injected) for use in docs/preview thumbnails.
5. **Stream-write** all icon data into a temporary `src/paths.json` as a single
   JSON object keyed by PascalCase icon name.
6. **Render** `templates/entry.txt` (Mustache) to produce a temporary
   `src/index.ts` that imports `paths.json` and re-exports everything.
7. **Compile** with `tsc` using `tsconfig.build.json`.
8. **Clean up** the temporary `src/paths.json` and `src/index.ts` files.

### Exported shape (`SVGIconInfo`)

Each icon export is an object:

```ts
type SVGIconInfo = {
  kebabName: string; // original filename without extension
  pascalName: string; // PascalCase key used as the export name
  dataUrl: string; // base64 data URL (for previews)
  paths: SVGPathInfo[];
};

type SVGPathInfo = {
  d: string;
  clipRule?: string;
  fillRule?: string;
  xlinkHref?: string;
};
```

### Adding icons

Drop a new `kebab-name.svg` file into `src/` and run `pnpm build`. The icon is
automatically picked up by the glob. No manual registration needed.

### Downstream impact

Changing or adding icons requires rebuilding downstream packages in order:

1. `pnpm build` here (`@tapsioss/icons`)
2. `pnpm build` in `packages/web-icons`
3. `pnpm build` in `packages/react-icons`

From the repo root: `pnpm build:packages` handles the correct order via wireit.
