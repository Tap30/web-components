import { type ReactiveController } from "lit";
import { KeyboardKeys } from "../internals/index.ts";

export interface SingleSelectionElement extends HTMLElement {
  /**
   * Whether or not the element is selected.
   */
  checked: boolean;
}

/*
 * To use, elements should add the controller and call
 * `selectionController.handleCheckedChange()` in a getter/setter. This must
 * be synchronous to match native behavior.
 */
class SingleSelectionController implements ReactiveController {
  private _focused = false;
  private _root: ParentNode | null = null;

  private readonly _host: SingleSelectionElement;

  /**
   * All single selection elements in the host element's root with the same
   * `name` attribute, including the host element.
   */
  public get controls(): [SingleSelectionElement, ...SingleSelectionElement[]] {
    const name = this._host.getAttribute("name");

    if (!name || !this._root || !this._host.isConnected) return [this._host];

    return Array.from(
      this._root.querySelectorAll<SingleSelectionElement>(`[name="${name}"]`),
    ) as unknown as [SingleSelectionElement, ...SingleSelectionElement[]];
  }

  constructor(host: SingleSelectionElement) {
    this._host = host;

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleFocusIn = this._handleFocusIn.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
  }

  public hostConnected(): void {
    this._root = this._host.getRootNode() as ParentNode;

    this._host.addEventListener("keydown", this._handleKeyDown);
    this._host.addEventListener("focusin", this._handleFocusIn);
    this._host.addEventListener("focusout", this._handleFocusOut);

    if (this._host.checked) this._uncheckSiblings();

    this._updateTabIndices();
  }

  hostDisconnected(): void {
    this._host.removeEventListener("keydown", this._handleKeyDown);
    this._host.removeEventListener("focusin", this._handleFocusIn);
    this._host.removeEventListener("focusout", this._handleFocusOut);

    // Update for siblings that are still connected.
    this._updateTabIndices();

    this._root = null;
  }

  /**
   * Should be called whenever the host's `checked` property changes
   * synchronously.
   */
  public handleCheckedChange(): void {
    if (!this._host.checked) return;

    this._uncheckSiblings();
    this._updateTabIndices();
  }

  private _handleFocusIn() {
    this._focused = true;

    this._updateTabIndices();
  }

  private _handleFocusOut() {
    this._focused = false;

    this._updateTabIndices();
  }

  private _uncheckSiblings() {
    this.controls.forEach(sibling => {
      if (sibling !== this._host) sibling.checked = false;
    });
  }

  private _updateTabIndices() {
    // There are three tabindex states for a group of elements:

    // 1. If any are checked, that element is focusable.
    const siblings = this.controls;
    const checkedSibling = siblings.find(sibling => sibling.checked);

    // 2. If an element is focused, the others are no longer focusable.
    if (checkedSibling || this._focused) {
      const focusable = checkedSibling || this._host;

      focusable.tabIndex = 0;

      siblings.forEach(sibling => {
        if (sibling !== focusable) sibling.tabIndex = -1;
      });

      return;
    }

    // 3. If none are checked or focused, all are focusable.
    siblings.forEach(sibling => {
      sibling.tabIndex = 0;
    });
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const isDown = event.key === KeyboardKeys.DOWN;
    const isUp = event.key === KeyboardKeys.UP;
    const isLeft = event.key === KeyboardKeys.LEFT;
    const isRight = event.key === KeyboardKeys.RIGHT;

    // Ignore non-arrow keys
    if (!isLeft && !isRight && !isDown && !isUp) return;

    const siblings = this.controls;

    // Don't try to select another sibling if there aren't any.
    if (!siblings.length) return;

    // Prevent default interactions on the element for arrow keys,
    // since this controller will introduce new behavior.
    event.preventDefault();

    const isRtl = getComputedStyle(this._host).direction === "rtl";
    const forwards = isRtl ? isLeft || isDown : isRight || isDown;

    const hostIndex = siblings.indexOf(this._host);
    let nextIndex = forwards ? hostIndex + 1 : hostIndex - 1;

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

      // Uncheck and remove focusability from other siblings.
      siblings.forEach(sibling => {
        if (sibling !== nextSibling) {
          sibling.checked = false;
          sibling.tabIndex = -1;

          sibling.blur();
        }
      });

      // The next sibling should be checked, focused and dispatch a change event
      nextSibling.checked = true;
      nextSibling.tabIndex = 0;
      nextSibling.focus();
      // Fire a change event since the change is triggered by a user action.
      // This matches native <input type="radio"> behavior.
      nextSibling.dispatchEvent(new Event("change", { bubbles: true }));

      break;
    }
  }
}

export default SingleSelectionController;
