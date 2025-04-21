import { isSsr } from "../utils/index.ts";
import { PinwheelGroup } from "./pinwheel-group.ts";

export { Slots } from "./constants.ts";
export { PinwheelGroup };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-pinwheel-group", PinwheelGroup);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pinwheel-group": PinwheelGroup;
  }
}
