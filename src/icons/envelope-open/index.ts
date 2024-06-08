import { customElement } from 'lit/decorators.js';
import { EnvelopeOpenIcon } from './envelope-open';

@customElement('tap-icon-envelope-open')
export class TapIconEnvelopeOpen extends EnvelopeOpenIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-envelope-open': TapIconEnvelopeOpen;
  }
}
