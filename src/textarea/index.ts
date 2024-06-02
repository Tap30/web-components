import { customElement } from "lit/decorators.js";
import { TextArea } from "./textarea";
import styles from "./textarea.style";

@customElement("tap-textarea")
export class TapTextArea extends TextArea {
    static readonly styles = [styles];
}

declare global {
    interface HTMLElementTagNameMap {
        "tap-textarea": TapTextArea;
    }
}
