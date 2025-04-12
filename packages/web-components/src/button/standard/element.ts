import type { RegisteredCustomElement } from "../../internals/types.ts";
import { Button } from "./button.ts";
import { Slots } from "./constants.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-button": Button;
  }
}

export const registerButtonElement = () => {
  customElements.define("tapsi-button", Button);

  return {
    Slots,
    tagName: "tapsi-button",
    elementClass: Button,
  } as const satisfies RegisteredCustomElement;
};
