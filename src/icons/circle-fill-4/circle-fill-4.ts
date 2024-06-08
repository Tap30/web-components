import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CircleFill4Icon extends TapIcon {
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
          d="M1 12C1 5.9346 5.9346 1 12 1C18.0654 1 23 5.9346 23 12C23 18.0654 18.0654 23 12 23C5.9346 23 1 18.0654 1 12ZM11.6673 14.3293C11.6944 15.1533 11.708 15.9241 11.708 16.6417H10.1246C10.1246 15.8115 10.109 14.9885 10.0777 14.1729C10.0464 13.3572 9.97861 12.5739 9.87431 11.8229C9.77 11.0719 9.62085 10.3669 9.42685 9.70766C9.23284 9.04846 8.97313 8.46228 8.64771 7.94911L9.9807 7.11052C10.1184 7.33998 10.2467 7.56528 10.3656 7.7864C10.4845 8.00752 10.5919 8.23281 10.6879 8.46228C10.8047 8.23699 10.9465 8.03568 11.1134 7.85837C11.2803 7.68105 11.4649 7.52981 11.6673 7.40465C11.8696 7.27949 12.0855 7.18144 12.315 7.11052C12.5445 7.03959 12.7823 6.99787 13.0284 6.98535H13.1598C13.3184 6.98535 13.4967 6.99787 13.6949 7.0229C13.8931 7.04793 14.1017 7.09904 14.3207 7.17623C14.5398 7.25341 14.7473 7.35667 14.9434 7.48601C15.1395 7.61534 15.3085 7.77597 15.4503 7.96789L14.5554 9.08184L14.4303 9.00048C14.3468 8.94625 14.2373 8.88784 14.1017 8.82525C13.9661 8.76267 13.8117 8.70426 13.6386 8.65003C13.4655 8.59579 13.2892 8.56658 13.1098 8.56241C12.9554 8.58327 12.7927 8.62917 12.6216 8.70009C12.4506 8.77102 12.2941 8.85967 12.1523 8.96606C12.0104 9.07245 11.8957 9.1924 11.8081 9.32591C11.733 9.43856 11.6954 9.55538 11.6954 9.67637C11.6954 9.69723 11.6975 9.71809 11.7017 9.73895C11.7309 9.89332 11.8018 10.0237 11.9145 10.1301C12.0271 10.2365 12.1617 10.323 12.3181 10.3898C12.4746 10.4566 12.6425 10.5045 12.8219 10.5337C13.0013 10.5629 13.1724 10.5775 13.3351 10.5775C13.4894 10.5775 13.6511 10.5619 13.8201 10.5306C13.9891 10.4993 14.1559 10.4586 14.3207 10.4086C14.4855 10.3585 14.6462 10.2991 14.8026 10.2302C14.9591 10.1614 15.0999 10.0894 15.225 10.0143L15.9197 11.3098C15.49 11.6268 15.0602 11.8438 14.6305 11.9606C14.2008 12.0774 13.7773 12.1358 13.3601 12.1358C13.018 12.1358 12.6832 12.0962 12.3557 12.0169C12.0282 11.9377 11.7267 11.8104 11.4514 11.6352C11.5682 12.6073 11.6402 13.5053 11.6673 14.3293Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}
