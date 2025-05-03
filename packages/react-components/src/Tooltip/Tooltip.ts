import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerTooltip,
  TooltipHideEvent,
  Tooltip as TooltipInput,
  TooltipShowEvent,
} from "@tapsioss/web-components";

registerTooltip();

export const Tooltip = LitReact.createComponent({
  tagName: "tapsi-tooltip",
  elementClass: TooltipInput,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<TooltipShowEvent>,
    onHide: "hide" as LitReact.EventName<TooltipHideEvent>,
  },
});

export { TooltipHideEvent, TooltipInput, TooltipShowEvent };
