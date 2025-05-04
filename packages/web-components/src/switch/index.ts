import { isSsr } from "../utils/index.ts";
import { Switch } from "./switch.ts";

export { Switch };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-switch")) return;

  customElements.define("tapsi-switch", Switch);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-switch": Switch;
  }
}
