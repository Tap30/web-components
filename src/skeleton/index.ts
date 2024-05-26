import { customElement } from 'lit/decorators.js';
import { Skeleton } from './skeleton';
import styles from './skeleton.style';

@customElement('tap-skeleton')
export class TapSkeleton extends Skeleton {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-skeleton': TapSkeleton;
  }
}
