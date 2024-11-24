import { customElement } from "lit/decorators.js";
import { baseButtonStyles } from "../base";
import standardButtonStyles from "./button.style";

import { Button } from "./button";

export { Slots } from "./constants";

/**
 * @summary A customizable button component with various styles and states.
 *
 * @tag tap-button
 *
 * @slot - Button's content.
 *
 * @prop {boolean} [disabled=false] - Whether the button is disabled.
 * @prop {'button' | 'submit' | 'reset'} [type] - The type of the button.
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

declare global {
  interface HTMLElementTagNameMap {
    "tap-button": TapButton;
  }
}
