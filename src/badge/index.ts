import { customElement } from 'lit/decorators.js';
import { Badge } from './badge';
import styles from './badge.style';

/**
 *
 * @summary Display badge component with different styles and types.
 *
 * @prop {string|number} [value=''] - The value to display inside the badge.
 * @prop {'pill' | 'numeral' | 'dot'} [type='pill'] - The type of the badge.
 * @prop {'success' | 'error' | 'info' | 'warning' | 'inverse'} [variant='inverse'] - The variant style of the badge.
 * @prop {'high' | 'low'} [priority='high'] - The priority level of the badge.
 * @prop {boolean} [leadingIcon=false] - Whether to show an icon before the badge value.
 *
 * @csspart [badge] - The main badge element.
 * @csspart [icon] - The icon inside the badge.
 *
 * @cssprop [--tap-font-family=--tap-sys-font-family] - Font family of the badge.
 * @cssprop [--tap-badge-line-height=--tap-sys-typography-body-xs-height] - Line height of the badge text.
 * @cssprop [--tap-badge-font-size=--tap-sys-typography-body-xs-size] - Font size of the badge text.
 * @cssprop [--tap-badge-font-weight=--tap-sys-typography-body-xs-weight] - Font weight of the badge text.
 * @cssprop [--tap-badge-color=--tap-sys-color-content-primary] - Text color of the badge.
 * @cssprop [--tap-badge-border-radius=--tap-sys-radius-4] - Border radius of the badge.
 * @cssprop [--tap-badge-icon-margin=--tap-sys-spacing-2] - Margin around the icon.
 * @cssprop [--tap-badge-pill-numeral-border-radius=--tap-sys-radius-4] - Border radius for pill and numeral types.
 * @cssprop [--tap-badge-pill-numeral-vertical-padding=--tap-sys-spacing-2] - Vertical padding for pill and numeral types.
 * @cssprop [--tap-badge-pill-numeral-horizontal-padding=--tap-sys-spacing-4] - Horizontal padding for pill and numeral types.
 * @cssprop [--tap-badge-dot-width=6px] - Width of the dot type badge.
 * @cssprop [--tap-badge-dot-height=6px] - Height of the dot type badge.
 * @cssprop [--tap-badge-dot-margin=3px] - Margin around the dot type badge.
 * @cssprop [--tap-badge-info-background-color=--tap-sys-color-surface-accent] - Background color for info variant.
 * @cssprop [--tap-badge-info-color=--tap-sys-color-content-on-negative] - Text color for info variant.
 * @cssprop [--tap-badge-success-background-color=--tap-sys-color-surface-positive] - Background color for success variant.
 * @cssprop [--tap-badge-success-color=--tap-sys-color-content-on-negative] - Text color for success variant.
 * @cssprop [--tap-badge-error-background-color=--tap-sys-color-surface-negative] - Background color for error variant.
 * @cssprop [--tap-badge-error-color=--tap-sys-color-content-on-negative] - Text color for error variant.
 * @cssprop [--tap-badge-warning-background-color=--tap-sys-color-surface-warning] - Background color for warning variant.
 * @cssprop [--tap-badge-warning-color=--tap-sys-color-content-on-warning] - Text color for warning variant.
 * @cssprop [--tap-badge-inverse-background-color=--tap-sys-color-surface-disabled] - Background color for inverse variant.
 * @cssprop [--tap-badge-inverse-color=--tap-sys-color-content-tertiary] - Text color for inverse variant.
 * @cssprop [--tap-badge-info-low-background-color=--tap-sys-color-surface-accent-light] - Background color for low priority info variant.
 * @cssprop [--tap-badge-info-low-color=--tap-sys-color-content-accent] - Text color for low priority info variant.
 * @cssprop [--tap-badge-success-low-background-color=--tap-sys-color-surface-positive-light] - Background color for low priority success variant.
 * @cssprop [--tap-badge-success-low-color=--tap-sys-color-content-positive] - Text color for low priority success variant.
 * @cssprop [--tap-badge-error-low-background-color=--tap-sys-color-surface-negative-light] - Background color for low priority error variant.
 * @cssprop [--tap-badge-error-low-color=--tap-sys-color-content-negative] - Text color for low priority error variant.
 * @cssprop [--tap-badge-warning-low-background-color=--tap-sys-color-surface-warning-light] - Background color for low priority warning variant.
 * @cssprop [--tap-badge-warning-low-color=--tap-sys-color-content-warning] - Text color for low priority warning variant.
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
