import type { RegisteredCustomElement } from "../internals/types.ts";
import { Badge } from "./badge.ts";
import { Slots } from "./constants.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-badge": Badge;
  }
}

export const registerBadgeElement = () => {
  customElements.define("tapsi-badge", Badge);

  return {
    Slots,
    tagName: "tapsi-badge",
    elementClass: Badge,
  } as const satisfies RegisteredCustomElement;
};
