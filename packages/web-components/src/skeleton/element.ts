import type { RegisteredCustomElement } from "../internals/types.ts";
import { Slots } from "./constants.ts";
import { Skeleton } from "./skeleton.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-skeleton": Skeleton;
  }
}

export const registerSkeletonElement = () => {
  customElements.define("tapsi-skeleton", Skeleton);

  return {
    Slots,
    tagName: "tapsi-skeleton",
    elementClass: Skeleton,
  } as const satisfies RegisteredCustomElement;
};
