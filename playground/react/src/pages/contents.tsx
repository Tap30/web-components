import { Link } from "react-router";
import { PAGES } from "../routes.tsx";

/**
 * The table of contents.
 *
 * Deliberately rendered OUTSIDE the theme layout: it is not an example, so it
 * carries no theme controls and is styled with plain CSS rather than tokens.
 * Everything it lists comes from `PAGES`.
 */
export const ContentsPage = () => (
  <div
    dir="ltr"
    style={{
      display: "flex",
      minBlockSize: "100dvh",
      padding: "1.5rem",
      boxSizing: "border-box",
    }}
  >
    {/*
      `margin: auto` on a flex item centres it on BOTH axes, and unlike
      `align-items: center` it stays scrollable: once the list is taller than
      the viewport the auto margins collapse to zero and the overflow spills
      downwards, where it can be reached. Centring with `align-items`/
      `place-content` would push the first entries above the top of the
      scrollable area instead, out of reach.
    */}
    <main
      style={{
        margin: "auto",
        inlineSize: "min(48rem, 100%)",
        display: "grid",
        gap: "1.5rem",
      }}
    >
      <header style={{ display: "grid", gap: "0.25rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>React Playground</h1>
        <p style={{ margin: 0, color: "#666" }}>
          Examples of <code>@tapsioss/react-ui</code>, rendered from its source:
          a change to a component shows up here immediately.
        </p>
      </header>

      <ul
        style={{
          display: "grid",
          gap: "0.75rem",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {PAGES.map(({ path, title, description }) => (
          <li key={path}>
            <Link
              to={`/${path}`}
              style={{
                display: "grid",
                gap: "0.25rem",
                padding: "0.9rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "0.5rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span style={{ fontWeight: 600 }}>{title}</span>
              <span style={{ color: "#666", fontSize: "0.875rem" }}>
                {description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </div>
);
