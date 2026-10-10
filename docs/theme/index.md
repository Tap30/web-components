---
outline: "deep"
prev: false
---

# Theme

The Tapsi design system’s theme is available as a standalone package for easy
integration into any project. This package provides global CSS variables (design
tokens) that you can reference throughout your application for consistent
styling.

## Installation

::: code-group

```bash [pnpm]
pnpm install @tapsioss/theme
```

```bash [npm]
npm install @tapsioss/theme
```

```bash [yarn]
yarn add @tapsioss/theme
```

:::

## Theme Usage

To add Tapsi’s global CSS variables (e.g., color palettes, spacing, stroke,
radius and typography tokens) to your project, import the `legacy/tokens.css`
stylesheet at the root of your application. These are the `--tapsi-*` tokens the
Lit components are styled with; `@tapsioss/theme` 1.x ships them unchanged next
to the current `--tds-*` tokens, and the two share no name:

```ts
import "@tapsioss/theme/legacy/tokens.css";
```

This automatically injects all CSS variables into the global scope, enabling you
to reference them anywhere in your app.

The legacy tokens are available as CSS only. `@tapsioss/theme` 1.x has no
JavaScript export of them — the JavaScript paths shown on the pages below are
those of `@tapsioss/theme@0.8.0`, kept for reference.

The following tokens are currently available, each with its own API reference
and usage examples for both CSS and JavaScript:

- [Palette](/theme/palette)
- [Color](/theme/color)
- [Radius](/theme/radius)
- [Spacing](/theme/spacing)
- [Stroke](/theme/stroke)
- [Typography](/theme/typography)
