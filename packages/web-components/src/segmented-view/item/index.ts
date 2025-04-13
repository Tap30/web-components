import { SegmentedViewItem } from "./item.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { SegmentedViewItem };

export const register = () => {
  customElements.define("tapsi-segmented-view-item", SegmentedViewItem);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-segmented-view-item": SegmentedViewItem;
  }
}
