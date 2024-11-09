import { html, LitElement } from "lit";
import type { DirectiveResult } from "lit/async-directive";
import { property } from "lit/decorators.js";
import { classMap, type ClassMapDirective } from "lit/directives/class-map.js";
import { Slots } from "./constants";

type ClassMap = DirectiveResult<typeof ClassMapDirective>;

export class Badge extends LitElement {
  @property({ type: String })
  public value: string | number = "";

  @property({ type: String })
  public variant: "pill" | "numeral" | "dot" = "pill";

  @property({ type: String })
  public color: "success" | "error" | "info" | "warning" | "neutral" =
    "neutral";

  @property({ type: String })
  public priority: "high" | "low" = "high";

  @property({ type: String })
  public size: "medium" | "small" = "medium";

  private _renderDotBadge(rootClasses: ClassMap) {
    return html`<div class="${rootClasses}"></div>`;
  }

  private _renderNumeralBadge(rootClasses: ClassMap) {
    return html`<div class="${rootClasses}">${this.value ?? 0}</div>`;
  }

  private _renderPillBadge(rootClasses: ClassMap) {
    return html`
      <div class="${rootClasses}">
        <div
          class=${Slots.ICON}
          part=${Slots.ICON}
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
