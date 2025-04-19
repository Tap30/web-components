import { html, type PropertyValues, type TemplateResult } from "lit";
import { queryAssignedNodes, state } from "lit/decorators.js";
import { isSsr } from "../../utils/index.ts";
import { BaseButton, baseButtonStyles } from "../base/index.ts";
import styles from "./button.style.ts";
import { Slots } from "./constants.ts";

/**
 * @summary Buttons allow users to take actions, and make choices, with a
 * single tap.
 *
 * @tag tapsi-button
 *
 * @slot - The default slot to use for the content.
 * @slot [leading-icon] - The slot for an optional leading icon element.
 * @slot [trailing-icon] - The slot for an optional trailing icon element.
 */
export class Button extends BaseButton {
  /** @internal */
  public static override readonly styles = [baseButtonStyles, styles];

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
    if (!isSsr()) {
      this._hasLeadingIconSlot = this._leadingIconSlotNodes.length > 0;
    }
  }

  private _handleTrailingIconSlotChange() {
    if (!isSsr()) {
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
