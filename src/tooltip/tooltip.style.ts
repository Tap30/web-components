import { css } from "lit";

export default css`
  .tooltip {
    display: inline-flex;
    position: absolute;
    flex-direction: row;
    align-items: center;
    background-color: var(--tap-tooltip-background, var(--tap-palette-gray-700));
    border-radius: var(--tap-tooltip-radius, var(--tap-sys-radius-3));
    width: var(--tap-tooltip-width, auto);
    padding: var(--tap-sys-spacing-3) var(--tap-sys-spacing-4);
    justify-content: space-between;
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
  }

  .tooltip-icon {
    position: absolute;
    display: flex;
    width: 10px;
    height: 10px;
  }

  :host([placement="top"]) .tooltip-icon,
  :host([placement="top-start"]) .tooltip-icon,
  :host([placement="top-end"]) .tooltip-icon {
    transform: rotate(-90deg);
  }

  :host([placement="bottom"]) .tooltip-icon,
  :host([placement="bottom-start"]) .tooltip-icon,
  :host([placement="bottom-end"]) .tooltip-icon {
    transform: rotate(90deg);
  }

  :host([placement="left"]) .tooltip-icon,
  :host([placement="left-start"]) .tooltip-icon,
  :host([placement="left-end"]) .tooltip-icon {
    transform: rotate(180deg);
  }

  .tooltip-label {
    color: var(--tap-palette-white);
    text-align: right;
    line-height: var(--tap-sys-typography-body-sm-height);
    font-size: var(--tap-tooltip-label-font-size, --tap-sys-typography-body-sm-size);
    direction: rtl;
  }

  :host([dismissible]) .tooltip {
    padding: var(--tap-sys-spacing-2) var(--tap-sys-spacing-4);
    padding-left: 0;
  }
`;
