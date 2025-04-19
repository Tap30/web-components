import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ChatBubbleOut as ChatBubbleOutElementClass,
  ChatBubbleOutSlots,
  registerChatBubbleOutElement,
} from "@tapsioss/web-components";

registerChatBubbleOutElement();

const __ChatBubbleOut = LitReact.createComponent({
  tagName: "tapsi-chat-bubble-out",
  elementClass: ChatBubbleOutElementClass,
  react: React,
  events: {},
});

export { ChatBubbleOutSlots };

const ChatBubbleOut = __ChatBubbleOut;

export { ChatBubbleOut };
