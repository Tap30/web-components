import { css } from 'lit';

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
    display: none;
  }

  .skeleton {
    position: relative;
    overflow: hidden;
    outline: none;
    background: var(--tap-skeleton-background, var(--tap-palette-gray-100))
      no-repeat;
    border-radius: var(--tap-skeleton-radius, var(--tap-sys-radius-2));
    width: var(--tap-skeleton-width, 100%);
    height: var(--tap-skeleton-height, 20px);
    display: inline-block;
    will-change: transform;
  }

  :host([variant='rect']) .skeleton {
    border-radius: var(--tap-skeleton-radius, 0px);
  }

  :host([variant='circle']) .skeleton {
    width: var(--tap-skeleton-width, 40px);
    height: var(--tap-skeleton-height, 40px);
    border-radius: var(--tap-skeleton-radius, var(--tap-sys-radius-full));
  }

  :host([animationMode='progress']) .skeleton {
    animation: progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    background-size: 200px 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0)
    );
  }
  :host([animationMode='pulse']) .skeleton {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s infinite;
  }

  @keyframes progress {
    from {
      background-position: -200px 0%;
    }
    to {
      background-position: calc(200px + 100%) 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.4%;
    }

    100% {
      opacity: 1;
    }
  }

  /*
    Removing animation if user enabled the 'Reduce Motion' option.
  */
  @media (prefers-reduced-motion: reduce) {
    :host([animationMode='progress']) .skeleton,
    :host([animationMode='pulse']) .skeleton {
      animation: none;
    }

    :host([animationMode='progress']) .skeleton {
      background: none;
    }
  }
`;
