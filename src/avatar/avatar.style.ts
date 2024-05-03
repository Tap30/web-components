import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }

  .avatar {
    background-color: var(--tap-avatar-background-color, var(--tap-sys-color-surface-secondary));
    border: 1px solid var(--tap-avatar-border-color, var(--tap-sys-color-border-primary));
    border-radius: var(--tap-avatar-border-radius, var(--tap-sys-radius-full));
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .avatar img, .avatar .placeholder, .avatar ::slotted(svg) {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  :host([size="xxSmall"]) .avatar {
    width: var(--tap-avatar-width-xxSmall, var(--tap-sys-spacing-8));
    height: var(--tap-avatar-height-, vxxSmallar(--tap-sys-spacing-8));
  }

  :host([size="xSmall"]) .avatar {
    width: var(--tap-avatar-width-xSmall, var(--tap-sys-spacing-9));
    height: var(--tap-avatar-height-xSmall, var(--tap-sys-spacing-9));
  }

  :host([size="small"]) .avatar {
    width: var(--tap-avatar-width-small, var(--tap-sys-spacing-10));
    height: var(--tap-avatar-height-small, var(--tap-sys-spacing-10));
  }

  :host([size="medium"]) .avatar {
    width: var(--tap-avatar-width-medium, var(--tap-sys-spacing-11));
    height: var(--tap-avatar-height-medium, var(--tap-sys-spacing-11));
  }

  // TODO: add to tokens
  :host([size="large"]) .avatar {
    width: var(--tap-avatar-width-large, 56px);
    height: var(--tap-avatar-height-large, 56px);
  }

  // TODO: add to tokens
  :host([size="xLarge"]) .avatar {
    width: var(--tap-avatar-width-xLarge, 72px);
    height: var(--tap-avatar-height-xLarge, 72px);
  }
`;
