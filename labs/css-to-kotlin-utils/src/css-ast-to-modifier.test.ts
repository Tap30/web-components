import { describe, test, expect } from "vitest";
import { cssAstToModifier, sanitizeSelector } from "./css-ast-to-modifier.ts";
import type { VNode } from "./types";

describe("cssAstToModifier", () => {
  test("generates Modifier chain from a rule node", () => {
    const vnode: VNode = {
      type: "root",
      children: [
        {
          type: "rule",
          selector: ".btn",
          declarations: [
            { type: "declaration", prop: "padding", value: "16px" },
            { type: "declaration", prop: "width", value: "100px" },
          ],
        },
      ],
    };

    const result = cssAstToModifier(vnode);

    expect(result).toContain("val btn = Modifier.padding(16.dp).width(100.dp)");
  });

  test("generates modifiers for nested @media rules", () => {
    const vnode: VNode = {
      type: "root",
      children: [
        {
          type: "atrule",
          name: "media",
          params: "(max-width: 600px)",
          children: [
            {
              type: "rule",
              selector: ".card",
              declarations: [
                { type: "declaration", prop: "height", value: "200px" },
              ],
            },
          ],
        },
      ],
    };

    const result = cssAstToModifier(vnode);

    expect(result).toContain("// @media (max-width: 600px)");
    expect(result).toContain("val card = Modifier.height(200.dp)");
  });

  test("supports border and border-radius", () => {
    const vnode: VNode = {
      type: "root",
      children: [
        {
          type: "rule",
          selector: "#box",
          declarations: [
            { type: "declaration", prop: "border", value: "1px solid #000" },
            { type: "declaration", prop: "border-radius", value: "4px" },
          ],
        },
      ],
    };

    const result = cssAstToModifier(vnode);

    expect(result).toContain(
      "val box = Modifier.border(1.dp, Color(0xFF000000)).clip(RoundedCornerShape(4.dp))"
    );
  });
});

describe("sanitizeSelector", () => {
  test("replaces invalid characters", () => {
    expect(sanitizeSelector(".btn-primary")).toBe("btn_primary");
    expect(sanitizeSelector("#main-section")).toBe("main_section");
    expect(sanitizeSelector("a:hover")).toBe("a_hover");
    expect(sanitizeSelector("123box")).toBe("123box");
  });

  test("removes leading/trailing underscores", () => {
    expect(sanitizeSelector(".--weird--.thing--")).toBe("weird_thing");
  });
});
