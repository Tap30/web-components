import { isSsr } from "../utils/index.ts";
import { SegmentedViewItem } from "./item/item.ts";
import { SegmentedView } from "./segmented-view.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { Slots as ItemSlots } from "./item/index.ts";
export { SegmentedView, SegmentedViewItem };

export const register = () => {
  if (isSsr()) return;

  if (!customElements.get("tapsi-segmented-view")) {
    customElements.define("tapsi-segmented-view", SegmentedView);
  }

  if (!customElements.get("tapsi-segmented-view-item")) {
    customElements.define("tapsi-segmented-view-item", SegmentedViewItem);
  }
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-segmented-view": SegmentedView;
    "tapsi-segmented-view-item": SegmentedViewItem;
  }
}
