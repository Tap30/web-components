import { Avatar } from "./avatar.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-avatar": Avatar;
  }
}

export const registerAvatarElement = () => {
  customElements.define("tapsi-avatar", Avatar);
};
