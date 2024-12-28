import { customElement } from "lit/decorators.js";
import { Modal } from "./modal";
import styles from "./modal.style";

export { Slots } from "./constants";
export * from "./events";

/**
 * @summary The modal component.
 *
 * @tag tapsi-modal
 *
 * @prop {boolean} [open=false] - Indicates whether the modal is open or not.
 * @prop {string} [heading=""] - Sets the title of the modal.
 * @prop {string} [description=""] - Sets the description text for the modal.
 * @prop {"start" | "center"} [alignment="start"] - Determines the alignment of the modal's content.
 *
 * @slot imagery - The slot for imagery element.
 * @slot action-bar - The slot for actionbar element.
 *
 * @fires {ShowEvent} show - Fires when the modal should be visible.
 * @fires {HideEvent} hide - Fires when the modal should be hidden.
 */
@customElement("tapsi-modal")
export class TapsiModal extends Modal {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-modal": TapsiModal;
  }
}
