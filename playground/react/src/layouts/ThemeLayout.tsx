import { useState, type CSSProperties } from "react";
import { NavLink, useOutlet } from "react-router";
import { ThemeProvider, THEMES, type Theme } from "../ThemeProvider.tsx";
import { PAGES } from "../routes.tsx";

/**
 * The chrome every example page renders inside: navigation, then the theme
 * controls, then the page itself.
 *
 * Because the controls live here rather than in a page, their state survives
 * navigation — switching from Button to Playground keeps the theme you picked.
 *
 * `useOutlet()` is used instead of `<Outlet />` so the active page can be
 * rendered more than once: with "Show all four at once" the SAME element is
 * mounted in each of the four themes.
 */

const controlStyle: CSSProperties = {
  font: "inherit",
  padding: "0.25rem 0.5rem",
};

const navLinkStyle = ({ isActive }: { isActive: boolean }): CSSProperties => ({
  padding: "0.25rem 0.6rem",
  borderRadius: "0.35rem",
  textDecoration: "none",
  color: isActive ? "#fff" : "#333",
  background: isActive ? "#333" : "transparent",
});

export const ThemeLayout = () => {
  const page = useOutlet();

  const [theme, setTheme] = useState<Theme>("ride-light");
  const [showAll, setShowAll] = useState(false);
  const [fontSmoothing, setFontSmoothing] = useState(true);

  const renderNav = () => (
    <nav
      // The chrome is Latin-labelled and reads left to right, while `<body>` is
      // RTL so components are exercised the way the design system ships. Only
      // the navigation is flipped back; everything inside the theme provider
      // keeps the document's direction.
      dir="ltr"
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        flexWrap: "wrap",
        paddingBlockEnd: "0.75rem",
        borderBlockEnd: "1px solid #ccc",
      }}
    >
      <NavLink
        to="/"
        style={navLinkStyle}
        // The index route is otherwise "active" for every child path.
        end
      >
        Contents
      </NavLink>

      <span
        aria-hidden="true"
        style={{ color: "#ccc" }}
      >
        |
      </span>

      {PAGES.map(({ path, title }) => (
        <NavLink
          key={path}
          to={`/${path}`}
          style={navLinkStyle}
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );

  const renderControls = () => (
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
          onChange={event => {
            // `THEMES` is the source of the options, so the value is one of
            // them — but reading it back off the DOM loses that, and a cast is
            // not allowed. Matching against the list restores it.
            const next = THEMES.find(name => name === event.target.value);

            if (next) setTheme(next);
          }}
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

      <label title="The Tapsi PWA's CSS reset applies -webkit-font-smoothing: antialiased and text-rendering: optimizeLegibility. macOS only.">
        <input
          type="checkbox"
          checked={fontSmoothing}
          onChange={event => setFontSmoothing(event.target.checked)}
        />{" "}
        smooth font rendering (PWA style)
      </label>
    </fieldset>
  );

  const renderMatrix = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "1px",
        background: "#ccc",
        border: "1px solid #ccc",
        borderRadius: "0.5rem",
        // Clips the four panes to the rounded corners. It is safe ONLY because
        // each pane scrolls its own overflow below — without that, content
        // wider than a pane is clipped here and cannot be reached, since the
        // document does not gain a horizontal scrollbar for it.
        overflow: "hidden",
      }}
    >
      {THEMES.map(value => (
        <ThemeProvider
          key={value}
          theme={value}
          fontSmoothing={fontSmoothing}
          surface
          style={{
            padding: "1.25rem",
            display: "grid",
            gap: "1rem",
            // Anything too wide for a pane scrolls inside it. Vertical growth
            // is unaffected: the row has no fixed height, so a tall page still
            // makes the document taller rather than scrolling in here.
            overflow: "auto",
          }}
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
          {page}
        </ThemeProvider>
      ))}
    </div>
  );

  const renderSingle = () => (
    <ThemeProvider
      theme={theme}
      fontSmoothing={fontSmoothing}
      surface
      style={{
        padding: "1.25rem",
        borderRadius: "0.5rem",
        border: "1px solid #ccc",
      }}
    >
      {page}
    </ThemeProvider>
  );

  return (
    <main style={{ padding: "1.5rem", display: "grid", gap: "1.5rem" }}>
      {renderNav()}
      {renderControls()}
      {showAll ? renderMatrix() : renderSingle()}
    </main>
  );
};
