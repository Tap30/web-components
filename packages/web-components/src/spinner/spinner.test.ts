import { describe, expect, render, test } from "@internals/test-helpers";

describe("🧩 spinner", () => {
  test("🧪 should be hidden for screen readers", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-spinner
      data-testid="test-spinner"
    ></tapsi-spinner>
    `,
    );
    const root = page.locator("tapsi-spinner svg");

    await expect(root).toHaveAttribute("aria-hidden", "true");
  });

  test("🧪 should get absolute size from `size` attribute", async ({
    page,
  }) => {
    const size = 200;

    await render(
      page,
      `
    <tapsi-spinner
      data-testid="test-spinner"
      size="${size}"
    ></tapsi-spinner>
    `,
    );
    const spinner = page.getByTestId("test-spinner");

    const boundingBox = await (await spinner.elementHandle())?.boundingBox();
    const { width, height } = boundingBox!;

    expect(width).toBe(size);
    expect(height).toBe(size);
  });

  test("🧪 should get size of the parent element if the size was `auto`", async ({
    page,
  }) => {
    const size = 200;

    await render(
      page,
      `
    <div style="width: ${size}px; height: ${size}px;">
      <tapsi-spinner
        data-testid="test-spinner"
        size="auto"
      ></tapsi-spinner>
    </div>
    `,
    );
    const spinner = page.getByTestId("test-spinner");

    const boundingBox = await (await spinner.elementHandle())?.boundingBox();
    const { width, height } = boundingBox!;

    expect(width).toBe(size);
    expect(height).toBe(size);
  });
});
