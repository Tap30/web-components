import { Checkbox } from "./checkbox.ts";

export { Checkbox };

export const register = () => {
  customElements.define("tapsi-checkbox", Checkbox);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-checkbox": Checkbox;
  }
}
