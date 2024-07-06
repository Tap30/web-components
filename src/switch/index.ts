import { customElement } from 'lit/decorators.js';
import { Switch } from './switch';
import styles from './switch.style';

@customElement('tap-switch')
export class TapSwitch extends Switch {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-switch': TapSwitch;
  }
}
