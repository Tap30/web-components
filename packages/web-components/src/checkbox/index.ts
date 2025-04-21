import { isSsr } from "../utils/index.ts";
import { Checkbox } from "./checkbox.ts";

export { Checkbox };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-checkbox", Checkbox);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-checkbox": Checkbox;
  }
}
