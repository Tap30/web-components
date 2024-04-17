import { customElement } from "lit/decorators.js";
import { TextArea } from "./text-area";
import styles from "./text-area.style";

@customElement("tap-text-area")
export class TapTextArea extends TextArea {
    static readonly styles = [styles];
}

declare global {
    interface HTMLElementTagNameMap {
        "tap-text-area": TapTextArea;
    }
}
