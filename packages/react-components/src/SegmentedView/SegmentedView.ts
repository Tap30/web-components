import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  registerSegmentedView,
  SegmentedViewActiveChangeEvent,
  SegmentedView as SegmentedViewElement,
  SegmentedViewItemSlots,
  SegmentedViewSlots,
} from "@tapsioss/web-components";

registerSegmentedView();

export const SegmentedView: ReactWebComponent<
  SegmentedViewElement,
  { onActiveChange: EventName<SegmentedViewActiveChangeEvent> }
> = createComponent({
  tagName: "tapsi-segmented-view",
  elementClass: SegmentedViewElement,
  react: React,
  events: {
    onActiveChange: "activechange" as EventName<SegmentedViewActiveChangeEvent>,
  },
});

export {
  SegmentedViewActiveChangeEvent,
  SegmentedViewElement,
  SegmentedViewItemSlots,
  SegmentedViewSlots,
};
