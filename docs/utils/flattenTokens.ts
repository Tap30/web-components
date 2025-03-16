import type { Tokens } from "@tapsioss/theme/types";

type FlattenedPaletteEntry = {
  path: string;
  token: string;
  value: string;
};

type TokensUnion = Tokens[keyof Tokens];

const flattenTokens = (
  tokens: TokensUnion,
  prefix: string = "",
): FlattenedPaletteEntry[] => {
  const results: FlattenedPaletteEntry[] = [];

  // Helper to decide how to join prefix & key using dot vs. bracket
  const buildPath = (prefix: string, key: string): string => {
    const isKeyKebabCase = key.includes("-");
    const shouldUseBrackets = /^\d+$/.test(key) || isKeyKebabCase;

    if (!prefix) {
      return shouldUseBrackets ? `[${isKeyKebabCase ? `"${key}"` : key}]` : key;
    } else {
      return shouldUseBrackets
        ? `${prefix}[${isKeyKebabCase ? `"${key}"` : key}]`
        : `${prefix}.${key}`;
    }
  };

  const recurse = (
    currentObj: Record<string, unknown>,
    currentPrefix: string,
  ) => {
    for (const key in currentObj) {
      const value = currentObj[key];
      const newPath = buildPath(currentPrefix, key);
      const newToken = currentPrefix
        ? `${currentPrefix.replace(/\./g, "-")}-${key}`
        : key;

      // The fix: treat any non-object (string, number, boolean, etc.) as a leaf
      if (
        value === null ||
        (typeof value !== "object" && typeof value !== "function")
      ) {
        results.push({
          path: newPath,
          token: newToken,
          // Convert the value to a string if needed
          value: String(value),
        });
      } else if (typeof value === "object") {
        recurse(value as Record<string, unknown>, newPath);
      }
    }
  };

  recurse(tokens, prefix);
  return results;
};

export default flattenTokens;
