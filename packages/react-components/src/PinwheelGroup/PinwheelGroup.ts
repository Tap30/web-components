import * as LitReact from "@lit/react";
import * as React from "react";

import {
  PinwheelGroup as PinwheelGroupInput,
  PinwheelGroupSlots,
  registerPinwheelGroup,
} from "@tapsioss/web-components";

registerPinwheelGroup();

export const PinwheelGroup = LitReact.createComponent({
  tagName: "tapsi-pinwheel-group",
  elementClass: PinwheelGroupInput,
  react: React,
  events: {},
});

export { PinwheelGroupInput, PinwheelGroupSlots };
