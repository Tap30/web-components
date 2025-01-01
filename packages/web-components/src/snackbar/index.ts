import { customElement } from "lit/decorators.js";
import { Snackbar } from "./snackbar";
import styles from "./snackbar.style";

export { Slots } from "./constants";
export * from "./events";

/**
 * @summary The snackbar component.
 *
 * @tag tapsi-snackbar
 *
 * @prop {boolean} [open=false] - Indicates whether the snackbar is open or not.
 * @prop {string} [heading=""] - Sets the title of the snackbar.
 * @prop {string} [description=""] - Sets the description text for the snackbar.
 * @prop {"start" | "center"} [alignment="start"] - Determines the alignment of the snackbar's content.
 *
 * @slot imagery - The slot for imagery element.
 * @slot action-bar - The slot for actionbar element.
 *
 * @fires {ShowEvent} show - Fires when the snackbar should be visible.
 * @fires {HideEvent} hide - Fires when the snackbar should be hidden.
 */
@customElement("tapsi-snackbar")
export class TapsiSnackbar extends Snackbar {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-snackbar": TapsiSnackbar;
  }
}
