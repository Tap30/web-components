import * as LitReact from "@lit/react";
import * as React from "react";

import {
  EmptyState as EmptyStateInput,
  EmptyStateSlots,
  registerEmptyState,
} from "@tapsioss/web-components";

registerEmptyState();

export const EmptyState = LitReact.createComponent({
  tagName: "tapsi-empty-state",
  elementClass: EmptyStateInput,
  react: React,
  events: {},
});

export { EmptyStateInput, EmptyStateSlots };
