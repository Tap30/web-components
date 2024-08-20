import { customElement } from 'lit/decorators.js';
import styles from './chip.style';
import { Chip } from './chip';

/**
 * @summary A chip component.
 *
 * @cssprop [--tap-font-family=--tap-sys-font-family] - The font family used in the chip.
 * @cssprop [--tap-chip-font-size=--tap-sys-typography-body-sm-size] - The font size for the chip's content.
 * @cssprop [--tap-chip-line-height=--tap-sys-typography-body-sm-height] - The line height for the chip's content.
 * @cssprop [--tap-chip-border-radius=--tap-sys-radius-full] - The border radius for the chip.
 * @cssprop [--tap-chip-border-color=--tap-sys-color-border-primary] - The border color of the chip.
 * @cssprop [--tap-chip-background-color=--tap-sys-color-surface-primary] - The background color of the chip.
 * @cssprop [--tap-chip-color=--tap-sys-color-content-primary] - The text color of the chip.
 * @cssprop [--tap-chip-horizontal-padding=--tap-sys-spacing-4] - The horizontal padding inside the chip.
 * @cssprop [--tap-chip-min-width=72px] - The minimum width of the chip.
 * @cssprop [--tap-chip-icon-gap=--tap-sys-spacing-4] - The gap of the icon slot in the chip.
 * @cssprop [--tap-chip-selected-background-color=--tap-sys-color-surface-secondary] - The background color of a selected chip.
 * @cssprop [--tap-chip-selected-border-color=--tap-sys-color-surface-inverse-primary] - The border color of a selected chip.
 * @cssprop [--tap-chip-disabled-color=--tap-sys-color-content-disabled] - The text color of a disabled chip.
 * @cssprop [--tap-chip-selected-and-disabled-color=--tap-sys-color-border-primary] - The border color of a selected and disabled chip.
 * @cssprop [--tap-chip-group-sm-height=--tap-sys-spacing-9] - The height of the chip in small size.
 * @cssprop [--tap-chip-group-md-height=--tap-sys-spacing-10] - The height of the chip in medium size.
 *
 * @csspart [chip] - The button element representing the chip.
 *
 * @slot - Default content slot for chip text.
 * @slot [icon] - Slot for an optional icon.
 *
 * @prop {boolean} [disabled=false] - Whether the chip is disabled.
 * @prop {boolean} [selected=false] - Whether the chip is selected.
 * @prop {'sm' | 'md'} [size='md'] - The size of the chip.
 * @prop {boolean} [hasIcon=false] - Whether the chip has icon.
 *
 */

@customElement('tap-chip')
export class TapChip extends Chip {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-chip': TapChip;
  }
}
