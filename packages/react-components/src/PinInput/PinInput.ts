import * as LitReact from "@lit/react";
import * as React from "react";

import {
  PinInputCompleteEvent,
  PinInput as PinInputElementClass,
  registerPinInputElement,
} from "@tapsioss/web-components";

registerPinInputElement();

const __PinInput = LitReact.createComponent({
  tagName: "tapsi-pin-input",
  elementClass: PinInputElementClass,
  react: React,
  events: {
    onComplete: "complete" as LitReact.EventName<PinInputCompleteEvent>,
  },
});

export { PinInputCompleteEvent };

const PinInput = __PinInput;

export { PinInput };
