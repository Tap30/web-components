import { isSsr } from "../utils/index.ts";
import { PinwheelItem } from "./item/item.ts";
import { Pinwheel } from "./pinwheel.ts";

export { Slots } from "./constants.ts";
export { Slots as ItemSlots } from "./item/index.ts";
export { Pinwheel, PinwheelItem };

export const register = (): void => {
  if (isSsr()) return;

  if (!customElements.get("tapsi-pinwheel")) {
    customElements.define("tapsi-pinwheel", Pinwheel);
  }

  if (!customElements.get("tapsi-pinwheel-item")) {
    customElements.define("tapsi-pinwheel-item", PinwheelItem);
  }
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pinwheel": Pinwheel;
    "tapsi-pinwheel-item": PinwheelItem;
  }
}
