import fs from 'fs';

const packages = [
    {
      "name": "web-component",
      "title": "Lit"
    },
    {
      "name": "react",
      "title": "React"
    }
  ]
;

export default {
  paths() {
    return packages.map((pck) => {
      let content = '';

      content += `#  ${pck.title} \n`;

      content += getInstallSection(pck.name);

      content += getImportSection(pck.name);

      content += getUsageSection(pck.name);

      return {
        params: { pck: pck.name },
        content,
      };
    });
  },
};

function getInstallSection(name: string) {
  return `
### Installation

If you are using node and NPM, you can install this component using npm:

::: code-group

\`\`\`bash [npm]
npm install @tapsi-oss/${name}
\`\`\`

\`\`\`bash [yarn]
yarn add @tapsi-oss/${name}
\`\`\`

\`\`\`bash [pnpm]
pnpm install @tapsi-oss/${name}
\`\`\`

:::

`;
}

function getImportSection(name: string) {
  if (name === 'react')
    return `
### Import

Then import this component into your project:

\`\`\`js
import Button from '@tapsi-oss/react/Button';
\`\`\`
`;

  if (name === 'web-component')
    return `

### Import

Then import this component into your project by using a bare module specifier:

\`\`\`js
import '@tapsi-oss/web-component/button';
\`\`\`
`;

  return '';
}

function getUsageSection(name: string) {
  if (name === 'react')
    return `
### Usage

Now You can use components in your code:

\`\`\`js
<Button>Click me!</Button>
\`\`\`
`;

  if (name === 'web-component')
    return `
### Usage

Now You can use components in your code:

\`\`\`js
<tap-button>Click me!</tap-button>
\`\`\`
`;

  return '';
}
