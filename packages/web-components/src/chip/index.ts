import { customElement } from "lit/decorators.js";
import styles from "./chip.style.ts";
import { Chip } from "./chip.ts";
import { DeselectEvent, SelectEvent } from "./events.ts";

export { Slots } from "./constants.ts";
export { DeselectEvent, SelectEvent };

/**
 * @summary The chip component.
 *
 * @tag tapsi-chip
 *
 * @slot - Default content slot for chip text.
 * @slot [leading-icon] - The slot for an optional leading icon.
 * @slot [trailing-icon] - The slot for an optional trailing icon.
 *
 * @fires {SelectEvent} select - Fired when the chip is selected (bubbles).
 * @fires {DeselectEvent} deselect - Fired when the chip is deselected (bubbles).
 *
 * @prop {boolean} [disabled=false] - Whether the chip is disabled or not.
 * @prop {boolean} [selected=false] - Whether the chip is selected or not.
 * @prop {"sm" | "md"} [size='md'] - The size of the chip.
 * @prop {string} [value] - The value associated with the chip.\
 * Use it when chips are children of chip-group. This value has to be unique among sibling chips.
 */

@customElement("tapsi-chip")
export class TapsiChip extends Chip {
  public static override readonly styles = [styles];

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiChipEventMap>(
    type: K,
    listener: (this: TapsiChip, ev: TapsiChipEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiChipEventMap>(
    type: K,
    listener: (this: TapsiChip, ev: TapsiChipEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiChipEventMap extends HTMLElementEventMap {
  [SelectEvent.type]: SelectEvent;
  [DeselectEvent.type]: DeselectEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chip": TapsiChip;
  }
}
