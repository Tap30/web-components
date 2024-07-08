import { customElement } from 'lit/decorators.js';
import { PinInput } from './pin-input.js';
import styles from './pin-input.style.js';
export * from './events.js';
export * from './constants.js';

@customElement('tap-pin-input')
export class TapPinInput extends PinInput {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-pin-input': TapPinInput;
  }
}
