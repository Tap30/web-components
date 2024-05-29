import { css } from 'lit';

export default css`
  :host {
    box-sizing: border-box;
  }

  .spinner {
    width: var(--tap-spinner-size, var(--tap-sys-spacing-8));
    height: var(--tap-spinner-size, var(--tap-sys-spacing-8));
    padding: var(--tap-spinner-padding, var(--tap-sys-spacing-2));
    stroke-linecap: round;
  }

  .rotating {
    transform-origin: 300px 300px;
    animation: rotate 1s linear infinite;
  }

  .primary {
    color: var(--tap-spinner-color-primary, var(--tap-sys-color-surface-black));
  }

  .inverse {
    color: var(--tap-spinner-color-inverse, var(--tap-sys-color-surface-white));
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
