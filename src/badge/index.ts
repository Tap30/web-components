import { customElement } from 'lit/decorators.js';
import { Badge } from './badge';
import styles from './badge.style';

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-badge value="New"></tap-badge>
 * ```
 *
 * ##### Variants
 *
 * ```html
 * <tap-badge value="Success" variant="success"></tap-badge>
 * <tap-badge value="Error" variant="error"></tap-badge>
 * <tap-badge value="Warning" variant="warning"></tap-badge>
 * <tap-badge value="Info" variant="info"></tap-badge>
 * <tap-badge value="Inverse" variant="inverse"></tap-badge>
 * ```
 *
 * ##### Types
 *
 * ```html
 * <tap-badge value="99+" type="numeral"></tap-badge>
 * <tap-badge type="dot"></tap-badge>
 * ```
 *
 * @summary Display a badge to indicate status, notification count, or contextual information.
 *
 * @prop {BadgeValue} value - The value to display inside the badge, can be a string or number.
 * @prop {'pill' | 'numeral' | 'dot'} [type='pill'] - The type of the badge to display.
 * @prop {'success' | 'error' | 'info' | 'warning' | 'inverse'} [variant='inverse'] - The variant style of the badge.
 * @prop {'high' | 'low'} [priority='high'] - The priority level of the badge.
 * @prop {boolean} [leadingIcon=false] - Whether to display a leading icon inside the badge.
 *
 * @csspart badge - The container that wraps the badge content.
 * @csspart icon - The icon inside the badge when `leadingIcon` is true.
 *
 * @cssprop [--tap-sys-spacing-2]
 * @cssprop [--tap-font-family=--tap-sys-font-family]
 * @cssprop [--tap-badge-line-height=--tap-sys-typography-body-xs-height]
 * @cssprop [--tap-badge-font-size=--tap-sys-typography-body-xs-size]
 * @cssprop [--tap-badge-font-weight=--tap-sys-typography-body-xs-weight]
 * @cssprop [--tap-badge-color=--tap-sys-color-content-primary]
 * @cssprop [--tap-badge-border-radius=--tap-sys-radius-4]
 * @cssprop [--tap-badge-pill-numeral-border-radius=--tap-sys-radius-4]
 * @cssprop [--tap-badge-pill-numeral-vertical-padding=--tap-sys-spacing-2]
 * @cssprop [--tap-badge-pill-numeral-horizontal-padding=--tap-sys-spacing-4]
 * @cssprop [--tap-badge-dot-width=6px]
 * @cssprop [--tap-badge-dot-height=6px]
 * @cssprop [--tap-badge-dot-margin=3px]
 * @cssprop [--tap-badge-info-background-color=--tap-sys-color-surface-accent]
 * @cssprop [--tap-badge-info-color=--tap-sys-color-content-on-negative]
 * @cssprop [--tap-badge-success-background-color=--tap-sys-color-surface-positive]
 * @cssprop [--tap-badge-success-color=--tap-sys-color-content-on-negative]
 * @cssprop [--tap-badge-error-background-color=--tap-sys-color-surface-negative]
 * @cssprop [--tap-badge-error-color=--tap-sys-color-content-on-negative]
 * @cssprop [--tap-badge-warning-background-color=--tap-sys-color-surface-warning]
 * @cssprop [--tap-badge-warning-color=--tap-sys-color-content-on-warning]
 * @cssprop [--tap-badge-inverse-background-color=--tap-sys-color-surface-disabled]
 * @cssprop [--tap-badge-inverse-color=--tap-sys-color-content-tertiary]
 * @cssprop [--tap-badge-info-low-background-color=--tap-sys-color-surface-accent-light]
 * @cssprop [--tap-badge-info-low-color=--tap-sys-color-content-accent]
 * @cssprop [--tap-badge-success-low-background-color=--tap-sys-color-surface-positive-light]
 * @cssprop [--tap-badge-success-low-color=--tap-sys-color-content-positive]
 * @cssprop [--tap-badge-error-low-background-color=--tap-sys-color-surface-negative-light]
 * @cssprop [--tap-badge-error-low-color=--tap-sys-color-content-negative]
 * @cssprop [--tap-badge-warning-low-background-color=--tap-sys-color-surface-warning-light]
 * @cssprop [--tap-badge-warning-low-color=--tap-sys-color-content-warning]
 */
@customElement('tap-badge')
export class TapBadge extends Badge {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-badge': TapBadge;
  }
}
