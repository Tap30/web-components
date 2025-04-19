import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Avatar as AvatarElementClass,
  AvatarSlots,
  registerAvatarElement,
} from "@tapsioss/web-components";

registerAvatarElement();

const __Avatar = LitReact.createComponent({
  tagName: "tapsi-avatar",
  elementClass: AvatarElementClass,
  react: React,
  events: {},
});

export { AvatarSlots };

const Avatar = __Avatar;

export { Avatar };
