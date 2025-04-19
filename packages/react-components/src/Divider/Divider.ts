import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Divider as DividerElementClass,
  registerDividerElement,
} from "@tapsioss/web-components";

registerDividerElement();

const __Divider = LitReact.createComponent({
  tagName: "tapsi-divider",
  elementClass: DividerElementClass,
  react: React,
  events: {},
});

const Divider = __Divider;

export { Divider };
