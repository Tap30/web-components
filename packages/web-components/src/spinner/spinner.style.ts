import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: inline-block;
    vertical-align: middle;
  }

  .root {
    padding: var(--tapsi-spacing-2);
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

  @media (prefers-reduced-motion: reduce) {
    .rotating {
      animation: none;
    }
  }
`;
