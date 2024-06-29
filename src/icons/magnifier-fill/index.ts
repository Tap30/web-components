import { customElement } from 'lit/decorators.js';
import { MagnifierFillIcon } from './magnifier-fill';

@customElement('tap-icon-magnifier-fill')
export class TapIconMagnifierFill extends MagnifierFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-magnifier-fill': TapIconMagnifierFill;
  }
}
