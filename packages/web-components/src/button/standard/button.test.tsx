import { TapsiButton } from "./index.ts";

import { render, screen, userEvent } from "@internals/test-helpers";
import { describe, expect, it, jest } from "@jest/globals";
import { createComponent } from "@lit/react";
import React, { type FormEventHandler } from "react";
import {
  getComponent,
  itShouldMount,
  itSupportsClassName,
  itSupportsDataSetProps,
  itSupportsStyle,
} from "../../internals/tests.tsx";

const Button = createComponent({
  react: React,
  elementClass: TapsiButton,
  tagName: "tapsi-button",
});

const handleClick = jest.fn();

const mockRequiredProps = {
  label: "test-button-label",
};

describe("🧪 button/standard: UI", () => {
  itShouldMount(Button, mockRequiredProps);
  itSupportsClassName(Button, mockRequiredProps);
  itSupportsStyle(Button, mockRequiredProps);
  itSupportsDataSetProps(Button, mockRequiredProps);

  it("should trigger `handleClick` function after clicking on the button", async () => {
    const testButton = getComponent(Button, {
      onClick: handleClick,
    });

    const { click } = userEvent.setup();

    await click(testButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should trigger `handleClick` function after focusing on the button and pressing Enter", async () => {
    const testButton = getComponent(Button, {
      onClick: handleClick,
    });

    const { tab, keyboard } = userEvent.setup();

    await tab();
    expect(testButton).toHaveFocus();
    await keyboard("{Enter}");

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not be able to trigger `handleClick` function while `disabled`", async () => {
    const testButton = getComponent(Button, {
      onClick: handleClick,
      disabled: true,
    });

    const { tab, click } = userEvent.setup();

    await tab();
    expect(testButton).not.toHaveFocus();

    await click(testButton);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it("should have `aria-label` property when the host has a `label` property", async () => {
    render(
      <Button
        {...mockRequiredProps}
        label="test-label"
      />,
    );

    expect(
      await screen.findByShadowTestId("tapsi-button-root"),
    ).toHaveAttribute("aria-label", "test-label");
  });

  it("should show spinner with `loading` prop", async () => {
    render(<Button loading />);

    expect(
      await screen.findByShadowTestId("tapsi-button-spinner"),
    ).toBeInTheDocument();
  });

  it("should work inside a form", async () => {
    const handleSubmit = jest.fn();
    const handleReset = jest.fn();

    const submitHandler: FormEventHandler<HTMLFormElement> = event => {
      event.preventDefault();
      handleSubmit(event);
    };

    const resetHandler: FormEventHandler<HTMLFormElement> = event => {
      event.preventDefault();
      handleReset(event);
    };

    const getForm = () => screen.getByTestId<HTMLFormElement>("form");

    const getSubmitButton = () =>
      screen.getByTestId<TapsiButton>("submit-button");

    const getResetButton = () =>
      screen.getByTestId<TapsiButton>("reset-button");

    const getCheckbox = () =>
      screen.getByTestId<HTMLInputElement>("test-checkbox");

    const { click } = userEvent.setup();

    const getFormData = () => new FormData(getForm());

    const getCheckboxValue = () => getFormData().get("n");

    render(
      <form
        data-testid="form"
        onSubmit={submitHandler}
        onReset={resetHandler}
      >
        <input
          data-testid="test-checkbox"
          type="checkbox"
          name="n"
        />
        <Button
          data-testid="submit-button"
          type="submit"
        >
          submit
        </Button>
        <Button
          data-testid="reset-button"
          type="reset"
        >
          reset
        </Button>
      </form>,
    );

    await click(getCheckbox());
    await click(getSubmitButton());

    expect(handleSubmit.mock.calls.length).toBe(1);
    expect(getCheckboxValue()).toBe("on");

    await click(getResetButton());
    expect(handleReset.mock.calls.length).toBe(1);
  });
});
