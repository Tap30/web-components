import type { RegisteredCustomElement } from "../internals/types.ts";
import { ChipGroup } from "./chip-group.ts";
import { Slots } from "./constants.ts";
import { SelectChangeEvent } from "./events.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chip-group": ChipGroup;
  }
}

export const registerChipGroupElement = () => {
  customElements.define("tapsi-chip-group", ChipGroup);

  return {
    Slots,
    eventsMap: {
      [SelectChangeEvent.type]: SelectChangeEvent,
    },
    tagName: "tapsi-chip-group",
    elementClass: ChipGroup,
  } as const satisfies RegisteredCustomElement;
};
