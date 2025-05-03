import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChipGroup as ChipGroupInput,
  ChipGroupSelectChangeEvent,
  ChipGroupSlots,
  registerChipGroup,
} from "@tapsioss/web-components";

registerChipGroup();

export const ChipGroup = LitReact.createComponent({
  tagName: "tapsi-chip-group",
  elementClass: ChipGroupInput,
  react: React,
  events: {
    onSelectChange:
      "selectchange" as LitReact.EventName<ChipGroupSelectChangeEvent>,
  },
});

export { ChipGroupInput, ChipGroupSelectChangeEvent, ChipGroupSlots };
