import { customElement } from "lit/decorators.js";
import { Toast } from "./toast";
import styles from "./toast.style";

/**
 * @summary A toast notification component.
 *
 * @prop {boolean} [show-dismiss-button=false] - Indicates whether to show the dismiss button.
 * @prop {'success' | 'error' | 'info' | 'warning' | 'inverse'} [variant='inverse'] - The variant of the toast notification. Defaults to `inverse`.
 *
 * @csspart [toast] - The main container for the toast notification.
 * @csspart [icon] - The container for the icon.
 * @csspart [message] - The container for the message.
 * @csspart [dismiss] - The container for the dismiss button.
 *
 * @cssprop [--tap-toast-vertical-padding=--tap-sys-spacing-5] - The vertical padding inside the toast.
 * @cssprop [--tap-toast-horizontal-padding=--tap-sys-spacing-5] - The horizontal padding inside the toast.
 * @cssprop [--tap-toast-background-color-default=--tap-sys-color-surface-inverse-secondary] - The default background color of the toast.
 * @cssprop [--tap-toast-color-default=--tap-sys-color-content-on-inverse] - The default text color of the toast.
 * @cssprop [--tap-toast-background-color-success=--tap-sys-color-surface-positive] - The background color of the success variant.
 * @cssprop [--tap-toast-color-success=--tap-sys-color-content-on-inverse] - The text color of the success variant.
 * @cssprop [--tap-toast-background-color-error=--tap-sys-color-surface-negative] - The background color of the error variant.
 * @cssprop [--tap-toast-color-error=--tap-sys-color-content-on-inverse] - The text color of the error variant.
 * @cssprop [--tap-toast-background-color-info=--tap-sys-color-surface-accent] - The background color of the info variant.
 * @cssprop [--tap-toast-color-info=--tap-sys-color-content-on-inverse] - The text color of the info variant.
 * @cssprop [--tap-toast-background-color-warning=--tap-sys-color-surface-warning] - The background color of the warning variant.
 * @cssprop [--tap-toast-color-warning=--tap-sys-color-content-primary] - The text color of the warning variant.
 * @cssprop [--tap-toast-background-color-inverse=--tap-sys-color-surface-inverse-secondary] - The background color of the inverse variant.
 * @cssprop [--tap-toast-color-inverse=--tap-sys-color-content-on-inverse] - The text color of the inverse variant.
 * @cssprop [--tap-toast-dismiss-color='inherit'] - The color of the dismiss button.
 * @cssprop [--tap-toast-dismiss-background-color=transparent] - The background color of the dismiss button.
 *
 * @fires dismiss - Fires when the toast dismiss button is clicked
 */
@customElement("tap-toast")
export class TapToast extends Toast {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-toast": TapToast;
  }
}
