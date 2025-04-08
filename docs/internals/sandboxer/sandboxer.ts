import { loadSandpackClient } from "@codesandbox/sandpack-client";
import { html, index, packageJson } from "./constants.ts";
// import blitz from "@stackblitz/sdk";

export const SANDBOXER_IFRAME_ID = "embedded-blitz";

export const SANDBOXER_IFRAME_WIDTH = "100%";
export const SANDBOXER_IFRAME_HEIGHT = "480px";

// export const createSandboxer = async (code: string) => {
//   const vm = await blitz.embedProject(
//     SANDBOXER_IFRAME_ID,
//     {
//       title: "example",
//       template: "create-react-app",
// dependencies: {
//   "@tapsioss/react-components": "latest",
//   "@tapsioss/react-icons": "latest",
//   "@tapsioss/theme": "latest",
//   react: "latest",
//   "react-dom": "latest",
// },
//       files: {
//         "src/index.js": index,
//         "public/index.html": html,
//         "src/Example.js": code,
//       },
//     },
//     {
//       crossOriginIsolated: true,
//       hideDevTools: true,
//       hideExplorer: true,
//       hideNavigation: true,
//       openFile: "Example.tsx",
//       startScript: "dev",
//       height: SANDBOXER_IFRAME_HEIGHT,
//       width: SANDBOXER_IFRAME_WIDTH,
//     },
//   );

//   return vm;
// };

export const createSandboxer = async (code: string) => {
  const client = await loadSandpackClient(
    `#${SANDBOXER_IFRAME_ID}`,
    {
      template: "create-react-app",
      files: {
        "/package.json": {
          code: packageJson,
        },
        "/src/index.js": {
          code: index,
        },
        "/public/index.html": {
          code: html,
        },
        "/src/App.js": {
          code,
        },
      },
    },
    {
      bundlerURL: "https://786946de.sandpack-bundler-4bw.pages.dev",
      height: SANDBOXER_IFRAME_HEIGHT,
      width: SANDBOXER_IFRAME_WIDTH,
    },
  );

  return client;
};
