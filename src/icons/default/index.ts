import { customElement } from 'lit/decorators.js';
import { DefaultIcon } from './default';

@customElement('tap-icon-default')
export class TapIconDefault extends DefaultIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default': TapIconDefault;
  }
}
