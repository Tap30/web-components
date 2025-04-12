import type { RegisteredCustomElement } from "../internals/types.ts";
import { Checkbox } from "./checkbox.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-checkbox": Checkbox;
  }
}

export const registerCheckboxElement = () => {
  customElements.define("tapsi-checkbox", Checkbox);

  return {
    tagName: "tapsi-checkbox",
    elementClass: Checkbox,
  } as const satisfies RegisteredCustomElement;
};
