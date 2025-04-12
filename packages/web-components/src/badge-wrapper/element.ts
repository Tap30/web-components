import type { RegisteredCustomElement } from "../internals/types.ts";
import { BadgeWrapper } from "./badge-wrapper.ts";
import { Slots } from "./constants.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-badge-wrapper": BadgeWrapper;
  }
}

export const registerBadgeWrapperElement = () => {
  customElements.define("tapsi-badge-wrapper", BadgeWrapper);

  return {
    Slots,
    tagName: "tapsi-badge-wrapper",
    elementClass: BadgeWrapper,
  } as const satisfies RegisteredCustomElement;
};
