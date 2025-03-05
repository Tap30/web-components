import { customElement } from "lit/decorators.js";
import { baseButtonStyles } from "../base/index.ts";
import standardButtonStyles from "./button.style.ts";

import { Button } from "./button.ts";

export { Slots } from "./constants.ts";

/**
 * @summary A customizable button component with various styles and states.
 *
 * @tag tapsi-button
 *
 * @slot - Button's content.
 *
 * @prop {boolean} [disabled=false] - Whether the button is disabled.
 * @prop {'button' | 'submit' | 'reset'} [type] - The type of the button.
 * @prop {string} [label] - The accessible label for the button.
 * @prop {boolean} [loading=false] - Whether the button is in a loading state.
 * @prop {'sm' | 'md' | 'lg'} [size='md'] - The size of the button.
 * @prop {'primary' | 'ghost' | 'naked' | 'elevated' | 'destructive' | 'brand'} [variant='primary'] - The variant style of the button.
 * @prop {boolean} [autofocus=false] -
 * Indicates that the element should be focused on page load.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
 */
@customElement("tapsi-button")
export class TapsiButton extends Button {
  public static override readonly styles = [
    baseButtonStyles,
    standardButtonStyles,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-button": TapsiButton;
  }
}
