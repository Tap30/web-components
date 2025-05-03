import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  Switch as SwitchElement,
  registerSwitch,
} from "@tapsioss/web-components";

registerSwitch();

export const Switch: ReactWebComponent<
  SwitchElement,
  { onChange: string; onInput: string }
> = createComponent({
  tagName: "tapsi-switch",
  elementClass: SwitchElement,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export { SwitchElement };
