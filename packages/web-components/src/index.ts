import {
  Avatar,
  Slots as AvatarSlots,
  register as registerAvatarElement,
} from "./avatar/index.ts";
import {
  BadgeWrapper,
  Slots as BadgeWrapperSlots,
  register as registerBadgeWrapperElement,
} from "./badge-wrapper/index.ts";
import {
  Badge,
  Slots as BadgeSlots,
  register as registerBadgeElement,
} from "./badge/index.ts";
import {
  Banner,
  Slots as BannerSlots,
  register as registerBannerElement,
} from "./banner/index.ts";
import {
  BottomNavigation,
  ActiveChangeEvent as BottomNavigationActiveChangeEvent,
  BottomNavigationItem,
  ItemSlots as BottomNavigationItemSlots,
  Slots as BottomNavigationSlots,
  register as registerBottomNavigationElement,
} from "./bottom-navigation/index.ts";
import {
  BottomSheet,
  ClosedEvent as BottomSheetClosedEvent,
  ClosingEvent as BottomSheetClosingEvent,
  HideEvent as BottomSheetHideEvent,
  OpenedEvent as BottomSheetOpenedEvent,
  OpeningEvent as BottomSheetOpeningEvent,
  ShowEvent as BottomSheetShowEvent,
  Slots as BottomSheetSlots,
  SnappedEvent as BottomSheetSnappedEvent,
  register as registerBottomSheetElement,
} from "./bottom-sheet/index.ts";
import {
  ButtonGroup,
  Slots as ButtonGroupSlots,
  register as registerButtonGroupElement,
} from "./button-group/index.ts";
import {
  IconButton,
  Slots as IconButtonSlots,
  register as registerIconButtonElement,
} from "./button/icon-button/index.ts";
import {
  Button,
  Slots as ButtonSlots,
  register as registerButtonElement,
} from "./button/standard/index.ts";
import {
  ChatBubbleIn,
  Slots as ChatBubbleInSlots,
  register as registerChatBubbleInElement,
} from "./chat-bubble/in/index.ts";
import {
  ChatBubbleOut,
  Slots as ChatBubbleOutSlots,
  register as registerChatBubbleOutElement,
} from "./chat-bubble/out/index.ts";
import {
  Checkbox,
  register as registerCheckboxElement,
} from "./checkbox/index.ts";
import {
  ChipGroup,
  SelectChangeEvent as ChipGroupSelectChangeEvent,
  Slots as ChipGroupSlots,
  register as registerChipGroupElement,
} from "./chip-group/index.ts";
import {
  Chip,
  DeselectEvent as ChipDeselectEvent,
  SelectEvent as ChipSelectEvent,
  Slots as ChipSlots,
  register as registerChipElement,
} from "./chip/index.ts";
import {
  Divider,
  register as registerDividerElement,
} from "./divider/index.ts";
import {
  EmptyState,
  Slots as EmptyStateSlots,
  register as registerEmptyStateElement,
} from "./empty-state/index.ts";
import {
  FileInput,
  RetryEvent as FileInputRetryEvent,
  Slots as FileInputSlots,
  register as registerFileInputElement,
} from "./file-input/index.ts";
import {
  Modal,
  HideEvent as ModalHideEvent,
  ShowEvent as ModalShowEvent,
  Slots as ModalSlots,
  register as registerModalElement,
} from "./modal/index.ts";
import {
  Notice,
  HideEvent as NoticeHideEvent,
  ShowEvent as NoticeShowEvent,
  Slots as NoticeSlots,
  register as registerNoticeElement,
} from "./notice/index.ts";
import {
  PinInput,
  CompleteEvent as PinInputCompleteEvent,
  register as registerPinInputElement,
} from "./pin-input/index.ts";
import {
  PinwheelGroup,
  Slots as PinwheelGroupSlots,
  register as registerPinwheelGroupElement,
} from "./pinwheel-group/index.ts";
import {
  Pinwheel,
  PinwheelItem,
  ItemSlots as PinwheelItemSlots,
  Slots as PinwheelSlots,
  register as registerPinwheelElement,
} from "./pinwheel/index.ts";
import {
  ProgressIndicator,
  register as registerProgressIndicatorElement,
} from "./progress-indicator/index.ts";
import { Radio, register as registerRadioElement } from "./radio/index.ts";
import {
  RateSlider,
  register as registerRateSliderElement,
} from "./rate-slider/index.ts";
import {
  SegmentedView,
  ActiveChangeEvent as SegmentedViewActiveChangeEvent,
  SegmentedViewItem,
  ItemSlots as SegmentedViewItemSlots,
  Slots as SegmentedViewSlots,
  register as registerSegmentedViewElement,
} from "./segmented-view/index.ts";
import {
  Skeleton,
  Slots as SkeletonSlots,
  register as registerSkeletonElement,
} from "./skeleton/index.ts";
import {
  Snackbar,
  HideEvent as SnackbarHideEvent,
  ShowEvent as SnackbarShowEvent,
  Slots as SnackbarSlots,
  register as registerSnackbarElement,
} from "./snackbar/index.ts";
import {
  Spinner,
  register as registerSpinnerElement,
} from "./spinner/index.ts";
import {
  Stepper,
  register as registerStepperElement,
} from "./stepper/index.ts";
import { Switch, register as registerSwitchElement } from "./switch/index.ts";
import {
  TextArea,
  Slots as TextAreaSlots,
  register as registerTextAreaElement,
} from "./text-area/index.ts";
import {
  TextField,
  Slots as TextFieldSlots,
  register as registerTextFieldElement,
} from "./text-field/index.ts";
import {
  Tooltip,
  HideEvent as TooltipHideEvent,
  ShowEvent as TooltipShowEvent,
  register as registerTooltipElement,
} from "./tooltip/index.ts";

