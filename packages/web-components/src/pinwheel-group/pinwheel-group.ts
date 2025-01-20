import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { logger } from "../utils";

export class PinwheelGroup extends LitElement {
  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  protected override render() {
    if (!this.label) {
      logger(
        "Expected a valid `label` attribute, received none.",
        "pinwheel-group",
        "error",
      );
    }

    return html`
      <div
        id="root"
        class="root"
        part="root"
        role="group"
        aria-label=${this.label || nothing}
      >
        <slot></slot>
      </div>
    `;
  }
}
