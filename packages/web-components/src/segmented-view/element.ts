import type { RegisteredCustomElement } from "../internals/types.ts";
import { Slots } from "./constants.ts";
import { ActiveChangeEvent } from "./events.ts";
import { SegmentedView } from "./segmented-view.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-segmented-view": SegmentedView;
  }
}

export const registerSegmentedViewElement = () => {
  customElements.define("tapsi-segmented-view", SegmentedView);

  return {
    Slots,
    eventsMap: {
      [ActiveChangeEvent.type]: ActiveChangeEvent,
    },
    tagName: "tapsi-segmented-view",
    elementClass: SegmentedView,
  } as const satisfies RegisteredCustomElement;
};
