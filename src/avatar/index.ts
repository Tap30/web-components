import { customElement } from "lit/decorators.js";
import { Avatar } from "./avatar.js";
import styles from "./avatar.style.js";

/**
 * @summary Display user profile image, initials or fallback icon
 * 
 * @slot - The default slot to use when image is not present.
 * 
 * @csspart avatar - The container that wraps the avatar component.
 * @csspart placeholder - The container that wraps the avatar's placeholder.
 * @csspart image - The avatar image. Only shown when the image is present.
 */
@customElement("tap-avatar")
export class TapAvatar extends Avatar {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-avatar": TapAvatar;
  }
}
