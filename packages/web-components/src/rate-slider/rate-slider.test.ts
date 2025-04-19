import { describe, expect, render, test } from "@internals/test-helpers";
import { type Locator } from "@playwright/test";
import { type RateSlider } from "./index.ts";

describe("🧩 rate-slider", () => {
  test("🧪 should be automatically focused only with `autofocus` attribute", async ({
    page,
  }) => {
    // First we are going to test the component without `autofocus` attribute. We expect the component not to be focused.
    await render(
      page,
      `<tapsi-rate-slider label="test" data-testid="test-component"></tapsi-rate-slider>`,
    );

    const component = page.getByTestId("test-component");

    await expect(component).not.toBeFocused();

    // We expect the component to be automatically focused with `autofocus` attribute.
    await render(
      page,
      `<tapsi-rate-slider label="test" data-testid="test-component" autofocus></tapsi-rate-slider>`,
    );

    await expect(component).toBeFocused();
  });

  test("🧪 should has required attributes for screen readers", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-rate-slider
      data-testid="test-rate-slider"
      label="my label"
      min="5"
      max="10"
      value="7"
      valuetext="value text"
    ></tapsi-rate-slider>
    `,
    );
    const root = page.getByRole("slider");

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
    <tapsi-rate-slider
      data-testid="test-rate-slider"
      label="my label"
      min="0"
      max="10"
      value="7"
      disabled
      valuetext="value text"
    ></tapsi-rate-slider>
    `,
    );
    const rateSlider = page.getByTestId("test-rate-slider");

    await rateSlider.click();
    await expect(rateSlider).toHaveJSProperty("value", "7");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Home");
    await expect(rateSlider).toHaveJSProperty("value", "7");
  });

  test("🧪 should work with default value", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-rate-slider
      data-testid="test-rate-slider"
      label="my label"
      min="0"
      max="10"
      value="7"
      valuetext="value text"
    ></tapsi-rate-slider>
    `,
    );
    const rateSlider = page.getByTestId("test-rate-slider");

    await expect(rateSlider).toHaveJSProperty("value", "7");
  });

  test("🧪 should set value to min or max if default value is out of range", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-rate-slider
      data-testid="test-rate-slider"
      label="my label"
      min="0"
      max="10"
      value="17"
      valuetext="value text"
    ></tapsi-rate-slider>
    `,
    );
    const rateSlider = page.getByTestId("test-rate-slider");

    await expect(rateSlider).toHaveJSProperty("value", "10");

    await render(
      page,
      `
    <tapsi-rate-slider
      data-testid="test-rate-slider"
      label="my label"
      min="-5"
      max="10"
      value="-20"
      valuetext="value text"
    ></tapsi-rate-slider>
    `,
    );

    await expect(rateSlider).toHaveJSProperty("value", "-5");
  });

  test("🧪 should work using click", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-rate-slider
      data-testid="test-rate-slider"
      label="my label"
      min="0"
      max="10"
      valuetext="value text"
    ></tapsi-rate-slider>
    `,
    );
    const rateSlider = page.getByTestId("test-rate-slider");

    const stops: Locator[] = await page
      .locator("tapsi-rate-slider .stop")
      .all();

    const stop0 = stops[0]!;
    const stop1 = stops[1]!;
    const stop2 = stops[2]!;
    const stop3 = stops[3]!;
    const stop4 = stops[4]!;
    const stop5 = stops[5]!;
    const stop6 = stops[6]!;
    const stop7 = stops[7]!;
    const stop8 = stops[8]!;
    const stop9 = stops[9]!;
    const stop10 = stops[10]!;

    await stop10.click();
    await expect(rateSlider).toHaveJSProperty("value", "10");

    await stop2.click();
    await expect(rateSlider).toHaveJSProperty("value", "2");

    await stop3.click();
    await expect(rateSlider).toHaveJSProperty("value", "3");

    await stop1.click();
    await expect(rateSlider).toHaveJSProperty("value", "1");

    await stop9.click();
    await expect(rateSlider).toHaveJSProperty("value", "9");

    await stop5.click();
    await expect(rateSlider).toHaveJSProperty("value", "5");

    await stop4.click();
    await expect(rateSlider).toHaveJSProperty("value", "4");

    await stop8.click();
    await expect(rateSlider).toHaveJSProperty("value", "8");

    await stop7.click();
    await expect(rateSlider).toHaveJSProperty("value", "7");

    await stop6.click();
    await expect(rateSlider).toHaveJSProperty("value", "6");

    await stop0.click();
    await expect(rateSlider).toHaveJSProperty("value", "0");
  });

  test("🧪 should work using swipe", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-rate-slider
      data-testid="test-rate-slider"
      label="my label"
      min="0"
      max="10"
      valuetext="value text"
    ></tapsi-rate-slider>
    `,
    );
    const rateSlider = page.getByTestId("test-rate-slider");

    const stops: Locator[] = await page
      .locator("tapsi-rate-slider .stop")
      .all();

    const stop0 = stops[0]!;
    const stop1 = stops[1]!;
    const stop2 = stops[2]!;
    const stop3 = stops[3]!;
    const stop4 = stops[4]!;
    const stop5 = stops[5]!;
    const stop6 = stops[6]!;
    const stop7 = stops[7]!;
    const stop8 = stops[8]!;
    const stop9 = stops[9]!;
    const stop10 = stops[10]!;

    await stop0.dragTo(stop10);
    await expect(rateSlider).toHaveJSProperty("value", "10");

    await stop10.dragTo(stop2);
    await expect(rateSlider).toHaveJSProperty("value", "2");

    await stop2.dragTo(stop3);
    await expect(rateSlider).toHaveJSProperty("value", "3");

    await stop3.dragTo(stop1);
    await expect(rateSlider).toHaveJSProperty("value", "1");

    await stop1.dragTo(stop9);
    await expect(rateSlider).toHaveJSProperty("value", "9");

    await stop9.dragTo(stop5);
    await expect(rateSlider).toHaveJSProperty("value", "5");

    await stop5.dragTo(stop4);
    await expect(rateSlider).toHaveJSProperty("value", "4");

    await stop4.dragTo(stop8);
    await expect(rateSlider).toHaveJSProperty("value", "8");

    await stop8.dragTo(stop7);
    await expect(rateSlider).toHaveJSProperty("value", "7");

    await stop7.dragTo(stop6);
    await expect(rateSlider).toHaveJSProperty("value", "6");

    await stop6.dragTo(stop1);
    await expect(rateSlider).toHaveJSProperty("value", "1");
  });

  test("🧪 should set value to max or min while dragging slider outside of the rate-slider", async ({
    page,
  }) => {
    await render(
      page,
      `
      <div style="display:flex; align-items: stretch;">
        <span data-testid="outside-right">outside-right</span>
        <tapsi-rate-slider
          data-testid="test-rate-slider"
          label="my label"
          min="0"
          max="10"
          valuetext="value text"
        ></tapsi-rate-slider>
        <span data-testid="outside-left">outside-left</span>
      </div>
    `,
    );
    const leftSideOfTheComponent = page.getByTestId("outside-left");
    const rateSlider = page.getByTestId("test-rate-slider");

    const stop5 = page.locator("tapsi-rate-slider .stop").nth(5);

    await stop5.dragTo(leftSideOfTheComponent);
    await expect(rateSlider).toHaveJSProperty("value", "0");
  });

  test("🧪 should work using keyboard interaction", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-rate-slider
      data-testid="test-rate-slider"
      label="my label"
      min="1"
      max="10"
      value="5"
      valuetext="value text"
    ></tapsi-rate-slider>
    `,
    );
    const rateSlider = page.getByTestId("test-rate-slider");

    await expect(rateSlider).toHaveJSProperty("value", "5");

    await page.keyboard.press("Tab");

    // Test left and right arrow keys

    await page.keyboard.press("ArrowLeft");
    await expect(rateSlider).toHaveJSProperty("value", "4");
    await page.keyboard.press("ArrowLeft");
    await expect(rateSlider).toHaveJSProperty("value", "3");
    await page.keyboard.press("ArrowLeft");
    await expect(rateSlider).toHaveJSProperty("value", "2");
    await page.keyboard.press("ArrowLeft");
    await expect(rateSlider).toHaveJSProperty("value", "1");
    // should not decrease value if the current value is min
    await page.keyboard.press("ArrowLeft");
    await expect(rateSlider).toHaveJSProperty("value", "1");
    await page.keyboard.press("ArrowRight");
    await expect(rateSlider).toHaveJSProperty("value", "2");
    await page.keyboard.press("ArrowRight");
    await expect(rateSlider).toHaveJSProperty("value", "3");
    await page.keyboard.press("ArrowRight");
    await expect(rateSlider).toHaveJSProperty("value", "4");
    await page.keyboard.press("ArrowRight");
    await expect(rateSlider).toHaveJSProperty("value", "5");
    await page.keyboard.press("ArrowRight");
    await expect(rateSlider).toHaveJSProperty("value", "6");
    await page.keyboard.press("ArrowRight");
    await expect(rateSlider).toHaveJSProperty("value", "7");
    await page.keyboard.press("ArrowRight");
    await expect(rateSlider).toHaveJSProperty("value", "8");
    await page.keyboard.press("ArrowRight");
    await expect(rateSlider).toHaveJSProperty("value", "9");
    await page.keyboard.press("ArrowRight");
    await expect(rateSlider).toHaveJSProperty("value", "10");
    // should not increase value if the current value is max
    await page.keyboard.press("ArrowRight");
    await expect(rateSlider).toHaveJSProperty("value", "10");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    await expect(rateSlider).toHaveJSProperty("value", "5");

    // Test up and down arrow keys
    await page.keyboard.press("ArrowDown");
    await expect(rateSlider).toHaveJSProperty("value", "4");
    await page.keyboard.press("ArrowDown");
    await expect(rateSlider).toHaveJSProperty("value", "3");
    await page.keyboard.press("ArrowDown");
    await expect(rateSlider).toHaveJSProperty("value", "2");
    await page.keyboard.press("ArrowDown");
    await expect(rateSlider).toHaveJSProperty("value", "1");
    // should not decrease value if the current value is min
    await page.keyboard.press("ArrowDown");
    await expect(rateSlider).toHaveJSProperty("value", "1");
    await page.keyboard.press("ArrowUp");
    await expect(rateSlider).toHaveJSProperty("value", "2");
    await page.keyboard.press("ArrowUp");
    await expect(rateSlider).toHaveJSProperty("value", "3");
    await page.keyboard.press("ArrowUp");
    await expect(rateSlider).toHaveJSProperty("value", "4");
    await page.keyboard.press("ArrowUp");
    await expect(rateSlider).toHaveJSProperty("value", "5");
    await page.keyboard.press("ArrowUp");
    await expect(rateSlider).toHaveJSProperty("value", "6");
    await page.keyboard.press("ArrowUp");
    await expect(rateSlider).toHaveJSProperty("value", "7");
    await page.keyboard.press("ArrowUp");
    await expect(rateSlider).toHaveJSProperty("value", "8");
    await page.keyboard.press("ArrowUp");
    await expect(rateSlider).toHaveJSProperty("value", "9");
    await page.keyboard.press("ArrowUp");
    await expect(rateSlider).toHaveJSProperty("value", "10");
    // should not increase value if the current value is max
    await page.keyboard.press("ArrowUp");
    await expect(rateSlider).toHaveJSProperty("value", "10");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await expect(rateSlider).toHaveJSProperty("value", "5");

    // Test home and end keys
    await page.keyboard.press("Home");
    await expect(rateSlider).toHaveJSProperty("value", "1");

    await page.keyboard.press("End");
    await expect(rateSlider).toHaveJSProperty("value", "10");
  });

  test("🧪 should work using public `stepUp` and `stepDown` methods", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-rate-slider
      data-testid="test-rate-slider"
      id="test-rate-slider"
      label="my label"
      min="1"
      max="10"
      value="5"
      valuetext="value text"
    ></tapsi-rate-slider>
    `,
    );
    const rateSlider = page.getByTestId("test-rate-slider");

    await expect(rateSlider).toHaveJSProperty("value", "5");

    await page.evaluate(() => {
      (document.getElementById("test-rate-slider") as RateSlider).stepUp();
    });

    await expect(rateSlider).toHaveJSProperty("value", "6");

    await page.evaluate(() => {
      const slider = document.getElementById("test-rate-slider") as RateSlider;

      slider.stepDown();
      slider.stepDown();
    });

    await expect(rateSlider).toHaveJSProperty("value", "4");
  });
});
