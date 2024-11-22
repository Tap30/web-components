import { customElement } from "lit/decorators.js";
import { baseButtonStyles } from "./base";
import { IconButton, iconButtonStyles } from "./iconed";
import { Button, standardButtonStyles } from "./standard";

/**
 * @summary A customizable button component with various styles and states.
 *
 * @tag tap-button
 *
 * @slot - Button's content.
 *
 * @prop {boolean} [disabled=false] - Whether the button is disabled.
 * @prop {'button' | 'submit' | 'reset'} [type] - The type of the button.
 * @prop {string} [value] - The value associated with the button.
 * @prop {string} [name] - The name associated with the button.
 * @prop {string} [label] - The accessible label for the button.
 * @prop {boolean} [loading=false] - Whether the button is in a loading state.
 * @prop {'sm' | 'md' | 'lg'} [size='md'] - The size of the button.
 * @prop {'primary' | 'ghost' | 'naked' | 'elevated' | 'destructive' | 'brand'} [variant='primary'] - The variant style of the button.
 */
@customElement("tap-button")
export class TapButton extends Button {
  public static override readonly styles = [
    baseButtonStyles,
    standardButtonStyles,
  ];
}

/**
 * @summary A customizable icon button component with various styles and states.
 *
 * @tag tap-icon-button
 *
 * @slot - Icon button's content.
 *
 * @prop {boolean} [disabled=false] - Whether the icon button is disabled.
 * @prop {'small' | 'medium' | 'large'} [size='medium'] - The size of the icon button.
 * @prop {'primary' | 'ghost' | 'naked' | 'elevated' | 'destructive' | 'brand'} [variant='primary'] - The variant style of the icon button.
 */
@customElement("tap-icon-button")
export class TapIconButton extends IconButton {
  public static override readonly styles = [baseButtonStyles, iconButtonStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-icon-button": TapIconButton;
    "tap-button": TapButton;
  }
}
