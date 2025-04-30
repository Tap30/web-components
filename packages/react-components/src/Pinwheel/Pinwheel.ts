import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Pinwheel as PinwheelElementClass,
  PinwheelItemSlots,
  PinwheelSlots,
  registerPinwheel,
} from "@tapsioss/web-components";

registerPinwheel();

export const Pinwheel = LitReact.createComponent({
  tagName: "tapsi-pinwheel",
  elementClass: PinwheelElementClass,
  react: React,
  events: { onChange: "change", onInput: "change" },
});

export { PinwheelElementClass, PinwheelItemSlots, PinwheelSlots };
