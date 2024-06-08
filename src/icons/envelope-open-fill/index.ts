import { customElement } from 'lit/decorators.js';
import { EnvelopeOpenFillIcon } from './envelope-open-fill';

@customElement('tap-icon-envelope-open-fill')
export class TapIconEnvelopeOpenFill extends EnvelopeOpenFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-envelope-open-fill': TapIconEnvelopeOpenFill;
  }
}
