import {
  Avatar,
  Slots as AvatarSlots,
  register as registerAvatar,
} from "./avatar/index.ts";
import {
  BadgeWrapper,
  Slots as BadgeWrapperSlots,
  register as registerBadgeWrapper,
} from "./badge-wrapper/index.ts";
import {
  Badge,
  Slots as BadgeSlots,
  register as registerBadge,
} from "./badge/index.ts";
import {
  Banner,
  Slots as BannerSlots,
  register as registerBanner,
} from "./banner/index.ts";
import {
  BottomNavigation,
  ActiveChangeEvent as BottomNavigationActiveChangeEvent,
  BottomNavigationItem,
  ItemSlots as BottomNavigationItemSlots,
  Slots as BottomNavigationSlots,
  register as registerBottomNavigation,
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
  register as registerBottomSheet,
} from "./bottom-sheet/index.ts";
import {
  ButtonGroup,
  Slots as ButtonGroupSlots,
  register as registerButtonGroup,
} from "./button-group/index.ts";
import {
  IconButton,
  Slots as IconButtonSlots,
  register as registerIconButton,
} from "./button/icon-button/index.ts";
import {
  Button,
  Slots as ButtonSlots,
  register as registerButton,
} from "./button/standard/index.ts";
import {
  ChatBubbleIn,
  Slots as ChatBubbleInSlots,
  register as registerChatBubbleIn,
} from "./chat-bubble/in/index.ts";
import {
  ChatBubbleOut,
  Slots as ChatBubbleOutSlots,
  register as registerChatBubbleOut,
} from "./chat-bubble/out/index.ts";
import { Checkbox, register as registerCheckbox } from "./checkbox/index.ts";
import {
  ChipGroup,
  SelectChangeEvent as ChipGroupSelectChangeEvent,
  Slots as ChipGroupSlots,
  register as registerChipGroup,
} from "./chip-group/index.ts";
import {
  Chip,
  DeselectEvent as ChipDeselectEvent,
  SelectEvent as ChipSelectEvent,
  Slots as ChipSlots,
  register as registerChip,
} from "./chip/index.ts";
import { Divider, register as registerDivider } from "./divider/index.ts";
import {
  EmptyState,
  Slots as EmptyStateSlots,
  register as registerEmptyState,
} from "./empty-state/index.ts";
import {
  FileInput,
  RetryEvent as FileInputRetryEvent,
  Slots as FileInputSlots,
  register as registerFileInput,
} from "./file-input/index.ts";
import {
  Modal,
  HideEvent as ModalHideEvent,
  ShowEvent as ModalShowEvent,
  Slots as ModalSlots,
  register as registerModal,
} from "./modal/index.ts";
import {
  Notice,
  HideEvent as NoticeHideEvent,
  ShowEvent as NoticeShowEvent,
  Slots as NoticeSlots,
  register as registerNotice,
} from "./notice/index.ts";
import {
  PinInput,
  CompleteEvent as PinInputCompleteEvent,
  register as registerPinInput,
} from "./pin-input/index.ts";
import {
  PinwheelGroup,
  Slots as PinwheelGroupSlots,
  register as registerPinwheelGroup,
} from "./pinwheel-group/index.ts";
import {
  Pinwheel,
  PinwheelItem,
  ItemSlots as PinwheelItemSlots,
  Slots as PinwheelSlots,
  register as registerPinwheel,
} from "./pinwheel/index.ts";
import {
  ProgressIndicator,
  register as registerProgressIndicator,
} from "./progress-indicator/index.ts";
import { Radio, register as registerRadio } from "./radio/index.ts";
import {
  RateSlider,
  register as registerRateSlider,
} from "./rate-slider/index.ts";
import {
  SegmentedView,
  ActiveChangeEvent as SegmentedViewActiveChangeEvent,
  SegmentedViewItem,
  ItemSlots as SegmentedViewItemSlots,
  Slots as SegmentedViewSlots,
  register as registerSegmentedView,
} from "./segmented-view/index.ts";
import {
  Skeleton,
  Slots as SkeletonSlots,
  register as registerSkeleton,
} from "./skeleton/index.ts";
import {
  Snackbar,
  HideEvent as SnackbarHideEvent,
  ShowEvent as SnackbarShowEvent,
  Slots as SnackbarSlots,
  register as registerSnackbar,
} from "./snackbar/index.ts";
import { Spinner, register as registerSpinner } from "./spinner/index.ts";
import { Stepper, register as registerStepper } from "./stepper/index.ts";
import { Switch, register as registerSwitch } from "./switch/index.ts";
import {
  TextArea,
  Slots as TextAreaSlots,
  register as registerTextArea,
} from "./text-area/index.ts";
import {
  TextField,
  Slots as TextFieldSlots,
  register as registerTextField,
} from "./text-field/index.ts";
import {
  Tooltip,
  HideEvent as TooltipHideEvent,
  ShowEvent as TooltipShowEvent,
  register as registerTooltip,
} from "./tooltip/index.ts";

import {
  DiscountCard,
  Slots as DiscountCardSlots,
  register as registerDiscountCard,
} from "./discount-card/index.ts";

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
  DiscountCard,
  DiscountCardSlots,
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
  registerAvatar,
  registerBadge,
  registerBadgeWrapper,
  registerBanner,
  registerBottomNavigation,
  registerBottomSheet,
  registerButton,
  registerButtonGroup,
  registerChatBubbleIn,
  registerChatBubbleOut,
  registerCheckbox,
  registerChip,
  registerChipGroup,
  registerDiscountCard,
  registerDivider,
  registerEmptyState,
  registerFileInput,
  registerIconButton,
  registerModal,
  registerNotice,
  registerPinInput,
  registerPinwheel,
  registerPinwheelGroup,
  registerProgressIndicator,
  registerRadio,
  registerRateSlider,
  registerSegmentedView,
  registerSkeleton,
  registerSnackbar,
  registerSpinner,
  registerStepper,
  registerSwitch,
  registerTextArea,
  registerTextField,
  registerTooltip,
};

export const registerAll = () => {
  registerAvatar();
  registerBadge();
  registerBadgeWrapper();
  registerBanner();
  registerBottomNavigation();
  registerBottomSheet();
  registerButton();
  registerButtonGroup();
  registerChatBubbleIn();
  registerChatBubbleOut();
  registerCheckbox();
  registerChip();
  registerChipGroup();
  registerDivider();
  registerEmptyState();
  registerFileInput();
  registerIconButton();
  registerModal();
  registerNotice();
  registerPinInput();
  registerPinwheel();
  registerPinwheelGroup();
  registerProgressIndicator();
  registerRadio();
  registerRateSlider();
  registerSegmentedView();
  registerSkeleton();
  registerSnackbar();
  registerSpinner();
  registerStepper();
  registerSwitch();
  registerTextArea();
  registerTextField();
  registerTooltip();
  registerDiscountCard();
};
