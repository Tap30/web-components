import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  EmptyState as EmptyStateElement,
  EmptyStateSlots,
  registerEmptyState,
} from "@tapsioss/web-components";

registerEmptyState();

export const EmptyState: ReactWebComponent<EmptyStateElement> = createComponent(
  {
    tagName: "tapsi-empty-state",
    elementClass: EmptyStateElement,
    react: React,
    events: {},
  },
);

export { EmptyStateElement, EmptyStateSlots };
