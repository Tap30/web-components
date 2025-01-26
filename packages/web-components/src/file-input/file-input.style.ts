import { css } from "lit";
import { FOCUS_RING_LINE, FOCUS_RING_OFFSET } from "../internals";

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
    --input-bg-color: var(--tapsi-color-surface-secondary);
    --input-filled-bg-color: var(--tapsi-color-surface-inverse-primary);
    --input-control-border-color: var(--tapsi-palette-gray-200);
    --input-support-color: var(--tapsi-color-content-secondary);
    --input-control-color: var(--tapsi-color-content-on-inverse);

    --input-support-text-size: var(--tapsi-typography-body-sm-size);
    --input-label-text-size: var(--tapsi-typography-label-md-size);
    --input-support-text-height: var(--tapsi-typography-body-sm-height);
    --input-label-text-height: var(--tapsi-typography-label-md-height);
    --input-support-text-weight: var(--tapsi-typography-body-sm-weight);
    --input-label-text-weight: var(--tapsi-typography-label-md-weight);

    display: inline-block;
    vertical-align: middle;
  }

  .root {
    direction: rtl;
    font-family: var(--tapsi-font-family);

    display: flex;
    flex-direction: column;

    gap: var(--tapsi-spacing-4);
  }

  .root.disabled {
    cursor: not-allowed;

    --input-control-bg-color: var(--tapsi-color-surface-disabled);
    --input-control-border-color: transparent;
    --input-support-color: var(--tapsi-color-content-disabled);
    --input-label-color: var(--tapsi-color-content-disabled);
    --input-color: var(--tapsi-color-content-disabled);
    --input-icon-color: var(--tapsi-color-content-disabled);
  }

  .root.disabled .input {
    display: none;
  }

  .control.error {
    --input-control-border-color: var(--tapsi-palette-red-200);
    --input-bg-color: var(--tapsi-color-surface-negative-light);
    --input-support-color: var(--tapsi-color-content-negative);
  }

  .control.error + .supporting-text {
    --input-support-color: var(--tapsi-color-content-negative);
  }

  .root:not(.disabled) .control.loading .input {
    cursor: wait;
  }

  .control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 8.25rem;
    width: 100%;
  }

  .label {
    color: var(--input-label-color);
    font-family: var(--tapsi-font-family);
    line-height: var(--input-label-text-height);
    font-size: var(--input-label-text-size);
    font-weight: var(--input-label-text-weight);
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

    inset: 0;
    z-index: 1;
  }

  .input:focus-visible + .file-input {
    outline: ${FOCUS_RING_LINE};
    outline-offset: ${FOCUS_RING_OFFSET};
  }

  .file-input {
    height: 8.25rem;
    width: 100%;

    position: relative;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: var(--tapsi-radius-3);

    background-color: var(--input-bg-color);

    border: 1px solid var(--input-control-border-color);

    transition:
      box-shadow 120ms ease,
      background-color 120ms ease;
  }

  .supporting-text {
    color: var(--input-support-color);

    font-family: var(--tapsi-font-family);
    line-height: var(--input-support-text-height);
    font-size: var(--input-support-text-size);
    font-weight: var(--input-support-text-weight);
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

  .error-state .icon {
    height: 2.5rem;
    width: 2.5rem;
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

    font-family: var(--tapsi-font-family);
    font-size: var(--tapsi-typography-body-sm-size);
    font-weight: var(--tapsi-typography-body-sm-weight);
  }

  .progress-circle {
    transform: rotate(-90deg);
    transform-origin: center;
  }
  .background-circle {
    stroke: #e6e6e6;
  }
  .foreground-circle {
    stroke: var(--tapsi-color-content-accent);
    transition: stroke-dashoffset 0.3s ease;
  }

  .progress-wrapper {
    position: relative;
    width: 3rem;
    height: 3rem;
  }

  .progress-wrapper .progress {
    width: 100%;
    height: 100%;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    position: absolute;
  }

  .progress-wrapper .percentage {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;

    font-family: var(--tapsi-font-family);
    font-size: var(--tapsi-typography-headline-xs-size);
    font-weight: var(--tapsi-typography-headline-xs-weight);
    line-height: var(--tapsi-typography-headline-xs-height);
  }

  .loading-state .text {
    margin-top: var(--tapsi-spacing-4);
    color: var(--tapsi-color-content-secondary);

    font-family: var(--tapsi-font-family);
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

  .selected-files {
    direction: ltr;
  }
`;
