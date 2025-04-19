import * as LitReact from "@lit/react";
import * as React from "react";

import {
  IconButton as IconButtonElementClass,
  IconButtonSlots,
  registerIconButtonElement,
} from "@tapsioss/web-components";

registerIconButtonElement();

const __IconButton = LitReact.createComponent({
  tagName: "tapsi-icon-button",
  elementClass: IconButtonElementClass,
  react: React,
  events: {},
});

export { IconButtonSlots };

const IconButton = __IconButton;

export { IconButton };
