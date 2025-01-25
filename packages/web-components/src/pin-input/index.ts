import { customElement } from "lit/decorators.js";
import type { CompleteEvent } from "./events.ts";
import styles from "./pin-input.style.ts";
import { PinInput } from "./pin-input.ts";

export * from "./events.ts";

/**
 * @summary The pin-input component.
 *
 * @tag tapsi-pin-input
 *
 * @prop {string} [value=""] -
 * The current value of the input. It is always a string.
 * @prop {string} [name=""] -
 * The HTML name to use in form submission.
 * @prop {boolean} [disabled=false] -
 * Whether or not the element is disabled.
 * @prop {boolean} [required=false] -
 * Indicates that the user must specify a value for the input before the
 * owning form can be submitted and will render an error state when
 * `reportValidity()` is invoked when value is empty.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
 * @prop {boolean} [readonly=false] -
 * Indicates whether or not a user should be able to edit the input's
 * value.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
 * @prop {string} [placeholder=""] -
 * Defines the text displayed in the input when it has no value.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder
 * @prop {string} [autocomplete=""] -
 * Describes what, if any, type of autocomplete functionality the input
 * should provide.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 * @prop {string} [supporting-text=""] -
 * Conveys additional information below the text input, such as how it should
 * be used.
 * @prop {boolean} [error=false] -
 * Gets or sets whether or not the text input is in a visually invalid state.
 *
 * This error state overrides the error state controlled by
 * `reportValidity()`.
 * @prop {string} [error-text=""] -
 * The error message that replaces supporting text when `error` is true. If
 * `errorText` is an empty string, then the supporting text will continue to
 * show.
 *
 * This error message overrides the error message displayed by
 * `reportValidity()`.
 * @prop {string} [label=""] -
 * The label of the input.
 * - If the `hideLabel` property is true, the label will be hidden visually
 * but still accessible to screen readers.
 * - Otherwise, a visible label element will be rendered.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @prop {string} [labelledby=""] -
 * Identifies the element (or elements) that labels the input.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
 * @prop {boolean} [hide-label=false] - Whether to hide the label or not.
 * @prop {boolean} [masked=false] - Determines whether input values should be masked or not.
 * @prop {number} [pins=4] -
 * The number of inputs.
 * Defaults to 4.
 * @prop {number} [pinlength=1] -
 * The number of each input's length.
 * Defaults to 1.
 * @prop {"alphanumeric" | "numeric"} [type="alphanumeric"] -
 * Determines which values can be entered.
 * Defaults to "alphanumeric".
 *
 * @fires {CompleteEvent} complete - Fires when all the pins have values.
 *
 * @member {string[]} valueAsArray - The value as an array.
 * @member {Function} displayValue - Retrieves or sets the function used to display values on inputs.
 */
@customElement("tapsi-pin-input")
export class TapsiPinInput extends PinInput {
  public static override readonly styles = [styles];

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiPinInputEventMap>(
    type: K,
    listener: (this: TapsiPinInput, ev: TapsiPinInputEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiPinInputEventMap>(
    type: K,
    listener: (this: TapsiPinInput, ev: TapsiPinInputEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiPinInputEventMap extends HTMLElementEventMap {
  [CompleteEvent.type]: CompleteEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pin-input": TapsiPinInput;
  }
}
