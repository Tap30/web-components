// index.ts

import { customElement } from 'lit/decorators.js';
import { BadgeWrapper } from './badge-wrapper';
import styles from './badge-wrapper.style';

/**
 * <custom-element-manifest-viewer tag-name="tap-badge-wrapper" src="./custom-elements.json">
 *   <tap-button data-knob-type="slot" slot="default" title="Button">عنوان دکمه</tap-button>
 *   <tap-icon-button data-knob-type="slot" slot="default" title="Icon Button" size="medium"><tap-icon-default></tap-icon-default></tap-icon-button>
 *   <tap-badge data-knob-type="slot" slot="badge" title="Pill Badge" value="‍۱۰" variant="info"></tap-badge>
 *   <tap-badge data-knob-type="slot" slot="badge" title="Dot Badge" type="dot" variant="info"></tap-badge>
 * </custom-element-manifest-viewer>
 *
 * ---
 *
 * @summary A wrapper component to position a badge relative to its content.
 *
 * @slot - The default slot for the main content.
 * @slot badge - The slot for the badge to be positioned.
 *
 * @csspart [wrapper] - The container that wraps the main content and the badge.
 * @csspart [badge] - The container that positions the badge.
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
