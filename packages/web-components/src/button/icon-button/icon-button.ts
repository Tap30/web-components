import { html, type PropertyValues, type TemplateResult } from "lit";
import { logger } from "../../utils/index.ts";
import { BaseButton, baseButtonStyles } from "../base/index.ts";
import styles from "./icon-button.style.ts";

/**
 * @summary Icon-buttons are compact components that enable users to perform
 * actions with a single tap, using only icons to visually communicate their
 * purpose.
 *
 * @tag tapsi-icon-button
 *
 * @slot - The default slot to use for the content, which must exclusively
 * consist of an icon.
 */
export class IconButton extends BaseButton {
  /** @internal */
  public static override readonly styles = [baseButtonStyles, styles];

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
