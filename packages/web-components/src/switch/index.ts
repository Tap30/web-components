import { Switch } from "./switch.ts";

export { Switch };

export const register = () => {
  customElements.define("tapsi-switch", Switch);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-switch": Switch;
  }
}
