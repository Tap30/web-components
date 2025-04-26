import { isSsr } from "../../utils/index.ts";
import { Button } from "./button.ts";

export { Slots } from "./constants.ts";
export { Button };

export const register = () => {
  if (isSsr()) return;
  if (customElements.get("tapsi-button")) return;

  customElements.define("tapsi-button", Button);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-button": Button;
  }
}
