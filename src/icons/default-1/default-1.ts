import {html} from "lit";
import {TapIcon} from "../../icon";

export class Default1Icon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4261 16.8896V16.1591C13.4261 15.7881 13.4238 15.3893 13.4191 14.9626C13.4145 14.5359 13.4041 14.1035 13.3878 13.6652C13.3716 13.2269 13.3496 12.7956 13.3217 12.3713C13.2939 11.9469 13.2568 11.5539 13.2104 11.1922C13.1455 10.7145 13.0783 10.2449 13.0087 9.78347C12.9391 9.32202 12.8533 8.87912 12.7513 8.45477C12.6493 8.03043 12.5275 7.62695 12.3861 7.24434C12.2446 6.86173 12.0672 6.50579 11.8539 6.17651L10.3861 7.08086C10.5901 7.45651 10.7629 7.87622 10.9043 8.33999C11.0458 8.80376 11.1641 9.29883 11.2591 9.82521C11.3542 10.3516 11.4284 10.9046 11.4817 11.4843C11.5351 12.064 11.5757 12.6542 11.6035 13.2548C11.6313 13.8554 11.6487 14.4629 11.6557 15.0774C11.6626 15.6919 11.6661 16.2959 11.6661 16.8896H13.4261Z" fill="currentColor"/>
      </svg>
      `);
  }
}
