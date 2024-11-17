import { customElement } from "lit/decorators.js";
import { Avatar } from "./avatar";
import styles from "./avatar.style";

export { Slots } from "./constants";

/**
 * @summary Display user profile image, initials or fallback icon
 *
 * @slot - The default slot to use when image is not present.
 *
 * @prop {string} [label=''] - A label to use to describe the avatar to assistive devices.
 * @prop {string} [alt=''] - The alternative text description of the avatar image, used for accessibility.
 * @prop {string} [image=''] - The image source to use for the avatar.
 * @prop {'eager' | 'lazy'} [loading='eager'] - Indicates how the browser should load the image.
 * @prop {'xSmall' | 'small' | 'medium' | 'large' | 'xLarge'} [size='medium'] - The size of the avatar.
 */
@customElement("tap-avatar")
export class TapAvatar extends Avatar {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-avatar": TapAvatar;
  }
}
