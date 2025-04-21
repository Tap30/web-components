import { isSsr } from "../utils/index.ts";
import { Tooltip } from "./tooltip.ts";

export * from "./events.ts";
export { Tooltip };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-tooltip", Tooltip);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-tooltip": Tooltip;
  }
}
