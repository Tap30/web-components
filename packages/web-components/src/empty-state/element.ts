import type { RegisteredCustomElement } from "../internals/types.ts";
import { Slots } from "./constants.ts";
import { EmptyState } from "./empty-state.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-empty-state": EmptyState;
  }
}

export const registerEmptyStateElement = () => {
  customElements.define("tapsi-empty-state", EmptyState);

  return {
    Slots,
    tagName: "tapsi-empty-state",
    elementClass: EmptyState,
  } as const satisfies RegisteredCustomElement;
};
