import { describe, expect, test } from "vitest";
import {
  parseBackground,
  parseBorder,
  parseColor,
  parseDp,
  parseGradient,
} from "./parsers.ts";

describe("parseDp", () => {
  test("converts px to dp", () => {
    expect(parseDp("16px")).toBe("16.dp");
  });

  test("converts rem to dp (assuming 1rem = 16px)", () => {
    expect(parseDp("2rem")).toBe("32.dp");
  });

  test("returns Dp.Unspecified for unknown units", () => {
    expect(parseDp("auto")).toBe("Dp.Unspecified");
  });
});

describe("parseColor", () => {
  test("parses 6-digit hex colors", () => {
    expect(parseColor("#123456")).toBe("0xFF123456");
  });

  test("expands 3-digit hex colors", () => {
    expect(parseColor("#abc")).toBe("0xFFAABBCC");
  });
});

describe("parseGradient", () => {
  test("parses linear-gradient with hex colors", () => {
    const input = "linear-gradient(90deg, #ffffff, #000000)";
    const expected =
      "Brush.horizontalGradient(listOf(Color(0xFFFFFFFF), Color(0xFF000000)))";

    expect(parseGradient(input)).toBe(expected);
  });

  test("throws if not a linear-gradient", () => {
    expect(() => parseGradient("radial-gradient(#fff, #000)")).toThrow();
  });

  test("throws if no colors are found", () => {
    expect(() =>
      parseGradient("linear-gradient(90deg, transparent, red)"),
    ).toThrow();
  });
});

describe("parseBackground", () => {
  test("parses solid hex background", () => {
    expect(parseBackground("#333333")).toBe("Color(0xFF333333)");
  });

  test("parses linear-gradient background", () => {
    const input = "linear-gradient(90deg, #fff, #000)";

    expect(parseBackground(input)).toBe(
      "Brush.horizontalGradient(listOf(Color(0xFFFFFFFF), Color(0xFF000000)))",
    );
  });
});

describe("parseBorder", () => {
  test("parses full border string", () => {
    expect(parseBorder("2px solid #ff0000")).toBe("2.dp, Color(0xFFFF0000)");
  });

  test("handles color-first format", () => {
    expect(parseBorder("#00ff00 1px solid")).toBe("1.dp, Color(0xFF00FF00)");
  });

  test("returns default values if color or size is missing", () => {
    expect(parseBorder("solid")).toBe("Dp.Unspecified, Color(0xFF000000)");
  });
});
