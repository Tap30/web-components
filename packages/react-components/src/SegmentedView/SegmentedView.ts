import * as LitReact from "@lit/react";
import * as React from "react";

/* START: AUTO-GENERATED [DO_NOT_REMOVE] */
import {
  registerSegmentedViewElement,
  SegmentedViewActiveChangeEvent,
  SegmentedView as SegmentedViewElementClass,
  SegmentedViewItemSlots,
  SegmentedViewSlots,
} from "@tapsioss/web-components";

registerSegmentedViewElement();

const __SegmentedView = LitReact.createComponent({
  tagName: "tapsi-segmented-view",
  elementClass: SegmentedViewElementClass,
  react: React,
  events: {
    onActiveChange:
      "activechange" as LitReact.EventName<SegmentedViewActiveChangeEvent>,
  },
});

export {
  SegmentedViewActiveChangeEvent,
  SegmentedViewItemSlots,
  SegmentedViewSlots,
};

/* END: AUTO-GENERATED [DO_NOT_REMOVE] */

const SegmentedView = __SegmentedView;

export { SegmentedView };
