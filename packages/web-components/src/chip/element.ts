import type { RegisteredCustomElement } from "../internals/types.ts";
import { Chip } from "./chip.ts";
import { Slots } from "./constants.ts";
import { DeselectEvent, SelectEvent } from "./events.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chip": Chip;
  }
}

export const registerChipElement = () => {
  customElements.define("tapsi-chip", Chip);

  return {
    Slots,
    eventsMap: {
      [SelectEvent.type]: SelectEvent,
      [DeselectEvent.type]: DeselectEvent,
    },
    tagName: "tapsi-chip",
    elementClass: Chip,
  } as const satisfies RegisteredCustomElement;
};
