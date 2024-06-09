import { customElement } from 'lit/decorators.js';
import { UfoFillIcon } from './ufo-fill';

@customElement('tap-icon-ufo-fill')
export class TapIconUfoFill extends UfoFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-ufo-fill': TapIconUfoFill;
  }
}
