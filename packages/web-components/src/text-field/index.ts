import { customElement } from "lit/decorators.js";
import { inputStyles } from "../input";
import { TextField } from "./text-field";
import styles from "./text-field.style";

/**
 * @summary The text field component.
 *
 * @prop {string} [value=''] - The value of the text field.
 * @prop {boolean} [disabled=false] - Indicates whether the text field is disabled.
 * @prop {boolean} [error=false] - Indicates whether the text field has an error.
 * @prop {string} [caption=''] - The caption text for the text field.
 * @prop {string} [label=''] - The label for the text field.
 * @prop {string} [name=''] - The name of the text field.
 * @prop {string} [placeholder=''] - The placeholder text for the text field.
 * @prop {'text'|'date'|'month'|'time'|'week'|'datetime-local'|'number'|'password'|'search'|'tel'|'url'|'email'} [type='text'] - The type of the text field.
 * @prop {string} [autocomplete=''] - The autocomplete attribute for the text field.
 * @prop {number} [max] - The maximum value of the text field; only applying to text fields with these types: `date`, `month`, `week`, `time`, `datetime-local`, `number`.
 * @prop {number} [min] - The minimum value of the text field; only applying to text fields with these types: `date`, `month`, `week`, `time`, `datetime-local`, `number`.
 * @prop {number} [maxlength] - The maximum length of the text field; only applying to text fields with these types: `text`, `search`, `url`, `tel`, `email`, `password`.
 * @prop {number} [minlength] - The minimum length of the text field; only applying to text fields with these types: `text`, `search`, `url`, `tel`, `email`, `password`.
 * @prop {string} [pattern] - The allowed regex pattern of the text field; only applying to text fields with these types: `text`, `search`, `url`, `tel`, `email`, `password`.
 * @prop {number} [step] - The step of the text field; only applying to text fields with these types: `date`, `month`, `week`, `time`, `datetime-local`, `number`.
 *
 * @slot [leading-icon] - the leading icon slot of the text-field
 * @slot [trailing] - the trailing slot of the text-field
 */
@customElement("tap-text-field")
export class TapTextField extends TextField {
  public static override readonly styles = [inputStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-text-field": TapTextField;
  }
}
