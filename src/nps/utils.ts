export const getGradientColor = (min: number, max: number, value?: number) => {
  if (value === undefined) return "transparent";

  const rangeLength = max - min;

  if (value < rangeLength / 2) return "gradient-red";

  if (value < rangeLength * 0.65) return "gradient-yellow";

  if (value < rangeLength * 0.85) return "gradient-gray";

  return "gradient-green";
};
