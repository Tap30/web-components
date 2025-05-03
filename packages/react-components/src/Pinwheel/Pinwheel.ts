import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Pinwheel as PinwheelInput,
  PinwheelItemSlots,
  PinwheelSlots,
  registerPinwheel,
} from "@tapsioss/web-components";

registerPinwheel();

export const Pinwheel = LitReact.createComponent({
  tagName: "tapsi-pinwheel",
  elementClass: PinwheelInput,
  react: React,
  events: { onChange: "change", onInput: "change" },
});

export { PinwheelInput, PinwheelItemSlots, PinwheelSlots };
