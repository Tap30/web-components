import * as LitReact from "@lit/react";
import * as React from "react";

import {
  PinwheelGroup as PinwheelGroupElementClass,
  PinwheelGroupSlots,
  registerPinwheelGroupElement,
} from "@tapsioss/web-components";

registerPinwheelGroupElement();

const __PinwheelGroup = LitReact.createComponent({
  tagName: "tapsi-pinwheel-group",
  elementClass: PinwheelGroupElementClass,
  react: React,
  events: {},
});

export { PinwheelGroupSlots };

const PinwheelGroup = __PinwheelGroup;

export { PinwheelGroup };
