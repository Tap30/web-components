import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CarSlashIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_755)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.5152 3.09998L21.8992 21.485L20.4852 22.899L16.5852 18.999L7.9922 19V20H5.9922V19C5.99206 18.4952 6.18276 18.0091 6.52606 17.6391C6.86936 17.2691 7.33987 17.0426 7.8432 17.005L7.9932 17H14.5872L8.4552 10.87C7.40495 10.7978 6.35713 10.6938 5.3132 10.558L4.7712 11.299C4.32185 11.9141 4.05748 12.6447 4.0092 13.405L4.0002 13.66V20H2.0002V13.659C2.00009 12.4864 2.34358 11.3395 2.9882 10.36L3.0862 10.22L2.5262 10.12L1.8042 9.97998L2.1962 8.01998C2.9242 8.16498 3.6562 8.29398 4.3882 8.40698L4.4232 8.33198L4.4622 8.21298L4.7382 7.15298L2.1002 4.51498L3.5152 3.09998ZM16.1802 3.99998C16.8211 4.00001 17.4451 4.20528 17.9608 4.5857C18.4766 4.96612 18.8569 5.5017 19.0462 6.11398L19.0942 6.28598L19.6122 8.40698C20.1037 8.33096 20.5941 8.24762 21.0832 8.15698L21.8032 8.01898L22.1952 9.98098L21.5352 10.108L20.8752 10.227L20.9322 10.303C21.5724 11.2279 21.9397 12.3143 21.9922 13.438L21.9992 13.719V18.758L19.9992 16.758V13.719C19.9991 12.9226 19.7613 12.1444 19.3162 11.484L19.1772 11.29L18.6242 10.566C17.1503 10.7554 15.6689 10.8815 14.1842 10.944L12.2302 8.98998C14.0302 8.98098 15.8302 8.87598 17.6202 8.67298L17.1522 6.76298C17.1038 6.56417 16.9956 6.385 16.8422 6.24964C16.6887 6.11427 16.4975 6.02922 16.2942 6.00598L16.1812 5.99998H9.2402L7.2992 4.05598C7.4312 4.02998 7.5662 4.01298 7.7022 4.00598L7.8802 3.99998H16.1822H16.1802ZM9.0002 13V15H6.0002V13H9.0002ZM18.0002 13V14.758L16.2422 13H18.0002Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_755">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}
