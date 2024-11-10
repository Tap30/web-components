import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Slots } from "./constants";

export class BadgeWrapper extends LitElement {
  @property({ type: String, attribute: "anchor-shape" })
  public anchorShape: "rectangular" | "circular" = "rectangular";

  @property({ type: String, attribute: "badge-side" })
  public badgeSide: "left" | "right" = "right";

  @property({ type: String, attribute: "badge-alignment" })
  public badgeAlignment: "top" | "middle" = "top";

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
