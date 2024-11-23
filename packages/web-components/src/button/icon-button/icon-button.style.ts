import { css } from "lit";

export default css`
  :host {
    border-radius: var(--tap-sys-radius-full);
  }

  .root.sm {
    --icon-button-size: 2rem;
  }

  .root.md {
    --icon-button-size: 2.5rem;
  }

  .root.lg {
    --icon-button-size: 3.25rem;
  }

  .root {
    width: var(--icon-button-size);
    height: var(--icon-button-size);
  }

  .icon:not(.spinner) {
    position: absolute;



    //top: 50%;
    //left: 50%;
    //transform: translate(-50%, -50%);

    display: flex;
    align-items: center;
    justify-content: center;

    //top: 0;
    //right: 0;
    //bottom: 0;
    //left: 0;

  }
`;
