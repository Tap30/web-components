import { customElement } from "lit/decorators.js";
import { ActiveChangeEvent, SegmentedViewItem } from "./item";
import itemStyles from "./item/item.style";
import { SegmentedView } from "./segmented-view";
import segmentedViewStyles from "./segmented-view.style";

export { Slots } from "./constants";
export { ActiveChangeEvent };

/**
 * @summary Represents a single item in a segmented view component.
 *
 * @tag tap-segmented-view-item
 *
 * @slot - The default slot for the content/label.
 *
 * @fires {ActiveChangeEvent} activechange
 *
 * @prop {boolean} [active=false] - Indicates whether the item is active or not.
 * @prop {string} [value=""] - The value associated with the item. This value has to be unique among sibling items.
 * @prop {"sm" | "md"} [size="md"] - The size of the item.
 * @prop {string} [controls=""] -
 * Identifies the element whose contents or presence
 * are controlled by this item.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tabpanel_role
 */
@customElement("tap-segmented-view-item")
export class TapSegmentedViewItem extends SegmentedViewItem {
  public static override readonly styles = [itemStyles];
}

/**
 * @summary The segmented view component.
 *
 * @tag tap-segmented-view
 *
 * @slot - The default slot for segmented view items.
 *
 * @prop {string} [screen-reader-label=""] - The label used for screen readers.
 */
@customElement("tap-segmented-view")
export class TapSegmentedView extends SegmentedView {
  public static override readonly styles = [segmentedViewStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-segmented-view": TapSegmentedView;
    "tap-segmented-view-item": TapSegmentedViewItem;
  }
}
