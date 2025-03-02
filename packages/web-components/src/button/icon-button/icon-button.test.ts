import {
  afterEach,
  beforeEach,
  describe,
  disposeMocks,
  expect,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";

describe("🧩 icon-button", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should trigger `click` event on click", async ({ page }) => {
    await render(
      page,
      `<tapsi-icon-button label="test-icon-button" data-testid="test-icon-button">کلیک کنید</tapsi-icon-button>`,
    );

    const btn = page.getByTestId("test-icon-button");

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
    await render(
      page,
      `<tapsi-icon-button label="test-icon-button" data-testid="test-icon-button">کلیک کنید</tapsi-icon-button>`,
    );

    const btn = page.getByTestId("test-icon-button");

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
    await render(
      page,
      `
      <tapsi-icon-button label="test-icon-button" data-testid="test-icon-button-1">کلیک کنید</tapsi-icon-button>
      <tapsi-icon-button label="test-icon-button" data-testid="test-icon-button-2">کلیک کنید</tapsi-icon-button>
      <tapsi-icon-button label="test-icon-button" data-testid="test-icon-button-3" disabled>کلیک کنید</tapsi-icon-button>
      <tapsi-icon-button label="test-icon-button" data-testid="test-icon-button-4">کلیک کنید</tapsi-icon-button>
`,
    );

    const btn1 = page.getByTestId("test-icon-button-1");
    const btn2 = page.getByTestId("test-icon-button-2");
    const btn3 = page.getByTestId("test-icon-button-3");
    const btn4 = page.getByTestId("test-icon-button-4");

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
    await render(
      page,
      `<tapsi-icon-button label="test-icon-button" data-testid="test-icon-button" disabled>کلیک کنید</tapsi-icon-button>`,
    );

    const btn = page.getByTestId("test-icon-button");

    await page.keyboard.press("Tab");

    await expect(btn).not.toBeFocused();

    const mocks = await setupMocks(page);
    const handleClick = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(btn, "click", handleClick.ref);

    await page.keyboard.press("Enter");
    await handleClick.matchResult({ called: false });

    await btn.click();
    await handleClick.matchResult({ called: false });
  });

  test('🧪 should show spinner in loading state with `aria-busy="true"', async ({
    page,
  }) => {
    await render(
      page,
      `
<tapsi-icon-button label="test-icon-button" data-testid="test-icon-button" loading>
    کلیک کنید
</tapsi-icon-button>`,
    );

    const spinner = page.locator("tapsi-icon-button tapsi-spinner");
    const root = page.getByRole("button");

    await expect(spinner).toBeVisible();
    await expect(root).toHaveAttribute("aria-busy", "true");
  });
});
