import * as LitReact from "@lit/react";
import * as React from "react";

/* START: AUTO-GENERATED [DO_NOT_REMOVE] */
import {
  ChipDeselectEvent,
  Chip as ChipElementClass,
  ChipSelectEvent,
  ChipSlots,
  registerChipElement,
} from "@tapsioss/web-components";

registerChipElement();

const __Chip = LitReact.createComponent({
  tagName: "tapsi-chip",
  elementClass: ChipElementClass,
  react: React,
  events: {
    onSelect: "select" as LitReact.EventName<ChipSelectEvent>,
    onDeselect: "deselect" as LitReact.EventName<ChipDeselectEvent>,
  },
});

export { ChipDeselectEvent, ChipSelectEvent, ChipSlots };

/* END: AUTO-GENERATED [DO_NOT_REMOVE] */

const Chip = __Chip;

export { Chip };
