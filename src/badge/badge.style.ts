import { css } from "lit";

export default css`
  .wrapper {
    position: relative;
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--tap-sys-spacing-2);
    font: inherit;
    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-body-xs-height);
    font-size: var(--tap-sys-typography-body-xs-size);
    font-weight: var(--tap-sys-typography-body-xs-weight);
    color: var(--tap-sys-color-content-primary);
    border-radius: var(--tap-sys-radius-4);
  }

  .icon {
    margin: var(--tap-sys-spacing-2);
  }

  :host([type="pill"]) .badge, :host([type="numeral"]) .badge {
    border-radius: var(--tap-sys-radius-4);
    padding: var(--tap-sys-spacing-2) var(--tap-sys-spacing-4);
  }

  :host([type="dot"]) .badge {
    /* FIXME: we dont have sizing tokens yet  */
    width: 6px;
    height: 6px;
    /* FIXME: use spacing tokens  */
    margin: 3px;
    transform: translate(0, 0);
  }

  :host([variant="info"]) .badge {
    background-color: var(--tap-sys-color-surface-accent);
    color: var(--tap-sys-color-content-on-negative);
  }

  :host([variant="success"]) .badge {
    background-color: var(--tap-sys-color-surface-positive);
    color: var(--tap-sys-color-content-on-negative);
  }

  :host([variant="error"]) .badge {
    background-color: var(--tap-sys-color-surface-negative);
    color: var(--tap-sys-color-content-on-negative);
  }

  :host([variant="warning"]) .badge {
    background-color: var(--tap-sys-color-surface-warning);
    color: var(--tap-sys-color-content-on-warning);
  }

  :host([variant="inverse"]) .badge {
    background-color: var(--tap-sys-color-surface-disabled);
    color: var(--tap-sys-color-content-tertiary);
  }

  :host([variant="info"][priority="low"]) .badge {
    background-color: var(--tap-sys-color-surface-accent-light);
    color: var(--tap-sys-color-content-accent);
  }

  :host([variant="success"][priority="low"]) .badge {
    background-color: var(--tap-sys-color-surface-positive-light);
    color: var(--tap-sys-color-content-positive);
  }

  :host([variant="error"][priority="low"]) .badge {
    background-color: var(--tap-sys-color-surface-negative-light);
    color: var(--tap-sys-color-content-negative);
  }

  :host([variant="warning"][priority="low"]) .badge {
    background-color: var(--tap-sys-color-surface-warning-light);
    color: var(--tap-sys-color-content-warning);
  }
`;
