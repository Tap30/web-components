import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  :host {
    position: absolute;
  }

  .root.visible {
    visibility: visible;
    opacity: 1;
  }

  .root {
    display: flex;
    align-items: flex-start;

    max-width: 20.5rem;
    min-height: 2.25rem;
    padding: var(--tapsi-spacing-3-1) var(--tapsi-spacing-4);
    gap: var(--tapsi-spacing-3);

    border-radius: var(--tapsi-radius-3);

    background-color: var(--tapsi-color-surface-inverse-secondary);
    visibility: hidden;
    opacity: 0;
  }

  .text {
    color: var(--tapsi-color-content-on-inverse);

    font-family: var(--tapsi-font-family);
    font-size: var(--tapsi-typography-body-sm-size);
    font-weight: var(--tapsi-typography-body-sm-weight);
    line-height: var(--tapsi-typography-body-sm-height);
  }

  .dismiss {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    flex-shrink: 0;

    margin-right: auto;
    margin-left: calc(-1 * var(--tapsi-spacing-4));
    margin-top: calc(-1 * var(--tapsi-spacing-3-1));
    margin-bottom: calc(-1 * var(--tapsi-spacing-3-1));

    width: 2.25rem;
    height: 2.25rem;

    border-radius: 50%;

    color: var(--tapsi-color-content-on-inverse);
  }

  .dismiss-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dismiss svg {
    fill: currentColor;

    width: 1.25rem;
    height: 1.25rem;
  }

  .arrow {
    position: absolute;

    display: flex;

    width: 0.625rem;
    height: 0.625rem;

    color: var(--tapsi-color-surface-inverse-secondary);
  }

  .arrow > svg {
    width: 0.3125rem;
    height: 0.625rem;
  }

  .root[class*="top"] .arrow {
    transform: rotate(-90deg);
  }

  .root[class*="bottom"] .arrow {
    transform: rotate(90deg);
  }

  .root[class*="left"] .arrow {
    transform: rotate(180deg);
  }
`;
