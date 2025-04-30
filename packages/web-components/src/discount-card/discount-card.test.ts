import {
  accessibility,
  afterEach,
  createPromiseResolvers,
  describe,
  disposeMocks,
  expect,
  render,
  test,
} from "@internals/test-helpers";
import { ErrorMessages } from "./constants.ts";

describe("🧩 discount-card", () => {
  const scope = "discount-card";

  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should be rendered with default appearance", async ({ page }) => {
    await render(
      page,
      `<tapsi-discount-card
        data-testid="test-discount-card"
        title="Test Discount"
        description="This is a test discount"
        badge-text="10%"
        expiry-date-label="Expires in 2 days"
      ></tapsi-discount-card>`,
    );

    const discountCard = page.getByTestId("test-discount-card");

    await expect(discountCard).toBeVisible();
    await expect(discountCard).toHaveJSProperty("variant", "none");
  });

  test("🧪 should be rendered with custom appearance", async ({ page }) => {
    await render(
      page,
      `<tapsi-discount-card
        data-testid="test-discount-card"
        variant="clay"
        header-title="Special Offer"
        title="Test Discount"
        description="This is a test discount"
        badge-text="10%"
        expiry-date-label="Expires in 2 days"
      >
        <svg slot="header-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      </tapsi-discount-card>`,
    );

    const discountCard = page.getByTestId("test-discount-card");

    await expect(discountCard).toBeVisible();
    await expect(discountCard).toHaveAttribute("variant", "clay");

    // Check if header is rendered when variant is not "none"
    const header = page.locator('tapsi-discount-card [part="header"]');

    await expect(header).toBeVisible();

    // Check if header title is rendered correctly
    const headerTitle = page.locator(
      'tapsi-discount-card [part="header-title"]',
    );

    await expect(headerTitle).toBeVisible();
    await expect(headerTitle).toHaveText("Special Offer");
  });

  test("🧪 should render all slots correctly", async ({ page }) => {
    await render(
      page,
      `<tapsi-discount-card
        data-testid="test-discount-card"
        variant="clay"
        header-title="Special Offer"
        title="Test Discount"
        description="This is a test discount"
        badge-text="10%"
        expiry-date-label="Expires in 2 days"
      >
        <svg data-testid="header-icon" slot="header-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
        <img data-testid="thumbnail" slot="thumbnail" src="https://picsum.photos/60/60" alt="Thumbnail" />
        <tapsi-button data-testid="action-button" slot="action">Use Discount</tapsi-button>
      </tapsi-discount-card>`,
    );

    // Check if slots are rendered correctly
    const headerIcon = page.getByTestId("header-icon");
    const thumbnail = page.getByTestId("thumbnail");
    const actionButton = page.getByTestId("action-button");

    await expect(headerIcon).toBeVisible();
    await expect(thumbnail).toBeVisible();
    await expect(actionButton).toBeVisible();
  });

  test("🧪 should log warning when variant is not none and headerTitle is missing", async ({
    page,
  }) => {
    const msgResolver = createPromiseResolvers<string>();

    page.on("console", msg => {
      if (
        msg.type() === "warning" &&
        msg.text().includes(scope) &&
        msg
          .text()
          .includes(
            ErrorMessages.HEADER_TITLE_IS_REQUIRED_WHEN_VARIANT_IS_NOT_NONE,
          )
      ) {
        msgResolver.resolve(msg.text());
      }
    });

    await render(
      page,
      `<tapsi-discount-card
        data-testid="test-discount-card"
        variant="clay"
        title="Test Discount"
        description="This is a test discount"
        badge-text="10%"
        expiry-date-label="Expires in 2 days"
      >
        <svg slot="header-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      </tapsi-discount-card>`,
    );

    const msg = await msgResolver.promise;

    expect(msg).toBeDefined();
  });

  test("🧪 should log warning when variant is not none and headerIcon slot is empty", async ({
    page,
  }) => {
    const msgResolver = createPromiseResolvers<string>();

    page.on("console", msg => {
      if (
        msg.type() === "warning" &&
        msg.text().includes(scope) &&
        msg
          .text()
          .includes(
            ErrorMessages.HEADER_ICON_IS_REQUIRED_WHEN_VARIANT_IS_NOT_NONE,
          )
      ) {
        msgResolver.resolve(msg.text());
      }
    });

    await render(
      page,
      `<tapsi-discount-card
        data-testid="test-discount-card"
        variant="clay"
        header-title="Special Offer"
        title="Test Discount"
        description="This is a test discount"
        badge-text="10%"
        expiry-date-label="Expires in 2 days"
      ></tapsi-discount-card>`,
    );

    const msg = await msgResolver.promise;

    expect(msg).toBeDefined();
  });

  test("🧪 should render title, description and expiry date label correctly", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-discount-card
        data-testid="test-discount-card"
        title="Test Discount"
        description="This is a test discount"
        badge-text="10%"
        expiry-date-label="Expires in 2 days"
      ></tapsi-discount-card>`,
    );

    const title = page.locator('tapsi-discount-card [part="title"]');
    const description = page.locator(
      'tapsi-discount-card [part="description"]',
    );

    const expiryDateLabel = page.locator(
      'tapsi-discount-card [part="expiry-date-label"]',
    );

    const badgeBox = page.locator("tapsi-discount-card .badge-box");

    await expect(title).toBeVisible();
    await expect(title).toHaveText("Test Discount");

    await expect(description).toBeVisible();
    await expect(description).toHaveText("This is a test discount");

    await expect(expiryDateLabel).toBeVisible();
    await expect(expiryDateLabel).toHaveText("Expires in 2 days");

    await expect(badgeBox).toBeVisible();
    await expect(badgeBox).toHaveText("10%");
  });

  test("🧪 should render with different variant values", async ({ page }) => {
    const variants = ["clay", "whisper", "azure", "flame", "grayscale", "none"];

    for (const variant of variants) {
      await render(
        page,
        `<tapsi-discount-card
          data-testid="test-discount-card"
          variant="${variant}"
          ${variant !== "none" ? 'header-title="Special Offer"' : ""}
          title="Test Discount"
          description="This is a test discount"
          badge-text="10%"
          expiry-date-label="Expires in 2 days"
        >
          ${
            variant !== "none"
              ? `
          <svg slot="header-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
          `
              : ""
          }
        </tapsi-discount-card>`,
      );

      const discountCard = page.getByTestId("test-discount-card");

      await expect(discountCard).toBeVisible();
      await expect(discountCard).toHaveAttribute("variant", variant);

      // Check if the root element has the correct variant class
      const rootElement = page.locator(
        `tapsi-discount-card .variant-${variant}`,
      );

      await expect(rootElement).toBeVisible();
    }
  });

  test("🧪 should apply correct color to expiry date label based on expiryDateColor prop", async ({
    page,
  }) => {
    await render(
      page,
      `<div>
        <tapsi-discount-card
          data-testid="discount-default"
          expiry-date-label="Expires soon"
        ></tapsi-discount-card>
        <tapsi-discount-card
          data-testid="discount-expiring"
          expiry-date-label="Expired!"
          expiring
        ></tapsi-discount-card>
      </div>`,
    );

    const defaultLabel = page.locator(
      '[data-testid="discount-default"] [part="expiry-date-label"]',
    );

    const expiringLabel = page.locator(
      '[data-testid="discount-expiring"] [part="expiry-date-label"]',
    );

    // Check default color (implicitly checks for absence of expiring class)
    await expect(defaultLabel).toContainClass("expiry-date-label"); // Base class
    await expect(defaultLabel).not.toContainClass("expiring"); // Default class

    // Check expiring color
    await expect(expiringLabel).toContainClass("expiry-date-label"); // Base class
    await expect(expiringLabel).toContainClass("expiring"); // Default class
  });

  // TODO: There was a issue with 'none' variant's contrast, we ignored it to be fixed by design team.
  const variants = ["clay", "whisper", "azure", "flame", "grayscale"];

  for (const variant of variants) {
    test("🦯 should be accessible " + variant, async ({ page }) => {
      await render(
        page,
        `<tapsi-discount-card
        variant="${variant}"
        ${variant !== "none" ? 'header-title="Special Offer"' : ""}
        data-testid="test-discount-card"
        title="Test Discount"
        description="This is a test discount"
        badge-text="10%"
        expiry-date-label="Expires in 2 days"
      >
        ${
          variant !== "none"
            ? `
        <svg slot="header-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
        `
            : ""
        }
        <tapsi-button slot="action">Use Discount</tapsi-button>
      </tapsi-discount-card>`,
      );

      const a11yResult = await accessibility(page).analyze();

      expect(a11yResult.violations).toEqual([]);
    });
  }
});
