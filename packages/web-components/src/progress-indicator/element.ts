import type { RegisteredCustomElement } from "../internals/types.ts";
import { ProgressIndicator } from "./progress-indicator.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-progress-indicator": ProgressIndicator;
  }
}

export const registerProgressIndicatorElement = () => {
  customElements.define("tapsi-progress-indicator", ProgressIndicator);

  return {
    tagName: "tapsi-progress-indicator",
    elementClass: ProgressIndicator,
  } as const satisfies RegisteredCustomElement;
};
