import { html, type TemplateResult } from "lit";
import { BaseButton } from "../base";

export class IconButton extends BaseButton {
  protected override renderLoading(): TemplateResult {
    return this.renderSpinner();
  }

  protected override renderContent(): TemplateResult {
    return html`<div class="icon"><slot></slot></div>`;
  }
}
