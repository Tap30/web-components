import { customElement } from 'lit/decorators.js';
import { Pinwheel } from './pinwheel';
import styles from './pinwheel.style';

/**
 * ### Example
 *
 * ```html
 * <tap-pinwheel .items=${["item1", "item2"]}></tap-avatar>
 * ```
 *
 * @summary A pinwheel component for selecting items by scrolling through a list.
 *
 * @prop {`string[]`} [`items`=`[]`] - An array of strings that contains pinwheel items.
 *
 * @csspart `pinwheel` - The container that wraps the pinwheel component.
 * @csspart `pinwheel-item` - The item that rendered in pinwheel.
 *
 * @cssprop [`--tap-pinwheel-vertical-padding`=`--tap-sys-spacing-0`]
 * @cssprop [`--tap-pinwheel-horizontal-padding`=`--tap-sys-spacing-6`]
 *
 * @cssprop [`--tap-pinwheel-item-height`=`--tap-sys-spacing-11`]
 *
 * @cssprop [`--tap-font-family`=`--tap-sys-font-family`]
 * @cssprop [`--tap-pinwheel-typography-body-md-height`=`--tap-sys-typography-body-md-height`]
 * @cssprop [`--tap-pinwheel-typography-body-md-size`=`--tap-sys-typography-body-md-size`]
 * @cssprop [`--tap-pinwheel-typography-body-md-weight`=`--tap-sys-typography-body-md-weight`]
 * @cssprop [`--tap-pinwheel-item-color`=`--tap-sys-color-content-tertiary`]
 *
 * @cssprop [`--tap-pinwheel-typography-label-md-height`=`--tap-sys-typography-label-md-height`]
 * @cssprop [`--tap-pinwheel-typography-label-md-size`=`--tap-sys-typography-label-md-size`]
 * @cssprop [`--tap-pinwheel-typography-label-md-weight`=`--tap-sys-typography-label-md-weight`]
 * @cssprop [`--tap-pinwheel-active-item-color`=`--tap-sys-color-content-primary`]
 *
 * @fires `pinwheel-change` - Fires when the pinwheel changes
 *
 */
@customElement('tap-pinwheel')
export class TapPinwheel extends Pinwheel {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-pinwheel': TapPinwheel;
  }
}
