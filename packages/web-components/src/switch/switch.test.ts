import { describe, expect, render, test } from "@internals/test-helpers";

describe("switch", () => {
  test("T1", async ({ page }) => {
    await page.goto("/");

    await render(page, '<div data-testid="testtest">hello</div>');

    const myEl = page.getByTestId("testtest");

    await expect(page).toHaveURL("http://localhost:5173");
    await expect(page).toHaveTitle("Playground");

    await expect(myEl).toHaveText("hello");
  });
});
