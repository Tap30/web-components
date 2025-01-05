import { LitElement, html, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { getRenderRootSlot, isSSR } from "../utils";
import { Slots } from "./constants";
import Controller from "./Controller";

export class Chip extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Whether the chip is selected or not.
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Whether the chip is disabled or not.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The size of the chip.
   */
  @property({ type: String })
  public size: "sm" | "md" = "md";

  /**
   * The value associated with the chip.
   *
   * Use it when chips are children of chip-group.
   * This value has to be unique among sibling chips.
   */
  @property({ type: String })
  public value: string = "";

  @state()
  private _hasTrailingIcon = false;

  @state()
  private _hasLeadingIcon = false;

  private readonly _controller = new Controller(this);

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (!isSSR()) {
      const leadingIconSlot = getRenderRootSlot(
        this.renderRoot,
        Slots.LEADING_ICON,
      );

      const trailingIconSlot = getRenderRootSlot(
        this.renderRoot,
        Slots.TRAILING_ICON,
      );

      this._hasLeadingIcon =
        (leadingIconSlot?.assignedNodes() ?? []).length > 0;

      this._hasTrailingIcon =
        (trailingIconSlot?.assignedNodes() ?? []).length > 0;
    }
  }

  override focus(options?: FocusOptions): void {
    this.renderRoot.querySelector<HTMLElement>("#root")?.focus(options);
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [this.size]: true,
      disabled: this.disabled,
      selected: this.selected,
      "has-leading-icon": this._hasLeadingIcon,
      "has-trailing-icon": this._hasTrailingIcon,
    });

    return html`
      <button
        id="root"
        class=${rootClasses}
        part="root"
        ?disabled=${this.disabled}
        tabindex="${this.disabled ? "-1" : "0"}"
        aria-label=${ifDefined(this.ariaLabel ?? undefined)}
        aria-pressed=${this.selected}
        @click=${this._controller.handleClick}
        @keydown=${this._controller.handleKeyDown}
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
