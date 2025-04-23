import * as LitReact from "@lit/react";
import * as React from "react";

import {
  EmptyState as EmptyStateElementClass,
  EmptyStateSlots,
  registerEmptyState,
} from "@tapsioss/web-components";

registerEmptyState();

export const EmptyState = LitReact.createComponent({
  tagName: "tapsi-empty-state",
  elementClass: EmptyStateElementClass,
  react: React,
  events: {},
});

export { EmptyStateSlots };
