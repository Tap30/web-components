import { customElement } from "lit/decorators.js";
import { BadgeWrapper } from "./badge-wrapper";
import styles from "./badge-wrapper.style";

@customElement("tap-badge-wrapper")
export class TapBadgeWrapper extends BadgeWrapper {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-badge-wrapper": TapBadgeWrapper;
  }
}
