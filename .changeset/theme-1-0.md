---
"@tapsioss/theme": major
---

Rebuild the design tokens as two composable layers: a primitive set
(`tokens.css` / `tokens`) and per-product themes (`<product>/<mode>.css`), each
declared on `:root` and on `[data-tapsi-theme="<product>-<mode>"]`. Token names
follow the Figma variable paths and are prefixed `--tds-` (previously
`--tapsi-`), so this release is not compatible with 0.x.

The 0.8.0 tokens are still shipped, unchanged and under their original
`--tapsi-*` names, as `@tapsioss/theme/legacy/tokens.css`. Because the two sets
share no name, an app using the Lit components can load both and move to
`@tapsioss/react-ui` gradually: replace `@tapsioss/theme/css-variables` with
`@tapsioss/theme/legacy/tokens.css`, then add the new imports. The legacy set
has no JavaScript export.
