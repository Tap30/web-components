import { PinwheelItem } from "./item.ts";

export { Slots } from "./constants.ts";
export { PinwheelItem };

export const register = () => {
  customElements.define("tapsi-pinwheel-item", PinwheelItem);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pinwheel-item": PinwheelItem;
  }
}
