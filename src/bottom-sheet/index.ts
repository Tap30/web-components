import { customElement } from 'lit/decorators.js';
import { BottomSheet } from './bottom-sheet';
import styles from './bottom-sheet.style';

/**
 * @summary Bottom sheet Element
 *
 * @slot - The slot with name="bottom-sheet-body" contains the content of the bottom sheet's body.
 * @slot - The slot with name="bottom-sheet-header" contains the bottom sheet's header part.
 *
 * @prop {boolean} [open=false] - Controls the visibility of the bottom sheet. If true, the bottom sheet is visible.
 * @prop {boolean} [isDismissible=true] - Determines whether the bottom sheet can be dismissed by the user. If true, a close button is displayed, allowing the bottom sheet to be closed.
 * @prop {boolean} [hasDimmer=false] -  Controls the presence of a dimmer overlay.
 * @prop {string} [title=''] - Specifies the title displayed in the header of the bottom sheet.
 * @prop {boolean} [expanded=false] -  If true, the bottom sheet expands to 90% of the viewport height (90vh).
 * @prop {boolean} [showGrabber=true] -  Controls the visibility of the grabber element.
 *
 * @csspart [dimmer] - The dimmer element darkens the background and is clickable to close the bottom sheet.
 * @csspart [header] - The header of the bottom sheet component, containing the title and dismiss button.
 * @csspart [body] - The container that wraps the bottom sheet's content.
 *
 * @cssprop [--tap-bottom-sheet-bottom=0]
 * @cssprop [--tap-bottom-sheet-header-padding=0]
 * @cssprop [--tap-bottom-sheet-header-padding=12px]
 * @cssprop [--tap-bottom-sheet-background=--tap-sys-color-surface-primary]
 * @cssprop [--tap-bottom-sheet-content-overflow-y=scroll]
 */
@customElement('tap-bottom-sheet')
export class TapBottomSheet extends BottomSheet {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-bottom-sheet': TapBottomSheet;
  }
}
