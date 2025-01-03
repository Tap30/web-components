import { customElement } from "lit/decorators.js";
import { Slots as ItemSlots, SegmentedViewItem } from "./item";
import itemStyles from "./item/item.style";
import { SegmentedView } from "./segmented-view";
import segmentedViewStyles from "./segmented-view.style";

export { Slots } from "./constants";
export * from "./events";
export { ItemSlots };

/**
 * @summary Represents a single item in a segmented view component.
 *
 * @tag tapsi-segmented-view-item
 *
 * @slot - The default slot for the content/label.
 *
 * @fires {ActivateEvent} activate - Fired when the item activates (cancelable, bubbles).
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
@customElement("tapsi-segmented-view-item")
export class TapsiSegmentedViewItem extends SegmentedViewItem {
  public static override readonly styles = [itemStyles];
}

/**
 * @summary The segmented view component.
 *
 * @tag tapsi-segmented-view
 *
 * @slot - The default slot for segmented view items.
 *
 * * @fires {ActiveChangeEvent} activechange - Fired when the items activation state changes (cancelable, bubbles).
 *
 * @prop {string} [label=""] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 *
 * @member {string} activeItem
 * @description - The value of the currently activated item.
 */
@customElement("tapsi-segmented-view")
export class TapsiSegmentedView extends SegmentedView {
  public static override readonly styles = [segmentedViewStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-segmented-view": TapsiSegmentedView;
    "tapsi-segmented-view-item": TapsiSegmentedViewItem;
  }
}
