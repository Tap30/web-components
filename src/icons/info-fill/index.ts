import { customElement } from 'lit/decorators.js';
import { InfoFillIcon } from './info-fill';

@customElement('tap-icon-info-fill')
export class TapIconInfoFill extends InfoFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-info-fill': TapIconInfoFill;
  }
}
