import { customElement } from 'lit/decorators.js';
import { Button } from './button';
import styles from './button.style';
import { baseButtonStyles } from '../base-button';

@customElement('tap-button')
export class TapButton extends Button {
  static readonly styles = [baseButtonStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-button': TapButton;
  }
}
