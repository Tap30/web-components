import { Button } from "@tapsioss/react-ui";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, THEMES, type Theme } from "./ThemeProvider.tsx";

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
 */

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("There is no `#root` element.");

const Showcase = () => (
  <div style={{ display: "grid", gap: "1.5rem" }}>
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="sm">دکمه کوچک</Button>
      <Button size="md">دکمه متوسط</Button>
      <Button size="lg">دکمه بزرگ</Button>
    </div>

    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button variant="primary">اصلی</Button>
      <Button variant="ghost">ثانویه</Button>
      <Button variant="destructive">حذف</Button>
      <Button disabled>غیرفعال</Button>
    </div>
  </div>
);

const controlStyle: React.CSSProperties = {
  font: "inherit",
  padding: "0.25rem 0.5rem",
};

const App = () => {
  const [theme, setTheme] = React.useState<Theme>("ride-light");
  const [showAll, setShowAll] = React.useState(false);

  return (
    <main style={{ padding: "1.5rem", display: "grid", gap: "1.5rem" }}>
      <fieldset
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
          border: "1px solid #ccc",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
        }}
      >
        <legend style={{ padding: "0 0.5rem" }}>Theme</legend>

        <label>
          Theme{" "}
          <select
            value={theme}
            onChange={event => setTheme(event.target.value as Theme)}
            disabled={showAll}
            style={controlStyle}
          >
            {THEMES.map(value => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={showAll}
            onChange={event => setShowAll(event.target.checked)}
          />{" "}
          Show all four at once
        </label>
      </fieldset>

      {showAll ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "1px",
            background: "#ccc",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
        >
          {THEMES.map(value => (
            <ThemeProvider
              key={value}
              theme={value}
              surface
              style={{ padding: "1.25rem", display: "grid", gap: "1rem" }}
            >
              <div
                style={{
                  font: "600 0.75rem ui-monospace, monospace",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--tapsi-color-content-tertiary)",
                }}
              >
                {value}
              </div>
              <Showcase />
            </ThemeProvider>
          ))}
        </div>
      ) : (
        <ThemeProvider
          theme={theme}
          surface
          style={{
            padding: "1.25rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
          }}
        >
          <Showcase />
        </ThemeProvider>
      )}
    </main>
  );
};

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
