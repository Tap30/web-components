import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  ChatBubbleOut as ChatBubbleOutElement,
  ChatBubbleOutSlots,
  registerChatBubbleOut,
} from "@tapsioss/web-components";

registerChatBubbleOut();

export const ChatBubbleOut: ReactWebComponent<ChatBubbleOutElement> =
  createComponent({
    tagName: "tapsi-chat-bubble-out",
    elementClass: ChatBubbleOutElement,
    react: React,
    events: {},
  });

export { ChatBubbleOutElement, ChatBubbleOutSlots };
