import { registerAvatarElement } from "./avatar/element.ts";

const registerAllElements = () => ({ avatar: registerAvatarElement() });

export { registerAllElements, registerAvatarElement };
