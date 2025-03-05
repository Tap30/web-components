export type ColorSetSteps =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type Palette = {
  black: string;
  white: string;
  gray: Record<ColorSetSteps, string>;
  orange: Record<ColorSetSteps, string>;
  blue: Record<ColorSetSteps, string>;
  green: Record<ColorSetSteps, string>;
  yellow: Record<ColorSetSteps, string>;
  red: Record<ColorSetSteps, string>;
  purple: Record<ColorSetSteps, string>;
};

export type Color = {
  brand: string;
  gradient: Record<"brand", string>;
  surface: Record<
    | "primary"
    | "secondary"
    | "tertiary"
    | "disabled"
    | "black"
    | "white"
    | "accent"
    | "accent-light"
    | "negative"
    | "negative-light"
    | "warning"
    | "warning-light"
    | "positive"
    | "positive-light"
    | "background-primary"
    | "background-secondary"
    | "inverse-primary"
    | "inverse-secondary"
    | "overlay-light"
    | "overlay-dark",
    string
  >;
  content: Record<
    | "primary"
    | "secondary"
    | "tertiary"
    | "disabled"
    | "accent"
    | "negative"
    | "warning"
    | "positive"
    | "on-inverse"
    | "on-brand"
    | "on-accent"
    | "on-negative"
    | "on-warning"
    | "on-positive",
    string
  >;
  border: Record<
    | "primary"
    | "selected"
    | "focus"
    | "accent"
    | "negative"
    | "warning"
    | "positive"
    | "inverse-primary",
    string
  >;
};

export type Radius = Record<
  "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "full",
  string
>;

export type Spacing = Record<
  | "0"
  | "1"
  | "2"
  | "3"
  | "3-1"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14",
  string
>;

export type Stroke = Record<"0" | "1" | "2", string>;

export type TypographyVariant = {
  font: string;
  size: string;
  height: number;
  weight: number;
};

export type Typography = {
  "font-family": string;
  body: Record<"xs" | "sm" | "md" | "lg", TypographyVariant>;
  label: Record<"xxs" | "xs" | "sm" | "md" | "lg", TypographyVariant>;
  headline: Record<"xs" | "sm" | "md" | "lg", TypographyVariant>;
  display: Record<"sm" | "md" | "lg", TypographyVariant>;
};

export type Tokens = {
  palette: Palette;
  color: Color;
  radius: Radius;
  spacing: Spacing;
  stroke: Stroke;
  typography: Typography;
};
