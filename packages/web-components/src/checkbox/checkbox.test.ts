import {
  afterEach,
  describe,
  disposeMocks,
  expect,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";

describe("🧩 checkbox", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should trigger `change` event on click", async ({ page }) => {
    await render(
      page,
      `<tapsi-checkbox label="test-checkbox" data-testid="test-checkbox"></tapsi-checkbox>`,
    );

    const checkbox = page.getByTestId("test-checkbox");

    await expect(checkbox).toBeVisible();

    const mocks = await setupMocks(page);
    const handleChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(checkbox, "change", handleChange.ref);

    await handleChange.matchResult({ called: false });
    await expect(checkbox).toHaveJSProperty("checked", false);

    await checkbox.click();
    await handleChange.matchResult({ callCount: 1 });
    await expect(checkbox).toHaveJSProperty("checked", true);
  });

  test("🧪 should trigger `change` event using keyboard interaction", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-checkbox label="test-checkbox" data-testid="test-checkbox"></tapsi-checkbox>`,
    );

    const checkbox = page.getByTestId("test-checkbox");

    await page.keyboard.press("Tab");

    await expect(checkbox).toBeFocused();

    const mocks = await setupMocks(page);
    const handleChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(checkbox, "change", handleChange.ref);

    await handleChange.matchResult({ called: false });
    await expect(checkbox).toHaveJSProperty("checked", false);

    await page.keyboard.press("Space");
    await handleChange.matchResult({ callCount: 1 });
    await expect(checkbox).toHaveJSProperty("checked", true);
  });

  test("🧪 should focus checkboxes using Tab and Shift+Tab", async ({
    page,
  }) => {
    await render(
      page,
      `
      <tapsi-checkbox label="test-checkbox" data-testid="test-checkbox-1"></tapsi-checkbox>
      <tapsi-checkbox label="test-checkbox" data-testid="test-checkbox-2"></tapsi-checkbox>
      <tapsi-checkbox label="test-checkbox" data-testid="test-checkbox-3" disabled></tapsi-checkbox>
      <tapsi-checkbox label="test-checkbox" data-testid="test-checkbox-4"></tapsi-checkbox>
`,
    );

    const checkbox1 = page.getByTestId("test-checkbox-1");
    const checkbox2 = page.getByTestId("test-checkbox-2");
    const checkbox3 = page.getByTestId("test-checkbox-3");
    const checkbox4 = page.getByTestId("test-checkbox-4");

    await page.keyboard.press("Tab");
    await expect(checkbox1).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(checkbox2).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(checkbox3).not.toBeFocused();
    await expect(checkbox4).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(checkbox3).not.toBeFocused();
    await expect(checkbox2).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(checkbox1).toBeFocused();
  });

  test("🧪 should not trigger `change` event when disabled", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-checkbox label="test-checkbox" data-testid="test-checkbox" disabled>انتخاب کنید</tapsi-checkbox>`,
    );

    const checkbox = page.getByTestId("test-checkbox");

    await page.keyboard.press("Tab");

    await expect(checkbox).not.toBeFocused();

    const mocks = await setupMocks(page);
    const handleChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(checkbox, "change", handleChange.ref);

    await page.keyboard.press("Enter");
    await handleChange.matchResult({ called: false });

    await checkbox.click();
    await handleChange.matchResult({ called: false });
  });

  test("🧪 should be indeterminate with `indeterminate` attribute", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-checkbox label="test-checkbox" data-testid="test-checkbox" indeterminate>انتخاب کنید</tapsi-checkbox>`,
    );

    const checkbox = page.getByTestId("test-checkbox");

    await expect(checkbox).toHaveJSProperty("indeterminate", true);
    await expect(checkbox).toHaveJSProperty("checked", false);
  });

  test("🧪 should be checked by default if `checked` attribute was set", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-checkbox label="test-checkbox" data-testid="test-checkbox" checked>انتخاب کنید</tapsi-checkbox>`,
    );

    const checkbox = page.getByTestId("test-checkbox");

    await expect(checkbox).toHaveJSProperty("checked", true);
    await expect(checkbox).toHaveJSProperty("indeterminate", false);
  });

  test("🧪 should check by clicking on external label", async ({ page }) => {
    await render(
      page,
      `
        <label for="test-checkbox" data-testid="external-label" id="external-label" >external label</label>
        <tapsi-checkbox labelledby="external-label" id="test-checkbox" data-testid="test-checkbox">
    `,
    );

    const label = page.getByTestId("external-label");
    const input = page.getByTestId("test-checkbox");

    await expect(input).toHaveJSProperty("checked", false);

    await label.click();
    await expect(input).toBeFocused();
    await expect(input).toHaveJSProperty("checked", true);
  });
});
