import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChatBubbleIn as ChatBubbleInInput,
  ChatBubbleInSlots,
  registerChatBubbleIn,
} from "@tapsioss/web-components";

registerChatBubbleIn();

export const ChatBubbleIn = LitReact.createComponent({
  tagName: "tapsi-chat-bubble-in",
  elementClass: ChatBubbleInInput,
  react: React,
  events: {},
});

export { ChatBubbleInInput, ChatBubbleInSlots };
