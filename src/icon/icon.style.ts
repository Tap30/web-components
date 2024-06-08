import { css } from 'lit';

export default css`
  :host {
    box-sizing: border-box;
  }

  ::slotted(svg) {
    color: inherit;
    height: 100%;
    width: 100%;
  }
`;
