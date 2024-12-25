import { html, LitElement, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { getRenderRootSlot, runAfterRepaint } from "../utils";
import { Slots } from "./constants";

export class BadgeWrapper extends LitElement {
  /**
   * The shape of the anchor.
   */
  @property({ type: String, attribute: "anchor-shape" })
  public anchorShape: "rectangle" | "circle" | "pill" = "rectangle";

  /**
   * The horizontal placement of the badge.
   */
  @property({ type: String, attribute: "badge-side" })
  public badgeSide: "left" | "right" = "right";

  /**
   * The vertical alignment of the badge.
   */
  @property({ type: String, attribute: "badge-alignment" })
  public badgeAlignment: "top" | "middle" = "top";

  protected override updated(changed: PropertyValues<this>) {
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

  protected override render() {
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
