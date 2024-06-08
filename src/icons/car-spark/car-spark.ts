import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CarSparkIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_771)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18 20C21.3137 20 24 17.3137 24 14C24 10.6863 21.3137 8 18 8C14.6863 8 12 10.6863 12 14C12 17.3137 14.6863 20 18 20ZM19.2541 15.2496L17.9986 18L16.7294 15.2496L14 13.993L16.7294 12.7365L17.9986 10L19.2541 12.7365L21.9972 13.993L19.2541 15.2496Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.0944 6.28639C18.7657 4.94408 17.5625 4 16.1805 4H7.87835C6.51315 4 5.32011 4.92174 4.9755 6.24273L4.46153 8.21296L4.42238 8.33195L4.38679 8.4071C3.65444 8.29425 2.92398 8.16503 2.19594 8.01942L1.80371 9.98058C2.23036 10.0659 2.65781 10.1458 3.08597 10.2203L2.988 10.3603C2.34454 11.3379 1.99983 12.4844 1.99983 13.659V21H4.99071C4.99143 19.8956 5.88678 19.0005 6.99117 19L12.4095 18.9997C11.222 17.6729 10.5 15.9208 10.5 14C10.5 12.0782 11.2228 10.3252 12.4114 8.99811C10.4381 9.01563 8.46391 8.91133 6.49983 8.68523L6.99312 6.75003L7.03056 6.63299C7.17721 6.25476 7.53654 6 7.9424 6H16.0872L16.1989 6.00647C16.5358 6.04574 16.8275 6.26075 16.9721 6.56985C17.3082 6.5238 17.6513 6.5 18 6.5C18.3976 6.5 18.7879 6.53093 19.1688 6.59053L19.0944 6.28639ZM5.99983 13H8.99983V15H5.99983V13Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_771">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}
