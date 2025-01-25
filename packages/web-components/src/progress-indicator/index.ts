import { customElement } from "lit/decorators.js";
import styles from "./progress-indicator.style.ts";
import { ProgressIndicator } from "./progress-indicator.ts";

/**
 * @summary A progress indicator component displaying multiple steps.
 *
 * @tag tapsi-progress-indicator
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
@customElement("tapsi-progress-indicator")
export class TapsiProgressIndicator extends ProgressIndicator {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-progress-indicator": TapsiProgressIndicator;
  }
}
