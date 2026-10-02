// Tokens for the Lit generation of the design system.
//
// This resolves to the PUBLISHED `@tapsioss/theme@0.8.0`, not the workspace 1.x
// — see this package's `package.json`, which pins it, and `tsconfig.json`, which
// resets the root `paths` map so the pin is what actually wins.
//
// 0.8.0 is the flat, pre-1.0 token set that the components in
// `@tapsioss/web-components` reference. Without it they render with no spacing
// and square corners. The workspace 1.x cannot style them: it renamed almost
// everything (`spacing` → `number`, `radius-N` → `dimension-radius-*`,
// `typography-<category>-<size>-*` → `typography-font-size-*`).
//
// The current tokens live next door in `playground/react`. See
// `packages/theme/AGENTS.md`.
import "@tapsioss/theme/css-variables";

/*
Import modules using path aliases.

Option 1: Register elements manually.
i.e.:
```
import { registerAvatar } from "@tapsioss/web-components";
register();
```

Option 2: Register elements automatically.
i.e.:
```
import "@tapsioss/web-components/avatar/element";
```

Option 3: Register all the components.
i.e.:
```
import { registerAll } from "@tapsioss/web-components";
registerAll();
```
*/
