import type { RegisteredCustomElement } from "../internals/types.ts";
import { Avatar } from "./avatar.ts";
import { Slots } from "./constants.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-avatar": Avatar;
  }
}

export const registerAvatarElement = () => {
  customElements.define("tapsi-avatar", Avatar);

  return {
    Slots,
    tagName: "tapsi-avatar",
    elementClass: Avatar,
  } as const satisfies RegisteredCustomElement;
};
