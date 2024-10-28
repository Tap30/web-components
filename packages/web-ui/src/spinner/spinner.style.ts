import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
    display: flex;
  }

  .spinner {
    padding: var(--tap-spinner-padding, var(--tap-sys-spacing-2));
    stroke-linecap: round;
  }

  .rotating {
    transform-origin: 300px 300px;
    animation: rotate 1s linear infinite;
  }

  :host([variant="primary"]) .spinner {
    color: var(--tap-spinner-color-primary, var(--tap-sys-color-surface-black));
  }

  :host([variant="inverse"]) .spinner {
    color: var(--tap-spinner-color-inverse, var(--tap-sys-color-surface-white));
  }

  :host([variant="default"]) .spinner {
    color: inherit;
  }

  :host([size="small"]) .spinner {
    height: var(--tap-spinner-sm-size, var(--tap-sys-spacing-7));
    width: var(--tap-spinner-sm-size, var(--tap-sys-spacing-7));
  }

  :host([size="medium"]) .spinner {
    height: var(--tap-spinner-md-size, var(--tap-sys-spacing-8));
    width: var(--tap-spinner-md-size, var(--tap-sys-spacing-8));
  }

  :host([size="large"]) .spinner {
    height: var(--tap-spinner-lg-size, var(--tap-sys-spacing-10));
    width: var(--tap-spinner-lg-size, var(--tap-sys-spacing-10));
  }

  @keyframes rotate {
    from {
      transform: rotate(105deg);
    }
    to {
      transform: rotate(465deg);
    }
  }
`;
