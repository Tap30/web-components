import { LitElement, html, type PropertyValues } from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { KeyboardKeys } from "../internals";
import { isSSR, waitAMicrotask } from "../utils";
import { Slots } from "./constants";
import { DeselectEvent, SelectEvent, SynchronizeRequestEvent } from "./events";

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
  private _hasTrailingIconSlot = false;

  @state()
  private _hasLeadingIconSlot = false;

  @queryAssignedNodes({ slot: Slots.LEADING_ICON })
  private _leadingIconSlotNodes!: Node[];

  @queryAssignedNodes({ slot: Slots.TRAILING_ICON })
  private _trailingIconSlotNodes!: Node[];

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (changed.has("selected") && this.hasUpdated) {
      this.dispatchEvent(new SynchronizeRequestEvent());
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    this._handleLeadingIconSlotChange();
    this._handleTrailingIconSlotChange();
  }

  private _handleLeadingIconSlotChange() {
    if (!isSSR()) {
      this._hasLeadingIconSlot = this._leadingIconSlotNodes.length > 0;
    }
  }

  private _handleTrailingIconSlotChange() {
    if (!isSSR()) {
      this._hasTrailingIconSlot = this._trailingIconSlotNodes.length > 0;
    }
  }

  public override focus(options?: FocusOptions): void {
    this.renderRoot.querySelector<HTMLElement>("#root")?.focus(options);
  }

  public override blur(): void {
    this.renderRoot.querySelector<HTMLElement>("#root")?.blur();
  }

  private async _handleClick(event: MouseEvent) {
    if (this.disabled) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    let targetEvent: SelectEvent | DeselectEvent;

    const prevSelectedState = this.selected;

    if (prevSelectedState) targetEvent = new DeselectEvent();
    else targetEvent = new SelectEvent();

    this.selected = !prevSelectedState;

    this.dispatchEvent(targetEvent);
  }

  private async _handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    if (event.key !== KeyboardKeys.ENTER) return;
    if (!event.currentTarget) return;

    (event.currentTarget as HTMLElement).click();
  }

  protected override render() {
    const rootClasses = classMap({
      root: true,
      [this.size]: true,
      disabled: this.disabled,
      selected: this.selected,
      "has-leading-icon": this._hasLeadingIconSlot,
      "has-trailing-icon": this._hasTrailingIconSlot,
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
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <div
          class="icon leading-icon"
          part="leading-icon"
        >
          <slot
            @slotchange=${this._handleLeadingIconSlotChange}
            name=${Slots.LEADING_ICON}
          ></slot>
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
          <slot
            @slotchange=${this._handleTrailingIconSlotChange}
            name=${Slots.TRAILING_ICON}
          ></slot>
        </div>
      </button>
    `;
  }
}
