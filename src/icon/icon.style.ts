import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
  }

  ::slotted(svg) {
    color: inherit;
  }

  :host([size="small"]) ::slotted(svg) {
    height: var(--tap-sys-spacing-7);
    width: var(--tap-sys-spacing-7);
  }

  :host([size="medium"]) ::slotted(svg) {
    height: var(--tap-sys-spacing-8);
    width: var(--tap-sys-spacing-8);
  }

  :host([size="large"]) ::slotted(svg) {
    height: var(--tap-sys-spacing-9);
    width: var(--tap-sys-spacing-9);
  }
`;
