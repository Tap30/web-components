import * as LitReact from "@lit/react";
import * as React from "react";

import {
  BottomSheetClosedEvent,
  BottomSheetClosingEvent,
  BottomSheet as BottomSheetElementClass,
  BottomSheetHideEvent,
  BottomSheetOpenedEvent,
  BottomSheetOpeningEvent,
  BottomSheetShowEvent,
  BottomSheetSlots,
  BottomSheetSnappedEvent,
  registerBottomSheetElement,
} from "@tapsioss/web-components";

registerBottomSheetElement();

const __BottomSheet = LitReact.createComponent({
  tagName: "tapsi-bottom-sheet",
  elementClass: BottomSheetElementClass,
  react: React,
  events: {
    onSnapped: "snapped" as LitReact.EventName<BottomSheetSnappedEvent>,
    onOpening: "opening" as LitReact.EventName<BottomSheetOpeningEvent>,
    onClosing: "closing" as LitReact.EventName<BottomSheetClosingEvent>,
    onOpened: "opened" as LitReact.EventName<BottomSheetOpenedEvent>,
    onClosed: "closed" as LitReact.EventName<BottomSheetClosedEvent>,
    onHide: "hide" as LitReact.EventName<BottomSheetHideEvent>,
    onShow: "show" as LitReact.EventName<BottomSheetShowEvent>,
  },
});

export {
  BottomSheetClosedEvent,
  BottomSheetClosingEvent,
  BottomSheetHideEvent,
  BottomSheetOpenedEvent,
  BottomSheetOpeningEvent,
  BottomSheetShowEvent,
  BottomSheetSlots,
  BottomSheetSnappedEvent,
};

const BottomSheet = __BottomSheet;

export { BottomSheet };
