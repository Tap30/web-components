import {
  afterEach,
  describe,
  disposeMocks,
  expect,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";

describe("🧩 button", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should be automatically focused only with `autofocus` attribute", async ({
    page,
  }) => {
    // First we are going to test the component without `autofocus` attribute. We expect the component not to be focused.
    await render(
      page,
      `<tapsi-button data-testid="test-component">test</tapsi-button>`,
    );

    const component = page.getByTestId("test-component");

    await expect(component).not.toBeFocused();

    // We expect the component to be automatically focused with `autofocus` attribute.
    await render(
      page,
      `<tapsi-button data-testid="test-component" autofocus>test</tapsi-button>`,
    );

    await expect(component).toBeFocused();
  });

  test("🧪 should be rendered as link button and navigate to the provided url", async ({
    page,
    context,
  }) => {
    await render(
      page,
      `<tapsi-button href="https://google.com" target="_blank" label="test-button" data-testid="test-button">⭐️</tapsi-button>`,
    );

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
    await render(
      page,
      `<tapsi-button label="test-button" data-testid="test-button">کلیک کنید</tapsi-button>`,
    );

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
    await render(
      page,
      `<tapsi-button label="test-button" data-testid="test-button">کلیک کنید</tapsi-button>`,
    );

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
    await render(
      page,
      `
      <tapsi-button label="test-button" data-testid="test-button-1">کلیک کنید</tapsi-button>
      <tapsi-button label="test-button" data-testid="test-button-2">کلیک کنید</tapsi-button>
      <tapsi-button label="test-button" data-testid="test-button-3" disabled>کلیک کنید</tapsi-button>
      <tapsi-button label="test-button" data-testid="test-button-4">کلیک کنید</tapsi-button>
`,
    );

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
    await render(
      page,
      `<tapsi-button label="test-button" data-testid="test-button" disabled>کلیک کنید</tapsi-button>`,
    );

    const btn = page.getByTestId("test-button");

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

  test("🧪 should render leading and trailing icons", async ({ page }) => {
    await render(
      page,
      `
<tapsi-button label="test-button" data-testid="test-button">
    <svg data-testid="test-button-leading-slot" slot="leading-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9996 22C10.7496 22 9.57878 21.7625 8.48711 21.2875C7.39544 20.8125 6.44544 20.1708 5.63711 19.3625C4.82878 18.5541 4.18711 17.6041 3.71211 16.5125C3.23711 15.4208 2.99961 14.25 2.99961 13C2.99961 11.75 3.23711 10.5791 3.71211 9.48748C4.18711 8.39581 4.82878 7.44581 5.63711 6.63748C6.44544 5.82914 7.39544 5.18748 8.48711 4.71248C9.57878 4.23748 10.7496 3.99998 11.9996 3.99998C13.2496 3.99998 14.4204 4.23748 15.5121 4.71248C16.6038 5.18748 17.5538 5.82914 18.3621 6.63748C19.1704 7.44581 19.8121 8.39581 20.2871 9.48748C20.7621 10.5791 20.9996 11.75 20.9996 13C20.9996 14.25 20.7621 15.4208 20.2871 16.5125C19.8121 17.6041 19.1704 18.5541 18.3621 19.3625C17.5538 20.1708 16.6038 20.8125 15.5121 21.2875C14.4204 21.7625 13.2496 22 11.9996 22ZM14.7996 17.2L16.1996 15.8L12.9996 12.6V7.99998H10.9996V13.4L14.7996 17.2ZM5.59961 2.34998L6.99961 3.74998L2.74961 7.99998L1.34961 6.59998L5.59961 2.34998ZM18.3996 2.34998L22.6496 6.59998L21.2496 7.99998L16.9996 3.74998L18.3996 2.34998ZM11.9996 20C13.9496 20 15.6038 19.3208 16.9621 17.9625C18.3204 16.6041 18.9996 14.95 18.9996 13C18.9996 11.05 18.3204 9.39581 16.9621 8.03748C15.6038 6.67914 13.9496 5.99998 11.9996 5.99998C10.0496 5.99998 8.39544 6.67914 7.03711 8.03748C5.67878 9.39581 4.99961 11.05 4.99961 13C4.99961 14.95 5.67878 16.6041 7.03711 17.9625C8.39544 19.3208 10.0496 20 11.9996 20Z" fill="black"/>
    </svg>
    کلیک کنید
    <svg data-testid="test-button-trailing-slot" slot="trailing-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9996 22C10.7496 22 9.57878 21.7625 8.48711 21.2875C7.39544 20.8125 6.44544 20.1708 5.63711 19.3625C4.82878 18.5541 4.18711 17.6041 3.71211 16.5125C3.23711 15.4208 2.99961 14.25 2.99961 13C2.99961 11.75 3.23711 10.5791 3.71211 9.48748C4.18711 8.39581 4.82878 7.44581 5.63711 6.63748C6.44544 5.82914 7.39544 5.18748 8.48711 4.71248C9.57878 4.23748 10.7496 3.99998 11.9996 3.99998C13.2496 3.99998 14.4204 4.23748 15.5121 4.71248C16.6038 5.18748 17.5538 5.82914 18.3621 6.63748C19.1704 7.44581 19.8121 8.39581 20.2871 9.48748C20.7621 10.5791 20.9996 11.75 20.9996 13C20.9996 14.25 20.7621 15.4208 20.2871 16.5125C19.8121 17.6041 19.1704 18.5541 18.3621 19.3625C17.5538 20.1708 16.6038 20.8125 15.5121 21.2875C14.4204 21.7625 13.2496 22 11.9996 22ZM14.7996 17.2L16.1996 15.8L12.9996 12.6V7.99998H10.9996V13.4L14.7996 17.2ZM5.59961 2.34998L6.99961 3.74998L2.74961 7.99998L1.34961 6.59998L5.59961 2.34998ZM18.3996 2.34998L22.6496 6.59998L21.2496 7.99998L16.9996 3.74998L18.3996 2.34998ZM11.9996 20C13.9496 20 15.6038 19.3208 16.9621 17.9625C18.3204 16.6041 18.9996 14.95 18.9996 13C18.9996 11.05 18.3204 9.39581 16.9621 8.03748C15.6038 6.67914 13.9496 5.99998 11.9996 5.99998C10.0496 5.99998 8.39544 6.67914 7.03711 8.03748C5.67878 9.39581 4.99961 11.05 4.99961 13C4.99961 14.95 5.67878 16.6041 7.03711 17.9625C8.39544 19.3208 10.0496 20 11.9996 20Z" fill="black"/>
    </svg>
</tapsi-button>`,
    );

    const leading = page.getByTestId("test-button-leading-slot");
    const trailing = page.getByTestId("test-button-trailing-slot");

    await expect(leading).toBeVisible();
    await expect(trailing).toBeVisible();
  });

  test('🧪 should show spinner in loading state with `aria-busy="true"', async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-button label="test-button" data-testid="test-button" loading>
      کلیک کنید
    </tapsi-button>`,
    );

    const spinner = page.locator("tapsi-button tapsi-spinner");
    const root = page.getByRole("button");

    await expect(spinner).toBeVisible();
    await expect(root).toHaveAttribute("aria-busy", "true");
  });
});
