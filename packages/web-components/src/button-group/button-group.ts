import {
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type TemplateResult,
} from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { logger } from "../utils/index.ts";
import styles from "./button-group.style.ts";

/**
 * @summary The ButtonGroup component can be used to group related buttons.
 *
 * @tag tapsi-button-group
 *
 * @slot - The default slot for the content.
 */
export class ButtonGroup extends LitElement {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [styles];

  /**
   * Defines the orientation of the button group.
   *
   * @prop {"horizontal" | "vertical"} orientation
   * @attr {"horizontal" | "vertical"} orientation
   * @default "horizontal"
   */
  @property()
  public orientation: "horizontal" | "vertical" = "horizontal";

  /**
   * Sets the alignment of the items within the button group.
   *
   * @prop {"center" | "start"} alignment
   * @attr {"center" | "start"} alignment
   * @default "start"
   */
  @property()
  public alignment: "center" | "start" = "start";

  /**
   * If true, the items in the button group will expand to fill the available space.
   *
   * @prop {boolean} fluidItems
   * @attr {string} fluid-items
   * @default false
   */
  @property({ type: Boolean, attribute: "fluid-items" })
  public fluidItems = false;

  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   *
   * @prop {string} label
   * @attr {string} label
   * @default ""
   */
  @property()
  public label = "";

  protected override render(): TemplateResult {
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
