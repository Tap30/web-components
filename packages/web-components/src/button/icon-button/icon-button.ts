import { html, type PropertyValues, type TemplateResult } from "lit";
import { logger } from "../../utils/index.ts";
import { BaseButton } from "../base/index.ts";

export class IconButton extends BaseButton {
  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (!this.label) {
      logger(
        "Icon buttons should include the `label` for better accessibility",
        "icon-button",
        "warning",
      );
    }
  }

  protected override renderLoading(): TemplateResult {
    return this.renderSpinner();
  }

  protected override renderContent(): TemplateResult {
    return html`<div
      class="icon"
      part="icon"
    >
      <slot></slot>
    </div>`;
  }
}
