import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  IconButton as IconButtonElement,
  IconButtonSlots,
  registerIconButton,
} from "@tapsioss/web-components";

registerIconButton();

export const IconButton: ReactWebComponent<IconButtonElement> = createComponent(
  {
    tagName: "tapsi-icon-button",
    elementClass: IconButtonElement,
    react: React,
    events: {},
  },
);

export { IconButtonElement, IconButtonSlots };
