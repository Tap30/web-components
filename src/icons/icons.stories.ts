import {html, TemplateResult} from "lit";
import "./index";


export default {
  title: "Icons",
  component: "tap-icon",
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: {type: "inline-radio"},
      description: "The icon size",
      defaultValue: `"medium"`,
    },
    color: {
      control: {type: "text"},
      description: "The icon color, accepts CSS values",
      defaultValue: `"inherit"`,
    },
  },
};


interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  size: "small" | "medium" | "large",
  color: string,
}

const IconSetTemplate: Story<ArgTypes> = ({size, color}: ArgTypes) => html`
  <div><tap-icon-alarm-clock color=${color} size=${size}></tap-icon-alarm-clock> <code>&lt;tap-icon-alarm-clock color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-alarm-clock-fill color=${color} size=${size}></tap-icon-alarm-clock-fill> <code>&lt;tap-icon-alarm-clock-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-arrow-top-right color=${color} size=${size}></tap-icon-arrow-top-right> <code>&lt;tap-icon-arrow-top-right color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-arrow-top-right-1 color=${color} size=${size}></tap-icon-arrow-top-right-1> <code>&lt;tap-icon-arrow-top-right-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-arrow-top-right-question color=${color} size=${size}></tap-icon-arrow-top-right-question> <code>&lt;tap-icon-arrow-top-right-question color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-arrow-top-right-question-fill color=${color} size=${size}></tap-icon-arrow-top-right-question-fill> <code>&lt;tap-icon-arrow-top-right-question-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-banknote color=${color} size=${size}></tap-icon-banknote> <code>&lt;tap-icon-banknote color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-banknote-fill color=${color} size=${size}></tap-icon-banknote-fill> <code>&lt;tap-icon-banknote-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-banknote-two color=${color} size=${size}></tap-icon-banknote-two> <code>&lt;tap-icon-banknote-two color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-banknote-two-fill color=${color} size=${size}></tap-icon-banknote-two-fill> <code>&lt;tap-icon-banknote-two-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-bell color=${color} size=${size}></tap-icon-bell> <code>&lt;tap-icon-bell color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-bell-dot-fill color=${color} size=${size}></tap-icon-bell-dot-fill> <code>&lt;tap-icon-bell-dot-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-bell-fill color=${color} size=${size}></tap-icon-bell-fill> <code>&lt;tap-icon-bell-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-bookmark color=${color} size=${size}></tap-icon-bookmark> <code>&lt;tap-icon-bookmark color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-bookmark-fill color=${color} size=${size}></tap-icon-bookmark-fill> <code>&lt;tap-icon-bookmark-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-box color=${color} size=${size}></tap-icon-box> <code>&lt;tap-icon-box color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-box-check color=${color} size=${size}></tap-icon-box-check> <code>&lt;tap-icon-box-check color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-box-fill color=${color} size=${size}></tap-icon-box-fill> <code>&lt;tap-icon-box-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-briefcase color=${color} size=${size}></tap-icon-briefcase> <code>&lt;tap-icon-briefcase color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-briefcase-fill color=${color} size=${size}></tap-icon-briefcase-fill> <code>&lt;tap-icon-briefcase-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-building color=${color} size=${size}></tap-icon-building> <code>&lt;tap-icon-building color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-building-fill color=${color} size=${size}></tap-icon-building-fill> <code>&lt;tap-icon-building-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-calendar color=${color} size=${size}></tap-icon-calendar> <code>&lt;tap-icon-calendar color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-calendar-fill color=${color} size=${size}></tap-icon-calendar-fill> <code>&lt;tap-icon-calendar-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-call-dialog-box color=${color} size=${size}></tap-icon-call-dialog-box> <code>&lt;tap-icon-call-dialog-box color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-call-left color=${color} size=${size}></tap-icon-call-left> <code>&lt;tap-icon-call-left color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-call-left-slash color=${color} size=${size}></tap-icon-call-left-slash> <code>&lt;tap-icon-call-left-slash color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-call-righ color=${color} size=${size}></tap-icon-call-righ> <code>&lt;tap-icon-call-righ color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-call-right-slash color=${color} size=${size}></tap-icon-call-right-slash> <code>&lt;tap-icon-call-right-slash color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-camera color=${color} size=${size}></tap-icon-camera> <code>&lt;tap-icon-camera color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-camera-fill color=${color} size=${size}></tap-icon-camera-fill> <code>&lt;tap-icon-camera-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-camera-plus color=${color} size=${size}></tap-icon-camera-plus> <code>&lt;tap-icon-camera-plus color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-car color=${color} size=${size}></tap-icon-car> <code>&lt;tap-icon-car color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-car-clock color=${color} size=${size}></tap-icon-car-clock> <code>&lt;tap-icon-car-clock color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-car-clock-fill color=${color} size=${size}></tap-icon-car-clock-fill> <code>&lt;tap-icon-car-clock-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-car-fill color=${color} size=${size}></tap-icon-car-fill> <code>&lt;tap-icon-car-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-car-slash color=${color} size=${size}></tap-icon-car-slash> <code>&lt;tap-icon-car-slash color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-car-slash-fill color=${color} size=${size}></tap-icon-car-slash-fill> <code>&lt;tap-icon-car-slash-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-car-spark color=${color} size=${size}></tap-icon-car-spark> <code>&lt;tap-icon-car-spark color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card color=${color} size=${size}></tap-icon-card> <code>&lt;tap-icon-card color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-fill color=${color} size=${size}></tap-icon-card-fill> <code>&lt;tap-icon-card-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-left-arrow color=${color} size=${size}></tap-icon-card-left-arrow> <code>&lt;tap-icon-card-left-arrow color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-left-arrow-fill color=${color} size=${size}></tap-icon-card-left-arrow-fill> <code>&lt;tap-icon-card-left-arrow-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-plus color=${color} size=${size}></tap-icon-card-plus> <code>&lt;tap-icon-card-plus color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-plus-fill color=${color} size=${size}></tap-icon-card-plus-fill> <code>&lt;tap-icon-card-plus-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-right-arrow color=${color} size=${size}></tap-icon-card-right-arrow> <code>&lt;tap-icon-card-right-arrow color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-right-arrow-fill color=${color} size=${size}></tap-icon-card-right-arrow-fill> <code>&lt;tap-icon-card-right-arrow-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-spark color=${color} size=${size}></tap-icon-card-spark> <code>&lt;tap-icon-card-spark color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-spark-fill color=${color} size=${size}></tap-icon-card-spark-fill> <code>&lt;tap-icon-card-spark-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-time color=${color} size=${size}></tap-icon-card-time> <code>&lt;tap-icon-card-time color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-card-time-fill color=${color} size=${size}></tap-icon-card-time-fill> <code>&lt;tap-icon-card-time-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-check color=${color} size=${size}></tap-icon-check> <code>&lt;tap-icon-check color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-check-fill color=${color} size=${size}></tap-icon-check-fill> <code>&lt;tap-icon-check-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-check color=${color} size=${size}></tap-icon-circle-check> <code>&lt;tap-icon-circle-check color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-check-fill color=${color} size=${size}></tap-icon-circle-check-fill> <code>&lt;tap-icon-circle-check-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-check-small color=${color} size=${size}></tap-icon-circle-check-small> <code>&lt;tap-icon-circle-check-small color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-check-small-fill color=${color} size=${size}></tap-icon-circle-check-small-fill> <code>&lt;tap-icon-circle-check-small-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-cross color=${color} size=${size}></tap-icon-circle-cross> <code>&lt;tap-icon-circle-cross color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-cross-fill color=${color} size=${size}></tap-icon-circle-cross-fill> <code>&lt;tap-icon-circle-cross-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-exclamation color=${color} size=${size}></tap-icon-circle-exclamation> <code>&lt;tap-icon-circle-exclamation color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-exclamation-fill color=${color} size=${size}></tap-icon-circle-exclamation-fill> <code>&lt;tap-icon-circle-exclamation-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-fill-1 color=${color} size=${size}></tap-icon-circle-fill-1> <code>&lt;tap-icon-circle-fill-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-fill-2 color=${color} size=${size}></tap-icon-circle-fill-2> <code>&lt;tap-icon-circle-fill-2 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-fill-3 color=${color} size=${size}></tap-icon-circle-fill-3> <code>&lt;tap-icon-circle-fill-3 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-fill-4 color=${color} size=${size}></tap-icon-circle-fill-4> <code>&lt;tap-icon-circle-fill-4 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-fill-5 color=${color} size=${size}></tap-icon-circle-fill-5> <code>&lt;tap-icon-circle-fill-5 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-fill-6 color=${color} size=${size}></tap-icon-circle-fill-6> <code>&lt;tap-icon-circle-fill-6 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-fill-7 color=${color} size=${size}></tap-icon-circle-fill-7> <code>&lt;tap-icon-circle-fill-7 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-fill-8 color=${color} size=${size}></tap-icon-circle-fill-8> <code>&lt;tap-icon-circle-fill-8 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-fill-9 color=${color} size=${size}></tap-icon-circle-fill-9> <code>&lt;tap-icon-circle-fill-9 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-information color=${color} size=${size}></tap-icon-circle-information> <code>&lt;tap-icon-circle-information color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-information-fill color=${color} size=${size}></tap-icon-circle-information-fill> <code>&lt;tap-icon-circle-information-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-minus color=${color} size=${size}></tap-icon-circle-minus> <code>&lt;tap-icon-circle-minus color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-minus-fill color=${color} size=${size}></tap-icon-circle-minus-fill> <code>&lt;tap-icon-circle-minus-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-more-fill color=${color} size=${size}></tap-icon-circle-more-fill> <code>&lt;tap-icon-circle-more-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-outline-1 color=${color} size=${size}></tap-icon-circle-outline-1> <code>&lt;tap-icon-circle-outline-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-outline-2 color=${color} size=${size}></tap-icon-circle-outline-2> <code>&lt;tap-icon-circle-outline-2 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-outline-3 color=${color} size=${size}></tap-icon-circle-outline-3> <code>&lt;tap-icon-circle-outline-3 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-outline-4 color=${color} size=${size}></tap-icon-circle-outline-4> <code>&lt;tap-icon-circle-outline-4 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-outline-5 color=${color} size=${size}></tap-icon-circle-outline-5> <code>&lt;tap-icon-circle-outline-5 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-outline-6 color=${color} size=${size}></tap-icon-circle-outline-6> <code>&lt;tap-icon-circle-outline-6 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-outline-7 color=${color} size=${size}></tap-icon-circle-outline-7> <code>&lt;tap-icon-circle-outline-7 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-outline-8 color=${color} size=${size}></tap-icon-circle-outline-8> <code>&lt;tap-icon-circle-outline-8 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-outline-9 color=${color} size=${size}></tap-icon-circle-outline-9> <code>&lt;tap-icon-circle-outline-9 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-person color=${color} size=${size}></tap-icon-circle-person> <code>&lt;tap-icon-circle-person color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-person-fill color=${color} size=${size}></tap-icon-circle-person-fill> <code>&lt;tap-icon-circle-person-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-person-fill-1 color=${color} size=${size}></tap-icon-circle-person-fill-1> <code>&lt;tap-icon-circle-person-fill-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-plus color=${color} size=${size}></tap-icon-circle-plus> <code>&lt;tap-icon-circle-plus color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-plus-fill color=${color} size=${size}></tap-icon-circle-plus-fill> <code>&lt;tap-icon-circle-plus-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-question-fill color=${color} size=${size}></tap-icon-circle-question-fill> <code>&lt;tap-icon-circle-question-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-star color=${color} size=${size}></tap-icon-circle-star> <code>&lt;tap-icon-circle-star color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-star-fill color=${color} size=${size}></tap-icon-circle-star-fill> <code>&lt;tap-icon-circle-star-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-thunder color=${color} size=${size}></tap-icon-circle-thunder> <code>&lt;tap-icon-circle-thunder color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-circle-thunder-fill color=${color} size=${size}></tap-icon-circle-thunder-fill> <code>&lt;tap-icon-circle-thunder-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-clipboard-clock color=${color} size=${size}></tap-icon-clipboard-clock> <code>&lt;tap-icon-clipboard-clock color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-clipboard-clock-fill color=${color} size=${size}></tap-icon-clipboard-clock-fill> <code>&lt;tap-icon-clipboard-clock-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-clips-together color=${color} size=${size}></tap-icon-clips-together> <code>&lt;tap-icon-clips-together color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-clock color=${color} size=${size}></tap-icon-clock> <code>&lt;tap-icon-clock color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-clock-arrow-circlepath color=${color} size=${size}></tap-icon-clock-arrow-circlepath> <code>&lt;tap-icon-clock-arrow-circlepath color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-clock-dashed color=${color} size=${size}></tap-icon-clock-dashed> <code>&lt;tap-icon-clock-dashed color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-clock-fill color=${color} size=${size}></tap-icon-clock-fill> <code>&lt;tap-icon-clock-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-clock-small color=${color} size=${size}></tap-icon-clock-small> <code>&lt;tap-icon-clock-small color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-clock-small-fill color=${color} size=${size}></tap-icon-clock-small-fill> <code>&lt;tap-icon-clock-small-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-copy color=${color} size=${size}></tap-icon-copy> <code>&lt;tap-icon-copy color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-copy-fill color=${color} size=${size}></tap-icon-copy-fill> <code>&lt;tap-icon-copy-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-coupon color=${color} size=${size}></tap-icon-coupon> <code>&lt;tap-icon-coupon color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-coupon-fill color=${color} size=${size}></tap-icon-coupon-fill> <code>&lt;tap-icon-coupon-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-coupon-puched color=${color} size=${size}></tap-icon-coupon-puched> <code>&lt;tap-icon-coupon-puched color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-coupon-puched-fill color=${color} size=${size}></tap-icon-coupon-puched-fill> <code>&lt;tap-icon-coupon-puched-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-cross color=${color} size=${size}></tap-icon-cross> <code>&lt;tap-icon-cross color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-cross-fill color=${color} size=${size}></tap-icon-cross-fill> <code>&lt;tap-icon-cross-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default color=${color} size=${size}></tap-icon-default> <code>&lt;tap-icon-default color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default-1 color=${color} size=${size}></tap-icon-default-1> <code>&lt;tap-icon-default-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default-2 color=${color} size=${size}></tap-icon-default-2> <code>&lt;tap-icon-default-2 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default-3 color=${color} size=${size}></tap-icon-default-3> <code>&lt;tap-icon-default-3 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default-4 color=${color} size=${size}></tap-icon-default-4> <code>&lt;tap-icon-default-4 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default-5 color=${color} size=${size}></tap-icon-default-5> <code>&lt;tap-icon-default-5 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default-6 color=${color} size=${size}></tap-icon-default-6> <code>&lt;tap-icon-default-6 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default-7 color=${color} size=${size}></tap-icon-default-7> <code>&lt;tap-icon-default-7 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default-8 color=${color} size=${size}></tap-icon-default-8> <code>&lt;tap-icon-default-8 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default-9 color=${color} size=${size}></tap-icon-default-9> <code>&lt;tap-icon-default-9 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-default-fill color=${color} size=${size}></tap-icon-default-fill> <code>&lt;tap-icon-default-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-dialog-box-text color=${color} size=${size}></tap-icon-dialog-box-text> <code>&lt;tap-icon-dialog-box-text color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-dialog-box-text-fill color=${color} size=${size}></tap-icon-dialog-box-text-fill> <code>&lt;tap-icon-dialog-box-text-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-dialogbox-question color=${color} size=${size}></tap-icon-dialogbox-question> <code>&lt;tap-icon-dialogbox-question color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-diamond-arrow-turn-right color=${color} size=${size}></tap-icon-diamond-arrow-turn-right> <code>&lt;tap-icon-diamond-arrow-turn-right color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-diamond-arrow-turn-right-1 color=${color} size=${size}></tap-icon-diamond-arrow-turn-right-1> <code>&lt;tap-icon-diamond-arrow-turn-right-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-dot-fill color=${color} size=${size}></tap-icon-dot-fill> <code>&lt;tap-icon-dot-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-double-check color=${color} size=${size}></tap-icon-double-check> <code>&lt;tap-icon-double-check color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-ear-slash color=${color} size=${size}></tap-icon-ear-slash> <code>&lt;tap-icon-ear-slash color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-envelope color=${color} size=${size}></tap-icon-envelope> <code>&lt;tap-icon-envelope color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-envelope-fill color=${color} size=${size}></tap-icon-envelope-fill> <code>&lt;tap-icon-envelope-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-envelope-open color=${color} size=${size}></tap-icon-envelope-open> <code>&lt;tap-icon-envelope-open color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-envelope-open-fill color=${color} size=${size}></tap-icon-envelope-open-fill> <code>&lt;tap-icon-envelope-open-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-exclamation color=${color} size=${size}></tap-icon-exclamation> <code>&lt;tap-icon-exclamation color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-exclamation-fill color=${color} size=${size}></tap-icon-exclamation-fill> <code>&lt;tap-icon-exclamation-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-eye color=${color} size=${size}></tap-icon-eye> <code>&lt;tap-icon-eye color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-eye-fill color=${color} size=${size}></tap-icon-eye-fill> <code>&lt;tap-icon-eye-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-eye-slash color=${color} size=${size}></tap-icon-eye-slash> <code>&lt;tap-icon-eye-slash color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-eye-slash-fill color=${color} size=${size}></tap-icon-eye-slash-fill> <code>&lt;tap-icon-eye-slash-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-face-sad color=${color} size=${size}></tap-icon-face-sad> <code>&lt;tap-icon-face-sad color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-face-sad-fill color=${color} size=${size}></tap-icon-face-sad-fill> <code>&lt;tap-icon-face-sad-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-face-smile color=${color} size=${size}></tap-icon-face-smile> <code>&lt;tap-icon-face-smile color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-face-smile-fill color=${color} size=${size}></tap-icon-face-smile-fill> <code>&lt;tap-icon-face-smile-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-finger-left-fill color=${color} size=${size}></tap-icon-finger-left-fill> <code>&lt;tap-icon-finger-left-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-finger-swipe-vertical color=${color} size=${size}></tap-icon-finger-swipe-vertical> <code>&lt;tap-icon-finger-swipe-vertical color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-finger-touch color=${color} size=${size}></tap-icon-finger-touch> <code>&lt;tap-icon-finger-touch color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-finger-up-fill color=${color} size=${size}></tap-icon-finger-up-fill> <code>&lt;tap-icon-finger-up-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-fire color=${color} size=${size}></tap-icon-fire> <code>&lt;tap-icon-fire color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-fire-fill color=${color} size=${size}></tap-icon-fire-fill> <code>&lt;tap-icon-fire-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-flag color=${color} size=${size}></tap-icon-flag> <code>&lt;tap-icon-flag color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-flag-fill color=${color} size=${size}></tap-icon-flag-fill> <code>&lt;tap-icon-flag-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-gas-station color=${color} size=${size}></tap-icon-gas-station> <code>&lt;tap-icon-gas-station color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-gas-station-fill color=${color} size=${size}></tap-icon-gas-station-fill> <code>&lt;tap-icon-gas-station-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-gear color=${color} size=${size}></tap-icon-gear> <code>&lt;tap-icon-gear color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-gear-fill color=${color} size=${size}></tap-icon-gear-fill> <code>&lt;tap-icon-gear-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-gift color=${color} size=${size}></tap-icon-gift> <code>&lt;tap-icon-gift color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-graduation-cap color=${color} size=${size}></tap-icon-graduation-cap> <code>&lt;tap-icon-graduation-cap color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-graduation-cap-fill color=${color} size=${size}></tap-icon-graduation-cap-fill> <code>&lt;tap-icon-graduation-cap-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-headphone color=${color} size=${size}></tap-icon-headphone> <code>&lt;tap-icon-headphone color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-headphone-fill color=${color} size=${size}></tap-icon-headphone-fill> <code>&lt;tap-icon-headphone-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-heart color=${color} size=${size}></tap-icon-heart> <code>&lt;tap-icon-heart color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-heart-broken-fill color=${color} size=${size}></tap-icon-heart-broken-fill> <code>&lt;tap-icon-heart-broken-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-heart-fill color=${color} size=${size}></tap-icon-heart-fill> <code>&lt;tap-icon-heart-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-helmets color=${color} size=${size}></tap-icon-helmets> <code>&lt;tap-icon-helmets color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-helmets-fill color=${color} size=${size}></tap-icon-helmets-fill> <code>&lt;tap-icon-helmets-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-home color=${color} size=${size}></tap-icon-home> <code>&lt;tap-icon-home color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-home-fill color=${color} size=${size}></tap-icon-home-fill> <code>&lt;tap-icon-home-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-hourglass color=${color} size=${size}></tap-icon-hourglass> <code>&lt;tap-icon-hourglass color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-hourglass-fill color=${color} size=${size}></tap-icon-hourglass-fill> <code>&lt;tap-icon-hourglass-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-image color=${color} size=${size}></tap-icon-image> <code>&lt;tap-icon-image color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-image-fill color=${color} size=${size}></tap-icon-image-fill> <code>&lt;tap-icon-image-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-image-two color=${color} size=${size}></tap-icon-image-two> <code>&lt;tap-icon-image-two color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-image-two-fill color=${color} size=${size}></tap-icon-image-two-fill> <code>&lt;tap-icon-image-two-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-info color=${color} size=${size}></tap-icon-info> <code>&lt;tap-icon-info color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-info-fill color=${color} size=${size}></tap-icon-info-fill> <code>&lt;tap-icon-info-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-keyboard color=${color} size=${size}></tap-icon-keyboard> <code>&lt;tap-icon-keyboard color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-keyboard-fill color=${color} size=${size}></tap-icon-keyboard-fill> <code>&lt;tap-icon-keyboard-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-lamp-spark-fill color=${color} size=${size}></tap-icon-lamp-spark-fill> <code>&lt;tap-icon-lamp-spark-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-line-three color=${color} size=${size}></tap-icon-line-three> <code>&lt;tap-icon-line-three color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-line-three-horizontal-decrease color=${color} size=${size}></tap-icon-line-three-horizontal-decrease> <code>&lt;tap-icon-line-three-horizontal-decrease color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-list-bullet color=${color} size=${size}></tap-icon-list-bullet> <code>&lt;tap-icon-list-bullet color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-loading color=${color} size=${size}></tap-icon-loading> <code>&lt;tap-icon-loading color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-location-left color=${color} size=${size}></tap-icon-location-left> <code>&lt;tap-icon-location-left color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-location-up color=${color} size=${size}></tap-icon-location-up> <code>&lt;tap-icon-location-up color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-lock color=${color} size=${size}></tap-icon-lock> <code>&lt;tap-icon-lock color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-lock-fill color=${color} size=${size}></tap-icon-lock-fill> <code>&lt;tap-icon-lock-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-lock-small color=${color} size=${size}></tap-icon-lock-small> <code>&lt;tap-icon-lock-small color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-lock-small-fill color=${color} size=${size}></tap-icon-lock-small-fill> <code>&lt;tap-icon-lock-small-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-magnifier color=${color} size=${size}></tap-icon-magnifier> <code>&lt;tap-icon-magnifier color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-magnifier-fill color=${color} size=${size}></tap-icon-magnifier-fill> <code>&lt;tap-icon-magnifier-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-map color=${color} size=${size}></tap-icon-map> <code>&lt;tap-icon-map color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-map-fill color=${color} size=${size}></tap-icon-map-fill> <code>&lt;tap-icon-map-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-medal color=${color} size=${size}></tap-icon-medal> <code>&lt;tap-icon-medal color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-medal-1 color=${color} size=${size}></tap-icon-medal-1> <code>&lt;tap-icon-medal-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-medal-fill color=${color} size=${size}></tap-icon-medal-fill> <code>&lt;tap-icon-medal-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-medal-fill-1 color=${color} size=${size}></tap-icon-medal-fill-1> <code>&lt;tap-icon-medal-fill-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-microphone color=${color} size=${size}></tap-icon-microphone> <code>&lt;tap-icon-microphone color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-microphone-fill color=${color} size=${size}></tap-icon-microphone-fill> <code>&lt;tap-icon-microphone-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-microphone-slash color=${color} size=${size}></tap-icon-microphone-slash> <code>&lt;tap-icon-microphone-slash color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-microphone-slash-fill color=${color} size=${size}></tap-icon-microphone-slash-fill> <code>&lt;tap-icon-microphone-slash-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-microphone-spark color=${color} size=${size}></tap-icon-microphone-spark> <code>&lt;tap-icon-microphone-spark color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-microphone-spark-fill color=${color} size=${size}></tap-icon-microphone-spark-fill> <code>&lt;tap-icon-microphone-spark-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-minus color=${color} size=${size}></tap-icon-minus> <code>&lt;tap-icon-minus color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-minus-fill color=${color} size=${size}></tap-icon-minus-fill> <code>&lt;tap-icon-minus-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-moon color=${color} size=${size}></tap-icon-moon> <code>&lt;tap-icon-moon color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-moon-fill color=${color} size=${size}></tap-icon-moon-fill> <code>&lt;tap-icon-moon-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-more-horizontal color=${color} size=${size}></tap-icon-more-horizontal> <code>&lt;tap-icon-more-horizontal color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-more-horizontal-fill color=${color} size=${size}></tap-icon-more-horizontal-fill> <code>&lt;tap-icon-more-horizontal-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-more-vertical color=${color} size=${size}></tap-icon-more-vertical> <code>&lt;tap-icon-more-vertical color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-more-vertical-fill color=${color} size=${size}></tap-icon-more-vertical-fill> <code>&lt;tap-icon-more-vertical-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-motorcycle color=${color} size=${size}></tap-icon-motorcycle> <code>&lt;tap-icon-motorcycle color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pause color=${color} size=${size}></tap-icon-pause> <code>&lt;tap-icon-pause color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pencil-line color=${color} size=${size}></tap-icon-pencil-line> <code>&lt;tap-icon-pencil-line color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pencil-line-fill color=${color} size=${size}></tap-icon-pencil-line-fill> <code>&lt;tap-icon-pencil-line-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person color=${color} size=${size}></tap-icon-person> <code>&lt;tap-icon-person color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-1 color=${color} size=${size}></tap-icon-person-1> <code>&lt;tap-icon-person-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-fill color=${color} size=${size}></tap-icon-person-fill> <code>&lt;tap-icon-person-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-fill-1 color=${color} size=${size}></tap-icon-person-fill-1> <code>&lt;tap-icon-person-fill-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-in-wheelchair color=${color} size=${size}></tap-icon-person-in-wheelchair> <code>&lt;tap-icon-person-in-wheelchair color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-minus color=${color} size=${size}></tap-icon-person-minus> <code>&lt;tap-icon-person-minus color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-minus-fill color=${color} size=${size}></tap-icon-person-minus-fill> <code>&lt;tap-icon-person-minus-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-plus color=${color} size=${size}></tap-icon-person-plus> <code>&lt;tap-icon-person-plus color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-plus-fill color=${color} size=${size}></tap-icon-person-plus-fill> <code>&lt;tap-icon-person-plus-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-two color=${color} size=${size}></tap-icon-person-two> <code>&lt;tap-icon-person-two color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-two-fill color=${color} size=${size}></tap-icon-person-two-fill> <code>&lt;tap-icon-person-two-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-wave color=${color} size=${size}></tap-icon-person-wave> <code>&lt;tap-icon-person-wave color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-person-wave-fill color=${color} size=${size}></tap-icon-person-wave-fill> <code>&lt;tap-icon-person-wave-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-phone color=${color} size=${size}></tap-icon-phone> <code>&lt;tap-icon-phone color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-phone-fill color=${color} size=${size}></tap-icon-phone-fill> <code>&lt;tap-icon-phone-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-phone-vibrate color=${color} size=${size}></tap-icon-phone-vibrate> <code>&lt;tap-icon-phone-vibrate color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-phone-vibrate-fill color=${color} size=${size}></tap-icon-phone-vibrate-fill> <code>&lt;tap-icon-phone-vibrate-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pin color=${color} size=${size}></tap-icon-pin> <code>&lt;tap-icon-pin color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pin-cross color=${color} size=${size}></tap-icon-pin-cross> <code>&lt;tap-icon-pin-cross color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pin-cross-fill color=${color} size=${size}></tap-icon-pin-cross-fill> <code>&lt;tap-icon-pin-cross-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pin-fill color=${color} size=${size}></tap-icon-pin-fill> <code>&lt;tap-icon-pin-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pin-on-map color=${color} size=${size}></tap-icon-pin-on-map> <code>&lt;tap-icon-pin-on-map color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pin-on-map-fill color=${color} size=${size}></tap-icon-pin-on-map-fill> <code>&lt;tap-icon-pin-on-map-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pin-wave color=${color} size=${size}></tap-icon-pin-wave> <code>&lt;tap-icon-pin-wave color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-pin-wave-fill color=${color} size=${size}></tap-icon-pin-wave-fill> <code>&lt;tap-icon-pin-wave-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-plane color=${color} size=${size}></tap-icon-plane> <code>&lt;tap-icon-plane color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-plane-fill color=${color} size=${size}></tap-icon-plane-fill> <code>&lt;tap-icon-plane-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-planet-earth color=${color} size=${size}></tap-icon-planet-earth> <code>&lt;tap-icon-planet-earth color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-play color=${color} size=${size}></tap-icon-play> <code>&lt;tap-icon-play color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-plus color=${color} size=${size}></tap-icon-plus> <code>&lt;tap-icon-plus color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-plus-fill color=${color} size=${size}></tap-icon-plus-fill> <code>&lt;tap-icon-plus-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-point-three-connected-trianglepath-line color=${color} size=${size}></tap-icon-point-three-connected-trianglepath-line> <code>&lt;tap-icon-point-three-connected-trianglepath-line color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-point-three-connected-trianglepath-line-fill color=${color} size=${size}></tap-icon-point-three-connected-trianglepath-line-fill> <code>&lt;tap-icon-point-three-connected-trianglepath-line-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-power color=${color} size=${size}></tap-icon-power> <code>&lt;tap-icon-power color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-question color=${color} size=${size}></tap-icon-question> <code>&lt;tap-icon-question color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-record color=${color} size=${size}></tap-icon-record> <code>&lt;tap-icon-record color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-rectangle-person-text color=${color} size=${size}></tap-icon-rectangle-person-text> <code>&lt;tap-icon-rectangle-person-text color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-rectangle-person-text-with-badge color=${color} size=${size}></tap-icon-rectangle-person-text-with-badge> <code>&lt;tap-icon-rectangle-person-text-with-badge color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-send-chat color=${color} size=${size}></tap-icon-send-chat> <code>&lt;tap-icon-send-chat color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-send-chat-fill color=${color} size=${size}></tap-icon-send-chat-fill> <code>&lt;tap-icon-send-chat-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-share color=${color} size=${size}></tap-icon-share> <code>&lt;tap-icon-share color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-share-fill color=${color} size=${size}></tap-icon-share-fill> <code>&lt;tap-icon-share-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-shield-tick color=${color} size=${size}></tap-icon-shield-tick> <code>&lt;tap-icon-shield-tick color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-shield-tick-fill color=${color} size=${size}></tap-icon-shield-tick-fill> <code>&lt;tap-icon-shield-tick-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-shopping-bag color=${color} size=${size}></tap-icon-shopping-bag> <code>&lt;tap-icon-shopping-bag color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-shopping-bag-fill color=${color} size=${size}></tap-icon-shopping-bag-fill> <code>&lt;tap-icon-shopping-bag-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-shopping-cart color=${color} size=${size}></tap-icon-shopping-cart> <code>&lt;tap-icon-shopping-cart color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-shopping-cart-fill color=${color} size=${size}></tap-icon-shopping-cart-fill> <code>&lt;tap-icon-shopping-cart-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-single-check color=${color} size=${size}></tap-icon-single-check> <code>&lt;tap-icon-single-check color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-siren color=${color} size=${size}></tap-icon-siren> <code>&lt;tap-icon-siren color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-siren-fill color=${color} size=${size}></tap-icon-siren-fill> <code>&lt;tap-icon-siren-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-slider-horizontal color=${color} size=${size}></tap-icon-slider-horizontal> <code>&lt;tap-icon-slider-horizontal color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-slider-horizontal-fill color=${color} size=${size}></tap-icon-slider-horizontal-fill> <code>&lt;tap-icon-slider-horizontal-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-spark color=${color} size=${size}></tap-icon-spark> <code>&lt;tap-icon-spark color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-spark-fill color=${color} size=${size}></tap-icon-spark-fill> <code>&lt;tap-icon-spark-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-spark-small color=${color} size=${size}></tap-icon-spark-small> <code>&lt;tap-icon-spark-small color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-spark-small-fill color=${color} size=${size}></tap-icon-spark-small-fill> <code>&lt;tap-icon-spark-small-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-spark-three color=${color} size=${size}></tap-icon-spark-three> <code>&lt;tap-icon-spark-three color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-spark-three-fill color=${color} size=${size}></tap-icon-spark-three-fill> <code>&lt;tap-icon-spark-three-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-speaker-cross color=${color} size=${size}></tap-icon-speaker-cross> <code>&lt;tap-icon-speaker-cross color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-speaker-exclamation color=${color} size=${size}></tap-icon-speaker-exclamation> <code>&lt;tap-icon-speaker-exclamation color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-speaker-wave color=${color} size=${size}></tap-icon-speaker-wave> <code>&lt;tap-icon-speaker-wave color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-spiral-dot-two color=${color} size=${size}></tap-icon-spiral-dot-two> <code>&lt;tap-icon-spiral-dot-two color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-above-squares color=${color} size=${size}></tap-icon-square-above-squares> <code>&lt;tap-icon-square-above-squares color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-fill color=${color} size=${size}></tap-icon-square-fill> <code>&lt;tap-icon-square-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-fill-1 color=${color} size=${size}></tap-icon-square-fill-1> <code>&lt;tap-icon-square-fill-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-fill-2 color=${color} size=${size}></tap-icon-square-fill-2> <code>&lt;tap-icon-square-fill-2 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-fill-3 color=${color} size=${size}></tap-icon-square-fill-3> <code>&lt;tap-icon-square-fill-3 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-fill-4 color=${color} size=${size}></tap-icon-square-fill-4> <code>&lt;tap-icon-square-fill-4 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-fill-5 color=${color} size=${size}></tap-icon-square-fill-5> <code>&lt;tap-icon-square-fill-5 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-fill-6 color=${color} size=${size}></tap-icon-square-fill-6> <code>&lt;tap-icon-square-fill-6 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-fill-7 color=${color} size=${size}></tap-icon-square-fill-7> <code>&lt;tap-icon-square-fill-7 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-fill-8 color=${color} size=${size}></tap-icon-square-fill-8> <code>&lt;tap-icon-square-fill-8 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-fill-9 color=${color} size=${size}></tap-icon-square-fill-9> <code>&lt;tap-icon-square-fill-9 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-four color=${color} size=${size}></tap-icon-square-four> <code>&lt;tap-icon-square-four color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-four-fill color=${color} size=${size}></tap-icon-square-four-fill> <code>&lt;tap-icon-square-four-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-grid color=${color} size=${size}></tap-icon-square-grid> <code>&lt;tap-icon-square-grid color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-grid-fill color=${color} size=${size}></tap-icon-square-grid-fill> <code>&lt;tap-icon-square-grid-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-grid-rounded color=${color} size=${size}></tap-icon-square-grid-rounded> <code>&lt;tap-icon-square-grid-rounded color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-grid-rounded-fill color=${color} size=${size}></tap-icon-square-grid-rounded-fill> <code>&lt;tap-icon-square-grid-rounded-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-more color=${color} size=${size}></tap-icon-square-more> <code>&lt;tap-icon-square-more color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-more-fill color=${color} size=${size}></tap-icon-square-more-fill> <code>&lt;tap-icon-square-more-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-outline-1 color=${color} size=${size}></tap-icon-square-outline-1> <code>&lt;tap-icon-square-outline-1 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-outline-2 color=${color} size=${size}></tap-icon-square-outline-2> <code>&lt;tap-icon-square-outline-2 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-outline-3 color=${color} size=${size}></tap-icon-square-outline-3> <code>&lt;tap-icon-square-outline-3 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-outline-4 color=${color} size=${size}></tap-icon-square-outline-4> <code>&lt;tap-icon-square-outline-4 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-outline-5 color=${color} size=${size}></tap-icon-square-outline-5> <code>&lt;tap-icon-square-outline-5 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-outline-6 color=${color} size=${size}></tap-icon-square-outline-6> <code>&lt;tap-icon-square-outline-6 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-outline-7 color=${color} size=${size}></tap-icon-square-outline-7> <code>&lt;tap-icon-square-outline-7 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-outline-8 color=${color} size=${size}></tap-icon-square-outline-8> <code>&lt;tap-icon-square-outline-8 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-outline-9 color=${color} size=${size}></tap-icon-square-outline-9> <code>&lt;tap-icon-square-outline-9 color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-person color=${color} size=${size}></tap-icon-square-person> <code>&lt;tap-icon-square-person color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-square-person-fill color=${color} size=${size}></tap-icon-square-person-fill> <code>&lt;tap-icon-square-person-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-star color=${color} size=${size}></tap-icon-star> <code>&lt;tap-icon-star color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-star-fill color=${color} size=${size}></tap-icon-star-fill> <code>&lt;tap-icon-star-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-steer color=${color} size=${size}></tap-icon-steer> <code>&lt;tap-icon-steer color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-steer-fill color=${color} size=${size}></tap-icon-steer-fill> <code>&lt;tap-icon-steer-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-sticky-note color=${color} size=${size}></tap-icon-sticky-note> <code>&lt;tap-icon-sticky-note color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-sticky-note-fill color=${color} size=${size}></tap-icon-sticky-note-fill> <code>&lt;tap-icon-sticky-note-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-store color=${color} size=${size}></tap-icon-store> <code>&lt;tap-icon-store color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-store-fill color=${color} size=${size}></tap-icon-store-fill> <code>&lt;tap-icon-store-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-sun color=${color} size=${size}></tap-icon-sun> <code>&lt;tap-icon-sun color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-sun-fill color=${color} size=${size}></tap-icon-sun-fill> <code>&lt;tap-icon-sun-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-tapsi-logo color=${color} size=${size}></tap-icon-tapsi-logo> <code>&lt;tap-icon-tapsi-logo color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-target color=${color} size=${size}></tap-icon-target> <code>&lt;tap-icon-target color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-target-fill color=${color} size=${size}></tap-icon-target-fill> <code>&lt;tap-icon-target-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-target-slash color=${color} size=${size}></tap-icon-target-slash> <code>&lt;tap-icon-target-slash color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-telephone color=${color} size=${size}></tap-icon-telephone> <code>&lt;tap-icon-telephone color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-telephone-fill color=${color} size=${size}></tap-icon-telephone-fill> <code>&lt;tap-icon-telephone-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-thumb-down color=${color} size=${size}></tap-icon-thumb-down> <code>&lt;tap-icon-thumb-down color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-thumb-down-fill color=${color} size=${size}></tap-icon-thumb-down-fill> <code>&lt;tap-icon-thumb-down-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-thumb-up color=${color} size=${size}></tap-icon-thumb-up> <code>&lt;tap-icon-thumb-up color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-thumb-up-fill color=${color} size=${size}></tap-icon-thumb-up-fill> <code>&lt;tap-icon-thumb-up-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-timer color=${color} size=${size}></tap-icon-timer> <code>&lt;tap-icon-timer color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-timer-fill color=${color} size=${size}></tap-icon-timer-fill> <code>&lt;tap-icon-timer-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-traffic-light color=${color} size=${size}></tap-icon-traffic-light> <code>&lt;tap-icon-traffic-light color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-traffic-light-fill color=${color} size=${size}></tap-icon-traffic-light-fill> <code>&lt;tap-icon-traffic-light-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-trash color=${color} size=${size}></tap-icon-trash> <code>&lt;tap-icon-trash color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-trash-fill color=${color} size=${size}></tap-icon-trash-fill> <code>&lt;tap-icon-trash-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-triangle-exclamation color=${color} size=${size}></tap-icon-triangle-exclamation> <code>&lt;tap-icon-triangle-exclamation color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-triangle-exclamation-fill color=${color} size=${size}></tap-icon-triangle-exclamation-fill> <code>&lt;tap-icon-triangle-exclamation-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-ufo color=${color} size=${size}></tap-icon-ufo> <code>&lt;tap-icon-ufo color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-ufo-fill color=${color} size=${size}></tap-icon-ufo-fill> <code>&lt;tap-icon-ufo-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-video-two color=${color} size=${size}></tap-icon-video-two> <code>&lt;tap-icon-video-two color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-video-two-fill color=${color} size=${size}></tap-icon-video-two-fill> <code>&lt;tap-icon-video-two-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-wallet color=${color} size=${size}></tap-icon-wallet> <code>&lt;tap-icon-wallet color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-wallet-fill color=${color} size=${size}></tap-icon-wallet-fill> <code>&lt;tap-icon-wallet-fill color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-wallet-swap color=${color} size=${size}></tap-icon-wallet-swap> <code>&lt;tap-icon-wallet-swap color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-wifi color=${color} size=${size}></tap-icon-wifi> <code>&lt;tap-icon-wifi color="${color}" size="${size}"&gt;</code></div>
  <div><tap-icon-wifi-slash color=${color} size=${size}></tap-icon-wifi-slash> <code>&lt;tap-icon-wifi-slash color="${color}" size="${size}"&gt;</code></div>
`;

export const IconSet = IconSetTemplate.bind({});

IconSet.args = {size: 'medium', color: 'black'};
