import {
  afterEach,
  beforeEach,
  describe,
  disposeMocks,
  expect,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";
import * as path from "path";
import { ErrorMessages } from "./constants.ts";

describe("🧩 file-input", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should hide label with `hide-label` attribute", async ({ page }) => {
    await render(
      page,
      `<tapsi-file-input hide-label label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const label = page.locator("tapsi-file-input label");

    await expect(label).toBeHidden();
  });

  test("🧪 should throw error if no valid label was set for the input", async ({
    page,
  }) => {
    const errors: string[] = [];

    page.on("console", msg => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await render(
      page,
      `<tapsi-file-input data-testid="test-file-input"></tapsi-file-input>`,
    );

    expect(errors[0]).toContain(
      ErrorMessages.SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE,
    );
  });

  test("🧪 should show spinner when attribute `loading` was set to true", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-file-input label="label" data-testid="test-file-input" loading></tapsi-file-input>`,
    );

    const spinner = page.locator("tapsi-file-input tapsi-spinner");

    await expect(spinner).toBeVisible();
  });

  test("🧪 should throw error when both `loading` and `error` attributes are set", async ({
    page,
  }) => {
    const errors: string[] = [];

    page.on("console", msg => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await render(
      page,
      `<tapsi-file-input data-testid="test-file-input" loading error></tapsi-file-input>`,
    );

    expect(errors[0]).toContain(
      ErrorMessages.ERROR_AND_LOADING_ATTRIBUTES_AT_THE_SAME_TIME,
    );
  });

  // test("🧪 should throw error when `loading` is invalid", async ({ page }) => {
  //   let errors: string[] = [];
  //
  //   page.on("console", msg => {
  //     if (msg.type() === "error") {
  //       errors.push(msg.text());
  //     }
  //   });
  //
  //   // Simple `loading` attribute is valid and should not throw any errors.
  //   await render(
  //     page,
  //     `<tapsi-file-input label="label" data-testid="test-file-input" loading></tapsi-file-input>`,
  //   );
  //   expect(errors.length).toEqual(0);
  //
  //   errors = [];
  //   page.on("console", msg => {
  //     if (msg.type() === "error") {
  //       errors.push(msg.text());
  //     }
  //   });
  //
  //   // Numeric values between 0 and 100 are also valid values for `loading`.
  //   await render(
  //     page,
  //     `<tapsi-file-input label="label" data-testid="test-file-input" loading="0"></tapsi-file-input>`,
  //   );
  //   expect(errors.length).toBe(0);
  //
  //   errors = [];
  //   page.on("console", msg => {
  //     if (msg.type() === "error") {
  //       errors.push(msg.text());
  //     }
  //   });
  //   await render(
  //     page,
  //     `<tapsi-file-input label="label" data-testid="test-file-input" loading="50"></tapsi-file-input>`,
  //   );
  //   expect(errors.length).toBe(0);
  //
  //   errors = [];
  //   page.on("console", msg => {
  //     if (msg.type() === "error") {
  //       errors.push(msg.text());
  //     }
  //   });
  //   await render(
  //     page,
  //     `<tapsi-file-input label="label" data-testid="test-file-input" loading="100"></tapsi-file-input>`,
  //   );
  //   expect(errors.length).toBe(0);
  //
  //   errors = [];
  //   page.on("console", msg => {
  //     if (msg.type() === "error") {
  //       errors.push(msg.text());
  //     }
  //   });
  //
  //   // Even floating numbers are valid until they're in the correct range.
  //   await render(
  //     page,
  //     `<tapsi-file-input label="label" data-testid="test-file-input" loading="23.4"></tapsi-file-input>`,
  //   );
  //   expect(errors.length).toBe(0);
  //
  //   errors = [];
  //   page.on("console", msg => {
  //     if (msg.type() === "error") {
  //       errors.push(msg.text());
  //     }
  //   });
  //
  //   // Values outside this range are invalid and should throw error.
  //   await render(
  //     page,
  //     `<tapsi-file-input label="label" data-testid="test-file-input" loading="200"></tapsi-file-input>`,
  //   );
  //   expect(errors.length).toBe(1);
  //   expect(errors[0]).toContain(
  //     ErrorMessages.ERROR_AND_LOADING_ATTRIBUTES_AT_THE_SAME_TIME,
  //   );
  // });

  test("🧪 should not be interactive when disabled", async ({ page }) => {
    await render(
      page,
      `<tapsi-file-input label="test-file-input" data-testid="test-file-input" disabled></tapsi-file-input>`,
    );

    const textField = page.getByTestId("test-file-input");

    await expect(textField).not.toBeFocused();
    await textField.click();
    await expect(textField).not.toBeFocused();
  });

  test("🧪 should show supporting text", async ({ page }) => {
    await render(
      page,
      `<tapsi-file-input supporting-text="support" label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const supportingText = page.locator(
      'tapsi-file-input [part="supporting-text"]',
    );

    await expect(supportingText).toBeVisible();
  });

  test("🧪 should open file input after clicking on internal label", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-file-input label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const label = page.locator("tapsi-file-input label");
    const fileChooserPromise = page.waitForEvent("filechooser");

    await label.click();

    await fileChooserPromise;

    // if we reach here, it means the file input has been opened!
    expect(true).toBe(true);
  });

  test("🧪 should open file input after clicking on external label", async ({
    page,
  }) => {
    await render(
      page,
      `
        <label for="test-file-input" id="external-label" data-testid="external-label">label</label>
        <tapsi-file-input labelledby="external-label" data-testid="test-file-input" id="test-file-input"></tapsi-file-input>`,
    );

    const label = page.getByTestId("external-label");

    const fileChooserPromise = page.waitForEvent("filechooser");

    await label.click();

    await fileChooserPromise;

    // if we reach here, it means the file input has been opened!
    expect(true).toBe(true);
  });

  test("🧪 should be able to choose a single file", async ({ page }) => {
    await render(
      page,
      `<tapsi-file-input label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const fileInput = page.getByTestId("test-file-input");

    // At first, no files are selected.
    await expect(fileInput).toHaveJSProperty("files", null);

    const fileChooserPromise = page.waitForEvent("filechooser");

    await fileInput.click();
    const fileChooser = await fileChooserPromise;

    // if we reach here, it means the file input has been opened!
    await fileChooser.setFiles(path.resolve("src", "file-input", "index.ts"));
    await expect(fileInput).not.toHaveJSProperty("files", null);

    // We should show to user the file name when it's not an image.
    const previewSection = page.locator("tapsi-file-input .text");

    await expect(previewSection).toHaveText("index.ts");
  });

  test("🧪 should show image file preview after selection", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-file-input label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const fileInput = page.getByTestId("test-file-input");

    // At first, no files are selected.
    await expect(fileInput).toHaveJSProperty("files", null);

    const fileChooserPromise = page.waitForEvent("filechooser");

    await fileInput.click();
    const fileChooser = await fileChooserPromise;

    // if we reach here, it means the file input has been opened!
    await fileChooser.setFiles(
      path.resolve("src", "file-input", "__test__", "image.jpg"),
    );

    // We should show to user the file name when it's not an image.
    const previewSection = page.locator("tapsi-file-input img.preview");

    await expect(previewSection).toBeVisible();
  });

  test("🧪 should show clear button only when a file is selected", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-file-input label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const fileInput = page.getByTestId("test-file-input");
    const clearButton = page.locator('tapsi-file-input [label="clear"]');

    // At first, no files are selected and no clear button is visible to user.
    await expect(clearButton).toBeHidden();

    const fileChooserPromise = page.waitForEvent("filechooser");

    await fileInput.click();
    const fileChooser = await fileChooserPromise;

    await fileChooser.setFiles(path.resolve("src", "file-input", "index.ts"));

    // After selecting files, we expect the clear button shows when a file is chosen
    await expect(clearButton).toBeVisible();

    // Also after clicking on clear button, it should hide.
    await clearButton.click();
    await expect(clearButton).toBeHidden();
  });

  test("🧪 should be able to choose multiple files", async ({ page }) => {
    await render(
      page,
      `<tapsi-file-input multiple label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const fileInput = page.getByTestId("test-file-input");

    const fileChooserPromise = page.waitForEvent("filechooser");

    await fileInput.click();
    const fileChooser = await fileChooserPromise;

    expect(fileChooser.isMultiple()).toBe(true);

    await fileChooser.setFiles([
      path.resolve("src", "file-input", "index.ts"),
      path.resolve("src", "file-input", "file-input.ts"),
    ]);

    // We should show to user that 2 files are selected
    const previewSection = page.locator("tapsi-file-input .text");

    await expect(previewSection).toHaveText("۲ فایل انتخاب شده");
  });

  test("🧪 should not show retry button without `retryable-error` attribute", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-file-input retryable-error error label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const fileInput = page.getByTestId("test-file-input");

    const retryButton = page.locator("tapsi-file-input .error-action");

    await expect(retryButton).toBeVisible();

    const mocks = await setupMocks(page);
    const handleRetry = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(fileInput, "retry", handleRetry.ref);

    await handleRetry.matchResult({ called: false });
    await retryButton.click();
    await handleRetry.matchResult({ callCount: 1 });
  });

  test("🧪 should override placeholder text", async ({ page }) => {
    await render(
      page,
      `<tapsi-file-input placeholder="my placeholder" label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const placeholder = page.locator("tapsi-file-input .placeholder");

    await expect(placeholder).toHaveText("my placeholder");
  });

  test("🧪 should hide `placeholder` text in `loading` state", async ({
    page,
  }) => {
    // placeholder is visible when we are not in `loading` state
    await render(
      page,
      `<tapsi-file-input placeholder="my placeholder" label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const placeholder = page.locator("tapsi-file-input .placeholder");

    await expect(placeholder).toBeVisible();

    // ...but it's hidden in `loading` state
    await render(
      page,
      `<tapsi-file-input placeholder="my placeholder" loading label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );
    await expect(placeholder).toBeHidden();
  });

  test("🧪 should hide `placeholder` text in `error` state", async ({
    page,
  }) => {
    // placeholder is visible when we are not in `loading` state
    await render(
      page,
      `<tapsi-file-input error placeholder="my placeholder" label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const placeholder = page.locator("tapsi-file-input .placeholder");

    await expect(placeholder).toBeHidden();
  });

  test("🧪 should retry after error with `retryable-error` attribute", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-file-input retryable-error error label="test-file-input" data-testid="test-file-input"></tapsi-file-input>`,
    );

    const fileInput = page.getByTestId("test-file-input");

    const retryButton = page.locator("tapsi-file-input .error-action");

    await expect(retryButton).toBeVisible();

    const mocks = await setupMocks(page);
    const handleRetry = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(fileInput, "retry", handleRetry.ref);

    await handleRetry.matchResult({ called: false });
    await retryButton.click();
    await handleRetry.matchResult({ callCount: 1 });
  });
});
