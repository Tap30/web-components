import fs from "node:fs";
import path from "node:path";
import { getFileMeta } from "../../scripts/utils.ts";
import {
  type ComponentMetadata,
  type Metadata,
  type PackageMetadata,
} from "../../types/docs.ts";
import { codify, tabulateData } from "../utils/markdown.ts";

let packagesMetadata: null | PackageMetadata = null;
const REACT_PACKAGE_NAME = "@tapsioss/react-components";

export default {
  paths() {
    const { dirname } = getFileMeta(import.meta.url);

    const docsDir = path.resolve(dirname, "..");
    const workspaceDir = path.join(docsDir, "..");
    const metadataFile = path.join(
      workspaceDir,
      "packages/web-components/metadata.json",
    );

    const metadata = JSON.parse(
      fs.readFileSync(metadataFile).toString(),
    ) as Metadata;

    packagesMetadata = metadata.package;

    return Object.values(metadata.components).map(c => {
      let content = "";

      content += getPageMarkdown(c);

      return {
        params: {
          component: c.relativePath,
        },
        content,
      };
    });
  },
};

const getPageMarkdown = (component: ComponentMetadata) => {
  let res = "\n";

  if (component) {
    res += getComponentMarkdown(component);

    const compoundParts = Object.values(component.compoundParts);

    if (compoundParts.length > 0) {
      res += "\n## Compound Parts";

      compoundParts.forEach(c => {
        res += getComponentMarkdown(c as ComponentMetadata, 3);
      });
    }
  }

  return res;
};

const getComponentMarkdown = (
  component: ComponentMetadata,
  headingLevel = 1,
) => {
  let res = "\n";

  if (component) {
    res += `${"#".repeat(headingLevel)} ${component.elementClassName}\n`;

    res += `${component.summary}\n\n`;

    res += getImportsMarkdown(component, headingLevel);

    res += getUsageMarkdown(component, headingLevel);

    res += getPropsMarkdown(component, headingLevel);

    res += getMethodsMarkdown(component, headingLevel);

    res += getSlotsMarkdown(component, headingLevel);

    res += getEventsMarkdown(component, headingLevel);
  }

  return res;
};

const getImportsMarkdown = (
  component: ComponentMetadata,
  headingLevel: number = 1,
) => {
  let res = "";

  res += `${"#".repeat(headingLevel + 1)} Importing\n`;

  const componentHumanReadableName = component.name.replace(/-/g, " ");
  const compoundParts = Object.values(component.compoundParts || {});

  if (headingLevel === 1) {
    res += [
      `To use the ${componentHumanReadableName} component,`,
      `first you need to register the component inside the page.`,
    ].join("\n");

    const hasAutomaticRegister = "*/element" in component.endpointExports;
    const hasManualComponentRegister =
      component.endpointExports["*"]?.includes("register");

    const manualBarrelRegisterFunctionName = component.endpointExports[
      ""
    ]?.find(e => e.startsWith("register"));

    if (hasManualComponentRegister) {
      res +=
        "\n\nYou can register the component manually by importing the `register` function";

      res += "\n\n";
      res += [
        "::: code-group",
        "```ts [Web]",
        `import { register } from "${packagesMetadata?.name}/${component.relativePath}";`, // remove this section from compound
        "",
        `register(); // Now the ${componentHumanReadableName} component is ready to use!`,
        "```",
        ":::",
      ].join("\n");
    }

    if (manualBarrelRegisterFunctionName) {
      res += `\n\nHere is another way to register the ${componentHumanReadableName} component:`;

      res += "\n\n";
      res += [
        "::: code-group",
        "```ts [Web]",
        `import { ${manualBarrelRegisterFunctionName} } from "${packagesMetadata?.name}";`, // remove this section from compound
        "",
        `${manualBarrelRegisterFunctionName}(); // Now the ${componentHumanReadableName} component is ready to use!`,
        "```",
        ":::",
      ].join("\n");
    }

    if (hasAutomaticRegister) {
      res += `\n\nAlso you can automatically register the component by importing it with the following approach:`;

      res += "\n\n";
      res += [
        "::: code-group",
        "```ts [Web]",
        `import { ${manualBarrelRegisterFunctionName} } from "${packagesMetadata?.name}/${component.relativePath}/element";`,
        "```",
        ":::",
      ].join("\n");

      res += "\n\n";
      res += [
        "::: tip",
        "If you want to use all the component in your app, you can call `registerAllElements` at the root of your project.",
        "```ts [Web]",
        `import "${packagesMetadata?.name}";`,
        ``,
        `registerAllElements(); // All the components are now available`,
        "```",
        ":::",
      ].join("\n");
    }

    res += "\n\n";

    if (compoundParts.length > 0) {
      res += "\n\n";
      res += [
        "::: info",
        `By registering the ${componentHumanReadableName} component, its compound tags will also be registered:`,
        compoundParts.map(c => `- ${codify(c.tagName)}`).join("\n"),
        ":::",
      ].join("\n");
      res += "\n\n";
    }
  } else {
    res += "\n\n";
    res += `By registering the parent component, the ${componentHumanReadableName} will also be registered.`;
    res += "\n\n";
  }

  res +=
    "In the React package, you can easily add the component using the following code:";
  res += "\n\n";
  res += [
    "::: code-group",
    "```ts [React]",
    `import { ${component.elementClassName} } from "${REACT_PACKAGE_NAME}";`,
    "```",
    ":::",
  ].join("\n");

  return res;
};

