import { css } from "lit";

export default css`
  :host {
    border-radius: var(--tap-sys-radius-full);
  }

  .root.sm {
    --icon-button-size: 2rem;
  }

  .root.md {
    --icon-button-size: 2.5rem;
  }

  .root.lg {
    --icon-button-size: 3.25rem;
  }

  .root {
    width: var(--icon-button-size);
    height: var(--icon-button-size);
  }

  .icon:not(.spinner) {
    position: absolute;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }

  .icon {
    width: 100%;
    height: 100%;
  }
`;
