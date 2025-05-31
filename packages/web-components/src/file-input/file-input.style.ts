import { css, type CSSResult } from "lit";
import { FOCUS_RING_LINE, FOCUS_RING_OFFSET } from "../internals/index.ts";

const styles: CSSResult = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  :host {
    --input-bg-color: var(--tapsi-color-surface-secondary);
    --input-control-border-color: var(--tapsi-palette-gray-200);
    --input-support-color: var(--tapsi-color-content-secondary);
    --input-control-color: var(--tapsi-color-content-on-inverse);
    --input-label-color: var(--tapsi-color-content-primary);

    display: inline-block;
    vertical-align: middle;
  }

  .root {
    direction: rtl;
    font-family: var(--tapsi-typography-font-family);

    display: flex;
    flex-direction: column;

    gap: var(--tapsi-spacing-4);

    width: 100%;
  }

  .root.disabled {
    cursor: not-allowed;

    --input-control-bg-color: var(--tapsi-color-surface-disabled);
    --input-control-border-color: transparent;
    --input-support-color: var(--tapsi-color-content-disabled);
    --input-label-color: var(--tapsi-color-content-disabled);
    --input-color: var(--tapsi-color-content-disabled);
  }

  .root.disabled .input {
    display: none;
  }

  .root.error {
    --input-control-border-color: var(--tapsi-palette-red-200);
    --input-bg-color: var(--tapsi-color-surface-negative-light);
    --input-support-color: var(--tapsi-color-content-negative);
  }

  .root.error .control + .supporting-text {
    --input-support-color: var(--tapsi-color-content-negative);
  }

  .root:not(.disabled).loading .input {
    cursor: wait;
  }

  .control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 8.25rem;
    min-width: 8.25rem;
  }

  .label {
    color: var(--input-label-color);
    font-family: var(--tapsi-typography-font-family);
    line-height: var(--tapsi-typography-label-md-height);
    font-weight: var(--tapsi-typography-label-md-weight);
    font-size: var(--tapsi-typography-label-md-size);
  }

  .input {
    appearance: none;
    margin: 0;
    outline: none;
    border: none;
    opacity: 0;

    border-radius: inherit;

    cursor: pointer;

    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1;
    border: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  .input:focus-visible + .file-input {
    outline: ${FOCUS_RING_LINE};
    outline-offset: ${FOCUS_RING_OFFSET};
  }

  .file-input {
    height: 100%;
    width: 100%;

    position: relative;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: var(--tapsi-radius-3);

    background-color: var(--input-bg-color);

    border: 1px solid var(--input-control-border-color);
  }

  .supporting-text {
    color: var(--input-support-color);

    font-family: var(--tapsi-typography-font-family);
    line-height: var(--tapsi-typography-body-sm-height);
    font-size: var(--tapsi-typography-body-sm-size);
    font-weight: var(--tapsi-typography-body-sm-weight);
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--tapsi-color-content-accent);
  }

  .preview {
    width: calc(100% - var(--tapsi-spacing-6));
    height: calc(100% - var(--tapsi-spacing-6));
    object-fit: contain;
  }

  .clear-button {
    position: absolute;
    bottom: var(--tapsi-spacing-6);
    left: var(--tapsi-spacing-6);
  }

  .error-state {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .error-state .icon {
    height: 2.5rem;
    width: 2.5rem;
  }

  .error-state .error-action {
    margin-top: var(--tapsi-spacing-4);
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .empty-state .icon {
    height: 2.5rem;
    width: 2.5rem;
    color: var(--input-color);
  }

  .empty-state .placeholder {
    color: var(--input-color);

    margin-top: var(--tapsi-spacing-4);

    font-family: var(--tapsi-typography-font-family);
    font-size: var(--tapsi-typography-body-sm-size);
    font-weight: var(--tapsi-typography-body-sm-weight);
  }

  .progress-circle {
    transform: rotate(-90deg);
    transform-origin: center;
  }
  .background-circle {
    stroke: var(--tapsi-color-surface-tertiary);
  }
  .foreground-circle {
    stroke: var(--tapsi-color-content-accent);
    transition: stroke-dashoffset 0.3s ease;
  }

  .progress-wrapper {
    position: relative;
    width: 3rem;
    height: 3rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress-wrapper .progress {
    width: 100%;
    height: 100%;
  }

  .progress-wrapper .percentage {
    position: absolute;

    font-family: var(--tapsi-typography-font-family);
    font-size: var(--tapsi-typography-headline-xs-size);
    font-weight: var(--tapsi-typography-headline-xs-weight);
    line-height: var(--tapsi-typography-headline-xs-height);
  }

  .loading-state .text {
    color: var(--tapsi-color-content-secondary);

    margin-top: var(--tapsi-spacing-4);

    font-family: var(--tapsi-typography-font-family);
    font-size: var(--tapsi-typography-body-sm-size);
    font-weight: var(--tapsi-typography-body-sm-weight);
    line-height: var(--tapsi-typography-body-sm-height);
  }

  .loading-state .spinner {
    height: 2rem;
    width: 2rem;
  }

  .sr-only {
    position: absolute;

    width: 1px;
    height: 1px;
    padding: 0;

    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  @media (prefers-reduced-motion) {
    .foreground-circle {
      transition: none;
    }
  }
`;

export default styles;
