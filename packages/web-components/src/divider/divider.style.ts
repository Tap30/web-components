import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host([variant="thin"]) {
    --divider-height: var(--tap-sys-stroke-1);
  }

  :host([variant="medium"]) {
    --divider-height: var(--tap-sys-stroke-2);
  }

  :host([variant="thick"]) {
    --divider-height: 0.5rem;
    --divider-bg-color: var(--tap-sys-color-surface-secondary);
  }

  :host {
    --divider-height: var(--tap-sys-stroke-2);
    --divider-bg-color: var(--tap-sys-color-border-primary);

    display: block;
    background-color: var(--divider-bg-color);

    width: 100%;
    height: var(--divider-height);

    margin: var(--tap-sys-spacing-4) 0;
  }
`;
