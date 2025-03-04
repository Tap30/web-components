import { customElement } from "lit/decorators.js";
import bottomNavigationStyles from "./bottom-navigation.style.ts";
import { BottomNavigation } from "./bottom-navigation.ts";
import { type ActiveChangeEvent } from "./events.ts";
import {
  type ActivateEvent,
  BottomNavigationItem,
  Slots as ItemSlots,
} from "./item/index.ts";
import itemStyles from "./item/item.style.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export * from "./item/events.ts";
export { ItemSlots };

/**
 * @summary Represents a single item in a bottom navigation bar.
 *
 * @tag tapsi-bottom-navigation-item
 *
 * @slot icon - The slot for the icon element.
 * @slot - The default slot for the content/label.
 *
 * @prop {boolean} [active=false] - Indicates whether the item is active or not.
 * @prop {string} [value=""] - The value associated with the item. This value has to be unique among sibling items.
 */
@customElement("tapsi-bottom-navigation-item")
export class TapsiBottomNavigationItem extends BottomNavigationItem {
  public static override readonly styles = [itemStyles];

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiBottomNavigationItemEventMap>(
    type: K,
    listener: (
      this: TapsiBottomNavigationItem,
      ev: TapsiBottomNavigationItemEventMap[K],
    ) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <
    K extends keyof TapsiBottomNavigationItemEventMap,
  >(
    type: K,
    listener: (
      this: TapsiBottomNavigationItem,
      ev: TapsiBottomNavigationItemEventMap[K],
    ) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiBottomNavigationItemEventMap extends HTMLElementEventMap {
  [ActivateEvent.type]: ActivateEvent;
}

/**
 * @summary The bottom navigation bar component.
 *
 * @tag tapsi-bottom-navigation
 *
 * @slot - The default slot for navigation items.
 *
 * @fires {ActiveChangeEvent} activechange - Fired when the items activation state changes (bubbles).
 *
 * @prop {string} [label] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 *
 * @member {string} activeItem
 * @description - The value of the currently activated item.
 */
@customElement("tapsi-bottom-navigation")
export class TapsiBottomNavigation extends BottomNavigation {
  public static override readonly styles = [bottomNavigationStyles];

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiBottomNavigationEventMap>(
    type: K,
    listener: (
      this: TapsiBottomNavigation,
      ev: TapsiBottomNavigationEventMap[K],
    ) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiBottomNavigationEventMap>(
    type: K,
    listener: (
      this: TapsiBottomNavigation,
      ev: TapsiBottomNavigationEventMap[K],
    ) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiBottomNavigationEventMap extends HTMLElementEventMap {
  [ActiveChangeEvent.type]: ActiveChangeEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-navigation": TapsiBottomNavigation;
    "tapsi-bottom-navigation-item": TapsiBottomNavigationItem;
  }
}
