import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PencilLineIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.7168 4.11925L16.8263 4.22092L19.6547 7.04935C20.4002 7.79489 20.4341 8.98261 19.7564 9.76835L19.6547 9.87777L9.4623 20.0702H5.30545C4.5288 20.0702 3.89001 19.4799 3.81319 18.7235L3.80545 18.5702V14.4133L13.9978 4.22092C14.7434 3.47537 15.9311 3.44148 16.7168 4.11925ZM20 18V20H12L14 18H20ZM12.5836 8.46356L5.80601 15.2412V18.0696L8.63514 18.0689L15.4121 11.292L12.5836 8.46356ZM15.4121 5.63513L13.9978 7.04935L16.8263 9.87777L18.2405 8.46356L15.4121 5.63513Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}
