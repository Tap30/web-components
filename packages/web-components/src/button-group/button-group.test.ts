import {
  beforeEach,
  describe,
  expect,
  render,
  test,
} from "@internals/test-helpers";

describe("🧩 button-group", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

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

  test("🧪 should be able to fluid items with `fluid-items` attribute", async ({
    page,
  }) => {
    const containerStyles = [
      "display:flex",
      "width: 100vw",
      "flex-direction: column",
      "align-items: stretch",
    ].join(";");

    // Without the `fluid-items` attributes, a button with larger text should take more space than the other
    await render(
      page,
      `
      <div style="${containerStyles}">
        <tapsi-button-group orientation="horizontal" label="test-button-group" data-testid="test-button-group">
          <tapsi-button data-testid="test-button-1">یک متن خیلی طولانی‌تر</tapsi-button>
          <tapsi-button data-testid="test-button-2">دکمه ۲</tapsi-button>
        </tapsi-button-group>
      </div>`,
    );

    const largerButton = page.getByTestId("test-button-1");
    const smallerButton = page.getByTestId("test-button-2");

    let largerButtonBoundingBox = await (
      await largerButton.elementHandle()
    )?.boundingBox();

    let smallerButtonBoundingBox = await (
      await smallerButton.elementHandle()
    )?.boundingBox();

    expect(smallerButtonBoundingBox!.width).toBeLessThan(
      largerButtonBoundingBox!.width,
    );

    // But if we set `fluid-items`, both buttons try to fill the available space inside the button group. if the
    // button group has enough length (in this case 100vw), we expect both buttons fill the button group equally.

    await render(
      page,
      `
      <div style="${containerStyles}">
        <tapsi-button-group fluid-items orientation="horizontal" label="test-button-group" data-testid="test-button-group">
          <tapsi-button data-testid="test-button-1">یک متن خیلی طولانی‌تر</tapsi-button>
          <tapsi-button data-testid="test-button-2">دکمه ۲</tapsi-button>
        </tapsi-button-group>
      </div>`,
    );

    largerButtonBoundingBox = await (
      await largerButton.elementHandle()
    )?.boundingBox();

    smallerButtonBoundingBox = await (
      await smallerButton.elementHandle()
    )?.boundingBox();

    expect(smallerButtonBoundingBox!.width).toEqual(
      largerButtonBoundingBox!.width,
    );

    // Also in `vertical` orientation, we expect the buttons have the same with as the button group component.

    await render(
      page,
      `
      <div style="${containerStyles}">
        <tapsi-button-group fluid-items orientation="vertical" label="test-button-group" data-testid="test-button-group">
          <tapsi-button data-testid="test-button-1">یک متن خیلی طولانی‌تر</tapsi-button>
          <tapsi-button data-testid="test-button-2">دکمه ۲</tapsi-button>
        </tapsi-button-group>
      </div>`,
    );

    const container = page.getByTestId("test-button-group");

    const containerBoundingBox = await (
      await container.elementHandle()
    )?.boundingBox();

    largerButtonBoundingBox = await (
      await largerButton.elementHandle()
    )?.boundingBox();

    smallerButtonBoundingBox = await (
      await smallerButton.elementHandle()
    )?.boundingBox();

    expect(containerBoundingBox.width).toEqual(largerButtonBoundingBox!.width);
    expect(containerBoundingBox.width).toEqual(smallerButtonBoundingBox!.width);
  });
});
