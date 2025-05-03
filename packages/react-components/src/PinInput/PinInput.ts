import * as LitReact from "@lit/react";
import * as React from "react";

import {
  PinInputCompleteEvent,
  PinInput as PinInputInput,
  registerPinInput,
} from "@tapsioss/web-components";

registerPinInput();

export const PinInput = LitReact.createComponent({
  tagName: "tapsi-pin-input",
  elementClass: PinInputInput,
  react: React,
  events: {
    onComplete: "complete" as LitReact.EventName<PinInputCompleteEvent>,
    onChange: "input",
    onInput: "input",
  },
});

export { PinInputCompleteEvent, PinInputInput };
