# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Package Manager

Use `pnpm` exclusively. `npm` and `yarn` are not supported. Requires Node >=20.

## Common Commands

```bash
# Install dependencies
pnpm install

# Everything: every package in watch mode + both playgrounds
pnpm dev

# One track end to end — only that track's packages watch, only its playground starts
pnpm dev:lit      # web-components + react-components, playground on :5173
pnpm dev:react    # react-ui, playground on :5174

# Or a single piece
pnpm dev:playground:lit      # :5173
pnpm dev:playground:react    # :5174
pnpm dev:packages:lit        # watchers for the lit track only
pnpm dev:packages:react      # watchers for the react track only
pnpm storybook:react         # :6006

# Build all packages
pnpm build:packages

# Run all tests (Playwright, requires packages to be built first)
pnpm test

# Run tests for a single file
pnpm --filter @tapsioss/web-components exec playwright test src/button/standard/button.test.ts

# Update snapshots
pnpm test:update-snapshots

# TypeScript type-check
pnpm check:lint

# Lint (ESLint)
pnpm --filter . exec eslint --color src/

# Format
pnpm format

# Generate component metadata (custom-elements.json, metadata.json)
pnpm gen:metadata
```

## Architecture

This is a **pnpm monorepo** with [wireit](https://github.com/google/wireit) for
build orchestration and [changesets](https://github.com/changesets/changesets)
for versioning.

### Packages

| Package                     | Description                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| `packages/theme`            | CSS design tokens and JS token exports (`@tapsioss/theme`)                                        |
| `packages/web-components`   | Core Lit-based Web Components (`@tapsioss/web-components`)                                        |
| `packages/react-components` | React wrappers auto-generated from web-components via `@lit/react` (`@tapsioss/react-components`) |
| `packages/icons`            | Raw SVG paths and icon metadata (`@tapsioss/icons`)                                               |
| `packages/web-icons`        | Web Component wrappers for icons (`@tapsioss/web-icons`)                                          |
| `packages/react-icons`      | React wrappers for icons (`@tapsioss/react-icons`)                                                |
| `internals/test-helpers`    | Shared Playwright test utilities (private)                                                        |

**Build dependency order:** `theme` → `icons` → `web-icons`/`react-icons` →
`web-components` → `react-components`

### Web Components (`packages/web-components`)

Components are written in [Lit](https://lit.dev/) and live under
`src/<component-name>/`. Each component directory typically contains:

- `<name>.ts` — the Lit element class
- `<name>.style.ts` — CSS-in-TS styles
- `<name>.test.ts` — Playwright tests
- `constants.ts` — slot names and other constants
- `element.ts` — element class re-export
- `index.ts` — public API (`export`, `register`, global type augmentation)

Some components have subdirectories (e.g., `button/base`, `button/standard`,
`button/icon-button`) for shared base classes.

**Component registration pattern:** Each `index.ts` exports a `register()`
function that calls `customElements.define("tapsi-<name>", ClassName)`. It
guards against SSR and double-registration.

**Shared utilities** live in `src/utils/` and `src/internals/`:

- `src/internals/` — shared CSS tokens (z-indexes, focus ring), animations,
  keyboard helpers, validation
- `src/utils/` — DOM helpers, mixins (form association, constraint validation,
  element internals, focusable), controllers, event utilities

**Mixins** in `src/utils/mixins/` enable form association, constraint
validation, element internals, and focusability as composable behaviors.

### React Components (`packages/react-components`)

React wrappers are **auto-generated** by `scripts/generate.ts` using Mustache
templates. Run `pnpm --filter @tapsioss/react-components run generate` after
adding or changing web component events/slots. Do not hand-edit files under
`src/` that are generated.

### Testing

Tests use Playwright with a custom test harness from `internals/test-helpers`.
Tests run against the **Lit playground** (`playground/lit`), which serves
components at `http://localhost:3000/test`. The `render` helper from
`@internals/test-helpers` injects HTML into the test page.

There are two playgrounds, split because the two generations of the design
system are styled by different, incompatible token sets:

| Playground         | Package                      | Consumes                             | `@tapsioss/theme`   |
| ------------------ | ---------------------------- | ------------------------------------ | ------------------- |
| `playground/lit`   | `@tapsioss/lit-playground`   | `web-components`, `react-components` | `0.8.0` (from npm)  |
| `playground/react` | `@tapsioss/react-playground` | `react-ui`                           | `workspace:*` (1.x) |

Both depend on the **same package name** at different versions, which works
because pnpm gives each workspace package its own `node_modules`. Each
playground's `package.json` is therefore the single source of truth for what it
resolves.

Each theme stylesheet declares its tokens twice — on `:root` and on
`[data-tapsi-theme="<product>-<mode>"]` — so importing one theme needs no setup,
while importing several lets a subtree pick its own. Storybook and the React
playground each import all four and ship their own small `ThemeProvider`;
`@tapsioss/theme` stays framework-agnostic and provides none.

For that to hold, each playground's `tsconfig.json` sets **`"paths": {}`**,
resetting the root map — the root aliases `@tapsioss/*` to package sources,
including `@tapsioss/theme` → `packages/theme/src`, which would otherwise
override the lit playground's pin and silently substitute 1.x tokens. With the
map empty, resolution goes through each package's `exports`, so a playground
also exercises **built output** (Storybook is the run-from-source environment;
run `pnpm build:packages` after changing a package).

Tests run on Desktop Chrome and Android (Galaxy S9+). On CI, tests retry up to 2
times.

### Changesets

When making user-visible changes, create a changeset:

```bash
pnpm changesets:create
```

`@tapsioss/web-components` and `@tapsioss/react-components` are versioned
together (linked). Icons packages are similarly linked. Internal packages
(`@internals/*`) and docs/playground are ignored for releases.

## Commit Conventions

Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`,
`perf:`, `test:`, `build:`, `ci:`, `chore:`, `revert:`. Limit the first line to
72 characters.
