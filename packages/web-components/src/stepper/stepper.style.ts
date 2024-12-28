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
    --stepper-value-color: var(--tapsi-color-content-primary);

    display: inline-block;
    vertical-align: middle;
  }

  .root.disabled {
    --stepper-value-color: var(--tapsi-color-content-disabled);

    cursor: not-allowed;

    -webkit-user-select: none;
    user-select: none;
  }

  .root.readonly {
    --stepper-value-color: var(--tapsi-color-content-primary);
  }

  .root.sm {
    --stepper-height: 2rem;
    --stepper-value-font-size: var(--tapsi-typography-label-md-size);
    --stepper-value-font-weight: var(--tapsi-typography-label-md-weight);
    --stepper-value-font-height: var(--tapsi-typography-label-md-height);
    --stepper-value-font: var(--tapsi-typography-label-md-font);
  }

  .root.md {
    --stepper-height: 2.5rem;
    --stepper-value-font-size: var(--tapsi-typography-headline-md-size);
    --stepper-value-font-weight: var(--tapsi-typography-headline-md-weight);
    --stepper-value-font-height: var(--tapsi-typography-headline-md-height);
    --stepper-value-font: var(--tapsi-typography-headline-md-font);
  }

  .root {
    direction: ltr;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;
    height: var(--stepper-height);
    gap: var(--tapsi-spacing-4);

    font-family: var(--tapsi-font-family);
  }

  .increase,
  .decrease {
    -webkit-user-select: none;
    user-select: none;

    flex-shrink: 0;
  }

  .input {
    direction: rtl;

    display: flex;
    align-items: center;
    justify-content: center;

    flex: 1 1 0;
    min-width: 1.5rem;
    height: 100%;

    outline: none;
    border: none;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .value {
    color: var(--stepper-value-color);

    gap: var(--tapsi-spacing-3);

    font-family: var(--stepper-value-font);
    font-size: var(--stepper-value-font-size);
    font-weight: var(--stepper-value-font-weight);
    line-height: var(--stepper-value-font-height);
  }

  .unit {
    font-family: var(--tapsi-typography-label-lg-font);
    font-size: var(--tapsi-typography-label-lg-size);
    font-weight: var(--tapsi-typography-label-lg-weight);
    line-height: var(--tapsi-typography-label-lg-height);
  }

  .focus-ring {
    position: absolute;
    inset: 0;

    border-radius: var(--tapsi-radius-full);

    visibility: hidden;
    opacity: 0;

    outline: ${FOCUS_RING_LINE};
    outline-offset: ${FOCUS_RING_OFFSET};
  }

  .input:focus-visible + .focus-ring {
    visibility: visible;
    opacity: 1;
  }
`;
