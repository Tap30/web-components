import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  Divider as DividerElement,
  registerDivider,
} from "@tapsioss/web-components";

registerDivider();

export const Divider: ReactWebComponent<DividerElement> = createComponent({
  tagName: "tapsi-divider",
  elementClass: DividerElement,
  react: React,
  events: {},
});
