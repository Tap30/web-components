import { type ComponentPropsWithRef } from "react";

/**
 * Theme switching for the React playground.
 *
 * `@tapsioss/theme` deliberately ships no provider — it is framework-agnostic
 * CSS and token values, and adding one would force a React peer dependency on
 * every consumer, including the Lit side. The package's contract is a single
 * data attribute, and this file is this playground's binding to it.
 *
 * It is duplicated in `storybook/react/src/theme/ThemeProvider.tsx` on purpose:
 * both are a handful of lines, and sharing them would mean inventing an
 * internal package for one `setAttribute`. A consumer who wants a provider
 * writes exactly this.
 *
 * None of it is required for the common case. Each theme stylesheet also
 * declares its tokens on `:root`, so importing a single theme works with no
 * wrapper at all — the attribute only matters once more than one is loaded.
 */

/**
 * A theme is a product/mode pair, and it is selected as one value — matching
 * how the token sets are built (`ride/light.css`) and how they are imported.
 */
export const THEMES = [
  "ride-light",
  "ride-dark",
  "drive-light",
  "drive-dark",
] as const;

export type Theme = (typeof THEMES)[number];

export type ThemeProviderProps = {
  /** @default "ride-light" */
  theme?: Theme;
  /**
   * Paint the theme's own surface and text colour. Off by default, so the
   * provider stays a pure carrier of the attribute.
   *
   * Uses `surface-primary` (what a surface *is* — `#ffffff` in both light
   * themes) rather than `surface-background` (the canvas *behind* surfaces,
   * which is a light grey).
   */
  surface?: boolean;
  /**
   * Render text the way the Tapsi PWA does.
   *
   * The PWA's CSS reset sets `-webkit-font-smoothing: antialiased` and
   * `text-rendering: optimizeLegibility`, which makes the same font look
   * slightly different — thinner strokes, and kerning/ligatures applied. Both
   * properties inherit, so setting them here reaches every component inside.
   *
   * NOTE: `-webkit-font-smoothing` only does anything on macOS WebKit/Blink. On
   * Windows and Linux this toggle will look like a no-op, which is a property of
   * the CSS, not of this switch.
   *
   * @default false
   */
  fontSmoothing?: boolean;
} & ComponentPropsWithRef<"div">;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    theme = "ride-light",
    surface = false,
    fontSmoothing = false,
    style,
    ...otherProps
  } = props;

  return (
    <div
      data-tapsi-theme={theme}
      data-tapsi-font-smoothing={fontSmoothing ? "pwa" : undefined}
      style={{
        ...(surface && {
          background: "var(--tapsi-color-surface-primary)",
          color: "var(--tapsi-color-content-primary)",
        }),
        // Set in BOTH states, not only when on. Storybook's docs chrome already
        // applies `-webkit-font-smoothing: antialiased` to its wrapper, so
        // leaving the off state unset would inherit that and make "off" look
        // like "on" — the comparison this switch exists for would be a no-op.
        WebkitFontSmoothing: fontSmoothing ? "antialiased" : "auto",
        MozOsxFontSmoothing: fontSmoothing ? "grayscale" : "auto",
        textRendering: fontSmoothing ? "optimizeLegibility" : "auto",
        ...style,
      }}
      {...otherProps}
    />
  );
};
