import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChipDeselectEvent,
  Chip as ChipElementClass,
  ChipSelectEvent,
  ChipSlots,
  registerChip,
} from "@tapsioss/web-components";

registerChip();

export const Chip = LitReact.createComponent({
  tagName: "tapsi-chip",
  elementClass: ChipElementClass,
  react: React,
  events: {
    onSelect: "select" as LitReact.EventName<ChipSelectEvent>,
    onDeselect: "deselect" as LitReact.EventName<ChipDeselectEvent>,
  },
});

export { ChipDeselectEvent, ChipElementClass, ChipSelectEvent, ChipSlots };
