import { registerAvatarElement } from "./avatar/element.ts";
import { registerButtonGroupElement } from "./button-group/element.ts";
import { registerIconButtonElement } from "./button/icon-button/element.ts";
import { registerButtonElement } from "./button/standard/element.ts";
import { registerChatBubbleInElement } from "./chat-bubble/in/element.ts";
import { registerChatBubbleOutElement } from "./chat-bubble/out/element.ts";
import { registerCheckboxElement } from "./checkbox/element.ts";
import { registerChipGroupElement } from "./chip-group/element.ts";
import { registerChipElement } from "./chip/element.ts";

const registerAllElements = () => ({
  avatar: registerAvatarElement(),
  "icon-button": registerIconButtonElement(),
  button: registerButtonElement(),
  "button-group": registerButtonGroupElement(),
  "chat-bubble-in": registerChatBubbleInElement(),
  "chat-bubble-out": registerChatBubbleOutElement(),
  checkbox: registerCheckboxElement(),
  chip: registerChipElement(),
  "chip-group": registerChipGroupElement(),
});

export {
  registerAllElements,
  registerAvatarElement,
  registerButtonElement,
  registerButtonGroupElement,
  registerChatBubbleInElement,
  registerChatBubbleOutElement,
  registerCheckboxElement,
  registerChipElement,
  registerChipGroupElement,
  registerIconButtonElement,
};
