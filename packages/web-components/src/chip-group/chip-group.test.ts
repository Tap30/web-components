import {
  afterEach,
  beforeEach,
  describe,
  disposeMocks,
  expect,
  forEachLocator,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";

describe("🧩 chip-group", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should be able to change focus using tab and shift+tab", async ({
    page,
  }) => {
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
    const handleSelectChange = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(
      container,
      "selectchange",
      handleSelectChange.ref,
    );

    await handleSelectChange.matchResult({ called: false });

    await item1.click();
    await handleSelectChange.matchResult({ callCount: 1 });
    await expect(item1).toHaveAttribute("selected");
    await forEachLocator([item2, item3, item4], async chip => {
      await expect(chip).not.toHaveAttribute("selected");
    });

    await item2.click();
    await handleSelectChange.matchResult({ callCount: 2 });
    await expect(item2).toHaveAttribute("selected");
    await forEachLocator([item1, item3, item4], async chip => {
      await expect(chip).not.toHaveAttribute("selected");
    });

    await item3.click();
    await handleSelectChange.matchResult({ callCount: 3 });
    await expect(item3).toHaveAttribute("selected");
    await forEachLocator([item1, item2, item4], async chip => {
      await expect(chip).not.toHaveAttribute("selected");
    });

    await item4.click();
    await handleSelectChange.matchResult({ callCount: 4 });
    await expect(item4).toHaveAttribute("selected");
    await forEachLocator([item1, item2, item3], async chip => {
      await expect(chip).not.toHaveAttribute("selected");
    });
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

    await forEachLocator([item1, item2, item3, item4], async chip => {
      await expect(chip).not.toHaveAttribute("selected");
    });

    await item1.click();
    await expect(item1).toHaveAttribute("selected");
    await forEachLocator([item2, item3, item4], async chip => {
      await expect(chip).not.toHaveAttribute("selected");
    });

    await item2.click();
    await forEachLocator([item1, item2], async chip => {
      await expect(chip).toHaveAttribute("selected");
    });
    await forEachLocator([item3, item4], async chip => {
      await expect(chip).not.toHaveAttribute("selected");
    });

    await item3.click();
    await forEachLocator([item1, item2, item3], async chip => {
      await expect(chip).toHaveAttribute("selected");
    });
    await expect(item4).not.toHaveAttribute("selected");

    await item4.click();
    await forEachLocator([item1, item2, item3, item4], async chip => {
      await expect(chip).toHaveAttribute("selected");
    });
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

  test("🧪 should work with multiple `cols` in `vertical` orientation", async ({
    page,
  }) => {
    // we have 6 chips (c1-c6) inside out chip group.
    await render(
      page,
      `
    <tapsi-chip-group
      cols="3"
      orientation="vertical"
      label="test-chip-group"
      data-testid="test-chip-group"
      select-mode="single"
    >
      <tapsi-chip data-testid="test-chip-1" value="test">c1</tapsi-chip>
      <tapsi-chip data-testid="test-chip-2" value="test">c2</tapsi-chip>
      <tapsi-chip data-testid="test-chip-3" value="test">c3</tapsi-chip>
      <tapsi-chip data-testid="test-chip-4" value="test">c4</tapsi-chip>
      <tapsi-chip data-testid="test-chip-5" value="test">c5</tapsi-chip>
      <tapsi-chip data-testid="test-chip-6" value="test">c6</tapsi-chip>
    </tapsi-chip-group>
    `,
    );

    const item1 = page.getByTestId("test-chip-1");
    const item2 = page.getByTestId("test-chip-2");
    const item3 = page.getByTestId("test-chip-3");
    const item4 = page.getByTestId("test-chip-4");
    const item5 = page.getByTestId("test-chip-5");
    const item6 = page.getByTestId("test-chip-6");

    const item1BoundingBox = await (await item1.elementHandle())?.boundingBox();
    const item2BoundingBox = await (await item2.elementHandle())?.boundingBox();
    const item3BoundingBox = await (await item3.elementHandle())?.boundingBox();
    const item4BoundingBox = await (await item4.elementHandle())?.boundingBox();
    const item5BoundingBox = await (await item5.elementHandle())?.boundingBox();
    const item6BoundingBox = await (await item6.elementHandle())?.boundingBox();

    const { x: item1X, y: item1Y } = item1BoundingBox!;
    const { x: item2X, y: item2Y } = item2BoundingBox!;
    const { x: item3X, y: item3Y } = item3BoundingBox!;
    const { x: item4X, y: item4Y } = item4BoundingBox!;
    const { x: item5X, y: item5Y } = item5BoundingBox!;
    const { x: item6X, y: item6Y } = item6BoundingBox!;

    // We expect c1, c2 and c3 to be in first row...
    expect(item1Y).toEqual(item2Y);
    expect(item2Y).toEqual(item3Y);

    // ...and c4, c5, and c6 to be in the second row;
    expect(item4Y).toEqual(item5Y);
    expect(item5Y).toEqual(item6Y);

    // obviously the first row should be on top of the second one.
    expect(item1Y).toBeLessThan(item4Y);

    // Now we need to check if the chips are correctly positions based in columns:
    expect(item1X).toEqual(item4X);
    expect(item2X).toEqual(item5X);
    expect(item3X).toEqual(item6X);
  });
});
