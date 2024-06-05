import { customElement } from 'lit/decorators.js';
import { Input } from './input';
import styles from './input.style';

@customElement('tap-input')
export class TapInput extends Input {
    static readonly styles = [styles];
}

declare global {
    interface HTMLElementTagNameMap {
        'tap-input': TapInput;
    }
}
