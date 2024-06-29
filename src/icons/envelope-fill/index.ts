import { customElement } from 'lit/decorators.js';
import { EnvelopeFillIcon } from './envelope-fill';

@customElement('tap-icon-envelope-fill')
export class TapIconEnvelopeFill extends EnvelopeFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-envelope-fill': TapIconEnvelopeFill;
  }
}
