import { customElement } from "lit/decorators.js";
import { BottomSheet } from "./sheet";
import styles from "./sheet.style";

export { Slots } from "./constants";

/**
 * @summary The bottom-sheet component.
 *
 * @tag tap-bottom-sheet
 *
 * @slot header - The slot for the header content.
 * @slot body - The slot for the body content.
 * @slot action-bar - The slot for the action bar content.
 */
@customElement("tap-modal-bottom-sheet")
export class TapBottomSheet extends BottomSheet {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-bottom-sheet": TapBottomSheet;
  }
}
