import { html, LitElement, type PropertyValues } from "lit";
import type { DirectiveResult } from "lit/async-directive";
import { property, state } from "lit/decorators.js";
import { classMap, type ClassMapDirective } from "lit/directives/class-map.js";
import { getRenderRootSlot, isSSR } from "../utils";
import { Slots } from "./constants";

type ClassMap = DirectiveResult<typeof ClassMapDirective>;

export class Badge extends LitElement {
  /**
   * The value of the badge.
   */
  @property({ type: String })
  public value: string | number = "";

  /**
   * The variant of the badge.
   */
  @property({ type: String })
  public variant: "pill" | "numeral" | "dot" = "pill";

  /**
   * The color of the badge.
   */
  @property({ type: String })
  public color: "success" | "error" | "info" | "warning" | "neutral" =
    "neutral";

  /**
   * The priority level of the badge.
   */
  @property({ type: String })
  public priority: "high" | "low" = "high";

  /**
   * The size of the badge.
   */
  @property({ type: String })
  public size: "md" | "sm" = "md";

  @state()
  private _hasIcon = false;

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);

    if (!isSSR()) {
      const iconSlot = getRenderRootSlot(this.renderRoot, Slots.ICON);

      this._hasIcon = (iconSlot?.assignedNodes() ?? []).length > 0;
    }
  }

  private _renderDotBadge(rootClasses: ClassMap) {
    return html`<div
      class=${rootClasses}
      part="root"
    ></div>`;
  }

  private _renderNumeralBadge(rootClasses: ClassMap) {
    return html`<div
      class=${rootClasses}
      part="root"
    >
      ${this.value ?? 0}
    </div>`;
  }

  private _renderPillBadge(rootClasses: ClassMap) {
    return html`
      <div
        class=${rootClasses}
        part="root"
      >
        <div
          class=${Slots.ICON}
          part=${Slots.ICON}
          ?hidden=${!this._hasIcon}
        >
          <slot name=${Slots.ICON}></slot>
        </div>
        ${this.value ?? ""}
      </div>
    `;
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [this.variant]: true,
      [this.color]: true,
      [this.priority]: true,
      [this.size]: true,
    });

    if (this.variant === "dot") return this._renderDotBadge(rootClasses);

    if (this.variant === "numeral") {
      return this._renderNumeralBadge(rootClasses);
    }

    return this._renderPillBadge(rootClasses);
  }
}
