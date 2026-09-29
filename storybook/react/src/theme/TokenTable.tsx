import { tokens as primitiveTokens } from "@tapsioss/theme/tokens";
import {
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  THEMES,
  ThemeProvider,
  tokensFor,
  type Theme,
} from "./ThemeProvider.tsx";

/**
 * Renderers for the `@tapsioss/theme` token galleries.
 *
 * Every swatch and specimen is painted with the CSS custom property itself
 * (`var(--tapsi-…)`), never with the raw JS value. That way what you see is what
 * the browser actually resolves, so a broken or renamed variable shows up as a
 * visibly unstyled cell instead of silently rendering the right colour.
 *
 * The JS value is printed alongside, read from the TypeScript set. The two are
 * generated independently, so a row where the swatch and the printed value
 * disagree means the two artifacts have drifted.
 *
 * Both follow this page's own theme picker. Docs pages are not wrapped by story
 * decorators and cannot read Storybook's toolbar globals, so
 * each block wraps *itself* in a `ThemeProvider` and reads the matching token
 * set — otherwise the swatches would paint from whichever theme's `:root` was
 * imported last while the printed values came from a hard-coded one.
 */

/** Arbitrarily nested token group, as exported by the theme package. */
type TokenNode = string | number | { [key: string]: TokenNode };

type ThemeTokens = ReturnType<typeof tokensFor>;
type PrimitiveTokens = typeof primitiveTokens;

/** Picks the group to render out of the active theme, or out of the primitives. */
type Select = (theme: ThemeTokens, primitive: PrimitiveTokens) => TokenNode;

type Entry = { variable: string; value: string };

/**
 * camelCase back to the kebab-case used in the CSS variable — the inverse of
 * the naming rule in `packages/theme/AGENTS.md`.
 *
 * The digit rule is the subtle one: a digit run that begins a segment splits
 * (`body2xSmall` → `body-2x-small`) while a trailing digit run does not
 * (`dark50` → `dark50`, `gray["50"]` → `gray-50`).
 */
const kebab = (key: string) =>
  key
    .replace(/([a-z])([0-9]+[a-z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

/** Flatten a token group to `{ variable, value }` rows, depth-first. */
const flatten = (node: TokenNode, trail: string[]): Entry[] => {
  if (typeof node !== "object") {
    return [{ variable: `--tapsi-${trail.join("-")}`, value: String(node) }];
  }

  return Object.entries(node).flatMap(([key, value]) =>
    flatten(value, [...trail, kebab(key)]),
  );
};

/**
 * Which theme the galleries are showing.
 *
 * Deliberately NOT Storybook's toolbar globals: `useGlobals` throws with
 * "preview hooks can only be called inside decorators and story functions", and
 * a docs page's MDX body is neither. The toolbar still drives every *story*; it
 * just cannot reach these blocks.
 *
 * So the galleries carry their own control. A module-level store rather than
 * React context, because MDX renders each block as a sibling — there is no
 * single element to wrap them all in.
 */
let active: Theme = "ride-light";

const listeners = new Set<() => void>();

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);

  return () => listeners.delete(onChange);
};

const setActive = (next: Theme) => {
  active = next;
  listeners.forEach(listener => listener());
};

const useActiveTheme = () => {
  const theme = useSyncExternalStore(
    subscribe,
    () => active,
    () => active,
  );

  return { theme, tokens: tokensFor(theme) };
};

/** The picker. Put one near the top of each gallery page. */
export const ThemeControls = () => {
  const { theme: activeTheme } = useActiveTheme();

  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "var(--tapsi-number-16) 0",
        fontFamily: monospace,
        fontSize: "0.8125rem",
      }}
    >
      <strong>Showing</strong>

      {THEMES.map(theme => {
        const isActive = theme === activeTheme;

        return (
          <button
            key={theme}
            type="button"
            onClick={() => setActive(theme)}
            aria-pressed={isActive}
            style={{
              font: "inherit",
              cursor: "pointer",
              padding: "0.25rem 0.625rem",
              borderRadius: "999px",
              border: "1px solid var(--tapsi-palette-gray-300)",
              background: isActive
                ? "var(--tapsi-palette-gray-800)"
                : "transparent",
              color: isActive ? "var(--tapsi-palette-gray-white)" : "inherit",
            }}
          >
            {theme}
          </button>
        );
      })}
    </div>
  );
};

const monospace =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

const surfaceStyle: CSSProperties = {
  border: "1px solid var(--tapsi-color-border-primary)",
  borderRadius: "var(--tapsi-dimension-radius-small)",
  background: "var(--tapsi-color-surface-primary)",
};

const labelStyle: CSSProperties = {
  fontFamily: monospace,
  fontSize: "0.75rem",
  lineHeight: 1.6,
  color: "var(--tapsi-color-content-primary)",
  wordBreak: "break-all",
};

const valueStyle: CSSProperties = {
  ...labelStyle,
  color: "var(--tapsi-color-content-secondary)",
};

const rowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(18rem, auto) 7rem 1fr",
  alignItems: "center",
  gap: "var(--tapsi-number-16)",
  padding: "var(--tapsi-number-8) 0",
  borderBottom: "1px solid var(--tapsi-color-border-primary)",
};

