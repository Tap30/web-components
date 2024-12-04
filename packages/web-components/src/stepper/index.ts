import { customElement } from "lit/decorators.js";
import { Stepper } from "./stepper.js";
import styles from "./stepper.style.js";

/**
 * @summary The stepper input component.
 *
 * @prop {"sm" | "md"} [size="md"] - The size of the input.
 * @prop {string} [value=""] - The current value of the input. It is always a string.
 * @prop {string} [name=""] - The HTML name to use in form submission.
 * @prop {string} [unit=""] - The unit of the value.
 * @prop {string} [valueText=""] -
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
 * @prop {boolean} [readonly=false] -
 * Indicates whether or not a user should be able to edit the input's
 * value.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
 * @prop {string} [max="100"] -
 * Defines the maximum value in the range of permitted values.
 * Defaults to "100".
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
 * @prop {string} [min="0"] -
 * Defines the minimum value in the range of permitted values.
 * Defaults to "0".
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
 * @prop {string} [step="1"] -
 * Returns or sets the element's step attribute, which works with min and max
 * to limit the increments/decrements at which the input value can be set.
 * Defaults to "1".
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
 *
 * @fires {Event} change - Fires when value changes.
 */
@customElement("tap-stepper")
export class TapStepper extends Stepper {
  static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-stepper": TapStepper;
  }
}
