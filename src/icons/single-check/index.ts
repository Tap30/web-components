import { customElement } from 'lit/decorators.js';
import { SingleCheckIcon } from './single-check';

@customElement('tap-icon-single-check')
export class TapIconSingleCheck extends SingleCheckIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-single-check': TapIconSingleCheck;
  }
}
