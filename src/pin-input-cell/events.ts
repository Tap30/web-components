import { BaseEvent } from '../utils';
import {
  PIN_INPUT_CELL_ARROW_KEY_PRESSED_TYPE,
  PIN_INPUT_CELL_CLEARED_ALL_TYPE,
  PIN_INPUT_CELL_CLEARED_TYPE,
  PIN_INPUT_CELL_FILLED_TYPE,
  PIN_INPUT_CELL_OVERFLOW_VALUE_TYPE,
} from './constants';
import { ValueChangedEventParams } from './types';

export class CellFilled extends BaseEvent<ValueChangedEventParams> {
  static type = PIN_INPUT_CELL_FILLED_TYPE;
  constructor(details: ValueChangedEventParams){
    super(CellFilled.type, {details})
  }
}

export class CellCleared extends BaseEvent<ValueChangedEventParams> {
  static type = PIN_INPUT_CELL_CLEARED_TYPE;
  constructor(
    details: ValueChangedEventParams,
  ) {
    super(CellCleared.type, {details});
  }
}

export class CellClearedAll extends BaseEvent<ValueChangedEventParams> {
  static type = PIN_INPUT_CELL_CLEARED_ALL_TYPE;
  constructor(
    details: ValueChangedEventParams,
  ) {

    super(CellClearedAll.type, {details});
  }
}

export class CellArrowKeyPressed<T = 'left' | 'right'> extends BaseEvent<ValueChangedEventParams<T>> {
  static type = PIN_INPUT_CELL_ARROW_KEY_PRESSED_TYPE;
  constructor(
    details: ValueChangedEventParams<T>,
  ) {
    super(CellArrowKeyPressed.type, {details});
  }
}

export class CellOverflowValue extends BaseEvent<ValueChangedEventParams> {
  static type = PIN_INPUT_CELL_OVERFLOW_VALUE_TYPE;
  constructor(
    details: ValueChangedEventParams,
  ) {
    super(CellOverflowValue.type, {details});
  }
}
