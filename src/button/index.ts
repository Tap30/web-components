import { customElement } from "lit/decorators.js";
import { baseButtonStyles } from "../base-button";
import { Button } from "./button";
import styles from "./button.style";

/**
 * @summary A customizable button component with various styles and states.
 *
 * @prop {boolean} [disabled=false] - Whether the button is disabled.
 * @prop {'button' | 'submit' | 'reset'} [type] - The type of the button.
 * @prop {string} [value] - The value associated with the button.
 * @prop {string} [name] - The name associated with the button.
 * @prop {string} [label] - The accessible label for the button.
 * @prop {boolean} [loading=false] - Whether the button is in a loading state.
 * @prop {'small' | 'medium' | 'large'} [size='medium'] - The size of the button.
 * @prop {'primary' | 'ghost' | 'naked' | 'elevated' | 'destructive' | 'brand'} [variant='primary'] - The variant style of the button.
 *
 * @slot - buttons content
 *
 * @csspart [button] - The button element.
 *
 * @cssprop [--tap-font-family=--tap-sys-font-family] - The font family for the button.
 * @cssprop [--tap-sys-radius-full] - The border radius for the button.
 * @cssprop [--tap-button-color-surface-cover=--tap-sys-color-surface-overlay-light] - The surface cover color for the button.
 * @cssprop [--tap-sys-color-surface-overlay-light] - The overlay light color for the button.
 * @cssprop [--tap-sys-color-surface-disabled] - The disabled surface color for the button.
 * @cssprop [--tap-button-color-surface-disabled=--tap-sys-color-surface-disabled] - The disabled surface color for the button.
 * @cssprop [--tap-sys-spacing-9] - The spacing for the small button height.
 * @cssprop [--tap-sys-spacing-10] - The spacing for the medium button height.
 * @cssprop [--tap-sys-spacing-11] - The spacing for the large button height.
 * @cssprop [--tap-sys-spacing-5] - The spacing for the small button padding.
 * @cssprop [--tap-sys-spacing-6] - The spacing for the medium button padding.
 * @cssprop [--tap-sys-spacing-8] - The spacing for the large button padding.
 * @cssprop [--tap-button-typography-label-sm-height=--tap-sys-typography-label-sm-height] - The line height for the small button label.
 * @cssprop [--tap-button-typography-label-sm-size=--tap-sys-typography-label-sm-size] - The font size for the small button label.
 * @cssprop [--tap-button-typography-label-sm-weight=--tap-sys-typography-label-sm-weight] - The font weight for the small button label.
 * @cssprop [--tap-button-typography-label-md-height=--tap-sys-typography-label-sm-height] - The line height for the medium button label.
 * @cssprop [--tap-button-typography-label-md-size=--tap-sys-typography-label-sm-size] - The font size for the medium button label.
 * @cssprop [--tap-button-typography-label-md-weight=--tap-sys-typography-label-sm-weight] - The font weight for the medium button label.
 * @cssprop [--tap-button-typography-label-lg-height=--tap-sys-typography-label-lg-height] - The line height for the large button label.
 * @cssprop [--tap-button-typography-label-lg-size=--tap-sys-typography-label-lg-size] - The font size for the large button label.
 * @cssprop [--tap-button-typography-label-lg-weight=--tap-sys-typography-label-lg-weight] - The font weight for the large button label.
 * @cssprop [--tap-button-color-surface-inverse-primary=--tap-sys-color-surface-inverse-primary] - The surface color for the primary variant.
 * @cssprop [--tap-sys-color-surface-inverse-primary] - The surface color for the primary variant.
 * @cssprop [--tap-button-color-content-on-inverse=--tap-sys-color-content-on-inverse] - The content color on inverse surface.
 * @cssprop [--tap-sys-color-content-on-inverse] - The content color on inverse surface.
 * @cssprop [--tap-button-color-surface-tertiary=--tap-sys-color-surface-tertiary] - The surface color for the ghost variant.
 * @cssprop [--tap-sys-color-surface-tertiary] - The surface color for the ghost variant.
 * @cssprop [--tap-button-color-content-primary=--tap-sys-color-content-primary] - The content color for the primary variant.
 * @cssprop [--tap-sys-color-content-primary] - The content color for the primary variant.
 * @cssprop [--tap-button-color-surface-primary=--tap-sys-color-surface-primary] - The surface color for the elevated variant.
 * @cssprop [--tap-sys-color-surface-primary] - The surface color for the elevated variant.
 * @cssprop [--tap-button-color-surface-destructive=--tap-sys-color-surface-negative-light] - The surface color for the destructive variant.
 * @cssprop [--tap-sys-color-surface-negative-light] - The surface color for the destructive variant.
 * @cssprop [--tap-button-color-content-destructive=--tap-sys-color-content-negative] - The content color for the destructive variant.
 * @cssprop [--tap-sys-color-content-negative] - The content color for the destructive variant.
 * @cssprop [--tap-button-color-gradient-brand=--tap-sys-color-gradient-brand] - The gradient color for the brand variant.
 * @cssprop [--tap-sys-color-gradient-brand] - The gradient color for the brand variant.
 */
@customElement("tap-button")
export class TapButton extends Button {
  public static override readonly styles = [baseButtonStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-button": TapButton;
  }
}
