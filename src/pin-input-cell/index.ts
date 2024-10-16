import { customElement } from 'lit/decorators.js';
import { PinInputCell } from './pin-input-cell.js';
import styles from './pin-input-cell.style.js';
export * from './events.js';
export * from './constants.js';

@customElement('tap-pin-input-cell')
export class TapPinInputCell extends PinInputCell {
  static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-pin-input-cell': TapPinInputCell;
  }
}
