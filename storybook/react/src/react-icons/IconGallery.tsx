import * as Icons from "@tapsioss/react-icons";
import {
  useDeferredValue,
  useMemo,
  useState,
  type CSSProperties,
  type ComponentType,
} from "react";
import { ThemeProvider } from "../theme/ThemeProvider.tsx";

/**
 * Gallery of every icon in `@tapsioss/react-icons`.
 *
 * The list is read from the package barrel rather than hand-maintained, so an
 * icon added to `@tapsioss/icons` appears here as soon as the package is
 * rebuilt — there is nothing to keep in step.
 *
 * NOTE: those components are **generated into `dist` at build time**;
 * `packages/react-icons/src` holds only `base-icon.tsx`. So this gallery is
 * empty unless `build:react-icons` has run, which is why `pnpm storybook:react`
 * runs it first.
 */

type IconComponent = ComponentType<{ size?: number | "auto"; title?: string }>;

const ICONS = Object.entries(Icons as Record<string, IconComponent>)
  .filter(([name]) => /^[A-Z]/.test(name))
  .sort(([a], [b]) => a.localeCompare(b));

/** `CircleCrossFill` -> "circle cross fill", so a search for "cross" hits. */
const searchable = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();

const INDEX = ICONS.map(([name, Icon]) => ({
  name,
  Icon,
  haystack: searchable(name),
}));

const monospace =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

const controlStyle: CSSProperties = {
  font: "inherit",
  padding: "0.5rem 0.75rem",
  borderRadius: "var(--tapsi-dimension-radius-small)",
  border: "1px solid var(--tapsi-color-border-primary)",
  background: "var(--tapsi-color-surface-primary)",
  color: "var(--tapsi-color-content-primary)",
  minInlineSize: "16rem",
};

export const IconGallery = () => {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(24);

  // Typing filters ~370 icons; deferring keeps the input responsive.
  const deferredQuery = useDeferredValue(query);

  const matches = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();

    if (!needle) return INDEX;

    return INDEX.filter(
      icon =>
        icon.haystack.includes(needle) ||
        icon.name.toLowerCase().includes(needle),
    );
  }, [deferredQuery]);

  return (
    <ThemeProvider
      surface
      style={{
        padding: "var(--tapsi-number-16)",
        borderRadius: "var(--tapsi-dimension-radius-small)",
        margin: "var(--tapsi-number-24) 0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          flexWrap: "wrap",
          marginBlockEnd: "var(--tapsi-number-16)",
        }}
      >
        <input
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder={`Search ${String(INDEX.length)} icons…`}
          aria-label="Search icons"
          style={controlStyle}
        />

        <label style={{ display: "inline-flex", gap: "0.5rem" }}>
          Size
          <select
            value={size}
            onChange={event => setSize(Number(event.target.value))}
            style={{ ...controlStyle, minInlineSize: "auto" }}
          >
            {[16, 20, 24, 32, 48].map(value => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}
          </select>
        </label>

        <span
          style={{
            fontFamily: monospace,
            fontSize: "0.8125rem",
            color: "var(--tapsi-color-content-secondary)",
          }}
        >
          {matches.length} shown
        </span>
      </div>

      {matches.length === 0 ? (
        <p style={{ color: "var(--tapsi-color-content-secondary)" }}>
          No icon matches “{query}”.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(8.5rem, 1fr))",
            gap: "var(--tapsi-number-8)",
          }}
        >
          {matches.map(({ name, Icon }) => (
            <button
              key={name}
              type="button"
              // Click to copy the import a consumer actually writes.
              onClick={() => {
                void navigator.clipboard?.writeText(
                  `import { ${name} } from "@tapsioss/react-icons";`,
                );
              }}
              title={`Copy import for ${name}`}
              style={{
                display: "grid",
                gap: "var(--tapsi-number-8)",
                justifyItems: "center",
                padding: "var(--tapsi-number-12) var(--tapsi-number-8)",
                borderRadius: "var(--tapsi-dimension-radius-small)",
                border: "1px solid var(--tapsi-color-border-primary)",
                background: "var(--tapsi-color-surface-primary)",
                color: "var(--tapsi-color-content-primary)",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              {/*
                No `title`: BaseIcon then marks the svg `aria-hidden`, leaving
                the visible name below as the button's accessible name. Passing
                both would announce it twice.
              */}
              <Icon size={size} />
              <span
                style={{
                  fontFamily: monospace,
                  fontSize: "0.6875rem",
                  lineHeight: 1.4,
                  color: "var(--tapsi-color-content-secondary)",
                  wordBreak: "break-word",
                  textAlign: "center",
                }}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      )}
    </ThemeProvider>
  );
};
