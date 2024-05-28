import { customElement } from 'lit/decorators.js';
import { Checkbox } from './checkbox';
import styles from './checkbox.style';

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-checkbox></tap-checkbox>
 * ```
 *
 * ##### Checked
 *
 * ```html
 * <tap-checkbox checked></tap-checkbox>
 * ```
 *
 * ##### Indeterminate
 *
 * ```html
 * <tap-checkbox indeterminate></tap-checkbox>
 * ```
 *
 * @summary A checkbox component with support for checked and indeterminate states.
 *
 * @prop {`boolean`} [`checked`=`false`] - Indicates whether the checkbox is checked.
 * @prop {`boolean`} [`indeterminate`=`false`] - Indicates whether the checkbox is in an indeterminate state.
 * @prop {`boolean`} [`disabled`=`false`] - Indicates whether the checkbox is disabled.
 * @prop {`string`} [`value`=`'on'`] - The value of the checkbox when it is checked.
 *
 * @csspart [`checkbox`] - The main container for the checkbox.
 *
 * @cssprop [`--tap-checkbox-border-radius`=`--tap-sys-radius-1`] - The border radius of the checkbox.
 * @cssprop [`--tap-checkbox-height`=`--tap-sys-spacing-7`] - The height of the checkbox.
 * @cssprop [`--tap-checkbox-width`=`--tap-sys-spacing-7`] - The width of the checkbox.
 * @cssprop [`--tap-checkbox-input-height`=`--tap-sys-spacing-7`] - The height of the checkbox input.
 * @cssprop [`--tap-checkbox-input-width`=`--tap-sys-spacing-7`] - The width of the checkbox input.
 * @cssprop [`--tap-checkbox-background-color`=`--tap-sys-color-surface-primary`] - The background color of the checkbox.
 * @cssprop [`--tap-checkbox-border`=`--tap-sys-color-border-inverse-primary`] - The border color of the checkbox.
 * @cssprop [`--tap-checkbox-checked-background-color`=`--tap-sys-color-surface-inverse-primary`] - The background color of the checked or indeterminate checkbox.
 * @cssprop [`--tap-checkbox-checked-color`=`--tap-sys-color-content-on-inverse`] - The color of the content inside the checked or indeterminate checkbox.
 * @cssprop [`--tap-checkbox-checked-color`=`--tap-sys-color-surface-disabled`] - The background color of the disabled checkbox.
 * @cssprop [`--tap-checkbox-disabled-border-color`=`--tap-sys-color-surface-disabled`] - The border color of the disabled checkbox.
 * @cssprop [`--tap-checkbox-disabled-color`=`--tap-sys-color-content-disabled`] - The color of the content inside the disabled checkbox.
 */
@customElement('tap-checkbox')
export class TapCheckbox extends Checkbox {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-checkbox': TapCheckbox;
  }
}
