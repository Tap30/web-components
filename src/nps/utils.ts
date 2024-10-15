import { GradientColorClasses } from "./constants";

export const getGradientColor = (min: number, max: number, value?: number) => {
  if (value === undefined) return "transparent";

  const rangeLength = max - min;

  if (value < rangeLength / 2) return GradientColorClasses.RED;

  if (value < rangeLength * 0.65) return GradientColorClasses.YELLOW;

  if (value < rangeLength * 0.85) return GradientColorClasses.GRAY;

  return GradientColorClasses.GREEN;
};
