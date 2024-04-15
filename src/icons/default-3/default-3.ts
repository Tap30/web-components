import {html} from "lit";
import {TapIcon} from "../../icon";

export class Default3Icon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5983 16.8409C11.5983 16.4142 11.5948 15.9493 11.5878 15.4461C11.5809 14.9429 11.567 14.4304 11.5461 13.9087C11.5252 13.387 11.4974 12.8722 11.4626 12.3644C11.4278 11.8565 11.3826 11.3847 11.327 10.9487V10.907C11.5078 10.9533 11.7212 10.9765 11.967 10.9765C12.1525 10.9765 12.3217 10.958 12.4748 10.9209C12.6278 10.8838 12.7704 10.8293 12.9026 10.7574C13.0348 10.6855 13.1588 10.5974 13.2748 10.4931C13.3907 10.3887 13.5067 10.2716 13.6226 10.1418C13.7478 10.2809 13.8823 10.3968 14.0261 10.4896C14.1699 10.5823 14.3148 10.6554 14.4609 10.7087C14.607 10.762 14.7496 10.7991 14.8887 10.82C15.0278 10.8409 15.1554 10.8513 15.2713 10.8513C15.5959 10.8513 15.8754 10.7876 16.1096 10.66C16.3438 10.5325 16.5583 10.3574 16.753 10.1348C16.9525 9.88436 17.1078 9.59683 17.2191 9.27219C17.3304 8.94755 17.3861 8.54871 17.3861 8.07567C17.3861 7.94117 17.3814 7.8148 17.3722 7.69654C17.3629 7.57828 17.3501 7.46002 17.3339 7.34175C17.3177 7.22349 17.298 7.09828 17.2748 6.9661C17.2516 6.83393 17.2261 6.68668 17.1983 6.52436L17.1287 6.14175L15.3965 6.46175C15.429 6.58233 15.4649 6.7203 15.5043 6.87567C15.5438 7.03103 15.5797 7.19103 15.6122 7.35567C15.6446 7.5203 15.6713 7.68494 15.6922 7.84958C15.713 8.01422 15.7235 8.1661 15.7235 8.30523C15.7235 8.52784 15.691 8.71451 15.6261 8.86523C15.5612 9.01596 15.4429 9.09132 15.2713 9.09132C15.2528 9.09132 15.2168 9.08784 15.1635 9.08088C15.1101 9.07393 15.051 9.05306 14.9861 9.01828C14.9212 8.98349 14.8551 8.92668 14.7878 8.84784C14.7206 8.769 14.6638 8.6577 14.6174 8.51393C14.571 8.33306 14.5281 8.16958 14.4887 8.02349C14.4493 7.87741 14.4145 7.729 14.3843 7.57828C14.3542 7.42755 14.3299 7.26871 14.3113 7.10175C14.2928 6.9348 14.2812 6.74233 14.2765 6.52436L12.607 6.74002C12.6116 6.78175 12.6174 6.84552 12.6243 6.93132C12.6313 7.01712 12.6371 7.10871 12.6417 7.2061C12.6464 7.30349 12.6499 7.39625 12.6522 7.48436C12.6545 7.57248 12.6557 7.63741 12.6557 7.67915C12.6464 7.86929 12.6348 8.05712 12.6209 8.24262C12.607 8.42813 12.578 8.59393 12.5339 8.74002C12.4899 8.8861 12.4238 9.0032 12.3357 9.09132C12.2475 9.17944 12.1246 9.22349 11.967 9.22349C11.8371 9.22349 11.7223 9.2003 11.6226 9.15393C11.5229 9.10755 11.4278 9.03219 11.3374 8.92784C11.247 8.82349 11.1577 8.69016 11.0696 8.52784C10.9814 8.36552 10.8841 8.16842 10.7774 7.93654C10.7403 7.84378 10.702 7.74987 10.6626 7.6548C10.6232 7.55973 10.5826 7.46581 10.5409 7.37306C10.4713 7.21074 10.3901 7.03799 10.2974 6.8548C10.2046 6.67161 10.1096 6.49886 10.0122 6.33654L8.42609 7.26175C8.64406 7.63277 8.83072 8.03625 8.98609 8.47219C9.14145 8.90813 9.27246 9.36146 9.37913 9.83219C9.4858 10.3029 9.57043 10.7841 9.63304 11.2757C9.69565 11.7673 9.74435 12.2554 9.77913 12.74C9.81391 13.2247 9.83594 13.6965 9.84522 14.1557C9.85449 14.6148 9.85913 15.0484 9.85913 15.4565V15.7765C9.85913 15.8971 9.85797 16.0212 9.85565 16.1487C9.85333 16.2762 9.84985 16.4003 9.84522 16.5209C9.84058 16.6415 9.83594 16.7481 9.8313 16.8409H11.5983Z" fill="currentColor"/>
      </svg>
      `);
  }
}
