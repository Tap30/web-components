import { customElement } from "lit/decorators.js";
import { baseStyles } from "../base";
import { ModalBottomSheet } from "./modal";
import styles from "./modal.style";

export { Slots } from "./constants";

/**
 * @summary The modal bottom-sheet component.
 *
 * @tag tap-modal-bottom-sheet
 *
 * @slot header - The slot for the header content.
 * @slot body - The slot for the body content.
 * @slot action-bar - The slot for the action bar content.
 */
@customElement("tap-modal-bottom-sheet")
export class TapModalBottomSheet extends ModalBottomSheet {
  public static override readonly styles = [baseStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-modal-bottom-sheet": TapModalBottomSheet;
  }
}
