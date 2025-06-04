// TODO: handle css variables

/**
 * Converts a CSS length value to Jetpack Compose's `dp` unit.
 * Supports `px` and `rem` units. Falls back to `Dp.Unspecified` for unsupported formats.
 *
 * @param {string} value - The CSS value to convert (e.g., "16px", "1.5rem").
 * @returns {string} The Jetpack Compose representation (e.g., "16.dp").
 */
export const parseDp = (value: string): string => {
  const trimmed = value.trim();

  if (trimmed.endsWith("px")) {
    return `${parseFloat(trimmed)}.dp`;
  }

  if (trimmed.endsWith("rem")) {
    const rem = parseFloat(trimmed);
    const px = rem * 16; // 1rem = 16px (adjust if needed)

    return `${px}.dp`;
  }

  return `Dp.Unspecified`; // Fallback for unsupported units
};

/**
 * Converts a CSS hex color to Jetpack Compose color format.
 * Expands 3-digit hex codes and adds alpha prefix.
 *
 * @param {string} value - The CSS hex color (e.g., "#fff", "#123456").
 * @returns {string} A Jetpack Compose color string (e.g., "0xFFFFFFFF").
 */
export const parseColor = (value: string): string => {
  let hex = value.trim().replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(c => c + c)
      .join("");
  }

  return `0xFF${hex.toUpperCase()}`;
};

/**
 * Converts a CSS `linear-gradient` string into Jetpack Compose's horizontalGradient brush.
 * Only supports hex colors (ignores angle/direction for now).
 *
 * @param {string} value - A CSS linear-gradient string.
 * @returns {string} A Jetpack Compose `Brush.horizontalGradient(...)` call.
 * @throws {Error} If the format is incorrect or contains no valid hex colors.
 */
export const parseGradient = (value: string): string => {
  if (!value.startsWith("linear-gradient")) {
    throw new Error("value should start with `linear-gradient`.");
  }

  const hexColors = [...value.matchAll(/#([0-9a-fA-F]{3,8})/g)].map(match => {
    const hex = match[0]; // full match with "#"

    return `Color(${parseColor(hex)})`;
  });

  if (hexColors.length === 0) {
    throw new Error("No hex colors found in gradient.");
  }

  return `Brush.horizontalGradient(listOf(${hexColors.join(", ")}))`;
};

/**
 * Converts a CSS background value to Jetpack Compose color or brush.
 * Supports solid hex color or linear-gradient.
 *
 * @param {string} value - A CSS background value.
 * @returns {string} A Jetpack Compose expression.
 */
export const parseBackground = (value: string): string => {
  if (value.trim().startsWith("linear-gradient")) {
    return parseGradient(value);
  }

  return `Color(${parseColor(value)})`;
};

/**
 * Parses a CSS border declaration and converts it to Jetpack Compose border values.
 * Only supports format like "1px solid #000" or "1px #000 solid".
 *
 * @param {string} value - A CSS border string.
 * @returns {string} A Jetpack Compose border format (e.g., "1.dp, Color(...)").
 */
export const parseBorder = (value: string): string => {
  const parts = value.trim().split(/\s+/);
  const width = parts.find(part => part.endsWith("px") || part.endsWith("rem"));

  const color = parts.find(part => part.startsWith("#"));

  const dp = width ? parseDp(width) : "Dp.Unspecified";
  const parsedColor = color
    ? `Color(${parseColor(color)})`
    : "Color(0xFF000000)";

  return `${dp}, ${parsedColor}`;
};

export const parseTextStyle = (obj: {
  font?: string;
  size?: string;
  height?: number;
  weight?: number;
}): string => {
  const parts: string[] = [];

  if (obj.size) {
    const px = obj.size.endsWith("rem")
      ? parseFloat(obj.size) * 16
      : parseFloat(obj.size);

    parts.push(`fontSize = ${px}.sp`);
  }

  if (obj.height && obj.size) {
    const px = obj.size.endsWith("rem")
      ? parseFloat(obj.size) * 16
      : parseFloat(obj.size);

    const lineHeight = +(px * obj.height).toFixed(2);

    parts.push(`lineHeight = ${lineHeight}.sp`);
  }

  if (obj.weight) {
    // https://developer.android.com/reference/kotlin/androidx/compose/ui/text/font/FontWeight
    parts.push(`fontWeight = FontWeight.W${obj.weight}`);
  }

  return `TextStyle(${parts.join(", ")})`;
};
