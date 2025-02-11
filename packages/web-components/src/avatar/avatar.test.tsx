import { fireEvent, render, screen } from "@internals/test-helpers";
import { describe, expect, it } from "@jest/globals";
import { createComponent } from "@lit/react";
import React from "react";
import {
  itShouldMount,
  itSupportsClassName,
  itSupportsDataSetProps,
  itSupportsStyle,
} from "../internals/tests.tsx";
import { TapsiAvatar } from "./index.ts";

const Avatar = createComponent({
  react: React,
  elementClass: TapsiAvatar,
  tagName: "tapsi-avatar",
});

const mockRequiredProps = {
  "data-testid": "test-avatar",
};

const getTestAvatarRoot = async () => screen.findByShadowTestId("avatar-root");

const getTestAvatarImage = async () =>
  screen.findByShadowTestId("avatar-image");

const getTestAvatarPlaceholder = async () =>
  screen.findByShadowTestId("avatar-placeholder");

describe("🧪 avatar: UI", () => {
  itShouldMount(Avatar, mockRequiredProps);
  itSupportsClassName(Avatar, mockRequiredProps);
  itSupportsStyle(Avatar, mockRequiredProps);
  itSupportsDataSetProps(Avatar, mockRequiredProps);

  it("should render placeholder if no image was set", async () => {
    render(<Avatar {...mockRequiredProps} />);

    const placeholder = await getTestAvatarPlaceholder();

    expect(placeholder).toBeInTheDocument();
  });

  it("should render image if `image` property was set", async () => {
    render(
      <Avatar
        {...mockRequiredProps}
        image="image.png"
        alt="image-alt"
      />,
    );

    expect(await screen.findByShadowTestId("avatar-image")).toBeInTheDocument();
  });

  it("should render placeholder if image has error", async () => {
    render(
      <Avatar
        {...mockRequiredProps}
        image="image.png"
        alt="image-alt"
      />,
    );

    const image = await getTestAvatarImage();

    fireEvent.error(image);

    const placeholder = await getTestAvatarPlaceholder();

    expect(placeholder).toBeInTheDocument();
  });

  it("should apply `loading` attribute correctly", async () => {
    render(
      <Avatar
        {...mockRequiredProps}
        image="image.png"
        loading="lazy"
      />,
    );

    const image = await getTestAvatarImage();

    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("should apply the correct size class", async () => {
    render(
      <Avatar
        {...mockRequiredProps}
        image="image.png"
        size="lg"
      />,
    );

    const avatarRoot = await getTestAvatarRoot();

    expect(avatarRoot).toHaveClass("lg");
  });

  it("should apply `alt` attribute to the `img` tag correctly", async () => {
    render(
      <Avatar
        {...mockRequiredProps}
        image="image.png"
        alt="Test Alt"
      />,
    );

    const image = await getTestAvatarImage();

    expect(image).toHaveAttribute("alt", "Test Alt");
  });

  it("should apply `label` property as `aria-label`", async () => {
    render(
      <Avatar
        {...mockRequiredProps}
        image="image.png"
        label="Avatar Label"
      />,
    );

    const avatarRoot = await getTestAvatarRoot();

    expect(avatarRoot).toHaveAttribute("aria-label", "Avatar Label");
  });
});
