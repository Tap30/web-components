import { describe, expect, render, test } from "@internals/test-helpers";

describe("🧩 progress-indicator", () => {
  test("🧪 should show correct steps based on attributes", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-progress-indicator
      data-testid="test-progress-indicator"
      label="my label"
      steps="5"
      valueText="value text"
      current="2"
    ></tapsi-progress-indicator>
    `,
    );

    const steps = page.locator(`tapsi-progress-indicator [part="root"] .step`);

    await expect(steps).toHaveCount(5);

    for (let i = 0; i < (await steps.count()); i++) {
      await expect(steps.nth(i)).toHaveClass(` step ${i < 2 ? "active " : ""}`);
    }
  });

  test("🧪 should have required attributes for screen readers", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-progress-indicator
      data-testid="test-progress-indicator"
      label="my label"
      steps="5"
      valueText="value text"
      current="2"
    ></tapsi-progress-indicator>
    `,
    );

    const root = page.locator(`tapsi-progress-indicator [part="root"]`);

    await expect(root).toHaveAttribute("aria-label", "my label");
    await expect(root).toHaveAttribute("role", "progressbar");
    await expect(root).toHaveAttribute("role", "progressbar");
    await expect(root).toHaveAttribute("aria-valuemin", "0");
    await expect(root).toHaveAttribute("aria-valuemax", "5");
    await expect(root).toHaveAttribute("aria-valuenow", "2");
    await expect(root).toHaveAttribute("aria-valuetext", "value text");
  });
});
