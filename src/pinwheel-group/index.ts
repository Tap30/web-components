import { customElement } from "lit/decorators.js";
import { PinwheelGroup } from "./pinwheel-group";
import styles from "./pinwheel-group.style";

/**
 * ### Example
 *
 * ```html
 * <tap-pinwheel-group>
 *  <tap-pinwheel .items=${["item1", "item2"]}></tap-avatar>
 *  <tap-pinwheel .items=${["item1", "item2"]}></tap-avatar>
 *  <tap-pinwheel .items=${["item1", "item2"]}></tap-avatar>
 * </tap-pinwheel-group>
 * ```
 *
 * @summary Grouping pinwheel components and attach selector indicator to them.
 *
 * @slot - The default slot to get pinwheels.
 *
 * @csspart pinwheel-group - The container that wraps the pinwheels.
 * @csspart pinwheel-selector-indicator - The selector indicator that wraps selected row.
 *
 * @cssprop [--tap-pinwheel-group-selector-radius=--tap-sys-spacing-4]
 *
 * @cssprop [--tap-pinwheel-group-selector-background-color=--tap-sys-color-surface-tertiary]
 *
 */
@customElement("tap-pinwheel-group")
export class TapPinwheelGroup extends PinwheelGroup {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-pinwheel-group": TapPinwheelGroup;
  }
}
