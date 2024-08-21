import { customElement } from 'lit/decorators.js';
import { Modal } from './modal';
import styles from './modal.style';

/**
 * @summary A modal dialog component.
 *
 * @prop {boolean} [open=false] - Indicates whether the modal is open.
 * @prop {string} [title=''] - Sets the title of the modal. If not provided, no title is displayed.
 * @prop {string} [description=''] - Provides a description or content text for the modal. If empty, no description is shown.
 * @prop {string} [alignment='right'] - Determines the alignment of the modal's content. Can be 'right', or 'center'.
 * @prop {string} [image] - URL of an image to display within the modal. If specified, the image is shown above the content, if not pass the icon slot.
 *
 * @csspart [overlay] - The overlay background when the modal is open.
 * @csspart [dialog] - The main container for the modal dialog.
 * @csspart [image-container] - The container of the image element, a `div`.
 * @csspart [image] - The image element, a `img`.
 * @csspart [icon] - The container of the icon slot, a `div`.
 * @csspart [content] - The wrapper around title and description, a `div`.
 * @csspart [title] - The title element, a `span`.
 * @csspart [description] - The description element, a `p`.
 * @csspart [actions] -  The container of the actions slot, a `div`.
 *
 * @cssprop [--tap-dialog-color-surface-overlay=--tap-sys-color-surface-overlay-dark] - The background color of the overlay.
 * @cssprop [--tap-dialog-color-surface-primary=--tap-sys-color-surface-primary] - The background color of the modal dialog.
 * @cssprop [--tap-dialog-radius=--tap-sys-radius-6] - The border radius of the modal dialog.
 * @cssprop [--tap-dialog-icon-top-margin=--tap-sys-spacing-8] - The top margin of the icon.
 * @cssprop [--tap-dialog-image-container-background-color=--tap-palette-gray-100] - The background color of the image container.
 * @cssprop [--tap-dialog-content-vertical-padding=--tap-sys-spacing-4] - The vertical padding of the content.
 * @cssprop [--tap-dialog-content-horizontal-padding=--tap-sys-spacing-6] - The horizontal padding of the content.
 * @cssprop [--tap-dialog-content-vertical-margin=--tap-sys-spacing-6] - The vertical margin of the content.
 * @cssprop [--tap-dialog-content-horizontal-margin] - The horizontal margin of the content.
 * @cssprop [--tap-dialog-title-font-size=--tap-sys-typography-headline-sm-size] - The font size of the title in the dialog modal.
 * @cssprop [--tap-dialog-title-font-weight=--tap-sys-typography-headline-sm-weight] - The font weight of title in the dialog modal.
 * @cssprop [--tap-dialog-title-line-height=--tap-sys-typography-headline-sm-height] - The line height of title in the dialog modal.
 * @cssprop [--tap-dialog-description-margin] - The margin of the description in the dialog modal.
 * @cssprop [--tap-dialog-description-padding-top=--tap-sys-spacing-4] - The top padding of the description in the dialog modal.
 * @cssprop [--tap-dialog-description-font-size=--tap-sys-typography-body-md-size] - The font size of the description in the dialog modal.
 * @cssprop [--tap-dialog-description-font-weight=--tap-sys-typography-body-md-weight] - The font weight of the description in the dialog modal.
 * @cssprop [--tap-dialog-description-line-height=--tap-sys-typography-body-md-height] - The line height of the description in the dialog modal.
 * @cssprop [--tap-dialog-description-color=--tap-palette-gray-500] - The color of the description in the dialog modal.
 * @cssprop [--tap-dialog-actions-padding=--tap-sys-spacing-6] - The padding of the actions in the dialog modal.
 *
 * @slot [icon] - the icon slot of the modal dialog.
 * @slot [actions] - the actions slot of the modal dialog.
 */
@customElement('tap-modal')
export class TapModal extends Modal {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-modal': TapModal;
  }
}
