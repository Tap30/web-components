import { customElement } from 'lit/decorators.js';
import { Banner } from './banner.js';
import styles from './banner.style.js';

/**
 * @summary Display a banner with optional heading, description, and action slot.
 *
 * @prop {string} [heading] - The heading text to display in the banner.
 * @prop {string} [description] - The description text to display in the banner.
 * @prop {string} [image] - The URL of the background image to display in the banner.
 * @prop {boolean} [full-width=false] - Whether the banner should take the full width of its container.
 * @prop {'default' | 'hero'} [variant='default'] - The variant style of the banner.
 * @prop {string} [background-color] - The background color of the banner.
 * @prop {string} [textColor] - The text color of the banner.
 *
 * @csspart [banner] - The main banner element.
 * @csspart [content] - The content container inside the banner.
 * @csspart [action] - The action container inside the banner.
 * @csspart [extra] - The extra slot container inside the hero variant.
 *
 * @cssprop [--tap-sys-spacing-6] - Spacing around the banner content.
 * @cssprop [--tap-banner-color-surface] - Background color of the banner.
 * @cssprop [--tap-sys-radius-4] - Border radius of the banner.
 * @cssprop [--tap-banner-background-image] - Background image of the banner.
 * @cssprop [--tap-sys-spacing-4] - Margin around the banner.
 * @cssprop [--tap-banner-color-content] - Text color of the banner.
 * @cssprop [--tap-sys-typography-headline-xs-font=--tap-sys-font-family] - Font family for the heading text.
 * @cssprop [--tap-sys-typography-headline-xs-height] - Line height for the heading text.
 * @cssprop [--tap-sys-typography-headline-xs-size] - Font size for the heading text.
 * @cssprop [--tap-sys-typography-headline-xs-weight] - Font weight for the heading text.
 * @cssprop [--tap-sys-spacing-3] - Margin below the heading text.
 * @cssprop [--tap-sys-typography-body-xs-font] - Font family for the description text.
 * @cssprop [--tap-sys-typography-body-xs-height] - Line height for the description text.
 * @cssprop [--tap-sys-typography-body-xs-size] - Font size for the description text.
 * @cssprop [--tap-sys-typography-body-xs-weight] - Font weight for the description text.
 * @cssprop [--tap-sys-spacing-5] - Margin above the action slot.
 * @cssprop [--tap-sys-spacing-8] - Minimum height of the extra slot in the hero variant.
 */
@customElement('tap-banner')
export class TapBanner extends Banner {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-banner': TapBanner;
  }
}
