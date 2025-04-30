import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChatBubbleIn as ChatBubbleInElementClass,
  ChatBubbleInSlots,
  registerChatBubbleIn,
} from "@tapsioss/web-components";

registerChatBubbleIn();

export const ChatBubbleIn = LitReact.createComponent({
  tagName: "tapsi-chat-bubble-in",
  elementClass: ChatBubbleInElementClass,
  react: React,
  events: {},
});

export { ChatBubbleInElementClass, ChatBubbleInSlots };
