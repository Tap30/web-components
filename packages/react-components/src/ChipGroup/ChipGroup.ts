import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  ChipGroup as ChipGroupElement,
  ChipGroupSelectChangeEvent,
  ChipGroupSlots,
  registerChipGroup,
} from "@tapsioss/web-components";

registerChipGroup();

export const ChipGroup: ReactWebComponent<
  ChipGroupElement,
  { onSelectChange: EventName<ChipGroupSelectChangeEvent> }
> = createComponent({
  tagName: "tapsi-chip-group",
  elementClass: ChipGroupElement,
  react: React,
  events: {
    onSelectChange: "selectchange" as EventName<ChipGroupSelectChangeEvent>,
  },
});

export { ChipGroupElement, ChipGroupSelectChangeEvent, ChipGroupSlots };
