import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  ChipDeselectEvent,
  Chip as ChipElement,
  ChipSelectEvent,
  ChipSlots,
  registerChip,
} from "@tapsioss/web-components";

registerChip();

export const Chip: ReactWebComponent<
  ChipElement,
  {
    onSelect: EventName<ChipSelectEvent>;
    onDeselect: EventName<ChipDeselectEvent>;
  }
> = createComponent({
  tagName: "tapsi-chip",
  elementClass: ChipElement,
  react: React,
  events: {
    onSelect: "select" as EventName<ChipSelectEvent>,
    onDeselect: "deselect" as EventName<ChipDeselectEvent>,
  },
});

export { ChipDeselectEvent, ChipElement, ChipSelectEvent, ChipSlots };
