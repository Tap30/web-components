import { customElement } from "lit/decorators.js";
import { BaseTextInputSlots, baseTextInputStyles } from "../base-text-input";
import { TextField } from "./text-field";

export { BaseTextInputSlots as Slots };

/**
 * @summary The text-field component.
 *
 * @tag tapsi-text-field
 *
 * @prop {string} [value=""] - The current value of the input. It is always a string.
 * @prop {string} [name=""] - The HTML name to use in form submission.
 * @prop {boolean} [disabled=false] - Whether or not the element is disabled.
 * @prop {boolean} [required=false] -
 * Indicates that the user must specify a value for the input before the
 * owning form can be submitted and will render an error state when
 * `reportValidity()` is invoked when value is empty.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
 * @prop {number} [maxlength=-1] -
 * The maximum number of characters a user can enter into the text input. Set
 * to -1 for none.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength
 * @prop {number} [minlength=-1] -
 * The minimum number of characters a user can enter into the text input. Set
 * to -1 for none.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength
 * @prop {string} [placeholder=""] -
 * Defines the text displayed in the text input when it has no value. Provides
 * a brief hint to the user as to the expected type of data that should be
 * entered into the control.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder
 * @prop {boolean} [readonly=false] -
 * Indicates whether or not a user should be able to edit the text input's
 * value.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
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
 * The label of the text input.
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
 * @prop {string} [type="text"] -
 * The `<input>` type to use, defaults to "text". The type greatly changes how
 * the text field behaves.
 *
 * Text fields support a limited number of `<input>` types:
 *
 * - text
 * - email
 * - number
 * - password
 * - search
 * - tel
 * - url
 *
 * See
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
 * for more details on each input type.
 * @prop {string} [max=""] -
 * Defines the greatest value in the range of permitted values.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
 * @prop {string} [min=""] -
 * Defines the most negative value in the range of permitted values.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
 * @prop {string} [pattern=""] -
 * A regular expression that the text field's value must match to pass
 * constraint validation.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern
 * @prop {boolean} [multiple=false] -
 * Indicates that input accepts multiple email addresses.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#multiple
 * @prop {string} [step=""] -
 * Returns or sets the element's step attribute, which works with min and max
 * to limit the increments at which a numeric or date-time value can be set.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
 *
 * @slot leading-icon - the leading icon slot of the text-area
 * @slot trailing - the trailing slot of the text-area
 */
@customElement("tapsi-text-field")
export class TapsiTextField extends TextField {
  public static override readonly styles = [...baseTextInputStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-text-field": TapsiTextField;
  }
}
