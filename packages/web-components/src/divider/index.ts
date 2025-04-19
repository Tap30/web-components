import { Divider } from "./divider.ts";

export { Divider };

export const register = () => {
  customElements.define("tapsi-divider", Divider);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-divider": Divider;
  }
}
