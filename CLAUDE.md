# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Package Manager

Use `pnpm` exclusively. `npm` and `yarn` are not supported. Requires Node >=20.

## Common Commands

```bash
# Install dependencies
pnpm install

# Live track: the React playground on :5174 and Storybook on :6006, both
# reading react-ui from SOURCE (hot reload, nothing to build or watch first)
pnpm dev                     # same as dev:react

# Or a single piece
pnpm dev:playground:react    # :5174
pnpm storybook:react         # :6006
pnpm preview:docs            # the built (archived) docs site

# Build the live packages (theme, icons, react-icons, react-ui)
pnpm build:packages

# Run tests (Playwright; wireit builds what the suite needs first)
pnpm test                    # react-ui suite, 100% coverage

# Archived track — everything is under these; the main commands never touch it
pnpm check:archived          # lint:archived + build:archived + build:docs
pnpm lint:archived           # tsc per archived tsconfig + ESLint on archived dirs
pnpm test:archived           # web-components Playwright suite
pnpm build:archived          # runs test:archived, then builds the three packages

# Run tests for a single file (build the package first — tests hit built output)
pnpm --filter @tapsioss/web-components exec playwright test src/button/standard/button.test.ts
pnpm --filter @tapsioss/react-ui exec playwright test src/button/button.test.tsx

# Full lint of the live track: tsc (root tsconfig) + ESLint + Storybook types
pnpm check:lint

# publint + are-the-types-wrong on theme and react-ui (also run by `release`)
pnpm check:publish

# Lint (ESLint) only
pnpm --filter . exec eslint --color src/

# Format
pnpm format

# Generate component metadata (custom-elements.json, metadata.json)
pnpm gen:metadata

# Delete every dist (and storybook-static) / every node_modules in the repo
# (add --dry-run to only list what would go)
pnpm clear:dist
pnpm clear:node-modules
```

## Architecture

