import postcss, { type ChildNode } from "postcss";
import safeParser from "postcss-safe-parser";
import { type VNode } from "./types.ts";

/**
 * Checks whether a VNode has a `children` array.
 *
 * @param node - The VNode to check.
 * @returns True if the node is a `root` or `atrule`, both of which contain children.
 */
export const hasChildren = (
  node: VNode,
): node is Extract<VNode, { children: VNode[] }> => {
  return node.type === "root" || node.type === "atrule";
};

/**
 * Parses a PostCSS `ChildNode` (rule or at-rule) into a `VNode`.
 *
 * @param {ChildNode} node - A PostCSS node to convert.
 * @returns {VNode | null} A `VNode` representation or `null` if the node type is unsupported.
 */
export const parseNode = (node: ChildNode): VNode | null => {
  if (node.type === "rule") {
    const rule = node;

    return {
      type: "rule",
      selector: rule.selector,
      declarations: rule.nodes
        .filter(n => n.type === "decl")
        .map(decl => ({
          type: "declaration",
          prop: decl.prop,
          value: decl.value,
        })),
    };
  }

  if (node.type === "atrule") {
    const atrule = node;

    if (!/^[a-zA-Z]+$/.test(atrule.name)) return null;

    return {
      type: "atrule",
      name: atrule.name,
      params: atrule.params,
      children: (atrule.nodes?.map(parseNode).filter(Boolean) as VNode[]) || [],
    };
  }

  // Unsupported node types (e.g., comments, unknown) are ignored
  return null;
};

/**
 * Converts a raw CSS string into a simplified custom CSS AST (`VNode` structure).
 *
 * This function uses PostCSS with the `safeParser` to handle both valid and malformed CSS.
 * It supports `rule`, `atrule`, and `declaration` node types, and safely skips over unknown nodes.
 *
 * @param {string} css - The raw CSS string to convert.
 * @returns {VNode} A root-level `VNode` representing the parsed CSS AST.
 *
 * @example
 * cssToCssAst(`
 *   .btn {
 *     color: #000;
 *   }
 *   @media (max-width: 600px) {
 *     .btn {
 *       color: red;
 *     }
 *   }
 * `);
 */
export const cssToCssAst = (css: string): VNode => {
  try {
    const root = postcss().process(css, { parser: safeParser }).root;

    return {
      type: "root",
      children: root.nodes.map(parseNode).filter(Boolean) as VNode[],
    };
  } catch (err) {
    console.error("Failed to parse CSS to AST:", err);
    return {
      type: "root",
      children: [],
    };
  }
};
