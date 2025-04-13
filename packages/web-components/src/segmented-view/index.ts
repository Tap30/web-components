import { SegmentedView } from "./segmented-view.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { SegmentedView };

export const register = () => {
  customElements.define("tapsi-segmented-view", SegmentedView);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-segmented-view": SegmentedView;
  }
}
