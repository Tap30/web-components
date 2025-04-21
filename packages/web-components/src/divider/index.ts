import { isSsr } from "../utils/index.ts";
import { Divider } from "./divider.ts";

export { Divider };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-divider", Divider);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-divider": Divider;
  }
}
