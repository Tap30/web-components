import { customElement } from 'lit/decorators.js';
import { RadioGroup } from './radio-group';
import styles from './radio-group.style';

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-radio-group>
 *   <tap-radio value="1"></tap-radio>
 *   <tap-radio value="2"></tap-radio>
 * </tap-radio-group>
 * ```
 *
 * ##### With Direction
 *
 * ```html
 * <tap-radio-group direction="horizontal">
 *   <tap-radio value="1"></tap-radio>
 *   <tap-radio value="2"></tap-radio>
 * </tap-radio-group>
 * ```
 *
 * @summary A group of radio buttons.
 *
 * @prop {`'horizontal'` \| `'vertical'`} [`direction`=`'vertical'`] - The direction in which the radio buttons are laid out. Defaults to `vertical`.
 * @prop {`string`} [`value`=`''`] - The value of the selected radio button.
 *
 * @csspart [`radio-group`] - The main container for the radio group.
 *
 * @cssprop [`--tap-radio-group-padding`=`--tap-sys-spacing-3`] - The padding around the radio group.
 * @cssprop [`--tap-radio-group-gap`=`--tap-sys-spacing-3`] - The gap between radio buttons.
 *
 * @event `radio-group-change` - Dispatched when the selected radio button changes.
 */
@customElement('tap-radio-group')
export class TapRadioGroup extends RadioGroup {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-radio-group': TapRadioGroup;
  }
}
