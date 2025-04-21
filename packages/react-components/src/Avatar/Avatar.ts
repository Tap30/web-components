import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Avatar as AvatarElementClass,
  AvatarSlots,
  registerAvatar,
} from "@tapsioss/web-components";

registerAvatar();

const __Avatar = LitReact.createComponent({
  tagName: "tapsi-avatar",
  elementClass: AvatarElementClass,
  react: React,
  events: {},
});

export { AvatarSlots };

const Avatar = __Avatar;

export { Avatar };
