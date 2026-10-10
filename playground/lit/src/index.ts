// Tokens for the Lit generation of the design system.
//
// `legacy/tokens.css` is the `@tapsioss/theme@0.8.0` token set, shipped unchanged
// inside the current theme package under its original `--tapsi-*` names. It is
// what the components in `@tapsioss/web-components` reference; without it they
// render with no spacing and square corners.
//
// The current tokens are `--tds-*` and share no name with these, so an app
// moving to `@tapsioss/react-ui` loads both side by side. They live next door
// in `playground/react`. See `packages/theme/AGENTS.md` §8b.
import "@tapsioss/theme/legacy/tokens.css";

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
