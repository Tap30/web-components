import { customElement } from 'lit/decorators.js';
import { SegmentedButtonGroup } from './segmented-button-group';
import styles from './segmented-button-group.style';

@customElement('tap-segmented-button-group')
export class TapSegmentedButtonGroup extends SegmentedButtonGroup {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-segmented-button-group': TapSegmentedButtonGroup;
  }
}
