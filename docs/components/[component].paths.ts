import fs from "node:fs";

import path from "node:path";
import {
  type Component,
  type Metadata,
} from "../../internals/doc-helpers/types";
import { getFileMeta } from "../../scripts/utils";
import { codify, tabulateData } from "../utils/md";

export default {
  paths() {
    const { dirname } = getFileMeta(import.meta.url);

    const docsDir = path.resolve(dirname, "..");
    const workspaceDir = path.join(docsDir, "..");
    const distDir = path.join(workspaceDir, "dist");
    const metadataFile = path.join(distDir, "components-metadata.json");

    const metadata = JSON.parse(
      fs.readFileSync(metadataFile).toString(),
    ) as Metadata;

    return metadata.components.map(c => {
      let content = "";

      content += getComponentMarkdown(c);

      return {
        params: {
          component: c.kebabCaseName,
        },
        content,
      };
    });
  },
};

const getComponentMarkdown = (component: Component) => {
  let res = "\n";

  if (component) {
    res += `# ${component.name?.split("Tapsi")[1]}\n`;

    res += `${component.summary}\n`;

    res += getUsageMarkdown(component);

    res += getMembersMarkdown(component);

    res += getSlotsMarkdown(component);

    res += getEventsMarkdown(component);
  }

  return res;
};

const getSlotsMarkdown = (component: Component) => {
  const slots = component?.slots || [];
  let res = "";

  if ((slots?.length ?? 0) > 0) {
    res += "\n## Slots\n";

    res += tabulateData(
      ["Name", "Description"],
      slots?.map(({ description, name }) => [
        name ? codify(name) : "-",
        description || "-",
      ]),
    );

    res += `\n
::: tip

You can use slot names as variables:

\`\`\`ts
import { ${component.slotsEnumName} } from "${component.importPaths.webComponents}";

${slots
  ?.map(slot => {
    const slotEnum =
      slot.name === "" ? "DEFAULT" : slot.name.toUpperCase().replace(/-/g, "_");

    return `console.log(${component.slotsEnumName}.${slotEnum}); // "${slot.name}"`;
  })
  .join("\n")}

\`\`\`

:::`;
  }

  return res;
};

const getUsageMarkdown = (component: Component) => {
  let res = "";

  res += "\n<ul id='usage'>\n";

  res += `<li><strong>Import</strong><pre><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span> <span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">"${component.importPaths.webComponents}"</span>;</pre></li>`;
  res += `<li><strong>Tag</strong><pre>&lt;<span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">${component.tagName}</span>&gt;&lt;/<span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">${component.tagName}</span>&gt;</pre></li>`;

  res += "\n</ul>\n";

  return res;
};

const getMembersMarkdown = (component: Component) => {
  const members = component.members || [];
  let res = "";

  if ((members.length ?? 0) > 0) {
    res += "\n## Properties\n";

    res += tabulateData(
      ["Name", "Description", "Type", "Default Value"],
      members.map(member => {
        if (member.kind !== "field") return [];
        const { type, name, description, default: defaultValue } = member;

        return [
          name ? codify(name) : "-",
          description?.replace(/\\/g, "<br>") || "",
          type?.text
            ? type.text
                ?.split("|")
                .map(t => codify(t.trim().replace(/'/g, '"')))
                .join(" \\| ")
            : "-",
          defaultValue ? codify(defaultValue.replace(/'/g, '"')) : "-",
        ];
      }),
    );
  }

  return res;
};

const getEventsMarkdown = (component: Component) => {
  const events = component?.events || [];
  let res = "";

  if ((events?.length ?? 0) > 0) {
    res += "\n## Events\n";

    res += tabulateData(
      ["Name", "Description", "Type"],
      events?.map(({ description, name, type }) => [
        name ? codify(name) : "-",
        description
          ?.replace(/cancelable/g, '<Badge type="danger">Cancelable</Badge>')
          .replace(/bubbles/g, '<Badge type="warning">Bubbles</Badge>') || "-",
        type?.text ? codify(type.text) : "-",
      ]),
    );

    const exportedEvents = events.filter(e => {
      return (
        !!e.type && e.type.text !== "Event" && e.type.text !== "InputEvent"
      );
    });

    if (exportedEvents.length > 0) {
      res += `\n
::: tip

You can import custom event names:

\`\`\`ts
import { \n  ${exportedEvents
        .map(e => e.type.text)
        .join(",\n  ")}\n} from "${component.importPaths.webComponents}";

${exportedEvents
  .map(event => {
    const eventClass = event.type.text;

    return `element.addEventListener(${eventClass}.type, handle${component.name}${event.type.text.replace("Event", "")});`;
  })
  .join("\n")}

\`\`\`

:::`;
    }
  }

  return res;
};
