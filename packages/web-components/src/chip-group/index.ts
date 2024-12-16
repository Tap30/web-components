import { customElement } from "lit/decorators.js";
import { ChipGroup } from "./chip-group";
import styles from "./chip-group.style";

export { Slots } from "./constants";

/**
 * @summary A chip group component.
 *
 * @slot - Chip group contents, you should use some `tap-chip` components here
 *
 * @prop {'single' | 'multiple'} [select-mode='single'] - The select mode of the chip group.
 * @prop {'horizontal' | 'vertical'} [orientation='horizontal'] - The orientation of the chip group.
 * @prop {boolean} [full-width=false] - Indicates if the chip should be full width.
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
