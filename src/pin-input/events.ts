import { BaseEvent } from '../utils';
import { PIN_INPUT_FILLED_TYPE } from './constants';
import { InputFilledEventParams } from './types';

export class Filled extends BaseEvent<InputFilledEventParams> {
  static type = PIN_INPUT_FILLED_TYPE;
  constructor(details: InputFilledEventParams){
    super(Filled.type, {details})
  }
}
