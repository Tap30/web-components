import {
  afterEach,
  describe,
  disposeMocks,
  expect,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";

describe("🧩 radio", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should trigger `change` event on click", async ({ page }) => {
    await render(
      page,
      `<tapsi-radio label="test-radio" data-testid="test-radio" name="test-group"></tapsi-radio>`,
    );

    const radio = page.getByTestId("test-radio");

    await expect(radio).toBeVisible();

    const mocks = await setupMocks(page);
    const handleChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(radio, "change", handleChange.ref);

    await handleChange.matchResult({ called: false });
    await expect(radio).toHaveJSProperty("checked", false);

    await radio.click();
    await handleChange.matchResult({ callCount: 1 });
    await expect(radio).toHaveJSProperty("checked", true);
  });

  test("🧪 should trigger `change` event using keyboard interaction", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-radio label="test-radio" data-testid="test-radio" name="test-group"></tapsi-radio>`,
    );

    const radio = page.getByTestId("test-radio");

    await page.keyboard.press("Tab");

    await expect(radio).toBeFocused();

    const mocks = await setupMocks(page);
    const handleChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(radio, "change", handleChange.ref);

    await handleChange.matchResult({ called: false });
    await expect(radio).toHaveJSProperty("checked", false);

    await page.keyboard.press("Space");
    await handleChange.matchResult({ callCount: 1 });
    await expect(radio).toHaveJSProperty("checked", true);
  });

  test("🧪 should be interactive using keyboard interaction for multiple radios", async ({
    page,
  }) => {
    await page.setContent(`
    <div>
      <tapsi-radio name="test" labelledby="label-1" data-testid="test-radio-1" id="test-radio-1"></tapsi-radio>
      <label data-testid="test-radio-1-label" for="test-radio-1" id="label-1">radio 1</label>
    </div>

    <div>
      <tapsi-radio name="test" labelledby="label-2" data-testid="test-radio-2" id="test-radio-2" disabled></tapsi-radio>
      <label data-testid="test-radio-2-label" for="test-radio-2" id="label-2">radio 2</label>
    </div>

    <div>
      <tapsi-radio name="test" labelledby="label-3" data-testid="test-radio-3" id="test-radio-3"></tapsi-radio>
      <label data-testid="test-radio-3-label" for="test-radio-3" id="label-3">radio 3</label>
    </div>

    <div>
      <tapsi-radio name="test" labelledby="label-4" data-testid="test-radio-4" id="test-radio-4"></tapsi-radio>
      <label data-testid="test-radio-4-label" for="test-radio-4" id="label-4">radio 4</label>
    </div>
  `);

    const radio1 = page.getByTestId("test-radio-1");
    const radio2 = page.getByTestId("test-radio-2");
    const radio3 = page.getByTestId("test-radio-3");
    const radio4 = page.getByTestId("test-radio-4");

    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", false);

    await page.keyboard.press("Tab");
    await expect(radio1).toBeFocused();

    await page.keyboard.press("Space");
    await expect(radio1).toHaveJSProperty("checked", true);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", false);

    // first we will check of the up and right arrow keys can toggle the radios

    await page.keyboard.press("ArrowDown");

    // Since the second radio is disabled, we should not be able to focus on it.
    await expect(radio2).not.toBeFocused();
    await expect(radio3).toBeFocused();

    await page.keyboard.press("Space");
    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", true);
    await expect(radio4).toHaveJSProperty("checked", false);

    await page.keyboard.press("ArrowDown");
    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", true);

    await page.keyboard.press("ArrowDown");
    await expect(radio1).toHaveJSProperty("checked", true);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", false);

    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowUp");
    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", true);
    await expect(radio4).toHaveJSProperty("checked", false);

    // the same behaviour should occur using left and right keys
    await page.keyboard.press("ArrowRight");
    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", true);

    await page.keyboard.press("ArrowRight");
    await expect(radio1).toHaveJSProperty("checked", true);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", false);

    await page.keyboard.press("ArrowLeft");
    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", true);
  });

  test("🧪 should be interactive using click on labels for multiple radios", async ({
    page,
  }) => {
    await page.setContent(`
    <div>
      <tapsi-radio name="test" labelledby="label-1" data-testid="test-radio-1" id="test-radio-1"></tapsi-radio>
      <label data-testid="test-radio-1-label" for="test-radio-1" id="label-1">radio 1</label>
    </div>

    <div>
      <tapsi-radio name="test" labelledby="label-2" data-testid="test-radio-2" id="test-radio-2" disabled></tapsi-radio>
      <label data-testid="test-radio-2-label" for="test-radio-2" id="label-2">radio 2</label>
    </div>

    <div>
      <tapsi-radio name="test" labelledby="label-3" data-testid="test-radio-3" id="test-radio-3"></tapsi-radio>
      <label data-testid="test-radio-3-label" for="test-radio-3" id="label-3">radio 3</label>
    </div>

    <div>
      <tapsi-radio name="test" labelledby="label-4" data-testid="test-radio-4" id="test-radio-4"></tapsi-radio>
      <label data-testid="test-radio-4-label" for="test-radio-4" id="label-4">radio 4</label>
    </div>
  `);

    const radio1 = page.getByTestId("test-radio-1");
    const radio2 = page.getByTestId("test-radio-2");
    const radio3 = page.getByTestId("test-radio-3");
    const radio4 = page.getByTestId("test-radio-4");

    const radio1Label = page.getByTestId("test-radio-1-label");
    const radio2Label = page.getByTestId("test-radio-2-label");
    const radio3Label = page.getByTestId("test-radio-3-label");
    const radio4Label = page.getByTestId("test-radio-4-label");

    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", false);

    await radio1Label.click();
    await expect(radio1).toHaveJSProperty("checked", true);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", false);

    // Since the second radio is disabled, we should not be able to focus on it.
    await radio2Label.click();
    await expect(radio1).toHaveJSProperty("checked", true);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", false);

    await radio3Label.click();
    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", true);
    await expect(radio4).toHaveJSProperty("checked", false);

    await radio4Label.click();
    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", true);
  });

  test("🧪 should be interactive using click for multiple radios", async ({
    page,
  }) => {
    await page.setContent(`
    <div>
      <tapsi-radio name="test" labelledby="label-1" data-testid="test-radio-1" id="test-radio-1"></tapsi-radio>
      <label data-testid="test-radio-1-label" for="test-radio-1" id="label-1">radio 1</label>
    </div>

    <div>
      <tapsi-radio name="test" labelledby="label-2" data-testid="test-radio-2" id="test-radio-2" disabled></tapsi-radio>
      <label data-testid="test-radio-2-label" for="test-radio-2" id="label-2">radio 2</label>
    </div>

    <div>
      <tapsi-radio name="test" labelledby="label-3" data-testid="test-radio-3" id="test-radio-3"></tapsi-radio>
      <label data-testid="test-radio-3-label" for="test-radio-3" id="label-3">radio 3</label>
    </div>

    <div>
      <tapsi-radio name="test" labelledby="label-4" data-testid="test-radio-4" id="test-radio-4"></tapsi-radio>
      <label data-testid="test-radio-4-label" for="test-radio-4" id="label-4">radio 4</label>
    </div>
  `);

    const radio1 = page.getByTestId("test-radio-1");
    const radio2 = page.getByTestId("test-radio-2");
    const radio3 = page.getByTestId("test-radio-3");
    const radio4 = page.getByTestId("test-radio-4");

    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", false);

    await radio1.click();
    await expect(radio1).toHaveJSProperty("checked", true);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", false);

    // Since the second radio is disabled, we should not be able to focus on it.
    await radio2.click();
    await expect(radio1).toHaveJSProperty("checked", true);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", false);

    await radio3.click();
    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", true);
    await expect(radio4).toHaveJSProperty("checked", false);

    await radio4.click();
    await expect(radio1).toHaveJSProperty("checked", false);
    await expect(radio2).toHaveJSProperty("checked", false);
    await expect(radio3).toHaveJSProperty("checked", false);
    await expect(radio4).toHaveJSProperty("checked", true);
  });

  test("🧪 should not trigger `change` event when disabled", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-radio label="test-radio" data-testid="test-radio" name="test-group" disabled>انتخاب کنید</tapsi-radio>`,
    );

    const radio = page.getByTestId("test-radio");

    await page.keyboard.press("Tab");

    await expect(radio).not.toBeFocused();

    const mocks = await setupMocks(page);
    const handleChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(radio, "change", handleChange.ref);

    await page.keyboard.press("Enter");
    await handleChange.matchResult({ called: false });

    await radio.click();
    await handleChange.matchResult({ called: false });
  });

  test("🧪 should be checked by default if `checked` attribute was set", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-radio label="test-radio" data-testid="test-radio" name="test-group" checked>انتخاب کنید</tapsi-radio>`,
    );

    const radio = page.getByTestId("test-radio");

    await expect(radio).toHaveJSProperty("checked", true);
  });

  test("🧪 should be focused after clicking on external label", async ({
    page,
  }) => {
    await render(
      page,
      `
        <label for="test-radio" data-testid="external-label" id="external-label" >external label</label>
        <tapsi-radio labelledby="external-label" id="test-radio" data-testid="test-radio">
    `,
    );

    const label = page.getByTestId("external-label");
    const input = page.getByTestId("test-radio");

    await expect(input).not.toBeFocused();
    await label.click();
    await expect(input).toBeFocused();
  });
});
