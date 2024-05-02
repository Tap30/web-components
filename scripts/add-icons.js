import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { Readable } from 'stream';

function parseArguments() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    const [key, value] = arg.split('=');
    if (key && value) {
      args[key.replace('--', '')] = value;
    }
  });
  return args;
}

// TODO: move to env
const args = parseArguments();
const storyPath = args.storyPath || 'src/icon/iconSet.stories.ts';
const repoUrl = args.repoUrl || 'https://github.com/amir78729/icons/archive/refs/heads/main.zip'; // TODO: add to Tap30
const cachePath = args.cachePath || './assets/';
const zipFilename = 'repo.zip';

function removeFilesByExtension(directory, extension) {
  console.info(`Removing ${extension} files from ${directory}...`);
  const files = fs.readdirSync(directory);
  for (const file of files) {
    if (file.endsWith(`.${extension}`)) {
      fs.unlinkSync(path.join(directory, file));
    }
  }
  console.info(`Files removed successfully`);
}

function updateSVGFiles(directory) {
  console.info(`Processing svg files in ${directory}...`);
  const files = fs.readdirSync(directory);
  files.filter(file => file.endsWith('.svg')).forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    const id = path.basename(file, '.svg');
    const svgTagRegex = /<svg([^>]*)>/i;
    content = content.replace(svgTagRegex, `<svg$1 id="${id}">`)
      .replace(/black/gi, 'currentColor')
      .replace(/(width|height)\s*=\s*"[^"]*"/gi, '');

    fs.writeFileSync(filePath, content, 'utf-8');
  });
  console.info(`Files processed successfully`);
}

function generateStoryFile(directory, outputFilename) {
  console.info(`Generating story file from ${directory} in ${outputFilename}...`);
  const files = fs.readdirSync(directory);
  const iconNames = files.filter(file => file.endsWith('.svg')).map(file => path.basename(file, '.svg'));

  let storyContent = `
import {html, TemplateResult} from "lit";
import "./index.js";

export default {
  title: "Icons",
  component: "tap-icon",
  argTypes: {
    color: {
      control: {type: "text"},
      description: "The icon color",
    },
    width: {
      control: {type: "number"},
      description: "The icon width(\`px\`)",
    },
    height: {
      control: {type: "number"},
      description: "The icon height(\`px\`)",
    },
    name: {
      control: {
        type: "select",
      },
      options: ${JSON.stringify(iconNames)},
      description: "The icon name",
    }
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  color?: string,
  width?: number,
  height?: number,
  name?: string,
}

const AllIconsTemplate: Story<ArgTypes> = ({color, width, height}: ArgTypes) => html\`\n<div style="display: flex; flex-wrap: wrap">
`;

  // Add all <tap-icon> elements for each SVG file to the Template
  iconNames.forEach(iconName => {
    storyContent += `  <tap-icon color=\${color} width=\${width} height=\${height} name="${iconName}"></tap-icon>\n`;
  });

  storyContent += `</div>\`;

export const AllIcons = AllIconsTemplate.bind({});
AllIcons.args = {color: '#000000', width: 24, height: 24};

const SingleNamedTemplate: Story<ArgTypes> = ({color, width, height, name}: ArgTypes) => html\`
  <tap-icon color=\${color} width=\${width} height=\${height} name=\${name}></tap-icon>
\`
export const NamedIcon = SingleNamedTemplate.bind({});
NamedIcon.args = {color: '#ff5722', width: 100, height: 100};

`;

  fs.writeFileSync(outputFilename, storyContent, 'utf-8');
  console.info(`Generated story file: ${outputFilename}`);
}

async function downloadIcons(repoUrl, outputDir, zipFilename) {
  console.info(`Downloading icons from ${repoUrl}...`);
  const response = await fetch(repoUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const zipPath = path.join(outputDir, zipFilename);
  const fileStream = fs.createWriteStream(zipPath);

  const readable = Readable.fromWeb(response.body);
  readable.pipe(fileStream);

  await new Promise((resolve, reject) => {
    fileStream.on('finish', resolve);
    fileStream.on('error', reject);
  });

  console.info(`Extracting ${zipPath} to ${outputDir}`);
  await new Promise((resolve, reject) => {
    exec(`unzip -j ${zipPath} "*.svg" -d ${outputDir}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Unzip error: ${stderr}`);
        return reject(error);
      }
      console.info(`Extraction completed: ${stdout}`);
      resolve();
    });
  });

  fs.unlinkSync(zipPath);
  console.info('Zip file deleted successfully.');
}

async function addIconsToProject(repoUrl, outputDir, zipFilename) {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    if (!fs.existsSync(cachePath)) {
      fs.mkdirSync(cachePath, { recursive: true });
    }

    const existingSVGs = fs.readdirSync(cachePath).some(file => file.endsWith('.svg'));
    if (existingSVGs && !process.argv.includes('-f')) {
      console.info('Icons are already available. use `-f` flag to override existing SVG files');
    } else {
      if (existingSVGs) {
        removeFilesByExtension(cachePath, 'svg');
        console.info('Existing SVG files removed.');
      }
      await downloadIcons(repoUrl, outputDir, zipFilename);
    }

    updateSVGFiles(outputDir);

    generateStoryFile(outputDir, storyPath);

  } catch (error) {
    console.error('Error processing the repo:', error);
  }
}

export function addIcons() {
  addIconsToProject(repoUrl, cachePath, zipFilename)
    .then(() => console.info('Done'))
    .catch(err => console.error('Failed: ', err));
}
