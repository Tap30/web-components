import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  registerTooltip,
  Tooltip as TooltipElement,
  TooltipHideEvent,
  TooltipShowEvent,
} from "@tapsioss/web-components";

registerTooltip();

export const Tooltip: ReactWebComponent<
  TooltipElement,
  { onShow: EventName<TooltipShowEvent>; onHide: EventName<TooltipHideEvent> }
> = createComponent({
  tagName: "tapsi-tooltip",
  elementClass: TooltipElement,
  react: React,
  events: {
    onShow: "show" as EventName<TooltipShowEvent>,
    onHide: "hide" as EventName<TooltipHideEvent>,
  },
});

export { TooltipElement, TooltipHideEvent, TooltipShowEvent };
