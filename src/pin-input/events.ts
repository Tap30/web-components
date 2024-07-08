import { PIN_INPUT_FILLED_TYPE } from './constants';
import { InputFilledEventParams } from './types';

export class PinInputFilled extends Event {
  public message: string;
  public details: InputFilledEventParams;

  constructor(
    message: string,
    details: InputFilledEventParams,
    eventInitDict: EventInit = {},
  ) {
    const _eventInitDict = {
      bubbles: true,
      composed: false,
      ...eventInitDict,
    };

    const type = PIN_INPUT_FILLED_TYPE;
    super(type, _eventInitDict);

    this.details = details;
    this.message = message;
  }
}
