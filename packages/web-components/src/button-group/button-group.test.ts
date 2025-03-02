import { describe, expect, render, test } from "@internals/test-helpers";

describe("🧩 button-group", () => {
  test("🧪 should render it's children", async ({ page }) => {
    await render(
      page,
      `
      <tapsi-button-group label="test-button-group" data-testid="test-button-group">
        <tapsi-button data-testid="test-button-1">دکمه ۱</tapsi-button>
        <tapsi-button data-testid="test-button-2">دکمه ۲</tapsi-button>
      </tapsi-button-group>`,
    );

    const button1 = page.getByTestId("test-button-1");
    const button2 = page.getByTestId("test-button-2");

    await expect(button1).toBeVisible();
    await expect(button2).toBeVisible();
  });

  test("🧪 should work in `horizontal` orientation", async ({ page }) => {
    await render(
      page,
      `
      <tapsi-button-group orientation="horizontal" label="test-button-group" data-testid="test-button-group">
        <tapsi-button data-testid="test-button-1">دکمه ۱</tapsi-button>
        <tapsi-button data-testid="test-button-2">دکمه ۲</tapsi-button>
      </tapsi-button-group>`,
    );

    const button1 = page.getByTestId("test-button-1");
    const button2 = page.getByTestId("test-button-2");

    const button1BoundingBox = await (
      await button1.elementHandle()
    )?.boundingBox();

    const button2BoundingBox = await (
      await button2.elementHandle()
    )?.boundingBox();

    expect(button1BoundingBox!.y).toEqual(button2BoundingBox!.y);
    expect(button1BoundingBox!.x).toBeGreaterThan(button2BoundingBox!.x);
  });

  test("🧪 should work in `vertical` orientation", async ({ page }) => {
    await render(
      page,
      `
      <tapsi-button-group orientation="vertical" label="test-button-group" data-testid="test-button-group">
        <tapsi-button data-testid="test-button-1">دکمه ۱</tapsi-button>
        <tapsi-button data-testid="test-button-2">دکمه ۱</tapsi-button>
      </tapsi-button-group>`,
    );

    const button1 = page.getByTestId("test-button-1");
    const button2 = page.getByTestId("test-button-2");

    const button1BoundingBox = await (
      await button1.elementHandle()
    )?.boundingBox();

    const button2BoundingBox = await (
      await button2.elementHandle()
    )?.boundingBox();

    expect(button1BoundingBox!.x).toEqual(button2BoundingBox!.x);
    expect(button1BoundingBox!.y).toBeLessThan(button2BoundingBox!.y);
  });
});
