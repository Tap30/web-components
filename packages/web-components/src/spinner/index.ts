import { customElement } from "lit/decorators.js";
import { Spinner } from "./spinner";
import styles from "./spinner.style";

/**
 * @summary A spinner component for loading states.
 *
 * @tag tapsi-spinner
 *
 * @prop {number | `${number}` | 'auto'} [size='auto'] -
 * Determines the size of the spinner.
 * When set to 'auto', it inherits the size of its parent element.
 * Otherwise, you can specify the size in pixels.
 */
@customElement("tapsi-spinner")
export class TapsiSpinner extends Spinner {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-spinner": TapsiSpinner;
  }
}
