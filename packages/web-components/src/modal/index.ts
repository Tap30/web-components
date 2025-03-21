import { customElement } from "lit/decorators.js";
import type { HideEvent, ShowEvent } from "./events";
import styles from "./modal.style.ts";
import { Modal } from "./modal.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";

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
 * @slot image - The slot for imagery element.
 * @slot action-bar - The slot for actionbar element.
 *
 * @fires {ShowEvent} show - Fires when the modal should be visible. (cancelable)
 * @fires {HideEvent} hide - Fires when the modal should be hidden. (cancelable)
 */
@customElement("tapsi-modal")
export class TapsiModal extends Modal {
  public static override readonly styles = [styles];

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiModalEventMap>(
    type: K,
    listener: (this: TapsiModal, ev: TapsiModalEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiModalEventMap>(
    type: K,
    listener: (this: TapsiModal, ev: TapsiModalEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiModalEventMap extends HTMLElementEventMap {
  [HideEvent.type]: HideEvent;
  [ShowEvent.type]: ShowEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-modal": TapsiModal;
  }
}
