import { register as registerAvatarElement } from "./avatar/index.ts";
import { register as registerBadgeWrapperElement } from "./badge-wrapper/index.ts";
import { register as registerBadgeElement } from "./badge/index.ts";
import { register as registerBannerElement } from "./banner/index.ts";
import { register as registerBottomNavigationElement } from "./bottom-navigation/index.ts";
import { register as registerBottomNavigationItemElement } from "./bottom-navigation/item/index.ts";
import { register as registerBottomSheetElement } from "./bottom-sheet/index.ts";
import { register as registerButtonGroupElement } from "./button-group/index.ts";
import { register as registerIconButtonElement } from "./button/icon-button/index.ts";
import { register as registerButtonElement } from "./button/standard/index.ts";
import { register as registerChatBubbleInElement } from "./chat-bubble/in/index.ts";
import { register as registerChatBubbleOutElement } from "./chat-bubble/out/index.ts";
import { register as registerCheckboxElement } from "./checkbox/index.ts";
import { register as registerChipGroupElement } from "./chip-group/index.ts";
import { register as registerChipElement } from "./chip/index.ts";
import { register as registerDividerElement } from "./divider/index.ts";
import { register as registerEmptyStateElement } from "./empty-state/index.ts";
import { register as registerFileInputElement } from "./file-input/index.ts";
import { register as registerModalElement } from "./modal/index.ts";
import { register as registerNoticeElement } from "./notice/index.ts";
import { register as registerPinInputElement } from "./pin-input/index.ts";
import { register as registerPinwheelGroupElement } from "./pinwheel-group/index.ts";
import { register as registerPinwheelElement } from "./pinwheel/index.ts";
import { register as registerPinwheelItemElement } from "./pinwheel/item/index.ts";
import { register as registerProgressIndicatorElement } from "./progress-indicator/index.ts";
import { register as registerRadioElement } from "./radio/index.ts";
import { register as registerRateSliderElement } from "./rate-slider/index.ts";
import { register as registerSegmentedViewElement } from "./segmented-view/index.ts";
import { register as registerSegmentedViewItemElement } from "./segmented-view/item/index.ts";
import { register as registerSkeletonElement } from "./skeleton/index.ts";
import { register as registerSnackbarElement } from "./snackbar/index.ts";
import { register as registerSpinnerElement } from "./spinner/index.ts";
import { register as registerStepperElement } from "./stepper/index.ts";
import { register as registerSwitchElement } from "./switch/index.ts";
import { register as registerTextAreaElement } from "./text-area/index.ts";
import { register as registerTextFieldElement } from "./text-field/index.ts";
import { register as registerTooltipElement } from "./tooltip/index.ts";

