import { describe, test,expect } from "vitest";
import { cssToCssAst, hasChildren } from "./css-to-css-ast.ts";

describe("cssToCssAst", () => {
  test("parses a single CSS rule with declarations", () => {
    const css = `
      .btn {
        color: #000;
        background: white;
      }
    `;

    const ast = cssToCssAst(css);

    expect(ast.type).toBe("root");

    if (hasChildren(ast)) {
      expect(ast.children.length).toBe(1);
      const rule = ast.children[0];

      expect(rule.type).toBe("rule");
      if (rule?.type === "rule") {
        expect(rule.selector).toBe(".btn");
        expect(rule.declarations).toEqual([
          { type: "declaration", prop: "color", value: "#000" },
          { type: "declaration", prop: "background", value: "white" },
        ]);
      }
    } else {
      throw new Error("Expected root node to have children");
    }
  });

  test("parses an @media rule with nested declarations", () => {
    const css = `
      @media (max-width: 600px) {
        .card {
          padding: 1rem;
        }
      }
    `;

    const ast = cssToCssAst(css);

    expect(ast.type).toBe("root");

    if (hasChildren(ast)) {
      expect(ast.children).toHaveLength(1);

      const media = ast.children[0];

      expect(media.type).toBe("atrule");
      if (media?.type === "atrule") {
        expect(media.name).toBe("media");
        expect(media.params).toBe("(max-width: 600px)");

        if (hasChildren(media)) {
          expect(media.children).toHaveLength(1);
          const nestedRule = media.children[0];

          expect(nestedRule.type).toBe("rule");
          if (nestedRule?.type === "rule") {
            expect(nestedRule.selector).toBe(".card");
            expect(nestedRule.declarations).toEqual([
              { type: "declaration", prop: "padding", value: "1rem" },
            ]);
          }
        } else {
          throw new Error("Expected media node to have children");
        }
      }
    } else {
      throw new Error("Expected root node to have children");
    }
  });

  test("ignores unsupported nodes like comments", () => {
    const css = `
      /* This is a comment */
      .box {
        margin: 0;
      }
    `;

    const ast = cssToCssAst(css);

    expect(ast.type).toBe("root");

    if (hasChildren(ast)) {
      expect(ast.children).toHaveLength(1);
      const rule = ast.children[0];

      expect(rule.type).toBe("rule");
      if (rule?.type === "rule") {
        expect(rule.selector).toBe(".box");
      }
    } else {
      throw new Error("Expected root node to have children");
    }
  });

  test("parses broken @media into fallback atrule", () => {
    const css = `@media { .x { color: red } }`;
    const ast = cssToCssAst(css);

    expect(ast.type).toBe("root");

    if (hasChildren(ast)) {
      const media = ast.children[0];

      expect(media.type).toBe("atrule");
      if (media?.type === "atrule" && hasChildren(media)) {
        expect(media.name).toBe("media");
        expect(media.children[0]?.type).toBe("rule");
      }
    } else {
      throw new Error("Expected fallback atrule for malformed media");
    }
  });

  test("handles deeply nested @media with multiple rules", () => {
    const css = `
      @media (min-width: 768px) {
        .nav {
          display: flex;
        }
        .nav-item {
          padding: 0.5rem;
        }
      }
    `;

    const ast = cssToCssAst(css);

    expect(ast.type).toBe("root");

    if (hasChildren(ast)) {
      const media = ast.children[0];

      expect(media.type).toBe("atrule");
      if (media?.type === "atrule" && hasChildren(media)) {
        expect(media.children).toHaveLength(2);
        const selectors = media.children.map(
          (c) => c.type === "rule" && c.selector
        );

        expect(selectors).toEqual([".nav", ".nav-item"]);
      } else {
        throw new Error("Expected media node to have children");
      }
    } else {
      throw new Error("Expected root node to have children");
    }
  });
});
