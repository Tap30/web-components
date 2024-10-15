import { BaseEvent } from "../utils";

export default class RatingSliderChangeEvent extends BaseEvent<{ value: number }> {
  constructor(value: number) {
    super("rating-sliderchange", {
      details: {
        value,
      },
      bubbles: true,
      composed: true,
    });
  }
}
