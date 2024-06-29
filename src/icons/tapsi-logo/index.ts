import { customElement } from 'lit/decorators.js';
import { TapsiLogoIcon } from './tapsi-logo';

@customElement('tap-icon-tapsi-logo')
export class TapIconTapsiLogo extends TapsiLogoIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-tapsi-logo': TapIconTapsiLogo;
  }
}
