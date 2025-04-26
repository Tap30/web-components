import { isSsr } from "../utils/index.ts";
import { Avatar } from "./avatar.ts";

export { Slots } from "./constants.ts";
export { Avatar };

export const register = () => {
  if (isSsr()) return;
  if (customElements.get("tapsi-avatar")) return;

  customElements.define("tapsi-avatar", Avatar);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-avatar": Avatar;
  }
}
