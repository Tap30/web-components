import { customElement } from "lit/decorators.js";
import { ChipGroup } from "./chip-group";
import styles from "./chip-group.style";
import { type SelectChangeEvent } from "./events";

export { Slots } from "./constants";
export * from "./events";

/**
 * @summary A chip group component.
 *
 * @tag tapsi-chip-group
 *
 * @slot - The default slot for chips.
 *
 * @fires {SelectChangeEvent} selectchange - Fired when the chip selection state changes. (bubbles).
 *
 * @prop {'single' | 'multiple'} [select-mode='single'] - The select mode of the chip group.
 * @prop {'horizontal' | 'vertical'} [orientation='horizontal'] - The orientation of the chip group.
 * @prop {string} [label=""] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 */

@customElement("tapsi-chip-group")
export class TapsiChipGroup extends ChipGroup {
  public static override readonly styles = [styles];

  declare addEventListener: <K extends keyof TapsiChipGroupEventMap>(
    type: K,
    listener: (this: TapsiChipGroup, ev: TapsiChipGroupEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  declare removeEventListener: <K extends keyof TapsiChipGroupEventMap>(
    type: K,
    listener: (this: TapsiChipGroup, ev: TapsiChipGroupEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiChipGroupEventMap extends HTMLElementEventMap {
  [SelectChangeEvent.type]: SelectChangeEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chip-group": TapsiChipGroup;
  }
}
