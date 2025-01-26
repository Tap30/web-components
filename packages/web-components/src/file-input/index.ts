import { customElement } from "lit/decorators.js";
import { FileInput } from "./file-input";
import styles from "./file-input.style";

export { Slots } from "./constants";

/**
 * @summary A file-input component.
 *
 * @tag tapsi-file-input
 *
 * @prop {boolean} [disabled=false] -
 * Indicates whether the file-input is disabled.
 * @prop {string} [value=''] -
 * The value of the file-input.
 * When the user selected multiple files, the value represents the first file in the list of files they selected. \
 * The other files can be identified using `files` property.
 * @prop {FileList | null} [files=null] -
 * The value of the file-input.
 * When the user selected multiple files, the value represents the first file in the list of files they selected. \
 * The other files can be identified using `files` property.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#value
 * @prop {boolean} [error=false] -
 * Whether the file-input has error.
 * @prop {string} [capture=""] -
 * Used for showing camera for mobile devices.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#capture
 * @prop {string} [error-text=""] -
 * The error message that replaces supporting text when `error` is true. If
 * `errorText` is an empty string, then the supporting text will continue to
 * show.
 *
 * This error message overrides the error message displayed by
 * `reportValidity()`.
 * @prop {boolean | number} [loading=false] -
 * Indicates the loading state of the component.
 * If `false`, the component is not in a loading state.
 * If `true`, a spinner will appear indicating the component is loading.
 * If a number between 0 and 100, it shows the percentage of the loading state.
 * @prop {string} [label=""] -
 * The label of the input.
 * If the `hideLabel` property is true, the label will be hidden visually
 * but still accessible to screen readers.
 * Otherwise, a visible label element will be rendered.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @prop {string} [labelledby=""] -
 * Identifies the element (or elements) that labels the input.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
 * @prop {boolean} [hide-label=false] - Whether to hide the label or not.
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
 *
 * @slot placeholder-icon - The icon placeholder that will override the default icon
 */
@customElement("tapsi-file-input")
export class TapsiFileInput extends FileInput {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-file-input": TapsiFileInput;
  }
}
