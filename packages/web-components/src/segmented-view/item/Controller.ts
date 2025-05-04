import { KeyboardKeys } from "../../internals/index.ts";
import {
  isHTMLElement,
  runAfterRepaint,
  SelectionController,
  type SelectionElement,
} from "../../utils/index.ts";
import { ActivateEvent } from "./events.ts";
import { SegmentedViewItem } from "./item.ts";

type Host = SelectionElement<SegmentedViewItem>;

/*
 * To use, elements should add the controller and call
 * `controller.handleSelectionChange()` in a getter/setter. This must
 * be synchronous to match native behavior.
 */
class ItemSelectionController extends SelectionController<SegmentedViewItem> {
  private _focused = false;

  constructor(host: Host) {
    super(host, {
      tagName: "tapsi-segmented-view-item",
      resolveParentTarget: () => host.closest("tapsi-segmented-view"),
      selectionProperties: {
        member: "active",
        mode: "single",
        required: true,
      },
    });

    this._handleFocusIn = this._handleFocusIn.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
  }

  public override hostConnected(): void {
    super.hostConnected();

    this._host.addEventListener("focusin", this._handleFocusIn);
    this._host.addEventListener("focusout", this._handleFocusOut);

    this._updateTabIndices();
  }

  public override hostDisconnected(): void {
    super.hostDisconnected();

    this._host.removeEventListener("focusin", this._handleFocusIn);
    this._host.removeEventListener("focusout", this._handleFocusOut);

    this._updateTabIndices();
  }

  public override hostUpdated(): void {
    super.hostUpdated();

    runAfterRepaint(() => {
      if (!document.activeElement) return;

      const activeItem = this._elements.find(item => item.active);

      if (!activeItem) return;

      if (
        document.activeElement instanceof SegmentedViewItem &&
        activeItem !== document.activeElement
      ) {
        activeItem.focus();
      }
    });
  }

  private _activateItem(item: Host) {
    item.focus();

    if (document.activeElement !== item) return;

    const activeElement = item.shadowRoot?.activeElement;

    if (!isHTMLElement(activeElement)) return;

    activeElement.click();
    item.tabIndex = 0;
  }

  private _updateTabIndices() {
    // There are three tabindex states for a group of elements:

    // 1. If any are active, that element is focusable.
    const items = this._elements;
    const activeItem = items.find(sibling => sibling.active);

    // 2. If an element is focused, the others are no longer focusable.
    if (activeItem || this._focused) {
      const focusable = activeItem || this._host;

      focusable.tabIndex = 0;

      items.forEach(sibling => {
        if (sibling !== focusable) sibling.tabIndex = -1;
      });

      return;
    }

    // 3. If none are active or focused, all are focusable.
    items.forEach(sibling => {
      sibling.tabIndex = 0;
    });
  }

  public override handleSelectionChange(): void {
    super.handleSelectionChange();

    if (this._host.active) this._updateTabIndices();
  }

  public override async handleClick(event: MouseEvent): Promise<boolean> {
    if (!(await super.handleClick(event))) return false;

    this._host.dispatchEvent(new ActivateEvent());

    return true;
  }

  public override async handleKeyDown(event: KeyboardEvent): Promise<boolean> {
    if (!(await super.handleKeyDown(event))) return false;

    const isLeft = event.key === KeyboardKeys.LEFT;
    const isRight = event.key === KeyboardKeys.RIGHT;
    const isHome = event.key === KeyboardKeys.HOME;
    const isEnd = event.key === KeyboardKeys.END;

    if (!isLeft && !isRight && !isHome && !isEnd) return false;

    const items = this._elements;

    if (!items.length) return false;

    // Prevent default interactions on the element for arrow keys,
    // since this controller will introduce new behavior.
    event.preventDefault();

    const isRtl = getComputedStyle(this._host).direction === "rtl";
    const hostIndex = items.indexOf(this._host);

    let nextIndex: number;
    let forwards = true;

    if (isHome || isEnd) {
      nextIndex = isHome ? 0 : items.length - 1;
    } else {
      forwards = isRtl ? isLeft : isRight;
      nextIndex = forwards ? hostIndex + 1 : hostIndex - 1;
    }

    // Search for the next sibling that is not disabled to select.
    // If we return to the host index, there is nothing to select.
    while (nextIndex !== hostIndex) {
      if (nextIndex >= items.length) {
        // Return to start if moving past the last item.
        nextIndex = 0;
      } else if (nextIndex < 0) {
        // Go to end if moving before the first item.
        nextIndex = items.length - 1;
      }

      const nextSibling = items[nextIndex];

      // Check if the next sibling is disabled or not found.
      // If so, move the index and continue searching.
      if (!nextSibling || nextSibling.hasAttribute("disabled")) {
        if (forwards) nextIndex++;
        else nextIndex--;

        continue;
      }

      // Deactive and remove focusability from other siblings.
      items.forEach(item => {
        if (item !== nextSibling) {
          item.active = false;
          item.tabIndex = -1;
          item.blur();
        }
      });

      this._activateItem(nextSibling);

      break;
    }

    return true;
  }

  private _handleFocusIn() {
    this._focused = true;

    this._updateTabIndices();
  }

  private _handleFocusOut() {
    this._focused = false;

    this._updateTabIndices();
  }
}

export default ItemSelectionController;
