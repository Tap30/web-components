import {
  afterEach,
  callback,
  callbackCalls,
  cleanupReact,
  describe,
  expect,
  renderReact,
  test,
} from "@internals/test-helpers";

/**
 * There is no Lit equivalent to mirror: `@tapsioss/web-components` never had a
 * row. These tests cover the Row's own behaviour and the parts of the Figma
 * spec (Rasti DS node 33094:18205) that type-checks cannot see.
 *
 * Trees are described as data rather than JSX — see `renderReact`. React
 * elements cannot cross `page.evaluate`.
 */

/**
 * A stand-in for an icon, as a plain DOM subtree. `"100%"` reproduces
 * `@tapsioss/react-icons`' default `size="auto"`, which fills its parent.
 */
const icon = (testId: string, size: number | "100%" = "100%") => ({
  type: "svg",
  props: {
    "data-testid": testId,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  },
  children: {
    type: "circle",
    props: { cx: 12, cy: 12, r: 10, fill: "currentColor" },
  },
});

const LONG_TEXT =
  "یک متن بسیار طولانی که در یک خط جا نمی‌شود و باید به خط بعد برود";

const rectOf = (page: Parameters<typeof cleanupReact>[0], testId: string) =>
  page.getByTestId(testId).evaluate(el => {
    const { width, height } = el.getBoundingClientRect();

    return { width: Math.round(width), height: Math.round(height) };
  });

