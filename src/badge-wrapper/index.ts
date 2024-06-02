// index.ts

import { customElement } from 'lit/decorators.js';
import { BadgeWrapper } from './badge-wrapper';
import styles from './badge-wrapper.style';

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-badge-wrapper>
 *   <tap-button>Click!</tap-button>
 *   <tap-badge slot="badge" value="99+"></tap-badge>
 * </tap-badge-wrapper>
 * ```
 *
 * @summary A wrapper component to position a badge relative to its content.
 *
 * @slot - The default slot for the main content.
 * @slot `badge` - The slot for the badge to be positioned.
 *
 * @csspart `wrapper` - The container that wraps the main content and the badge.
 * @csspart `badge` - The container that positions the badge.
 */
@customElement('tap-badge-wrapper')
export class TapBadgeWrapper extends BadgeWrapper {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-badge-wrapper': TapBadgeWrapper;
  }
}
