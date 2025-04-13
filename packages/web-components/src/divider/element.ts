import type { RegisteredCustomElement } from "../internals/types.ts";
import { Divider } from "./divider.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-divider": Divider;
  }
}

export const registerDividerElement = () => {
  customElements.define("tapsi-divider", Divider);

  return {
    tagName: "tapsi-divider",
    elementClass: Divider,
  } as const satisfies RegisteredCustomElement;
};
