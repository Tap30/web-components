import { describe, expect, render, test } from "@internals/test-helpers";
import { Slots } from "./constants.ts";

describe("🧩 banner", () => {
  test("🧪 should render banner elements", async ({ page }) => {
    await render(
      page,
      `
  <tapsi-banner
      data-testid="test-banner"
      heading="heading"
      description="description"
      image="https://picsum.photos/200"
  >
    <tapsi-button slot=${Slots.ACTION}>click</tapsi-button>
  </tapsi-banner>`,
    );

    const heading = page.locator("tapsi-banner [part=heading]");
    const description = page.locator("tapsi-banner [part=description]");
    const action = page.locator("tapsi-banner [part=action]");

    await expect(heading).toBeVisible();
    await expect(description).toBeVisible();
    await expect(action).toBeVisible();
  });
});
