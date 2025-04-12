import { registerBadgeWrapperElement } from "@tapsioss/web-components/badge-wrapper/element";
import { registerBadgeElement } from "@tapsioss/web-components/badge/element";
import { registerAvatarElement } from "./avatar/element.ts";

const registerAllElements = () => ({
  avatar: registerAvatarElement(),
  badge: registerBadgeElement(),
  "badge-wrapper": registerBadgeWrapperElement(),
});

export {
  registerAllElements,
  registerAvatarElement,
  registerBadgeElement,
  registerBadgeWrapperElement,
};
