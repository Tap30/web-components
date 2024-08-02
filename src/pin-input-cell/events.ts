import {
  PIN_INPUT_CELL_ARROW_KEY_PRESSED_TYPE,
  PIN_INPUT_CELL_CLEARED_ALL_TYPE,
  PIN_INPUT_CELL_CLEARED_TYPE,
  PIN_INPUT_CELL_FILLED_TYPE,
  PIN_INPUT_CELL_OVERFLOW_VALUE_TYPE,
} from './constants';
import { ValueChangedEventParams } from './types';

export class PinInputCellFilled extends Event {
  public message: string;
  public details: ValueChangedEventParams;

  constructor(
    message: string,
    details: ValueChangedEventParams,
    eventInitDict: EventInit = {},
  ) {
    const _eventInitDict = {
      bubbles: true,
      composed: false,
      ...eventInitDict,
    };
    const type = PIN_INPUT_CELL_FILLED_TYPE;
    super(type, _eventInitDict);

    this.details = details;
    this.message = message;
  }
}

export class PinInputCellCleared extends Event {
  public message: string;
  public details: ValueChangedEventParams;

  constructor(
    message: string,
    details: ValueChangedEventParams,
    eventInitDict: EventInit = {},
  ) {
    const _eventInitDict = {
      bubbles: true,
      composed: false,
      ...eventInitDict,
    };

    const type = PIN_INPUT_CELL_CLEARED_TYPE;
    super(type, _eventInitDict);

    this.details = details;
    this.message = message;
  }
}

export class PinInputCellClearedAll extends Event {
  public message: string;
  public details: ValueChangedEventParams;

  constructor(
    message: string,
    details: ValueChangedEventParams,
    eventInitDict: EventInit = {},
  ) {
    const _eventInitDict = {
      bubbles: true,
      composed: false,
      ...eventInitDict,
    };

    const type = PIN_INPUT_CELL_CLEARED_ALL_TYPE;
    super(type, _eventInitDict);

    this.details = details;
    this.message = message;
  }
}

export class PinInputCellArrowKeyPressed<T = 'left' | 'right'> extends Event {
  public message: string;
  public details: ValueChangedEventParams<T>;

  constructor(
    message: string,
    details: ValueChangedEventParams<T>,
    eventInitDict: EventInit = {},
  ) {
    const _eventInitDict = {
      bubbles: true,
      composed: false,
      ...eventInitDict,
    };

    const type = PIN_INPUT_CELL_ARROW_KEY_PRESSED_TYPE;
    super(type, _eventInitDict);

    this.details = details;
    this.message = message;
  }
}

export class PinInputCellOverflowValue extends Event {
  public message: string;
  public details: ValueChangedEventParams;

  constructor(
    message: string,
    details: ValueChangedEventParams,
    eventInitDict: EventInit = {},
  ) {
    const _eventInitDict = {
      bubbles: true,
      composed: false,
      ...eventInitDict,
    };

    const type = PIN_INPUT_CELL_OVERFLOW_VALUE_TYPE;
    super(type, _eventInitDict);

    this.details = details;
    this.message = message;
  }
}
