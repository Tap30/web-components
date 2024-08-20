import fs from 'fs';
import path from 'path';

const generateReact = () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8').toString());

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync('dist/custom-elements.json').toString());
  }
  catch (e) {
    console.error('No manifest file was found. Run the `pnpm analyze` script first and try again.\n', e);
    return;
  }

  const index = [];

  function toPascalCase(text) {
    return text.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, "").toUpperCase());
  }

  const REACT_PACKAGE_PATH = 'react-components'

  console.log('Generating React components:');

  manifest.modules.filter((module) => !!module.declarations?.length).forEach(module => {
    const component = module.declarations?.[0];
    const { tagName, name, events } = component
    const tagWithoutPrefix = tagName.split('tap-')[1];
    const componentPascalCaseName =  name.split('Tap')[1]

    const componentDir = path.join(`${REACT_PACKAGE_PATH}/src`, name.split('Tap')[1]);
    const componentFile = path.join(componentDir, 'index.ts');

    const imports = `import * as React from 'react';
import { createComponent } from '@lit/react';
import { ${name} as ${name}Element } from '@tapsioss/web-components/dist/${tagWithoutPrefix}';
${(events || []).length > 0 ? "import type { EventName } from '@lit/react';" : ''}`

    const componentEvents = events ? `events: {
${events?.map(e => `    on${toPascalCase(e.name)}: '${e.name}' as EventName`).join(',\n')}
  }` : ''

    const definition = `
const ${name} = createComponent({
  tagName: '${tagName}',
  elementClass: ${name}Element,
  react: React,
  displayName: '${name}',
  ${componentEvents}
});
`

    const exports = `export default ${name};`

    const componentFileContent = [imports, definition, exports].join('\n')

    if (!fs.existsSync(componentDir)){
      fs.mkdirSync(componentDir, { recursive: true });
    }
    fs.writeFileSync(componentFile, componentFileContent, 'utf8');
    console.log(`  ✔ "${name}" component generated.`);

    index.push(`export { default as ${name} } from './${componentPascalCaseName}/index.js';`);
  })

  const tsConfigContents = JSON.stringify({
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: [
        "ES2020",
        "DOM",
        "DOM.Iterable"
      ],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      isolatedModules: true,
      moduleDetection: "force",
      noEmit: true,
      jsx: "react-jsx",
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true
    },
    include: [
      "src"
    ]
  });
  fs.writeFileSync(`${REACT_PACKAGE_PATH}/tsconfig.json`, tsConfigContents, 'utf8');
  console.log(`  ✔ tsconfig.json file generated.`);


  const reactPackageJsonContents = JSON.stringify({
    name: "@tapsioss/react-components",
    version: packageJson.version,
    files: [
      "dist/**/*.js",
      "dist/**/*.js.map",
      "dist/**/*.d.ts",
      "dist/**/*.css"
    ],
    type: "module",
    scripts: {
      build: 'tsc',
      'build:watch': 'tsc --watch',
    },
    "devDependencies": {
      typescript: packageJson?.devDependencies?.typescript ?? '~4.7.4',
    },
    dependencies: {
      [packageJson.name]: '^' + packageJson.version,
      '@lit/react': '^1.0.0',
    },
    peerDependencies: {
      react: '^16 || ^17 || ^18',
      '@types/react': '^16 || ^17 || ^18',
    },
  }, null, 2);
  fs.writeFileSync(`${REACT_PACKAGE_PATH}/package.json`, reactPackageJsonContents, 'utf8');
  console.log(`  ✔ Package.json file generated.`);

  fs.writeFileSync(`${REACT_PACKAGE_PATH}/src/index.ts`, index.join('\n'), 'utf8');
  console.log(`  ✔ Index file generated.`);

  console.log(`✨  Done`);
};

generateReact();

