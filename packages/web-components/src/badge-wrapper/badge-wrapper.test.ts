import {
  beforeEach,
  describe,
  expect,
  render,
  test,
} from "@internals/test-helpers";

describe("🧩 badge-wrapper", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("🧪 should show anchor and badge slots in all anchor shapes", async ({
    page,
  }) => {
    const anchorShapes = ["rectangle", "circle", "pill"];

    for (const anchorShape of anchorShapes) {
      await render(
        page,
        `
        <tapsi-badge-wrapper data-testid="test-badge-wrapper" anchor-shape="${anchorShape}">
          <tapsi-badge slot="badge" data-testid="test-badge-wrapper-badge-slot" value="1" color="success"></tapsi-badge>
          <tapsi-button data-testid="test-badge-wrapper-anchor-slot">click</tapsi-button>
        </tapsi-badge-wrapper>`,
      );

      const badgeSlot = page.getByTestId("test-badge-wrapper-badge-slot");
      const anchorSlot = page.getByTestId("test-badge-wrapper-anchor-slot");

      await expect(badgeSlot).toBeVisible();
      await expect(anchorSlot).toBeVisible();
    }
  });

  test("🧪 should place badge correctly in `circle` anchor shape", async ({
    page,
  }) => {
    await render(
      page,
      `
        <tapsi-badge-wrapper badge-side="left" data-testid="test-badge-wrapper" anchor-shape="circle">
          <tapsi-badge slot="badge" data-testid="test-badge-wrapper-badge-slot" value="1" color="success"></tapsi-badge>
          <div data-testid="test-badge-wrapper-anchor-slot" style="border-radius: 50%; height: 400px; width: 600px; background: red;"></div>
        </tapsi-badge-wrapper>`,
    );

    const badgeSlot = page.getByTestId("test-badge-wrapper-badge-slot");
    const anchorSlot = page.getByTestId("test-badge-wrapper-anchor-slot");

    const badgeBoundingBox = await (
      await badgeSlot.elementHandle()
    )?.boundingBox();

    const anchorBoundingBox = await (
      await anchorSlot.elementHandle()
    )?.boundingBox();

    // We calculate the badge offset is component using this formula:

    const expectedBadgeXOffset = (anchorBoundingBox!.width * 14.5) / 100;
    const expectedBadgeYOffset = (anchorBoundingBox!.height * 14.5) / 100;

    // When we actually render the components in DOM, the actual coordinates of the badge is not as same as the
    // calculated number inside the code, because the browser has some constraints in positioning elements based on
    // pixel density. So we define a threshold and expect the difference of actual coordinate and the expected one to be
    // less than the threshold.

    const THRESHOLD = 0.0001;

    const actualBadgeYOffset =
      badgeBoundingBox!.y +
      0.5 * badgeBoundingBox!.height -
      anchorBoundingBox!.y;

    const actualBadgeXOffset =
      badgeBoundingBox!.x +
      0.5 * badgeBoundingBox!.width -
      anchorBoundingBox!.x;

    const xDiff = actualBadgeXOffset - expectedBadgeXOffset;
    const yDiff = actualBadgeYOffset - expectedBadgeYOffset;

    expect(xDiff).toBeLessThan(THRESHOLD);
    expect(yDiff).toBeLessThan(THRESHOLD);
  });

  test("🧪 should place badge correctly in `pill` anchor shape", async ({
    page,
  }) => {
    await render(
      page,
      `
        <tapsi-badge-wrapper badge-side="left" data-testid="test-badge-wrapper" anchor-shape="pill">
          <tapsi-badge slot="badge" data-testid="test-badge-wrapper-badge-slot" value="1" color="success"></tapsi-badge>
          <div data-testid="test-badge-wrapper-anchor-slot" style="border-radius: 99999px; height: 400px; width: 600px; background: red;"></div>
        </tapsi-badge-wrapper>`,
    );

    const badgeSlot = page.getByTestId("test-badge-wrapper-badge-slot");
    const anchorSlot = page.getByTestId("test-badge-wrapper-anchor-slot");

    const badgeBoundingBox = await (
      await badgeSlot.elementHandle()
    )?.boundingBox();

    const anchorBoundingBox = await (
      await anchorSlot.elementHandle()
    )?.boundingBox();

    // We calculate the badge offset is component using this formula:

    const expectedBadgeOffset =
      anchorBoundingBox!.height * (Math.sqrt(2) / 4) * (Math.sqrt(2) - 1);

    // When we actually render the components in DOM, the actual coordinates of the badge is not as same as the
    // calculated number inside the code, because the browser has some constraints in positioning elements based on
    // pixel density. So we define a threshold and expect the difference of actual coordinate and the expected one to be
    // less than the threshold.

    const THRESHOLD = 0.0001;

    const actualBadgeYOffset =
      badgeBoundingBox!.y +
      0.5 * badgeBoundingBox!.height -
      anchorBoundingBox!.y;

    const actualBadgeXOffset =
      badgeBoundingBox!.x +
      0.5 * badgeBoundingBox!.width -
      anchorBoundingBox!.x;

    const xDiff = actualBadgeXOffset - expectedBadgeOffset;
    const yDiff = actualBadgeYOffset - expectedBadgeOffset;

    expect(xDiff).toBeLessThan(THRESHOLD);
    expect(yDiff).toBeLessThan(THRESHOLD);
  });

  test("🧪 should place badge correctly in `rectangle` anchor shape", async ({
    page,
  }) => {
    await render(
      page,
      `
        <tapsi-badge-wrapper badge-side="left" data-testid="test-badge-wrapper" anchor-shape="rectangle">
          <tapsi-badge slot="badge" data-testid="test-badge-wrapper-badge-slot" value="1" color="success"></tapsi-badge>
          <div data-testid="test-badge-wrapper-anchor-slot" style="height: 400px; width: 600px; background: red;"></div>
        </tapsi-badge-wrapper>`,
    );

    const badgeSlot = page.getByTestId("test-badge-wrapper-badge-slot");
    const anchorSlot = page.getByTestId("test-badge-wrapper-anchor-slot");

    const badgeBoundingBox = await (
      await badgeSlot.elementHandle()
    )?.boundingBox();

    const anchorBoundingBox = await (
      await anchorSlot.elementHandle()
    )?.boundingBox();

    const actualBadgeYOffset =
      badgeBoundingBox!.y +
      0.5 * badgeBoundingBox!.height -
      anchorBoundingBox!.y;

    const actualBadgeXOffset =
      badgeBoundingBox!.x +
      0.5 * badgeBoundingBox!.width -
      anchorBoundingBox!.x;

    expect(actualBadgeXOffset).toBe(0);
    expect(actualBadgeYOffset).toBe(0);
  });
});
