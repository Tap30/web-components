import { customElement } from 'lit/decorators.js';
import { BoxFillIcon } from './box-fill';

@customElement('tap-icon-box-fill')
export class TapIconBoxFill extends BoxFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-box-fill': TapIconBoxFill;
  }
}
