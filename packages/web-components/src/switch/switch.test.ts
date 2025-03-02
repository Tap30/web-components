import {
  afterEach,
  describe,
  disposeMocks,
  expect,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";
import { ErrorMessages } from "./constants.ts";

describe("🧩 switch", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should get default value", async ({ page }) => {
    await render(
      page,
      '<tapsi-switch selected label="switch" data-testid="test-switch"></tapsi-switch>',
    );

    const switchEl = page.getByTestId("test-switch");

    await expect(switchEl).toHaveJSProperty("selected", true);
  });

  test("🧪 should trigger `change` and `input` event on toggling the switch", async ({
    page,
  }) => {
    await render(
      page,
      '<tapsi-switch label="switch" data-testid="test-switch"></tapsi-switch>',
    );

    const switchEl = page.getByTestId("test-switch");

    const mocks = await setupMocks(page);
    const handleChange = mocks.createFakeFn();
    const handleInput = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(switchEl, "change", handleChange.ref);
    await mocks.events.attachMockedEvent(switchEl, "input", handleInput.ref);

    await expect(switchEl).toHaveJSProperty("selected", false);

    await handleChange.matchResult({ called: false });
    await handleInput.matchResult({ called: false });

    await switchEl.click();
    await handleChange.matchResult({ callCount: 1 });
    await handleInput.matchResult({ callCount: 1 });
    await expect(switchEl).toHaveJSProperty("selected", true);

    await page.keyboard.press("Space");
    await handleChange.matchResult({ callCount: 2 });
    await handleInput.matchResult({ callCount: 2 });
    await expect(switchEl).toHaveJSProperty("selected", false);

    await page.keyboard.press("Enter");
    await handleChange.matchResult({ callCount: 3 });
    await handleInput.matchResult({ callCount: 3 });
    await expect(switchEl).toHaveJSProperty("selected", true);
  });

  test("🧪 should hide label with `hide-label` attribute", async ({ page }) => {
    await render(
      page,
      `<tapsi-switch hide-label label="test-switch" data-testid="test-switch"></tapsi-switch>`,
    );

    const label = page.locator("tapsi-switch label");

    await expect(label).toBeHidden();
  });

  test("🧪 should throw error if no valid label was set for the input", async ({
    page,
  }) => {
    const errors: string[] = [];

    page.on("console", msg => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await render(
      page,
      `<tapsi-switch data-testid="test-switch"></tapsi-switch>`,
    );

    expect(errors[0]).toContain(
      ErrorMessages.SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE,
    );
  });

  test("🧪 should not be interactive when disabled", async ({ page }) => {
    await render(
      page,
      `<tapsi-switch label="test-switch" data-testid="test-switch" disabled></tapsi-switch>`,
    );

    const textField = page.getByTestId("test-switch");

    await expect(textField).not.toBeFocused();
    await textField.click();
    await expect(textField).not.toBeFocused();
  });
});
