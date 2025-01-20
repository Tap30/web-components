import { customElement } from "lit/decorators.js";
import { RateSlider } from "./rate-slider";
import styles from "./rate-slider.style";

/**
 * @summary The rate slider component.
 *
 * @tag tapsi-rate-slider
 *
 * @prop {string} [value=""] - The current value of the input. It is always a string.
 * @prop {string} [name=""] - The HTML name to use in form submission.
 * @prop {string} [valuetext=""] -
 * Defines the human-readable text alternative of value.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuetext
 * @prop {string} [label=""] -
 * Defines a string value that can be used to name input.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @prop {string} [labelledby=""] -
 * Identifies the element (or elements) that labels the input.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
 * @prop {string} [max="10"] -
 * Defines the maximum value in the range of permitted values.
 * Defaults to "10".
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
 * @prop {string} [min="0"] -
 * Defines the minimum value in the range of permitted values.
 * Defaults to "0".
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
 *
 * @method stepDown
 * @description - Decrements the value of the input.
 *
 * @method stepUp
 * @description - Increments the value of the input.
 *
 * @fires {Event} change - Fired when value changes (bubbles).
 */
@customElement("tapsi-rate-slider")
export class TapsiRateSlider extends RateSlider {
  static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-rate-slider": TapsiRateSlider;
  }
}
