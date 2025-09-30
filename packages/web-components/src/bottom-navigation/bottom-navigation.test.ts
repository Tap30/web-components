import {
  afterEach,
  describe,
  disposeMocks,
  expect,
  forEachLocator,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";
import { Slots } from "./item/constants.ts";
import { type BottomNavigationItem } from "./item/index.ts";

describe("🧩 bottom-navigation-item", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should trigger `activate` event for toggling each item", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-bottom-navigation data-testid="test-bottom-navigation">
      <tapsi-bottom-navigation-item value="value-1" data-testid="test-bottom-navigation-item-1">آیتم ۱</tapsi-bottom-navigation-item>
      <tapsi-bottom-navigation-item value="value-2" data-testid="test-bottom-navigation-item-2">آیتم ۲</tapsi-bottom-navigation-item>
    </tapsi-bottom-navigation>
    `,
    );

    const item1 = page.getByTestId("test-bottom-navigation-item-1");
    const item2 = page.getByTestId("test-bottom-navigation-item-2");

    const mocks = await setupMocks(page);
    const handleActivate1 = mocks.createFakeFn();
    const handleActivate2 = mocks.createFakeFn();

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

    await item1.click();
    await handleActivate1.matchResult({ callCount: 1 });
    await handleActivate2.matchResult({ callCount: 0 });
    await expect(item1).toHaveJSProperty("active", true);
    await expect(item2).toHaveJSProperty("active", false);

    await item2.click();
    await handleActivate1.matchResult({ callCount: 1 });
    await handleActivate2.matchResult({ callCount: 1 });
    await expect(item2).toHaveJSProperty("active", true);
    await expect(item1).toHaveJSProperty("active", false);

    await item1.click();
    await handleActivate1.matchResult({ callCount: 2 });
    await handleActivate2.matchResult({ callCount: 1 });
    await expect(item1).toHaveJSProperty("active", true);
    await expect(item2).toHaveJSProperty("active", false);

    await item2.click();
    await handleActivate1.matchResult({ callCount: 2 });
    await handleActivate2.matchResult({ callCount: 2 });
    await expect(item2).toHaveJSProperty("active", true);
    await expect(item1).toHaveJSProperty("active", false);
  });

  test("🧪 should be able to activate using javascript", async ({ page }) => {
    await render(
      page,
      `
      <tapsi-bottom-navigation-item value="value-1" data-testid="test-bottom-navigation-item-1" id="test-bottom-navigation-item-1">
        آیتم ۱
      </tapsi-bottom-navigation-item>
    `,
    );

    const item1 = page.getByTestId("test-bottom-navigation-item-1");

    await expect(item1).toHaveJSProperty("active", false);

    await page.evaluate(() => {
      const item = document.getElementById(
        "test-bottom-navigation-item-1",
      ) as BottomNavigationItem;

      item.active = true;
    });

    await expect(item1).toHaveJSProperty("active", true);
  });

  test("🧪 should show icon slot", async ({ page }) => {
    await render(
      page,
      `
      <tapsi-bottom-navigation-item value="value-1" data-testid="test-bottom-navigation-item-1">
        <svg data-testid="test-bottom-navigation-item-icon" slot=${Slots.ICON} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9996 22C10.7496 22 9.57878 21.7625 8.48711 21.2875C7.39544 20.8125 6.44544 20.1708 5.63711 19.3625C4.82878 18.5541 4.18711 17.6041 3.71211 16.5125C3.23711 15.4208 2.99961 14.25 2.99961 13C2.99961 11.75 3.23711 10.5791 3.71211 9.48748C4.18711 8.39581 4.82878 7.44581 5.63711 6.63748C6.44544 5.82914 7.39544 5.18748 8.48711 4.71248C9.57878 4.23748 10.7496 3.99998 11.9996 3.99998C13.2496 3.99998 14.4204 4.23748 15.5121 4.71248C16.6038 5.18748 17.5538 5.82914 18.3621 6.63748C19.1704 7.44581 19.8121 8.39581 20.2871 9.48748C20.7621 10.5791 20.9996 11.75 20.9996 13C20.9996 14.25 20.7621 15.4208 20.2871 16.5125C19.8121 17.6041 19.1704 18.5541 18.3621 19.3625C17.5538 20.1708 16.6038 20.8125 15.5121 21.2875C14.4204 21.7625 13.2496 22 11.9996 22ZM14.7996 17.2L16.1996 15.8L12.9996 12.6V7.99998H10.9996V13.4L14.7996 17.2ZM5.59961 2.34998L6.99961 3.74998L2.74961 7.99998L1.34961 6.59998L5.59961 2.34998ZM18.3996 2.34998L22.6496 6.59998L21.2496 7.99998L16.9996 3.74998L18.3996 2.34998ZM11.9996 20C13.9496 20 15.6038 19.3208 16.9621 17.9625C18.3204 16.6041 18.9996 14.95 18.9996 13C18.9996 11.05 18.3204 9.39581 16.9621 8.03748C15.6038 6.67914 13.9496 5.99998 11.9996 5.99998C10.0496 5.99998 8.39544 6.67914 7.03711 8.03748C5.67878 9.39581 4.99961 11.05 4.99961 13C4.99961 14.95 5.67878 16.6041 7.03711 17.9625C8.39544 19.3208 10.0496 20 11.9996 20Z" fill="black"/>
        </svg>
        آیتم ۱
      </tapsi-bottom-navigation-item>
    `,
    );

    const icon = page.getByTestId("test-bottom-navigation-item-icon");

    await expect(icon).toBeVisible();
  });
});

describe("🧩 bottom-navigation", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should trigger `activate` event for toggling each item", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-bottom-navigation data-testid="test-bottom-navigation">
      <tapsi-bottom-navigation-item value="value-1" data-testid="test-bottom-navigation-item-1">آیتم ۱</tapsi-bottom-navigation-item>
      <tapsi-bottom-navigation-item value="value-2" data-testid="test-bottom-navigation-item-2">آیتم ۲</tapsi-bottom-navigation-item>
    </tapsi-bottom-navigation>
    `,
    );

    const item1 = page.getByTestId("test-bottom-navigation-item-1");
    const item2 = page.getByTestId("test-bottom-navigation-item-2");

    const mocks = await setupMocks(page);
    const handleActivate1 = mocks.createFakeFn();
    const handleActivate2 = mocks.createFakeFn();

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

    await item1.click();
    await handleActivate1.matchResult({ callCount: 1 });
    await handleActivate2.matchResult({ callCount: 0 });
    await expect(item1).toHaveJSProperty("active", true);
    await expect(item2).toHaveJSProperty("active", false);

    await item2.click();
    await handleActivate1.matchResult({ callCount: 1 });
    await handleActivate2.matchResult({ callCount: 1 });
    await expect(item2).toHaveJSProperty("active", true);
    await expect(item1).toHaveJSProperty("active", false);

    await item1.click();
    await handleActivate1.matchResult({ callCount: 2 });
    await handleActivate2.matchResult({ callCount: 1 });
    await expect(item1).toHaveJSProperty("active", true);
    await expect(item2).toHaveJSProperty("active", false);

    await item2.click();
    await handleActivate1.matchResult({ callCount: 2 });
    await handleActivate2.matchResult({ callCount: 2 });
    await expect(item2).toHaveJSProperty("active", true);
    await expect(item1).toHaveJSProperty("active", false);
  });

  test("🧪 should be able to change focus using tab and shift+tab", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-bottom-navigation data-testid="test-bottom-navigation">
      <tapsi-bottom-navigation-item value="value-1" data-testid="test-bottom-navigation-item-1" value="1">آیتم ۱</tapsi-bottom-navigation-item>
      <tapsi-bottom-navigation-item value="value-2" data-testid="test-bottom-navigation-item-2" value="2">آیتم ۲</tapsi-bottom-navigation-item>
    </tapsi-bottom-navigation>
    `,
    );

    const item1 = page.getByTestId("test-bottom-navigation-item-1");
    const item2 = page.getByTestId("test-bottom-navigation-item-2");

    await page.keyboard.press("Tab");
    await expect(item1).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(item2).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(item1).toBeFocused();
  });

  test("🧪 should trigger the `activechange` event by changing the active item using click", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-bottom-navigation data-testid="test-bottom-navigation">
      <tapsi-bottom-navigation-item value="value-1" data-testid="test-bottom-navigation-item-1">آیتم ۱</tapsi-bottom-navigation-item>
      <tapsi-bottom-navigation-item value="value-2" data-testid="test-bottom-navigation-item-2">آیتم ۲</tapsi-bottom-navigation-item>
      <tapsi-bottom-navigation-item value="value-3" data-testid="test-bottom-navigation-item-3">آیتم ۳</tapsi-bottom-navigation-item>
      <tapsi-bottom-navigation-item value="value-4" data-testid="test-bottom-navigation-item-4">آیتم ۴</tapsi-bottom-navigation-item>
    </tapsi-bottom-navigation>
    `,
    );

    const container = page.getByTestId("test-bottom-navigation");
    const item1 = page.getByTestId("test-bottom-navigation-item-1");
    const item2 = page.getByTestId("test-bottom-navigation-item-2");
    const item3 = page.getByTestId("test-bottom-navigation-item-3");
    const item4 = page.getByTestId("test-bottom-navigation-item-4");

    const mocks = await setupMocks(page);
    const handleActiveChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(
      container,
      "activechange",
      handleActiveChange.ref,
    );

    await handleActiveChange.matchResult({ called: false });

    await item1.click();
    await handleActiveChange.matchResult({ callCount: 1 });
    await expect(item1).toHaveJSProperty("active", true);
    await forEachLocator(
      [item2, item3, item4],
      async item => await expect(item).not.toHaveAttribute("active"),
    );

    await item2.click();
    await handleActiveChange.matchResult({ callCount: 2 });
    await expect(item2).toHaveJSProperty("active", true);
    await forEachLocator(
      [item1, item3, item4],
      async item => await expect(item).not.toHaveAttribute("active"),
    );

    await item3.click();
    await handleActiveChange.matchResult({ callCount: 3 });
    await expect(item3).toHaveJSProperty("active", true);
    await forEachLocator(
      [item1, item2, item4],
      async item => await expect(item).not.toHaveAttribute("active"),
    );

    await item4.click();
    await handleActiveChange.matchResult({ callCount: 4 });
    await expect(item4).toHaveJSProperty("active", true);
    await forEachLocator(
      [item1, item2, item3],
      async item => await expect(item).not.toHaveAttribute("active"),
    );
  });

  test("🧪 should trigger the `activechange` event by changing the active item using keyboard navigation", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-bottom-navigation data-testid="test-bottom-navigation">
      <tapsi-bottom-navigation-item data-testid="test-bottom-navigation-item-1" value="value-1">آیتم ۱</tapsi-bottom-navigation-item>
      <tapsi-bottom-navigation-item data-testid="test-bottom-navigation-item-2" value="value-2">آیتم ۲</tapsi-bottom-navigation-item>
      <tapsi-bottom-navigation-item data-testid="test-bottom-navigation-item-3" value="value-3">آیتم ۳</tapsi-bottom-navigation-item>
      <tapsi-bottom-navigation-item data-testid="test-bottom-navigation-item-4" value="value-4">آیتم ۴</tapsi-bottom-navigation-item>
    </tapsi-bottom-navigation>
    `,
    );

    const container = page.getByTestId("test-bottom-navigation");
    const item1 = page.getByTestId("test-bottom-navigation-item-1");
    const item2 = page.getByTestId("test-bottom-navigation-item-2");
    const item3 = page.getByTestId("test-bottom-navigation-item-3");
    const item4 = page.getByTestId("test-bottom-navigation-item-4");

    const mocks = await setupMocks(page);
    const handleActiveChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(
      container,
      "activechange",
      handleActiveChange.ref,
    );

    await handleActiveChange.matchResult({ called: false });

    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await handleActiveChange.matchResult({ callCount: 1 });
    await expect(item1).toHaveJSProperty("active", true);
    await forEachLocator(
      [item2, item3, item4],
      async item => await expect(item).not.toHaveAttribute("active"),
    );

    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await handleActiveChange.matchResult({ callCount: 2 });
    await expect(item2).toHaveJSProperty("active", true);
    await forEachLocator(
      [item1, item3, item4],
      async item => await expect(item).not.toHaveAttribute("active"),
    );

    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await handleActiveChange.matchResult({ callCount: 3 });
    await expect(item3).toHaveJSProperty("active", true);
    await forEachLocator(
      [item1, item2, item4],
      async item => await expect(item).not.toHaveAttribute("active"),
    );

    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await handleActiveChange.matchResult({ callCount: 4 });
    await expect(item4).toHaveJSProperty("active", true);
    await forEachLocator(
      [item1, item2, item3],
      async item => await expect(item).not.toHaveAttribute("active"),
    );
  });
});
