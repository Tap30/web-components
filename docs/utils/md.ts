export const tabulateData = (headers: string[], data: string[][]): string => {
  if (headers.length === 0) return "";
  if (data.length === 0 || data[0]!.length === 0) return "";

  const headersMarkdown = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;

  const rowsMarkdown = data.map(row => `| ${row.join(" | ")} |`).join("\n");

  return `\n<div class="table-wrapper">\n\n${headersMarkdown}\n${separator}\n${rowsMarkdown}\n\n</div>\n`;
};

export const codify = (inputString: string) => `\`${inputString}\``;
