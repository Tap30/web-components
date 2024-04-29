import { css } from "lit";

export default css`
  .tooltip {
    display: inline-flex;
    position: absolute;
    flex-direction: row;
    align-items: center;
    background-color: var(--tap-palette-gray-700);
    border-radius: var(--radius-8px, 8px);
    width: var(--tap-tooltip-width, auto);
    padding: var(--tap-sys-spacing-2) var(--tap-sys-spacing-4);
    padding-left: 0;
    justify-content: space-between;
  }

  .tooltip-icon {
    position: absolute;
    display: flex;
  }

  :host([pointer="top"]) .tooltip-icon {
    transform: translateY(-2px) rotate(90deg);
    left: 50%;
    top: -5px;
  }

  :host([pointer="left"]) .tooltip-icon {
    left: -5px;
  }

  :host([pointer="bottom"]) .tooltip-icon {
    transform: translateY(2px) rotate(-90deg);
    left: 50%;
    bottom: -5px;
  }

  :host([pointer="right"]) .tooltip-icon {
    transform: rotate(180deg);
    right: -5px;
  }

  :host([pointer="top"][pointerAlignment="start"]) .tooltip-icon {
    left: 25%;
    transform: translateY(-2px) rotate(90deg);
  }

  :host([pointer="bottom"][pointerAlignment="start"]) .tooltip-icon {
    left: 25%;
    transform: translateY(2px) rotate(-90deg);
  }

  :host([pointer="top"][pointerAlignment="end"]) .tooltip-icon {
    right: 25%;
    left: unset;
    transform: translateY(-2px) rotate(90deg);
  }
  
  :host([pointer="bottom"][pointerAlignment="end"]) .tooltip-icon {
    right: 25%;
    left: unset;
    transform: translateY(2px) rotate(-90deg);
  }

  :host([pointer="right"][pointerAlignment="start"]) .tooltip-icon {
    transform: rotate(180deg);
    right: -5px;
    top: 25%;
  }
  
  :host([pointer="left"][pointerAlignment="start"]) .tooltip-icon {
    top: 25%;
  }

  :host([pointer="right"][pointerAlignment="end"]) .tooltip-icon {
    transform: rotate(180deg);
    right: -5px;
    bottom: 25%;
  }
  
  :host([pointer="left"][pointerAlignment="end"]) .tooltip-icon {
    bottom: 25%;
  }

  .tooltip-label {
    color: var(--tap-palette-white);
    text-align: right;
  }
`;
