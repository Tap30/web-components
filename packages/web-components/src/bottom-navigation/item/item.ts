import { html, LitElement, type PropertyValues } from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { isSSR, SystemError } from "../../utils";
import { Slots } from "./constants";
import NavItemSelectionController from "./Controller";

export class BottomNavigationItem extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private _active = false;

  /**
   * Whether the item is active or not.
   */
  @property({ type: Boolean, reflect: true })
  public get active() {
    return this._active;
  }

  public set active(isActive: boolean) {
    const prevActive = this.active;

    if (prevActive === isActive) return;

    this._active = isActive;
    this.requestUpdate("active", prevActive);
    this._selectionController.handleSelectionChange();
  }

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

  private readonly _selectionController = new NavItemSelectionController(this);

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
        @click=${this._selectionController.handleClick}
        @keydown=${this._selectionController.handleKeyDown}
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
