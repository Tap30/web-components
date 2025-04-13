import type { RegisteredCustomElement } from "../internals/types.ts";
import { Spinner } from "./spinner.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-spinner": Spinner;
  }
}

export const registerSpinnerElement = () => {
  customElements.define("tapsi-spinner", Spinner);

  return {
    tagName: "tapsi-spinner",
    elementClass: Spinner,
  } as const satisfies RegisteredCustomElement;
};
