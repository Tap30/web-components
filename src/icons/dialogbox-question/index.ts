import { customElement } from 'lit/decorators.js';
import { DialogboxQuestionIcon } from './dialogbox-question';

@customElement('tap-icon-dialogbox-question')
export class TapIconDialogboxQuestion extends DialogboxQuestionIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-dialogbox-question': TapIconDialogboxQuestion;
  }
}
