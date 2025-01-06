import { html, LitElement, type PropertyValues } from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators";
import { isSSR } from "../utils";
import { Slots } from "./constants";

export class EmptyState extends LitElement {
  /**
   * The title of the empty state.
   */
  @property({ type: String })
  public override title = "";

  /**
   * The description of the empty state.
   */
  @property({ type: String })
  public description = "";

  /**
   * The alignment of the content.
   */
  @property({ type: String, attribute: "content-alignment" })
  public contentAlignment: "center" | "auto" = "auto";

  @state()
  private _hasIconSlot = false;

  @state()
  private _hasActionSlot = false;

  @queryAssignedNodes({ slot: Slots.ICON })
  private _iconSlotNodes!: Node[];

  @queryAssignedNodes({ slot: Slots.ACTION })
  private _actionSlotNodes!: Node[];

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);

    this._handleIconSlotChange();
    this._handleActionSlotChange();
  }

  private _handleIconSlotChange() {
    if (!isSSR()) {
      this._hasIconSlot = this._iconSlotNodes.length > 0;
    }
  }

  private _handleActionSlotChange() {
    if (!isSSR()) {
      this._hasActionSlot = this._actionSlotNodes.length > 0;
    }
  }

  private _renderTitle() {
    if (!this.title) return null;

    return html`
      <span
        part="title"
        class="title"
        >${this.title}
      </span>
    `;
  }

  private _renderDescription() {
    if (!this.description) return null;

    return html`
      <p
        part="description"
        class="description"
      >
        ${this.description}
      </p>
    `;
  }

  protected override render() {
    return html`
      <div
        class="root ${this.contentAlignment}"
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
        <div
          class="content"
          part="content"
        >
          ${this._renderTitle()}${this._renderDescription()}
        </div>
        <div
          class=${Slots.ACTION}
          part=${Slots.ACTION}
          ?hidden=${!this._hasActionSlot}
        >
          <slot
            @slotchange=${this._handleActionSlotChange}
            name=${Slots.ACTION}
          ></slot>
        </div>
      </div>
    `;
  }
}
