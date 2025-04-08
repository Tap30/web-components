import * as fs from "node:fs/promises";
import * as path from "node:path";
import { getFileMeta } from "../../scripts/utils.ts";
import { type ComponentMetadata, type Metadata } from "../../types/docs.ts";
import {
  SANDBOXER_IFRAME_HEIGHT,
  SANDBOXER_IFRAME_ID,
  SANDBOXER_IFRAME_WIDTH,
} from "../internals/sandboxer/sandboxer.ts";
import { codify, tabulateData } from "../utils/markdown.ts";

declare global {
  interface Window {
    exampleCodes?: string[];
  }
}

const getImportsMarkdown = (component: ComponentMetadata) => {
  let res = "";

  res += `
## Importing

::: code-group
\`\`\`ts [Web]
import "${component.importPaths.webComponents}";
\`\`\`

\`\`\`ts [React]
import { ${component.name.replace("Tapsi", "")} } from "${component.importPaths.react}";
\`\`\`

:::`;

  return res;
};

const getUsageMarkdown = (component: ComponentMetadata) => {
  let res = "";

  res += `
## Component Usage

::: code-group
\`\`\`html [Web]
<${component.tagName}></${component.tagName}>
\`\`\`

\`\`\`tsx [React]
<${component.name.replace("Tapsi", "")} />
\`\`\`
:::
`;

  return res;
};

const getSlotsMarkdown = (component: ComponentMetadata) => {
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

    const reactName = component.name.replace("Tapsi", "");

    res += `\n
::: tip

You can use slot names as variables:

::: code-group
\`\`\`ts [Web]
import { ${component.slotsEnumName} } from "${component.importPaths.webComponents}";

${slots
  ?.map(slot => {
    const slotEnum =
      slot.name === "" ? "DEFAULT" : slot.name.toUpperCase().replace(/-/g, "_");

    return `console.log(${component.slotsEnumName}.${slotEnum}); // "${slot.name}"`;
  })
  .join("\n")}

\`\`\`


\`\`\`ts [React]
import { ${reactName}Slots } from "${component.importPaths.react?.split(`/${reactName}`)[0]}";

${slots
  ?.map(slot => {
    const slotEnum =
      slot.name === "" ? "DEFAULT" : slot.name.toUpperCase().replace(/-/g, "_");

    return `console.log(${reactName}Slots.${slotEnum}); // "${slot.name}"`;
  })
  .join("\n")}

\`\`\`

:::\n`;
  }

  return res;
};

const getMembersMarkdown = (component: ComponentMetadata) => {
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

const getEventsMarkdown = (component: ComponentMetadata) => {
  const events = component?.events || [];
  let res = "";

  if ((events?.length ?? 0) > 0) {
    res += "\n## Events\n";

    const reactName = component.name.replace("Tapsi", "");

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

::: code-group

\`\`\`ts [Web]
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

\`\`\`tsx [React]
import { \n  ${exportedEvents
        .map(e => `${reactName}${e.type.text}`)
        .join(
          ",\n  ",
        )}\n} from "${component.importPaths.react?.split(`/${reactName}`)[0]}";


// ...

<${reactName}
${exportedEvents
  .map(event => {
    const eventClass = event.type.text;

    return `  on${eventClass}={(e: ${reactName}${eventClass}) => {...}}`;
  })
  .join("\n")}
/>

\`\`\`

:::`;
    }
  }

  return res;
};

const getExampleCodes = (component: ComponentMetadata) => {
  if (component.examples.length === 0) return [];

  return component.examples.map(example => example.code);
};

const getExamplesMarkdown = (component: ComponentMetadata) => {
  if (component.examples.length === 0) return "";

  let md = [
    "## Examples",
    "You can explore a variety of examples that demonstrate different patterns implemented in React.",
    "\n",
  ].join("\n");

  const iframe = `<iframe allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" id=${SANDBOXER_IFRAME_ID} style="width: ${SANDBOXER_IFRAME_WIDTH};height: ${SANDBOXER_IFRAME_HEIGHT};"></iframe>`;

  component.examples.forEach(example => {
    md = md.concat(
      [
        example.metadata.title,
        example.metadata.description ?? "unknown",
        "\n",
        iframe,
      ].join("\n"),
    );
  });

  return md;
};

const getGlobalScopeVars = (component: ComponentMetadata) => {
  const body: string[] = [];

  if (component.examples.length !== 0) {
    body.push(
      `window.exampleCodes = ${JSON.stringify(getExampleCodes(component))};`,
    );
  }

  return ["<script>", body.join("\n"), "</script>"].join("\n");
};

const getComponentMarkdown = (component: ComponentMetadata) => {
  const pageTitle = component.name.replace(/^Tapsi/, "");

  return [
    getGlobalScopeVars(component),
    "<script setup>",
    `import { createSandboxer } from "../internals/sandboxer/sandboxer.ts";`,
    `window.createSandboxer = createSandboxer;`,
    "</script>",
    `# ${pageTitle}`,
    component.summary,
    "\n",
    getImportsMarkdown(component),
    getUsageMarkdown(component),
    getExamplesMarkdown(component),
    getMembersMarkdown(component),
    getSlotsMarkdown(component),
    getEventsMarkdown(component),
  ].join("\n");
};

export default {
  async paths() {
    const { dirname } = getFileMeta(import.meta.url);

    const docsDir = path.join(dirname, "..");
    const workspaceDir = path.join(docsDir, "..");

    const metadataFile = path.join(
      workspaceDir,
      "packages/web-components/components-metadata.json",
    );

    const metadata = JSON.parse(
      await fs.readFile(metadataFile, { encoding: "utf-8" }),
    ) as Metadata;

    return metadata.components.map(c => {
      return {
        params: {
          component: c.kebabCaseName,
        },
        content: getComponentMarkdown(c),
      };
    });
  },
};
