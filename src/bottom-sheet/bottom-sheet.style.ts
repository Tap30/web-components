import { css } from 'lit';

export default css`
  :host {
    display: flex;
    justify-content: center;
  }

  .bottom-sheet {
    position: absolute;
    bottom: var(--tap-bottom-sheet-bottom, -100dvh);
    height: 90dvh;
    max-height: 90dvh;
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    direction: rtl;
    max-width: 440px;
    width: 100%;
    background-color: var(
      --tap-bottom-sheet-background,
      var(--tap-sys-color-surface-primary)
    );
    box-sizing: border-box;
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
    border-radius: 20px 20px 0 0;
    border: 1px solid var(--tap-palette-gray-200);
    border-bottom: 0;
  }

  .bottom-sheet-dimmer {
    position: fixed;
    width: 100dvw;
    height: 100dvh;
    bottom: 0;
    background-color: #33323b4b;
    animation: fade-in 0.3s ease-in-out;
  }

  .bottom-sheet-body {
    display: flex;
    width: 100%;
    background-color: inherit;
    flex-grow: 1;
    overflow-x: auto;
    overflow-y: var(--tap-bottom-sheet-content-overflow-y, scroll);
  }

  .bottom-sheet-header {
    display: flex;
    align-items: center;
    padding-top: var(--tap-bottom-sheet-header-padding, 0);
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
    height: 32px;
    border-radius: 50%;
    position: absolute;
    left: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }

  .grabber {
    width: 44px;
    height: 4px;
    border-radius: 2px;
    position: absolute;
    top: 8px;
    background-color: rgba(0, 0, 0, 0.12);
    right: 50%;
    transform: translateX(50%);
  }

  .close {
    animation: slide-down 0.3s ease-in forwards;
  }

  .open {
    animation: slide-up 0.3s ease-in forwards;
  }

  @keyframes slide-down {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
