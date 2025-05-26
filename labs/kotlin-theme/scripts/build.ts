import {
  parseColor,
  parseDp,
  parseGradient,
  parseTextStyle,
} from "@lab-internals/css-to-kotlin-helpers";
import tokens from "@tapsioss/theme/tokens";
import fs from "fs";
import path from "path";

import mustache from "mustache";
import { fileURLToPath } from "url";
import { ensureDirExists } from "../../../scripts/utils.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PACKAGE_NAME = "tapsioss.designsystem.theme";
const templateDir = path.join(__dirname, "../templates/GeneratedTheme.hbs");
const outDir = path.join(__dirname, "../dist");

// TODO: move to a shared package
const logger = (message: string, scope: string = "kotlin-theme"): void => {
  const completeMessage = `[LABS][${scope}]: ${message}`;

  console.log(completeMessage);
};

/**
 * Checks whether a value is a plain object (non-null, non-array).
 */
const isObject = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null && !Array.isArray(val);

/**
 * Converts a key into a valid Kotlin property name.
 */
export const toKotlinKey = (key: string): string => {
  if (/^[0-9-]*$/.test(key)) return `\`${key}\``;
  return toCamelCase(key);
};

/**
 * Converts a kebab-case or snake_case string to camelCase.
 */
const toCamelCase = (str: string): string =>
  str.replace(/[-_]+(.)/g, (_, chr: string) => chr.toUpperCase());

/**
 * Capitalizes the first letter of a string.
 */
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Indents lines based on nesting level.
 */
const indent = (level: number) => "  ".repeat(level);

/**
 * Determines if a value is a TextStyle object with required fields.
 */
export function isTextStyleObject(obj: Record<string, unknown>): boolean {
  return "font" in obj && "size" in obj && "weight" in obj && "height" in obj;
}

/**
 * Converts a raw token value into Kotlin code.
 */
export function parseValue(value: unknown): string {
  if (typeof value === "string") {
    if (value.startsWith("linear-gradient")) return parseGradient(value);
    if (value.startsWith("#")) return `Color(${parseColor(value)})`;
    if (value.endsWith("px") || value.endsWith("rem")) return parseDp(value);
    if (value.startsWith("var(--")) {
      return resolveCssVarToKotlinPath(value);
    }

    if (value === "0") return "0.dp";
    return `"${value}"`;
  }

  if (typeof value === "number") return value.toString();
  return `"${String(value)}"`; // fallback for unknown types
}

/**
 * Converts a CSS variable like `--tapsi-palette-blue-400`
 * into a Kotlin path like `Theme.Palette.Blue.\`400\``
 */
export function resolveCssVarToKotlinPath(cssVar: string): string {
  const varName = cssVar.slice(4, -1).trim();
  const raw = varName.replace(/^--/, "");
  const parts = raw.split("-");

  // Skip brand prefix
  const themeParts = parts.slice(1);

  const kotlinPath = themeParts
    .map(part => {
      if (/^[0-9-]+$/.test(part)) return `\`${part}\``;
      return capitalize(toCamelCase(part));
    })
    .join(".");

  return kotlinPath;
}

function detectImports(kotlinCode: string): string[] {
  const importSet = new Set<string>();

  if (/Color\(/.test(kotlinCode))
    importSet.add("androidx.compose.ui.graphics.Color");
  if (/Brush\.horizontalGradient/.test(kotlinCode))
    importSet.add("androidx.compose.ui.graphics.Brush");

  if (/TextStyle\(/.test(kotlinCode))
    importSet.add("androidx.compose.ui.text.TextStyle");
  if (/FontWeight/.test(kotlinCode))
    importSet.add("androidx.compose.ui.text.font.FontWeight");
  if (/FontFamily/.test(kotlinCode))
    importSet.add("androidx.compose.ui.text.font.FontFamily");

  if (/\bdp\b/.test(kotlinCode) || /\.dp/.test(kotlinCode))
    importSet.add("androidx.compose.ui.unit.dp");
  if (/\bDp\b/.test(kotlinCode)) importSet.add("androidx.compose.ui.unit.Dp");
  if (/\bsp\b/.test(kotlinCode)) importSet.add("androidx.compose.ui.unit.sp");

  return [...importSet].sort();
}

/**
 * Recursively generates Kotlin object blocks from a nested token structure.
 */
export function generateKotlinBlock(
  obj: object,
  level = 0,
): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const safeKey = toKotlinKey(key);

    // TODO: fix this
    if (safeKey === 'fontFamily') continue;

    if (isObject(value)) {
      if (isTextStyleObject(value)) {
        lines.push(
          `${indent(level + 1)}val ${safeKey} = ${parseTextStyle(value)}`,
        );
      } else {
        lines.push(
          `${indent(level + 1)}object ${capitalize(
            safeKey,
          )} {\n${generateKotlinBlock(value, level + 1)}\n${indent(
            level + 1,
          )}}`,
        );
      }
    } else {
      lines.push(`${indent(level + 1)}val ${safeKey} = ${parseValue(value)}`);
    }
  }

  return lines.join("\n");
}

export async function generateKotlinFiles(tokens: Record<string, unknown>) {
  const template = fs.readFileSync(templateDir, "utf-8");

  await ensureDirExists(outDir);
  console.log({ outDir });

  for (const [section, value] of Object.entries(tokens)) {
    if (!isObject(value)) {
      logger(`skipping non-object token: "${section}"`);
      continue;
    }

    const block = `object ${capitalize(section)} {\n${generateKotlinBlock(value, 1)}\n}`;
    const imports = detectImports(block);

    logger(`👾 generating Kotlin contents for theme's ${section}...`);
    const output = mustache.render(template, {
      packageName: PACKAGE_NAME,
      imports,
      blocks: [block],
    });

    const fileName = `Theme${capitalize(section)}.kt`;
    const filePath = path.join(outDir, fileName);

    logger(`📁 writing generated file in \`${filePath}\`...`);
    fs.writeFileSync(filePath, output);

    logger(`✅ ${fileName} was generated successfully!`);
    logger(`---`);
  }
}

void (async () => {
  logger("🧩 generating Kotlin theme file from `@tapsioss/theme`...");
  logger(`---`);
  await generateKotlinFiles(tokens);
  logger("✨ Theme was generated successfully!");
})();
