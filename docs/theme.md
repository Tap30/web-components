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
radius and typography tokens) to your project, import the `css-variables` module
at the root of your application:

```ts
import "@tapsioss/theme/css-variables";
```

This automatically injects all CSS variables into the global scope, enabling you
to reference them anywhere in your app.

Also, you can access tokens in javascript:

```ts
import tokens from "@tapsioss/theme/tokens";

conosle.log(tokens.palette.orange["500"]); // "#e55c2e"
```

The following tokens are currently available, each with its own API reference
and usage examples for both CSS and JavaScript:

- [Palette](/theme/palette)
- [Color](/theme/color)
- [Radius](/theme/radius)
- [Spacing](/theme/spacing)
- [Stroke](/theme/stroke)
- [Typography](/theme/typography)
