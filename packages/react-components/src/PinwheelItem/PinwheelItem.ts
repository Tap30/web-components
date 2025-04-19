import * as LitReact from "@lit/react";
import * as React from "react";

import { PinwheelItem as PinwheelItemElementClass } from "@tapsioss/web-components";

if (typeof window !== "undefined" && !customElements.get("tapsi-pinwheel"))
  console.warn(
    "[TAPSI][PinwheelItem]: The `tapsi-pinwheel` tag is not registered. Since `PinwheelItem` is a compound component, it should be wrapped inside `Pinwheel` component.",
  );

const __PinwheelItem = LitReact.createComponent({
  tagName: "tapsi-pinwheel-item",
  elementClass: PinwheelItemElementClass,
  react: React,
  events: {},
});

const PinwheelItem = __PinwheelItem;

export { PinwheelItem };
