import {
  afterEach,
  describe,
  disposeMocks,
  expect,
  render,
  test,
} from "@internals/test-helpers";
import { ErrorMessages } from "../base-text-input/constants.ts";

describe("🧩 text-area", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("🧪 should be automatically focused only with `autofocus` attribute", async ({
    page,
  }) => {
    // First we are going to test the component without `autofocus` attribute. We expect the component not to be focused.
    await render(
      page,
      `<tapsi-text-area label="test" data-testid="test-component">test</tapsi-text-area>`,
    );

    const component = page.getByTestId("test-component");

    await expect(component).not.toBeFocused();

    // We expect the component to be automatically focused with `autofocus` attribute.
    await render(
      page,
      `<tapsi-text-area label="test" data-testid="test-component" autofocus>test</tapsi-text-area>`,
    );

    await expect(component).toBeFocused();
  });

  test("🧪 should hide label with `hide-label` attribute", async ({ page }) => {
    await render(
      page,
      `<tapsi-text-area hide-label label="test-text-area" data-testid="test-text-area"></tapsi-text-area>`,
    );

    const label = page.locator("tapsi-text-area label");

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
      `<tapsi-text-area data-testid="test-text-area"></tapsi-text-area>`,
    );

    expect(errors[0]).toContain(
      ErrorMessages.SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE,
    );
  });

  test("🧪 should render slots", async ({ page }) => {
    await render(
      page,
      `
      <tapsi-text-area label="label" data-testid="test-text-area">
        <svg data-testid="leading-icon" slot="leading-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9996 22C10.7496 22 9.57878 21.7625 8.48711 21.2875C7.39544 20.8125 6.44544 20.1708 5.63711 19.3625C4.82878 18.5541 4.18711 17.6041 3.71211 16.5125C3.23711 15.4208 2.99961 14.25 2.99961 13C2.99961 11.75 3.23711 10.5791 3.71211 9.48748C4.18711 8.39581 4.82878 7.44581 5.63711 6.63748C6.44544 5.82914 7.39544 5.18748 8.48711 4.71248C9.57878 4.23748 10.7496 3.99998 11.9996 3.99998C13.2496 3.99998 14.4204 4.23748 15.5121 4.71248C16.6038 5.18748 17.5538 5.82914 18.3621 6.63748C19.1704 7.44581 19.8121 8.39581 20.2871 9.48748C20.7621 10.5791 20.9996 11.75 20.9996 13C20.9996 14.25 20.7621 15.4208 20.2871 16.5125C19.8121 17.6041 19.1704 18.5541 18.3621 19.3625C17.5538 20.1708 16.6038 20.8125 15.5121 21.2875C14.4204 21.7625 13.2496 22 11.9996 22ZM14.7996 17.2L16.1996 15.8L12.9996 12.6V7.99998H10.9996V13.4L14.7996 17.2ZM5.59961 2.34998L6.99961 3.74998L2.74961 7.99998L1.34961 6.59998L5.59961 2.34998ZM18.3996 2.34998L22.6496 6.59998L21.2496 7.99998L16.9996 3.74998L18.3996 2.34998ZM11.9996 20C13.9496 20 15.6038 19.3208 16.9621 17.9625C18.3204 16.6041 18.9996 14.95 18.9996 13C18.9996 11.05 18.3204 9.39581 16.9621 8.03748C15.6038 6.67914 13.9496 5.99998 11.9996 5.99998C10.0496 5.99998 8.39544 6.67914 7.03711 8.03748C5.67878 9.39581 4.99961 11.05 4.99961 13C4.99961 14.95 5.67878 16.6041 7.03711 17.9625C8.39544 19.3208 10.0496 20 11.9996 20Z" fill="black"/>
        </svg>
        <tapsi-button data-testid="trailing" slot="trailing">click</tapsi-button>
      </tapsi-text-area>
      `,
    );

    const leadingIcon = page.getByTestId("leading-icon");
    const trailing = page.getByTestId("trailing");

    await expect(leadingIcon).toBeVisible();
    await expect(trailing).toBeVisible();
  });

  test("🧪 should not be interactive when disabled", async ({ page }) => {
    await render(
      page,
      `<tapsi-text-area label="test-text-area" data-testid="test-text-area" disabled></tapsi-text-area>`,
    );

    const textField = page.getByTestId("test-text-area");

    await expect(textField).not.toBeFocused();
    await textField.click();
    await expect(textField).not.toBeFocused();
  });

  test("🧪 should show supporting text", async ({ page }) => {
    await render(
      page,
      `<tapsi-text-area supporting-text="support" label="test-text-area" data-testid="test-text-area"></tapsi-text-area>`,
    );

    const supportingText = page.locator(
      'tapsi-text-area [part="supporting-text"]',
    );

    await expect(supportingText).toBeVisible();
  });

  test("🧪 should be focused after clicking on internal label", async ({
    page,
  }) => {
    await render(
      page,
      `<tapsi-text-area label="test-text-area" data-testid="test-text-area"></tapsi-text-area>`,
    );

    const label = page.locator("tapsi-text-area label");
    const input = page.getByTestId("test-text-area");

    await expect(input).not.toBeFocused();
    await label.click();
    await expect(input).toBeFocused();
  });

  test("🧪 should be focused after clicking on external label", async ({
    page,
  }) => {
    await render(
      page,
      `
        <label for="test-text-area" data-testid="external-label" id="external-label" >external label</label>
        <tapsi-text-area labelledby="external-label" id="test-text-area" data-testid="test-text-area">
    `,
    );

    const label = page.getByTestId("external-label");
    const input = page.getByTestId("test-text-area");

    await expect(input).not.toBeFocused();
    await label.click();
    await expect(input).toBeFocused();
  });
});
