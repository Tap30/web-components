import { customElement } from "lit/decorators.js";
import { Tooltip } from "./tooltip";
import styles from "./tooltip.style";

@customElement("tooltip")
export class TapTooltip extends Tooltip {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tooltip": TapTooltip;
  }
}