/** Wraps a gallery block in the active theme and paints its own surface. */
const Themed = (props: { children: ReactNode; style?: CSSProperties }) => {
  const { theme } = useActiveTheme();

  return (
    <ThemeProvider
      theme={theme}
      surface
      style={{
        padding: "var(--tapsi-number-16)",
        borderRadius: "var(--tapsi-dimension-radius-small)",
        margin: "var(--tapsi-number-24) 0",
        ...props.style,
      }}
    >
      {props.children}
    </ThemeProvider>
  );
};

const Grid = (props: { children: ReactNode; min?: string }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, minmax(${props.min ?? "14rem"}, 1fr))`,
      gap: "var(--tapsi-number-16)",
    }}
  >
    {props.children}
  </div>
);

/**
 * Colour swatches. Accepts any depth — `palette.gray`, `color.surface`, or
 * `color.component` with its nested button groups.
 */
export const ColorGrid = (props: { select: Select; prefix: string }) => {
  const { tokens } = useActiveTheme();

  return (
    <Themed>
      <Grid>
        {flatten(props.select(tokens, primitiveTokens), [props.prefix]).map(
          ({ variable, value }) => (
            <div
              key={variable}
              style={{ ...surfaceStyle, overflow: "hidden" }}
            >
              <div
                style={{
                  height: "4.5rem",
                  background: `var(${variable})`,
                  borderBottom: "1px solid var(--tapsi-color-border-primary)",
                }}
              />
              <div style={{ padding: "var(--tapsi-number-8)" }}>
                <div style={labelStyle}>{variable}</div>
                <div style={valueStyle}>{value}</div>
              </div>
            </div>
          ),
        )}
      </Grid>
    </Themed>
  );
};

/**
 * Length scales. `preview` picks how the value is visualised, since a hairline
 * border width and a 16rem spacing step need different shapes.
 */
export const ScaleTable = (props: {
  select: Select;
  prefix: string;
  preview: "bar" | "corner";
}) => {
  const { tokens } = useActiveTheme();

  return (
    <Themed>
      {flatten(props.select(tokens, primitiveTokens), [props.prefix]).map(
        ({ variable, value }) => (
          <div
            key={variable}
            style={rowStyle}
          >
            <div style={labelStyle}>{variable}</div>
            <div style={valueStyle}>{value}</div>

            {props.preview === "bar" ? (
              <div
                style={{
                  height: "1rem",
                  width: `var(${variable})`,
                  minWidth: "1px",
                  maxWidth: "100%",
                  background: "var(--tapsi-color-surface-accent)",
                  borderRadius: "var(--tapsi-dimension-radius-2x-small)",
                }}
              />
            ) : (
              <div
                style={{
                  height: "3rem",
                  width: "5rem",
                  borderRadius: `var(${variable})`,
                  background: "var(--tapsi-color-surface-tertiary)",
                  border: "1px solid var(--tapsi-color-border-primary)",
                }}
              />
            )}
          </div>
        ),
      )}
    </Themed>
  );
};

/**
 * Type specimens.
 *
 * Figma models typography as four independent scales rather than composite
 * styles: `fontFamily` and `fontWeight` are keyed by category (`body`, `label`,
 * …) while `fontSize` and `lineHeight` are keyed by variant (`bodyLarge`,
 * `labelSmall`, …). A specimen joins them by prefix.
 */
export const TypeScale = (props: { category: string; sample?: string }) => {
  const { tokens } = useActiveTheme();

  // The generated sets have literal keys, so they cannot be indexed by a
  // `string` category the caller supplies. Widen once, here.
  const { fontFamily, fontWeight, fontSize, lineHeight } =
    tokens.typography as {
      fontFamily: Record<string, string>;
      fontWeight: Record<string, number>;
      fontSize: Record<string, string>;
      lineHeight: Record<string, string>;
    };

  const variants = Object.keys(fontSize).filter(key =>
    key.startsWith(props.category),
  );

  return (
    <Themed>
      {variants.map(variant => {
        const size = `--tapsi-typography-font-size-${kebab(variant)}`;
        const height = `--tapsi-typography-line-height-${kebab(variant)}`;
        const family = `--tapsi-typography-font-family-${props.category}`;
        const weight = `--tapsi-typography-font-weight-${props.category}`;

        return (
          <div
            key={variant}
            style={{
              padding: "var(--tapsi-number-16) 0",
              borderBottom: "1px solid var(--tapsi-color-border-primary)",
            }}
          >
            <div style={labelStyle}>
              {size} · {height}
            </div>
            <div
              style={{
                marginTop: "var(--tapsi-number-6)",
                fontFamily: `var(${family})`,
                fontSize: `var(${size})`,
                lineHeight: `var(${height})`,
                fontWeight: `var(${weight})`,
                color: "var(--tapsi-color-content-primary)",
              }}
            >
              {props.sample ?? "پیشخوان تپسی — Tapsi Design System"}
            </div>
            <div style={{ ...valueStyle, marginTop: "var(--tapsi-number-6)" }}>
              {`size ${fontSize[variant] ?? "—"} · line-height ${
                lineHeight[variant] ?? "—"
              } · weight ${String(fontWeight[props.category] ?? "—")} · ${
                fontFamily[props.category] ?? "—"
              }`}
            </div>
          </div>
        );
      })}
    </Themed>
  );
};
