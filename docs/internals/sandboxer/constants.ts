export const tsconfigJson = `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],

    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "allowJs": false,
    "checkJs": false,
    "jsx": "react-jsx",

    "strict": true,
    "pretty": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "rewriteRelativeImportExtensions": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noImplicitAny": true,
    "noUnusedParameters": true,
    "noUncheckedIndexedAccess": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
`;

export const packageJson = `{
  "name": "example",
  "private": true,
  "version": "0.0.0",
  "main": "/src/index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "dependencies": {
    "@tapsioss/react-components": "latest",
    "@tapsioss/react-icons": "latest",
    "@tapsioss/theme": "latest",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-scripts": "^5.0.1"
  }
}
`;

export const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <title>Tapsi Example</title>
  </head>
  <body dir="rtl">
    <div id="root"></div>
  </body>
</html>
`;

export const index = `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@tapsioss/theme/css-variables";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

export const viteConfig = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`;

export const nextjsAppPage = `const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
};

export default App;
`;
