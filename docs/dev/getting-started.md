---
outline: 'deep'
---

# Getting Started

## Installation

### Web

Implementation of the Tapsi icon library for web applications.

::: code-group
```bash [npm]
npm install @tapsi-oss/design-system/web-components
```

```bash [yarn]
yarn add @tapsi-oss/design-system/web-components
```

```bash [pnpm]
pnpm install @tapsi-oss/design-system/web-components
```
:::

::: info
Please note that [lit](https://www.npmjs.com/package/lit) is a peer dependency, meaning you should ensure they are
installed before installing Tapsi design system in web components.
:::

### React

Implementation of the Tapsi icon library in React.

::: code-group
```bash [npm]
npm install @tapsi-oss/design-system/react
```

```bash [yarn]
yarn add @tapsi-oss/design-system/react
```

```bash [pnpm]
pnpm install @tapsi-oss/design-system/react
```
:::


::: info
Please note that [react](https://www.npmjs.com/package/react) and [react-dom](https://www.npmjs.com/package/react-dom)
are peer dependencies, meaning you should ensure they are installed before installing Tapsi design system in React.
:::

## Usage

Many components have properties that can be set using attributes. For example, buttons accept a `size` attribute that
maps to the size property which dictates the button’s size.

```html
<tap-button size="small">Click me!</tap-button>
```

Some properties are boolean, so they only have true\/false values. To activate a boolean property, add the 
corresponding attribute without a value.

```html
<tap-button disabled>Click me!</tap-button>
```

In rare cases, a property may require an array, an object, or a function. For example, to customize the pinwheel’s 
list of preset items, you set the `items` property to an array of `stirng`. This can be done with JavaScript.

```html
<tap-pinwheel></tap-pinwheel>

<script>
  const colorPicker = document.querySelector('tap-pinwheel');
  colorPicker.items = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];
</script>
```

Refer to a component’s documentation for a complete list of its properties.


## Events

You can listen for standard events such as `click`, `mouseover`, etc. as you normally would. However, it’s important to
note that many events emitted within a component’s shadow root will be retargeted to the host element. This may result
in, for example, multiple `click` handlers executing even if the user clicks just once. Furthermore, `event.target` will
point to the host element, making things even more confusing.

As a result, you should almost always listen for custom events instead. For example, instead of listening to click to 
determine when an `<tap-checkbox>` gets toggled, listen to `tap-change`.

```html
<tap-checkbox>Check me</tap-checkbox>

<script>
  const checkbox = document.querySelector('tap-checkbox');
  checkbox.addEventListener('tap-change', event => {
    console.log(event.target.checked ? 'checked' : 'not checked');
  });
</script>
```

## Slots

Many components use slots to accept content inside of them. The most common slot is the **default** slot, which includes any 
content inside the component that doesn't have a `slot` attribute.

For example, a button’s default slot is used to populate its label.

```html
<tap-button>Click me!</tap-button>
```

Some components also have **named** slots. A named slot can be populated by adding a child element with the appropriate
`slot` attribute. Notice how the icons below has the `slot="icon"` and `slot="active-icon"` attribute? This tells the 
component to place the icon into its prefix slot.

```html
<tap-bottom-navigation-item>
  Profile
  <tap-icon-person slot="icon"></tap-icon-person>
  <tap-icon-person-fill slot="active-icon"></tap-icon-person-fill>
</tap-bottom-navigation-item>
```

:::info
The location of a named slot doesn't matter. You can put it anywhere inside the component and the browser will move it
to the right place automatically!
:::

Refer to a component’s documentation for a complete list of available slots.

## Visual Customization


Tapsi components can be customized at a high level through design tokens. This gives you control over theme colors and 
general styling. For more advanced customizations, you can make use of CSS parts and custom properties to target 
individual components.

### Design Tokens

The style of the components in this library are using [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/var).
Each property has a **custom property name** and a **declaration value** with this format:

```css
{
  property-name: var(--custom-property-name, var(--declaration-value)); /* [!code highlight] */
}
```


The declaration value is Tapsi design system tokens and the custom property name can be set by component users. You need
to set value for the custom property name is a global CSS file in your project. The list of these tokens are available
in our [CSS Tokens Documentation](/references/components-tokens). Additionally, each component has it's own tokens in the "CSS Properties" section in
their documentation.

### CSS Parts


Elements in this library components has the `part` attribute. This attribute let the users be able to modify the styles
of a component from outside using the [`::part` CSS pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).
All you need to do is to visit our [CSS part documentation](/references/css-parts) and modify the style of the component. Also, the documentation
of each component contains these CSS parts in "CSS Parts" section.

Here is an example of modifying the style of the `modal` component using `part`:

```css
tap-modal::part(overlay) { /* [!code highlight] */
  backdrop-filter: blur(14px);
}


tap-modal::part(dialog) { /* [!code highlight] */
  background-color: #1f1f1f;
  color: #ffffff;
}
```





