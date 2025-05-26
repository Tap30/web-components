/* eslint-disable no-console */
import type { VNode } from "./types";
import { parseDp, parseBorder, parseBackground } from "./parsers.ts";

/**
 * Converts a CSS AST (VNode) into a string of Jetpack Compose Modifier chains.
 *
 * @param vnode - The root VNode (type: "root").
 * @returns A Kotlin source snippet containing modifier definitions.
 */
export function cssAstToModifier(vnode: VNode): string {
  const output: string[] = [];

  function walk(node: VNode): void {
    if (node.type === "rule") {
      const name = sanitizeSelector(node.selector);
      const modifiers = generateModifierChain(node.declarations);

      output.push(`// Styles for ${node.selector}`);
      output.push(`val ${name} = ${modifiers}\n`);
    }

    if (node.type === "atrule") {
      output.push(`// @${node.name} ${node.params}`);
      node.children.forEach(walk);
    }

    if (node.type === "root") {
      node.children.forEach(walk);
    }
  }

  walk(vnode);
  return output.join("\n");
}

/**
 * Converts a list of CSS declarations into a chained Modifier expression.
 *
 * @param declarations - Array of declaration nodes.
 * @returns A string representing Modifier chaining (e.g., "Modifier.padding(16.dp).width(100.dp)").
 */
const generateModifierChain = (declarations: VNode[]): string => {
  const mods: string[] = [];

  for (const decl of declarations) {
    if (decl.type !== "declaration") continue;

    const mod = cssPropertyToModifier(decl);

    if (mod) {
      mods.push(mod);
    } else {
      console.warn(`No conversion for CSS property: ${decl.prop}`);
    }
  }

  if (mods.length === 0) {
    console.error("No Modifier chains were generated");
  }

  return ["Modifier", ...mods].join("");
};

/**
 * Converts a CSS property declaration into a Modifier chain segment.
 *
 * @param decl - A declaration node.
 * @returns A Modifier segment string or undefined if unsupported.
 */
const cssPropertyToModifier = (
  decl: Extract<VNode, { type: "declaration" }>
): string | undefined => {
  const { prop, value } = decl;

  switch (prop) {
    case "padding":
      return `.padding(${parseDp(value)})`;

    case "margin":
      console.warn("margin not directly supported; using padding instead");
      return `.padding(${parseDp(value)})`;

    case "width":
      return `.width(${parseDp(value)})`;

    case "height":
      return `.height(${parseDp(value)})`;

    case "background-color":
      return `.background(${parseBackground(value)})`;

    case "border-radius":
      return `.clip(RoundedCornerShape(${parseDp(value)}))`;

    case "border":
      return `.border(${parseBorder(value)})`;

    // case "color":
    //   return `.then(textColor(Color(${parseColor(value)})))`;

    default:
      return undefined;
  }
};

/**
 * Converts a CSS selector into a safe Kotlin variable name.
 *
 * @param selector - A CSS selector (e.g., ".btn-primary").
 * @returns A sanitized string safe to use as a Kotlin identifier.
 */
export const sanitizeSelector = (selector: string): string => {
  return selector
    .replace(/[^a-zA-Z0-9]/g, "_") // replace invalid chars
    .replace(/^_+|_+$/g, "") // trim leading/trailing _
    .replace(/_+/g, "_"); // collapse multiple _ into one
};
/* eslint-enable no-console */
