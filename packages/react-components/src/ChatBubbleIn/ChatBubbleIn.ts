import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChatBubbleIn as ChatBubbleInElementClass,
  ChatBubbleInSlots,
  registerChatBubbleInElement,
} from "@tapsioss/web-components";

registerChatBubbleInElement();

const __ChatBubbleIn = LitReact.createComponent({
  tagName: "tapsi-chat-bubble-in",
  elementClass: ChatBubbleInElementClass,
  react: React,
  events: {},
});

export { ChatBubbleInSlots };

const ChatBubbleIn = __ChatBubbleIn;

export { ChatBubbleIn };
