import * as LitReact from "@lit/react";
import * as React from "react";

import {
  IconButton as IconButtonElementClass,
  IconButtonSlots,
  registerIconButton,
} from "@tapsioss/web-components";

registerIconButton();

export const IconButton = LitReact.createComponent({
  tagName: "tapsi-icon-button",
  elementClass: IconButtonElementClass,
  react: React,
  events: {},
});

export { IconButtonSlots };
