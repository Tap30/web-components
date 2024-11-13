import * as React from "react";

type Overwrite<T, U> = Omit<T, keyof U> & U;

type MergeElementProps<E extends React.ElementType, P = object> = Overwrite<
  React.ComponentPropsWithRef<E>,
  P
>;

type OwnProps = {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The viewBox of the SVG.
   *
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   *
   * @default "0 0 24 24"
   */
  viewBox?: string;
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  title?: string;
  /**
   * The size of the icon.
   * If set to `"auto"`, the icon will get the parent's width and height.
   *
   * @default "auto"
   */
  size?: number | "auto";
};

export type Props = MergeElementProps<"svg", OwnProps>;

const Icon = (props: Props) => {
  const {
    children,
    title,
    style: styleProp,
    viewBox = "0 0 24 24",
    size = "auto",
    ...otherProps
  } = props;

  const hasValidSize =
    (typeof size === "number" && !Number.isNaN(size)) ||
    (typeof size === "string" && size === "auto");

  if (!hasValidSize) {
    // eslint-disable-next-line no-console
    console.error(
      `[TAPSI][Icon]: Invalid size provided! (provided size: \`size=${
        typeof size === "number" ? `${size}` : `${String(size)}`
      }\`)`,
    );
  }

  const sizeStyles =
    size === "auto"
      ? {
          width: "100%",
          height: "100%",
        }
      : {
          width: `${size / 16}rem`,
          height: `${size / 16}rem`,
          minWidth: `${size / 16}rem`,
          minHeight: `${size / 16}rem`,
        };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      style={{
        color: "currentcolor",
        fill: "currentcolor",
        ...styleProp,
        ...sizeStyles,
      }}
      {...otherProps}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};

export default Icon;
