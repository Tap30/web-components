import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Avatar as AvatarInput,
  AvatarSlots,
  registerAvatar,
} from "@tapsioss/web-components";

registerAvatar();

export const Avatar = LitReact.createComponent({
  tagName: "tapsi-avatar",
  elementClass: AvatarInput,
  react: React,
  events: {},
});

export { AvatarInput, AvatarSlots };
