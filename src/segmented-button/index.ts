import { customElement } from 'lit/decorators.js';
import { SegmentedButton } from './segmented-button';
import styles from './segmented-button.style';

@customElement('tap-segmented-button')
export class TapSegmentedButton extends SegmentedButton {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-segmented-button': TapSegmentedButton;
  }
}
