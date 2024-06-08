import { customElement } from 'lit/decorators.js';
import { DefaultFillIcon } from './default-fill';

@customElement('tap-icon-default-fill')
export class TapIconDefaultFill extends DefaultFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default-fill': TapIconDefaultFill;
  }
}
