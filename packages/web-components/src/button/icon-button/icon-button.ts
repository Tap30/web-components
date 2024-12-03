import { html, type PropertyValues, type TemplateResult } from "lit";
import { logger } from "../../utils";
import { BaseButton } from "../base";

export class IconButton extends BaseButton {
  protected override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (!this.label) {
      logger(
        "Icon buttons should include the `label` for better accessibility",
        "IconButton",
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
