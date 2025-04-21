import { isSsr } from "../../utils/index.ts";
import { IconButton } from "./icon-button.ts";

export { Slots } from "./constants.ts";
export { IconButton };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-icon-button", IconButton);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-icon-button": IconButton;
  }
}
