import { customElement } from "lit/decorators.js";
import { TextArea } from "./textarea";
import styles from "./textarea.style";
import parentStyles from '../input/input.style';


@customElement("tap-textarea")
export class TapTextArea extends TextArea {
    static readonly styles = [parentStyles, styles];
}

declare global {
    interface HTMLElementTagNameMap {
        "tap-textarea": TapTextArea;
    }
}
