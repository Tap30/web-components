import { customElement } from 'lit/decorators.js';
import { SendChatFillIcon } from './send-chat-fill';

@customElement('tap-icon-send-chat-fill')
export class TapIconSendChatFill extends SendChatFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-send-chat-fill': TapIconSendChatFill;
  }
}
