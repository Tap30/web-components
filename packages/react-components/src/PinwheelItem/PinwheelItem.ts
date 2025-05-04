import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import { PinwheelItem as PinwheelItemElement } from "@tapsioss/web-components";

if (typeof window !== "undefined" && !customElements.get("tapsi-pinwheel")) {
  /* eslint-disable no-console */
  console.warn(
    "[TAPSI][PinwheelItem]: The `tapsi-pinwheel` tag is not registered. Since `PinwheelItem` is a compound component, it should be wrapped inside `Pinwheel` component.",
  );
  /* eslint-enable no-console */
}

export const PinwheelItem: ReactWebComponent<PinwheelItemElement> =
  createComponent({
    tagName: "tapsi-pinwheel-item",
    elementClass: PinwheelItemElement,
    react: React,
    events: {},
  });
