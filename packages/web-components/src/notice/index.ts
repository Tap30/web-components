import { customElement } from "lit/decorators.js";
import { type HideEvent, type ShowEvent } from "./events";
import { Notice } from "./notice";
import styles from "./notice.style";

export { Slots } from "./constants";
export * from "./events";

/**
 * @summary The notice components.
 *
 * @tag tapsi-notice
 *
 * @prop {boolean} [visible=false] - Indicates whether the notice is visible or not.
 * @prop {string} [heading] - The title of the notice.
 * @prop {string} [description] - The description of the notice.
 * @prop {'success' | 'error' | 'info' | 'warning'} [color='info'] -
 * The color of the notice, indicating the type of message.
 * Defaults to `info`.
 * @prop {'high' | 'low'} [priority='high'] -
 * The priority level of the notice.
 * Defaults to `high`.
 *
 * High priority uses bolder colors and the role of `alert`
 * for screen readers, while low priority uses lighter colors
 * and the role of `status`.
 * @prop {'none' | 'icon' | 'custom'} [artwork='icon'] -
 * The artwork of the notice component.
 * Defaults to `icon`.
 *
 * Setting to `none` hides the artwork.
 * The `icon` value shows a default icon based on the color,
 * and `custom` enables the use of the `artwork` slot.
 * @prop {'standard' | 'compact'} [variant='standard'] -
 * The variant of the notice.
 * Defaults to `standard`.
 * @prop {boolean} [dismissible=false] - Indicates whether the notice can be dismissed.
 *
 * @slot actions - The actions associated with the notice component, typically a collection of `tapsi-button` components.
 * @slot artwork - The custom artwork slot for the notice component. To display this slot, set the `artwork` property to `custom`.
 *
 * @fires {ShowEvent} show - Fires when the tooltip should be visible.
 * @fires {HideEvent} hide - Fires when the tooltip should be hidden.
 */

@customElement("tapsi-notice")
export class TapsiNotice extends Notice {
  public static override readonly styles = [styles];
  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiNoticeEventMap>(
    type: K,
    listener: (this: TapsiNotice, ev: TapsiNoticeEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiNoticeEventMap>(
    type: K,
    listener: (this: TapsiNotice, ev: TapsiNoticeEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiNoticeEventMap extends HTMLElementEventMap {
  [HideEvent.type]: HideEvent;
  [ShowEvent.type]: ShowEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-notice": TapsiNotice;
  }
}
