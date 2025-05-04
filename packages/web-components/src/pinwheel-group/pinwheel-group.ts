import {
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type TemplateResult,
} from "lit";
import { property } from "lit/decorators.js";
import { logger } from "../utils/index.ts";
import styles from "./pinwheel-group.style.ts";

/**
 * @summary The PinwheelGroup component can be used to group related pinwheels.
 *
 * @tag tapsi-pinwheel-group
 *
 * @slot - The default slot for the content.
 */
export class PinwheelGroup extends LitElement {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [styles];

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
