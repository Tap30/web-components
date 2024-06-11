import { customElement } from "lit/decorators.js";
import { EmptyState } from "./empty-state";
import styles from "./empty-state.style";

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 *  <tap-empty-state>
 *    <tap-icon-default 
 *      slot="leading" 
 *      width="64" 
 *      height="64">
 *    </tap-icon-default>
 *    <div slot="content">content</div>
 *    <tap-button slot="trailing">click</tap-button>
 *  </tap-empty-state>
 * ```
 *
 * @summary An empty state component with leading, content, and trailing slots.
 *
 *
 * @cssprop [`--tap-font-family`=`--tap-sys-font-family`] - The font family used in the empty state.
 * @cssprop [`--tap-empty-state-leading-horizontal-margin`] - The horizontal margin for the leading slot.
 * @cssprop [`--tap-empty-state-leading-vertical-margin`=`--tap-sys-spacing-6`] - The vertical margin for the leading slot.
 * @cssprop [`--tap-empty-state-trailing-horizontal-margin`] - The horizontal margin for the trailing slot.
 * @cssprop [`--tap-empty-state-trailing-vertical-margin`=`--tap-sys-spacing-6`] - The vertical margin for the trailing slot.
 * @cssprop [`--tap-empty-state-content-horizontal-padding`=`--tap-sys-spacing-6`] - The horizontal padding for the content slot.
 * @cssprop [`--tap-empty-state-content-vertical-padding`=`--tap-sys-spacing-4`] - The vertical padding for the content slot.
 *
 */

@customElement('tap-empty-state')
export class TapEmptyState extends EmptyState {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-empty-state': TapEmptyState;
  }
}
