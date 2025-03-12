import {
  afterEach,
  describe,
  disposeMocks,
  expect,
  render,
  test,
} from "@internals/test-helpers";

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

  // TODO: add other tests after fixing delay
});
