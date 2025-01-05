import { html, LitElement, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { getRenderRootSlot, isSSR } from "../utils";
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
  private _hasIcon = false;

  @state()
  private _hasAction = false;

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);

    if (!isSSR()) {
      const iconSlot = getRenderRootSlot(this.renderRoot, Slots.ICON);
      const actionSlot = getRenderRootSlot(this.renderRoot, Slots.ACTION);

      this._hasIcon = (iconSlot?.assignedNodes() ?? []).length > 0;
      this._hasAction = (actionSlot?.assignedNodes() ?? []).length > 0;
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
          ?hidden=${!this._hasIcon}
        >
          <slot name=${Slots.ICON}></slot>
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
          ?hidden=${!this._hasAction}
        >
          <slot name=${Slots.ACTION}></slot>
        </div>
      </div>
    `;
  }
}
