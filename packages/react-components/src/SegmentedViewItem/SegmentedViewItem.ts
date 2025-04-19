import * as LitReact from "@lit/react";
import * as React from "react";

import { SegmentedViewItem as SegmentedViewItemElementClass } from "@tapsioss/web-components";

if (
  typeof window !== "undefined" &&
  !customElements.get("tapsi-segmented-view")
)
  console.warn(
    "[TAPSI][SegmentedViewItem]: The `tapsi-segmented-view` tag is not registered. Since `SegmentedViewItem` is a compound component, it should be wrapped inside `SegmentedView` component.",
  );

const __SegmentedViewItem = LitReact.createComponent({
  tagName: "tapsi-segmented-view-item",
  elementClass: SegmentedViewItemElementClass,
  react: React,
  events: {},
});

const SegmentedViewItem = __SegmentedViewItem;

export { SegmentedViewItem };
