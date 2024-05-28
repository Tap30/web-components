import { customElement } from 'lit/decorators.js';
import { Divider } from './divider.js';
import styles from './divider.style.js';

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-divider></tap-divider>
 * ```
 *
 * ##### Different Types
 *
 * ```html
 * <tap-divider type="thin"></tap-divider>
 * <tap-divider type="medium"></tap-divider>
 * <tap-divider type="bold"></tap-divider>
 * ```
 *
 * @summary A divider component used to separate content.
 *
 * @prop {`'thin'` \| `'medium'` \| `'bold'`} [`type`=`'medium'`] - The thickness of the divider.
 *
 * @csspart [`divider`] - The main container for the divider.
 *
 * @cssprop [`--tap-divider-background-color`=`--tap-sys-color-border-primary`] - The background color of the divider.
 * @cssprop [`--tap-divider-margin`=`--tap-sys-spacing-4`] - The margin around the divider.
 * @cssprop [`--tap-divider-thin-height`=`--tap-sys-spacing-1`] - The height of the thin divider.
 * @cssprop [`--tap-divider-medium-height`=`--tap-sys-spacing-2`] - The height of the medium divider.
 * @cssprop [`--tap-divider-bold-background-color`=`--tap-sys-color-surface-secondary`] - The background color of the bold divider.
 * @cssprop [`--tap-divider-bold-height`=`--tap-sys-spacing-4`] - The height of the bold divider.
 */
@customElement('tap-divider')
export class TapDivider extends Divider {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-divider': TapDivider;
  }
}
