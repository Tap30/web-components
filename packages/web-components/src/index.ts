import { registerBottomSheetElement } from "@tapsioss/web-components/bottom-sheet/element";
import { registerEmptyStateElement } from "@tapsioss/web-components/empty-state/element";
import { registerAvatarElement } from "./avatar/element.ts";
import { registerBadgeWrapperElement } from "./badge-wrapper/element.ts";
import { registerBadgeElement } from "./badge/element.ts";
import { registerBannerElement } from "./banner/element.ts";
import { registerBottomNavigationElement } from "./bottom-navigation/element.ts";
import { registerBottomNavigationItemElement } from "./bottom-navigation/item/element.ts";
import { registerButtonGroupElement } from "./button-group/element.ts";
import { registerIconButtonElement } from "./button/icon-button/element.ts";
import { registerButtonElement } from "./button/standard/element.ts";
import { registerChatBubbleInElement } from "./chat-bubble/in/element.ts";
import { registerChatBubbleOutElement } from "./chat-bubble/out/element.ts";
import { registerCheckboxElement } from "./checkbox/element.ts";
import { registerChipGroupElement } from "./chip-group/element.ts";
import { registerChipElement } from "./chip/element.ts";

const registerAllElements = () => ({
  avatar: registerAvatarElement(),
  badge: registerBadgeElement(),
  "badge-wrapper": registerBadgeWrapperElement(),
  banner: registerBannerElement(),
  "bottom-navigation": registerBottomNavigationElement(),
  "bottom-navigation-item": registerBottomNavigationItemElement(),
  "bottom-sheet": registerBottomSheetElement(),
  "empty-state": registerEmptyStateElement(),
  "icon-button": registerIconButtonElement(),
  button: registerButtonElement(),
  "button-group": registerButtonGroupElement(),
  "chat-bubble-in": registerChatBubbleInElement(),
  "chat-bubble-out": registerChatBubbleOutElement(),
  checkbox: registerCheckboxElement(),
  chip: registerChipElement(),
  "chip-group": registerChipGroupElement(),
});

export {
  registerAllElements,
  registerAvatarElement,
  registerBadgeElement,
  registerBadgeWrapperElement,
  registerBannerElement,
  registerBottomNavigationElement,
  registerBottomNavigationItemElement,
  registerBottomSheetElement,
  registerButtonElement,
  registerButtonGroupElement,
  registerChatBubbleInElement,
  registerChatBubbleOutElement,
  registerCheckboxElement,
  registerChipElement,
  registerChipGroupElement,
  registerEmptyStateElement,
  registerIconButtonElement,
};
