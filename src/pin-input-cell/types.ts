import { PinInputCell } from './pin-input-cell';

export type ValueChangedEventParams = {
  cell: PinInputCell;
  index: number;
  value: string;
};