This is a **pnpm monorepo** with [wireit](https://github.com/google/wireit) for
build orchestration and [changesets](https://github.com/changesets/changesets)
for versioning.

### Packages

| Package                     | Description                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `packages/theme`            | CSS design tokens and JS token exports (`@tapsioss/theme`)                                       |
| `packages/web-components`   | **Archived.** Lit-based Web Components (`@tapsioss/web-components`)                              |
| `packages/react-components` | **Archived.** `@lit/react` wrappers generated from web-components (`@tapsioss/react-components`) |
| `packages/icons`            | Raw SVG paths and icon metadata (`@tapsioss/icons`)                                              |
| `packages/web-icons`        | **Archived.** Web Component wrappers for icons (`@tapsioss/web-icons`)                           |
| `packages/react-icons`      | React wrappers for icons (`@tapsioss/react-icons`)                                               |
| `packages/react-ui`         | React rewrite of the design system on `@base-ui/react` + theme 1.x (`@tapsioss/react-ui`, alpha) |
| `internals/test-helpers`    | Shared Playwright test utilities (private)                                                       |
| `storybook/react`           | Storybook for `react-ui` (`@tapsioss/react-storybook`), runs from source                         |
| `docs`                      | VitePress docs site for the Lit components; Storybook is deployed alongside it at `/storybook/`  |

There are two generations side by side: the **Lit track** (`web-components`,
`react-components`, pinned to theme `0.8.0`) and the **React track**
(`react-ui`, on theme 1.x from the workspace). See Testing below for how the pin
is kept apart.

**Archived:** `web-components`, `react-components` and `web-icons` — plus their
consumers `playground/lit` and `docs`. They are `private`, ignored by
changesets, and absent from every main script (`build:packages`, `test`,
`check:lint`, `dev`) and from the main CI workflow. They are still maintained:
`.github/workflows/archived.yml` runs `pnpm check:archived` whenever an archived
directory, a shared dependency (`icons`, `react-icons`,
`internals/test-helpers`) or root config changes. `check:format` is the one
repo-wide check that still covers them. The root `tsconfig.json` excludes the
archived directories; each is type-checked by its own `tsconfig.json`, which
re-declares `exclude` (an inherited one would match its own inputs).

**Build dependency order:** `theme` → `icons` → `web-icons`/`react-icons` →
`web-components` → `react-components`; `react-ui` builds independently.
`react-ui`'s build and tests must not depend on `react-icons` — tests use raw
`<svg>` stand-ins. Only Storybook (icon gallery) waits on `build:react-icons`.

**Read before editing these packages:** `packages/react-ui/AGENTS.md` and
`packages/theme/AGENTS.md` hold binding review rules (Figma is authoritative for
appearance, web-components for behaviour; never invent a token; props/styling/
test conventions). Known deferred work and token gaps are tracked in the root
`PARKED.md` — record new gaps there.

### React UI (`packages/react-ui`)

Components live in `src/<name>/` as `<name>.tsx` + `<name>.module.css` +
`<name>.test.tsx`, with `src/button/` as the reference implementation. The build
is `tsc` followed by `scripts/build-css.ts`, which scopes the CSS modules once
at build time, inlines the resolved class names into the emitted JS, and writes
per-component `.css` plus an aggregate `dist/styles.css` — consumers never
process CSS modules themselves.

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

Tests use Playwright with a custom test harness from `internals/test-helpers`,
and each suite runs against a production build of its playground:

- `web-components` → `playground/lit` at `http://localhost:3000/test`; the
  `render` helper injects HTML into the page.
- `react-ui` → `playground/react` at `http://localhost:3001/test`; tests pass a
  serializable element spec that `playground/react/src/test-setup.tsx` renders
  via a `window.__renderReact` bridge. react-ui tests mirror the corresponding
  Lit component's test scenarios one for one. The react-ui run also collects V8
  coverage and **fails below 100%**
  (`packages/react-ui/playwright/coverage.ts`). That works because react-ui's
  build emits `.js.map` files (kept out of the package by `files`, and their
  `sourceMappingURL` comments stripped by `build-css.ts`), and the playground's
  Vite config loads them so the bundle maps back to `src`. `build-css.ts` must
  keep its CSS-import replacement on ONE line, or those maps go stale.

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

### Module resolution: source vs dist

The root `tsconfig.json` maps every hand-written `@tapsioss/*` package to its
**`src` only**, and excludes `**/dist`, so type-checking never sees a stale
build. Storybook inherits that map, which is why it runs (and `storybook build`
works) without building `react-ui`. The icon packages are the exception: their
sources are generated into `dist`, so they map there, and lint depends on their
builds.

Anything acting as a **consumer** sets `"paths": {}` and resolves through each
package's `exports` to `dist`: both playgrounds (except that the React
playground's dev server aliases react-ui to source — its `vite build`, which the
tests use, still reads `dist`), and
`packages/react-components/tsconfig.build.json` (building against
web-components' source would emit it into react-components' `dist`). `web-icons`
and `react-icons` compile _from_ `dist`, so their build configs re-declare
`exclude` to avoid inheriting the root's `**/dist`.

### Changesets

When making user-visible changes, create a changeset:

```bash
pnpm changesets:create
```

Released packages: `@tapsioss/theme`, `@tapsioss/react-ui`, and
`@tapsioss/icons` + `@tapsioss/react-icons` (linked). Everything else — the
archived Lit packages, `@internals/*`, docs, playgrounds, Storybook — is
ignored.

The repo is in changesets **pre mode** (`.changeset/pre.json`, tag `alpha`):
releases publish as `x.y.z-alpha.n` on the `alpha` dist-tag. Never add
`--tag latest` to `release`. Leave alpha with `pnpm exec changeset pre exit`.
`@tapsioss/theme`'s version is managed by changesets — do not hand-edit it.

## Commit Conventions

Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`,
`perf:`, `test:`, `build:`, `ci:`, `chore:`, `revert:`. Limit the first line to
72 characters.
