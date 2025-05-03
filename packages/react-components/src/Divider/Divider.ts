import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Divider as DividerInput,
  registerDivider,
} from "@tapsioss/web-components";

registerDivider();

export const Divider = LitReact.createComponent({
  tagName: "tapsi-divider",
  elementClass: DividerInput,
  react: React,
  events: {},
});
