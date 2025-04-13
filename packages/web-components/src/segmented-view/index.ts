import { registerSegmentedViewElement } from "./element.ts";

export {
  eventsMap as ItemEventMap,
  Slots as ItemSlots,
  tagName as ItemTagName,
  SegmentedViewItem,
} from "./item/index.ts";

export const {
  elementClass: SegmentedView,
  tagName,
  Slots,
  eventsMap,
} = registerSegmentedViewElement();
