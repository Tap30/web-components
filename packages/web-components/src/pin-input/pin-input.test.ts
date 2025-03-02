import {
  beforeEach,
  describe,
  expect,
  forEachLocator,
  render,
  test,
} from "@internals/test-helpers";
import { type Locator } from "@playwright/test";
import { ErrorMessages } from "./constants.ts";

const validatePinValues = async (pins: Locator[], pattern: string[]) => {
  if (pins.length !== pattern.length) {
    throw new Error(
      `The pattern is does not match to pins count. (Pins count: ${pins.length}, Pattern's length: ${pattern.length})`,
    );
  }

  let isValid = true;

  await forEachLocator(pins, async (pin, index) => {
    const pinExpectedValue = pattern[index]!;
    const handle = await pin.elementHandle();
    const value = (await handle?.inputValue()) ?? "";

    if (value !== pinExpectedValue) isValid = false;
  });

  return isValid;
};

describe("🧩 pin-input", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("🧪 should change pin counts using `pins` attribute", async ({
    page,
  }) => {
    for (let pinSize = 1; pinSize <= 10; pinSize++) {
      await render(
        page,
        `<tapsi-pin-input label="لیبل" data-testid="test-pin-input" pins="${pinSize}"></tapsi-pin-input>`,
      );

      const pins = page.locator("tapsi-pin-input input");

      await expect(pins).toHaveCount(pinSize);
    }
  });

  test("🧪 should fill pin-input from middle while typing from the middle of the pin-input", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-pin-input label="لیبل" data-testid="test-pin-input"></tapsi-pin-input>`,
    );

    const pins = page.locator("tapsi-pin-input input");

    await pins.nth(2).focus();

    await page.keyboard.type("1234");

    expect(await validatePinValues(await pins.all(), ["", "", "1", "2"])).toBe(
      true,
    );
  });

  test("🧪 should change pin length using `pinLength` attribute", async ({
    page,
  }) => {
    const PINS = 3;
    const CHAR = "0";

    for (let pinLength = 1; pinLength <= 4; pinLength++) {
      await render(
        page,
        `<tapsi-pin-input label="لیبل" data-testid="test-pin-input" pins="${PINS}" pin-length="${pinLength}"></tapsi-pin-input>`,
      );

      const pinInput = page.getByTestId("test-pin-input");
      const pins = page.locator("tapsi-pin-input input");

      await page.keyboard.press("Tab");
      await page.keyboard.type(CHAR.repeat(PINS * pinLength));
      await page.keyboard.press("Enter");

      expect(
        await validatePinValues(
          await pins.all(),
          Array.from({ length: PINS }).map(() => CHAR.repeat(pinLength)),
        ),
      ).toBe(true);

      await expect(pinInput).toHaveJSProperty(
        "value",
        CHAR.repeat(PINS * pinLength),
      );
    }
  });

  test("🧪 should show supporting text", async ({ page }) => {
    await render(
      page,
      `<tapsi-pin-input supporting-text="support" label="test-pin-input" data-testid="test-pin-input"></tapsi-pin-input>`,
    );

    const supportingText = page.locator(
      'tapsi-pin-input [part="supporting-text"]',
    );

    await expect(supportingText).toBeVisible();
  });

  test("🧪 should be focused after clicking on internal label", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-pin-input label="test-pin-input" data-testid="test-pin-input"></tapsi-pin-input>`,
    );

    const label = page.locator("tapsi-pin-input label");
    const input = page.getByTestId("test-pin-input");

    await expect(input).not.toBeFocused();
    await label.click();
    await expect(input).toBeFocused();
  });

  test("🧪 should hide label with `hide-label` attribute", async ({ page }) => {
    await render(
      page,
      `<tapsi-pin-input hide-label label="test-pin-input" data-testid="test-pin-input"></tapsi-pin-input>`,
    );

    const label = page.locator("tapsi-pin-input label");

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
      `<tapsi-pin-input data-testid="test-pin-input"></tapsi-pin-input>`,
    );

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toContain(
      ErrorMessages.SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE,
    );
  });

  test("🧪 should be focused after clicking on external label", async ({
    page,
  }) => {
    await render(
      page,
      `
        <label for="test-pin-input" data-testid="external-label" id="external-label" >external label</label>
        <tapsi-pin-input labelledby="external-label" id="test-pin-input" data-testid="test-pin-input">
    `,
    );

    const label = page.getByTestId("external-label");
    const input = page.getByTestId("test-pin-input");

    await expect(input).not.toBeFocused();
    await label.click();
    await expect(input).toBeFocused();
  });

  test("🧪 should fill the pin-input from start on paste even when focus is not on first element", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-pin-input label="لیبل" data-testid="test-pin-input" pins="5"></tapsi-pin-input>`,
    );

    const pins = page.locator("tapsi-pin-input input");

    await page.evaluate(() => navigator.clipboard.writeText("123"));

    await pins.nth(2).focus();

    await page.keyboard.press("Meta+v");

    expect(
      await validatePinValues(await pins.all(), ["1", "2", "3", "", ""]),
    ).toBe(true);

    await render(
      page,
      `<tapsi-pin-input label="لیبل" data-testid="test-pin-input" pins="5" pin-length="2"></tapsi-pin-input>`,
    );

    await page.evaluate(() => navigator.clipboard.writeText("123456789"));

    await pins.nth(2).focus();

    await page.keyboard.press("Meta+v");

    expect(
      await validatePinValues(await pins.all(), ["12", "34", "56", "78", "9"]),
    ).toBe(true);
  });

  test("🧪 should ignore trailing of pasted string if the input string is larger that pin input capacity", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-pin-input label="لیبل" data-testid="test-pin-input" pins="5"></tapsi-pin-input>`,
    );

    const pins = page.locator("tapsi-pin-input input");

    await page.evaluate(() => navigator.clipboard.writeText("123456789"));

    await page.keyboard.press("Tab");

    await page.keyboard.press("Meta+v");

    expect(
      await validatePinValues(await pins.all(), ["1", "2", "3", "4", "5"]),
    ).toBe(true);

    await render(
      page,
      `<tapsi-pin-input label="لیبل" data-testid="test-pin-input" pins="5" pin-length="2"></tapsi-pin-input>`,
    );

    await page.evaluate(() =>
      navigator.clipboard.writeText("12345678901234567890"),
    );

    await page.keyboard.press("Tab");

    await page.keyboard.press("Meta+v");

    expect(
      await validatePinValues(await pins.all(), ["12", "34", "56", "78", "90"]),
    ).toBe(true);
  });
});
