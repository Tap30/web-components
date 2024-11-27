import { customElement } from "lit/decorators.js";
import { Notice } from "./notice";
import styles from "./notice.style";

/**
 * @summary A notice/alert component is a user interface element that displays important messages or alerts to inform or warn users about specific events or actions.
 *
 * @prop {'success' | 'error' | 'info' | 'warning'} [variant] - The variant of the notice. Defaults to `inverse`.
 * @prop {'high' | 'low'} [priority='high'] - The priority of the notice. Defaults to `high`. Bolder colors are used with `high` priority whereas lighter colors are used for 'low' priority notices.
 * @prop {'none' | 'icon' | 'custom'} [artwork='icon'] - The artwork of the notice component; Defaults to `icon`. The `none` value will hide the artwork, the `icon` will show a default icon based on the `variant` of the notice, the `custom` will show the `artwork` slot for this component
 * @prop {'standard' | 'compact'} [size='standard'] - The notice size
 * @prop {boolean} [dismissable=false] - Indicates whether the notice can be dismissed or not. When dismissable, the dismiss button is rendered and emits 'dismiss' event upon click.
 * @prop {string} [noticeTitle] - The title of the notice that won't be rendered upon passing empty string.
 * @prop {string} [noticeTitle] - The title of the notice that won't be rendered upon passing empty string.
 *
 * @slot - notice text
 * @slot actions - the actions to the notice component. usually a collection of some `tap-button` components.
 * @slot artwork - the custom artwork slot for the notice component. For showing this property, the value of `artwork` property should be equal to `custom`
 *
 * @csspart [notice] - The root container of the notice component a `div`.
 * @csspart [icon] - The container of the icon, a `span`.
 * @csspart [content-root] - The wrapper around title, message and actions, a `div`.
 * @csspart [message] - The message element, a `p`.
 * @csspart [title] - The title element, a `p`.
 * @csspart [actions] - The actions slot, a `slot`.
 * @csspart [dismiss] - The dismiss button, a `button`.
 *
 * @cssprop [--tap-notice-width=100%] - The width of the notice component.
 * @cssprop [--tap-notice-height=auto] - The height of the notice component.
 * @cssprop [--tap-notice-gap=--tap-sys-spacing-5] - The default gap between horizontal items of the notice.
 * @cssprop [--tap-notice-radius=--tap-sys-radius-3] - The default border radius of the notice.
 * @cssprop [--tap-notice-vertical-padding=--tap-sys-spacing-6] - The default vertical padding of the notice.
 * @cssprop [--tap-notice-horizontal-padding=--tap-sys-spacing-5] - The default horizontal padding of the notice.
 * @cssprop [--tap-font-family=--tap-sys-font-family] - The default font used for tapsi web components.
 * @cssprop [--tap-notice-actions-margin-top=--tap-sys-spacing-4] - The space between message and action buttons if there are any.
 * @cssprop [--tap-notice-title-font-size=--tap-sys-typography-label-md-size]
 * @cssprop [--tap-notice-title-line-height=--tap-sys-typography-label-md-height]
 * @cssprop [--tap-notice-title-font-weight=--tap-sys-typography-label-md-weight]
 * @cssprop [--tap-notice-message-font-size=--tap-sys-typography-label-sm-size]
 * @cssprop [--tap-notice-message-line-height=--tap-sys-typography-label-sm-height]
 * @cssprop [--tap-notice-message-font-weight=--tap-sys-typography-label-sm-weight]
 * @cssprop [--tap-notice-message-font-weight=--tap-sys-typography-label-sm-weight]
 * @cssprop [--tap-notice-[variant]-[priority]-color] - The text and icon color in the specified variant and high priority. The icon color in the specified variant and low priority.
 * @cssprop [--tap-notice-[variant]-[priority]-bg-color] - The background color in the specified variant and priority.
 * @cssprop [--tap-notice-title-low-color=--tap-sys-color-content-primary] - The color of the title in the low priority mode (overrides --tap-notice-[variant]-[priority]-color).
 * @cssprop [--tap-notice-message-low-color=--tap-sys-color-content-secondary] - The color of the message in the low priority mode (overrides --tap-notice-[variant]-[priority]-color).
 * @cssprop [--tap-notice-dismiss-low-color=--tap-sys-color-content-secondary] - The color of the dismiss button in the low priority mode (overrides --tap-notice-[variant]-[priority]-color).
 *
 * @fires dismiss - Fires when the dismiss button is clicked (if dismissable).
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
