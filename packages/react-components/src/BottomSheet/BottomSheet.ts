import * as LitReact from "@lit/react";
import * as React from "react";

import {
  BottomSheetClosedEvent,
  BottomSheetClosingEvent,
  BottomSheetHideEvent,
  BottomSheet as BottomSheetInput,
  BottomSheetOpenedEvent,
  BottomSheetOpeningEvent,
  BottomSheetShowEvent,
  BottomSheetSlots,
  BottomSheetSnappedEvent,
  registerBottomSheet,
} from "@tapsioss/web-components";

registerBottomSheet();

export const BottomSheet = LitReact.createComponent({
  tagName: "tapsi-bottom-sheet",
  elementClass: BottomSheetInput,
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
  BottomSheetInput,
  BottomSheetOpenedEvent,
  BottomSheetOpeningEvent,
  BottomSheetShowEvent,
  BottomSheetSlots,
  BottomSheetSnappedEvent,
};
