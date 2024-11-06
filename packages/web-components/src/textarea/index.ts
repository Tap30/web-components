import { customElement } from "lit/decorators.js";
import { inputStyles } from "../input";
import { Textarea } from "./textarea";
import styles from "./textarea.style";

/**
 * @summary The textarea component.
 *
 * @prop {string} [value=''] - The value of the textarea.
 * @prop {boolean} [disabled=false] - Indicates whether the textarea is disabled.
 * @prop {boolean} [error=false] - Indicates whether the textarea has an error.
 * @prop {string} [caption=''] - The caption text for the textarea.
 * @prop {string} [label=''] - The label for the textarea.
 * @prop {string} [name=''] - The name of the textarea.
 * @prop {string} [placeholder=''] - The placeholder text for the textarea.
 */
@customElement("tap-textarea")
export class TapTextarea extends Textarea {
  public static override readonly styles = [inputStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-textarea": TapTextarea;
  }
}
