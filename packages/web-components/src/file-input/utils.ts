import type { PropertyDeclaration } from "lit";

export const isStringNumber = (inputString: string): boolean =>
  /^\d+(\.\d+)?$/.test(inputString);

export const getProgressUiParams = (percentage: number) => {
  const progressSize = 24;
  const progressStroke = 4;
  const radius = progressSize - progressStroke;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return {
    offset,
    progressSize,
    progressStroke,
    circumference,
    radius,
  };
};

export const isFileImage = (fileName: string) => {
  const imageFileExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".svg",
    ".webp",
    ".tiff",
  ];

  return imageFileExtensions.some(imageExtension =>
    fileName.toLowerCase().endsWith(imageExtension),
  );
};

export const loadingConverter: PropertyDeclaration["converter"] = {
  fromAttribute(value: string | null): boolean | number {
    if (value === null) return false;
    if (value === "") return true;

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) return true;

    return numericValue;
  },
  toAttribute(value: boolean | number): string | null {
    if (typeof value === "boolean") return value ? "true" : null;

    return `${value}`;
  },
};
