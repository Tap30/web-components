import { customElement } from "lit/decorators.js";
import { BottomSheet } from "./sheet";
import styles from "./sheet.style";

export { Slots } from "./constants";

/**
 * @summary The bottom-sheet component.
 *
 * @tag tap-bottom-sheet
 *
 * @prop {string} [heading-title=""] - Sets the heading title in a declarative-way.
 * @prop {string} [heading-description=""] - Sets the heading description in a declarative-way.
 * @prop {boolean} [has-grabber=false] - Determines whether the grabber should be visible or not.
 * @prop {boolean} [has-dismiss-button=false] - Determines whether the dismiss button should be visible or not.
 * @prop {boolean} [sticky-action-bar=false] - Determines whether the action bar should be sticky or not.
 * @prop {boolean} [sticky-header=false] - Determines whether the header should be sticky or not.
 * @prop {"modal" | "inline"} [variant="modal"] - The variant of the bottom sheet.
 * @prop {string} [label=""] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @prop {string} [labelledby=""] -
 * Identifies the element (or elements) that labels the element.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
 *
 * @slot header - The slot for the header content.
 * @slot body - The slot for the main body content.
 * @slot action-bar - The slot for the action bar content.
 *
 * @fires {SnappedEvent} snapped - Fired when the bottom-sheet is snapped to a specific position.
 * @fires {OpeningEvent} opening - Fired when the bottom-sheet starts to open (cancelable).
 * @fires {ClosingEvent} closing - Fired when the bottom-sheet starts to close (cancelable).
 * @fires {OpenedEvent} opened - Fired when the bottom-sheet has fully opened.
 * @fires {ClosedEvent} closed - Fired when the bottom-sheet has fully closed.
 * @fires {HideEvent} hide - Fired when the bottom-sheet is hidden (cancelable).
 * @fires {ShowEvent} show - Fired when the bottom-sheet is shown (cancelable).
 *
 * @member {number[]} snapPoints
 * @description - The snap points for bottom sheet to snap to.
 * Note that snap points will be sorted sorted, no matter
 * how to set it.
 *
 * @member {[number, number]} defaultSnapPoints
 * @description Gets the default snap points for the bottom sheet.
 * Returns An array containing two snap points.
 * - The first snap point is either the container's scroll height
 * or half the window's inner height, whichever is smaller.
 * - The second snap point is 90% of the window's inner height.
 * If the environment is SSR (Server-Side Rendering), it returns
 * `[0, 0]`.
 *
 * @method snapTo
 * @description - When given a number it'll find the closest snap point,
 * so you don't need to know the exact value.
 * Use the callback method to resolve the snap point.
 * @param {number | Function} numberOrCallback
 *
 * @method show
 * @description - Opens the bottom sheet if it is not already open.
 * Dispatches a cancelable ShowEvent ("show").
 *
 * @method hide
 * @description - Closes the bottom sheet if it is currently open.
 * Dispatches a cancelable HideEvent ("hide").
 */
@customElement("tap-bottom-sheet")
export class TapBottomSheet extends BottomSheet {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-bottom-sheet": TapBottomSheet;
  }
}
