import { isSsr } from "../utils/index.ts";
import { Skeleton } from "./skeleton.ts";

export { Slots } from "./constants.ts";
export { Skeleton };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-skeleton", Skeleton);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-skeleton": Skeleton;
  }
}
