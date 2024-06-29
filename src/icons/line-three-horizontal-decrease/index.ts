import { customElement } from 'lit/decorators.js';
import { LineThreeHorizontalDecreaseIcon } from './line-three-horizontal-decrease';

@customElement('tap-icon-line-three-horizontal-decrease')
export class TapIconLineThreeHorizontalDecrease extends LineThreeHorizontalDecreaseIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-line-three-horizontal-decrease': TapIconLineThreeHorizontalDecrease;
  }
}
