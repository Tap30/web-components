import { registerAvatarElement } from "./avatar/element.ts";
import { registerBadgeWrapperElement } from "./badge-wrapper/element.ts";
import { registerBadgeElement } from "./badge/element.ts";
import { registerBannerElement } from "./banner/element.ts";
import { registerBottomNavigationElement } from "./bottom-navigation/element.ts";
import { registerBottomNavigationItemElement } from "./bottom-navigation/item/element.ts";
import { registerBottomSheetElement } from "./bottom-sheet/element.ts";
import { registerButtonGroupElement } from "./button-group/element.ts";
import { registerIconButtonElement } from "./button/icon-button/element.ts";
import { registerButtonElement } from "./button/standard/element.ts";
import { registerChatBubbleInElement } from "./chat-bubble/in/element.ts";
import { registerChatBubbleOutElement } from "./chat-bubble/out/element.ts";
import { registerCheckboxElement } from "./checkbox/element.ts";
import { registerChipGroupElement } from "./chip-group/element.ts";
import { registerChipElement } from "./chip/element.ts";
import { registerDividerElement } from "./divider/element.ts";
import { registerEmptyStateElement } from "./empty-state/element.ts";
import { registerModalElement } from "./modal/element.ts";
import { registerNoticeElement } from "./notice/element.ts";
import { registerProgressIndicatorElement } from "./progress-indicator/element.ts";
import { registerSegmentedViewElement } from "./segmented-view/element.ts";
import { registerSegmentedViewItemElement } from "./segmented-view/item/element.ts";
import { registerSkeletonElement } from "./skeleton/element.ts";
import { registerSnackbarElement } from "./snackbar/element.ts";
import { registerSpinnerElement } from "./spinner/element.ts";
import { registerTooltipElement } from "./tooltip/element.ts";

const registerAllElements = () => ({
  avatar: registerAvatarElement(),
  badge: registerBadgeElement(),
  "badge-wrapper": registerBadgeWrapperElement(),
  banner: registerBannerElement(),
  "bottom-navigation": registerBottomNavigationElement(),
  "bottom-navigation-item": registerBottomNavigationItemElement(),
  "bottom-sheet": registerBottomSheetElement(),
  "empty-state": registerEmptyStateElement(),
  divider: registerDividerElement(),
  "icon-button": registerIconButtonElement(),
  button: registerButtonElement(),
  "button-group": registerButtonGroupElement(),
  "chat-bubble-in": registerChatBubbleInElement(),
  "chat-bubble-out": registerChatBubbleOutElement(),
  checkbox: registerCheckboxElement(),
  chip: registerChipElement(),
  "chip-group": registerChipGroupElement(),
  modal: registerModalElement(),
  notice: registerNoticeElement(),
  "progress-indicator": registerProgressIndicatorElement(),
  "segmented-view": registerSegmentedViewElement(),
  "segmented-view-item": registerSegmentedViewItemElement(),
  skeleton: registerSkeletonElement(),
  snackbar: registerSnackbarElement(),
  spinner: registerSpinnerElement(),
  tooltip: registerTooltipElement(),
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
  registerDividerElement,
  registerEmptyStateElement,
  registerIconButtonElement,
  registerModalElement,
  registerNoticeElement,
  registerProgressIndicatorElement,
  registerSegmentedViewElement,
  registerSegmentedViewItemElement,
  registerSkeletonElement,
  registerSnackbarElement,
  registerSpinnerElement,
  registerTooltipElement,
};
