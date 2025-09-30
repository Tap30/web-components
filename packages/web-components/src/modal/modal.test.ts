import { describe, expect, render, test } from "@internals/test-helpers";
import { Slots } from "./constants.ts";

describe("🧩 modal", () => {
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
      <img style="width: 100%" src="https://picsum.photos/200/50" data-testid="test-modal-image-slot" alt="image" slot=${Slots.IMAGE}>
      <tapsi-button-group data-testid="test-modal-actions-slot" label="modal action bar" slot=${Slots.ACTION_BAR}>
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
      <tapsi-button-group data-testid="test-modal-actions-slot" label="modal action bar" slot=${Slots.ACTION_BAR}>
        <tapsi-button data-testid="test-modal-action-1">click</tapsi-button>
        <tapsi-button data-testid="test-modal-action-2">click</tapsi-button>
      </tapsi-button-group>
    </tapsi-modal>
    `,
    );

    const modalActionButton1 = page.getByTestId("test-modal-action-1");
    const modalActionButton2 = page.getByTestId("test-modal-action-2");

    await page.keyboard.press("Tab");
    await expect(modalActionButton1).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(modalActionButton2).toBeFocused();

    await page.keyboard.press("Tab");
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
      <tapsi-button-group data-testid="test-modal-actions-slot" label="modal action bar" slot=${Slots.ACTION_BAR}>
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
      <tapsi-button-group data-testid="test-modal-actions-slot" label="modal action bar" slot=${Slots.ACTION_BAR}>
        <tapsi-button data-testid="test-modal-action-1">click</tapsi-button>
        <tapsi-button data-testid="test-modal-action-2">click</tapsi-button>
      </tapsi-button-group>
    </tapsi-modal>
    `,
    );

    const modalContainer = page.getByRole("alertdialog");

    await expect(modalContainer).toBeVisible();

    await page.keyboard.press("Escape");
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
      <tapsi-button-group data-testid="test-modal-actions-slot" label="modal action bar" slot=${Slots.ACTION_BAR}>
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

  test("🧪 should work with multiple modals", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-modal
      data-testid="test-modal-1"
      heading="هدینگ 1"
      description="دسکریپشن"
      open
    >
      <tapsi-button-group data-testid="test-modal-1-actions-slot" label="modal action bar" slot=${Slots.ACTION_BAR}>
        <tapsi-button data-testid="test-modal-1-action-1">click</tapsi-button>
        <tapsi-button data-testid="test-modal-1-action-2">click</tapsi-button>
      </tapsi-button-group>
    </tapsi-modal>
    <tapsi-modal
      data-testid="test-modal-2"
      heading="هدینگ 2"
      description="دسکریپشن"
      open
    >
      <tapsi-button-group data-testid="test-modal-2-actions-slot" label="modal action bar" slot=${Slots.ACTION_BAR}>
        <tapsi-button data-testid="test-modal-2-action-1">click</tapsi-button>
        <tapsi-button data-testid="test-modal-2-action-2">click</tapsi-button>
      </tapsi-button-group>
    </tapsi-modal>
    <tapsi-modal
      data-testid="test-modal-3"
      heading="هدینگ 3"
      description="دسکریپشن"
      open
    >
      <tapsi-button-group data-testid="test-modal-3-actions-slot" label="modal action bar" slot=${Slots.ACTION_BAR}>
        <tapsi-button data-testid="test-modal-3-action-1">click</tapsi-button>
        <tapsi-button data-testid="test-modal-3-action-2">click</tapsi-button>
      </tapsi-button-group>
    </tapsi-modal>
    `,
    );

    const modal1 = page.getByTestId("test-modal-1").getByRole("alertdialog");

    const modal2 = page.getByTestId("test-modal-2").getByRole("alertdialog");
    const modal2Action1 = page.getByTestId("test-modal-2-action-1");
    const modal2Action2 = page.getByTestId("test-modal-2-action-2");

    const modal3 = page.getByTestId("test-modal-3").getByRole("alertdialog");
    const modal3Action1 = page.getByTestId("test-modal-3-action-1");
    const modal3Action2 = page.getByTestId("test-modal-3-action-2");

    // Modal 3 should be on top
    await expect(modal3).toBeVisible();
    await expect(modal3Action1).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(modal3Action2).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(modal3Action1).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(modal3).toBeHidden();

    // After closing modal 3, modal 2 should be on top
    await expect(modal2).toBeVisible();

    await page.keyboard.press("Shift+Tab");
    await expect(modal2Action1).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(modal2Action2).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(modal2Action1).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(modal2).toBeHidden();

    // After closing modal 2, modal 1 should be on top
    await expect(modal1).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(modal1).toBeHidden();
  });
});
