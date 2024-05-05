import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
  }

  .spinner {
    width: 20px;
    height: 20px;
    padding: 2px;
    stroke-linecap: round;
  }

  .rotating {
    transform-origin: 300px 300px;
    animation : rotate 1s linear infinite;
  }

  .primary {
    color: var(--tap-sys-color-surface-black);
  }

  .inverse {
    color: var(--tap-sys-color-surface-white);
  }

  @keyframes rotate {
    from {transform: rotate(105deg);}
    to {transform: rotate(465deg);}
  }
`;
