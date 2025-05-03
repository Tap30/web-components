import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChipDeselectEvent,
  Chip as ChipInput,
  ChipSelectEvent,
  ChipSlots,
  registerChip,
} from "@tapsioss/web-components";

registerChip();

export const Chip = LitReact.createComponent({
  tagName: "tapsi-chip",
  elementClass: ChipInput,
  react: React,
  events: {
    onSelect: "select" as LitReact.EventName<ChipSelectEvent>,
    onDeselect: "deselect" as LitReact.EventName<ChipDeselectEvent>,
  },
});

export { ChipDeselectEvent, ChipInput, ChipSelectEvent, ChipSlots };