const getUsageMarkdown = (
  component: ComponentMetadata,
  headingLevel: number = 1,
) => {
  let res = "";

  res += `
${"#".repeat(headingLevel + 1)} Component Usage

::: code-group
\`\`\`html [Web]
<${component.tagName}></${component.tagName}>
\`\`\`

\`\`\`tsx [React]
<${component.elementClassName} />
\`\`\`
:::
`;

  return res;
};

const getSlotsMarkdown = (
  component: ComponentMetadata,
  headingLevel: number = 1,
) => {
  const slots = component?.slots || [];
  let res = "";

  if ((Object.keys(slots)?.length ?? 0) > 0) {
    res += `\n${"#".repeat(headingLevel + 1)} Slots\n`;

    res += tabulateData(
      ["Name", "Value", "Description"],
      Object.values(slots)?.map(({ description, value, key }) => [
        key ? codify(key) : "-",
        value ? codify(value) : "-",
        description || "-",
      ]),
    );

    if (headingLevel === 1) {
      const componentSlotImports = component.endpointExports["*"]?.filter(e =>
        e.endsWith("Slots"),
      );

      const barrelSlotImports = component.endpointExports[""]?.filter(e =>
        e.endsWith("Slots"),
      );

      res += "\n\n";
      res += [
        "::: tip",
        "The value of slots are available for developer as JavaScript Variables:",
        "```ts",
        "// Option 1",
        `import { ${barrelSlotImports?.join(", ")} } from "${REACT_PACKAGE_NAME}";`,
        "",
        "// Option 2",
        `import { ${componentSlotImports?.join(", ")} } from "${REACT_PACKAGE_NAME}/${component.relativePath}";`,
        "```",
        ":::",
      ].join("\n");
    }
  }

  return res;
};

