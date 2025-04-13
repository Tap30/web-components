import type { RegisteredCustomElement } from "../internals/types.ts";
import { BottomSheet } from "./bottom-sheet.ts";
import { Slots } from "./constants.ts";
import {
  ClosedEvent,
  ClosingEvent,
  HideEvent,
  OpenedEvent,
  OpeningEvent,
  ShowEvent,
  SnappedEvent,
} from "./events.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-sheet": BottomSheet;
  }
}

export const registerBottomSheetElement = () => {
  customElements.define("tapsi-bottom-sheet", BottomSheet);

  return {
    Slots,
    eventsMap: {
      [ClosedEvent.type]: ClosedEvent,
      [ClosingEvent.type]: ClosingEvent,
      [ShowEvent.type]: ShowEvent,
      [HideEvent.type]: HideEvent,
      [OpenedEvent.type]: OpenedEvent,
      [OpeningEvent.type]: OpeningEvent,
      [SnappedEvent.type]: SnappedEvent,
    },
    tagName: "tapsi-bottom-sheet",
    elementClass: BottomSheet,
  } as const satisfies RegisteredCustomElement;
};
