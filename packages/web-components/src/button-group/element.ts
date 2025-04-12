import type { RegisteredCustomElement } from "../internals/types.ts";
import { ButtonGroup } from "./button-group.ts";
import { Slots } from "./constants.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-button-group": ButtonGroup;
  }
}

export const registerButtonGroupElement = () => {
  customElements.define("tapsi-button-group", ButtonGroup);

  return {
    Slots,
    tagName: "tapsi-button-group",
    elementClass: ButtonGroup,
  } as const satisfies RegisteredCustomElement;
};
