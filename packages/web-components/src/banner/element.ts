import type { RegisteredCustomElement } from "../internals/types.ts";
import { Banner } from "./banner.ts";
import { Slots } from "./constants.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-banner": Banner;
  }
}

export const registerBannerElement = () => {
  customElements.define("tapsi-banner", Banner);

  return {
    Slots,
    tagName: "tapsi-banner",
    elementClass: Banner,
  } as const satisfies RegisteredCustomElement;
};
