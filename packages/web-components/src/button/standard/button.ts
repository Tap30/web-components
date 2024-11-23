import { html, type TemplateResult } from "lit";
import { BaseButton } from "../base";

export class Button extends BaseButton {
  protected override renderLoading(): TemplateResult {
    return html`${this.renderSpinner()}${this.renderContent()} `;
  }

  protected override renderContent(): TemplateResult {
    // TODO: consider leading and trailing icons in next versions
    return html`
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}