describe("🧩 row", () => {
  afterEach(async ({ page }) => {
    await cleanupReact(page);
  });

  test("🧪 should render the label and description", async ({ page }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        description: "توضیحات",
      },
    });

    const row = page.getByTestId("row");

    await expect(row.locator('[data-part="label"]')).toHaveText("عنوان");
    await expect(row.locator('[data-part="description"]')).toHaveText(
      "توضیحات",
    );
  });

  test("🧪 should not render a description when none is given", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: { "data-testid": "row", label: "عنوان" },
    });

    const row = page.getByTestId("row");

    await expect(row.locator('[data-part="label"]')).toBeVisible();
    await expect(row.locator('[data-part="description"]')).toHaveCount(0);
  });

  test("🧪 should render leading and trailing slots", async ({ page }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        leading: icon("leading-slot"),
        trailing: icon("trailing-slot"),
      },
    });

    await expect(page.getByTestId("leading-slot")).toBeVisible();
    await expect(page.getByTestId("trailing-slot")).toBeVisible();
  });

  test("🧪 should render no slot wrappers when the slots are empty", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: { "data-testid": "row", label: "عنوان" },
    });

    const row = page.getByTestId("row");

    await expect(row.locator('[data-part="leading"]')).toHaveCount(0);
    await expect(row.locator('[data-part="trailing"]')).toHaveCount(0);
  });

  test("🧪 should keep `0` as slot content", async ({ page }) => {
    // `0` is a valid ReactNode; a `&&` guard would render it outside the slot.
    await renderReact(page, {
      type: "Row",
      props: { "data-testid": "row", label: "عنوان", trailing: 0 },
    });

    await expect(
      page.getByTestId("row").locator('[data-part="trailing"]'),
    ).toHaveText("0");
  });

  test("🧪 should place leading at the inline start and trailing at the end", async ({
    page,
  }) => {
    // The test page is `dir="rtl"`, as the design is: leading on the right.
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        leading: icon("leading-slot"),
        trailing: icon("trailing-slot"),
      },
    });

    const [leadingX, trailingX] = await Promise.all([
      page
        .getByTestId("leading-slot")
        .evaluate(el => el.getBoundingClientRect().x),
      page
        .getByTestId("trailing-slot")
        .evaluate(el => el.getBoundingClientRect().x),
    ]);

    expect(leadingX).toBeGreaterThan(trailingX);
  });

  test("🧪 should show the badge only with `badge` and a leading slot", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        leading: icon("leading-slot"),
      },
    });

    const badge = page.getByTestId("row").locator('[data-part="badge"]');

    await expect(badge).toHaveCount(0);

    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        leading: icon("leading-slot"),
        badge: true,
      },
    });

    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute("aria-hidden", "true");

    // Without a leading slot there is nothing to badge.
    await renderReact(page, {
      type: "Row",
      props: { "data-testid": "row", label: "عنوان", badge: true },
    });

    await expect(badge).toHaveCount(0);
  });

  test("🧪 should render as another element through `render`", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "ul",
      children: {
        type: "Row",
        props: {
          "data-testid": "row",
          label: "عنوان",
          render: { type: "li" },
        },
      },
    });

    const row = page.getByTestId("row");

    await expect(row).toHaveJSProperty("tagName", "LI");
    await expect(row.locator('[data-part="label"]')).toHaveText("عنوان");
  });

  test("🧪 should forward native props and merge `className`", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        id: "row-id",
        role: "listitem",
        className: "consumer-class",
        label: "عنوان",
      },
    });

    const row = page.getByTestId("row");

    await expect(row).toHaveAttribute("id", "row-id");
    await expect(row).toHaveAttribute("role", "listitem");
    await expect(row).toHaveClass(/consumer-class/);
    // The consumer's class is added to, not swapped for, the row's own.
    await expect(row).toHaveCSS("display", "flex");
  });

  test("🧪 should fill its parent, whatever element it is", async ({
    page,
  }) => {
    const variants = [
      {},
      { onClick: callback("onClick") },
      { href: "#row" },
      { render: { type: "li" } },
    ];

    for (const variant of variants) {
      await renderReact(page, {
        type: "div",
        props: { style: { inlineSize: "400px" } },
        children: {
          type: "Row",
          props: { "data-testid": "row", label: "عنوان", ...variant },
        },
      });

      expect((await rectOf(page, "row")).width).toBe(400);
    }
  });

  /* ---------------------------------------------------------------------- *
   * Element: the row decides, not the consumer                             *
   * ---------------------------------------------------------------------- */

  test("🧪 should render as a button when `onClick` is a function", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        onClick: callback("onClick"),
      },
    });

    const row = page.getByRole("button", { name: "عنوان" });

    await expect(row).toHaveJSProperty("tagName", "BUTTON");
    // Never a submit button, so a row inside a form cannot submit it.
    await expect(row).toHaveAttribute("type", "button");
  });

  test("🧪 should call `onClick` on click and on keyboard activation", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        onClick: callback("onClick"),
      },
    });

    const row = page.getByTestId("row");

    // Reachable by keyboard: a static row is not, a clickable one must be.
    await page.keyboard.press("Tab");
    await expect(row).toBeFocused();

    await page.keyboard.press("Enter");
    expect(await callbackCalls(page, "onClick")).toBe(1);

    await page.keyboard.press("Space");
    expect(await callbackCalls(page, "onClick")).toBe(2);

    await row.click();
    expect(await callbackCalls(page, "onClick")).toBe(3);
  });

  test("🧪 should render as a link and navigate when `href` is a string", async ({
    page,
    context,
  }) => {
    // Served by the test itself on the reserved `.test` TLD — no network.
    const target = "https://row-target.test/";

    await context.route(`${target}**`, route =>
      route.fulfill({
        contentType: "text/html",
        body: "<!doctype html><title>blank</title>",
      }),
    );

    await renderReact(page, {
      type: "Row",
      props: { "data-testid": "row", label: "عنوان", href: target },
    });

    const row = page.getByRole("link", { name: "عنوان" });

    await expect(row).toHaveJSProperty("tagName", "A");
    await expect(row).toHaveAttribute("href", target);
    await expect(row).not.toHaveAttribute("rel");

    await row.click();
    await page.waitForURL(target);
  });

  test('🧪 should add `rel="noopener noreferrer"` to a link opening a new tab', async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        href: "#row",
        target: "_blank",
      },
    });

    const row = page.getByTestId("row");

    await expect(row).toHaveAttribute("target", "_blank");
    await expect(row).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("🧪 should prefer `href` over `onClick`, and still call `onClick`", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        // In-page, so the click does not navigate away.
        href: "#row",
        onClick: callback("onClick"),
      },
    });

    const row = page.getByTestId("row");

    await expect(row).toHaveJSProperty("tagName", "A");

    await row.click();
    expect(await callbackCalls(page, "onClick")).toBe(1);
  });

  test("🧪 should ignore `render` when `href` or `onClick` decides the element", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        onClick: callback("onClick"),
        render: { type: "li" },
      },
    });

    await expect(page.getByTestId("row")).toHaveJSProperty("tagName", "BUTTON");

    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        href: "#row",
        render: { type: "li" },
      },
    });

    await expect(page.getByTestId("row")).toHaveJSProperty("tagName", "A");
  });

  test("🧪 should stay a static row for a non-function `onClick` or non-string `href`", async ({
    page,
  }) => {
    // What a plain-JS consumer can still send: checked by type, not truthiness.
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        href: 42,
        onClick: "not-a-function",
      },
    });

    const row = page.getByTestId("row");

    await expect(row).toHaveJSProperty("tagName", "DIV");
    await expect(row).not.toHaveAttribute("href");
  });

  test("🧪 should look the same whichever element it renders as", async ({
    page,
  }) => {
    const metricsOf = () =>
      page.getByTestId("row").evaluate(el => {
        const s = getComputedStyle(el);
        const { width, height } = el.getBoundingClientRect();

        return {
          width: Math.round(width),
          height: Math.round(height),
          padding: s.padding,
          border: s.borderStyle,
          background: s.backgroundColor,
          textAlign: s.textAlign,
        };
      });

    const base = {
      "data-testid": "row",
      label: "عنوان",
      description: "توضیحات",
    };

    await renderReact(page, { type: "Row", props: base });

    const asDiv = await metricsOf();

    await renderReact(page, {
      type: "Row",
      props: { ...base, onClick: callback("onClick") },
    });

    expect(await metricsOf()).toEqual(asDiv);

    await renderReact(page, {
      type: "Row",
      props: { ...base, href: "#row" },
    });

    expect(await metricsOf()).toEqual(asDiv);
  });

  /* ---------------------------------------------------------------------- *
   * Design fidelity                                                        *
   *                                                                        *
   * Sizes are asserted in absolute pixels because the Dimension and         *
   * Typography token groups are byte-identical across all four themes.      *
   * Colours are asserted RELATIVE to each other, because those vary by      *
   * theme and the property under test is which token a part uses.          *
   * ---------------------------------------------------------------------- */

  test("🧪 should match Figma's row metrics", async ({ page }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        leading: icon("leading-slot"),
        trailing: icon("trailing-slot"),
      },
    });

    const row = page.getByTestId("row");

    // Dimension/Component/Row/*: padding 16, gap 12, min size 56.
    await expect(row).toHaveCSS("padding-inline-start", "16px");
    await expect(row).toHaveCSS("padding-inline-end", "16px");
    await expect(row).toHaveCSS("column-gap", "12px");
    await expect(row).toHaveCSS("min-block-size", "56px");

    const container = row.locator('[data-part="container"]');

    await expect(container).toHaveCSS("padding-block-start", "12px");
    await expect(container).toHaveCSS("padding-block-end", "12px");
    await expect(container).toHaveCSS("column-gap", "12px");
  });

  test("🧪 should size auto-sized icons to 24px in both slots", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        leading: icon("leading-slot"),
        trailing: [icon("chevron"), icon("trailing-slot")],
      },
    });

    for (const testId of ["leading-slot", "chevron", "trailing-slot"]) {
      expect(await rectOf(page, testId)).toEqual({ width: 24, height: 24 });
    }

    // Figma: `gap-[4px]` between trailing items.
    await expect(
      page.getByTestId("row").locator('[data-part="trailing"]'),
    ).toHaveCSS("column-gap", "4px");
  });

  test("🧪 should draw the divider under the content only when enabled", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: { "data-testid": "row", label: "عنوان" },
    });

    // Figma draws the divider as an overlay on the Container, so it is read
    // from the pseudo-element, not the Container's own border.
    const divider = () =>
      page
        .getByTestId("row")
        .locator('[data-part="container"]')
        .evaluate(el => {
          const after = getComputedStyle(el, "::after");

          return {
            content: after.content,
            width: after.borderBottomWidth,
            style: after.borderBottomStyle,
          };
        });

    // On by default, as in Figma.
    expect(await divider()).toEqual({
      content: '""',
      width: "1px",
      style: "solid",
    });

    // It overlays rather than adds: the row stays Figma's 76px
    // (12 + 28 + 24 + 12) with a description, and 56px without one.
    expect((await rectOf(page, "row")).height).toBe(56);

    await renderReact(page, {
      type: "Row",
      props: { "data-testid": "row", label: "عنوان", divider: false },
    });

    expect((await divider()).content).toBe("none");
  });

  test("🧪 should swap label and description styles when reversed", async ({
    page,
  }) => {
    const styleOf = (part: string) =>
      page
        .getByTestId("row")
        .locator(`[data-part="${part}"]`)
        .evaluate(el => {
          const s = getComputedStyle(el);

          return {
            fontSize: s.fontSize,
            fontWeight: s.fontWeight,
            lineHeight: s.lineHeight,
            color: s.color,
          };
        });

    // Label/Medium in Content/Primary over Body/Small in Content/Tertiary.
    const prominent = {
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "28px",
    };

    const muted = { fontSize: "14px", fontWeight: "400", lineHeight: "24px" };

    await renderReact(page, {
      type: "Row",
      props: { "data-testid": "row", label: "عنوان", description: "توضیحات" },
    });

    const standardLabel = await styleOf("label");
    const standardDescription = await styleOf("description");

    expect(standardLabel).toMatchObject(prominent);
    expect(standardDescription).toMatchObject(muted);
    expect(standardLabel.color).not.toBe(standardDescription.color);

    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        label: "عنوان",
        description: "توضیحات",
        reversed: true,
      },
    });

    // Same two styles, the other way round — so the colours swap too.
    expect(await styleOf("label")).toEqual(standardDescription);
    expect(await styleOf("description")).toEqual(standardLabel);
  });

  test("🧪 should grow, not clip, when the label wraps", async ({ page }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        style: { inlineSize: "200px" },
        label: LONG_TEXT,
      },
    });

    const { height } = await rectOf(page, "row");

    expect(height).toBeGreaterThan(56);
  });

  test("🧪 should truncate each line with an ellipsis when `textOverflow` is `ellipsis`", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Row",
      props: {
        "data-testid": "row",
        style: { inlineSize: "200px" },
        label: LONG_TEXT,
        description: LONG_TEXT,
        textOverflow: "ellipsis",
      },
    });

    // One line each, so the row keeps Figma's height: 12 + 28 + 24 + 12.
    expect((await rectOf(page, "row")).height).toBe(76);

    for (const part of ["label", "description"]) {
      const text = page.getByTestId("row").locator(`[data-part="${part}"]`);

      await expect(text).toHaveCSS("text-overflow", "ellipsis");
      await expect(text).toHaveCSS("white-space", "nowrap");

      // The text really is cut off, rather than just fitting.
      const truncated = await text.evaluate(
        el => el.scrollWidth > el.clientWidth,
      );

      expect(truncated).toBe(true);
    }
  });

  test("🧪 should truncate inside a narrow parent rather than widen it", async ({
    page,
  }) => {
    // The common layout: rows stacked in a grid or flex column. The row must
    // take the parent's width, not grow to its unwrapped text.
    await renderReact(page, {
      type: "div",
      props: {
        "data-testid": "parent",
        style: { display: "grid", maxInlineSize: "200px" },
      },
      children: {
        type: "Row",
        props: {
          "data-testid": "row",
          label: LONG_TEXT,
          textOverflow: "ellipsis",
        },
      },
    });

    expect((await rectOf(page, "row")).width).toBe(200);

    const truncated = await page
      .getByTestId("row")
      .locator('[data-part="label"]')
      .evaluate(el => el.scrollWidth > el.clientWidth);

    expect(truncated).toBe(true);
  });
});
