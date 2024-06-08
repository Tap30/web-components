import { customElement } from 'lit/decorators.js';
import { BoxIcon } from './box';

@customElement('tap-icon-box')
export class TapIconBox extends BoxIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-box': TapIconBox;
  }
}
