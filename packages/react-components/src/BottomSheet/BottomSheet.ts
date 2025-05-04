import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  BottomSheetClosedEvent,
  BottomSheetClosingEvent,
  BottomSheet as BottomSheetElement,
  BottomSheetHideEvent,
  BottomSheetOpenedEvent,
  BottomSheetOpeningEvent,
  BottomSheetShowEvent,
  BottomSheetSlots,
  BottomSheetSnappedEvent,
  registerBottomSheet,
} from "@tapsioss/web-components";

registerBottomSheet();

export const BottomSheet: ReactWebComponent<
  BottomSheetElement,
  {
    onSnapped: EventName<BottomSheetSnappedEvent>;
    onOpening: EventName<BottomSheetOpeningEvent>;
    onClosing: EventName<BottomSheetClosingEvent>;
    onOpened: EventName<BottomSheetOpenedEvent>;
    onClosed: EventName<BottomSheetClosedEvent>;
    onHide: EventName<BottomSheetHideEvent>;
    onShow: EventName<BottomSheetShowEvent>;
  }
> = createComponent({
  tagName: "tapsi-bottom-sheet",
  elementClass: BottomSheetElement,
  react: React,
  events: {
    onSnapped: "snapped" as EventName<BottomSheetSnappedEvent>,
    onOpening: "opening" as EventName<BottomSheetOpeningEvent>,
    onClosing: "closing" as EventName<BottomSheetClosingEvent>,
    onOpened: "opened" as EventName<BottomSheetOpenedEvent>,
    onClosed: "closed" as EventName<BottomSheetClosedEvent>,
    onHide: "hide" as EventName<BottomSheetHideEvent>,
    onShow: "show" as EventName<BottomSheetShowEvent>,
  },
});

export {
  BottomSheetClosedEvent,
  BottomSheetClosingEvent,
  BottomSheetElement,
  BottomSheetHideEvent,
  BottomSheetOpenedEvent,
  BottomSheetOpeningEvent,
  BottomSheetShowEvent,
  BottomSheetSlots,
  BottomSheetSnappedEvent,
};
