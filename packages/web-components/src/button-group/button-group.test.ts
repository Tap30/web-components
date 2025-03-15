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
});