export { Avatar, Slots as AvatarSlot } from "./avatar/index.ts";
export { Badge, Slots as BadgeSlots } from "./badge/index.ts";
export { Banner, Slots as BannerSlots } from "./banner/index.ts";
export {
  BottomNavigation,
  ActiveChangeEvent as BottomNavigationActiveChangeEvent,
  Slots as BottomNavigationSlots,
} from "./bottom-navigation/index.ts";
export {
  BottomNavigationItem,
  ActivateEvent as BottomNavigationItemActivateEvent,
  Slots as BottomNavigationItemSlots,
} from "./bottom-navigation/item/index.ts";
export {
  BottomSheet,
  ClosedEvent as BottomSheetClosedEvent,
  ClosingEvent as BottomSheetClosingEvent,
  HideEvent as BottomSheetHideEvent,
  OpenedEvent as BottomSheetOpenedEvent,
  OpeningEvent as BottomSheetOpeningEvent,
  ShowEvent as BottomSheetShowEvent,
  Slots as BottomSheetSlots,
  SnappedEvent as BottomSheetSnappedEvent,
} from "./bottom-sheet/index.ts";
export {
  ButtonGroup,
  Slots as ButtonGroupSlots,
} from "./button-group/index.ts";
export {
  IconButton,
  Slots as IconButtonSlots,
} from "./button/icon-button/index.ts";
export { Button, Slots as ButtonSlots } from "./button/standard/index.ts";
export { ChatBubbleIn } from "./chat-bubble/in/index.ts";
export { ChatBubbleOut } from "./chat-bubble/out/index.ts";
export { Checkbox } from "./checkbox/index.ts";
export {
  ChipGroup,
  SelectChangeEvent as ChipGroupSelectChangeEvent,
  Slots as ChipGroupSlots,
} from "./chip-group/index.ts";
export {
  Chip,
  DeselectEvent as ChipDeselectEvent,
  SelectEvent as ChipSelectEvent,
  Slots as ChipSlots,
} from "./chip/index.ts";
export { Divider } from "./divider/index.ts";
export { EmptyState, Slots as EmptyStateSlots } from "./empty-state/index.ts";
export {
  FileInput,
  RetryEvent as FileInputRetryEvent,
  Slots as FileInputSlots,
} from "./file-input/index.ts";
export {
  Modal,
  HideEvent as ModalHideEvent,
  ShowEvent as ModalShowEvent,
  Slots as ModalSlots,
} from "./modal/index.ts";
export {
  Notice,
  HideEvent as NoticeHideEvent,
  ShowEvent as NoticeShowEvent,
  Slots as NoticeSlots,
} from "./notice/index.ts";
export {
  PinInput,
  CompleteEvent as PinInputCompleteEvent,
} from "./pin-input/index.ts";
export {
  PinwheelGroup,
  Slots as PinwheelGroupSlots,
} from "./pinwheel-group/index.ts";
export { Pinwheel, Slots as PinwheelSlots } from "./pinwheel/index.ts";
export {
  PinwheelItem,
  Slots as PinwheelItemSlots,
} from "./pinwheel/item/index.ts";
export { ProgressIndicator } from "./progress-indicator/index.ts";
export { Radio } from "./radio/index.ts";
export { RateSlider } from "./rate-slider/index.ts";
export {
  SegmentedView,
  ActiveChangeEvent as SegmentedViewActiveChangeEvent,
  Slots as SegmentedViewSlots,
} from "./segmented-view/index.ts";
export {
  SegmentedViewItem,
  ActivateEvent as SegmentedViewItemActivateEvent,
  Slots as SegmentedViewItemSlots,
} from "./segmented-view/item/index.ts";
export { Skeleton, Slots as SkeletonSlots } from "./skeleton/index.ts";
export {
  Snackbar,
  HideEvent as SnackbarHideEvent,
  ShowEvent as SnackbarShowEvent,
  Slots as SnackbarSlots,
} from "./snackbar/index.ts";
export { Spinner } from "./spinner/index.ts";
export { Stepper } from "./stepper/index.ts";
export { Switch } from "./switch/index.ts";
export { TextArea, Slots as TextAreaSlots } from "./text-area/index.ts";
export { TextField, Slots as TextFieldSlots } from "./text-field/index.ts";
export {
  Tooltip,
  HideEvent as TooltipHideEvent,
  ShowEvent as TooltipShowEvent,
} from "./tooltip/index.ts";

const registerAllElements = () => {
  registerAvatarElement();
  registerBadgeElement();
  registerBadgeWrapperElement();
  registerBannerElement();
  registerBottomNavigationElement();
  registerBottomNavigationItemElement();
  registerBottomSheetElement();
  registerButtonElement();
  registerButtonGroupElement();
  registerChatBubbleInElement();
  registerChatBubbleOutElement();
  registerCheckboxElement();
  registerChipElement();
  registerChipGroupElement();
  registerDividerElement();
  registerEmptyStateElement();
  registerFileInputElement();
  registerIconButtonElement();
  registerModalElement();
  registerNoticeElement();
  registerPinInputElement();
  registerPinwheelElement();
  registerPinwheelGroupElement();
  registerPinwheelItemElement();
  registerProgressIndicatorElement();
  registerRadioElement();
  registerRateSliderElement();
  registerSegmentedViewElement();
  registerSegmentedViewItemElement();
  registerSkeletonElement();
  registerSnackbarElement();
  registerSpinnerElement();
  registerStepperElement();
  registerSwitchElement();
  registerTextAreaElement();
  registerTextFieldElement();
  registerTooltipElement();
};

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
  registerFileInputElement,
  registerIconButtonElement,
  registerModalElement,
  registerNoticeElement,
  registerPinInputElement,
  registerPinwheelElement,
  registerPinwheelGroupElement,
  registerPinwheelItemElement,
  registerProgressIndicatorElement,
  registerRadioElement,
  registerRateSliderElement,
  registerSegmentedViewElement,
  registerSegmentedViewItemElement,
  registerSkeletonElement,
  registerSnackbarElement,
  registerSpinnerElement,
  registerStepperElement,
  registerSwitchElement,
  registerTextAreaElement,
  registerTextFieldElement,
  registerTooltipElement,
};
