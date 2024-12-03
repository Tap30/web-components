import { html, type TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { getRenderRootSlot, runAfterRepaint } from "../../utils";
import { BaseButton } from "../base";
import { Slots } from "./constants";

export class Button extends BaseButton {
  @state()
  private _hasLeadingIcon = false;

  @state()
  private _hasTrailingIcon = false;

  protected override updated(): void {
    runAfterRepaint(() => {
      const leadingIconSlot = getRenderRootSlot(
        this.renderRoot,
        Slots.LEADING_ICON,
      );

      const trailingIconSlot = getRenderRootSlot(
        this.renderRoot,
        Slots.TRAILING_ICON,
      );

      if (!leadingIconSlot || !trailingIconSlot) return;

      this._hasLeadingIcon = leadingIconSlot.assignedNodes().length > 0;
      this._hasTrailingIcon = trailingIconSlot.assignedNodes().length > 0;
    });
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
          ?hidden=${!this._hasLeadingIcon}
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
          class="icon"
          part=${Slots.TRAILING_ICON}
          ?hidden=${!this._hasTrailingIcon}
        >
          <slot name=${Slots.TRAILING_ICON}></slot>
        </div>
      </div>
    `;
  }
}
