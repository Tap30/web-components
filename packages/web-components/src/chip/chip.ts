import { LitElement, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { runAfterRepaint } from "../utils";
import { Slots } from "./constants";

export class Chip extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true })
  public selected = false;

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @property({ type: Boolean, attribute: "full-width" })
  public fullWidth = false;

  @property({ type: String })
  public size: "small" | "medium" = "medium";

  @state()
  private _hasTrailingIcon = false;

  @state()
  private _hasLeadingIcon = false;

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    runAfterRepaint(() => {
      const root = this.renderRoot.querySelector<HTMLElement>(".root");

      const leadingIconSlot = root?.querySelector<HTMLSlotElement>(
        `slot[name="${Slots.LEADING_ICON}"]`,
      );

      const trailingIconSlot = root?.querySelector<HTMLSlotElement>(
        `slot[name="${Slots.TRAILING_ICON}"]`,
      );

      if (!leadingIconSlot || !trailingIconSlot) return;

      this._hasLeadingIcon = leadingIconSlot.assignedNodes().length > 0;
      this._hasTrailingIcon = trailingIconSlot.assignedNodes().length > 0;
    });
  }

  protected override render() {
    const { ariaLabel } = this;

    const classes = classMap({
      [this.size]: true,
      disabled: this.disabled,
      selected: this.selected,
      "full-width": this.fullWidth,
      "has-leading-icon": this._hasLeadingIcon,
      "has-trailing-icon": this._hasTrailingIcon,
    });

    return html`
      <button
        class="root ${classes}"
        part="root"
        ?disabled=${this.disabled}
        tabindex="${this.disabled ? "-1" : "0"}"
        aria-label=${ariaLabel ?? nothing}
        aria-pressed=${this.selected}
      >
        <div
          class="icon leading-icon"
          part="leading-icon"
        >
          <slot name=${Slots.LEADING_ICON}></slot>
        </div>
        <div
          class="content"
          part="content"
        >
          <slot></slot>
        </div>
        <div
          class="icon trailing-icon"
          part="trailing-icon"
        >
          <slot name=${Slots.TRAILING_ICON}></slot>
        </div>
      </button>
    `;
  }
}
