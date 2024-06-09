import { customElement } from 'lit/decorators.js';
import { ArrowTopRightQuestionIcon } from './arrow-top-right-question';

@customElement('tap-icon-arrow-top-right-question')
export class TapIconArrowTopRightQuestion extends ArrowTopRightQuestionIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-arrow-top-right-question': TapIconArrowTopRightQuestion;
  }
}
