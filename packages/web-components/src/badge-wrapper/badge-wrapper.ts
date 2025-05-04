import {
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { getRenderRootSlot, runAfterRepaint } from "../utils/index.ts";
import styles from "./badge-wrapper.style.ts";
import { Slots } from "./constants.ts";

/**
 * @summary A wrapper component to position a badge relative to an anchor.
 *
 * @tag tapsi-badge-wrapper
 *
 * @slot - The default slot for the anchor element.
 * @slot [badge] - The slot for the badge to be positioned.
 */
export class BadgeWrapper extends LitElement {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [styles];

  /**
   * The shape of the anchor.
   *
   * @prop {"rectangle" | "circle" | "pill"} anchorShape
   * @attr {"rectangle" | "circle" | "pill"} anchor-shape
   * @default "rectangle"
   */
  @property({ attribute: "anchor-shape" })
  public anchorShape: "rectangle" | "circle" | "pill" = "rectangle";

  /**
   * The horizontal placement of the badge.
   *
   * @prop {"left" | "right"} badgeSide
   * @attr {"left" | "right"} badge-side
   * @default "right"
   */
  @property({ attribute: "badge-side" })
  public badgeSide: "left" | "right" = "right";

  /**
   * The vertical alignment of the badge.
   *
   * @prop {"top" | "middle"} badgeAlignment
   * @attr {"top" | "middle"} badge-alignment
   * @default "top"
   */
  @property({ attribute: "badge-alignment" })
  public badgeAlignment: "top" | "middle" = "top";

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    runAfterRepaint(() => {
      const anchorSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

      if (!anchorSlot) return;

      const anchor = anchorSlot.assignedElements()[0] ?? null;

      if (!anchor) return;

      const height = (anchor as HTMLElement).offsetHeight;

      const pillWrapperBadgeOffset =
        height * (Math.sqrt(2) / 4) * (Math.sqrt(2) - 1);

      this.style.setProperty(
        "--pill-badge-wrapper-badge-offset",
        `${pillWrapperBadgeOffset}px`,
      );
    });
  }

  protected override render(): TemplateResult {
    const rootClasses = classMap({
      root: true,
      [this.anchorShape]: true,
      [this.badgeAlignment]: true,
      [this.badgeSide]: true,
    });

    return html`
      <div
        class=${rootClasses}
        part="root"
      >
        <slot></slot>
        <div
          class=${Slots.BADGE}
          part=${Slots.BADGE}
        >
          <slot name=${Slots.BADGE}></slot>
        </div>
      </div>
    `;
  }
}
