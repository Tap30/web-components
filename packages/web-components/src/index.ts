import * as AvatarModule from "./avatar/index.ts";
import * as BadgeWrapperModule from "./badge-wrapper/index.ts";
import * as BadgeModule from "./badge/index.ts";
import * as BannerModule from "./banner/index.ts";
import * as BottomNavigationModule from "./bottom-navigation/index.ts";
import * as BottomNavigationItemModule from "./bottom-navigation/item/index.ts";
import * as BottomSheetModule from "./bottom-sheet/index.ts";
import * as ButtonGroupModule from "./button-group/index.ts";
import * as IconButtonModule from "./button/icon-button/index.ts";
import * as ButtonModule from "./button/standard/index.ts";
import * as ChatBubbleInModule from "./chat-bubble/in/index.ts";
import * as ChatBubbleOutModule from "./chat-bubble/out/index.ts";
import * as CheckboxModule from "./checkbox/index.ts";
import * as ChipGroupModule from "./chip-group/index.ts";
import * as ChipModule from "./chip/index.ts";
import * as DividerModule from "./divider/index.ts";
import * as EmptyStateModule from "./empty-state/index.ts";
import * as FileInputModule from "./file-input/index.ts";
import * as ModalModule from "./modal/index.ts";
import * as NoticeModule from "./notice/index.ts";
import * as PinInputModule from "./pin-input/index.ts";
import * as PinwheelGroupModule from "./pinwheel-group/index.ts";
import * as PinwheelModule from "./pinwheel/index.ts";
import * as PinwheelItemModule from "./pinwheel/item/index.ts";
import * as ProgressIndicatorModule from "./progress-indicator/index.ts";
import * as RadioModule from "./radio/index.ts";
import * as RateSliderModule from "./rate-slider/index.ts";
import * as SegmentedViewModule from "./segmented-view/index.ts";
import * as SegmentedViewItemModule from "./segmented-view/item/index.ts";
import * as SkeletonModule from "./skeleton/index.ts";
import * as SnackbarModule from "./snackbar/index.ts";
import * as SpinnerModule from "./spinner/index.ts";
import * as StepperModule from "./stepper/index.ts";
import * as SwitchModule from "./switch/index.ts";
import * as TextAreaModule from "./text-area/index.ts";
import * as TextFieldModule from "./text-field/index.ts";
import * as TooltipModule from "./tooltip/index.ts";

const { register: registerAvatarElement } = AvatarModule;
const { register: registerBadgeWrapperElement } = BadgeWrapperModule;
const { register: registerBadgeElement } = BadgeModule;
const { register: registerBannerElement } = BannerModule;
const { register: registerBottomNavigationElement } = BottomNavigationModule;
const { register: registerBottomNavigationItemElement } =
  BottomNavigationItemModule;

const { register: registerBottomSheetElement } = BottomSheetModule;
const { register: registerButtonGroupElement } = ButtonGroupModule;
const { register: registerIconButtonElement } = IconButtonModule;
const { register: registerButtonElement } = ButtonModule;
const { register: registerChatBubbleInElement } = ChatBubbleInModule;
const { register: registerChatBubbleOutElement } = ChatBubbleOutModule;
const { register: registerCheckboxElement } = CheckboxModule;
const { register: registerChipGroupElement } = ChipGroupModule;
const { register: registerChipElement } = ChipModule;
const { register: registerDividerElement } = DividerModule;
const { register: registerEmptyStateElement } = EmptyStateModule;
const { register: registerFileInputElement } = FileInputModule;
const { register: registerModalElement } = ModalModule;
const { register: registerNoticeElement } = NoticeModule;
const { register: registerPinInputElement } = PinInputModule;
const { register: registerPinwheelGroupElement } = PinwheelGroupModule;
const { register: registerPinwheelElement } = PinwheelModule;
const { register: registerPinwheelItemElement } = PinwheelItemModule;
const { register: registerProgressIndicatorElement } = ProgressIndicatorModule;
const { register: registerRadioElement } = RadioModule;
const { register: registerRateSliderElement } = RateSliderModule;
const { register: registerSegmentedViewElement } = SegmentedViewModule;
const { register: registerSegmentedViewItemElement } = SegmentedViewItemModule;
const { register: registerSkeletonElement } = SkeletonModule;
const { register: registerSnackbarElement } = SnackbarModule;
const { register: registerSpinnerElement } = SpinnerModule;
const { register: registerStepperElement } = StepperModule;
const { register: registerSwitchElement } = SwitchModule;
const { register: registerTextAreaElement } = TextAreaModule;
const { register: registerTextFieldElement } = TextFieldModule;
const { register: registerTooltipElement } = TooltipModule;

