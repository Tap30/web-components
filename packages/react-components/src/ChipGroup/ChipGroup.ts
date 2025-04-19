import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChipGroup as ChipGroupElementClass,
  ChipGroupSelectChangeEvent,
  ChipGroupSlots,
  registerChipGroupElement,
} from "@tapsioss/web-components";

registerChipGroupElement();

const __ChipGroup = LitReact.createComponent({
  tagName: "tapsi-chip-group",
  elementClass: ChipGroupElementClass,
  react: React,
  events: {
    onSelectChange:
      "selectchange" as LitReact.EventName<ChipGroupSelectChangeEvent>,
  },
});

export { ChipGroupSelectChangeEvent, ChipGroupSlots };

const ChipGroup = __ChipGroup;

export { ChipGroup };
