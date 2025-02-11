import { render } from "@internals/test-helpers";
import { expect, it } from "@jest/globals";
import { type ComponentType } from "react";

export const itShouldMount = <T extends JSX.IntrinsicAttributes>(
  Component: ComponentType<T>,
  requiredProps: T,
): void => {
  it("should be mounted and unmounted without errors", () => {
    const elem = <Component {...requiredProps} />;

    const result = render(elem);

    expect(() => {
      result.rerender(elem);
      result.unmount();
    }).not.toThrow();
  });
};

export const itSupportsClassName = <T extends JSX.IntrinsicAttributes>(
  Component: ComponentType<T>,
  requiredProps: T,
): void => {
  it("should supports CSS classes", () => {
    const className = "tapsi-test-class";

    const { container } = render(
      <Component
        {...requiredProps}
        className={className}
      />,
    );

    expect(container.firstChild).toHaveClass(className);
  });
};

export const itSupportsStyle = <T extends JSX.IntrinsicAttributes>(
  Component: ComponentType<T>,
  requiredProps: T,
  selector?: string,
  options?: { withPortal?: boolean },
): void => {
  it("should supports inline styles", () => {
    const { withPortal = false } = options ?? {};

    const getTarget = (container: HTMLElement): HTMLElement => {
      const portal = withPortal
        ? document.querySelector<HTMLElement>("[data-slot='Portal:Root']")
        : null;

      return selector
        ? portal
          ? (portal.querySelector(selector) as HTMLElement)
          : (container.querySelector(selector) as HTMLElement)
        : portal
          ? (container.firstChild as HTMLElement)
          : (container.firstChild as HTMLElement);
    };

    const style = { border: "1px solid red", backgroundColor: "black" };

    const { container } = render(
      <Component
        {...requiredProps}
        style={style}
      />,
    );

    expect(getTarget(container)).toHaveStyle(style);
  });
};

export const itSupportsDataSetProps = <T extends JSX.IntrinsicAttributes>(
  Component: ComponentType<T>,
  requiredProps: T,
  selector?: string,
  options?: { withPortal?: boolean },
): void => {
  it("supports `data-*` props", () => {
    const { withPortal = false } = options ?? {};

    const getTarget = (container: HTMLElement): HTMLElement => {
      const portal = withPortal
        ? document.querySelector<HTMLElement>("[data-slot='Portal:Root']")
        : null;

      return selector
        ? portal
          ? (portal.querySelector(selector) as HTMLElement)
          : (container.querySelector(selector) as HTMLElement)
        : portal
          ? (container.firstChild as HTMLElement)
          : (container.firstChild as HTMLElement);
    };

    const { container } = render(
      <Component
        {...requiredProps}
        data-other-attribute="test"
      />,
    );

    expect(getTarget(container)).toHaveAttribute(
      "data-other-attribute",
      "test",
    );
  });
};
