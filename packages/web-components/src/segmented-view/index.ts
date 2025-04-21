import { isSsr } from "../utils/index.ts";
import { SegmentedViewItem } from "./item/item.ts";
import { SegmentedView } from "./segmented-view.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { Slots as ItemSlots } from "./item/index.ts";
export { SegmentedView, SegmentedViewItem };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-segmented-view", SegmentedView);
  customElements.define("tapsi-segmented-view-item", SegmentedViewItem);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-segmented-view": SegmentedView;
    "tapsi-segmented-view-item": SegmentedViewItem;
  }
}
