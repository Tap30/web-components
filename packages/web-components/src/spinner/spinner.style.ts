import { css } from "lit";

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    display: flex;
  }

  .root {
    padding: var(--tap-sys-spacing-2);
    stroke-linecap: round;
    color: currentColor;
  }

  .rotating {
    transform-origin: 300px 300px;
    animation: rotate 1s linear infinite;
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
