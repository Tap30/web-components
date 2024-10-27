import { customElement } from "lit/decorators.js";
import { BottomSheet } from "./bottom-sheet";
import styles from "./bottom-sheet.style";

export { Slots } from "./constants";

/**
 * @summary The BottomSheet component. A sliding panel that appears from the bottom of the screen.
 *
 * @slot header - The slot for header content.
 * @slot body - The slot for the body content.
 * @slot actionbar - The slot for actions on the actionbar.
 *
 * @prop {boolean} [open=false] - Determines whether the bottom sheet should be open or not.
 * @prop {string} [heading-title] - Sets the heading title in a declarative-way.
 * @prop {string} [heading-description] - Sets the heading description in a declarative-way.
 * @prop {boolean} [has-grabber=true] - Determines whether the grabber should be visible or not.
 * @prop {boolean} [has-dismiss-button=false] - Determines whether the dismiss button should be visible or not.
 * @prop {boolean} [has-overlay=true] - Determines whether the overlay should be visible or not.
 * @prop {boolean} [sticky-actionbar=false] - Determines whether the actionbar should be sticky or not.
 * @prop {number} [expansion-threshold=75] - The threshold for grab-end movement to trigger expansion or closure. (in pixels)
 *
 * @fires opening - Triggered when the sheet begins to open.
 * @fires opened - Triggered when the sheet is fully open.
 * @fires closing - Triggered when the sheet begins to close.
 * @fires close - Triggered when the sheet needs to close.
 * @fires closed - Triggered when the sheet is fully closed.
 * @fires grabstart - Triggered when grabbing starts.
 * @fires grabend - Triggered when grabbing ends.
 * @fires grabbing - Triggered during the grabbing of the sheet.
 * @fires expand - Triggered when the sheet expands to its maximum height.
 */
@customElement("tap-bottom-sheet")
export class TapBottomSheet extends BottomSheet {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-bottom-sheet": TapBottomSheet;
  }
}
