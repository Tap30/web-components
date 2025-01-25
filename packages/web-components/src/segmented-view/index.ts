import { customElement } from "lit/decorators.js";
import { type ActiveChangeEvent } from "./events.ts";
import {
  type ActivateEvent,
  Slots as ItemSlots,
  SegmentedViewItem,
} from "./item/index.ts";
import itemStyles from "./item/item.style.ts";
import segmentedViewStyles from "./segmented-view.style.ts";
import { SegmentedView } from "./segmented-view.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { ItemSlots };

/**
 * @summary Represents a single item in a segmented view component.
 *
 * @tag tapsi-segmented-view-item
 *
 * @slot - The default slot for the content/label.
 *
 * @fires {ActivateEvent} activate - Fired when the item activates (bubbles).
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

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiSegmentedViewItemEventMap>(
    type: K,
    listener: (
      this: TapsiSegmentedViewItem,
      ev: TapsiSegmentedViewItemEventMap[K],
    ) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiSegmentedViewItemEventMap>(
    type: K,
    listener: (
      this: TapsiSegmentedViewItem,
      ev: TapsiSegmentedViewItemEventMap[K],
    ) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiSegmentedViewItemEventMap extends HTMLElementEventMap {
  [ActivateEvent.type]: ActivateEvent;
}

/**
 * @summary The segmented view component.
 *
 * @tag tapsi-segmented-view
 *
 * @slot - The default slot for segmented view items.
 *
 * @fires {ActiveChangeEvent} activechange - Fired when the items activation state changes (bubbles).
 *
 * @prop {string} [label=""] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 */
@customElement("tapsi-segmented-view")
export class TapsiSegmentedView extends SegmentedView {
  public static override readonly styles = [segmentedViewStyles];

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiSegmentedViewMap>(
    type: K,
    listener: (this: TapsiSegmentedView, ev: TapsiSegmentedViewMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiSegmentedViewMap>(
    type: K,
    listener: (this: TapsiSegmentedView, ev: TapsiSegmentedViewMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiSegmentedViewMap extends HTMLElementEventMap {
  [ActiveChangeEvent.type]: ActiveChangeEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-segmented-view": TapsiSegmentedView;
    "tapsi-segmented-view-item": TapsiSegmentedViewItem;
  }
}
