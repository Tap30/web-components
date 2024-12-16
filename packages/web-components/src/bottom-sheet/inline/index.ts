import { customElement } from "lit/decorators.js";
import { baseStyles } from "../base";
import { InlineBottomSheet } from "./inline";
import styles from "./inline.style";

export { Slots } from "./constants";

/**
 * @summary The inline bottom-sheet component.
 *
 * @tag tap-inline-bottom-sheet
 *
 * @slot header - The slot for the header content.
 * @slot body - The slot for the body content.
 * @slot action-bar - The slot for the action bar content.
 */
@customElement("tap-inline-bottom-sheet")
export class TapInlineBottomSheet extends InlineBottomSheet {
  public static override readonly styles = [baseStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-inline-bottom-sheet": TapInlineBottomSheet;
  }
}
