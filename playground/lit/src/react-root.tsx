import * as React from "react";
import { createRoot } from "react-dom/client";

const reactRootElement = document.getElementById("react-root");

if (!reactRootElement) throw new Error("There is no `#react-root` element.");

/**
 * NOTE: imports from `@tapsioss/react-ui` are by package name, which the root
 * tsconfig `paths` resolve to `packages/react-ui/dist` (listed before `src`).
 * So the playground exercises the BUILT output — including the CSS that
 * `dist/button/button.js` side-effect-imports. Run
 * `pnpm --filter @tapsioss/react-ui run build` to refresh it.
 *
 * Theme tokens come from `src/index.ts`, which imports
 * `@tapsioss/theme/css-variables`. Without that, buttons render magenta.
 *
 * @example import { Button } from "@tapsioss/react-ui";
 */

const App = () => {
  return <></>;
};

createRoot(reactRootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
