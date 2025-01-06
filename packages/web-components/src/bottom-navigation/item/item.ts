import { html, LitElement, type PropertyValues } from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { KeyboardKeys } from "../../internals";
import { isSSR, SystemError, waitAMicrotask } from "../../utils";
import { Slots } from "./constants";
import { ActivateEvent } from "./events";

export class BottomNavigationItem extends LitElement {
  /**
   * Indicates whether the item is active or not.
   */
  @property({ type: Boolean, reflect: true })
  public active = false;

  /**
   * The value associated with the item.
   * This value has to be unique among sibling items.
   */
  @property({ type: String })
  public value: string = "";

  @state()
  private _hasIconSlot = false;

  @queryAssignedNodes({ slot: Slots.ICON })
  private _iconSlotNodes!: Node[];

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (!this.value) {
      throw new SystemError(
        `Expected a valid \`value\` property/attribute. Received \`${this.value}\`.`,
        "bottom-navigation-item",
      );
    }
  }

  protected override willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);

    this._handleIconSlotChange();
  }

  private _handleIconSlotChange() {
    if (!isSSR()) {
      this._hasIconSlot = this._iconSlotNodes.length > 0;
    }
  }

  public override focus(options?: FocusOptions): void {
    this.renderRoot?.querySelector<HTMLElement>("#root")?.focus(options);
  }

  public override blur(): void {
    this.renderRoot?.querySelector<HTMLElement>("#root")?.blur();
  }

  private async _handleClick(event: MouseEvent) {
    if (this.active) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    const eventAllowed = this.dispatchEvent(new ActivateEvent());

    if (!eventAllowed) return;

    this.active = true;
  }

  private async _handleKeyDown(event: KeyboardEvent) {
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
      active: this.active,
    });

    return html`
      <button
        type="button"
        part="root"
        class=${rootClasses}
        aria-selected=${this.active ? "true" : "false"}
        data-value=${this.value}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <div
          aria-hidden
          class=${Slots.ICON}
          part=${Slots.ICON}
          ?hidden=${!this._hasIconSlot}
        >
          <slot
            @slotchange=${this._handleIconSlotChange}
            name=${Slots.ICON}
          ></slot>
        </div>
        <div
          class="content"
          part="content"
        >
          <slot></slot>
        </div>
      </button>
    `;
  }
}
