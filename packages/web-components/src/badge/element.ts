import { Badge } from "./badge.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-badge": Badge;
  }
}

export const registerBadgeElement = () => {
  customElements.define("tapsi-badge", Badge);
};
