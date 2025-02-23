import {
  afterEach,
  beforeEach,
  describe,
  disposeMocks,
  expect,
  render,
  test,
} from "@internals/test-helpers";

describe("🧩 modal", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should show elements based on props and slots", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-modal
      data-testid="test-modal"
      heading="هدینگ"
      description="دسکریپشن"
      open
    >
      <img style="width: 100%" src="https://picsum.photos/200/50" data-testid="test-modal-image-slot" alt="image" slot="image">
      <tapsi-button-group data-testid="test-modal-actions-slot" label="modal action bar" slot="action-bar">
        <tapsi-button>click</tapsi-button>
        <tapsi-button>click</tapsi-button>
      </tapsi-button-group>
    </tapsi-modal>
    `,
    );

    const modalContainer = page.getByRole("alertdialog");
    const actionBarSlot = page.getByTestId("test-modal-actions-slot");
    const imageSlot = page.getByTestId("test-modal-image-slot");
    const title = page.locator("tapsi-modal [part='title']");
    const description = page.locator("tapsi-modal [part='description']");

    await expect(modalContainer).toBeVisible();
    await expect(actionBarSlot).toBeVisible();
    await expect(imageSlot).toBeVisible();
    await expect(title).toHaveText("هدینگ");
    await expect(description).toHaveText("دسکریپشن");
  });

  test("🧪 should trap focus inside modal", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-button data-testid="test-button">click</tapsi-button>
    <tapsi-modal
      data-testid="test-modal"
      heading="هدینگ"
      description="دسکریپشن"
      open
    >
      <tapsi-button-group data-testid="test-modal-actions-slot" label="modal action bar" slot="action-bar">
        <tapsi-button data-testid="test-modal-action-1">click</tapsi-button>
        <tapsi-button data-testid="test-modal-action-2">click</tapsi-button>
      </tapsi-button-group>
    </tapsi-modal>
    `,
    );

    const modalActionButton1 = page.getByTestId("test-modal-action-1");
    const modalActionButton2 = page.getByTestId("test-modal-action-2");

    await page.keyboard.down("Tab");
    await expect(modalActionButton1).toBeFocused();

    await page.keyboard.down("Tab");
    await expect(modalActionButton2).toBeFocused();

    await page.keyboard.down("Tab");
    await expect(modalActionButton1).toBeFocused();
  });

  test("🧪 should have required attributes for screen readers", async ({
    page,
  }) => {
    await render(
      page,
      `
    <tapsi-modal
      data-testid="test-modal"
      heading="هدینگ"
      description="دسکریپشن"
      open
    >
      <tapsi-button-group data-testid="test-modal-actions-slot" label="modal action bar" slot="action-bar">
        <tapsi-button data-testid="test-modal-action-1">click</tapsi-button>
        <tapsi-button data-testid="test-modal-action-2">click</tapsi-button>
      </tapsi-button-group>
    </tapsi-modal>
    `,
    );

    const modalContainer = page.getByRole("alertdialog");
    const modalOverlay = page.locator("tapsi-modal [part='overlay']");

    await expect(modalOverlay).toHaveAttribute("aria-hidden", "true");
    await expect(modalContainer).toHaveAttribute("aria-modal", "true");

    const titleElement = page.locator("tapsi-modal #title");
    const descriptionElement = page.locator("tapsi-modal #description");

    await expect(titleElement).toHaveText("هدینگ");
    await expect(modalContainer).toHaveAttribute("aria-labelledby", "title");

    await expect(descriptionElement).toHaveText("دسکریپشن");
    await expect(modalContainer).toHaveAttribute(
      "aria-describedby",
      "description",
    );
  });

  test("🧪 should close modal using Escape key", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-modal
      data-testid="test-modal"
      heading="هدینگ"
      description="دسکریپشن"
      open
    >
      <tapsi-button-group data-testid="test-modal-actions-slot" label="modal action bar" slot="action-bar">
        <tapsi-button data-testid="test-modal-action-1">click</tapsi-button>
        <tapsi-button data-testid="test-modal-action-2">click</tapsi-button>
      </tapsi-button-group>
    </tapsi-modal>
    `,
    );

    const modalContainer = page.getByRole("alertdialog");

    await expect(modalContainer).toBeVisible();

    await page.keyboard.down("Escape");
    await expect(modalContainer).toBeHidden();
  });

  test("🧪 should close modal by clicking on overlay", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-modal
      data-testid="test-modal"
      heading="هدینگ"
      description="دسکریپشن"
      open
    >
      <tapsi-button-group data-testid="test-modal-actions-slot" label="modal action bar" slot="action-bar">
        <tapsi-button data-testid="test-modal-action-1">click</tapsi-button>
        <tapsi-button data-testid="test-modal-action-2">click</tapsi-button>
      </tapsi-button-group>
    </tapsi-modal>
    `,
    );

    const modalContainer = page.getByRole("alertdialog");
    const modalOverlay = page.locator("tapsi-modal [part='overlay']");

    await expect(modalContainer).toBeVisible();

    await modalOverlay.click();
    await expect(modalContainer).toBeHidden();
  });
});
