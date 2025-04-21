import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Pinwheel as PinwheelElementClass,
  PinwheelItemSlots,
  PinwheelSlots,
  registerPinwheel,
} from "@tapsioss/web-components";

registerPinwheel();

const __Pinwheel = LitReact.createComponent({
  tagName: "tapsi-pinwheel",
  elementClass: PinwheelElementClass,
  react: React,
  events: {},
});

export { PinwheelItemSlots, PinwheelSlots };

const Pinwheel = __Pinwheel;

export { Pinwheel };
