import { customElement } from 'lit/decorators.js';
import { CircleCrossIcon } from './circle-cross';

@customElement('tap-icon-circle-cross')
export class TapIconCircleCross extends CircleCrossIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-cross': TapIconCircleCross;
  }
}
