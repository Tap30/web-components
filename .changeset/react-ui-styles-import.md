---
"@tapsioss/react-ui": major
---

Components no longer import their own CSS. Import the stylesheet once, at the
root of your app:

```ts
import "@tapsioss/react-ui/styles.css";
```

The published JS now contains no `.css` imports, so the package loads in plain
Node, in test runners without a CSS transform, and in Next.js's Pages Router.
`styles.css` is minified, and the per-component `.css` files are no longer
published.
