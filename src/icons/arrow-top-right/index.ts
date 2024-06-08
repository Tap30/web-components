import { customElement } from 'lit/decorators.js';
import { ArrowTopRightIcon } from './arrow-top-right';

@customElement('tap-icon-arrow-top-right')
export class TapIconArrowTopRight extends ArrowTopRightIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-arrow-top-right': TapIconArrowTopRight;
  }
}
