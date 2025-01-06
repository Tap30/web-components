import { html, type PropertyValues, type TemplateResult } from "lit";
import { queryAssignedNodes, state } from "lit/decorators.js";
import { isSSR } from "../../utils";
import { BaseButton } from "../base";
import { Slots } from "./constants";

export class Button extends BaseButton {
  @state()
  private _hasLeadingIconSlot = false;

  @state()
  private _hasTrailingIconSlot = false;

  @queryAssignedNodes({ slot: Slots.LEADING_ICON })
  private _leadingIconSlotNodes!: Node[];

  @queryAssignedNodes({ slot: Slots.TRAILING_ICON })
  private _trailingIconSlotNodes!: Node[];

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);

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

  protected override renderLoading(): TemplateResult {
    return html`${this.renderSpinner()}${this.renderContent()} `;
  }

  protected override renderContent(): TemplateResult {
    return html`
      <div
        class="body"
        part="body"
      >
        <div
          class="icon"
          part=${Slots.LEADING_ICON}
          ?hidden=${!this._hasLeadingIconSlot}
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
          class="icon"
          part=${Slots.TRAILING_ICON}
          ?hidden=${!this._hasTrailingIconSlot}
        >
          <slot
            @slotchange=${this._handleTrailingIconSlotChange}
            name=${Slots.TRAILING_ICON}
          ></slot>
        </div>
      </div>
    `;
  }
}
