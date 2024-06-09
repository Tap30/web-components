import { customElement } from 'lit/decorators.js';
import { ArrowTopRightQuestionFillIcon } from './arrow-top-right-question-fill';

@customElement('tap-icon-arrow-top-right-question-fill')
export class TapIconArrowTopRightQuestionFill extends ArrowTopRightQuestionFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-arrow-top-right-question-fill': TapIconArrowTopRightQuestionFill;
  }
}
