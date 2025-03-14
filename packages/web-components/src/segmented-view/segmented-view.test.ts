import {
  afterEach,
  describe,
  disposeMocks,
  expect,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";

describe("🧩 segmented-view", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should change active item and trigger events (`activate` and `activechange`) using click", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-segmented-view data-testid="test-segmented-view">
      <tapsi-segmented-view-item value="value-1" data-testid="test-segmented-view-item-1">آیتم ۱</tapsi-segmented-view-item>
      <tapsi-segmented-view-item value="value-2" data-testid="test-segmented-view-item-2">آیتم ۲</tapsi-segmented-view-item>
    </tapsi-segmented-view>
    `,
    );

    const container = page.getByTestId("test-segmented-view");
    const item1 = page.getByTestId("test-segmented-view-item-1");
    const item2 = page.getByTestId("test-segmented-view-item-2");

    const mocks = await setupMocks(page);
    const handleActivate1 = mocks.createFakeFn();
    const handleActivate2 = mocks.createFakeFn();
    const handleActiveChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(
      item1,
      "activate",
      handleActivate1.ref,
    );
    await mocks.events.attachMockedEvent(
      item2,
      "activate",
      handleActivate2.ref,
    );
    await mocks.events.attachMockedEvent(
      container,
      "activechange",
      handleActiveChange.ref,
    );

    await handleActiveChange.matchResult({ called: false });

    await item1.click();
    await handleActivate1.matchResult({ callCount: 1 });
    await handleActivate2.matchResult({ callCount: 0 });
    await handleActiveChange.matchResult({ callCount: 1 });
    await expect(item1).toHaveJSProperty("active", true);
    await expect(item2).toHaveJSProperty("active", false);

    await item2.click();
    await handleActivate1.matchResult({ callCount: 1 });
    await handleActivate2.matchResult({ callCount: 1 });
    await handleActiveChange.matchResult({ callCount: 2 });
    await expect(item2).toHaveJSProperty("active", true);
    await expect(item1).toHaveJSProperty("active", false);

    await item1.click();
    await handleActivate1.matchResult({ callCount: 2 });
    await handleActivate2.matchResult({ callCount: 1 });
    await handleActiveChange.matchResult({ callCount: 3 });
    await expect(item1).toHaveJSProperty("active", true);
    await expect(item2).toHaveJSProperty("active", false);

    await item2.click();
    await handleActivate1.matchResult({ callCount: 2 });
    await handleActivate2.matchResult({ callCount: 2 });
    await handleActiveChange.matchResult({ callCount: 4 });
    await expect(item2).toHaveJSProperty("active", true);
    await expect(item1).toHaveJSProperty("active", false);
  });

  test("🧪 should change active item and trigger events (`activate` and `activechange`) using keyboard navigation", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-segmented-view data-testid="test-segmented-view">
      <tapsi-segmented-view-item value="value-1" data-testid="test-segmented-view-item-1" value="1">آیتم ۱</tapsi-segmented-view-item>
      <tapsi-segmented-view-item value="value-2" data-testid="test-segmented-view-item-2" value="2">آیتم ۲</tapsi-segmented-view-item>
    </tapsi-segmented-view>
    `,
    );

    const container = page.getByTestId("test-segmented-view");
    const item1 = page.getByTestId("test-segmented-view-item-1");
    const item2 = page.getByTestId("test-segmented-view-item-2");

    const mocks = await setupMocks(page);
    const handleActivate1 = mocks.createFakeFn();
    const handleActivate2 = mocks.createFakeFn();
    const handleActiveChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(
      item1,
      "activate",
      handleActivate1.ref,
    );
    await mocks.events.attachMockedEvent(
      item2,
      "activate",
      handleActivate2.ref,
    );
    await mocks.events.attachMockedEvent(
      container,
      "activechange",
      handleActiveChange.ref,
    );

    await handleActiveChange.matchResult({ called: false });

    await page.keyboard.press("Tab");
    await expect(item1).toBeFocused();
    await page.keyboard.press("Space");
    await handleActivate1.matchResult({ callCount: 1 });
    await handleActivate2.matchResult({ callCount: 0 });
    await handleActiveChange.matchResult({ callCount: 1 });
    await expect(item1).toHaveJSProperty("active", true);
    await expect(item2).toHaveJSProperty("active", false);

    await page.keyboard.press("ArrowLeft");
    await expect(item2).toBeFocused();
    await page.keyboard.press("Space");
    await handleActivate1.matchResult({ callCount: 1 });
    await handleActivate2.matchResult({ callCount: 1 });
    await handleActiveChange.matchResult({ callCount: 2 });
    await expect(item2).toHaveJSProperty("active", true);
    await expect(item1).toHaveJSProperty("active", false);

    await page.keyboard.press("ArrowRight");
    await expect(item1).toBeFocused();
    await page.keyboard.press("Space");
    await handleActivate1.matchResult({ callCount: 2 });
    await handleActivate2.matchResult({ callCount: 1 });
    await handleActiveChange.matchResult({ callCount: 3 });
    await expect(item1).toHaveJSProperty("active", true);
    await expect(item2).toHaveJSProperty("active", false);
  });
});