const getPropsMarkdown = (
  component: ComponentMetadata,
  headingLevel: number = 1,
) => {
  const props = Object.values(component.props) || [];
  let res = "";

  if ((props.length ?? 0) > 0) {
    res += `\n${"#".repeat(headingLevel + 1)} Properties\n`;

    res += tabulateData(
      ["Name", "Attribute Name", "Description", "Type", "Default Value"],
      props.map(p => {
        const { type, name, description, default: defaultValue, attribute } = p;

        const types = type
          .split("|")
          .map(t => t.trim())
          .filter(Boolean);

        let typesString = "";

        switch (types.length) {
          case 1:
            typesString = `\`${types[0]}\``;
            break;
          case 2:
            typesString = types.map(t => `\`${t}\``).join(" \\| ");
            break;
          default:
            typesString = types.map(t => `\\| \`${t.trim()}\``).join("<br>");
        }

        return [
          name ? codify(name) : "-",
          attribute ? codify(attribute) : "-",
          description.replace(/\n/g, "<br>") || "",
          type ? typesString : "-",
          defaultValue ? codify(defaultValue.replace(/'/g, '"')) : "-",
        ];
      }),
    );
  }

  return res;
};

const getMethodsMarkdown = (
  component: ComponentMetadata,
  headingLevel: number = 1,
) => {
  const props = Object.values(component.methods) || [];
  let res = "";

  if ((props.length ?? 0) > 0) {
    res += `\n${"#".repeat(headingLevel + 1)} Methods\n`;

    res += tabulateData(
      ["Name", "Description", "Parameters"],
      props.map(p => {
        const { name, description, parameters } = p;

        return [
          name ? codify(name) : "-",
          description?.replace(/\n/g, "<br>") || "-",
          parameters
            ? parameters
                .map(
                  p =>
                    `**Name**: \`${p.name}\`${p.type && `<br>**Type**:  (\`${p.type.split("|").join("\\|")}\`)`}${p.description && `: ${p.description}`}`,
                )
                .join("<br><br>")
            : "-",
        ];
      }),
    );
  }

  return res;
};

const getEventsMarkdown = (
  component: ComponentMetadata,
  headingLevel: number = 1,
) => {
  const events = Object.values(component?.events) || [];
  let res = "";

  if ((events?.length ?? 0) > 0) {
    res += `\n${"#".repeat(headingLevel + 1)} Events\n`;

    res += tabulateData(
      ["Name", "Description", "Type", "Bubbles", "Cancelable"],
      events?.map(
        ({ description, name, eventClassName, bubbles, cancelable }) => [
          name ? codify(name) : "-",
          description
            ?.replace(/cancelable/g, '<Badge type="danger">Cancelable</Badge>')
            .replace(/bubbles/g, '<Badge type="warning">Bubbles</Badge>') ||
            "-",
          eventClassName ? codify(eventClassName) : "-",
          bubbles ? "Yes" : "No",
          cancelable ? "Yes" : "No",
        ],
      ),
    );

    const componentEventImports =
      component.endpointExports["*"]?.filter(
        e => e.endsWith("Event") && !["Event", "InputEvent"].includes(e),
      ) || [];

    const barrelEventImports =
      component.endpointExports[""]?.filter(
        e => e.endsWith("Event") && !["Event", "InputEvent"].includes(e),
      ) || [];

    if (barrelEventImports.length > 0) {
      res += [
        "",
        "::: tip",
        "",
        "Event details are available as JavaScript variables:",
        "",
        "```ts",
        "// Option 1",
        `import {\n ${componentEventImports.join(",\n ")}\n} from "${packagesMetadata?.name}/${component.relativePath}";`,
        "",
        "// Option 2",
        `import {\n ${barrelEventImports.join(",\n ")}\n} from "${packagesMetadata?.name}";`,
        "",
        "```",
        "",
        "You can have access to the event name using the `type` property:",
        "",
        "```ts",
        "// Option 1",
        `${componentEventImports.map(e => `element.addEventListener(${e}.type, handle${e.replace("Event", "")});`).join("\n")}`,
        "",
        "// Option 2",
        `${barrelEventImports.map(e => `element.addEventListener(${e}.type, handle${e.replace(component.elementClassName, "").replace("Event", "")});`).join("\n")}`,
        "",
        "```",
        "",
        ":::",
      ].join("\n");
      // res += `\n
      //
      //
      //
      //
      //
      //
      //
      //
      //
      // ${events
      //   .map(event => {
      //     const eventClass = event.eventClassName;
      //
      //     return `element.addEventListener(${eventClass}.type, handle${component.name}${event.eventClassName.replace("Event", "")});`;
      //   })
      //   .join("\n")}
      //
      //
      // \`\`\`
      //
      // :::`;
    }
  }

  return res;
};
