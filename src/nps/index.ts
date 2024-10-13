import { customElement } from "lit/decorators.js";
import { Nps } from "./nps";
import styles from "./nps.style";

/**
 * @summary A slider component for NPS Rating
 *
 * @prop {number} [min=0] - The min value.
 * @prop {number} [max=10] - The max value.
 * @prop {number} [value] - The current value.
 *
 * @fires nps-change - Fired when the value of the NPS rate changes.
 *
 * @csspart [nps-container] - The container of the component
 * @csspart [nps-dot] - The dot of the component
 * @csspart [nps-label] - The label of the component
 * @csspart [nps-rate] - The rate element of the component
 */
@customElement("tap-nps")
export class TapNps extends Nps {
  static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-nps": Nps;
  }
}
