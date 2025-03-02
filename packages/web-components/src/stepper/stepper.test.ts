import {
  beforeEach,
  describe,
  expect,
  render,
  test,
} from "@internals/test-helpers";
import { type Page } from "@playwright/test";
import { type TapsiStepper } from "@tapsioss/web-components/stepper";

const getStepperElements = (page: Page) => {
  const stepper = page.getByTestId("test-stepper");
  const root = page.getByRole("spinbutton");
  const decreaseButton = page.getByLabel("Decrease value");
  const increaseButton = page.getByLabel("Increase value");

  return {
    root,
    stepper,
    decreaseButton,
    increaseButton,
  };
};

describe("🧩 stepper", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("🧪 should has required attributes for screen readers", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-stepper
      data-testid="test-stepper"
      label="my label"
      min="5"
      max="10"
      value="7"
      valuetext="value text"
    ></tapsi-stepper>
    `,
    );
    const { root } = getStepperElements(page);

    await expect(root).toHaveAttribute("aria-label", "my label");
    await expect(root).toHaveAttribute("aria-valuemin", "5");
    await expect(root).toHaveAttribute("aria-valuemax", "10");
    await expect(root).toHaveAttribute("aria-valuenow", "7");
    await expect(root).toHaveAttribute("aria-valuetext", "value text");
  });

  test("🧪 should not in `disabled` mode", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-stepper
      data-testid="test-stepper"
      label="my label"
      min="0"
      max="10"
      value="7"
      disabled
      valuetext="value text"
    ></tapsi-stepper>
    `,
    );
    const { stepper, decreaseButton, increaseButton } =
      getStepperElements(page);

    await expect(decreaseButton).toBeDisabled();
    // eslint-disable-next-line playwright/no-force-option
    await decreaseButton.click({ force: true });
    await expect(stepper).toHaveJSProperty("value", "7");

    await expect(increaseButton).toBeDisabled();
    // eslint-disable-next-line playwright/no-force-option
    await increaseButton.click({ force: true });
    await expect(stepper).toHaveJSProperty("value", "7");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Home");
    await expect(stepper).toHaveJSProperty("value", "7");
  });

  test("🧪 should work with default value", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-stepper
      data-testid="test-stepper"
      label="my label"
      min="0"
      max="10"
      value="7"
      valuetext="value text"
    ></tapsi-stepper>
    `,
    );
    const { stepper } = getStepperElements(page);

    await expect(stepper).toHaveJSProperty("value", "7");
  });

  test("🧪 should set value to min/max if default value is out of range", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-stepper
      data-testid="test-stepper"
      label="my label"
      min="0"
      max="10"
      value="17"
      valuetext="value text"
    ></tapsi-stepper>
    `,
    );
    const { stepper } = getStepperElements(page);

    await expect(stepper).toHaveJSProperty("value", "10");

    await render(
      page,
      `
    <tapsi-stepper
      data-testid="test-stepper"
      label="my label"
      min="-5"
      max="10"
      value="-20"
      valuetext="value text"
    ></tapsi-stepper>
    `,
    );

    await expect(stepper).toHaveJSProperty("value", "-5");
  });

  test("🧪 should work using keyboard interaction", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-stepper
      data-testid="test-stepper"
      label="my label"
      min="-10"
      value="0"
      max="10"
      valuetext="value text"
    ></tapsi-stepper>
    `,
    );
    const { stepper } = getStepperElements(page);

    await expect(stepper).toHaveJSProperty("value", "0");

    await page.keyboard.press("Tab");

    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-1");
    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-2");
    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-3");
    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-4");
    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-5");
    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-6");
    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-7");
    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-8");
    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-9");
    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-10");
    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "-10");

    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "-9");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "-8");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "-7");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "-6");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "-5");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "-4");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "-3");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "-2");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "-1");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "0");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "1");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "2");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "3");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "4");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "5");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "6");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "7");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "8");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "9");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "10");
    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "10");

    await page.keyboard.press("Home");
    await expect(stepper).toHaveJSProperty("value", "-10");
    await page.keyboard.press("End");
    await expect(stepper).toHaveJSProperty("value", "10");
  });

  test("🧪 should work using public `stepUp` and `stepDown` methods", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-stepper
      data-testid="test-stepper"
      id="test-stepper"
      label="my label"
      min="1"
      max="10"
      value="5"
      valuetext="value text"
    ></tapsi-stepper>
    `,
    );
    const { stepper } = getStepperElements(page);

    await expect(stepper).toHaveJSProperty("value", "5");

    await page.evaluate(() => {
      (document.getElementById("test-stepper") as TapsiStepper).stepUp();
    });

    await expect(stepper).toHaveJSProperty("value", "6");

    await page.evaluate(() => {
      const slider = document.getElementById("test-stepper") as TapsiStepper;

      slider.stepDown();
      slider.stepDown();
    });

    await expect(stepper).toHaveJSProperty("value", "4");
  });

  test("🧪 should work with custom step", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-stepper
      data-testid="test-stepper"
      id="test-stepper"
      label="my label"
      min="0"
      max="100"
      step="5"
      valuetext="value text"
    ></tapsi-stepper>
    `,
    );
    const { stepper } = getStepperElements(page);

    await expect(stepper).toHaveJSProperty("value", "0");

    await page.keyboard.press("Tab");

    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "0");

    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "5");

    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "10");

    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "15");

    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "10");

    await page.keyboard.press("End");
    await expect(stepper).toHaveJSProperty("value", "100");

    await page.keyboard.press("ArrowUp");
    await expect(stepper).toHaveJSProperty("value", "100");

    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "95");

    await page.keyboard.press("ArrowDown");
    await expect(stepper).toHaveJSProperty("value", "90");

    await page.keyboard.press("Home");
    await expect(stepper).toHaveJSProperty("value", "0");

    await page.evaluate(() => {
      const stepper = document.getElementById("test-stepper") as TapsiStepper;

      stepper.stepUp();
      stepper.stepUp();
    });
    await expect(stepper).toHaveJSProperty("value", "10");
  });
});
