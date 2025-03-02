import {
  beforeEach,
  describe,
  expect,
  render,
  test,
} from "@internals/test-helpers";

describe("🧩 tooltip", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("🧪 should be visible to user", async ({ page }) => {
    await render(
      page,
      `
        <tapsi-button id="anchor" data-testid="test-anchor">button</tapsi-button>
        <tapsi-tooltip text="tooltip" placement="bottom" anchor="anchor" visible data-testid="test-tooltip">tooltip</tapsi-tooltip>
    `,
    );

    const anchor = page.getByTestId("test-anchor");
    const tooltip = page.getByTestId("test-tooltip").getByRole("tooltip");

    await expect(anchor).toBeVisible();
    await expect(tooltip).toBeVisible();
  });

  test("🧪 should be dismissible only with `dismissible` attribute", async ({
    page,
  }) => {
    const dismissButton = page.getByTestId("test-tooltip").getByRole("button");
    const tooltip = page.getByTestId("test-tooltip").getByRole("tooltip");

    await render(
      page,
      `
      <tapsi-button id="anchor" data-testid="test-anchor">button</tapsi-button>
      <tapsi-tooltip text="tooltip" placement="bottom" anchor="anchor" visible data-testid="test-tooltip">tooltip</tapsi-tooltip>
    `,
    );
    await expect(dismissButton).toBeHidden();

    await render(
      page,
      `
      <tapsi-button id="anchor" data-testid="test-anchor">button</tapsi-button>
      <tapsi-tooltip text="tooltip" placement="bottom" anchor="anchor" dismissible visible data-testid="test-tooltip">tooltip</tapsi-tooltip>
    `,
    );
    await expect(dismissButton).toBeVisible();

    await dismissButton.click();
    await expect(tooltip).toBeHidden();
  });

  test("🧪 should show tooltip on hover based on value of `no-hover-activation` attribute", async ({
    page,
  }) => {
    const tooltip = page.getByTestId("test-tooltip").getByRole("tooltip");
    const anchor = page.getByTestId("test-anchor");

    await render(
      page,
      `
      <tapsi-button id="anchor" data-testid="test-anchor">button</tapsi-button>
      <tapsi-tooltip text="tooltip" placement="bottom" anchor="anchor" data-testid="test-tooltip">tooltip</tapsi-tooltip>
    `,
    );
    await expect(tooltip).toBeHidden();

    await anchor.hover();
    await expect(tooltip).toBeVisible();

    await render(
      page,
      `
      <tapsi-button id="anchor" data-testid="test-anchor">button</tapsi-button>
      <tapsi-tooltip no-hover-activation text="tooltip" placement="bottom" anchor="anchor" data-testid="test-tooltip">tooltip</tapsi-tooltip>
    `,
    );
    await expect(tooltip).toBeHidden();

    await anchor.hover();
    await expect(tooltip).toBeHidden();
  });

  test("🧪 should hide tooltip on pressing Escape based on value of `no-escape-deactivation` attribute", async ({
    page,
  }) => {
    const tooltip = page.getByTestId("test-tooltip").getByRole("tooltip");

    await render(
      page,
      `
      <tapsi-button id="anchor" data-testid="test-anchor">button</tapsi-button>
      <tapsi-tooltip text="tooltip" placement="bottom" anchor="anchor" data-testid="test-tooltip" visible>tooltip</tapsi-tooltip>
    `,
    );
    await expect(tooltip).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(tooltip).toBeHidden();

    await render(
      page,
      `
      <tapsi-button id="anchor" data-testid="test-anchor">button</tapsi-button>
      <tapsi-tooltip no-escape-deactivation text="tooltip" placement="bottom" anchor="anchor" data-testid="test-tooltip" visible>tooltip</tapsi-tooltip>
    `,
    );
    await expect(tooltip).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(tooltip).toBeVisible();
  });
});
