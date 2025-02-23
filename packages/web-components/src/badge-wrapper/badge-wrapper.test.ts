import {
  afterEach,
  beforeEach,
  describe,
  disposeMocks,
  expect,
  render,
  test,
} from "@internals/test-helpers";

const testIds = {
  badgeWrapper: "test-badge-wrapper",
  badge: "test-badge-wrapper-badge-slot",
  anchor: "test-badge-wrapper-anchor-slot",
};

describe("🧩 badge-wrapper", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should show anchor and badge slots", async ({ page }) => {
    await render(
      page,
      `
      <tapsi-badge-wrapper data-testid="${testIds.badgeWrapper}">
        <tapsi-badge slot="badge" data-testid="${testIds.badge}" value="1" color="success"></tapsi-badge>
        <tapsi-button data-testid="${testIds.anchor}">click</tapsi-button>
      </tapsi-badge-wrapper>`,
    );

    const badgeSlot = page.getByTestId(testIds.badge);
    const anchorSlot = page.getByTestId(testIds.anchor);

    await expect(badgeSlot).toBeVisible();
    await expect(anchorSlot).toBeVisible();
  });
});
