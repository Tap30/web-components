import { ProgressIndicator } from "./progress-indicator.ts";

export { ProgressIndicator };

export const register = () => {
  customElements.define("tapsi-progress-indicator", ProgressIndicator);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-progress-indicator": ProgressIndicator;
  }
}
