import { customElement } from "lit/decorators.js";
import styles from "./pinwheel-group.style.ts";
import { PinwheelGroup } from "./pinwheel-group.ts";

export { Slots } from "./constants.ts";

/**
 * @summary The pinwheel group component.
 *
 * @tag tapsi-pinwheel-group
 *
 * @prop {string} [label=""] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 */
@customElement("tapsi-pinwheel-group")
export class TapsiPinwheelGroup extends PinwheelGroup {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pinwheel-group": TapsiPinwheelGroup;
  }
}
