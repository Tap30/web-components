import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
  }

  .ordinal {
    :after {
      content: "";
      width: 2px;
      height: 120%;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(11px, -5px);
    }

    :before {
      content: "";
      width: 2px;
      height: 120%;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateX(11px);
    }
  }

  :host([ordinal="first"]) .ordinal, :host([ordinal="middle"]) .ordinal {
    :after {
      background-color: var(--tap-palette-gray-200);
    }
  }

  :host([ordinal="last"]) .ordinal, :host([ordinal="middle"]) .ordinal {
    :before {
      background-color: var(--tap-palette-gray-200);
    }
  }
`;
