import { customElement } from "lit/decorators.js";
import styles from "./avatar.style.ts";
import { Avatar } from "./avatar.ts";

export { Slots } from "./constants.ts";

/**
 * @summary Display user profile image, initials or fallback icon
 *
 * @tag tapsi-avatar
 *
 * @slot - The default slot to use when image is not present.
 *
 * @prop {string} label - A label to use to describe the avatar to assistive devices.
 * @prop {string} alt - The alternative text description of the avatar image, used for accessibility.
 * @prop {string} image - The image source to use for the avatar.
 * @prop {'eager' | 'lazy'} [loading='eager'] - Indicates how the browser should load the image.
 * @prop {'xs' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg'} [size='md'] - The size of the avatar.
 */
@customElement("tapsi-avatar")
export class TapsiAvatar extends Avatar {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-avatar": TapsiAvatar;
  }
}
