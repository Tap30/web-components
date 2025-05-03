import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import { SegmentedViewItem as SegmentedViewItemElement } from "@tapsioss/web-components";

if (
  typeof window !== "undefined" &&
  !customElements.get("tapsi-segmented-view")
) {
  /* eslint-disable no-console */
  console.warn(
    "[TAPSI][SegmentedViewItem]: The `tapsi-segmented-view` tag is not registered. Since `SegmentedViewItem` is a compound component, it should be wrapped inside `SegmentedView` component.",
  );
  /* eslint-enable no-console */
}

export const SegmentedViewItem: ReactWebComponent<SegmentedViewItemElement> =
  createComponent({
    tagName: "tapsi-segmented-view-item",
    elementClass: SegmentedViewItemElement,
    react: React,
    events: {},
  });
