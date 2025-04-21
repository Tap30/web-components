---
prev: false
next: false
outline: "deep"
sidebar: false
---

<style>

#icon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons-search-input {
  max-width: 200px;
  display: flex;
  height: 60px;
  border-radius: 8px;
  padding: 0 8px;
  background-color: var(--vp-c-bg-alt);
  margin-left: 20px;
}

.DocSearch-MagnifierLabel {
  color: unset;
}

.DocSearch-Input {
  font-size: 1em;
  height: 100%;
  outline: none;
  padding: 0 0 0 8px;
  width: 80%;
}

#icons-grid {
  margin-top: 50px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;
}

.icon-item {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 6px;
}

.icon-item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.icon-item svg {
  color: currentColor;
  fill: currentColor;
  width: 100%;
  height: 100%;
  display: block;
}

.tapsi-icon {
  height: 24px;
  width: 24px;
  fill: currentColor;
}

#icon-wrapper {
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  margin-top: 1rem;
}

#icon-wrapper svg {
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
}

</style>

<script setup>
import './internals/components/DocIconGrid';
</script>

# Icons

The Tapsi design system provides a comprehensive set of icons published on NPM.
You can integrate these icons into your project using either **Web Components**
(framework-agnostic) or **React Components** (optimized for React).

## Installation

### Web

Use `@tapsioss/web-icons` if you want to embed Tapsi icons into any project –
whether it’s vanilla HTML, Angular, Vue, Svelte, or any framework that supports
Web Components.

::: code-group

```bash [pnpm]
pnpm install @tapsioss/web-icons
```

```bash [npm]
npm install @tapsioss/web-icons
```

```bash [yarn]
yarn add @tapsioss/web-icons
```

:::

### React

Use `@tapsioss/react-icons` if you’re working in a React environment and want a
more streamlined integration that follows React conventions.

::: code-group

```bash [pnpm]
pnpm install @tapsioss/react-icons
```

```bash [npm]
npm install @tapsioss/react-icons
```

```bash [yarn]
yarn add @tapsioss/react-icons
```

:::

## Properties

::: tip Note 

These properties apply to both the Web and React versions of our
icons (with minor syntax differences depending on your framework). 

:::

<div class="table-wrapper">

| Name      | Description                                                                                                                 | Default Value  |
|-----------|-----------------------------------------------------------------------------------------------------------------------------|----------------|
| `viewbox` | The viewBox of the SVG. Allows you to redefine what the coordinates without units mean inside an SVG element.               | `0 0 24 24`    |
| `title`   | Provides a human-readable title for the element that contains it. [More Info](https://www.w3.org/TR/SVG-access/#Equivalent) | -              |
| `size`    | The size of the icon. If set to `"auto"`, the icon will use the parent's width and height.                                  | `"auto"`       |

</div>

::: info

Color Inheritance All Tapsi icons inherit their color from their parent
element using `currentColor`. To change the icon color, simply style the `color`
property on the parent (or the icon itself), and the icon’s fill will update
accordingly. 

:::

## Icons usage

Assume we are going to use the "Clock" icon. First, import the component:

::: code-group

```ts [Web]
import "@tapsioss/web-icons/Clock";
```

```tsx [React]
import { Clock } from "@tapsioss/react-icons";
```

:::

Then you can easily use the component with the following syntax:

::: code-group

```html [Web]
<tapsi-icon-clock
  size="24"
  title="a clock icon"
></tapsi-icon-clock>
```

```tsx [React]
<Clock
  size={24}
  title="a clock icon"
/>
```

:::

## Explore Icons

<doc-icon-grid></doc-icon-grid>
