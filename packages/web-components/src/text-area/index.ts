import { customElement } from "lit/decorators.js";
import { BaseTextInputSlots, baseTextInputStyles } from "../base-text-input";
import { TextArea } from "./text-area";
import styles from "./text-area.style";

export { BaseTextInputSlots as Slots };

/**
 * @summary The text-area component.
 *
 * @tag tap-text-area
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
 * @prop {number} [rows=2] -
 * The number of rows to display for the text input.
 * Defaults to 2.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows
 * @prop {number} [cols=20] -
 * The number of cols to display for the text input.
 * Defaults to 20.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols
 *
 * @slot leading-icon - the leading icon slot of the text-area
 * @slot trailing - the trailing slot of the text-area
 */
@customElement("tap-text-area")
export class TapTextArea extends TextArea {
  public static override readonly styles = [...baseTextInputStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-text-area": TapTextArea;
  }
}
