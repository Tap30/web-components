import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Pinwheel as PinwheelElementClass,
  PinwheelItemSlots,
  PinwheelSlots,
  registerPinwheelElement,
} from "@tapsioss/web-components";

registerPinwheelElement();

const __Pinwheel = LitReact.createComponent({
  tagName: "tapsi-pinwheel",
  elementClass: PinwheelElementClass,
  react: React,
  events: {},
});

export { PinwheelItemSlots, PinwheelSlots };

const Pinwheel = __Pinwheel;

export { Pinwheel };
