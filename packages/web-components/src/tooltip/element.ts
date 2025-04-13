import type { RegisteredCustomElement } from "../internals/types.ts";
import { HideEvent, ShowEvent } from "./events.ts";
import { Tooltip } from "./tooltip.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-tooltip": Tooltip;
  }
}

export const registerTooltipElement = () => {
  customElements.define("tapsi-tooltip", Tooltip);

  return {
    tagName: "tapsi-tooltip",
    elementClass: Tooltip,
    eventsMap: {
      [HideEvent.type]: HideEvent,
      [ShowEvent.type]: ShowEvent,
    },
  } as const satisfies RegisteredCustomElement;
};
