/**
 * Tokens for the ride product, dark theme.
 *
 * Generated from figma-output-jsons/ride-theme-tokens/ride-dark.json. Do not hand-edit; see AGENTS.md
 * for the rules that produce this file.
 *
 * The TypeScript mirror of dark.css: same values, resolved by JS
 * reference to ../tokens.ts rather than by `var()` at CSS runtime. A
 * `var(--tapsi-*)` string must never appear in this file.
 */

import type {
  ColorTokens,
  DimensionTokens,
  ThemeTokens,
  TypographyTokens,
} from "../types.ts";

import { font, number, palette } from "../tokens.ts";

const surface = {
  primary: palette.gray["800"],
  secondary: palette.gray["700"],
  tertiary: palette.gray["600"],
  background: palette.gray.black,
  accent: palette.blue["500"],
  accentLight: palette.blue["900"],
  negative: palette.red["500"],
  negativeLight: palette.red["900"],
  positive: palette.green["500"],
  positiveLight: palette.green["900"],
  warning: palette.yellow["500"],
  warningLight: palette.yellow["900"],
  brand: palette.orange["400"],
  inversePrimary: palette.gray.white,
  inverseSecondary: palette.gray["100"],
  disabled: palette.gray["700"],
  selected: palette.gray["700"],
} as const;

const content = {
  primary: palette.gray.white,
  secondary: palette.gray["300"],
  tertiary: palette.gray["500"],
  accent: palette.blue["300"],
  accentBolder: palette.blue["700"],
  onAccent: palette.gray.white,
  negative: palette.red["300"],
  negativeBolder: palette.red["700"],
  onNegative: palette.gray.white,
  positive: palette.green["300"],
  positiveBolder: palette.green["700"],
  onPositive: palette.gray.white,
  warning: palette.yellow["300"],
  warningBolder: palette.yellow["700"],
  onWarning: palette.gray.black,
  brand: palette.orange["400"],
  onBrand: palette.gray.white,
  onInverse: palette.gray.black,
  disabled: palette.gray["600"],
  selected: palette.gray["600"],
} as const;

const radius = {
  none: number["0"],
  "2xSmall": number["2"],
  xSmall: number["4"],
  small: number["8"],
  medium: number["12"],
  large: number["16"],
  xLarge: number["20"],
  "2xLarge": number["24"],
  full: number["999"],
} as const;

export const color = {
  surface,
  content,
  border: {
    primary: palette.gray["700"],
    secondary: palette.gray["700"],
    accent: palette.blue["300"],
    negative: palette.red["300"],
    positive: palette.green["300"],
    warning: palette.yellow["300"],
    brand: palette.orange["300"],
    inverse: palette.gray["200"],
    disabled: palette.gray["200"],
    selected: palette.gray["200"],
  },
  overlay: {
    backdrop: palette.alpha.dark30,
    hovered: palette.alpha.dark10,
    pressed: palette.alpha.dark20,
  },
  component: {
    button: {
      surface: {
        cta: surface.brand,
        default: surface.inversePrimary,
      },
      content: {
        cta: content.onBrand,
        default: content.onInverse,
      },
    },
  },
} as const satisfies ColorTokens;

export const typography = {
  fontFamily: {
    body: font.family.base,
    label: font.family.base,
    headline: font.family.base,
    display: font.family.base,
  },
  fontWeight: {
    body: font.weight["400"],
    label: font.weight["500"],
    headline: font.weight["600"],
    display: font.weight["600"],
  },
  fontSize: {
    body2xSmall: font.size["10"],
    bodyXSmall: font.size["12"],
    bodySmall: font.size["14"],
    bodyMedium: font.size["16"],
    bodyLarge: font.size["18"],
    label2xSmall: font.size["10"],
    labelXSmall: font.size["12"],
    labelSmall: font.size["14"],
    labelMedium: font.size["16"],
    labelLarge: font.size["18"],
    headlineXSmall: font.size["16"],
    headlineSmall: font.size["20"],
    headlineMedium: font.size["24"],
    headlineLarge: font.size["28"],
    displaySmall: font.size["32"],
    displayMedium: font.size["40"],
    displayLarge: font.size["48"],
  },
  lineHeight: {
    body2xSmall: "1rem",
    bodyXSmall: "1.25rem",
    bodySmall: "1.5rem",
    bodyMedium: "1.75rem",
    bodyLarge: "2rem",
    label2xSmall: "1rem",
    labelXSmall: "1.25rem",
    labelSmall: "1.5rem",
    labelMedium: "1.75rem",
    labelLarge: "2rem",
    headlineXSmall: "1.5rem",
    headlineSmall: "1.875rem",
    headlineMedium: "2.25rem",
    headlineLarge: "2.625rem",
    displaySmall: "3rem",
    displayMedium: "3.75rem",
    displayLarge: "4.5rem",
  },
} as const satisfies TypographyTokens;

export const dimension = {
  radius,
  layout: {
    grid: {
      margin: {
        horizontal: number["12"],
      },
      gap: {
        horizontal: number["16"],
        vertical: number["16"],
      },
    },
  },
  component: {
    button: {
      size: {
        small: number["32"],
        medium: number["40"],
        large: number["52"],
      },
      padding: {
        smallHorizontal: number["6"],
        mediumHorizontal: number["8"],
        largeHorizontal: number["14"],
      },
      gap: {
        smallHorizontal: number["6"],
        mediumHorizontal: number["8"],
        largeHorizontal: number["10"],
      },
      radius: {
        small: radius.full,
        medium: radius.full,
        large: radius.full,
      },
    },
    row: {
      padding: {
        horizontal: number["16"],
        vertical: number["12"],
      },
      gap: {
        horizontal: number["12"],
      },
      size: {
        default: number["56"],
      },
    },
  },
} as const satisfies DimensionTokens;

export const tokens = {
  color,
  typography,
  dimension,
} as const satisfies ThemeTokens;
