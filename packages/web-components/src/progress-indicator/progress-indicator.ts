import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";
import { logger } from "../utils/index.ts";
import styles from "./progress-indicator.style.ts";

/**
 * @summary A progress indicator component that guides users through any linear, multistep task by showing the user their completed, current, and future steps.
 *
 * @tag tapsi-progress-indicator
 */

export class ProgressIndicator extends LitElement {
  /** @internal */
  public static override readonly styles = [styles];

  /**
   * The total number of steps.
   *
   * @prop {string} steps
   * @attr {string} steps
   * @default "2"
   */
  @property()
  public steps = "2";

  /**
   * The current step index.
   *
   * @prop {string} current
   * @attr {string} current
   * @default "0"
   */
  @property()
  public current = "0";

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

  /**
   * Defines the human-readable text alternative of value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuetext
   *
   * @prop {string} valueText
   * @attr {string} valueText
   * @default ""
   */
  @property()
  public valueText = "";

  private _renderSteps() {
    const steps = Number(this.steps);

    if (Number.isNaN(steps)) return null;

    return map(range(steps), idx => {
      const stepClasses = classMap({
        step: true,
        active: idx < Number(this.current) || 0,
      });

      return html`
        <div
          class=${stepClasses}
          part="step"
        ></div>
      `;
    });
  }

  protected override render() {
    if (!this.label) {
      logger(
        "Set `label` attribute for better accessibility.",
        "progress-indicator",
        "warning",
      );
    }

    if (!this.valueText) {
      logger(
        "Set `valuetext` attribute for better accessibility.",
        "progress-indicator",
        "warning",
      );
    }

    return html`
      <div
        class="root"
        part="root"
        role="progressbar"
        aria-label=${this.label || nothing}
        aria-valuemin="0"
        aria-valuemax=${this.steps || nothing}
        aria-valuenow=${this.current || nothing}
        aria-valuetext=${this.valueText}
      >
        ${this._renderSteps()}
      </div>
    `;
  }
}
