import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  PinwheelGroup as PinwheelGroupElement,
  PinwheelGroupSlots,
  registerPinwheelGroup,
} from "@tapsioss/web-components";

registerPinwheelGroup();

export const PinwheelGroup: ReactWebComponent<PinwheelGroupElement> =
  createComponent({
    tagName: "tapsi-pinwheel-group",
    elementClass: PinwheelGroupElement,
    react: React,
    events: {},
  });

export { PinwheelGroupElement, PinwheelGroupSlots };
