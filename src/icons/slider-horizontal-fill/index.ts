import { customElement } from 'lit/decorators.js';
import { SliderHorizontalFillIcon } from './slider-horizontal-fill';

@customElement('tap-icon-slider-horizontal-fill')
export class TapIconSliderHorizontalFill extends SliderHorizontalFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-slider-horizontal-fill': TapIconSliderHorizontalFill;
  }
}
