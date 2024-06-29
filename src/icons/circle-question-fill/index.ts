import { customElement } from 'lit/decorators.js';
import { CircleQuestionFillIcon } from './circle-question-fill';

@customElement('tap-icon-circle-question-fill')
export class TapIconCircleQuestionFill extends CircleQuestionFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-question-fill': TapIconCircleQuestionFill;
  }
}
