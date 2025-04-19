import { Button } from "./button.ts";

export { Slots } from "./constants.ts";
export { Button };

export const register = () => {
  customElements.define("tapsi-button", Button);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-button": Button;
  }
}
