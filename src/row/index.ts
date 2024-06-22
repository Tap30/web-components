import { customElement } from 'lit/decorators.js';
import { Row } from './row';
import styles from './row.style';

/**
 *
 * <custom-element-manifest-viewer tag-name="tap-row" src="./custom-elements.json">
 *    <tap-icon-default color="black" data-knob-type="slot" slot="leading" title="icon"></tap-icon-default>
 *    <tap-checkbox data-knob-type="slot" slot="leading" title="checkbox"></tap-checkbox>
 *    <tap-radio data-knob-type="slot" slot="leading" title="radio"></tap-radio>
 *    <tap-avatar data-knob-type="slot" slot="leading" title="avatar" size="small" image="https://picsum.photos/100"></tap-avatar>
 *    <tap-button data-knob-type="slot" slot="trailing" title="button">پرداخت</tap-button>
 *    <tap-badge data-knob-type="slot" slot="trailing" title="badge" value="1" variant="error" type="numeral"></tap-badge>
 *    <tap-icon-default color="black" data-knob-type="slot" slot="trailing" title="icon"></tap-icon-default>
 *    <p color="black" data-knob-type="slot" slot="trailing" title="price">۱۵۷٬۰۰۰ تومان</p>
 *    <p color="black" data-knob-type="slot" slot="content" title="address">انتخاب آدرس</p>
 *    <p color="black" data-knob-type="slot" slot="content" title="text">متن ساده</p>
 * </custom-element-manifest-viewer>
 *
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-row>
 *   <div slot="leading">Leading content</div>
 *   <div slot="content">Main content</div>
 *   <div slot="trailing">Trailing content</div>
 * </tap-row>
 * ```
 *
 * ##### Navigable Row
 *
 * ```html
 * <tap-row navigable>
 *   <div slot="leading">Leading content</div>
 *   <div slot="content">Main content</div>
 *   <div slot="trailing">Trailing content</div>
 * </tap-row>
 * ```
 *
 * @summary A flexible row component with leading, content, and trailing slots.
 *
 * @prop {'standard' | 'compact'} [size='compact'] - The size of the row. Defaults to `standard`.
 * @prop {boolean} [navigable=false] - Indicates whether the row is navigable (clickable).
 *
 * @slot [leading] - the leading slot of the row
 * @slot [content] - the content slot of the row
 * @slot [trailing] - the trailing slot of the row
 *
 * @csspart [row] - The main container for the row.
 * @csspart [leading] - The container for the leading slot.
 * @csspart [content] - The container for the content slot.
 * @csspart [trailing] - The container for the trailing slot.
 * @csspart [navigable] - The container for the navigable icon.
 *
 * @cssprop [--tap-font-family=--tap-sys-font-family] - The font family used in the row.
 * @cssprop [--tap-row-background-color=--tap-palette-white] - The background color of the row.
 * @cssprop [--tap-row-leading-vertical-padding] - The vertical padding for the leading slot.
 * @cssprop [--tap-row-leading-horizontal-padding=--tap-sys-spacing-4] - The horizontal padding for the leading slot.
 * @cssprop [--tap-row-content-padding=--tap-sys-spacing-4] - The padding for the content slot.
 * @cssprop [--tap-row-trailing-vertical-padding] - The vertical padding for the trailing slot.
 * @cssprop [--tap-row-trailing-horizontal-padding=--tap-sys-spacing-4] - The horizontal padding for the trailing slot.
 * @cssprop [--tap-row-standard-height=--tap-sys-spacing-13] - The height of the standard size row.
 * @cssprop [--tap-row-compact-height=--tap-sys-spacing-12] - The height of the compact size row.
 *
 * @event slotchange - Dispatched when the content of any slot changes.
 */
@customElement('tap-row')
export class TapRow extends Row {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-row': TapRow;
  }
}
