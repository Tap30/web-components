import { isSsr } from "../utils/index.ts";
import { PinwheelItem } from "./item/item.ts";
import { Pinwheel } from "./pinwheel.ts";

export { Slots } from "./constants.ts";
export { Slots as ItemSlots } from "./item/index.ts";
export { Pinwheel, PinwheelItem };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-pinwheel", Pinwheel);
  customElements.define("tapsi-pinwheel-item", PinwheelItem);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pinwheel": Pinwheel;
    "tapsi-pinwheel-item": PinwheelItem;
  }
}
