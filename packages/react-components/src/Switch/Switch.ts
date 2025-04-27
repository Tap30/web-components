import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Switch as SwitchElementClass,
  registerSwitch,
} from "@tapsioss/web-components";

registerSwitch();

export const Switch = LitReact.createComponent({
  tagName: "tapsi-switch",
  elementClass: SwitchElementClass,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export {};
