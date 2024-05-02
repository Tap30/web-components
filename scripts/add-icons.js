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
const repoUrl = args.repoUrl || 'https://github.com/amir78729/icons/archive/refs/heads/main.zip';
const cachePath = args.cachePath || './.cache/icons/';
const zipFilename = 'repo.zip';

// Removes all files with a specified extension from a directory
function removeFilesByExtension(directory, extension) {
  console.log(`Removing ${extension} files from ${directory}...`);
  const files = fs.readdirSync(directory);
  for (const file of files) {
    if (file.endsWith(`.${extension}`)) {
      fs.unlinkSync(path.join(directory, file));
    }
  }
  console.log(`Files removed successfully`);
}

// Updates SVG files in the directory
function updateSVGFiles(directory) {
  console.log(`Processing svg files in ${directory}...`);
  const files = fs.readdirSync(directory);
  files.filter(file => file.endsWith('.svg')).forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Add id attribute and update other attributes in the SVG
    const id = path.basename(file, '.svg');
    const svgTagRegex = /<svg([^>]*)>/i;
    content = content.replace(svgTagRegex, `<svg$1 id="${id}">`)
      .replace(/black/gi, 'currentColor')
      .replace(/(width|height)\s*=\s*"[^"]*"/gi, '');

    fs.writeFileSync(filePath, content, 'utf-8');
  });
  console.log(`Files processed successfully`);
}

// Generates a story file for the icons
function generateStoryFile(directory, outputFilename) {
  console.log(`Generating story file from ${directory} in ${outputFilename}...`);
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
  console.log(`Generated story file: ${outputFilename}`);
}

// Downloads and extracts icon SVGs from the repository
async function downloadIcons(repoUrl, outputDir, zipFilename) {
  console.log(`Downloading icons from ${repoUrl}...`);
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

  console.log(`Extracting ${zipPath} to ${outputDir}`);
  await new Promise((resolve, reject) => {
    console.log(`unzip -j ${zipPath} "*.svg" -d ${outputDir}`)
    exec(`unzip -j ${zipPath} "*.svg" -d ${outputDir}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Unzip error: ${stderr}`);
        return reject(error);
      }
      console.log(`Extraction completed: ${stdout}`);
      resolve();
    });
  });

  fs.unlinkSync(zipPath);
  console.log('ZIP file deleted successfully.');
}

// Adds downloaded icons to the project
async function addIconsToProject(repoUrl, outputDir, zipFilename) {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await downloadIcons(repoUrl, outputDir, zipFilename);

    updateSVGFiles(outputDir);

    generateStoryFile(outputDir, storyPath);

  } catch (error) {
    console.error('Error processing the repo:', error);
  }
}

// Main function to orchestrate the process
function main() {
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath, { recursive: true });
  }

  const existingSVGs = fs.readdirSync(cachePath).some(file => file.endsWith('.svg'));

  if (existingSVGs && !process.argv.includes('-f')) {
    console.log('Icons are already available. use `-f` flag to override existing SVG files');
  } else {
    if (existingSVGs) {
      removeFilesByExtension(cachePath, 'svg');
      console.log('Existing SVG files removed.');
    }
    addIconsToProject(repoUrl, cachePath, zipFilename)
      .then(() => console.log('Done'))
      .catch(err => console.error('Failed: ', err));
  }
}

main();
