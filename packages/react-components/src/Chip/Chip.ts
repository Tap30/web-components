import * as LitReact from "@lit/react";
import * as ComponentNamespace from "@tapsioss/web-components/chip";
import * as React from "react";

/* START: AUTO-GENERATED [DO_NOT_REMOVE] */
const __Chip = LitReact.createComponent({
  tagName: "tapsi-chip",
  elementClass: ComponentNamespace.TapsiChip,
  react: React,
  events: {
    onSelect: "select" as LitReact.EventName<ComponentNamespace.SelectEvent>,
    onDeselect:
      "deselect" as LitReact.EventName<ComponentNamespace.DeselectEvent>,
  },
});

export {
  DeselectEvent,
  SelectEvent,
  Slots,
} from "@tapsioss/web-components/chip";

/* END: AUTO-GENERATED [DO_NOT_REMOVE] */

const Chip = __Chip;

export { Chip };
