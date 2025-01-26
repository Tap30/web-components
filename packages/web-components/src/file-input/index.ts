import { customElement } from "lit/decorators.js";
import { type RetryEvent } from "./events";
import { FileInput } from "./file-input";
import styles from "./file-input.style";

export { Slots } from "./constants";
export * from "./events";

/**
 * @summary A file-input component.
 *
 * @tag tapsi-file-input
 *
 * @prop {boolean} [disabled=false] -
 * Indicates whether the file-input is disabled.
 * @prop {string} [accept=''] -
 * Specifying what file format does the file input accepts.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
 * @prop {string} [placeholder='انتخاب فایل'] -
 * A placeholder text for the input component when no file has been selected.
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
 * @prop {string} [supporting-text=""] -
 * Conveys additional information below the file input, such as how it should be used.
 * @prop {string} [loading-text="در حال بارگذاری..."] -
 * The text showing in file input when it is in loading state.
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
 * @prop {boolean} [multiple=false] - Whether the file input allows the user to select more than one file.
 * @prop {boolean} [required=false] -
 * Indicates that the user must specify a value for the input before the
 * owning form can be submitted and will render an error state when
 * `reportValidity()` is invoked when value is empty.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
 * @prop {boolean} [readOnly=false] -
 * Indicates whether or not a user should be able to edit the input's
 * value.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
 *
 * @method reset
 * @description - resets the input value
 *
 * @slot placeholder-icon - The icon placeholder that will override the default icon
 *
 * @fires {RetryEvent} retry - Fires when the retry button is clicked.
 */
@customElement("tapsi-file-input")
export class TapsiFileInput extends FileInput {
  public static override readonly styles = [styles];

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiFileInputEventMap>(
    type: K,
    listener: (this: TapsiFileInput, ev: TapsiFileInputEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiFileInputEventMap>(
    type: K,
    listener: (this: TapsiFileInput, ev: TapsiFileInputEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiFileInputEventMap extends HTMLElementEventMap {
  [RetryEvent.type]: RetryEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-file-input": TapsiFileInput;
  }
}
