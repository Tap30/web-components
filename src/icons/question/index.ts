import { customElement } from 'lit/decorators.js';
import { QuestionIcon } from './question';

@customElement('tap-icon-question')
export class TapIconQuestion extends QuestionIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-question': TapIconQuestion;
  }
}
