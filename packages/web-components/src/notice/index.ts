import { customElement } from "lit/decorators.js";
import { Notice } from "./notice";
import styles from "./notice.style";

/**
 * @summary A versatile Notice component for displaying important messages or alerts to inform or warn users about specific events or actions.
 *
 * @tag tap-notice
 *
 * @prop {string} [noticeTitle] - The title of the notice. If an empty string is passed, the title will not be rendered.
 * @prop {'success' | 'error' | 'info' | 'warning'} [variant='inverse'] - The variant of the notice, indicating the type of message. Defaults to `inverse`.
 * @prop {'high' | 'low'} [priority='high'] - The priority level of the notice. Defaults to `high`. High priority uses bolder colors and the role of `alert` for screen readers, while low priority uses lighter colors and the role of `status`.
 * @prop {'none' | 'icon' | 'custom'} [artwork='icon'] - The artwork of the notice component. Defaults to `icon`. Setting to `none` hides the artwork. The `icon` value shows a default icon based on the variant, and `custom` enables the use of the `artwork` slot.
 * @prop {'standard' | 'compact'} [size='standard'] - The size of the notice. Defaults to `standard`.
 * @prop {boolean} [dismissible=false] - Indicates whether the notice can be dismissed. If true, a dismiss button is rendered, emitting a 'dismiss' event when clicked.
 *
 * @slot description - The content of the notice text.
 * @slot actions - The actions associated with the notice component, typically a collection of `tap-button` components.
 * @slot artwork - The custom artwork slot for the notice component. To display this slot, set the `artwork` property to `custom`.
 *
 * @csspart root - The root container of the notice component.
 * @csspart artwork - The container for the notice icon.
 * @csspart content - The wrapper around the title, message, and actions.
 * @csspart title - The title element.
 * @csspart description - The message element.
 * @csspart actions - The actions container.
 * @csspart action - Each action slot.
 * @csspart dismiss - The dismiss button.
 *
 * @fires {CustomEvent} dismiss - Fires when the dismiss button is clicked (if dismissible).
 */

@customElement("tap-notice")
export class TapNotice extends Notice {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-notice": TapNotice;
  }
}
