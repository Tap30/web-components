import { type ReactiveController, type ReactiveControllerHost } from "lit";
import { KeyboardKeys } from "../../internals";
import { waitAMicrotask } from "../../utils";
import { ActiveChangeEvent } from "./events";
import type { SegmentedViewItem } from "./item";

/*
 * To use, elements should add the controller and call
 * `selectionController.handleCheckedChange()` in a getter/setter. This must
 * be synchronous to match native behavior.
 */
class SegmentedViewItemController implements ReactiveController {
  private _focused = false;
  private _root: ParentNode | null = null;

  private readonly _host: ReactiveControllerHost & SegmentedViewItem;

  /**
   * All single selection elements in the host element's root with the same
   * `value` attribute, including the host element.
   */
  public get items(): [SegmentedViewItem, ...SegmentedViewItem[]] {
    if (!this._root || !this._host.isConnected) return [this._host];

    return Array.from(
      this._root.querySelectorAll<SegmentedViewItem>("tap-segmented-view-item"),
    ) as unknown as [SegmentedViewItem, ...SegmentedViewItem[]];
  }

  constructor(host: ReactiveControllerHost & SegmentedViewItem) {
    this._host = host;

    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleFocusIn = this._handleFocusIn.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
  }

  public hostConnected() {
    this._root = this._host.parentNode;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this._host.addEventListener("click", this._handleClick);
    this._host.addEventListener("keydown", this._handleKeyDown);
    this._host.addEventListener("focusin", this._handleFocusIn);
    this._host.addEventListener("focusout", this._handleFocusOut);

    if (this._host.active) this._deactiveSiblings();

    this._updateTabIndices();
  }

  hostDisconnected() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this._host.addEventListener("click", this._handleClick);
    this._host.removeEventListener("keydown", this._handleKeyDown);
    this._host.removeEventListener("focusin", this._handleFocusIn);
    this._host.removeEventListener("focusout", this._handleFocusOut);

    // Update for siblings that are still connected.
    this._updateTabIndices();

    this._root = null;
  }

  /**
   * Should be called whenever the host's `active` property changes
   * synchronously.
   */
  public handleActiveChange() {
    if (!this._host.active) return;

    this._deactiveSiblings();
    this._updateTabIndices();
  }

  private async _handleClick(event: MouseEvent) {
    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    const eventAllowed = this._host.dispatchEvent(
      new ActiveChangeEvent({
        itemValue: this._host.value,
      }),
    );

    if (!eventAllowed) return;

    this._host.focus();
    this._host.active = true;
  }

  private _handleFocusIn() {
    this._focused = true;

    this._updateTabIndices();
  }

  private _handleFocusOut() {
    this._focused = false;

    this._updateTabIndices();
  }

  private _deactiveSiblings() {
    this.items.forEach(sibling => {
      if (sibling !== this._host) sibling.active = false;
    });
  }

  private _updateTabIndices() {
    // There are three tabindex states for a group of elements:

    // 1. If any are active, that element is focusable.
    const siblings = this.items;
    const activeSibling = siblings.find(sibling => sibling.active);

    // 2. If an element is focused, the others are no longer focusable.
    if (activeSibling || this._focused) {
      const focusable = activeSibling || this._host;

      focusable.tabIndex = 0;

      siblings.forEach(sibling => {
        if (sibling !== focusable) sibling.tabIndex = -1;
      });

      return;
    }

    // 3. If none are active or focused, all are focusable.
    siblings.forEach(sibling => {
      sibling.tabIndex = 0;
    });
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const isLeft = event.key === KeyboardKeys.LEFT;
    const isRight = event.key === KeyboardKeys.RIGHT;
    const isHome = event.key === KeyboardKeys.HOME;
    const isEnd = event.key === KeyboardKeys.END;

    if (!isLeft && !isRight && !isHome && !isEnd) return;

    const siblings = this.items;

    // Don't try to select another sibling if there aren't any.
    if (!siblings.length) return;

    // Prevent default interactions on the element for arrow keys,
    // since this controller will introduce new behavior.
    event.preventDefault();

    const isRtl = getComputedStyle(this._host).direction === "rtl";
    const hostIndex = siblings.indexOf(this._host);

    let nextIndex: number;
    let forwards = true;

    if (isHome || isEnd) {
      nextIndex = isHome ? 0 : siblings.length - 1;
    } else {
      forwards = isRtl ? isLeft : isRight;
      nextIndex = forwards ? hostIndex + 1 : hostIndex - 1;
    }

    // Search for the next sibling that is not disabled to select.
    // If we return to the host index, there is nothing to select.
    while (nextIndex !== hostIndex) {
      if (nextIndex >= siblings.length) {
        // Return to start if moving past the last item.
        nextIndex = 0;
      } else if (nextIndex < 0) {
        // Go to end if moving before the first item.
        nextIndex = siblings.length - 1;
      }

      const nextSibling = siblings[nextIndex];

      // Check if the next sibling is disabled or not found.
      // If so, move the index and continue searching.
      if (!nextSibling || nextSibling.hasAttribute("disabled")) {
        if (forwards) nextIndex++;
        else nextIndex--;

        continue;
      }

      const eventAllowed = this._host.dispatchEvent(
        new ActiveChangeEvent({
          itemValue: nextSibling.value,
        }),
      );

      if (!eventAllowed) break;

      // deactive and remove focusability from other siblings.
      siblings.forEach(sibling => {
        if (sibling !== nextSibling) {
          sibling.active = false;
          sibling.tabIndex = -1;

          sibling.blur();
        }
      });

      // The next sibling should be active, focused.
      nextSibling.active = true;
      nextSibling.tabIndex = 0;
      nextSibling.focus();

      break;
    }
  }
}

export default SegmentedViewItemController;
