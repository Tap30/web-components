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

  const ORGANIZATION_NAME = '@tapsioss';
  const REACT_PACKAGE_PATH = 'react-components';
  const REACT_PACKAGE_NAME = `${ORGANIZATION_NAME}/react-components`

  console.log('Generating React wrapper package:');

  console.log('  Generating component:');

  manifest.modules.filter((module) => !!module.declarations?.length).forEach(module => {
    const component = module.declarations?.[0];
    const { tagName, name, events } = component
    const tagWithoutPrefix = tagName.split('tap-')[1];
    const componentPascalCaseName =  name.split('Tap')[1]

    const componentDir = path.join(`${REACT_PACKAGE_PATH}/src`, name.split('Tap')[1]);
    const componentFile = path.join(componentDir, 'index.ts');

    const imports = `import * as React from 'react';
import { createComponent } from '@lit/react';
import { ${name} as ${name}Element } from '${ORGANIZATION_NAME}/web-components/dist/${tagWithoutPrefix}';
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
    console.log(`    ✔ "${name}" component generated.`);

    index.push(`export { default as ${name} } from './${componentPascalCaseName}/index.js';`);
  })
  fs.writeFileSync(`${REACT_PACKAGE_PATH}/src/index.ts`, index.join('\n'), 'utf8');
  console.log(`  ✔ Index file generated.`);

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
    include: ["src"]
  }, null, 2);
  fs.writeFileSync(`${REACT_PACKAGE_PATH}/tsconfig.json`, tsConfigContents, 'utf8');
  console.log(`  ✔ tsconfig.json file generated.`);


  const reactPackageJsonContents = JSON.stringify({
    name: REACT_PACKAGE_NAME,
    version: packageJson.version,
    files: [
      "dist/**/*.js",
      "dist/**/*.js.map",
      "dist/**/*.d.ts",
      "dist/**/*.css"
    ],
    type: "module",
    scripts: {
      build: 'tsc && rollup -c',
      'build:watch': 'tsc --watch',
    },
    devDependencies: {
      typescript: packageJson?.devDependencies?.typescript ?? '~4.7.4',
      "@rollup/plugin-image": "^2.1.1",
      "@rollup/plugin-node-resolve": "^13.2.1",
      "@rollup/plugin-replace": "^4.0.0",
      "@rollup/plugin-typescript": "^8.3.3",
      "@types/react": "17.0.2",
      "@rollup/plugin-babel": "6.0.4",
      "@rollup/plugin-commonjs": "26.0.1",
      "rollup-plugin-peer-deps-external": "^2.2.4",
      "rollup-plugin-postcss": "^4.0.2"
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
  console.log(`  ✔ Package file generated.`);

  const rollupConfigContents = `import externalDeps from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

const depsName = [
  ...new Set(Object.keys({ ...pkg.peerDependencies, ...pkg.dependencies }).map((pkgName) => pkgName.split('/')[0])),
];
const external = depsName.map((packageName) => new RegExp(\`\${packageName}\`));

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const extensions = ['.ts', '.tsx'];
const babelConfig = {
  babelrc: false,
  extensions,
  runtimeHelpers: true,
  exclude: /node_modules/,
  presets: ['@babel/env', '@babel/preset-react'],
};
const resolveConfig = { extensions, mainFields: ['jsnext:main', 'main', 'module'] };
const postOptions = {
  extract: false,
  modules: true,
  use: ['sass'],
};

const plugins = [
  replace({
    preferBuiltins: true,
    preventAssignment: true,
  }),
  resolve(resolveConfig),
  babel(babelConfig),
  typescript(),
  commonJS(),
  externalDeps(),
  image(),
  postcss(postOptions),
];

export default {
  input: \`src/index.ts\`,
  output: [
    {
      name: '${REACT_PACKAGE_NAME}',
      file: \`dist/index.js\`,
      format: 'cjs',
    },
    {
      name: '${REACT_PACKAGE_NAME}',
      file: \`dist/index.es.js\`,
      format: 'esm',
    },
    {
      name: '${REACT_PACKAGE_NAME}',
      file: \`dist/index.umd.js\`,
      format: 'umd',
      globals,
    },
  ],
  external: [...external, 'react', 'react-dom'],
  plugins,
};
`;
  fs.writeFileSync(`${REACT_PACKAGE_PATH}/rollup.config.js`, rollupConfigContents, 'utf8');
  console.log(`  ✔ Rollup config file generated.`);



  console.log(`✨  Done`);
};

generateReact();

