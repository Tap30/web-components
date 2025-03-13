import {
  afterEach,
  createPromiseResolvers,
  describe,
  disposeMocks,
  expect,
  render,
  test,
} from "@internals/test-helpers";
import { ErrorMessages, scope } from "./constants.ts";

describe("🧩 pinwheel", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should be automatically focused only with `autofocus` attribute", async ({
    page,
  }) => {
    // First we are going to test the component without `autofocus` attribute. We expect the component not to be focused.
    await render(
      page,
      `
      <tapsi-pinwheel label="test" data-testid="test-component">
        <tapsi-pinwheel-item value="value-1">آیتم ۱</tapsi-pinwheel-item>
      </tapsi-pinwheel>`,
    );

    const component = page.getByTestId("test-component");

    await expect(component).not.toBeFocused();

    // We expect the component to be automatically focused with `autofocus` attribute.
    await render(
      page,
      `<tapsi-pinwheel label="test" data-testid="test-component" autofocus>test</tapsi-pinwheel>`,
    );

    await expect(component).toBeFocused();
  });

  test("🧪 should change active item and trigger events (`activate` and `activechange`) using click", async ({
    page,
  }) => {
    await render(
      page,
      `
      <tapsi-pinwheel label="test" data-testid="test-pinwheel">
        <tapsi-pinwheel-item value="value-1" data-testid="test-pinwheel-item-1">آیتم ۱</tapsi-pinwheel-item>
        <tapsi-pinwheel-item value="value-2" data-testid="test-pinwheel-item-2">آیتم ۲</tapsi-pinwheel-item>
        <tapsi-pinwheel-item value="value-3" data-testid="test-pinwheel-item-3">آیتم ۳</tapsi-pinwheel-item>
      </tapsi-pinwheel>
    `,
    );

    const container = page.getByTestId("test-pinwheel");

    await expect(container).toHaveJSProperty("value", "value-1");

    // Focus on pinwheel for keyboard interaction
    await page.keyboard.press("Tab");
    await expect(container).toBeFocused();

    // Test arrow keys
    await page.keyboard.press("ArrowDown");
    await expect(container).toHaveJSProperty("value", "value-2");

    await page.keyboard.press("ArrowDown");
    await expect(container).toHaveJSProperty("value", "value-3");

    await page.keyboard.press("ArrowUp");
    await expect(container).toHaveJSProperty("value", "value-2");

    // Test Home and End keys
    await page.keyboard.press("Home");
    await expect(container).toHaveJSProperty("value", "value-1");

    await page.keyboard.press("End");
    await expect(container).toHaveJSProperty("value", "value-3");
  });

  test("🧪 should change active item and trigger events (`activate` and `activechange`) using keyboard navigation", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-pinwheel label="test" data-testid="test-pinwheel">
      <tapsi-pinwheel-item value="value-1" data-testid="test-pinwheel-item-1">آیتم ۱</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="value-2" data-testid="test-pinwheel-item-2">آیتم ۲</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="value-3" data-testid="test-pinwheel-item-3">آیتم ۳</tapsi-pinwheel-item>
    </tapsi-pinwheel>
    `,
    );

    const container = page.getByTestId("test-pinwheel");
    const item1 = page.getByTestId("test-pinwheel-item-1");
    const item2 = page.getByTestId("test-pinwheel-item-2");
    const item3 = page.getByTestId("test-pinwheel-item-3");

    await item1.click();
    await expect(container).toHaveJSProperty("value", "value-1");

    await item2.click();
    await expect(container).toHaveJSProperty("value", "value-2");

    await item3.click();
    await expect(container).toHaveJSProperty("value", "value-3");

    await item1.click();
    await expect(container).toHaveJSProperty("value", "value-1");

    await item3.click();
    await expect(container).toHaveJSProperty("value", "value-3");

    await item2.click();
    await expect(container).toHaveJSProperty("value", "value-2");
  });

  test("🧪 should throw error if no valid label was set for the input", async ({
    page,
  }) => {
    const msgResolver = createPromiseResolvers<string>();

    page.on("console", msg => {
      if (
        msg.type() === "error" &&
        msg.text().includes(scope) &&
        msg
          .text()
          .includes(ErrorMessages.SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE)
      ) {
        msgResolver.resolve(msg.text());
      }
    });

    await render(
      page,
      `
    <tapsi-pinwheel data-testid="test-pinwheel">
      <tapsi-pinwheel-item value="value-1" data-testid="test-pinwheel-item-1">آیتم ۱</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="value-2" data-testid="test-pinwheel-item-2">آیتم ۲</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="value-3" data-testid="test-pinwheel-item-3">آیتم ۳</tapsi-pinwheel-item>
    </tapsi-pinwheel>
    `,
    );

    const msg = await msgResolver.promise;

    expect(msg).toBeDefined();
  });

  test("🧪 should warn developer if no `valuemin` and `valuemax` was passed to sequential numeric pinwheel", async ({
    page,
  }) => {
    const msgResolver = createPromiseResolvers<string>();

    page.on("console", msg => {
      if (
        msg.type() === "warning" &&
        msg.text().includes(scope) &&
        msg.text().includes(ErrorMessages.USE_VALUE_MIN_AND_VALUE_MAX)
      ) {
        msgResolver.resolve(msg.text());
      }
    });

    await render(
      page,
      `
    <tapsi-pinwheel label="test" data-testid="test-pinwheel">
      <tapsi-pinwheel-item value="1" data-testid="test-pinwheel-item-1">آیتم ۱</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="2" data-testid="test-pinwheel-item-2">آیتم ۲</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="3" data-testid="test-pinwheel-item-3">آیتم ۳</tapsi-pinwheel-item>
    </tapsi-pinwheel>
    `,
    );

    const msg = await msgResolver.promise;

    expect(msg).toBeDefined();
  });

  test("🧪 should has required attributes for screen readers", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-pinwheel label="my label" data-testid="test-pinwheel" valuemin="5" valuemax="10">
      <tapsi-pinwheel-item value="1" data-testid="test-pinwheel-item-1">آیتم 1</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="2" data-testid="test-pinwheel-item-2">آیتم 2</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="3" data-testid="test-pinwheel-item-3">آیتم 3</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="4" data-testid="test-pinwheel-item-4">آیتم 4</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="5" data-testid="test-pinwheel-item-5">آیتم 5</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="6" data-testid="test-pinwheel-item-6">آیتم 6</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="7" data-testid="test-pinwheel-item-7">آیتم 7</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="8" data-testid="test-pinwheel-item-8">آیتم 8</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="9" data-testid="test-pinwheel-item-9">آیتم 9</tapsi-pinwheel-item>
      <tapsi-pinwheel-item value="10" data-testid="test-pinwheel-item-10">آیتم 10</tapsi-pinwheel-item>
    </tapsi-pinwheel>
    `,
    );
    const root = page.getByRole("spinbutton");

    await expect(root).toHaveAttribute("aria-label", "my label");
    await expect(root).toHaveAttribute("aria-valuemin", "5");
    await expect(root).toHaveAttribute("aria-valuemax", "10");
    await expect(root).toHaveAttribute("aria-valuenow", "1");
    await expect(root).toHaveAttribute("aria-valuetext", "آیتم 1");
  });
});
