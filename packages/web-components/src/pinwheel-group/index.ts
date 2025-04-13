import { PinwheelGroup } from "./pinwheel-group.ts";

export { Slots } from "./constants.ts";
export { PinwheelGroup };

export const register = () => {
  customElements.define("tapsi-pinwheel-group", PinwheelGroup);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pinwheel-group": PinwheelGroup;
  }
}
