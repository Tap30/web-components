---
"@tapsioss/theme": major
---

Rebuild the design tokens as two composable layers: a primitive set
(`tokens.css` / `tokens`) and per-product themes (`<product>/<mode>.css`), each
declared on `:root` and on `[data-tapsi-theme="<product>-<mode>"]`. Token names
follow the Figma variable paths, so this release is not compatible with 0.x.
