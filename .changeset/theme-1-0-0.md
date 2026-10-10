---
"@tapsioss/theme": major
---

A new token system, generated from the Figma variables and not compatible with
0.x.

**Two layers.** Import the primitives once and one theme on top of them. A
theme is a product × mode pair: `ride/light`, `ride/dark`, `drive/light` or
`drive/dark`.

```ts
import "@tapsioss/theme/tokens.css";
import "@tapsioss/theme/ride/light.css";
```

Each theme is declared on `:root` and on
`[data-tapsi-theme="<product>-<mode>"]`, so one theme needs no setup, and
several can be loaded to switch at runtime or to theme part of a page. The same
values are available to JavaScript from `@tapsioss/theme/tokens` and
`@tapsioss/theme/<product>/<mode>`.

**New names.** Tokens are named after their Figma variable path and prefixed
`--tds-` (0.x used `--tapsi-`): `Color/Surface/Primary` is
`--tds-color-surface-primary`.

**Breaking changes from 0.x.** Every token name has changed. The
`@tapsioss/theme/css-variables` entry point, the default export of
`@tapsioss/theme/tokens` and the JavaScript `spacing`, `radius` and `stroke`
groups are gone.

**The 0.x tokens are still included**, unchanged and under their original
`--tapsi-*` names, as a stylesheet:

```ts
import "@tapsioss/theme/legacy/tokens.css";
```

Apps that use `@tapsioss/web-components` or `@tapsioss/react-components` import
this in place of `@tapsioss/theme/css-variables`. Because the two sets share no
name, both can be loaded together while an app moves to `@tapsioss/react-ui`
one component at a time. The legacy set is CSS only and will be removed in a
future major release.
