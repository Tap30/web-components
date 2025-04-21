import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Switch as SwitchElementClass,
  registerSwitch,
} from "@tapsioss/web-components";

registerSwitch();

const __Switch = LitReact.createComponent({
  tagName: "tapsi-switch",
  elementClass: SwitchElementClass,
  react: React,
  events: {},
});

const Switch = __Switch;

export { Switch };
