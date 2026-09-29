# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Package: `@tapsioss/web-components`

Framework-agnostic Web Components for the Tapsi Design System, built with
[Lit](https://lit.dev/).

## Commands

Run from this directory (`packages/web-components`) or the repo root with the
filter flag:

```bash
# Build (TypeScript compile to dist/)
pnpm build

# Watch mode for development
pnpm dev

# Run all Playwright tests (requires built dist + playground server)
pnpm test

# Run a single test file
pnpm exec playwright test src/button/standard/button.test.ts

# Run tests matching a title pattern
pnpm exec playwright test --grep "should be automatically focused"

# Update visual/snapshot baselines
pnpm test:update-snapshots

# Generate custom-elements.json + metadata.json (needed before build and by react-components)
pnpm gen:metadata
```

> Tests start a playground server automatically via `webServer` in
> `playwright.config.ts`. The playground must be built first
> (`pnpm --filter @tapsioss/lit-playground run start:test` is used internally).
>
> That is `playground/lit`, which pins `@tapsioss/theme` to the published
> **`0.8.0`** — these components reference the pre-1.0 token names, so the
> workspace 1.x cannot style them. The pin holds because that playground's
> `tsconfig.json` sets `"paths": {}`, resetting the root aliases that would
> otherwise redirect `@tapsioss/theme` to `packages/theme/src`. The separate
> `playground/react` is for `@tapsioss/react-ui` and the current tokens.

## Architecture

### Component structure

Each component lives in `src/<component-name>/` with a consistent file layout:

```
src/<name>/
  <name>.ts          # Lit element class (the implementation)
  <name>.style.ts    # CSS-in-TS using Lit's css`` tag; consumed by the element class
  <name>.test.ts     # Playwright tests
  constants.ts       # Exported slot name enums (Slots object) and other constants
  element.ts         # Re-exports just the element class (for tree-shaking)
  index.ts           # Public API: exports, register() function, global HTMLElementTagNameMap augmentation
```

Some components are compound (e.g., `button/`) and have subdirectories:

- `button/base/` — abstract `BaseButton` class shared by standard and icon
  variants
- `button/standard/` — `<tapsi-button>`
- `button/icon-button/` — `<tapsi-icon-button>`

### Registration pattern

Every `index.ts` exports a `register()` function:

```ts
export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-<name>")) return;
  customElements.define("tapsi-<name>", ClassName);
};
```

Guard against SSR and double-registration is mandatory.

### Shared internals (`src/internals/`)

Internal-only helpers shared across components:

- `tokens.ts` — `Z_INDEXES`, `FOCUS_RING_LINE`, `FOCUS_RING_OFFSET` CSS values
- `animations.ts` — shared CSS animation definitions
- `keyboard.ts` — `KeyboardKeys` enum
- `validation.ts` — validation message helpers

### Utilities (`src/utils/`)

Public utilities reused by components:

- **`mixins/`** — composable class mixins:
  - `withElementInternals` — attaches `ElementInternals` via the `internals`
    symbol
  - `withFormAssociated` — makes elements form-associated
    (`static formAssociated = true`)
  - `withConstraintValidation` — constraint validation API (validity,
    `checkValidity`, etc.)
  - `withOnReportValidity` — handles `reportValidity` lifecycle
  - `withFocusable` — focus delegation helpers
- **`controllers/`** — Lit reactive controllers
- **`dom/`** — DOM helpers (`dispatchActivationClick`, `isActivationClick`,
  etc.)
- **`events/`** — event dispatch utilities
- `Validator.ts` — per-field validation state machine
- `ResizeSensor.ts` — ResizeObserver wrapper
- `SystemError.ts` — typed internal error class
- `isSsr.ts` — SSR guard (`typeof window === "undefined"`)

### Form-associated components

Input-like components (e.g., `base-input`, `text-field`, `checkbox`, `radio`,
`switch`) compose all four mixins in order:

```ts
const BaseClass = withOnReportValidity(
  withConstraintValidation(
    withFormAssociated(withElementInternals(LitElement)),
  ),
);
```

### Metadata generation (`scripts/generate-metadata.ts`)

Runs `cem analyze` (Custom Elements Manifest CLI) over `src/` then
post-processes the CEM JSON into `metadata.json` — a richer format consumed by
`react-components`'s code generator and the docs site. The script:

1. Parses constants files to resolve `Slots` values
2. Parses events files to collect event class names and flags (`bubbles`,
   `cancelable`)
3. Assembles compound component hierarchies (parent + parts)

### Testing

- Tests live alongside source as `<name>.test.ts`
- Playwright runs on Desktop Chrome + Android (Galaxy S9+)
- The `@internals/test-helpers` package provides `render(page, html)`,
  `setupMocks`, `disposeMocks`, and re-exports Playwright's
  `test`/`expect`/`describe`
- Tests navigate to `http://localhost:3000/test` before each test
- Axe accessibility checks are available via `AxeBuilder` from
  `@axe-core/playwright`

### Styling conventions

- Styles are defined in `<name>.style.ts` using Lit's `css` tag
- Component-local CSS custom properties (e.g., `--button-content-padding`) are
  used as internal tokens within a component's shadow DOM
- Global design tokens from `@tapsioss/theme` (e.g., `--tapsi-spacing-3-1`,
  `--tapsi-color-content-accent`) are referenced directly in CSS
