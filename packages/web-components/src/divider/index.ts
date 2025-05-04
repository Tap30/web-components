import { isSsr } from "../utils/index.ts";
import { Divider } from "./divider.ts";

export { Divider };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-divider")) return;

  customElements.define("tapsi-divider", Divider);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-divider": Divider;
  }
}
