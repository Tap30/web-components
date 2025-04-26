import { isSsr } from "../utils/index.ts";
import { ButtonGroup } from "./button-group.ts";

export { Slots } from "./constants.ts";
export { ButtonGroup };

export const register = () => {
  if (isSsr()) return;
  if (customElements.get("tapsi-button-group")) return;

  customElements.define("tapsi-button-group", ButtonGroup);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-button-group": ButtonGroup;
  }
}
