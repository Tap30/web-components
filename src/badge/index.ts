import { customElement } from "lit/decorators.js";
import { Badge } from "./badge";
import styles from "./badge.style";

@customElement("tap-badge")
export class TapBadge extends Badge {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-divider": TapBadge;
  }
}
