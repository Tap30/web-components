import { PinInputCell } from './pin-input-cell';

export type ValueChangedEventParams<T = string> = {
  cell: PinInputCell;
  index: number;
  value: T;
};
