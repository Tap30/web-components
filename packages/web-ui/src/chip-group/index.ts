import { customElement } from "lit/decorators.js";
import { ChipGroup } from "./chip-group";
import styles from "./chip-group.style";

/**
 * @summary A chip group component.
 *
 * @cssprop [--tap-chip-group-gap=--tap-sys-spacing-5] - The gap between chips in the group.
 *
 * @csspart [chip-group] - The main container for the chip group.
 *
 * @slot - Chip group contents, you should use some `tap-chip` components here
 *
 * @prop {boolean} [fullwidth=false] - The size of the chip group.
 * @prop {'single-select' | 'multi-select'} [mode='single-select'] - The mode of the chip group.
 *
 */

@customElement("tap-chip-group")
export class TapChipGroup extends ChipGroup {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-chip-group": TapChipGroup;
  }
}
