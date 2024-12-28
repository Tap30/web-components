import { css } from "lit";

const styles = css`
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
    display: block;

    background-color: var(--tapsi-color-surface-tertiary);

    height: 1.2em;

    animation-name: pulse;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-delay: 0.5s;
    animation-iteration-count: infinite;
  }

  .root.text {
    margin: 0;

    height: auto;

    transform-origin: 0 55%;
    transform: scale(1, 0.6);

    border-radius: var(--tapsi-radius-2);
  }

  .root.text::before {
    content: " ";
  }

  .root.circular {
    border-radius: 50%;
  }

  .root.pill {
    border-radius: var(--tapsi-radius-full);
  }

  .root.rectangular {
    border-radius: var(--tapsi-radius-3);
  }

  .root ::slotted(*) {
    visibility: hidden;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.4;
    }

    100% {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .root {
      animation: none;
    }
  }
`;

export default styles;
