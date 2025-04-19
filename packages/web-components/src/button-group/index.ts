import { ButtonGroup } from "./button-group.ts";

export { Slots } from "./constants.ts";
export { ButtonGroup };

export const register = () => {
  customElements.define("tapsi-button-group", ButtonGroup);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-button-group": ButtonGroup;
  }
}
