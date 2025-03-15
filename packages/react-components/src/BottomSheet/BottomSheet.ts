import * as LitReact from "@lit/react";
import * as ComponentNamespace from "@tapsioss/web-components/bottom-sheet";
import * as React from "react";

/* START: AUTO-GENERATED [DO_NOT_REMOVE] */
const __BottomSheet = LitReact.createComponent({
  tagName: "tapsi-bottom-sheet",
  elementClass: ComponentNamespace.TapsiBottomSheet,
  react: React,
  events: {
    onSnapped: "snapped" as LitReact.EventName<ComponentNamespace.SnappedEvent>,
    onOpening: "opening" as LitReact.EventName<ComponentNamespace.OpeningEvent>,
    onClosing: "closing" as LitReact.EventName<ComponentNamespace.ClosingEvent>,
    onOpened: "opened" as LitReact.EventName<ComponentNamespace.OpenedEvent>,
    onClosed: "closed" as LitReact.EventName<ComponentNamespace.ClosedEvent>,
    onHide: "hide" as LitReact.EventName<ComponentNamespace.HideEvent>,
    onShow: "show" as LitReact.EventName<ComponentNamespace.ShowEvent>,
  },
});

export {
  ClosedEvent,
  ClosingEvent,
  HideEvent,
  OpenedEvent,
  OpeningEvent,
  ShowEvent,
  Slots,
  SnappedEvent,
} from "@tapsioss/web-components/bottom-sheet";

/* END: AUTO-GENERATED [DO_NOT_REMOVE] */

const BottomSheet = __BottomSheet;

export { BottomSheet };
