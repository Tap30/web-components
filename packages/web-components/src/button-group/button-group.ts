import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { logger } from "../utils";

export class ButtonGroup extends LitElement {
  /**
   * Defines the orientation of the button group.
   */
  @property()
  public orientation: "horizontal" | "vertical" = "horizontal";

  /**
   * Sets the alignment of the items within the button group.
   */
  @property()
  public alignment: "center" | "start" = "start";

  /**
   * If true, the items in the button group will expand to fill the available space.
   */
  @property({ type: Boolean, attribute: "fluid-items" })
  public fluidItems = false;

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
        "Set `label` attribute for better accessibility.",
        "button-group",
        "warning",
      );
    }

    const rootClasses = classMap({
      root: true,
      [this.orientation]: true,
      [this.alignment]: true,
      fluid: this.fluidItems,
    });

    return html`
      <div
        class=${rootClasses}
        part="root"
        role="group"
        aria-label=${this.label || nothing}
      >
        <slot></slot>
      </div>
    `;
  }
}
