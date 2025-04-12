import type { RegisteredCustomElement } from "../../internals/types.ts";
import { Slots } from "./constants.ts";
import { IconButton } from "./icon-button.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-icon-button": IconButton;
  }
}

export const registerIconButtonElement = () => {
  customElements.define("tapsi-icon-button", IconButton);

  return {
    Slots,
    tagName: "tapsi-icon-button",
    elementClass: IconButton,
  } as const satisfies RegisteredCustomElement;
};
