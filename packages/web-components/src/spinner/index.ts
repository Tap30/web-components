import { customElement } from "lit/decorators.js";
import { Spinner } from "./spinner";
import styles from "./spinner.style";

/**
 * @summary Display spinner.
 *
 * @prop {'default'|'primary'|'inverse'} [variant='primary'] - Specifies the spinner color. Acceptable values are `primary` and `inverse`.
 * @prop {'small' | 'medium' | 'large'} [size='medium'] - The size of the spinner.
 *
 * @csspart `svg` - The svg tag that represents spinner component.
 *
 * @cssprop [--tap-spinner-color-primary=--tap-sys-color-surface-black]
 * @cssprop [--tap-spinner-color-inverse=--tap-sys-color-surface-white]
 * @cssprop [--tap-spinner-sm-size=--tap-sys-spacing-7]
 * @cssprop [--tap-spinner-md-size=--tap-sys-spacing-8]
 * @cssprop [--tap-spinner-lg-size=--tap-sys-spacing-10]
 * @cssprop [--tap-spinner-padding=--tap-sys-spacing-2]
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
