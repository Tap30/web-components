import { customElement } from "lit/decorators.js";
import { ButtonGroup } from "./button-group";
import styles from "./button-group.style";

export { Slots } from "./constants";

/**
 * @summary The button group component.
 *
 * @tag tap-button-group
 *
 * @prop {"horizontal" | "vertical"} [orientation="horizontal"] -
 * Defines the orientation of the button group.
 *
 * @prop {"start" | "center"} [alignment="start"] -
 * Sets the alignment of the items within the button group.
 *
 * @prop {boolean} [fluid-items=false] -
 * If true, the items in the button group will expand to fill the available space.
 *
 * @prop {string} [screen-reader-label=""] -
 * Provides an accessible label for screen readers.
 * This is used to describe the button group.
 *
 * @slot button - The slot for buttons.
 */
@customElement("tap-button-group")
export class TapButtonGroup extends ButtonGroup {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-button-group": TapButtonGroup;
  }
}
