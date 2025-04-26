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

Assume we are going to use the "Alarm Clock" icon. First, import the component:

::: code-group

```ts [Web (Manual)]
import { registerAlarmClock } from "@tapsioss/web-icons/alarm-clock";

// You can register icons in your projects (usually inside the root of your project)
registerAlarmClock(); // Now you can use the alarm clock icon anywhere.
```

```ts [Web (Automatic)]
import "@tapsioss/web-icons/alarm-clock/element";

// Now you can use the alarm clock icon anywhere.
```

```tsx [React]
import { AlarmClock } from "@tapsioss/react-icons/AlarmClock";
```

:::

Then you can easily use the component with the following syntax:

::: code-group

```html [Web]
<tapsi-icon-alarm-clock
  size="24"
  title="a clock icon"
></tapsi-icon-clock>
```

```tsx [React]
<AlarmClock
  size={24}
  title="a clock icon"
/>
```

:::
