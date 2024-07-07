import { customElement } from 'lit/decorators.js';
import { SegmentedButton } from './segmented-button';
import styles from './segmented-button.style';

/**
 * @summary A segmented button component.
 *
 * @prop {boolean} [selected=false] - Indicates whether the button is selected.
 * @prop {boolean} [disabled=false] - Indicates whether the button is disabled.
 *
 * @csspart [button] - The main container for the button.
 *
 * @cssprop [--tap-font-family=--tap-sys-font-family] - The font family used in the button.
 * @cssprop [--tap-segmented-button-border-radius=--tap-sys-radius-full] - The border radius of the button.
 * @cssprop [--tap-segmented-button-color=--tap-sys-color-content-primary] - The text color of the button.
 * @cssprop [--tap-segmented-button-line-height=--tap-sys-typography-label-sm-height] - The line height of the button text.
 * @cssprop [--tap-segmented-button-font-size=--tap-sys-typography-label-sm-size] - The font size of the button text.
 * @cssprop [--tap-segmented-button-font-weight=--tap-sys-typography-label-sm-weight] - The font weight of the button text.
 * @cssprop [--tap-segmented-button-selected-background-color=--tap-sys-color-surface-primary] - The background color of the selected button.
 */
@customElement('tap-segmented-button')
export class TapSegmentedButton extends SegmentedButton {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-segmented-button': TapSegmentedButton;
  }
}
