/**
 * Value-shape guards for the token sets.
 *
 * These exist to enforce the conventions in AGENTS.md at compile time rather
 * than by review. Every generated set ends with `as const satisfies …`, so a
 * length emitted in px, a colour emitted in an unsupported notation, or a font
 * weight left as a Figma label ("Regular") fails the build instead of shipping.
 */

/**
 * Lengths are rem so that a user's browser font-size setting is respected.
 * `"0"` is unitless by convention — `0rem` is legal but noisy.
 */
export type RemValue = "0" | `${number}rem`;

/**
 * Opaque colours are lowercase hex; anything with alpha is `rgba()`.
 *
 * `rgba()` rather than 8-digit hex or `rgb(r g b / a)` is deliberate: it is the
 * only one of the three that degrades safely on the older Android WebViews this
 * design system targets. The other two render as fully transparent there.
 */
export type ColorValue = `#${string}` | `rgba(${string})`;

/** CSS numeric weights. Figma stores the *name* ("Regular"); the key is the value. */
export type FontWeightValue =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

/* -------------------------------------------------------------------------- */
/* Primitive layer                                                            */
/* -------------------------------------------------------------------------- */

/** `Palette/<Hue>/<Step>` — exactly two levels deep. */
export type PaletteTokens = Readonly<
  Record<string, Readonly<Record<string, ColorValue>>>
>;

export type FontTokens = Readonly<{
  /** Includes a generic fallback, e.g. `'"Vazirmatn", sans-serif'`. */
  family: Readonly<Record<string, string>>;
  weight: Readonly<Record<string, FontWeightValue>>;
  size: Readonly<Record<string, RemValue>>;
}>;

/** The raw numeric scale every length in every theme resolves to. */
export type NumberTokens = Readonly<Record<string, RemValue>>;

export type PrimitiveTokens = Readonly<{
  palette: PaletteTokens;
  font: FontTokens;
  number: NumberTokens;
}>;

/* -------------------------------------------------------------------------- */
/* Theme layer                                                                */
/* -------------------------------------------------------------------------- */

type ColorNode = ColorValue | Readonly<{ [key: string]: ColorNode }>;

/** Arbitrarily nested, but every leaf is a colour. */
export type ColorTokens = Readonly<Record<string, ColorNode>>;

export type TypographyTokens = Readonly<{
  fontFamily: Readonly<Record<string, string>>;
  fontWeight: Readonly<Record<string, FontWeightValue>>;
  fontSize: Readonly<Record<string, RemValue>>;
  /** Absolute lengths, not the unitless ratios CSS also allows. */
  lineHeight: Readonly<Record<string, RemValue>>;
}>;

type DimensionNode = RemValue | Readonly<{ [key: string]: DimensionNode }>;

/** Arbitrarily nested, but every leaf is a rem length. */
export type DimensionTokens = Readonly<Record<string, DimensionNode>>;

export type ThemeTokens = Readonly<{
  color: ColorTokens;
  typography: TypographyTokens;
  dimension: DimensionTokens;
}>;
