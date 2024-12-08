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
   * Provides an accessible label for screen readers.
   * This is used to describe the button group.
   */
  @property({ attribute: "screen-reader-label" })
  public screenReaderLabel = "";

  protected override render() {
    if (!this.screenReaderLabel) {
      logger(
        "Set `screen-reader-label` attribute for better accessibility.",
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
        aria-label=${this.screenReaderLabel || nothing}
      >
        <slot></slot>
      </div>
    `;
  }
}
