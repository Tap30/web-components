import { customElement } from "lit/decorators.js";
import { baseButtonStyles } from "../base";
import { IconButton } from "./icon-button";
import iconButtonStyles from "./icon-button.style";

export { Slots } from "./constants";

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
