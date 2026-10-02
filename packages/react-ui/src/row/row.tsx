import { useRender } from "@base-ui/react/use-render";
import clsx from "clsx";
import { type MouseEventHandler, type ReactNode, type Ref } from "react";

import styles from "./row.module.css";

type RowOwnProps = {
  /** The row's main text — Figma's `labelText`. */
  label: ReactNode;
  /** Secondary text under the label — Figma's `descriptionText`. */
  description?: ReactNode;
  /**
   * Swaps the emphasis of the two lines — Figma's `Content=Reversed`. The label
   * becomes a small, muted overline and the description the prominent value.
   *
   * @default false
   */
  reversed?: boolean;
  /** Rendered at the start of the row — usually an icon. */
  leading?: ReactNode;
  /** Rendered at the end of the row — an icon, a chevron, a control. */
  trailing?: ReactNode;
  /**
   * Marks the leading slot with a notification dot — Figma's `leadingBadge`.
   * Has no effect without `leading`.
   *
   * @default false
   */
  badge?: boolean;
  /** Draws the separator under the row's content. @default true */
  divider?: boolean;
  /**
   * What the label and description do when they do not fit. `wrap` breaks
   * them onto more lines and the row grows; `ellipsis` keeps each on one line
   * and truncates it with `…`, so the row keeps its height.
   *
   * @default "wrap"
   */
  textOverflow?: RowTextOverflow;
  /**
   * Renders the row as an anchor. Takes precedence over `onClick` and
   * `render` — an `onClick` is still called, on the anchor.
   */
  href?: string;
  /** Only meaningful alongside `href`. */
  target?: "_blank" | "_parent" | "_self" | "_top";
  /**
   * Renders the row as a `<button type="button">`, unless `href` makes it an
   * anchor. Takes precedence over `render`.
   */
  onClick?: MouseEventHandler<HTMLElement>;
  /** The row may be a `<div>`, `<a>` or `<button>`, so the ref is general. */
  ref?: Ref<HTMLElement>;
};

/** How the row's text handles overflow. */
export type RowTextOverflow = "wrap" | "ellipsis";

/**
 * The element is decided by the row, not the consumer: an `<a>` with `href`,
 * a `<button>` with `onClick`, otherwise a `<div>`. `render` (from Base UI)
 * only applies to that last case — to render a static row as an `<li>`, say.
 */
export type RowProps = RowOwnProps &
  Omit<useRender.ComponentProps<"div">, "children" | "onClick" | "ref">;

export const Row = ({
  label,
  description,
  reversed = false,
  leading,
  trailing,
  badge = false,
  divider = true,
  textOverflow = "wrap",
  href,
  target,
  onClick,
  render,
  ref,
  className,
  ...otherProps
}: RowProps) => {
  // Checked by type, not truthiness: these decide what element renders, and a
  // consumer calling from plain JS can pass anything.
  const isLink = typeof href === "string";
  const isButton = !isLink && typeof onClick === "function";

  const classes = clsx(
    styles["tapsi-row"],
    (isLink || isButton) && styles["tapsi-row--interactive"],
    reversed && styles["tapsi-row--reversed"],
    divider && styles["tapsi-row--divider"],
    textOverflow === "ellipsis" && styles["tapsi-row--ellipsis"],
    className,
  );

  const renderBadge = () => {
    if (!badge) return null;

    return (
      <span
        className={styles["tapsi-row__badge"]}
        data-part="badge"
        aria-hidden="true"
      />
    );
  };

  const renderLeading = () => {
    if (leading == null) return null;

    return (
      <span
        className={styles["tapsi-row__leading"]}
        data-part="leading"
      >
        <span className={styles["tapsi-row__icon"]}>{leading}</span>
        {renderBadge()}
      </span>
    );
  };

  const renderTrailing = () => {
    if (trailing == null) return null;

    return (
      <span
        className={styles["tapsi-row__trailing"]}
        data-part="trailing"
      >
        {trailing}
      </span>
    );
  };

  const renderDescription = () => {
    if (description == null) return null;

    return (
      <span
        className={styles["tapsi-row__description"]}
        data-part="description"
      >
        {description}
      </span>
    );
  };

  const renderBody = () => (
    <>
      {renderLeading()}
      <span
        className={styles["tapsi-row__container"]}
        data-part="container"
      >
        <span
          className={styles["tapsi-row__content"]}
          data-part="content"
        >
          <span
            className={styles["tapsi-row__label"]}
            data-part="label"
          >
            {label}
          </span>
          {renderDescription()}
        </span>
        {renderTrailing()}
      </span>
    </>
  );

  /**
   * The row picks its own element for the two interactive cases, so a
   * clickable row is always a real control — focusable, keyboard-activatable
   * and announced as a link or button — rather than whatever the consumer
   * happened to render. `render` is honoured only for a static row.
   */
  const resolveRender = () => {
    if (isLink) {
      // Mirrors the Button: opening a new tab without this pair hands the
      // opened page a reference back via `window.opener`.
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;

      return (
        // Base UI merges this element with the row's props and children, so
        // the anchor's content is `renderBody()`.
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a
          href={href}
          target={target}
          rel={rel}
        />
      );
    }

    // `type="button"`, so a row inside a form never submits it.
    if (isButton) return <button type="button" />;

    return render;
  };

  return useRender({
    render: resolveRender(),
    ref,
    // Spread FIRST, so nothing a consumer passes can quietly replace a prop
    // this component manages. `className` is not lost by this: it is
    // destructured above and merged into `classes`.
    props: {
      ...otherProps,
      className: classes,
      onClick,
      children: renderBody(),
    },
  });
};
