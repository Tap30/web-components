import { css } from 'lit';

export default css`
  .bottom-sheet {
    // transform: translateY(100vh);
    position: absolute;
    bottom: 0;
    transition: transform 0.3s cubic-bezier(0, 1, 0, 1);
    direction: rtl;
    max-width: 440px;
    width: 100%;
    background-color: var(
      --tap-bottom-sheet-background,
      var(--tap-sys-color-surface-primary)
    );
    z-index: 2;
    box-sizing: border-box;
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
    border-radius: 20px 20px 0 0;
    transition: 1s;
  }

  .bottom-sheet-dimmer {
    position: fixed;
    width: 100dvw;
    height: 100dvh;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #33323b4b;
    animation: fade-in 0.3s ease-in-out;

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  .bottom-sheet-body {
    background-color: inherit;
    overflow-y: hidden;
    height: 100%;
  }

  .bottom-sheet-header {
    display: flex;
    align-items: center;
    padding-top: var(--tap-bottom-sheet-header-padding);
    border-bottom: 1px solid var(--tap-palette-gray-200);
  }

  .title {
    height: 52px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
  }

  .close-button {
    background-color: var(--tap-palette-gray-100);
    width: 32px;
    heigh: 32px;
    border-radius: 50%;
    position: absolute;
    left: 16px;
    display: flex;
    -webkit-tap-highlight-color: transparent;
  }

  .grabber {
    width: 44px;
    height: 4px;
    border-radius: 2px;
    position: absolute;
    top: 8px;
    background-color: rgba(0, 0, 0, 0.12);
    z-index: 1;
    right: 50%;
    transform: translateX(50%);
    cursor: row-resize;
  }

  .close {
    animation: slide-down 1s cubic-bezier(0, 1, 0, 1) forwards;
  }

  .open {
    animation: slide-up 0.3s cubic-bezier(0, 1, 0, 1) forwards;
  }

  @keyframes slide-down {
    0% {
      translateY(0)
    }
    70% {
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-70vh);
    }
  }
`;
