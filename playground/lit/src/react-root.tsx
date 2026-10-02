import * as React from "react";
import { createRoot } from "react-dom/client";

const reactRootElement = document.getElementById("react-root");

if (!reactRootElement) throw new Error("There is no `#react-root` element.");

/**
 * React host for `@tapsioss/react-components` — the `@lit/react` wrappers around
 * the Lit elements. They belong to this playground rather than the React one
 * because they render the same web components and need the same legacy tokens.
 *
 * `@tapsioss/react-ui` is NOT for this playground. It is the new, Base UI-based
 * package built on the 1.x tokens, and lives in `playground/react`.
 *
 * NOTE: imports are by package name, which the root tsconfig `paths` resolve to
 * each package's `dist` (listed before `src`), so this playground exercises the
 * BUILT output. Run `pnpm build:packages` to refresh it.
 *
 * @example import { Button } from "@tapsioss/react-components";
 */

const App = () => {
  return <></>;
};

createRoot(reactRootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
