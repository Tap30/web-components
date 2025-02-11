import { TapsiIconButton } from "./index.ts";

import { render, screen, userEvent } from "@internals/test-helpers";
import { describe, expect, it, jest } from "@jest/globals";
import { createComponent } from "@lit/react";
import React from "react";
import {
  itShouldMount,
  itSupportsClassName,
  itSupportsDataSetProps,
  itSupportsStyle,
} from "../../internals/tests.tsx";

const IconButton = createComponent({
  react: React,
  elementClass: TapsiIconButton,
  tagName: "tapsi-icon-button",
});

const handleClick = jest.fn();
const getTestIconButton = () => screen.getByTestId("test-icon-button");

const mockRequiredProps = {
  "data-testid": "test-icon-button",
  label: "test-icon-button-label",
};

describe("🧪 button/icon-button: UI", () => {
  itShouldMount(IconButton, mockRequiredProps);
  itSupportsClassName(IconButton, mockRequiredProps);
  itSupportsStyle(IconButton, mockRequiredProps);
  itSupportsDataSetProps(IconButton, mockRequiredProps);

  it("should trigger `handleClick` function after clicking on the icon button", async () => {
    render(
      <IconButton
        {...mockRequiredProps}
        onClick={handleClick}
      />,
    );
    const testIconButton = getTestIconButton();

    const { click } = userEvent.setup();

    await click(testIconButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should trigger `handleClick` function after focusing on the button and pressing Enter", async () => {
    render(
      <IconButton
        {...mockRequiredProps}
        onClick={handleClick}
      />,
    );
    const testIconButton = getTestIconButton();

    const { tab, keyboard } = userEvent.setup();

    await tab();
    expect(testIconButton).toHaveFocus();
    await keyboard("{Enter}");

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not be able to trigger `handleClick` function while `disabled`", async () => {
    render(
      <IconButton
        {...mockRequiredProps}
        onClick={handleClick}
        disabled
      />,
    );
    const testIconButton = getTestIconButton();

    const { tab, click } = userEvent.setup();

    await tab();
    expect(testIconButton).not.toHaveFocus();

    await click(testIconButton);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it("should have `aria-label` when the host has a `label` property", async () => {
    render(<IconButton {...mockRequiredProps} />);

    expect(
      await screen.findByShadowTestId("tapsi-button-root"),
    ).toHaveAttribute("aria-label", "test-icon-button-label");
  });

  it("should show spinner with `loading` prop", async () => {
    render(
      <IconButton
        {...mockRequiredProps}
        loading
      />,
    );

    expect(
      await screen.findByShadowTestId("tapsi-button-spinner"),
    ).toBeInTheDocument();
  });
});
