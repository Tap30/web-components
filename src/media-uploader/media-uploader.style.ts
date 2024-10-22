import { css } from "lit";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .root {
    display: flex;
    flex-direction: column;
    height: 132px;
    background: var(--tap-sys-color-surface-secondary);
    border-radius: var(--tap-sys-radius-3);
    border: var(--tap-sys-stroke-2) solid var(--tap-sys-color-border-primary);
    min-width: 6rem;
    max-width: 27rem;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: var(--tap-sys-spacing-4);
    gap: var(--tap-sys-spacing-4);
  }

  .icon {
    width: var(--tap-sys-spacing-9);
    height: var(--tap-sys-spacing-9);
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }

  .file-input {
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .image-preview {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .clear-button {
    position: absolute;
    bottom: var(--tap-sys-spacing-6);
    left: var(--tap-sys-spacing-6);
  }

  .clear-button svg {
    width: 100%;
    height: 100%;
  }
`;

export default styles;
