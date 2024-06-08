import { html } from 'lit';
import { TapIcon } from '../../icon';

export class StarIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1487)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.0024 14.9339L15.1531 16.8395L14.3186 13.2587L17.1075 10.8422L13.4394 10.5308L11.9993 7.13242L10.5601 10.5209L6.89313 10.8322L9.68201 13.2487L8.84617 16.8352L12.0024 14.9339ZM17.6403 18.7C17.8403 19.56 16.9103 20.24 16.1503 19.78L12.0003 17.27L7.85032 19.77C7.09032 20.23 6.16032 19.55 6.36032 18.69L7.46032 13.97L3.79032 10.79C3.12032 10.21 3.48032 9.11001 4.36032 9.04001L9.19032 8.63001L11.0803 4.18001C11.4203 3.37001 12.5803 3.37001 12.9203 4.18001L14.8103 8.64001L19.6403 9.05001C20.5203 9.12001 20.8803 10.22 20.2103 10.8L16.5403 13.98L17.6403 18.7Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1487">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}
