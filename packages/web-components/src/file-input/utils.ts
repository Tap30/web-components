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
