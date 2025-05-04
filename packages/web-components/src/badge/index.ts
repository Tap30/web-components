import { isSsr } from "../utils/index.ts";
import { Badge } from "./badge.ts";

export { Slots } from "./constants.ts";
export { Badge };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-badge")) return;

  customElements.define("tapsi-badge", Badge);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-badge": Badge;
  }
}
