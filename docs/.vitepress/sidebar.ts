import type { Package } from "custom-elements-manifest";
import fs from "fs";
import { DefaultTheme } from "vitepress";

const getComponentsDevItems = () => {
  const file = fs.readFileSync("dist/custom-elements.json");
  const manifest = JSON.parse(file.toString()) as Package;
  return manifest.modules
    .filter(module => !!module.declarations?.length)
    .map(module => {
      if (!module.exports)
        throw new Error(`Module has no export: ${module.path}`);

      const components = module.exports.filter(
        exp => exp.kind === "custom-element-definition",
      );

      // For now, we assume we have only one custom element per module
      const component = components[0];

      return {
        link: "/components/" + component.name,
        text: component.name,
      };
    });
};

const getSidebarDevContents = (): DefaultTheme.Sidebar => {
  return [
    { text: "Getting Started", link: "/getting-started" },
    {
      text: "Design System Guidelines",
      base: "/design/",
      link: "/guidelines",
    },
    {
      text: "Components",
      collapsed: false,
      items: getComponentsDevItems(),
    },
    {
      text: "API References",
      collapsed: false,
      items: [
        { text: "CSS Parts", link: "/references/css-parts" },
        {
          text: "Design Tokens",
          items: [
            { text: "Colors", link: "/references/color-tokens" },
            { text: "Radius", link: "/references/radius-tokens" },
            { text: "Spacing", link: "/references/spacing-tokens" },
            { text: "Stroke", link: "/references/stroke-tokens" },
            { text: "Typography", link: "/references/typography-tokens" },
            { text: "Components", link: "/references/components-tokens" },
          ],
        },
      ],
    },
  ];
};

const getComponentsDesignItems = () => {
  const componentGuidelinesBasePath = "docs/design/components";
  const files = fs
    .readdirSync(componentGuidelinesBasePath)
    .filter(file => file.endsWith(".md"))
    .map(file => file.replace(".md", ""));
  return files.map(file => {
    return {
      link: "components/" + file,
      text: file,
    };
  });
};

const getSidebarDesignContents = (): DefaultTheme.Sidebar => {
  return [
    { text: "Introduction", link: "/guidelines" },
    {
      text: "Component Guidelines",
      base: "/design/",
      items: getComponentsDesignItems(),
    },
  ];
};

export default {
  "/dev/": { base: "/dev/", items: getSidebarDevContents() },
  "/design/": { base: "/design/", items: getSidebarDesignContents() },
} as DefaultTheme.Sidebar;
