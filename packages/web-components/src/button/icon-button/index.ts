import { customElement } from "lit/decorators.js";
import { baseButtonStyles } from "../base/index.ts";
import iconButtonStyles from "./icon-button.style.ts";
import { IconButton } from "./icon-button.ts";

export { Slots } from "./constants.ts";

/**
 * @summary A customizable icon button component with various styles and states.
 *
 * @tag tapsi-icon-button
 *
 * @slot - Icon button's content.
 *
 * @prop {boolean} [disabled=false] - Whether the button is disabled.
 * @prop {'button' | 'submit' | 'reset'} [type] - The type of the button.
 * @prop {string} [label] - The accessible label for the button.
 * @prop {boolean} [loading=false] - Whether the button is in a loading state.
 * @prop {'sm' | 'md' | 'lg'} [size='md'] - The size of the button.
 * @prop {'primary' | 'ghost' | 'naked' | 'elevated' | 'destructive' | 'brand'} [variant='primary'] - The variant style of the button.
 * @prop {string} [href=""] - The URL that the link button points to.
 * @prop {string} [download=""] -
 * The filename to use when downloading the linked resource.
 * If not specified, the browser will determine a filename.
 * This is only applicable when the button is used as a link (`href` is set).
 * @prop {string} [target=""] -
 * Where to display the linked `href` URL for a link button. Common options
 * include `_blank` to open in a new tab.
 * @prop {boolean} [autofocus=false] -
 * Indicates that the element should be focused on page load.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
 */
@customElement("tapsi-icon-button")
export class TapsiIconButton extends IconButton {
  public static override readonly styles = [baseButtonStyles, iconButtonStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-icon-button": TapsiIconButton;
  }
}
