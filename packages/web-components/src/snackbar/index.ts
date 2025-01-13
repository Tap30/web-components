import { customElement } from "lit/decorators.js";
import { type HideEvent, type ShowEvent } from "./events";
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
 * @prop {boolean} [dismissible=false] - Indicates whether the snackbar can be dismissed.
 * @prop {string} [text=""] - Sets the text of the snackbar.
 * @prop {number} [duration=-1] - The time before the snackbar automatically closes (in milliseconds).
 * @prop {"success" | "error" | "info" | "warning" | "inverse"} [color="inverse"] -
 * The color of the snackbar, indicating the type of message.
 * Defaults to `inverse`.
 *
 * @slot icon - The slot for icon when color is `inverse`.
 *
 * @fires {ShowEvent} show - Fires when the snackbar should be visible.
 * @fires {HideEvent} hide - Fires when the snackbar should be hidden.
 *
 * @method show
 * @description - Opens the snackbar if it is not already open.
 * Dispatches a cancelable ShowEvent ("show").
 *
 * @method hide
 * @description - Closes the snackbar if it is currently open.
 * Dispatches a cancelable HideEvent ("hide").
 */
@customElement("tapsi-snackbar")
export class TapsiSnackbar extends Snackbar {
  public static override readonly styles = [styles];

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiSnackbarEventMap>(
    type: K,
    listener: (this: TapsiSnackbar, ev: TapsiSnackbarEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiSnackbarEventMap>(
    type: K,
    listener: (this: TapsiSnackbar, ev: TapsiSnackbarEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiSnackbarEventMap extends HTMLElementEventMap {
  [HideEvent.type]: HideEvent;
  [ShowEvent.type]: ShowEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-snackbar": TapsiSnackbar;
  }
}
