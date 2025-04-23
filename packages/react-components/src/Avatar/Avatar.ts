import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Avatar as AvatarElementClass,
  AvatarSlots,
  registerAvatar,
} from "@tapsioss/web-components";

registerAvatar();

export const Avatar = LitReact.createComponent({
  tagName: "tapsi-avatar",
  elementClass: AvatarElementClass,
  react: React,
  events: {},
});

export { AvatarSlots };
