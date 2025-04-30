import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChatBubbleOut as ChatBubbleOutElementClass,
  ChatBubbleOutSlots,
  registerChatBubbleOut,
} from "@tapsioss/web-components";

registerChatBubbleOut();

export const ChatBubbleOut = LitReact.createComponent({
  tagName: "tapsi-chat-bubble-out",
  elementClass: ChatBubbleOutElementClass,
  react: React,
  events: {},
});

export { ChatBubbleOutElementClass, ChatBubbleOutSlots };
