import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  ChatBubbleIn as ChatBubbleInElement,
  ChatBubbleInSlots,
  registerChatBubbleIn,
} from "@tapsioss/web-components";

registerChatBubbleIn();

export const ChatBubbleIn: ReactWebComponent<ChatBubbleInElement> =
  createComponent({
    tagName: "tapsi-chat-bubble-in",
    elementClass: ChatBubbleInElement,
    react: React,
    events: {},
  });

export { ChatBubbleInElement, ChatBubbleInSlots };
