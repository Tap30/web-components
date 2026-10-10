<div align="center">

# `@tapsioss/react-ui`

</div>

<div align="center">

Collection of React components for the Tapsi Design System UI

</div>

<hr />

## Setup

Import the styles once, at the root of your app — the design tokens from
`@tapsioss/theme`, then the components' stylesheet:

```ts
import "@tapsioss/theme/tokens.css";
import "@tapsioss/theme/ride/light.css";

import "@tapsioss/react-ui/styles.css";
```

Then use the components:

```tsx
import { Button } from "@tapsioss/react-ui";
```

The components themselves import no CSS, so the package works unchanged in Node,
in test runners and with server rendering. Without the `styles.css` import they
render unstyled.
