import { Button as BaseButton } from "@base-ui/react/button";
import { type ComponentPropsWithRef } from "react";

// Side-effect import. The consumer never has to remember a stylesheet — using
// the component pulls its CSS in. This is what `sideEffects: ["**/*.css"]` in
// package.json protects: without it a bundler would delete this line as unused
// and the styles would vanish in production builds only.
import "./button.css";

export type ButtonVariant = "primary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  /** Visual style. @default "primary" */
  variant?: ButtonVariant;
  /** Control height and typography. @default "md" */
  size?: ButtonSize;
} & ComponentPropsWithRef<"button">;

export const Button = (props: ButtonProps) => {
  const { variant = "primary", size = "md", className, ...otherProps } = props;

  const classes = [
    "tapsi-button",
    `tapsi-button--${variant}`,
    `tapsi-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <BaseButton
      className={classes}
      {...otherProps}
    />
  );
};
