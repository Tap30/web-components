import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  PinInputCompleteEvent,
  PinInput as PinInputElement,
  registerPinInput,
} from "@tapsioss/web-components";

registerPinInput();

export const PinInput: ReactWebComponent<
  PinInputElement,
  {
    onComplete: EventName<PinInputCompleteEvent>;
    onChange: string;
    onInput: string;
  }
> = createComponent({
  tagName: "tapsi-pin-input",
  elementClass: PinInputElement,
  react: React,
  events: {
    onComplete: "complete" as EventName<PinInputCompleteEvent>,
    onChange: "input",
    onInput: "input",
  },
});

export { PinInputCompleteEvent, PinInputElement };
