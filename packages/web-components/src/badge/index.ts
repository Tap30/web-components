import { isSsr } from "../utils/index.ts";
import { Badge } from "./badge.ts";

export { Slots } from "./constants.ts";
export { Badge };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-badge", Badge);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-badge": Badge;
  }
}
