import { customElement } from "lit/decorators.js";
import { Notice } from "./notice";
import styles from "./notice.style";

/**
 * @summary A Notice component is a user interface element that displays important messages or alerts to inform or warn users about specific events or actions.
 *
 * @prop {'success' | 'error' | 'info' | 'warning'} [variant] - The variant of the notice. Defaults to `inverse`.
 * @prop {'high' | 'low'} [priority='high'] - The priority of the notice. Defaults to `high`. Bolder colors are used with `high` priority whereas lighter colors are used for 'low' priority notices.
 * @prop {'none' | 'icon' | 'custom'} [artwork='icon'] - The artwork of the notice component; Defaults to `icon`. The `none` value will hide the artwork, the `icon` will show a default icon based on the `variant` of the notice, the `custom` will show the `artwork` slot for this component
 * @prop {'standard' | 'compact'} [size='standard'] - The notice size
 * @prop {boolean} [dismissable=false] - Indicates whether the notice can be dismissed or not. When dismissable, the dismiss button is rendered and emits 'dismiss' event upon click.
 * @prop {string} [noticeTitle] - The title of the notice that won't be rendered upon passing empty string.
 *
 * @slot description- notice text
 * @slot actions - the actions to the notice component. usually a collection of some `tap-button` components.
 * @slot artwork - the custom artwork slot for the notice component. For showing this property, the value of `artwork` property should be equal to `custom`
 *
 * @csspart [root] - The root container of the notice component.
 * @csspart [artwork] - The container of notice icon.
 * @csspart [content] - The wrapper around title, message and actions.
 * @csspart [title] - The title element.
 * @csspart [description] - The message element.
 * @csspart [actions] - The actions container.
 * @csspart [action] - Each action slot.
 * @csspart [dismiss] - The dismiss button.
 *
 * @fires {DismissEvent} dismiss - Fires when the dismiss button is clicked (if dismissable).
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
