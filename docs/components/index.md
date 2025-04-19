---
prev: false
outline: "deep"
---

# Components

Tapsi provides a set of UI components for building consistent and unified
interfaces. All components rely on the shared [`@tapsioss/theme`](/theme)
package for design tokens and styling, ensuring that no matter which framework
you use, the look and feel remain consistent.

## Installation

### Web

To integrate Tapsi Web Components into any environment that supports Web
Components, install the `@tapsioss/web-components` package:

::: code-group

```bash [pnpm]
pnpm install @tapsioss/web-components
```

```bash [npm]
npm install @tapsioss/web-components
```

```bash [yarn]
yarn add @tapsioss/web-components
```

:::

### React

Seamlessly integrate Tapsi's design system in your React projects using the
`@tapsioss/react-components` package. Built with TypeScript in mind, this
package offers type definitions to ensure a robust, type-safe development
experience in modern React applications.

::: code-group

```bash [pnpm]
pnpm install @tapsioss/react-components
```

```bash [npm]
npm install @tapsioss/react-components
```

```bash [yarn]
yarn add @tapsioss/react-components
```

:::

::: info

Both `@tapsioss/web-components` and `@tapsioss/react-components` rely on the
[`@tapsioss/theme`](/theme) package for consistent styling. Be sure to include
this package in your project to ensure the components render correctly.

:::
