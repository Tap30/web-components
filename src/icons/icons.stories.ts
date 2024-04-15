import {html, TemplateResult} from "lit";
import "./index";


export default {
  title: "Icons",
  component: "tap-icon",
  argTypes: {
    color: {
      control: {type: "text"},
      description: "The icon color",
    },
    width: {
      control: {type: "number"},
      description: "The icon width(`px`)",
    },
    height: {
      control: {type: "number"},
      description: "The icon height(`px`)",
    },
  },
};


interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  color?: string,
  width?: number,
  height?: number,
}

const IconSetTemplate: Story<ArgTypes> = ({color, width, height}: ArgTypes) => html`
  <div><tap-icon-alarm-clock color=${color} width=${width} height=${height}></tap-icon-alarm-clock> <code>&lt;tap-icon-alarm-clock&gt;</code></div>
  <div><tap-icon-alarm-clock-fill color=${color} width=${width} height=${height}></tap-icon-alarm-clock-fill> <code>&lt;tap-icon-alarm-clock-fill&gt;</code></div>
  <div><tap-icon-arrow-top-right color=${color} width=${width} height=${height}></tap-icon-arrow-top-right> <code>&lt;tap-icon-arrow-top-right&gt;</code></div>
  <div><tap-icon-arrow-top-right-fill color=${color} width=${width} height=${height}></tap-icon-arrow-top-right-fill> <code>&lt;tap-icon-arrow-top-right-fill&gt;</code></div>
  <div><tap-icon-arrow-top-right-question color=${color} width=${width} height=${height}></tap-icon-arrow-top-right-question> <code>&lt;tap-icon-arrow-top-right-question&gt;</code></div>
  <div><tap-icon-arrow-top-right-question-fill color=${color} width=${width} height=${height}></tap-icon-arrow-top-right-question-fill> <code>&lt;tap-icon-arrow-top-right-question-fill&gt;</code></div>
  <div><tap-icon-banknote color=${color} width=${width} height=${height}></tap-icon-banknote> <code>&lt;tap-icon-banknote&gt;</code></div>
  <div><tap-icon-banknote-fill color=${color} width=${width} height=${height}></tap-icon-banknote-fill> <code>&lt;tap-icon-banknote-fill&gt;</code></div>
  <div><tap-icon-banknote-two color=${color} width=${width} height=${height}></tap-icon-banknote-two> <code>&lt;tap-icon-banknote-two&gt;</code></div>
  <div><tap-icon-banknote-two-fill color=${color} width=${width} height=${height}></tap-icon-banknote-two-fill> <code>&lt;tap-icon-banknote-two-fill&gt;</code></div>
  <div><tap-icon-bell color=${color} width=${width} height=${height}></tap-icon-bell> <code>&lt;tap-icon-bell&gt;</code></div>
  <div><tap-icon-bell-dot-fill color=${color} width=${width} height=${height}></tap-icon-bell-dot-fill> <code>&lt;tap-icon-bell-dot-fill&gt;</code></div>
  <div><tap-icon-bell-fill color=${color} width=${width} height=${height}></tap-icon-bell-fill> <code>&lt;tap-icon-bell-fill&gt;</code></div>
  <div><tap-icon-bookmark color=${color} width=${width} height=${height}></tap-icon-bookmark> <code>&lt;tap-icon-bookmark&gt;</code></div>
  <div><tap-icon-bookmark-fill color=${color} width=${width} height=${height}></tap-icon-bookmark-fill> <code>&lt;tap-icon-bookmark-fill&gt;</code></div>
  <div><tap-icon-box color=${color} width=${width} height=${height}></tap-icon-box> <code>&lt;tap-icon-box&gt;</code></div>
  <div><tap-icon-box-check color=${color} width=${width} height=${height}></tap-icon-box-check> <code>&lt;tap-icon-box-check&gt;</code></div>
  <div><tap-icon-box-fill color=${color} width=${width} height=${height}></tap-icon-box-fill> <code>&lt;tap-icon-box-fill&gt;</code></div>
  <div><tap-icon-briefcase color=${color} width=${width} height=${height}></tap-icon-briefcase> <code>&lt;tap-icon-briefcase&gt;</code></div>
  <div><tap-icon-briefcase-fill color=${color} width=${width} height=${height}></tap-icon-briefcase-fill> <code>&lt;tap-icon-briefcase-fill&gt;</code></div>
  <div><tap-icon-building color=${color} width=${width} height=${height}></tap-icon-building> <code>&lt;tap-icon-building&gt;</code></div>
  <div><tap-icon-building-fill color=${color} width=${width} height=${height}></tap-icon-building-fill> <code>&lt;tap-icon-building-fill&gt;</code></div>
  <div><tap-icon-calendar color=${color} width=${width} height=${height}></tap-icon-calendar> <code>&lt;tap-icon-calendar&gt;</code></div>
  <div><tap-icon-calendar-fill color=${color} width=${width} height=${height}></tap-icon-calendar-fill> <code>&lt;tap-icon-calendar-fill&gt;</code></div>
  <div><tap-icon-call-dialog-box color=${color} width=${width} height=${height}></tap-icon-call-dialog-box> <code>&lt;tap-icon-call-dialog-box&gt;</code></div>
  <div><tap-icon-call-left color=${color} width=${width} height=${height}></tap-icon-call-left> <code>&lt;tap-icon-call-left&gt;</code></div>
  <div><tap-icon-call-left-slash color=${color} width=${width} height=${height}></tap-icon-call-left-slash> <code>&lt;tap-icon-call-left-slash&gt;</code></div>
  <div><tap-icon-call-righ color=${color} width=${width} height=${height}></tap-icon-call-righ> <code>&lt;tap-icon-call-righ&gt;</code></div>
  <div><tap-icon-call-right-slash color=${color} width=${width} height=${height}></tap-icon-call-right-slash> <code>&lt;tap-icon-call-right-slash&gt;</code></div>
  <div><tap-icon-camera color=${color} width=${width} height=${height}></tap-icon-camera> <code>&lt;tap-icon-camera&gt;</code></div>
  <div><tap-icon-camera-fill color=${color} width=${width} height=${height}></tap-icon-camera-fill> <code>&lt;tap-icon-camera-fill&gt;</code></div>
  <div><tap-icon-camera-plus color=${color} width=${width} height=${height}></tap-icon-camera-plus> <code>&lt;tap-icon-camera-plus&gt;</code></div>
  <div><tap-icon-car color=${color} width=${width} height=${height}></tap-icon-car> <code>&lt;tap-icon-car&gt;</code></div>
  <div><tap-icon-car-clock color=${color} width=${width} height=${height}></tap-icon-car-clock> <code>&lt;tap-icon-car-clock&gt;</code></div>
  <div><tap-icon-car-clock-fill color=${color} width=${width} height=${height}></tap-icon-car-clock-fill> <code>&lt;tap-icon-car-clock-fill&gt;</code></div>
  <div><tap-icon-car-fill color=${color} width=${width} height=${height}></tap-icon-car-fill> <code>&lt;tap-icon-car-fill&gt;</code></div>
  <div><tap-icon-car-slash color=${color} width=${width} height=${height}></tap-icon-car-slash> <code>&lt;tap-icon-car-slash&gt;</code></div>
  <div><tap-icon-car-slash-fill color=${color} width=${width} height=${height}></tap-icon-car-slash-fill> <code>&lt;tap-icon-car-slash-fill&gt;</code></div>
  <div><tap-icon-car-spark color=${color} width=${width} height=${height}></tap-icon-car-spark> <code>&lt;tap-icon-car-spark&gt;</code></div>
  <div><tap-icon-card color=${color} width=${width} height=${height}></tap-icon-card> <code>&lt;tap-icon-card&gt;</code></div>
  <div><tap-icon-card-fill color=${color} width=${width} height=${height}></tap-icon-card-fill> <code>&lt;tap-icon-card-fill&gt;</code></div>
  <div><tap-icon-card-left-arrow color=${color} width=${width} height=${height}></tap-icon-card-left-arrow> <code>&lt;tap-icon-card-left-arrow&gt;</code></div>
  <div><tap-icon-card-left-arrow-fill color=${color} width=${width} height=${height}></tap-icon-card-left-arrow-fill> <code>&lt;tap-icon-card-left-arrow-fill&gt;</code></div>
  <div><tap-icon-card-plus color=${color} width=${width} height=${height}></tap-icon-card-plus> <code>&lt;tap-icon-card-plus&gt;</code></div>
  <div><tap-icon-card-plus-fill color=${color} width=${width} height=${height}></tap-icon-card-plus-fill> <code>&lt;tap-icon-card-plus-fill&gt;</code></div>
  <div><tap-icon-card-right-arrow color=${color} width=${width} height=${height}></tap-icon-card-right-arrow> <code>&lt;tap-icon-card-right-arrow&gt;</code></div>
  <div><tap-icon-card-right-arrow-fill color=${color} width=${width} height=${height}></tap-icon-card-right-arrow-fill> <code>&lt;tap-icon-card-right-arrow-fill&gt;</code></div>
  <div><tap-icon-card-spark color=${color} width=${width} height=${height}></tap-icon-card-spark> <code>&lt;tap-icon-card-spark&gt;</code></div>
  <div><tap-icon-card-spark-fill color=${color} width=${width} height=${height}></tap-icon-card-spark-fill> <code>&lt;tap-icon-card-spark-fill&gt;</code></div>
  <div><tap-icon-card-time color=${color} width=${width} height=${height}></tap-icon-card-time> <code>&lt;tap-icon-card-time&gt;</code></div>
  <div><tap-icon-card-time-fill color=${color} width=${width} height=${height}></tap-icon-card-time-fill> <code>&lt;tap-icon-card-time-fill&gt;</code></div>
  <div><tap-icon-check color=${color} width=${width} height=${height}></tap-icon-check> <code>&lt;tap-icon-check&gt;</code></div>
  <div><tap-icon-check-fill color=${color} width=${width} height=${height}></tap-icon-check-fill> <code>&lt;tap-icon-check-fill&gt;</code></div>
  <div><tap-icon-circle-check color=${color} width=${width} height=${height}></tap-icon-circle-check> <code>&lt;tap-icon-circle-check&gt;</code></div>
  <div><tap-icon-circle-check-fill color=${color} width=${width} height=${height}></tap-icon-circle-check-fill> <code>&lt;tap-icon-circle-check-fill&gt;</code></div>
  <div><tap-icon-circle-check-small color=${color} width=${width} height=${height}></tap-icon-circle-check-small> <code>&lt;tap-icon-circle-check-small&gt;</code></div>
  <div><tap-icon-circle-check-small-fill color=${color} width=${width} height=${height}></tap-icon-circle-check-small-fill> <code>&lt;tap-icon-circle-check-small-fill&gt;</code></div>
  <div><tap-icon-circle-cross color=${color} width=${width} height=${height}></tap-icon-circle-cross> <code>&lt;tap-icon-circle-cross&gt;</code></div>
  <div><tap-icon-circle-cross-fill color=${color} width=${width} height=${height}></tap-icon-circle-cross-fill> <code>&lt;tap-icon-circle-cross-fill&gt;</code></div>
  <div><tap-icon-circle-exclamation color=${color} width=${width} height=${height}></tap-icon-circle-exclamation> <code>&lt;tap-icon-circle-exclamation&gt;</code></div>
  <div><tap-icon-circle-exclamation-fill color=${color} width=${width} height=${height}></tap-icon-circle-exclamation-fill> <code>&lt;tap-icon-circle-exclamation-fill&gt;</code></div>
  <div><tap-icon-circle-fill-1 color=${color} width=${width} height=${height}></tap-icon-circle-fill-1> <code>&lt;tap-icon-circle-fill-1&gt;</code></div>
  <div><tap-icon-circle-fill-2 color=${color} width=${width} height=${height}></tap-icon-circle-fill-2> <code>&lt;tap-icon-circle-fill-2&gt;</code></div>
  <div><tap-icon-circle-fill-3 color=${color} width=${width} height=${height}></tap-icon-circle-fill-3> <code>&lt;tap-icon-circle-fill-3&gt;</code></div>
  <div><tap-icon-circle-fill-4 color=${color} width=${width} height=${height}></tap-icon-circle-fill-4> <code>&lt;tap-icon-circle-fill-4&gt;</code></div>
  <div><tap-icon-circle-fill-5 color=${color} width=${width} height=${height}></tap-icon-circle-fill-5> <code>&lt;tap-icon-circle-fill-5&gt;</code></div>
  <div><tap-icon-circle-fill-6 color=${color} width=${width} height=${height}></tap-icon-circle-fill-6> <code>&lt;tap-icon-circle-fill-6&gt;</code></div>
  <div><tap-icon-circle-fill-7 color=${color} width=${width} height=${height}></tap-icon-circle-fill-7> <code>&lt;tap-icon-circle-fill-7&gt;</code></div>
  <div><tap-icon-circle-fill-8 color=${color} width=${width} height=${height}></tap-icon-circle-fill-8> <code>&lt;tap-icon-circle-fill-8&gt;</code></div>
  <div><tap-icon-circle-fill-9 color=${color} width=${width} height=${height}></tap-icon-circle-fill-9> <code>&lt;tap-icon-circle-fill-9&gt;</code></div>
  <div><tap-icon-circle-information color=${color} width=${width} height=${height}></tap-icon-circle-information> <code>&lt;tap-icon-circle-information&gt;</code></div>
  <div><tap-icon-circle-information-fill color=${color} width=${width} height=${height}></tap-icon-circle-information-fill> <code>&lt;tap-icon-circle-information-fill&gt;</code></div>
  <div><tap-icon-circle-minus color=${color} width=${width} height=${height}></tap-icon-circle-minus> <code>&lt;tap-icon-circle-minus&gt;</code></div>
  <div><tap-icon-circle-minus-fill color=${color} width=${width} height=${height}></tap-icon-circle-minus-fill> <code>&lt;tap-icon-circle-minus-fill&gt;</code></div>
  <div><tap-icon-circle-more-fill color=${color} width=${width} height=${height}></tap-icon-circle-more-fill> <code>&lt;tap-icon-circle-more-fill&gt;</code></div>
  <div><tap-icon-circle-outline-1 color=${color} width=${width} height=${height}></tap-icon-circle-outline-1> <code>&lt;tap-icon-circle-outline-1&gt;</code></div>
  <div><tap-icon-circle-outline-2 color=${color} width=${width} height=${height}></tap-icon-circle-outline-2> <code>&lt;tap-icon-circle-outline-2&gt;</code></div>
  <div><tap-icon-circle-outline-3 color=${color} width=${width} height=${height}></tap-icon-circle-outline-3> <code>&lt;tap-icon-circle-outline-3&gt;</code></div>
  <div><tap-icon-circle-outline-4 color=${color} width=${width} height=${height}></tap-icon-circle-outline-4> <code>&lt;tap-icon-circle-outline-4&gt;</code></div>
  <div><tap-icon-circle-outline-5 color=${color} width=${width} height=${height}></tap-icon-circle-outline-5> <code>&lt;tap-icon-circle-outline-5&gt;</code></div>
  <div><tap-icon-circle-outline-6 color=${color} width=${width} height=${height}></tap-icon-circle-outline-6> <code>&lt;tap-icon-circle-outline-6&gt;</code></div>
  <div><tap-icon-circle-outline-7 color=${color} width=${width} height=${height}></tap-icon-circle-outline-7> <code>&lt;tap-icon-circle-outline-7&gt;</code></div>
  <div><tap-icon-circle-outline-8 color=${color} width=${width} height=${height}></tap-icon-circle-outline-8> <code>&lt;tap-icon-circle-outline-8&gt;</code></div>
  <div><tap-icon-circle-outline-9 color=${color} width=${width} height=${height}></tap-icon-circle-outline-9> <code>&lt;tap-icon-circle-outline-9&gt;</code></div>
  <div><tap-icon-circle-person color=${color} width=${width} height=${height}></tap-icon-circle-person> <code>&lt;tap-icon-circle-person&gt;</code></div>
  <div><tap-icon-circle-person-fill color=${color} width=${width} height=${height}></tap-icon-circle-person-fill> <code>&lt;tap-icon-circle-person-fill&gt;</code></div>
  <div><tap-icon-circle-person-fill-1 color=${color} width=${width} height=${height}></tap-icon-circle-person-fill-1> <code>&lt;tap-icon-circle-person-fill-1&gt;</code></div>
  <div><tap-icon-circle-plus color=${color} width=${width} height=${height}></tap-icon-circle-plus> <code>&lt;tap-icon-circle-plus&gt;</code></div>
  <div><tap-icon-circle-plus-fill color=${color} width=${width} height=${height}></tap-icon-circle-plus-fill> <code>&lt;tap-icon-circle-plus-fill&gt;</code></div>
  <div><tap-icon-circle-question-fill color=${color} width=${width} height=${height}></tap-icon-circle-question-fill> <code>&lt;tap-icon-circle-question-fill&gt;</code></div>
  <div><tap-icon-circle-star color=${color} width=${width} height=${height}></tap-icon-circle-star> <code>&lt;tap-icon-circle-star&gt;</code></div>
  <div><tap-icon-circle-star-fill color=${color} width=${width} height=${height}></tap-icon-circle-star-fill> <code>&lt;tap-icon-circle-star-fill&gt;</code></div>
  <div><tap-icon-circle-thunder color=${color} width=${width} height=${height}></tap-icon-circle-thunder> <code>&lt;tap-icon-circle-thunder&gt;</code></div>
  <div><tap-icon-circle-thunder-fill color=${color} width=${width} height=${height}></tap-icon-circle-thunder-fill> <code>&lt;tap-icon-circle-thunder-fill&gt;</code></div>
  <div><tap-icon-clipboard-clock color=${color} width=${width} height=${height}></tap-icon-clipboard-clock> <code>&lt;tap-icon-clipboard-clock&gt;</code></div>
  <div><tap-icon-clipboard-clock-fill color=${color} width=${width} height=${height}></tap-icon-clipboard-clock-fill> <code>&lt;tap-icon-clipboard-clock-fill&gt;</code></div>
  <div><tap-icon-clips-together color=${color} width=${width} height=${height}></tap-icon-clips-together> <code>&lt;tap-icon-clips-together&gt;</code></div>
  <div><tap-icon-clock color=${color} width=${width} height=${height}></tap-icon-clock> <code>&lt;tap-icon-clock&gt;</code></div>
  <div><tap-icon-clock-arrow-circlepath color=${color} width=${width} height=${height}></tap-icon-clock-arrow-circlepath> <code>&lt;tap-icon-clock-arrow-circlepath&gt;</code></div>
  <div><tap-icon-clock-dashed color=${color} width=${width} height=${height}></tap-icon-clock-dashed> <code>&lt;tap-icon-clock-dashed&gt;</code></div>
  <div><tap-icon-clock-fill color=${color} width=${width} height=${height}></tap-icon-clock-fill> <code>&lt;tap-icon-clock-fill&gt;</code></div>
  <div><tap-icon-clock-small color=${color} width=${width} height=${height}></tap-icon-clock-small> <code>&lt;tap-icon-clock-small&gt;</code></div>
  <div><tap-icon-clock-small-fill color=${color} width=${width} height=${height}></tap-icon-clock-small-fill> <code>&lt;tap-icon-clock-small-fill&gt;</code></div>
  <div><tap-icon-copy color=${color} width=${width} height=${height}></tap-icon-copy> <code>&lt;tap-icon-copy&gt;</code></div>
  <div><tap-icon-copy-fill color=${color} width=${width} height=${height}></tap-icon-copy-fill> <code>&lt;tap-icon-copy-fill&gt;</code></div>
  <div><tap-icon-coupon color=${color} width=${width} height=${height}></tap-icon-coupon> <code>&lt;tap-icon-coupon&gt;</code></div>
  <div><tap-icon-coupon-fill color=${color} width=${width} height=${height}></tap-icon-coupon-fill> <code>&lt;tap-icon-coupon-fill&gt;</code></div>
  <div><tap-icon-coupon-puched color=${color} width=${width} height=${height}></tap-icon-coupon-puched> <code>&lt;tap-icon-coupon-puched&gt;</code></div>
  <div><tap-icon-coupon-puched-fill color=${color} width=${width} height=${height}></tap-icon-coupon-puched-fill> <code>&lt;tap-icon-coupon-puched-fill&gt;</code></div>
  <div><tap-icon-cross color=${color} width=${width} height=${height}></tap-icon-cross> <code>&lt;tap-icon-cross&gt;</code></div>
  <div><tap-icon-cross-fill color=${color} width=${width} height=${height}></tap-icon-cross-fill> <code>&lt;tap-icon-cross-fill&gt;</code></div>
  <div><tap-icon-default color=${color} width=${width} height=${height}></tap-icon-default> <code>&lt;tap-icon-default&gt;</code></div>
  <div><tap-icon-default-1 color=${color} width=${width} height=${height}></tap-icon-default-1> <code>&lt;tap-icon-default-1&gt;</code></div>
  <div><tap-icon-default-2 color=${color} width=${width} height=${height}></tap-icon-default-2> <code>&lt;tap-icon-default-2&gt;</code></div>
  <div><tap-icon-default-3 color=${color} width=${width} height=${height}></tap-icon-default-3> <code>&lt;tap-icon-default-3&gt;</code></div>
  <div><tap-icon-default-4 color=${color} width=${width} height=${height}></tap-icon-default-4> <code>&lt;tap-icon-default-4&gt;</code></div>
  <div><tap-icon-default-5 color=${color} width=${width} height=${height}></tap-icon-default-5> <code>&lt;tap-icon-default-5&gt;</code></div>
  <div><tap-icon-default-6 color=${color} width=${width} height=${height}></tap-icon-default-6> <code>&lt;tap-icon-default-6&gt;</code></div>
  <div><tap-icon-default-7 color=${color} width=${width} height=${height}></tap-icon-default-7> <code>&lt;tap-icon-default-7&gt;</code></div>
  <div><tap-icon-default-8 color=${color} width=${width} height=${height}></tap-icon-default-8> <code>&lt;tap-icon-default-8&gt;</code></div>
  <div><tap-icon-default-9 color=${color} width=${width} height=${height}></tap-icon-default-9> <code>&lt;tap-icon-default-9&gt;</code></div>
  <div><tap-icon-default-fill color=${color} width=${width} height=${height}></tap-icon-default-fill> <code>&lt;tap-icon-default-fill&gt;</code></div>
  <div><tap-icon-dialog-box-text color=${color} width=${width} height=${height}></tap-icon-dialog-box-text> <code>&lt;tap-icon-dialog-box-text&gt;</code></div>
  <div><tap-icon-dialog-box-text-fill color=${color} width=${width} height=${height}></tap-icon-dialog-box-text-fill> <code>&lt;tap-icon-dialog-box-text-fill&gt;</code></div>
  <div><tap-icon-dialogbox-question color=${color} width=${width} height=${height}></tap-icon-dialogbox-question> <code>&lt;tap-icon-dialogbox-question&gt;</code></div>
  <div><tap-icon-diamond-arrow-turn-right color=${color} width=${width} height=${height}></tap-icon-diamond-arrow-turn-right> <code>&lt;tap-icon-diamond-arrow-turn-right&gt;</code></div>
  <div><tap-icon-diamond-arrow-turn-right-1 color=${color} width=${width} height=${height}></tap-icon-diamond-arrow-turn-right-1> <code>&lt;tap-icon-diamond-arrow-turn-right-1&gt;</code></div>
  <div><tap-icon-dot-fill color=${color} width=${width} height=${height}></tap-icon-dot-fill> <code>&lt;tap-icon-dot-fill&gt;</code></div>
  <div><tap-icon-double-check color=${color} width=${width} height=${height}></tap-icon-double-check> <code>&lt;tap-icon-double-check&gt;</code></div>
  <div><tap-icon-ear-slash color=${color} width=${width} height=${height}></tap-icon-ear-slash> <code>&lt;tap-icon-ear-slash&gt;</code></div>
  <div><tap-icon-envelope color=${color} width=${width} height=${height}></tap-icon-envelope> <code>&lt;tap-icon-envelope&gt;</code></div>
  <div><tap-icon-envelope-fill color=${color} width=${width} height=${height}></tap-icon-envelope-fill> <code>&lt;tap-icon-envelope-fill&gt;</code></div>
  <div><tap-icon-envelope-open color=${color} width=${width} height=${height}></tap-icon-envelope-open> <code>&lt;tap-icon-envelope-open&gt;</code></div>
  <div><tap-icon-envelope-open-fill color=${color} width=${width} height=${height}></tap-icon-envelope-open-fill> <code>&lt;tap-icon-envelope-open-fill&gt;</code></div>
  <div><tap-icon-exclamation color=${color} width=${width} height=${height}></tap-icon-exclamation> <code>&lt;tap-icon-exclamation&gt;</code></div>
  <div><tap-icon-exclamation-fill color=${color} width=${width} height=${height}></tap-icon-exclamation-fill> <code>&lt;tap-icon-exclamation-fill&gt;</code></div>
  <div><tap-icon-eye color=${color} width=${width} height=${height}></tap-icon-eye> <code>&lt;tap-icon-eye&gt;</code></div>
  <div><tap-icon-eye-fill color=${color} width=${width} height=${height}></tap-icon-eye-fill> <code>&lt;tap-icon-eye-fill&gt;</code></div>
  <div><tap-icon-eye-slash color=${color} width=${width} height=${height}></tap-icon-eye-slash> <code>&lt;tap-icon-eye-slash&gt;</code></div>
  <div><tap-icon-eye-slash-fill color=${color} width=${width} height=${height}></tap-icon-eye-slash-fill> <code>&lt;tap-icon-eye-slash-fill&gt;</code></div>
  <div><tap-icon-face-sad color=${color} width=${width} height=${height}></tap-icon-face-sad> <code>&lt;tap-icon-face-sad&gt;</code></div>
  <div><tap-icon-face-sad-fill color=${color} width=${width} height=${height}></tap-icon-face-sad-fill> <code>&lt;tap-icon-face-sad-fill&gt;</code></div>
  <div><tap-icon-face-smile color=${color} width=${width} height=${height}></tap-icon-face-smile> <code>&lt;tap-icon-face-smile&gt;</code></div>
  <div><tap-icon-face-smile-fill color=${color} width=${width} height=${height}></tap-icon-face-smile-fill> <code>&lt;tap-icon-face-smile-fill&gt;</code></div>
  <div><tap-icon-finger-left-fill color=${color} width=${width} height=${height}></tap-icon-finger-left-fill> <code>&lt;tap-icon-finger-left-fill&gt;</code></div>
  <div><tap-icon-finger-swipe-vertical color=${color} width=${width} height=${height}></tap-icon-finger-swipe-vertical> <code>&lt;tap-icon-finger-swipe-vertical&gt;</code></div>
  <div><tap-icon-finger-touch color=${color} width=${width} height=${height}></tap-icon-finger-touch> <code>&lt;tap-icon-finger-touch&gt;</code></div>
  <div><tap-icon-finger-up-fill color=${color} width=${width} height=${height}></tap-icon-finger-up-fill> <code>&lt;tap-icon-finger-up-fill&gt;</code></div>
  <div><tap-icon-fire color=${color} width=${width} height=${height}></tap-icon-fire> <code>&lt;tap-icon-fire&gt;</code></div>
  <div><tap-icon-fire-fill color=${color} width=${width} height=${height}></tap-icon-fire-fill> <code>&lt;tap-icon-fire-fill&gt;</code></div>
  <div><tap-icon-flag color=${color} width=${width} height=${height}></tap-icon-flag> <code>&lt;tap-icon-flag&gt;</code></div>
  <div><tap-icon-flag-fill color=${color} width=${width} height=${height}></tap-icon-flag-fill> <code>&lt;tap-icon-flag-fill&gt;</code></div>
  <div><tap-icon-gas-station color=${color} width=${width} height=${height}></tap-icon-gas-station> <code>&lt;tap-icon-gas-station&gt;</code></div>
  <div><tap-icon-gas-station-fill color=${color} width=${width} height=${height}></tap-icon-gas-station-fill> <code>&lt;tap-icon-gas-station-fill&gt;</code></div>
  <div><tap-icon-gear color=${color} width=${width} height=${height}></tap-icon-gear> <code>&lt;tap-icon-gear&gt;</code></div>
  <div><tap-icon-gear-fill color=${color} width=${width} height=${height}></tap-icon-gear-fill> <code>&lt;tap-icon-gear-fill&gt;</code></div>
  <div><tap-icon-gift color=${color} width=${width} height=${height}></tap-icon-gift> <code>&lt;tap-icon-gift&gt;</code></div>
  <div><tap-icon-graduation-cap color=${color} width=${width} height=${height}></tap-icon-graduation-cap> <code>&lt;tap-icon-graduation-cap&gt;</code></div>
  <div><tap-icon-graduation-cap-fill color=${color} width=${width} height=${height}></tap-icon-graduation-cap-fill> <code>&lt;tap-icon-graduation-cap-fill&gt;</code></div>
  <div><tap-icon-headphone color=${color} width=${width} height=${height}></tap-icon-headphone> <code>&lt;tap-icon-headphone&gt;</code></div>
  <div><tap-icon-headphone-fill color=${color} width=${width} height=${height}></tap-icon-headphone-fill> <code>&lt;tap-icon-headphone-fill&gt;</code></div>
  <div><tap-icon-heart color=${color} width=${width} height=${height}></tap-icon-heart> <code>&lt;tap-icon-heart&gt;</code></div>
  <div><tap-icon-heart-broken-fill color=${color} width=${width} height=${height}></tap-icon-heart-broken-fill> <code>&lt;tap-icon-heart-broken-fill&gt;</code></div>
  <div><tap-icon-heart-fill color=${color} width=${width} height=${height}></tap-icon-heart-fill> <code>&lt;tap-icon-heart-fill&gt;</code></div>
  <div><tap-icon-helmets color=${color} width=${width} height=${height}></tap-icon-helmets> <code>&lt;tap-icon-helmets&gt;</code></div>
  <div><tap-icon-helmets-fill color=${color} width=${width} height=${height}></tap-icon-helmets-fill> <code>&lt;tap-icon-helmets-fill&gt;</code></div>
  <div><tap-icon-home color=${color} width=${width} height=${height}></tap-icon-home> <code>&lt;tap-icon-home&gt;</code></div>
  <div><tap-icon-home-fill color=${color} width=${width} height=${height}></tap-icon-home-fill> <code>&lt;tap-icon-home-fill&gt;</code></div>
  <div><tap-icon-hourglass color=${color} width=${width} height=${height}></tap-icon-hourglass> <code>&lt;tap-icon-hourglass&gt;</code></div>
  <div><tap-icon-hourglass-fill color=${color} width=${width} height=${height}></tap-icon-hourglass-fill> <code>&lt;tap-icon-hourglass-fill&gt;</code></div>
  <div><tap-icon-image color=${color} width=${width} height=${height}></tap-icon-image> <code>&lt;tap-icon-image&gt;</code></div>
  <div><tap-icon-image-fill color=${color} width=${width} height=${height}></tap-icon-image-fill> <code>&lt;tap-icon-image-fill&gt;</code></div>
  <div><tap-icon-image-two color=${color} width=${width} height=${height}></tap-icon-image-two> <code>&lt;tap-icon-image-two&gt;</code></div>
  <div><tap-icon-image-two-fill color=${color} width=${width} height=${height}></tap-icon-image-two-fill> <code>&lt;tap-icon-image-two-fill&gt;</code></div>
  <div><tap-icon-info color=${color} width=${width} height=${height}></tap-icon-info> <code>&lt;tap-icon-info&gt;</code></div>
  <div><tap-icon-info-fill color=${color} width=${width} height=${height}></tap-icon-info-fill> <code>&lt;tap-icon-info-fill&gt;</code></div>
  <div><tap-icon-keyboard color=${color} width=${width} height=${height}></tap-icon-keyboard> <code>&lt;tap-icon-keyboard&gt;</code></div>
  <div><tap-icon-keyboard-fill color=${color} width=${width} height=${height}></tap-icon-keyboard-fill> <code>&lt;tap-icon-keyboard-fill&gt;</code></div>
  <div><tap-icon-lamp-spark-fill color=${color} width=${width} height=${height}></tap-icon-lamp-spark-fill> <code>&lt;tap-icon-lamp-spark-fill&gt;</code></div>
  <div><tap-icon-line-three color=${color} width=${width} height=${height}></tap-icon-line-three> <code>&lt;tap-icon-line-three&gt;</code></div>
  <div><tap-icon-line-three-horizontal-decrease color=${color} width=${width} height=${height}></tap-icon-line-three-horizontal-decrease> <code>&lt;tap-icon-line-three-horizontal-decrease&gt;</code></div>
  <div><tap-icon-list-bullet color=${color} width=${width} height=${height}></tap-icon-list-bullet> <code>&lt;tap-icon-list-bullet&gt;</code></div>
  <div><tap-icon-loading color=${color} width=${width} height=${height}></tap-icon-loading> <code>&lt;tap-icon-loading&gt;</code></div>
  <div><tap-icon-location-left color=${color} width=${width} height=${height}></tap-icon-location-left> <code>&lt;tap-icon-location-left&gt;</code></div>
  <div><tap-icon-location-up color=${color} width=${width} height=${height}></tap-icon-location-up> <code>&lt;tap-icon-location-up&gt;</code></div>
  <div><tap-icon-lock color=${color} width=${width} height=${height}></tap-icon-lock> <code>&lt;tap-icon-lock&gt;</code></div>
  <div><tap-icon-lock-fill color=${color} width=${width} height=${height}></tap-icon-lock-fill> <code>&lt;tap-icon-lock-fill&gt;</code></div>
  <div><tap-icon-lock-small color=${color} width=${width} height=${height}></tap-icon-lock-small> <code>&lt;tap-icon-lock-small&gt;</code></div>
  <div><tap-icon-lock-small-fill color=${color} width=${width} height=${height}></tap-icon-lock-small-fill> <code>&lt;tap-icon-lock-small-fill&gt;</code></div>
  <div><tap-icon-magnifier color=${color} width=${width} height=${height}></tap-icon-magnifier> <code>&lt;tap-icon-magnifier&gt;</code></div>
  <div><tap-icon-magnifier-fill color=${color} width=${width} height=${height}></tap-icon-magnifier-fill> <code>&lt;tap-icon-magnifier-fill&gt;</code></div>
  <div><tap-icon-map color=${color} width=${width} height=${height}></tap-icon-map> <code>&lt;tap-icon-map&gt;</code></div>
  <div><tap-icon-map-fill color=${color} width=${width} height=${height}></tap-icon-map-fill> <code>&lt;tap-icon-map-fill&gt;</code></div>
  <div><tap-icon-medal color=${color} width=${width} height=${height}></tap-icon-medal> <code>&lt;tap-icon-medal&gt;</code></div>
  <div><tap-icon-medal-1 color=${color} width=${width} height=${height}></tap-icon-medal-1> <code>&lt;tap-icon-medal-1&gt;</code></div>
  <div><tap-icon-medal-fill color=${color} width=${width} height=${height}></tap-icon-medal-fill> <code>&lt;tap-icon-medal-fill&gt;</code></div>
  <div><tap-icon-medal-fill-1 color=${color} width=${width} height=${height}></tap-icon-medal-fill-1> <code>&lt;tap-icon-medal-fill-1&gt;</code></div>
  <div><tap-icon-microphone color=${color} width=${width} height=${height}></tap-icon-microphone> <code>&lt;tap-icon-microphone&gt;</code></div>
  <div><tap-icon-microphone-fill color=${color} width=${width} height=${height}></tap-icon-microphone-fill> <code>&lt;tap-icon-microphone-fill&gt;</code></div>
  <div><tap-icon-microphone-slash color=${color} width=${width} height=${height}></tap-icon-microphone-slash> <code>&lt;tap-icon-microphone-slash&gt;</code></div>
  <div><tap-icon-microphone-slash-fill color=${color} width=${width} height=${height}></tap-icon-microphone-slash-fill> <code>&lt;tap-icon-microphone-slash-fill&gt;</code></div>
  <div><tap-icon-microphone-spark color=${color} width=${width} height=${height}></tap-icon-microphone-spark> <code>&lt;tap-icon-microphone-spark&gt;</code></div>
  <div><tap-icon-microphone-spark-fill color=${color} width=${width} height=${height}></tap-icon-microphone-spark-fill> <code>&lt;tap-icon-microphone-spark-fill&gt;</code></div>
  <div><tap-icon-minus color=${color} width=${width} height=${height}></tap-icon-minus> <code>&lt;tap-icon-minus&gt;</code></div>
  <div><tap-icon-minus-fill color=${color} width=${width} height=${height}></tap-icon-minus-fill> <code>&lt;tap-icon-minus-fill&gt;</code></div>
  <div><tap-icon-moon color=${color} width=${width} height=${height}></tap-icon-moon> <code>&lt;tap-icon-moon&gt;</code></div>
  <div><tap-icon-moon-fill color=${color} width=${width} height=${height}></tap-icon-moon-fill> <code>&lt;tap-icon-moon-fill&gt;</code></div>
  <div><tap-icon-more-horizontal color=${color} width=${width} height=${height}></tap-icon-more-horizontal> <code>&lt;tap-icon-more-horizontal&gt;</code></div>
  <div><tap-icon-more-horizontal-fill color=${color} width=${width} height=${height}></tap-icon-more-horizontal-fill> <code>&lt;tap-icon-more-horizontal-fill&gt;</code></div>
  <div><tap-icon-more-vertical color=${color} width=${width} height=${height}></tap-icon-more-vertical> <code>&lt;tap-icon-more-vertical&gt;</code></div>
  <div><tap-icon-more-vertical-fill color=${color} width=${width} height=${height}></tap-icon-more-vertical-fill> <code>&lt;tap-icon-more-vertical-fill&gt;</code></div>
  <div><tap-icon-motorcycle color=${color} width=${width} height=${height}></tap-icon-motorcycle> <code>&lt;tap-icon-motorcycle&gt;</code></div>
  <div><tap-icon-pause color=${color} width=${width} height=${height}></tap-icon-pause> <code>&lt;tap-icon-pause&gt;</code></div>
  <div><tap-icon-pencil-line color=${color} width=${width} height=${height}></tap-icon-pencil-line> <code>&lt;tap-icon-pencil-line&gt;</code></div>
  <div><tap-icon-pencil-line-fill color=${color} width=${width} height=${height}></tap-icon-pencil-line-fill> <code>&lt;tap-icon-pencil-line-fill&gt;</code></div>
  <div><tap-icon-person color=${color} width=${width} height=${height}></tap-icon-person> <code>&lt;tap-icon-person&gt;</code></div>
  <div><tap-icon-person-1 color=${color} width=${width} height=${height}></tap-icon-person-1> <code>&lt;tap-icon-person-1&gt;</code></div>
  <div><tap-icon-person-fill color=${color} width=${width} height=${height}></tap-icon-person-fill> <code>&lt;tap-icon-person-fill&gt;</code></div>
  <div><tap-icon-person-fill-1 color=${color} width=${width} height=${height}></tap-icon-person-fill-1> <code>&lt;tap-icon-person-fill-1&gt;</code></div>
  <div><tap-icon-person-in-wheelchair color=${color} width=${width} height=${height}></tap-icon-person-in-wheelchair> <code>&lt;tap-icon-person-in-wheelchair&gt;</code></div>
  <div><tap-icon-person-minus color=${color} width=${width} height=${height}></tap-icon-person-minus> <code>&lt;tap-icon-person-minus&gt;</code></div>
  <div><tap-icon-person-minus-fill color=${color} width=${width} height=${height}></tap-icon-person-minus-fill> <code>&lt;tap-icon-person-minus-fill&gt;</code></div>
  <div><tap-icon-person-plus color=${color} width=${width} height=${height}></tap-icon-person-plus> <code>&lt;tap-icon-person-plus&gt;</code></div>
  <div><tap-icon-person-plus-fill color=${color} width=${width} height=${height}></tap-icon-person-plus-fill> <code>&lt;tap-icon-person-plus-fill&gt;</code></div>
  <div><tap-icon-person-two color=${color} width=${width} height=${height}></tap-icon-person-two> <code>&lt;tap-icon-person-two&gt;</code></div>
  <div><tap-icon-person-two-fill color=${color} width=${width} height=${height}></tap-icon-person-two-fill> <code>&lt;tap-icon-person-two-fill&gt;</code></div>
  <div><tap-icon-person-wave color=${color} width=${width} height=${height}></tap-icon-person-wave> <code>&lt;tap-icon-person-wave&gt;</code></div>
  <div><tap-icon-person-wave-fill color=${color} width=${width} height=${height}></tap-icon-person-wave-fill> <code>&lt;tap-icon-person-wave-fill&gt;</code></div>
  <div><tap-icon-phone color=${color} width=${width} height=${height}></tap-icon-phone> <code>&lt;tap-icon-phone&gt;</code></div>
  <div><tap-icon-phone-fill color=${color} width=${width} height=${height}></tap-icon-phone-fill> <code>&lt;tap-icon-phone-fill&gt;</code></div>
  <div><tap-icon-phone-vibrate color=${color} width=${width} height=${height}></tap-icon-phone-vibrate> <code>&lt;tap-icon-phone-vibrate&gt;</code></div>
  <div><tap-icon-phone-vibrate-fill color=${color} width=${width} height=${height}></tap-icon-phone-vibrate-fill> <code>&lt;tap-icon-phone-vibrate-fill&gt;</code></div>
  <div><tap-icon-pin color=${color} width=${width} height=${height}></tap-icon-pin> <code>&lt;tap-icon-pin&gt;</code></div>
  <div><tap-icon-pin-cross color=${color} width=${width} height=${height}></tap-icon-pin-cross> <code>&lt;tap-icon-pin-cross&gt;</code></div>
  <div><tap-icon-pin-cross-fill color=${color} width=${width} height=${height}></tap-icon-pin-cross-fill> <code>&lt;tap-icon-pin-cross-fill&gt;</code></div>
  <div><tap-icon-pin-fill color=${color} width=${width} height=${height}></tap-icon-pin-fill> <code>&lt;tap-icon-pin-fill&gt;</code></div>
  <div><tap-icon-pin-on-map color=${color} width=${width} height=${height}></tap-icon-pin-on-map> <code>&lt;tap-icon-pin-on-map&gt;</code></div>
  <div><tap-icon-pin-on-map-fill color=${color} width=${width} height=${height}></tap-icon-pin-on-map-fill> <code>&lt;tap-icon-pin-on-map-fill&gt;</code></div>
  <div><tap-icon-pin-wave color=${color} width=${width} height=${height}></tap-icon-pin-wave> <code>&lt;tap-icon-pin-wave&gt;</code></div>
  <div><tap-icon-pin-wave-fill color=${color} width=${width} height=${height}></tap-icon-pin-wave-fill> <code>&lt;tap-icon-pin-wave-fill&gt;</code></div>
  <div><tap-icon-plane color=${color} width=${width} height=${height}></tap-icon-plane> <code>&lt;tap-icon-plane&gt;</code></div>
  <div><tap-icon-plane-fill color=${color} width=${width} height=${height}></tap-icon-plane-fill> <code>&lt;tap-icon-plane-fill&gt;</code></div>
  <div><tap-icon-planet-earth color=${color} width=${width} height=${height}></tap-icon-planet-earth> <code>&lt;tap-icon-planet-earth&gt;</code></div>
  <div><tap-icon-play color=${color} width=${width} height=${height}></tap-icon-play> <code>&lt;tap-icon-play&gt;</code></div>
  <div><tap-icon-plus color=${color} width=${width} height=${height}></tap-icon-plus> <code>&lt;tap-icon-plus&gt;</code></div>
  <div><tap-icon-plus-fill color=${color} width=${width} height=${height}></tap-icon-plus-fill> <code>&lt;tap-icon-plus-fill&gt;</code></div>
  <div><tap-icon-point-three-connected-trianglepath-line color=${color} width=${width} height=${height}></tap-icon-point-three-connected-trianglepath-line> <code>&lt;tap-icon-point-three-connected-trianglepath-line&gt;</code></div>
  <div><tap-icon-point-three-connected-trianglepath-line-fill color=${color} width=${width} height=${height}></tap-icon-point-three-connected-trianglepath-line-fill> <code>&lt;tap-icon-point-three-connected-trianglepath-line-fill&gt;</code></div>
  <div><tap-icon-power color=${color} width=${width} height=${height}></tap-icon-power> <code>&lt;tap-icon-power&gt;</code></div>
  <div><tap-icon-question color=${color} width=${width} height=${height}></tap-icon-question> <code>&lt;tap-icon-question&gt;</code></div>
  <div><tap-icon-record color=${color} width=${width} height=${height}></tap-icon-record> <code>&lt;tap-icon-record&gt;</code></div>
  <div><tap-icon-rectangle-person-text color=${color} width=${width} height=${height}></tap-icon-rectangle-person-text> <code>&lt;tap-icon-rectangle-person-text&gt;</code></div>
  <div><tap-icon-rectangle-person-text-with-badge color=${color} width=${width} height=${height}></tap-icon-rectangle-person-text-with-badge> <code>&lt;tap-icon-rectangle-person-text-with-badge&gt;</code></div>
  <div><tap-icon-send-chat color=${color} width=${width} height=${height}></tap-icon-send-chat> <code>&lt;tap-icon-send-chat&gt;</code></div>
  <div><tap-icon-send-chat-fill color=${color} width=${width} height=${height}></tap-icon-send-chat-fill> <code>&lt;tap-icon-send-chat-fill&gt;</code></div>
  <div><tap-icon-share color=${color} width=${width} height=${height}></tap-icon-share> <code>&lt;tap-icon-share&gt;</code></div>
  <div><tap-icon-share-fill color=${color} width=${width} height=${height}></tap-icon-share-fill> <code>&lt;tap-icon-share-fill&gt;</code></div>
  <div><tap-icon-shield-tick color=${color} width=${width} height=${height}></tap-icon-shield-tick> <code>&lt;tap-icon-shield-tick&gt;</code></div>
  <div><tap-icon-shield-tick-fill color=${color} width=${width} height=${height}></tap-icon-shield-tick-fill> <code>&lt;tap-icon-shield-tick-fill&gt;</code></div>
  <div><tap-icon-shopping-bag color=${color} width=${width} height=${height}></tap-icon-shopping-bag> <code>&lt;tap-icon-shopping-bag&gt;</code></div>
  <div><tap-icon-shopping-bag-fill color=${color} width=${width} height=${height}></tap-icon-shopping-bag-fill> <code>&lt;tap-icon-shopping-bag-fill&gt;</code></div>
  <div><tap-icon-shopping-cart color=${color} width=${width} height=${height}></tap-icon-shopping-cart> <code>&lt;tap-icon-shopping-cart&gt;</code></div>
  <div><tap-icon-shopping-cart-fill color=${color} width=${width} height=${height}></tap-icon-shopping-cart-fill> <code>&lt;tap-icon-shopping-cart-fill&gt;</code></div>
  <div><tap-icon-single-check color=${color} width=${width} height=${height}></tap-icon-single-check> <code>&lt;tap-icon-single-check&gt;</code></div>
  <div><tap-icon-siren color=${color} width=${width} height=${height}></tap-icon-siren> <code>&lt;tap-icon-siren&gt;</code></div>
  <div><tap-icon-siren-fill color=${color} width=${width} height=${height}></tap-icon-siren-fill> <code>&lt;tap-icon-siren-fill&gt;</code></div>
  <div><tap-icon-slider-horizontal color=${color} width=${width} height=${height}></tap-icon-slider-horizontal> <code>&lt;tap-icon-slider-horizontal&gt;</code></div>
  <div><tap-icon-slider-horizontal-fill color=${color} width=${width} height=${height}></tap-icon-slider-horizontal-fill> <code>&lt;tap-icon-slider-horizontal-fill&gt;</code></div>
  <div><tap-icon-spark color=${color} width=${width} height=${height}></tap-icon-spark> <code>&lt;tap-icon-spark&gt;</code></div>
  <div><tap-icon-spark-fill color=${color} width=${width} height=${height}></tap-icon-spark-fill> <code>&lt;tap-icon-spark-fill&gt;</code></div>
  <div><tap-icon-spark-small color=${color} width=${width} height=${height}></tap-icon-spark-small> <code>&lt;tap-icon-spark-small&gt;</code></div>
  <div><tap-icon-spark-small-fill color=${color} width=${width} height=${height}></tap-icon-spark-small-fill> <code>&lt;tap-icon-spark-small-fill&gt;</code></div>
  <div><tap-icon-spark-three color=${color} width=${width} height=${height}></tap-icon-spark-three> <code>&lt;tap-icon-spark-three&gt;</code></div>
  <div><tap-icon-spark-three-fill color=${color} width=${width} height=${height}></tap-icon-spark-three-fill> <code>&lt;tap-icon-spark-three-fill&gt;</code></div>
  <div><tap-icon-speaker-cross color=${color} width=${width} height=${height}></tap-icon-speaker-cross> <code>&lt;tap-icon-speaker-cross&gt;</code></div>
  <div><tap-icon-speaker-exclamation color=${color} width=${width} height=${height}></tap-icon-speaker-exclamation> <code>&lt;tap-icon-speaker-exclamation&gt;</code></div>
  <div><tap-icon-speaker-wave color=${color} width=${width} height=${height}></tap-icon-speaker-wave> <code>&lt;tap-icon-speaker-wave&gt;</code></div>
  <div><tap-icon-spiral-dot-two color=${color} width=${width} height=${height}></tap-icon-spiral-dot-two> <code>&lt;tap-icon-spiral-dot-two&gt;</code></div>
  <div><tap-icon-square-above-squares color=${color} width=${width} height=${height}></tap-icon-square-above-squares> <code>&lt;tap-icon-square-above-squares&gt;</code></div>
  <div><tap-icon-square-fill color=${color} width=${width} height=${height}></tap-icon-square-fill> <code>&lt;tap-icon-square-fill&gt;</code></div>
  <div><tap-icon-square-fill-1 color=${color} width=${width} height=${height}></tap-icon-square-fill-1> <code>&lt;tap-icon-square-fill-1&gt;</code></div>
  <div><tap-icon-square-fill-2 color=${color} width=${width} height=${height}></tap-icon-square-fill-2> <code>&lt;tap-icon-square-fill-2&gt;</code></div>
  <div><tap-icon-square-fill-3 color=${color} width=${width} height=${height}></tap-icon-square-fill-3> <code>&lt;tap-icon-square-fill-3&gt;</code></div>
  <div><tap-icon-square-fill-4 color=${color} width=${width} height=${height}></tap-icon-square-fill-4> <code>&lt;tap-icon-square-fill-4&gt;</code></div>
  <div><tap-icon-square-fill-5 color=${color} width=${width} height=${height}></tap-icon-square-fill-5> <code>&lt;tap-icon-square-fill-5&gt;</code></div>
  <div><tap-icon-square-fill-6 color=${color} width=${width} height=${height}></tap-icon-square-fill-6> <code>&lt;tap-icon-square-fill-6&gt;</code></div>
  <div><tap-icon-square-fill-7 color=${color} width=${width} height=${height}></tap-icon-square-fill-7> <code>&lt;tap-icon-square-fill-7&gt;</code></div>
  <div><tap-icon-square-fill-8 color=${color} width=${width} height=${height}></tap-icon-square-fill-8> <code>&lt;tap-icon-square-fill-8&gt;</code></div>
  <div><tap-icon-square-fill-9 color=${color} width=${width} height=${height}></tap-icon-square-fill-9> <code>&lt;tap-icon-square-fill-9&gt;</code></div>
  <div><tap-icon-square-four color=${color} width=${width} height=${height}></tap-icon-square-four> <code>&lt;tap-icon-square-four&gt;</code></div>
  <div><tap-icon-square-four-fill color=${color} width=${width} height=${height}></tap-icon-square-four-fill> <code>&lt;tap-icon-square-four-fill&gt;</code></div>
  <div><tap-icon-square-grid color=${color} width=${width} height=${height}></tap-icon-square-grid> <code>&lt;tap-icon-square-grid&gt;</code></div>
  <div><tap-icon-square-grid-fill color=${color} width=${width} height=${height}></tap-icon-square-grid-fill> <code>&lt;tap-icon-square-grid-fill&gt;</code></div>
  <div><tap-icon-square-grid-rounded color=${color} width=${width} height=${height}></tap-icon-square-grid-rounded> <code>&lt;tap-icon-square-grid-rounded&gt;</code></div>
  <div><tap-icon-square-grid-rounded-fill color=${color} width=${width} height=${height}></tap-icon-square-grid-rounded-fill> <code>&lt;tap-icon-square-grid-rounded-fill&gt;</code></div>
  <div><tap-icon-square-more color=${color} width=${width} height=${height}></tap-icon-square-more> <code>&lt;tap-icon-square-more&gt;</code></div>
  <div><tap-icon-square-more-fill color=${color} width=${width} height=${height}></tap-icon-square-more-fill> <code>&lt;tap-icon-square-more-fill&gt;</code></div>
  <div><tap-icon-square-outline-1 color=${color} width=${width} height=${height}></tap-icon-square-outline-1> <code>&lt;tap-icon-square-outline-1&gt;</code></div>
  <div><tap-icon-square-outline-2 color=${color} width=${width} height=${height}></tap-icon-square-outline-2> <code>&lt;tap-icon-square-outline-2&gt;</code></div>
  <div><tap-icon-square-outline-3 color=${color} width=${width} height=${height}></tap-icon-square-outline-3> <code>&lt;tap-icon-square-outline-3&gt;</code></div>
  <div><tap-icon-square-outline-4 color=${color} width=${width} height=${height}></tap-icon-square-outline-4> <code>&lt;tap-icon-square-outline-4&gt;</code></div>
  <div><tap-icon-square-outline-5 color=${color} width=${width} height=${height}></tap-icon-square-outline-5> <code>&lt;tap-icon-square-outline-5&gt;</code></div>
  <div><tap-icon-square-outline-6 color=${color} width=${width} height=${height}></tap-icon-square-outline-6> <code>&lt;tap-icon-square-outline-6&gt;</code></div>
  <div><tap-icon-square-outline-7 color=${color} width=${width} height=${height}></tap-icon-square-outline-7> <code>&lt;tap-icon-square-outline-7&gt;</code></div>
  <div><tap-icon-square-outline-8 color=${color} width=${width} height=${height}></tap-icon-square-outline-8> <code>&lt;tap-icon-square-outline-8&gt;</code></div>
  <div><tap-icon-square-outline-9 color=${color} width=${width} height=${height}></tap-icon-square-outline-9> <code>&lt;tap-icon-square-outline-9&gt;</code></div>
  <div><tap-icon-square-person color=${color} width=${width} height=${height}></tap-icon-square-person> <code>&lt;tap-icon-square-person&gt;</code></div>
  <div><tap-icon-square-person-fill color=${color} width=${width} height=${height}></tap-icon-square-person-fill> <code>&lt;tap-icon-square-person-fill&gt;</code></div>
  <div><tap-icon-star color=${color} width=${width} height=${height}></tap-icon-star> <code>&lt;tap-icon-star&gt;</code></div>
  <div><tap-icon-star-fill color=${color} width=${width} height=${height}></tap-icon-star-fill> <code>&lt;tap-icon-star-fill&gt;</code></div>
  <div><tap-icon-steer color=${color} width=${width} height=${height}></tap-icon-steer> <code>&lt;tap-icon-steer&gt;</code></div>
  <div><tap-icon-steer-fill color=${color} width=${width} height=${height}></tap-icon-steer-fill> <code>&lt;tap-icon-steer-fill&gt;</code></div>
  <div><tap-icon-sticky-note color=${color} width=${width} height=${height}></tap-icon-sticky-note> <code>&lt;tap-icon-sticky-note&gt;</code></div>
  <div><tap-icon-sticky-note-fill color=${color} width=${width} height=${height}></tap-icon-sticky-note-fill> <code>&lt;tap-icon-sticky-note-fill&gt;</code></div>
  <div><tap-icon-store color=${color} width=${width} height=${height}></tap-icon-store> <code>&lt;tap-icon-store&gt;</code></div>
  <div><tap-icon-store-fill color=${color} width=${width} height=${height}></tap-icon-store-fill> <code>&lt;tap-icon-store-fill&gt;</code></div>
  <div><tap-icon-sun color=${color} width=${width} height=${height}></tap-icon-sun> <code>&lt;tap-icon-sun&gt;</code></div>
  <div><tap-icon-sun-fill color=${color} width=${width} height=${height}></tap-icon-sun-fill> <code>&lt;tap-icon-sun-fill&gt;</code></div>
  <div><tap-icon-tapsi-logo color=${color} width=${width} height=${height}></tap-icon-tapsi-logo> <code>&lt;tap-icon-tapsi-logo&gt;</code></div>
  <div><tap-icon-target color=${color} width=${width} height=${height}></tap-icon-target> <code>&lt;tap-icon-target&gt;</code></div>
  <div><tap-icon-target-fill color=${color} width=${width} height=${height}></tap-icon-target-fill> <code>&lt;tap-icon-target-fill&gt;</code></div>
  <div><tap-icon-target-slash color=${color} width=${width} height=${height}></tap-icon-target-slash> <code>&lt;tap-icon-target-slash&gt;</code></div>
  <div><tap-icon-telephone color=${color} width=${width} height=${height}></tap-icon-telephone> <code>&lt;tap-icon-telephone&gt;</code></div>
  <div><tap-icon-telephone-fill color=${color} width=${width} height=${height}></tap-icon-telephone-fill> <code>&lt;tap-icon-telephone-fill&gt;</code></div>
  <div><tap-icon-thumb-down color=${color} width=${width} height=${height}></tap-icon-thumb-down> <code>&lt;tap-icon-thumb-down&gt;</code></div>
  <div><tap-icon-thumb-down-fill color=${color} width=${width} height=${height}></tap-icon-thumb-down-fill> <code>&lt;tap-icon-thumb-down-fill&gt;</code></div>
  <div><tap-icon-thumb-up color=${color} width=${width} height=${height}></tap-icon-thumb-up> <code>&lt;tap-icon-thumb-up&gt;</code></div>
  <div><tap-icon-thumb-up-fill color=${color} width=${width} height=${height}></tap-icon-thumb-up-fill> <code>&lt;tap-icon-thumb-up-fill&gt;</code></div>
  <div><tap-icon-timer color=${color} width=${width} height=${height}></tap-icon-timer> <code>&lt;tap-icon-timer&gt;</code></div>
  <div><tap-icon-timer-fill color=${color} width=${width} height=${height}></tap-icon-timer-fill> <code>&lt;tap-icon-timer-fill&gt;</code></div>
  <div><tap-icon-traffic-light color=${color} width=${width} height=${height}></tap-icon-traffic-light> <code>&lt;tap-icon-traffic-light&gt;</code></div>
  <div><tap-icon-traffic-light-fill color=${color} width=${width} height=${height}></tap-icon-traffic-light-fill> <code>&lt;tap-icon-traffic-light-fill&gt;</code></div>
  <div><tap-icon-trash color=${color} width=${width} height=${height}></tap-icon-trash> <code>&lt;tap-icon-trash&gt;</code></div>
  <div><tap-icon-trash-fill color=${color} width=${width} height=${height}></tap-icon-trash-fill> <code>&lt;tap-icon-trash-fill&gt;</code></div>
  <div><tap-icon-triangle-exclamation color=${color} width=${width} height=${height}></tap-icon-triangle-exclamation> <code>&lt;tap-icon-triangle-exclamation&gt;</code></div>
  <div><tap-icon-triangle-exclamation-fill color=${color} width=${width} height=${height}></tap-icon-triangle-exclamation-fill> <code>&lt;tap-icon-triangle-exclamation-fill&gt;</code></div>
  <div><tap-icon-ufo color=${color} width=${width} height=${height}></tap-icon-ufo> <code>&lt;tap-icon-ufo&gt;</code></div>
  <div><tap-icon-ufo-fill color=${color} width=${width} height=${height}></tap-icon-ufo-fill> <code>&lt;tap-icon-ufo-fill&gt;</code></div>
  <div><tap-icon-video-two color=${color} width=${width} height=${height}></tap-icon-video-two> <code>&lt;tap-icon-video-two&gt;</code></div>
  <div><tap-icon-video-two-fill color=${color} width=${width} height=${height}></tap-icon-video-two-fill> <code>&lt;tap-icon-video-two-fill&gt;</code></div>
  <div><tap-icon-wallet color=${color} width=${width} height=${height}></tap-icon-wallet> <code>&lt;tap-icon-wallet&gt;</code></div>
  <div><tap-icon-wallet-fill color=${color} width=${width} height=${height}></tap-icon-wallet-fill> <code>&lt;tap-icon-wallet-fill&gt;</code></div>
  <div><tap-icon-wallet-swap color=${color} width=${width} height=${height}></tap-icon-wallet-swap> <code>&lt;tap-icon-wallet-swap&gt;</code></div>
  <div><tap-icon-wifi color=${color} width=${width} height=${height}></tap-icon-wifi> <code>&lt;tap-icon-wifi&gt;</code></div>
  <div><tap-icon-wifi-slash color=${color} width=${width} height=${height}></tap-icon-wifi-slash> <code>&lt;tap-icon-wifi-slash&gt;</code></div>
`;

export const IconSet = IconSetTemplate.bind({});

IconSet.args = {color: '#222425', width: 24, height: 24};
