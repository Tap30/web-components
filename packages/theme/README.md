<div align="center">

# `@tapsioss/theme`

</div>

<div align="center">

Theming package providing design tokens as CSS and JS variables for the Tapsi
Design System.

</div>

<hr />

## Usage

Tokens come in two layers. Import the primitives once, then **one** theme on top
of them:

```css
@import "@tapsioss/theme/tokens.css";
@import "@tapsioss/theme/ride/light.css";
```

Swapping the second import is how you switch product or theme — `ride/light`,
`ride/dark`, `drive/light`, `drive/dark`. Nothing else changes, because
components reference only theme tokens (`--tds-color-surface-primary`), never
the palette underneath.

The same values are available to JavaScript, already resolved:

```ts
import { tokens } from "@tapsioss/theme/ride/light";

tokens.color.surface.primary; // "#ffffff"
tokens.dimension.radius.full; // "62.4375rem"
```

Token names are the Figma path, kebab-cased and prefixed `--tds-`, so a name you
find in Figma is the name you use in CSS.

## Migrating from the Lit components

Apps that use `@tapsioss/web-components` or `@tapsioss/react-components` rely on
the pre-1.0 tokens, named `--tapsi-*`. This package still ships them, unchanged,
so those components keep working while you move to `@tapsioss/react-ui` one
component at a time:

```ts
import "@tapsioss/theme/legacy/tokens.css"; // --tapsi-*  for the Lit components
import "@tapsioss/theme/tokens.css"; //        --tds-*    for everything new
import "@tapsioss/theme/ride/light.css";
```

The first line replaces the old `import "@tapsioss/theme/css-variables"`. The
two sets share no name, so they never interfere, whichever order they load in.
Remove the legacy import once the app no longer renders a Lit component. The
legacy set is CSS only — it has no JavaScript export — and will be removed in a
future major release.

## Public Documentation

You can find the complete documentation for the Tapsi Design System at
[our public documetation website](https://tap30.github.io/web-components), where
you'll find everything from getting started guides and component references to
design tokens and development guidelines—all designed to help you build with or
contribute to our system effectively.

## Milestones

Our project's [milestones](https://github.com/Tap30/web-components/milestones)
is where you can learn about what features or bugfixes we're working on. Have
any questions or comments? Share your feedback via
[Our public feedback discussions](https://github.com/Tap30/web-components/discussions/categories/feedback).

## Contributing

Read the
[contributing guide](https://github.com/Tap30/web-components/blob/main/CONTRIBUTING.md)
to learn about our development process, how to propose bug fixes and
improvements, and how to build and test your changes.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/Tap30/web-components/blob/main/LICENSE).
