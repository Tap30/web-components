import * as LitReact from "@lit/react";
import * as React from "react";

import {
  IconButton as IconButtonInput,
  IconButtonSlots,
  registerIconButton,
} from "@tapsioss/web-components";

registerIconButton();

export const IconButton = LitReact.createComponent({
  tagName: "tapsi-icon-button",
  elementClass: IconButtonInput,
  react: React,
  events: {},
});

export { IconButtonInput, IconButtonSlots };
