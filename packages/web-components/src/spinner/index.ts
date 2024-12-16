import { customElement } from "lit/decorators.js";
import { Spinner } from "./spinner";
import styles from "./spinner.style";

/**
 * @summary A spinner component for loading states.
 *
 * @tag tap-spinner
 *
 * @prop {number | `${number}` | 'auto'} [size='auto'] -
 * Determines the size of the spinner.
 * When set to 'auto', it inherits the size of its parent element.
 * Otherwise, you can specify the size in pixels.
 */
@customElement("tap-spinner")
export class TapSpinner extends Spinner {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-spinner": TapSpinner;
  }
}
