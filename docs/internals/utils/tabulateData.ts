export const tabulateData = (data: { [key: string]: unknown }[]): string => {
  if (data.length === 0) return "";

  const headers = Array.from(
    data.reduce((keys, obj) => {
      Object.keys(obj).forEach(key => keys.add(key));
      return keys;
    }, new Set<string>()),
  );

  const headersMarkdown = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;

  const rowsMarkdown = data
    .map(obj => {
      const rowMarkdown = headers
        .map(header => (obj[header] ? obj[header] : "-"))
        .join(" | ");

      return `| ${rowMarkdown} |`;
    })
    .join("\n");

  return `${headersMarkdown}\n${separator}\n${rowsMarkdown}`;
};

export const codify = (inputString: string) => `\`${inputString}\``;
