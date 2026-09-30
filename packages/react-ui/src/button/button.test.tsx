import {
  afterEach,
  cleanupReact,
  describe,
  disposeMocks,
  expect,
  renderReact,
  setupMocks,
  test,
} from "@internals/test-helpers";

/**
 * Mirrors `packages/web-components/src/button/standard/button.test.ts`, scenario
 * for scenario, so the React port is held to the behaviour the Lit button
 * already guarantees.
 *
 * Trees are described as data rather than JSX — see `renderReact`. React
 * elements cannot cross `page.evaluate`.
 */

/** A stand-in for an icon, as a plain DOM subtree. */
const icon = (testId: string) => ({
  type: "svg",
  props: {
    "data-testid": testId,
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  children: {
    type: "circle",
    props: { cx: 12, cy: 12, r: 10, fill: "currentColor" },
  },
});

describe("🧩 button", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
    await cleanupReact(page);
  });

  test("🧪 should be automatically focused only with `autoFocus` prop", async ({
    page,
  }) => {
    // Without `autoFocus` we expect the component not to be focused.
    await renderReact(page, {
      type: "Button",
      props: { "data-testid": "test-component" },
      children: "test",
    });

    const component = page.getByTestId("test-component");

    await expect(component).not.toBeFocused();

    // With `autoFocus` we expect it to be focused.
    await renderReact(page, {
      type: "Button",
      props: { "data-testid": "test-component", autoFocus: true },
      children: "test",
    });

    await expect(component).toBeFocused();
  });

  test("🧪 should be rendered as link button and navigate to the provided url", async ({
    page,
    context,
  }) => {
    await renderReact(page, {
      type: "Button",
      props: {
        href: "https://google.com",
        target: "_blank",
        label: "test-button",
        "data-testid": "test-button",
      },
      children: "⭐️",
    });

    const btn = page.getByTestId("test-button");

    await expect(btn).toBeVisible();

    const root = page.getByRole("link");

    await expect(root).toHaveAttribute("target", "_blank");
    await expect(root).toHaveAttribute("rel", "noopener noreferrer");

    const [newPage] = await Promise.all([
      // Wait for a new page to be opened
      context.waitForEvent("page"),
      // Click the link
      btn.click(),
    ]);

    // Wait for the new tab to load completely
    await newPage.waitForLoadState("load");

    expect(newPage.url()).toContain("google.com");
  });

  test("🧪 should trigger `click` event on click", async ({ page }) => {
    await renderReact(page, {
      type: "Button",
      props: { label: "test-button", "data-testid": "test-button" },
      children: "کلیک کنید",
    });

    const btn = page.getByTestId("test-button");

    await expect(btn).toBeVisible();

    const mocks = await setupMocks(page);
    const handleClick = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(btn, "click", handleClick.ref);

    await handleClick.matchResult({ called: false });

    await btn.click();
    await handleClick.matchResult({ callCount: 1 });
  });

  test("🧪 should trigger `click` event using keyboard interaction", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Button",
      props: { label: "test-button", "data-testid": "test-button" },
      children: "کلیک کنید",
    });

    const btn = page.getByTestId("test-button");

    await page.keyboard.press("Tab");

    await expect(btn).toBeFocused();

    const mocks = await setupMocks(page);
    const handleClick = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(btn, "click", handleClick.ref);

    await handleClick.matchResult({ called: false });

    await page.keyboard.press("Enter");
    await handleClick.matchResult({ callCount: 1 });
  });

  test("🧪 should focus buttons using Tab and Shift+Tab", async ({ page }) => {
    await renderReact(page, [
      {
        type: "Button",
        props: { label: "test-button", "data-testid": "test-button-1" },
        children: "کلیک کنید",
      },
      {
        type: "Button",
        props: { label: "test-button", "data-testid": "test-button-2" },
        children: "کلیک کنید",
      },
      {
        type: "Button",
        props: {
          label: "test-button",
          "data-testid": "test-button-3",
          disabled: true,
        },
        children: "کلیک کنید",
      },
      {
        type: "Button",
        props: { label: "test-button", "data-testid": "test-button-4" },
        children: "کلیک کنید",
      },
    ]);

    const btn1 = page.getByTestId("test-button-1");
    const btn2 = page.getByTestId("test-button-2");
    const btn3 = page.getByTestId("test-button-3");
    const btn4 = page.getByTestId("test-button-4");

    await page.keyboard.press("Tab");
    await expect(btn1).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(btn2).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(btn3).not.toBeFocused();
    await expect(btn4).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(btn3).not.toBeFocused();
    await expect(btn2).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(btn1).toBeFocused();
  });

  test("🧪 should not trigger `click` event when disabled", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Button",
      props: {
        label: "test-button",
        "data-testid": "test-button",
        disabled: true,
      },
      children: "کلیک کنید",
    });

    const btn = page.getByTestId("test-button");

    await page.keyboard.press("Tab");

    await expect(btn).not.toBeFocused();

    const mocks = await setupMocks(page);
    const handleClick = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(btn, "click", handleClick.ref);

    await page.keyboard.press("Enter");
    await handleClick.matchResult({ called: false });

    // Forced deliberately: a disabled button fails Playwright's actionability
    // check, so a plain click would time out instead of proving anything. The
    // assertion is that even a click pushed through does not fire the handler.
    // eslint-disable-next-line playwright/no-force-option
    await btn.click({ force: true });
    await handleClick.matchResult({ called: false });
  });

  test("🧪 should render leading and trailing adornments", async ({ page }) => {
    await renderReact(page, {
      type: "Button",
      props: {
        label: "test-button",
        "data-testid": "test-button",
        leadingAdornment: icon("test-button-leading-slot"),
        trailingAdornment: icon("test-button-trailing-slot"),
      },
      children: "کلیک کنید",
    });

    const leading = page.getByTestId("test-button-leading-slot");
    const trailing = page.getByTestId("test-button-trailing-slot");

    await expect(leading).toBeVisible();
    await expect(trailing).toBeVisible();
  });

  test('🧪 should show spinner in loading state with `aria-busy="true"', async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Button",
      props: {
        label: "test-button",
        "data-testid": "test-button",
        loading: true,
      },
      children: "کلیک کنید",
    });

    const btn = page.getByTestId("test-button");
    const spinner = btn.locator('[data-part="spinner"]');

    await expect(spinner).toBeVisible();
    await expect(btn).toHaveAttribute("aria-busy", "true");
  });

  /* ---------------------------------------------------------------------- *
   * Design fidelity                                                        *
   *                                                                        *
   * These cover the parts of the Figma spec that type-checks and behaviour  *
   * tests cannot see. Sizes are asserted in absolute pixels because the     *
   * Dimension and Typography token groups are byte-identical across all     *
   * four themes, so they do not move with the theme. Colours are asserted   *
   * RELATIVE to the button, because those DO vary by theme and the property *
   * under test is inheritance, not a particular hex.                        *
   * ---------------------------------------------------------------------- */

  test("🧪 should size adornments to match the button size", async ({
    page,
  }) => {
    // Figma: large 24, medium 24, small 20.
    const expected = { sm: 20, md: 24, lg: 24 };

    for (const [size, px] of Object.entries(expected)) {
      await renderReact(page, {
        type: "Button",
        props: {
          size,
          "data-testid": "test-button",
          leadingAdornment: icon("adornment"),
        },
        children: "کلیک کنید",
      });

      const box = page.locator('[data-part="adornment"]');

      await expect(box).toHaveCSS("inline-size", `${String(px)}px`);
      await expect(box).toHaveCSS("block-size", `${String(px)}px`);

      // The box is what binds the size; the icon inside must fill it, or the
      // box would be the right size around a wrongly sized icon.
      const svgWidth = await page
        .getByTestId("adornment")
        .evaluate(el => Math.round(el.getBoundingClientRect().width));

      expect(svgWidth).toBe(px);
    }
  });

  test("🧪 should size a real `@tapsioss/react-icons` adornment to the button", async ({
    page,
  }) => {
    // The icon package defaults to `size="auto"` (100% of its parent), so the
    // container is the mechanism. This covers the real integration, not just a
    // raw <svg> that the stylesheet happens to stretch.
    await renderReact(page, {
      type: "Button",
      props: {
        size: "sm",
        "data-testid": "test-button",
        leadingAdornment: { type: "CircleCross", props: {} },
      },
      children: "کلیک کنید",
    });

    const box = page.locator('[data-part="adornment"]');

    await expect(box).toHaveCSS("inline-size", "20px");

    const svgWidth = await page
      .locator('[data-part="adornment"] svg')
      .evaluate(el => Math.round(el.getBoundingClientRect().width));

    expect(svgWidth).toBe(20);
  });

  test("🧪 should paint adornments with the button's content colour", async ({
    page,
  }) => {
    const appearances = [
      { variant: "default", hierarchy: "primary" },
      { variant: "destructive", hierarchy: "secondary" },
      { variant: "destructive", hierarchy: "tertiary" },
      { variant: "cta", hierarchy: "primary" },
    ];

    for (const appearance of appearances) {
      await renderReact(page, {
        type: "Button",
        props: {
          ...appearance,
          "data-testid": "test-button",
          leadingAdornment: icon("adornment"),
        },
        children: "کلیک کنید",
      });

      // `currentColor` on the icon should resolve to the button's content
      // colour, whatever the variant paints it.
      const [buttonColor, paintedFill] = await Promise.all([
        page
          .getByTestId("test-button")
          .evaluate(el => getComputedStyle(el).color),
        page
          .locator('[data-part="adornment"] circle')
          .evaluate(el => getComputedStyle(el).fill),
      ]);

      expect(paintedFill).toBe(buttonColor);
    }
  });

  test("🧪 should apply the design's nested padding to the content", async ({
    page,
  }) => {
    // Figma nests a Container (the button's own padding) around a Text Frame
    // (`gap/<size>-horizontal` as ITS padding). Applying the gap as a flex
    // `gap` collapses to nothing on a button with no adornment, which halves
    // the space around the label — this is the regression guard for that.
    const expected = {
      sm: { button: 6, label: 6 },
      md: { button: 8, label: 8 },
      lg: { button: 14, label: 10 },
    };

    for (const [size, { button, label }] of Object.entries(expected)) {
      await renderReact(page, {
        type: "Button",
        props: { size, "data-testid": "test-button" },
        children: "کلیک کنید",
      });

      await expect(page.getByTestId("test-button")).toHaveCSS(
        "padding-left",
        `${String(button)}px`,
      );
      await expect(page.locator('[data-part="content"]')).toHaveCSS(
        "padding-left",
        `${String(label)}px`,
      );
    }
  });

  test("🧪 should clip overflowing content instead of wrapping it", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Button",
      props: {
        "data-testid": "test-button",
        style: { maxInlineSize: "120px" },
      },
      children: "یک متن بسیار بسیار طولانی که در دکمه جا نمی‌شود",
    });

    const btn = page.getByTestId("test-button");

    await expect(btn).toHaveCSS("overflow-x", "hidden");
    await expect(page.locator('[data-part="content"]')).toHaveCSS(
      "white-space",
      "nowrap",
    );

    // The real assertion: every size has a fixed block-size, so a wrapped label
    // would make the control taller than the design allows.
    const { height, overflows } = await btn.evaluate(el => ({
      height: Math.round(el.getBoundingClientRect().height),
      overflows:
        el.querySelector('[data-part="content"]')!.scrollWidth > el.clientWidth,
    }));

    expect(overflows).toBe(true);
    expect(height).toBe(40);
  });

  test("🧪 should fill its container with `fullWidth`", async ({ page }) => {
    await renderReact(page, {
      type: "div",
      props: { "data-testid": "container", style: { inlineSize: "300px" } },
      children: [
        {
          type: "Button",
          props: { fullWidth: true, "data-testid": "wide" },
          children: "تمام عرض",
        },
        {
          type: "Button",
          props: { "data-testid": "narrow" },
          children: "تمام عرض",
        },
      ],
    });

    const widths = await page.getByTestId("container").evaluate(el => ({
      container: el.getBoundingClientRect().width,
      wide: el.querySelector('[data-testid="wide"]')!.getBoundingClientRect()
        .width,
      narrow: el
        .querySelector('[data-testid="narrow"]')!
        .getBoundingClientRect().width,
    }));

    expect(Math.round(widths.wide)).toBe(Math.round(widths.container));
    expect(widths.narrow).toBeLessThan(widths.container);
  });

  test("🧪 should not be pointer-activatable while loading", async ({
    page,
  }) => {
    await renderReact(page, {
      type: "Button",
      props: {
        label: "test-button",
        "data-testid": "test-button",
        loading: true,
      },
      children: "کلیک کنید",
    });

    const btn = page.getByTestId("test-button");

    // A React `onClick` runs on a delegated synthetic event and cannot stop a
    // native listener that already fired, so the pointer is blocked in CSS.
    await expect(btn).toHaveCSS("pointer-events", "none");

    const mocks = await setupMocks(page);
    const handleClick = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(btn, "click", handleClick.ref);

    // A real click at the button's own coordinates must land on what is behind
    // it, not on the button.
    const box = (await btn.boundingBox())!;

    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

    await handleClick.matchResult({ called: false });
  });

  test("🧪 should centre the loading spinner in both directions", async ({
    page,
  }) => {
    // The spinner is absolutely positioned, so it is easy to centre it in LTR
    // and have it sit at the start edge in RTL — which is what happened when it
    // used `inset-inline-start: 50%` with a `translate` percentage. The design
    // system is RTL-first, so both directions are asserted.
    for (const direction of ["rtl", "ltr"] as const) {
      // Set on <body>, not <html>: the test page declares `<body dir="rtl">`,
      // and the nearer `dir` wins for its descendants — setting it on the html
      // element leaves the button rendering RTL regardless, which made an
      // earlier version of this test pass against known-broken CSS.
      await page.evaluate(dir => {
        document.body.setAttribute("dir", dir);
      }, direction);

      await renderReact(page, {
        type: "Button",
        props: {
          label: "test-button",
          "data-testid": "test-button",
          loading: true,
        },
        children: "کلیک کنید یک متن",
      });

      const offsets = await page.getByTestId("test-button").evaluate(el => {
        const button = el.getBoundingClientRect();
        const spinner = el
          .querySelector('[data-part="spinner"]')!
          .getBoundingClientRect();

        return {
          x:
            spinner.left + spinner.width / 2 - (button.left + button.width / 2),
          y:
            spinner.top + spinner.height / 2 - (button.top + button.height / 2),
        };
      });

      // Centre-to-centre, because the spinner rotates: a rotating element's
      // bounding box grows symmetrically, so comparing edge offsets stays equal
      // even when the element is off-centre — which made an earlier version of
      // this test unable to fail.
      expect(Math.abs(offsets.x)).toBeLessThan(1.5);
      expect(Math.abs(offsets.y)).toBeLessThan(1.5);
    }

    await page.evaluate(() => {
      document.body.setAttribute("dir", "rtl");
    });
  });
  test("🧪 should order adornments by writing direction", async ({ page }) => {
    // Leading/trailing are LOGICAL positions, so the rendered order has to flip
    // with the writing direction: leading is at the left in LTR and at the
    // right in RTL. Nothing in the stylesheet may pin them to a physical side —
    // a `left`/`right` or a hardcoded `direction` would break this while every
    // other test still passed.
    // `flow` is the direction the inline axis advances in on screen: +1 when
    // the start edge is on the left, -1 when it is on the right. Multiplying by
    // it lets one set of comparisons cover both directions, so every assertion
    // below runs on every pass rather than living in a branch.
    for (const { direction, flow } of [
      { direction: "rtl", flow: -1 },
      { direction: "ltr", flow: 1 },
    ] as const) {
      // Set on <body>, not <html>: the test page declares `<body dir="rtl">`
      // and the nearer `dir` wins for its descendants — see the spinner test.
      await page.evaluate(dir => {
        document.body.setAttribute("dir", dir);
      }, direction);

      await renderReact(page, {
        type: "Button",
        props: {
          "data-testid": "test-button",
          leadingAdornment: icon("leading"),
          trailingAdornment: icon("trailing"),
        },
        children: "کلیک کنید",
      });

      const centres = await page.getByTestId("test-button").evaluate(el => {
        const centreOf = (selector: string) => {
          const rect = el.querySelector(selector)!.getBoundingClientRect();

          return rect.left + rect.width / 2;
        };

        return {
          button: el.getBoundingClientRect().left + el.clientWidth / 2,
          leading: centreOf('[data-adornment="leading"]'),
          trailing: centreOf('[data-adornment="trailing"]'),
          content: centreOf('[data-part="content"]'),
        };
      });

      // Leading precedes the label along the inline axis, and the label
      // precedes trailing.
      expect((centres.content - centres.leading) * flow).toBeGreaterThan(0);
      expect((centres.trailing - centres.content) * flow).toBeGreaterThan(0);

      // Each sits on its own side of the button, so an implementation that kept
      // the order while stacking everything at one edge — which the comparisons
      // above would accept — still fails here.
      expect(Math.sign(centres.leading - centres.button)).toBe(-flow);
      expect(Math.sign(centres.trailing - centres.button)).toBe(flow);
    }

    await page.evaluate(() => {
      document.body.setAttribute("dir", "rtl");
    });
  });
});