export const { Avatar, Slots: AvatarSlot } = AvatarModule;
export const { Badge, Slots: BadgeSlots } = BadgeModule;
export const { Banner, Slots: BannerSlots } = BannerModule;
export const {
  BottomNavigation,
  ActiveChangeEvent: BottomNavigationActiveChangeEvent,
  Slots: BottomNavigationSlots,
} = BottomNavigationModule;
export const {
  BottomNavigationItem,
  ActivateEvent: BottomNavigationItemActivateEvent,
  Slots: BottomNavigationItemSlots,
} = BottomNavigationItemModule;
export const {
  BottomSheet,
  ClosedEvent: BottomSheetClosedEvent,
  ClosingEvent: BottomSheetClosingEvent,
  HideEvent: BottomSheetHideEvent,
  OpenedEvent: BottomSheetOpenedEvent,
  OpeningEvent: BottomSheetOpeningEvent,
  ShowEvent: BottomSheetShowEvent,
  Slots: BottomSheetSlots,
  SnappedEvent: BottomSheetSnappedEvent,
} = BottomSheetModule;
export const { ButtonGroup, Slots: ButtonGroupSlots } = ButtonGroupModule;
export const { IconButton, Slots: IconButtonSlots } = IconButtonModule;
export const { Button, Slots: ButtonSlots } = ButtonModule;
export const { ChatBubbleIn } = ChatBubbleInModule;
export const { ChatBubbleOut } = ChatBubbleOutModule;
export const { Checkbox } = CheckboxModule;
export const {
  ChipGroup,
  SelectChangeEvent: ChipGroupSelectChangeEvent,
  Slots: ChipGroupSlots,
} = ChipGroupModule;
export const {
  Chip,
  DeselectEvent: ChipDeselectEvent,
  SelectEvent: ChipSelectEvent,
  Slots: ChipSlots,
} = ChipModule;
export const { Divider } = DividerModule;
export const { EmptyState, Slots: EmptyStateSlots } = EmptyStateModule;
export const {
  FileInput,
  RetryEvent: FileInputRetryEvent,
  Slots: FileInputSlots,
} = FileInputModule;
export const {
  Modal,
  HideEvent: ModalHideEvent,
  ShowEvent: ModalShowEvent,
  Slots: ModalSlots,
} = ModalModule;
export const {
  Notice,
  HideEvent: NoticeHideEvent,
  ShowEvent: NoticeShowEvent,
  Slots: NoticeSlots,
} = NoticeModule;
export const { PinInput, CompleteEvent: PinInputCompleteEvent } =
  PinInputModule;
export const { PinwheelGroup, Slots: PinwheelGroupSlots } = PinwheelGroupModule;
export const { Pinwheel, Slots: PinwheelSlots } = PinwheelModule;
export const { PinwheelItem, Slots: PinwheelItemSlots } = PinwheelItemModule;
export const { ProgressIndicator } = ProgressIndicatorModule;
export const { Radio } = RadioModule;
export const { RateSlider } = RateSliderModule;
export const {
  SegmentedView,
  ActiveChangeEvent: SegmentedViewActiveChangeEvent,
  Slots: SegmentedViewSlots,
} = SegmentedViewModule;
export const {
  SegmentedViewItem,
  ActivateEvent: SegmentedViewItemActivateEvent,
  Slots: SegmentedViewItemSlots,
} = SegmentedViewItemModule;
export const { Skeleton, Slots: SkeletonSlots } = SkeletonModule;
export const {
  Snackbar,
  HideEvent: SnackbarHideEvent,
  ShowEvent: SnackbarShowEvent,
  Slots: SnackbarSlots,
} = SnackbarModule;
export const { Spinner } = SpinnerModule;
export const { Stepper } = StepperModule;
export const { Switch } = SwitchModule;
export const { TextArea, Slots: TextAreaSlots } = TextAreaModule;
export const { TextField, Slots: TextFieldSlots } = TextFieldModule;
export const {
  Tooltip,
  HideEvent: TooltipHideEvent,
  ShowEvent: TooltipShowEvent,
} = TooltipModule;

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
