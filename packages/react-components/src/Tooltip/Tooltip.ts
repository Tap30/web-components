import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerTooltip,
  Tooltip as TooltipElementClass,
  TooltipHideEvent,
  TooltipShowEvent,
} from "@tapsioss/web-components";

registerTooltip();

export const Tooltip = LitReact.createComponent({
  tagName: "tapsi-tooltip",
  elementClass: TooltipElementClass,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<TooltipShowEvent>,
    onHide: "hide" as LitReact.EventName<TooltipHideEvent>,
  },
});

export { TooltipElementClass, TooltipHideEvent, TooltipShowEvent };
