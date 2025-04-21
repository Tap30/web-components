import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChipGroup as ChipGroupElementClass,
  ChipGroupSelectChangeEvent,
  ChipGroupSlots,
  registerChipGroup,
} from "@tapsioss/web-components";

registerChipGroup();

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
