import { Button as BaseButton } from "@base-ui/react/button";
import clsx from "clsx";
import { type ComponentPropsWithRef, type ReactNode } from "react";

// A CSS module, so this is no longer only a side-effect import: `styles` maps
// each class name written in the stylesheet to the scoped name the build
// generates for it. The consumer still never has to remember a stylesheet —
// importing the map pulls the CSS in with it.
import styles from "./button.module.css";

/**
 * The button's colour scheme, matching the `Variant` property in Figma.
 *
 * `elevated` and `cta` exist only as `primary`, which the union below enforces.
 */
export type ButtonVariant = "default" | "elevated" | "destructive" | "cta";

/** How much visual weight the button carries — Figma's `Hierarchy`. */
export type ButtonHierarchy = "primary" | "secondary" | "tertiary";

/** Figma's `Size`, using this repo's existing short names. */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Only 8 of the 12 variant × hierarchy combinations exist in Figma, so the
 * missing four are made unrepresentable rather than left to render as something
 * undesigned.
 *
 * Both members declare both keys, which is what lets the implementation
 * destructure them without narrowing the union first.
 */
type ButtonAppearance =
  | { variant?: "default" | "destructive"; hierarchy?: ButtonHierarchy }
  | { variant: "elevated" | "cta"; hierarchy?: "primary" };

type ButtonOwnProps = {
  /** Control height, typography and spacing. @default "md" */
  size?: ButtonSize;
  /** Stretch to fill the available inline space. @default false */
  fullWidth?: boolean;
  /**
   * Replaces the content with a spinner and marks the button `aria-busy`.
   * A loading button ignores clicks, like a disabled one.
   *
   * @default false
   */
  loading?: boolean;
  /** Accessible name, when the visible content is not descriptive enough. */
  label?: string;
  /** Rendered before the content — an icon, a counter, a badge. */
  leadingAdornment?: ReactNode;
  /** Rendered after the content. */
  trailingAdornment?: ReactNode;
  /** Renders an anchor instead of a button. */
  href?: string;
  /** Only meaningful alongside `href`. */
  target?: "_blank" | "_parent" | "_self" | "_top";
  /** Only meaningful alongside `href`. */
  download?: string;
};

export type ButtonProps = ButtonAppearance &
  ButtonOwnProps &
  Omit<ComponentPropsWithRef<"button">, "children"> & { children?: ReactNode };

const SIZES = { sm: "small", md: "medium", lg: "large" } as const;

/**
 * The appearance class for a variant × hierarchy pair.
 *
 * Only the 8 pairs Figma defines exist in the stylesheet. The type makes the
 * other 4 unrepresentable, but a consumer calling from plain JS can still ask
 * for `variant="elevated" hierarchy="tertiary"` — which would otherwise find no
 * class at all and render an unstyled button. Collapsing the two primary-only
 * variants keeps that case on its feet, in the same spirit as the `typeof href`
 * check further down.
 */
const appearanceClassName = (
  variant: ButtonVariant,
  hierarchy: ButtonHierarchy,
) => {
  if (variant === "elevated" || variant === "cta") {
    return styles[`tapsi-button--${variant}-primary`];
  }

  return styles[`tapsi-button--${variant}-${hierarchy}`];
};

export const Button = ({
  variant = "default",
  hierarchy = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  label,
  leadingAdornment,
  trailingAdornment,
  href,
  target,
  download,
  className,
  children,
  onClick,
  ...otherProps
}: ButtonProps) => {
  const classes = clsx(
    styles["tapsi-button"],
    appearanceClassName(variant, hierarchy),
    styles[`tapsi-button--${SIZES[size]}`],
    // Conditional classes are positional rather than an object of
    // class-to-condition: a CSS module is typed as `{ [key: string]: string }`,
    // so a lookup is `string | undefined`, and `undefined` cannot be a computed
    // key. `clsx` drops it here instead.
    loading && styles["tapsi-button--loading"],
    fullWidth && styles["tapsi-button--full-width"],
    className,
  );

  const ariaLabel = typeof children === "string" ? children : label;

  /**
   * The spinner overlays the content rather than replacing it, so the button
   * keeps its width while loading and the layout does not jump. The content is
   * hidden from assistive technology by `aria-busy` on the root.
   */
  const renderSpinner = () => {
    if (!loading) return null;

    return (
      <span
        className={styles["tapsi-button__spinner"]}
        data-part="spinner"
        aria-hidden="true"
      />
    );
  };

  const renderAdornment = (
    adornment: ReactNode,
    placement: "leading" | "trailing",
  ) => {
    if (adornment == null) return null;

    return (
      <span
        className={styles["tapsi-button__adornment"]}
        data-part="adornment"
        data-adornment={placement}
      >
        {adornment}
      </span>
    );
  };

  const renderContent = () => {
    if (children == null) return null;

    return (
      <span
        className={styles["tapsi-button__content"]}
        data-part="content"
      >
        {children}
      </span>
    );
  };

  const renderBody = () => (
    <>
      {renderSpinner()}
      {renderAdornment(leadingAdornment, "leading")}
      {renderContent()}
      {renderAdornment(trailingAdornment, "trailing")}
    </>
  );

  /**
   * A loading button stays focusable and keeps its accessible name — it is
   * busy, not unavailable — but must not act on a click. `disabled` is left to
   * the platform, which already blocks activation and removes it from the tab
   * order.
   *
   * This only covers keyboard activation; pointer activation is blocked in CSS,
   * because a React `onClick` runs on a delegated synthetic event and cannot
   * stop a native listener that has already fired.
   */
  const handleClick: ComponentPropsWithRef<"button">["onClick"] = event => {
    if (loading) {
      event.preventDefault();
      event.stopPropagation();

      return;
    }

    onClick?.(event);
  };

  if (typeof href === "string") {
    // Mirrors `@tapsioss/web-components`: opening a new tab without this pair
    // hands the opened page a reference back via `window.opener`.
    const rel = target === "_blank" ? "noopener noreferrer" : undefined;

    return (
      <BaseButton
        // Spread FIRST, so nothing a consumer passes can quietly replace a prop
        // this component manages. `className` is not lost by this: it is
        // destructured above and merged into `classes`.
        {...otherProps}
        className={classes}
        aria-label={ariaLabel}
        aria-busy={loading}
        // An anchor cannot be natively disabled, so it is marked instead.
        // `aria-disabled="false"` is valid, so no conditional is needed.
        aria-disabled={disabled}
        onClick={handleClick}
        render={
          // Base UI merges this element with the button's props and children,
          // so the anchor's content is `renderBody()` below.
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            href={href}
            target={target}
            download={download}
            rel={rel}
          />
        }
      >
        {renderBody()}
      </BaseButton>
    );
  }

  return (
    <BaseButton
      // Spread FIRST — see the link branch above.
      {...otherProps}
      className={classes}
      aria-label={ariaLabel}
      aria-busy={loading}
      disabled={disabled}
      onClick={handleClick}
    >
      {renderBody()}
    </BaseButton>
  );
};
