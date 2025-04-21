import { html, LitElement, type PropertyValues } from "lit";
import type { DirectiveResult } from "lit/async-directive";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap, type ClassMapDirective } from "lit/directives/class-map.js";
import { isSsr } from "../utils/index.ts";
import styles from "./badge.style.ts";
import { Slots } from "./constants.ts";

type ClassMap = DirectiveResult<typeof ClassMapDirective>;

/**
 * @summary Small alphanumerical value or status descriptor for UI elements.
 *
 * @tag tapsi-badge
 *
 * @slot [icon] - The slot for icon element.
 */
export class Badge extends LitElement {
  /** @internal */
  public static override readonly styles = [styles];

  /**
   * The value of the badge.
   * @prop {string | number} value
   * @attr {string} value
   * @default ""
   */
  @property()
  public value: string | number = "";

  /**
   * The variant of the badge.
   * @prop {"pill" | "numeral" | "dot"} variant
   * @attr {"pill" | "numeral" | "dot"} variant
   * @default "pill"
   */
  @property()
  public variant: "pill" | "numeral" | "dot" = "pill";

  /**
   * The color of the badge.
   * @prop {"success" | "error" | "info" | "warning" | "neutral"} color
   * @attr {"success" | "error" | "info" | "warning" | "neutral"} color
   * @default "neutral"
   */
  @property()
  public color: "success" | "error" | "info" | "warning" | "neutral" =
    "neutral";

  /**
   * The priority level of the badge.
   * @prop {"high" | "low"} priority
   * @attr {"high" | "low"} priority
   * @default "high"
   */
  @property()
  public priority: "high" | "low" = "high";

  /**
   * The size of the badge.
   * @prop {"md" | "sm"} size
   * @attr {"md" | "sm"} size
   * @default "md"
   */
  @property()
  public size: "md" | "sm" = "md";

  @state()
  private _hasIconSlot = false;

  @queryAssignedNodes({ slot: Slots.ICON })
  private _iconSlotNodes!: Node[];

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    this._handleIconSlotChange();
  }

  private _handleIconSlotChange() {
    if (!isSsr()) {
      this._hasIconSlot = this._iconSlotNodes.length > 0;
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
          ?hidden=${!this._hasIconSlot}
        >
          <slot
            @slotchange=${this._handleIconSlotChange}
            name=${Slots.ICON}
          ></slot>
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
