---
outline: "deep"
---

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

These properties apply to both the Web and React versions of our icons (with
minor syntax differences depending on your framework).

:::

<div class="table-wrapper">

| Name      | Description                                                                                                                 | Default Value |
| --------- | --------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `viewbox` | The viewBox of the SVG. Allows you to redefine what the coordinates without units mean inside an SVG element.               | `0 0 24 24`   |
| `title`   | Provides a human-readable title for the element that contains it. [More Info](https://www.w3.org/TR/SVG-access/#Equivalent) | -             |
| `size`    | The size of the icon. If set to `"auto"`, the icon will use the parent's width and height.                                  | `"auto"`      |

</div>

::: info

Color Inheritance All Tapsi icons inherit their color from their parent element
using `currentColor`. To change the icon color, simply style the `color`
property on the parent (or the icon itself), and the icon’s fill will update
accordingly.

:::

## Icons usage

Assume we are going to use the "Clock" icon. First, import the component:

::: code-group

```ts [Web]
import "@tapsioss/web-icons/clock";
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
