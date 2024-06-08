import { customElement } from 'lit/decorators.js';
import { EnvelopeIcon } from './envelope';

@customElement('tap-icon-envelope')
export class TapIconEnvelope extends EnvelopeIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-envelope': TapIconEnvelope;
  }
}
