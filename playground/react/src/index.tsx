import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeLayout } from "./layouts/ThemeLayout.tsx";
import { ContentsPage } from "./pages/contents.tsx";
import { PAGES } from "./routes.tsx";

// All four themes, plus the primitives they share.
//
// A real app imports one theme and needs no wrapper — each file also declares
// its tokens on `:root`. This playground imports all four so it can switch
// between them and show them side by side, which is what the
// `[data-tapsi-theme="ride-light"]` half of each file is for.
import "@tapsioss/theme/drive/dark.css";
import "@tapsioss/theme/drive/light.css";
import "@tapsioss/theme/ride/dark.css";
import "@tapsioss/theme/ride/light.css";
import "@tapsioss/theme/tokens.css";

/**
 * NOTE: imports from `@tapsioss/react-ui` are by package name. This package's
 * `tsconfig.json` sets `"paths": {}`, so they resolve through `node_modules`
 * and each package's `exports` map — i.e. the BUILT output, including the CSS
 * that `dist/button/button.js` side-effect-imports. That is the point: it is
 * the production-shaped check that Storybook, which runs from source, cannot
 * give you. Run `pnpm --filter @tapsioss/react-ui run build` to refresh it.
 *
 * ROUTING: the table of contents sits at `/`, outside the theme layout, and
 * every example page is nested inside it so they all share one set of theme
 * controls. `test.html` is a separate Vite entry and is NOT part of this
 * router — the Playwright harness loads `/test` directly.
 */

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("There is no `#root` element.");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<ContentsPage />}
        />
        <Route element={<ThemeLayout />}>
          {PAGES.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={element}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
