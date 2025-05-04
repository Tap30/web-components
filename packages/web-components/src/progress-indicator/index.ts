import { isSsr } from "../utils/index.ts";
import { ProgressIndicator } from "./progress-indicator.ts";

export { ProgressIndicator };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-progress-indicator")) return;

  customElements.define("tapsi-progress-indicator", ProgressIndicator);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-progress-indicator": ProgressIndicator;
  }
}
