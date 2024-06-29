import { html } from 'lit';
import { TapIcon } from '../../icon';

export class GraduationCapIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_513)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.998 2.5L22.996 8.59092L23 14.3845H20.9912L20.9903 9.83752L19.1272 10.9948L19.1277 18.248L11.9356 21.5L4.934 17.3419L4.93317 11.0121L1 8.59092L11.998 2.5ZM17.1184 12.2424L12.0482 15.3924L6.94195 12.2485V16.1792L12.0603 19.2186L17.1184 16.9314V12.2424ZM11.998 4.77067L5.28955 8.68567L12.0435 13.0644L18.7207 8.69285L11.998 4.77067Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_513">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}
