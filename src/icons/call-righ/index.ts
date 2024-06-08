import { customElement } from 'lit/decorators.js';
import { CallRighIcon } from './call-righ';

@customElement('tap-icon-call-righ')
export class TapIconCallRigh extends CallRighIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-call-righ': TapIconCallRigh;
  }
}
