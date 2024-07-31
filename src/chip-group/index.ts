import { customElement } from 'lit/decorators.js';
import styles from './chip-group.style';
import { ChipGroup } from './chip-group';

/**
 * @summary A chip group component.
 *
 * @cssprop [--tap-chip-group-gap=--tap-sys-spacing-5] - The gap between chips in the group.
 * @cssprop [--tap-chip-group-sm-height=--tap-sys-spacing-9] - The height of the chip group in small size.
 * @cssprop [--tap-chip-group-md-height=--tap-sys-spacing-10] - The height of the chip group in medium size.
 *
 * @csspart [chip-group] - The main container for the chip group.
 *
 * @slot - Chip group contents, you should use some `tap-chip` components here
 *
 * @prop {'sm' | 'md'} [size='md'] - The size of the chip group.
 *
 */

@customElement('tap-chip-group')
export class TapChipGroup extends ChipGroup {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-chip-group': TapChipGroup;
  }
}
