import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 30px;
  }

  .switch input {
    opacity: 0;
    position: absolute;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(
      --tap-switch-background-color,
      var(--tap-sys-color-surface-tertiary)
    );
    transition: background-color 0.4s;
    border-radius: 15px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    right: 2px;
    bottom: 2px;
    background-color: #fff;
    transition: transform 0.4s ease;
    border-radius: 50%;
    box-shadow: 0px 4px 16px 0px #0000001a;
  }

  input:checked + .slider {
    background-color: var(
      --tap-switch-checked-background-color,
      var(--tap-sys-color-surface-inverse-primary)
    );
  }

  input:checked + .slider:before {
    transform: translateX(-14px);
    background-image: url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.11057L9.11938 19L4 14.0643L6.11879 11.9537L9.11938 14.7789L17.8812 6L20 8.11057Z" fill="black"/></svg>');
    background-repeat: no-repeat;
    background-position: 5px 5px;
  }

  :host([disabled]) .slider {
    background-color: var(
      --tap-switch-disabled-background-color,
      var(--tap-sys-color-surface-disabled)
    );
    cursor: not-allowed;
  }

  :host([disabled]) .slider:before {
    box-shadow: none;
  }

  :host([disabled]) input:checked + .slider:before {
    background-image: url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.11057L9.11938 19L4 14.0643L6.11879 11.9537L9.11938 14.7789L17.8812 6L20 8.11057Z" fill="%23b1b2b2"/></svg>');
  }
`;
