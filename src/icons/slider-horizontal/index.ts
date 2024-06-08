import { customElement } from 'lit/decorators.js';
import { SliderHorizontalIcon } from './slider-horizontal';

@customElement('tap-icon-slider-horizontal')
export class TapIconSliderHorizontal extends SliderHorizontalIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-slider-horizontal': TapIconSliderHorizontal;
  }
}
