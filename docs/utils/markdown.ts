export const tabulateData = (headers: string[], data: string[][]): string => {
  if (headers.length === 0) return "";
  if (data.length === 0 || data[0]!.length === 0) return "";

  const headersMarkdown = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;

  const rowsMarkdown = data.map(row => `| ${row.join(" | ")} |`).join("\n");

  return `\n<div class="table-wrapper">\n\n${headersMarkdown}\n${separator}\n${rowsMarkdown}\n\n</div>\n`;
};

export const codify = (inputString: string) => `\`${inputString}\``;

export const getFormattedTagUsageString = (tagName?: string): string => {
  if (!tagName) return "";
  return `<pre>&lt;<span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">${tagName}</span>&gt;&lt;/<span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">${tagName}</span>&gt;</pre>`;
};

export const getFormattedImportUsageString = (path?: string): string => {
  if (!path) return "";
  return `<pre><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span> <span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">"${path}"</span>;</pre>`;
};

export const getUsageSectionMarkdown = (
  sections: [string, string?][],
): string => {
  let res = "";

  if (sections.length === 0) return res;

  res += "\n<ul id='usage'>\n";

  sections.forEach(([sectionName, sectionValue]) => {
    res += `<li><strong>${sectionName}</strong>${sectionValue || "-"}</li>`;
  });

  res += "\n</ul>\n";

  return res;
};
