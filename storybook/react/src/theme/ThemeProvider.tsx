import { tokens as driveDark } from "@tapsioss/theme/drive/dark";
import { tokens as driveLight } from "@tapsioss/theme/drive/light";
import { tokens as rideDark } from "@tapsioss/theme/ride/dark";
import { tokens as rideLight } from "@tapsioss/theme/ride/light";
import { type ComponentPropsWithRef } from "react";

/**
 * Theme switching for Storybook.
 *
 * `@tapsioss/theme` deliberately ships no provider — it is framework-agnostic
 * CSS and token values, and adding one would force a React peer dependency on
 * every consumer, including the Lit side. The package's contract is a single
 * data attribute, and this is Storybook's ~20-line binding to it. The React
 * playground has its own copy for the same reason; a consumer who wants one
 * writes their own, which is all of the component below.
 *
 * No provider is needed for the common case: each theme stylesheet also
 * declares its tokens on `:root`, so importing a single theme just works.
 * Storybook imports all four, which is exactly when the attribute matters.
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

/**
 * The TypeScript token sets, keyed by the same value the attribute takes.
 *
 * The galleries read values from here so that what they print follows the
 * selected theme. CSS and TS are generated independently, so a row whose swatch
 * and printed value disagree means the two have drifted — which is the point of
 * painting from `var()` and printing from TS.
 */
export const TOKEN_SETS = {
  "ride-light": rideLight,
  "ride-dark": rideDark,
  "drive-light": driveLight,
  "drive-dark": driveDark,
} as const;

export const tokensFor = (theme: Theme) => TOKEN_SETS[theme];

export type ThemeProviderProps = {
  /** @default "ride-light" */
  theme?: Theme;
  /**
   * Paint the theme's own surface and text colour. Off by default, so the
   * provider stays a pure carrier of the attribute — but dark themes are
   * illegible on Storybook's white canvas without it.
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
   * @default true
   */
  fontSmoothing?: boolean;
} & ComponentPropsWithRef<"div">;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    theme = "ride-light",
    surface = false,
    fontSmoothing = true,
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
