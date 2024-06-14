import { customElement } from 'lit/decorators.js';
import { Spinner } from './spinner';
import styles from './spinner.style';

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-spinner />
 * ```
 *
 * ##### Variant
 *
 * ```html
 * <tap-spinner variant="inverse" />
 * ```
 *
 * @summary Display spinner.
 *
 * @prop {'primary' | 'inverse'} [variant='primary'] - Specifies the spinner color. Acceptable values are `primary` and `inverse`.
 *
 * @csspart [svg] - The svg tag that represents spinner component.
 *
 * @cssprop [--tap-spinner-color-primary=--tap-sys-color-surface-black]
 * @cssprop [--tap-spinner-color-inverse=--tap-sys-color-surface-white]
 * @cssprop [--tap-spinner-size=--tap-sys-spacing-8]
 * @cssprop [--tap-spinner-padding=--tap-sys-spacing-2]
 */

@customElement('tap-spinner')
export class TapSpinner extends Spinner {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-spinner': TapSpinner;
  }
}
