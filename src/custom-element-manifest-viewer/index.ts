import { customElement } from 'lit/decorators.js';
import { CustomElementManifestViewer } from './custom-element-manifest-viewer';
import styles from './custom-element-manifest-viewer.style';

/**
 * ### Example
 *
 * ##### Simple
 *
 * ```html
 * <tap-avatar image="avatar.png"></tap-avatar>
 * ```
 *
 * ##### Placeholder
 *
 * ```html
 * <tap-avatar image="avatar.png">AV</tap-avatar>
 * ```
 *
 * ##### Size
 *
 * ```html
 * <tap-avatar size="small" image="avatar.png">AV</tap-avatar>
 * <tap-avatar size="xSmall" image="avatar.png">AV</tap-avatar>
 * <tap-avatar size="large" image="avatar.png">AV</tap-avatar>
 * ```
 *
 * @summary Display user profile image, initials or fallback icon
 *
 * @slot - The default slot to use when image is not present.
 *
 * @prop {string} [label=''] - A label to use to describe the avatar to assistive devices.
 * @prop {string} [image=''] - The image source to use for the avatar.
 * @prop {'eager' | 'lazy'} [loading='eager'] -  Indicates how the browser should load the image.
 * @prop {'xSmall' | 'small' | 'medium' | 'large' | 'xLarge'} [size='medium'] - The size of the avatar.
 *
 * @csspart [avatar] - The container that wraps the avatar component.
 * @csspart [placeholder] - The container that wraps the avatar's placeholder.
 * @csspart [image] - The avatar image. Only shown when the image is present.
 *
 * @cssprop [--cemv-avatar-background-color=--cemv-sys-color-surface-secondary]
 * @cssprop [--cemv-avatar-border-color=--cemv-sys-color-border-primary]
 * @cssprop [--cemv-avatar-border-radius=--cemv-sys-radius-full]
 *
 * @cssprop [--cemv-avatar-width-xxSmall=--cemv-sys-spacing-8]
 * @cssprop [--cemv-avatar-height-xxSmall=--cemv-sys-spacing-8]
 *
 * @cssprop [--cemv-avatar-width-xSmall=--cemv-sys-spacing-9]
 * @cssprop [--cemv-avatar-height-xSmall=--cemv-sys-spacing-9]
 *
 * @cssprop [--cemv-avatar-width-small=--cemv-sys-spacing-10]
 * @cssprop [--cemv-avatar-height-small=--cemv-sys-spacing-10]
 *
 * @cssprop [--cemv-avatar-width-medium=--cemv-sys-spacing-11]
 * @cssprop [--cemv-avatar-height-medium=--cemv-sys-spacing-11]
 *
 * @cssprop [--cemv-avatar-width-large=56px]
 * @cssprop [--cemv-avatar-height-large=56px]
 *
 * @cssprop [--cemv-avatar-width-xLarge=72px]
 * @cssprop [--cemv-avatar-height-xLarge=72px]
 */
@customElement('custom-element-manifest-viewer')
export class CustomElementManifestViewerComponent extends CustomElementManifestViewer {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'custom-element-manifest-viewer': CustomElementManifestViewerComponent;
  }
}
