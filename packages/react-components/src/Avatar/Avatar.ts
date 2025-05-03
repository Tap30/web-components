import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  Avatar as AvatarElement,
  AvatarSlots,
  registerAvatar,
} from "@tapsioss/web-components";

registerAvatar();

export const Avatar: ReactWebComponent<AvatarElement> = createComponent({
  tagName: "tapsi-avatar",
  elementClass: AvatarElement,
  react: React,
  events: {},
});

export { AvatarElement, AvatarSlots };
