import { customElement } from 'lit/decorators.js';
import { SendChatIcon } from './send-chat';

@customElement('tap-icon-send-chat')
export class TapIconSendChat extends SendChatIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-send-chat': TapIconSendChat;
  }
}
