import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
  }

  :host([ordinal="first"]) .ordinal {
    :after {
      content: "";
      border: 1px solid var(--tap-palette-gray-200);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(90deg);
    }
  }

  :host([ordinal="middle"]) .ordinal {
    :before {
      content: "";
      border: 1px solid var(--tap-palette-gray-200);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(90deg);
    }

    :after {
      content: "";
      border: 1px solid var(--tap-palette-gray-200);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(90deg);
    }
  }

  :host([ordinal="last"]) .ordinal {
    :before {
      content: "";
      border: 1px solid var(--tap-palette-gray-200);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(90deg);
    }
  }
`;
