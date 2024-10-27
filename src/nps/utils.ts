import { classMap } from "lit/directives/class-map.js";

export const getGradientClass = (min: number, max: number, value?: number) => {
  const classes: Record<string, boolean> = {
    gradient: true,
  };

  if (value === undefined) {
    return classMap(classes);
  }

  const rangeLength = max - min;

  if (value < rangeLength / 2) classes.red = true;
  else if (value < rangeLength * 0.65) classes.yellow = true;
  else if (value < rangeLength * 0.85) classes.gray = true;
  else classes.green = true;
  if (value === max) classes.rounded = true;

  return classMap(classes);
};
