import { customElement } from 'lit/decorators.js';
import { ArrowTopRightFillIcon } from './arrow-top-right-fill';

@customElement('tap-icon-arrow-top-right-fill')
export class TapIconArrowTopRightFill extends ArrowTopRightFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-arrow-top-right-fill': TapIconArrowTopRightFill;
  }
}
