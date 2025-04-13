import { html, LitElement, type PropertyValues } from "lit";
import { property, queryAssignedNodes, state } from "lit/decorators.js";
import { isSsr } from "../utils/index.ts";
import { Slots } from "./constants.ts";
import styles from "./empty-state.style.ts";

/**
 * @summary An empty state component with icon and action slots.
 *
 * @tag tapsi-empty-state
 *
 * @slot icon - The slot for icon element.
 * @slot action - The slot for action element.
 */
export class EmptyState extends LitElement {
  /** @internal */
  public static override readonly styles = [styles];

  /**
   * The title of the empty state.
   *
   * @prop {string} title
   * @attr {string} title
   * @default ""
   */
  @property()
  public override title = "";

  /**
   * The description of the empty state.
   *
   * @prop {string} description
   * @attr {string} description
   * @default ""
   */
  @property()
  public description = "";

  /**
   * The alignment of the content.
   *
   * @prop {string} contentAlignment
   * @attr {string} content-alignment
   * @default "auto"
   */
  @property({ attribute: "content-alignment" })
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
    if (!isSsr()) {
      this._hasIconSlot = this._iconSlotNodes.length > 0;
    }
  }

  private _handleActionSlotChange() {
    if (!isSsr()) {
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
