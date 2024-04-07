import { customElement } from "lit/decorators.js";
import { Avatar } from "./avatar.js";
import styles from "./avatar.style.js";

@customElement("tap-avatar")
export class TapAvatar extends Avatar {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-avatar": TapAvatar;
  }
}
