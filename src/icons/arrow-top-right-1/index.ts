import {customElement} from "lit/decorators.js";
import { ArrowTopRight1Icon } from "./arrow-top-right-1";

@customElement("tap-icon-arrow-top-right-1")
export class TapIconArrowTopRight1 extends ArrowTopRight1Icon {
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-icon-arrow-top-right-1": TapIconArrowTopRight1;
  }
}
