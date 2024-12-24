import { customElement } from "lit/decorators.js";
import { ProgressIndicator } from "./progress-indicator.js";
import styles from "./progress-indicator.style.js";

/**
 * @summary A progress indicator component displaying multiple steps.
 *
 * @tag tap-progress-indicator
 *
 * @prop {string} [steps="2"] -
 * The total number of steps.
 * Defaults to "2".
 * @prop {string} [current="0"] -
 * The current step index.
 * Defaults to "0".
 * @prop {string} [label=""] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @prop {string} [valuetext=""] -
 * Defines the human-readable text alternative of value.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuetext
 */
@customElement("tap-progress-indicator")
export class TapProgressIndicator extends ProgressIndicator {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-progress-indicator": TapProgressIndicator;
  }
}
