import {
  beforeEach,
  describe,
  expect,
  render,
  test,
} from "@internals/test-helpers";
import {
  type States,
  STATUS_TO_LOCALE_MAP,
} from "@tapsioss/web-components/chat-bubble/in/constants";

describe("🧩 chat-bubble", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  describe("🧩 chat-bubble-in", () => {
    test("🧪 should show correct text under message based on `status`", async ({
      page,
    }) => {
      for (const status of ["pending", "seen", "sent"] as Exclude<
        States,
        "failed"
      >[]) {
        await render(
          page,
          `
        <tapsi-chat-bubble-in
          data-testid="tapsi-chat-bubble-in"
          status="${status}"
        >
          سلام
        </tapsi-chat-bubble-in>
    `,
        );

        const statusElement = page.locator(
          'tapsi-chat-bubble-in [part="status"] span',
        );

        await expect(statusElement).toHaveText(STATUS_TO_LOCALE_MAP[status]);
      }
    });

    test("🧪 should get correct classes based on attributes", async ({
      page,
    }) => {
      await render(
        page,
        `
        <tapsi-chat-bubble-in
          data-testid="tapsi-chat-bubble-in"
          fully-rounded
          status="sent"
        >
          سلام
        </tapsi-chat-bubble-in>
    `,
      );

      const root = page.locator('tapsi-chat-bubble-in [part="root"]');

      await expect(root).toHaveClass(" root in sent fully-rounded ");
    });

    test("🧪 should have pre content in `failed` status", async ({ page }) => {
      await render(
        page,
        `
        <tapsi-chat-bubble-in
          data-testid="tapsi-chat-bubble-in"
          fully-rounded
          status="failed"
        >
          سلام
        </tapsi-chat-bubble-in>
    `,
      );

      const preContent = page.locator(
        'tapsi-chat-bubble-in [part="failure-indicator"]',
      );

      await expect(preContent).toBeVisible();
    });

    test("🧪 should show time correctly", async ({ page }) => {
      await render(
        page,
        `
        <tapsi-chat-bubble-in
          data-testid="tapsi-chat-bubble-out"
          status="sent"
          timestamp="12:34"
        >
          سلام
        </tapsi-chat-bubble-in>
    `,
      );

      const timestamp = page.locator('tapsi-chat-bubble-in [part="timestamp"]');

      await expect(timestamp).toHaveText("12:34");
    });
  });

  describe("🧩 chat-bubble-out", () => {
    test("🧪 should show avatar if it was set", async ({ page }) => {
      // If no `avatar-src` was set, the avatar should be hidden,
      await render(
        page,
        `
        <tapsi-chat-bubble-out
          data-testid="tapsi-chat-bubble-out"
          status="failed"
        >
          سلام
        </tapsi-chat-bubble-out>
    `,
      );

      const avatar = page.getByRole("img");

      await expect(avatar).toBeHidden();

      // ...otherwise, we should be able to see the avatar.
      await render(
        page,
        `
        <tapsi-chat-bubble-out
          data-testid="tapsi-chat-bubble-out"
          status="failed"
          avatar-src="https://picsum.photos/64"
        >
          سلام
        </tapsi-chat-bubble-out>
    `,
      );

      await expect(avatar).toBeVisible();
    });

    test("🧪 should show time correctly", async ({ page }) => {
      await render(
        page,
        `
        <tapsi-chat-bubble-out
          data-testid="tapsi-chat-bubble-out"
          status="sent"
          timestamp="12:34"
        >
          سلام
        </tapsi-chat-bubble-out>
    `,
      );

      const timestamp = page.locator(
        'tapsi-chat-bubble-out [part="timestamp"]',
      );

      await expect(timestamp).toHaveText("12:34");
    });
  });
});
