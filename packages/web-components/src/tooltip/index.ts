import { isSsr } from "../utils/index.ts";
import { Tooltip } from "./tooltip.ts";

export * from "./events.ts";
export { Tooltip };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-tooltip")) return;

  customElements.define("tapsi-tooltip", Tooltip);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-tooltip": Tooltip;
  }
}
