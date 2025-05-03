import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChatBubbleOut as ChatBubbleOutInput,
  ChatBubbleOutSlots,
  registerChatBubbleOut,
} from "@tapsioss/web-components";

registerChatBubbleOut();

export const ChatBubbleOut = LitReact.createComponent({
  tagName: "tapsi-chat-bubble-out",
  elementClass: ChatBubbleOutInput,
  react: React,
  events: {},
});

export { ChatBubbleOutInput, ChatBubbleOutSlots };
