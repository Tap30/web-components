---
"@tapsioss/react-ui": major
---

First release of `@tapsioss/react-ui`: the Tapsi Design System as React
components, built on [Base UI](https://base-ui.com) and styled by
`@tapsioss/theme` 1.x. It replaces the Lit-based `@tapsioss/web-components` and
`@tapsioss/react-components`, which are no longer developed.

**Components:** `Button` and `Row`.

**Setup.** Import the theme and the components' stylesheet once, at the root of
your app:

```ts
import "@tapsioss/theme/tokens.css";
import "@tapsioss/theme/ride/light.css";
import "@tapsioss/react-ui/styles.css";
```

The components import no CSS themselves, so the package works unchanged in
Node, in test runners and with server rendering.

**Migrating from the Lit components.** Both generations can be used on the same
page, so an app can move one component at a time — see the `@tapsioss/theme`
1.0.0 notes for the one extra import this needs.