export {
  Avatar,
  AvatarSlots,
  Badge,
  BadgeSlots,
  BadgeWrapper,
  BadgeWrapperSlots,
  Banner,
  BannerSlots,
  BottomNavigation,
  BottomNavigationActiveChangeEvent,
  BottomNavigationItem,
  BottomNavigationItemSlots,
  BottomNavigationSlots,
  BottomSheet,
  BottomSheetClosedEvent,
  BottomSheetClosingEvent,
  BottomSheetHideEvent,
  BottomSheetOpenedEvent,
  BottomSheetOpeningEvent,
  BottomSheetShowEvent,
  BottomSheetSlots,
  BottomSheetSnappedEvent,
  Button,
  ButtonGroup,
  ButtonGroupSlots,
  ButtonSlots,
  ChatBubbleIn,
  ChatBubbleInSlots,
  ChatBubbleOut,
  ChatBubbleOutSlots,
  Checkbox,
  Chip,
  ChipDeselectEvent,
  ChipGroup,
  ChipGroupSelectChangeEvent,
  ChipGroupSlots,
  ChipSelectEvent,
  ChipSlots,
  Divider,
  EmptyState,
  EmptyStateSlots,
  FileInput,
  FileInputRetryEvent,
  FileInputSlots,
  IconButton,
  IconButtonSlots,
  Modal,
  ModalHideEvent,
  ModalShowEvent,
  ModalSlots,
  Notice,
  NoticeHideEvent,
  NoticeShowEvent,
  NoticeSlots,
  PinInput,
  PinInputCompleteEvent,
  Pinwheel,
  PinwheelGroup,
  PinwheelGroupSlots,
  PinwheelItem,
  PinwheelItemSlots,
  PinwheelSlots,
  ProgressIndicator,
  Radio,
  RateSlider,
  SegmentedView,
  SegmentedViewActiveChangeEvent,
  SegmentedViewItem,
  SegmentedViewItemSlots,
  SegmentedViewSlots,
  Skeleton,
  SkeletonSlots,
  Snackbar,
  SnackbarHideEvent,
  SnackbarShowEvent,
  SnackbarSlots,
  Spinner,
  Stepper,
  Switch,
  TextArea,
  TextAreaSlots,
  TextField,
  TextFieldSlots,
  Tooltip,
  TooltipHideEvent,
  TooltipShowEvent,
  registerAvatarElement,
  registerBadgeElement,
  registerBadgeWrapperElement,
  registerBannerElement,
  registerBottomNavigationElement,
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
  registerProgressIndicatorElement,
  registerRadioElement,
  registerRateSliderElement,
  registerSegmentedViewElement,
  registerSkeletonElement,
  registerSnackbarElement,
  registerSpinnerElement,
  registerStepperElement,
  registerSwitchElement,
  registerTextAreaElement,
  registerTextFieldElement,
  registerTooltipElement,
};

export const registerAllElements = () => {
  registerAvatarElement();
  registerBadgeElement();
  registerBadgeWrapperElement();
  registerBannerElement();
  registerBottomNavigationElement();
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
  registerProgressIndicatorElement();
  registerRadioElement();
  registerRateSliderElement();
  registerSegmentedViewElement();
  registerSkeletonElement();
  registerSnackbarElement();
  registerSpinnerElement();
  registerStepperElement();
  registerSwitchElement();
  registerTextAreaElement();
  registerTextFieldElement();
  registerTooltipElement();
};
