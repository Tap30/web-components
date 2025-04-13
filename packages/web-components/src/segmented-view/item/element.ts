import type { RegisteredCustomElement } from "../../internals/types.ts";
import { Slots } from "./constants.ts";
import { ActivateEvent } from "./events.ts";
import { SegmentedViewItem } from "./item.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-segmented-view-item": SegmentedViewItem;
  }
}

export const registerSegmentedViewItemElement = () => {
  customElements.define("tapsi-segmented-view-item", SegmentedViewItem);

  return {
    Slots,
    eventsMap: {
      [ActivateEvent.type]: ActivateEvent,
    },
    tagName: "tapsi-segmented-view-item",
    elementClass: SegmentedViewItem,
  } as const satisfies RegisteredCustomElement;
};
