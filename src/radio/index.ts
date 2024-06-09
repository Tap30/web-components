import { customElement } from 'lit/decorators.js';
import { Radio } from './radio';
import styles from './radio.style';

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-radio></tap-radio>
 * ```
 *
 * ##### Checked
 *
 * ```html
 * <tap-radio checked></tap-radio>
 * ```
 *
 * @summary A radio button component.
 *
 * @prop {`boolean`} [`checked`=`false`] - Indicates whether the radio button is checked.
 * @prop {`boolean`} [`disabled`=`false`] - Indicates whether the radio button is disabled.
 * @prop {`string`} [`value`=`''`] - The value of the radio button.
 *
 * @csspart [`radio`] - The main container for the radio button.
 * @cssprop [`--tap-radio-border-radius`=`--tap-sys-radius-full`] - The border radius of the radio button.
 * @cssprop [`--tap-radio-height`=`--tap-sys-spacing-7`] - The height of the radio button.
 * @cssprop [`--tap-radio-width`=`--tap-sys-spacing-7`] - The width of the radio button.
 * @cssprop [`--tap-radio-background-color`=`--tap-sys-color-surface-primary`] - The background color of the radio button.
 * @cssprop [`--tap-radio-border`=`--tap-sys-color-border-inverse-primary`] - The border color of the radio button.
 * @cssprop [`--tap-radio-checked-background-color`=`--tap-sys-color-surface-inverse-primary`] - The background color of the checked radio button.
 * @cssprop [`--tap-radio-checked-color`=`--tap-sys-color-content-on-inverse`] - The color of the content inside the checked radio button.
 * @cssprop [`--tap-radio-disabled-background-color`=`--tap-sys-color-surface-disabled`] - The background color of the disabled radio button.
 * @cssprop [`--tap-radio-disabled-border-color`=`--tap-sys-color-surface-disabled`] - The border color of the disabled radio button.
 * @cssprop [`--tap-radio-disabled-color`=`--tap-sys-color-content-disabled`] - The color of the content inside the disabled radio button.
 * @cssprop [`--tap-radio-input-height`=`--tap-sys-spacing-7`] - The height of the radio button input.
 * @cssprop [`--tap-radio-input-width`=`--tap-sys-spacing-7`] - The width of the radio button input.
 *
 * @fires `radio-input-change` - Fires when a radio option is selected
 */
@customElement('tap-radio')
export class TapRadio extends Radio {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-radio': TapRadio;
  }
}
