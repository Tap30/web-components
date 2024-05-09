import { customElement } from 'lit/decorators.js';
import { Avatar } from './avatar.js';
import styles from './avatar.style.js';

/**
 * ### Example
 * 
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
 * @prop {string} label - A label to use to describe the avatar to assistive devices.
 * @prop {string} image - The image source to use for the avatar.
 * @prop {'eager' | 'lazy'} [loading='eager'] -  Indicates how the browser should load the image.
 * @prop {'xSmall' | 'small' | 'medium' | 'large' | 'xLarge'} [size='medium'] - The size of the avatar.
 *
 * @csspart avatar - The container that wraps the avatar component.
 * @csspart placeholder - The container that wraps the avatar's placeholder.
 * @csspart image - The avatar image. Only shown when the image is present.
 *
 * @cssprop [--tap-avatar-background-color=--tap-sys-color-surface-secondary]
 * @cssprop [--tap-avatar-border-color=--tap-sys-color-border-primary]
 * @cssprop [--tap-avatar-border-radius=--tap-sys-radius-full]
 *
 * @cssprop [--tap-avatar-width-xxSmall=--tap-sys-spacing-8]
 * @cssprop [--tap-avatar-height-xxSmall=--tap-sys-spacing-8]
 *
 * @cssprop [--tap-avatar-width-xSmall=--tap-sys-spacing-9]
 * @cssprop [--tap-avatar-height-xSmall=--tap-sys-spacing-9]
 *
 * @cssprop [--tap-avatar-width-small=--tap-sys-spacing-10]
 * @cssprop [--tap-avatar-height-small=--tap-sys-spacing-10]
 *
 * @cssprop [--tap-avatar-width-medium=--tap-sys-spacing-11]
 * @cssprop [--tap-avatar-height-medium=--tap-sys-spacing-11]
 *
 * @cssprop [--tap-avatar-width-large=56px]
 * @cssprop [--tap-avatar-height-large=56px]
 *
 * @cssprop [--tap-avatar-width-xLarge=72px]
 * @cssprop [--tap-avatar-height-xLarge=72px]
 */
@customElement('tap-avatar')
export class TapAvatar extends Avatar {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-avatar': TapAvatar;
  }
}
