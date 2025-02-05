import { render, screen, userEvent } from "@internals/test-helpers";
import { describe, expect, it, jest } from "@jest/globals";

import "./index.ts";

describe("tapsi-avatar", () => {
  it("renders", async () => {
    // @ts-expect-error Current React does not support custom elements.
    render(<tapsi-avatar data-testid="test"></tapsi-avatar>);

    const el = screen.getByTestId("test");

    const handleClick = jest.fn();

    el.addEventListener("click", handleClick);

    await userEvent.click(el);

    expect(handleClick).toHaveBeenCalled();

    expect(await screen.findByShadowRole("img")).toBeInTheDocument();
  });
});
