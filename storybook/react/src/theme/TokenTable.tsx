import { type CSSProperties, type ReactNode } from "react";

/**
 * Renderers for the `@tapsioss/theme` token galleries.
 *
 * Every swatch and specimen is painted with the CSS custom property itself
 * (`var(--tapsi-…)`), never with the raw JS value. That way what you see is
 * what the browser actually resolves, so a broken or renamed variable shows up
 * as a visibly unstyled cell instead of silently rendering the right colour.
 *
 * The variable name is derived the same way `packages/theme/scripts/generate.ts`
 * derives it: the object path, joined with dashes, prefixed with `--tapsi-`.
 */

type TokenRecord = Record<string, string>;

type TypographyVariant = {
  font: string;
  size: string;
  height: number;
  weight: number;
};

const cssVar = (prefix: string, key: string) => `--tapsi-${prefix}-${key}`;

const monospace =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

const surfaceStyle: CSSProperties = {
  border: "1px solid var(--tapsi-color-border-primary)",
  borderRadius: "var(--tapsi-radius-3)",
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

const Grid = (props: { children: ReactNode; min?: string }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, minmax(${props.min ?? "13rem"}, 1fr))`,
      gap: "var(--tapsi-spacing-5)",
      margin: "var(--tapsi-spacing-6) 0",
    }}
  >
    {props.children}
  </div>
);

/**
 * Colour swatches. Works for flat records — `palette.gray`, `color.surface`,
 * `color.content`, `color.border`, `color.gradient.surface`.
 */
export const ColorGrid = (props: { tokens: TokenRecord; prefix: string }) => (
  <Grid>
    {Object.entries(props.tokens).map(([key, value]) => {
      const variable = cssVar(props.prefix, key);

      return (
        <div
          key={key}
          style={{ ...surfaceStyle, overflow: "hidden" }}
        >
          <div
            style={{
              height: "4.5rem",
              background: `var(${variable})`,
              borderBottom: "1px solid var(--tapsi-color-border-primary)",
            }}
          />
          <div style={{ padding: "var(--tapsi-spacing-4)" }}>
            <div style={labelStyle}>{variable}</div>
            <div style={valueStyle}>{value}</div>
          </div>
        </div>
      );
    })}
  </Grid>
);

/**
 * Dimension scales — spacing, radius, stroke. `preview` picks how the value is
 * visualised, since a 2px stroke and a 6rem spacing step need different shapes.
 */
export const ScaleTable = (props: {
  tokens: TokenRecord;
  prefix: string;
  preview: "bar" | "box" | "corner";
}) => (
  <div style={{ margin: "var(--tapsi-spacing-6) 0" }}>
    {Object.entries(props.tokens).map(([key, value]) => {
      const variable = cssVar(props.prefix, key);

      return (
        <div
          key={key}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(14rem, auto) 5rem 1fr",
            alignItems: "center",
            gap: "var(--tapsi-spacing-5)",
            padding: "var(--tapsi-spacing-4) 0",
            borderBottom: "1px solid var(--tapsi-color-border-primary)",
          }}
        >
          <div style={labelStyle}>{variable}</div>
          <div style={valueStyle}>{value}</div>

          {props.preview === "bar" && (
            <div
              style={{
                height: "1rem",
                width: `var(${variable})`,
                minWidth: "1px",
                background: "var(--tapsi-color-surface-accent)",
                borderRadius: "var(--tapsi-radius-1)",
              }}
            />
          )}

          {props.preview === "corner" && (
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

          {props.preview === "box" && (
            <div
              style={{
                height: "3rem",
                width: "5rem",
                background: "var(--tapsi-color-surface-primary)",
                borderStyle: "solid",
                borderColor: "var(--tapsi-color-border-accent)",
                borderWidth: `var(${variable})`,
              }}
            />
          )}
        </div>
      );
    })}
  </div>
);

/**
 * Type specimens. Each variant expands to four variables
 * (`-font`, `-size`, `-height`, `-weight`), so the sample text is styled from
 * the variables and the resolved values are listed alongside.
 */
export const TypeScale = (props: {
  variants: Record<string, TypographyVariant>;
  prefix: string;
  sample?: string;
}) => (
  <div style={{ margin: "var(--tapsi-spacing-6) 0" }}>
    {Object.entries(props.variants).map(([key, variant]) => {
      const base = `--tapsi-${props.prefix}-${key}`;

      return (
        <div
          key={key}
          style={{
            padding: "var(--tapsi-spacing-5) 0",
            borderBottom: "1px solid var(--tapsi-color-border-primary)",
          }}
        >
          <div style={labelStyle}>{base}-*</div>
          <div
            style={{
              marginTop: "var(--tapsi-spacing-3)",
              fontFamily: `var(${base}-font)`,
              fontSize: `var(${base}-size)`,
              lineHeight: `var(${base}-height)`,
              fontWeight: `var(${base}-weight)`,
              color: "var(--tapsi-color-content-primary)",
            }}
          >
            {props.sample ?? "پیشخوان تپسی — Tapsi Design System"}
          </div>
          <div style={{ ...valueStyle, marginTop: "var(--tapsi-spacing-3)" }}>
            {`size ${variant.size} · height ${String(variant.height)} · weight ${String(variant.weight)}`}
          </div>
        </div>
      );
    })}
  </div>
);
