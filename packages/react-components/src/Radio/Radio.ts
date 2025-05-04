import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import { Radio as RadioElement, registerRadio } from "@tapsioss/web-components";

registerRadio();

export const Radio: ReactWebComponent<
  RadioElement,
  { onChange: string; onInput: string }
> = createComponent({
  tagName: "tapsi-radio",
  elementClass: RadioElement,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export { RadioElement };
