import { customElement } from "lit/decorators.js";
import { ButtonGroup } from "./button-group";
import styles from "./button-group.style";

export { Slots } from "./constants";

/**
 * @summary The button group component.
 *
 * @tag tapsi-button-group
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
 * @prop {string} [label=""] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @slot button - The slot for buttons.
 */
@customElement("tapsi-button-group")
export class TapsiButtonGroup extends ButtonGroup {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-button-group": TapsiButtonGroup;
  }
}
