import { registerBadgeElement } from "@tapsioss/web-components/badge/element";
import { registerAvatarElement } from "./avatar/element.ts";

const registerAllElements = () => ({
  avatar: registerAvatarElement(),
  badge: registerBadgeElement(),
});

export { registerAllElements, registerAvatarElement, registerBadgeElement };
