export type InputFilledEventParams = {
  cellCount: number;
  value: string;
  displayValue: string;
};

export type HandleOverflowedCellArgs = {
  text: string;
  index: number;
};
export type HandleClearPrevCellsArgs = {
  index: number;
};

export type HandleArrowKeyPressedArgs = {
  index: number;
  arrowDirection: 'left' | 'right' | null;
};
