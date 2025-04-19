import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerTooltipElement,
  Tooltip as TooltipElementClass,
  TooltipHideEvent,
  TooltipShowEvent,
} from "@tapsioss/web-components";

registerTooltipElement();

const __Tooltip = LitReact.createComponent({
  tagName: "tapsi-tooltip",
  elementClass: TooltipElementClass,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<TooltipShowEvent>,
    onHide: "hide" as LitReact.EventName<TooltipHideEvent>,
  },
});

export { TooltipHideEvent, TooltipShowEvent };

const Tooltip = __Tooltip;

export { Tooltip };
