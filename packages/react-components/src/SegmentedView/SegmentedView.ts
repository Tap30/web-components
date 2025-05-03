import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerSegmentedView,
  SegmentedViewActiveChangeEvent,
  SegmentedView as SegmentedViewInput,
  SegmentedViewItemSlots,
  SegmentedViewSlots,
} from "@tapsioss/web-components";

registerSegmentedView();

export const SegmentedView = LitReact.createComponent({
  tagName: "tapsi-segmented-view",
  elementClass: SegmentedViewInput,
  react: React,
  events: {
    onActiveChange:
      "activechange" as LitReact.EventName<SegmentedViewActiveChangeEvent>,
  },
});

export {
  SegmentedViewActiveChangeEvent,
  SegmentedViewInput,
  SegmentedViewItemSlots,
  SegmentedViewSlots,
};
