import * as LitReact from "@lit/react";
import * as React from "react";

import {
  EmptyState as EmptyStateElementClass,
  EmptyStateSlots,
  registerEmptyStateElement,
} from "@tapsioss/web-components";

registerEmptyStateElement();

const __EmptyState = LitReact.createComponent({
  tagName: "tapsi-empty-state",
  elementClass: EmptyStateElementClass,
  react: React,
  events: {},
});

export { EmptyStateSlots };

const EmptyState = __EmptyState;

export { EmptyState };
