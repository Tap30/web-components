import {
  afterEach,
  beforeEach,
  describe,
  disposeMocks,
  expect,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";
import { type Locator } from "@playwright/test";

const expectChips = (chips: Locator[]) => {
  return {
    toBeSelected: async () => {
      for (const chip of chips) {
        await expect(chip).toHaveAttribute("selected");
      }
    },
    notToBeSelected: async () => {
      for (const chip of chips) {
        await expect(chip).not.toHaveAttribute("selected");
      }
    },
  };
};

describe("🧩 chip-group", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪should be able to change focus using tab and shift+tab", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-chip-group label="test-chip-group" data-testid="test-chip-group">
      <tapsi-chip data-testid="test-chip-1" value="1">چیپ ۱</tapsi-chip>
      <tapsi-chip data-testid="test-chip-2" value="2">چیپ ۲</tapsi-chip>
    </tapsi-chip-group>
    `,
    );

    const item1 = page.getByTestId("test-chip-1");
    const item2 = page.getByTestId("test-chip-2");

    await page.keyboard.press("Tab");
    await expect(item1).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(item2).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(item1).toBeFocused();
  });

  test("🧪 should work in single select mode", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-chip-group label="test-chip-group" data-testid="test-chip-group" select-mode="single">
      <tapsi-chip data-testid="test-chip-1" value="1">چیپ ۱</tapsi-chip>
      <tapsi-chip data-testid="test-chip-2" value="2">چیپ ۲</tapsi-chip>
      <tapsi-chip data-testid="test-chip-3" value="3">چیپ ۳</tapsi-chip>
      <tapsi-chip data-testid="test-chip-4" value="4">چیپ ۴</tapsi-chip>
    </tapsi-chip-group>
    `,
    );

    const container = page.getByTestId("test-chip-group");
    const item1 = page.getByTestId("test-chip-1");
    const item2 = page.getByTestId("test-chip-2");
    const item3 = page.getByTestId("test-chip-3");
    const item4 = page.getByTestId("test-chip-4");

    const mocks = await setupMocks(page);
    const fn = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(container, "selectchange", fn.ref);

    await fn.matchResult({ called: false });

    await item1.click();
    await fn.matchResult({ callCount: 1 });
    await expectChips([item1]).toBeSelected();
    await expectChips([item2, item3, item4]).notToBeSelected();

    await item2.click();
    await fn.matchResult({ callCount: 2 });
    await expectChips([item2]).toBeSelected();
    await expectChips([item1, item3, item4]).notToBeSelected();

    await item3.click();
    await fn.matchResult({ callCount: 3 });
    await expectChips([item3]).toBeSelected();
    await expectChips([item1, item2, item4]).notToBeSelected();

    await item4.click();
    await fn.matchResult({ callCount: 4 });
    await expectChips([item4]).toBeSelected();
    await expectChips([item1, item2, item3]).notToBeSelected();
  });

  test("🧪 should work in multiple select", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-chip-group label="test-chip-group" data-testid="test-chip-group" select-mode="multiple">
      <tapsi-chip data-testid="test-chip-1" value="1">چیپ ۱</tapsi-chip>
      <tapsi-chip data-testid="test-chip-2" value="2">چیپ ۲</tapsi-chip>
      <tapsi-chip data-testid="test-chip-3" value="3">چیپ ۳</tapsi-chip>
      <tapsi-chip data-testid="test-chip-4" value="4">چیپ ۴</tapsi-chip>
    </tapsi-chip-group>
    `,
    );

    const item1 = page.getByTestId("test-chip-1");
    const item2 = page.getByTestId("test-chip-2");
    const item3 = page.getByTestId("test-chip-3");
    const item4 = page.getByTestId("test-chip-4");

    await expectChips([item1, item2, item3, item4]).notToBeSelected();

    await item1.click();
    await expectChips([item1]).toBeSelected();
    await expectChips([item2, item3, item4]).notToBeSelected();

    await item2.click();
    await expectChips([item1, item2]).toBeSelected();
    await expectChips([item3, item4]).notToBeSelected();

    await item3.click();
    await expectChips([item1, item2, item3]).toBeSelected();
    await expectChips([item4]).notToBeSelected();

    await item4.click();
    await expectChips([item1, item2, item3, item4]).toBeSelected();
  });

  test("🧪 should work with default value", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-chip-group label="test-chip-group" data-testid="test-chip-group" select-mode="single">
      <tapsi-chip selected data-testid="test-chip-1" value="1">چیپ ۱</tapsi-chip>
      <tapsi-chip data-testid="test-chip-2" value="2">چیپ ۲</tapsi-chip>
    </tapsi-chip-group>
    `,
    );

    const item1 = page.getByTestId("test-chip-1");

    await expect(item1).toHaveAttribute("selected");

    await item1.click();
    await expect(item1).not.toHaveAttribute("selected");
  });
});
