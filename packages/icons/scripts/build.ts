/* eslint-disable no-console */
import globAsync from "fast-glob";
import Mustache from "mustache";
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { ensureDirExists } from "../../../scripts/utils";

const execCmd = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDir = path.resolve(__dirname, "..");
const iconsDir = path.join(packageDir, "src/svgs");
const distDir = path.join(packageDir, "dist");
const tempDir = path.join(distDir, ".tmp");
const templatesDir = path.join(packageDir, "templates");

const pathsTempDir = path.join(tempDir, "paths");
const webTempDir = path.join(tempDir, "web");
const reactTempDir = path.join(tempDir, "react");

const pathsJSONFile = path.join(pathsTempDir, "paths.json");

const webDistDir = path.join(distDir, "web");
const reactDistDir = path.join(distDir, "react");

type SVGPathInfo = {
  clipRule?: string;
  fillRule?: string;
  xlinkHref?: string;
  d: string;
};

type SVGIconInfo = {
  kebabName: string;
  pascalName: string;
  paths: SVGPathInfo[];
};

const toPascalCase = (str: string, splitRegex: RegExp | string) => {
  const baseCase = str.split(splitRegex);

  return baseCase
    .map(part => part.charAt(0).toUpperCase() + part.substring(1))
    .join("");
};

const doesFileExist = async (filePath: string) => {
  try {
    await fs.stat(filePath);

    return true;
  } catch {
    return false;
  }
};

const extractPathsInfo = (svgData: string) => {
  const paths = svgData
    // Remove the opening <svg> tag
    .replace(/<svg[^>]*>/g, "")
    // Remove the closing </svg> tag
    .replace(/<\/svg>/g, "")
    // Ensure proper closing tags with spaces
    .replace(/"\/>/g, '" />')
    // Remove fill attributes to make them more generic
    .replace(/ fill=".+?"/g, "")
    // Remove fill-opacity attributes
    .replace(/ fill-opacity=".+?"/g, "")
    // Remove clip-path attributes to fix visibility issue and save some bytes
    .replace(/ clip-path=".+?"/g, "")
    // Remove entire <clipPath> elements
    .replace(/<clipPath.+?<\/clipPath>/g, "");

  const pathsAsString = paths.trim();

  // Split paths into individual path elements
  const pathElements = pathsAsString.split(/<\/path>/).filter(Boolean);

  const svgPathDataArray: SVGPathInfo[] = pathElements.map(element => {
    const dMatch = element.match(/ d="([^"]+)"/);
    const clipRuleMatch = element.match(/ clip-rule="([^"]+)"/);
    const fillRuleMatch = element.match(/ fill-rule="([^"]+)"/);
    const xlinkHrefMatch = element.match(/ xlink:href="([^"]+)"/);

    const pathData: SVGPathInfo = {
      d: dMatch ? (dMatch[1] ?? "") : "",
    };

    if (clipRuleMatch?.[1]) pathData.clipRule = clipRuleMatch[1];
    if (fillRuleMatch?.[1]) pathData.fillRule = fillRuleMatch[1];
    if (xlinkHrefMatch?.[1]) pathData.xlinkHref = xlinkHrefMatch[1];

    return pathData;
  });

  return svgPathDataArray;
};

const generatePaths = async () => {
  console.log("> generating paths...");

  await ensureDirExists(pathsTempDir);
  await fs.writeFile(pathsJSONFile, "{", { encoding: "utf-8" });

  const svgs = await globAsync(path.join(iconsDir, "**/*.svg"));

  for (let i = 0; i < svgs.length; i++) {
    const svg = svgs[i]!;
    const normalizedPath = path.normalize(svg);
    const pathInfo = path.parse(normalizedPath);

    const data = await fs.readFile(svg, { encoding: "utf-8" });
    const pathsInfo = extractPathsInfo(data);

    const name = toPascalCase(pathInfo.name, "-");
    const shouldAttachComma = i !== 0;

    const iconInfo: SVGIconInfo = {
      pascalName: name,
      kebabName: pathInfo.name,
      paths: pathsInfo,
    };

    await fs.appendFile(
      pathsJSONFile,
      `${shouldAttachComma ? "," : ""}\n"${name}": ${JSON.stringify(
        iconInfo,
        null,
        2,
      )}`,
      { encoding: "utf-8" },
    );
  }

  await fs.appendFile(pathsJSONFile, "\n}", { encoding: "utf-8" });
};

const generateComponents = async () => {
  console.log("> generating components...");

  const pathsData = await fs.readFile(pathsJSONFile, { encoding: "utf-8" });
  const pathsJSON = JSON.parse(pathsData) as Record<string, SVGIconInfo>;

  const generateWebComponents = async () => {
    console.log("> generating web components...");

    await ensureDirExists(webDistDir);
    await ensureDirExists(webTempDir);

    const webIconTemplate = await fs.readFile(
      path.join(templatesDir, "web-icon.txt"),
      { encoding: "utf-8" },
    );

    const names = Object.keys(pathsJSON);

    for (const name of names) {
      const iconInfo = pathsJSON[name]!;

      const paths = iconInfo.paths.map(
        ({ d, clipRule, fillRule, xlinkHref }) => {
          const props = [
            `d=${d}`,
            clipRule ? `clip-rule=${clipRule}` : null,
            fillRule ? `fill-rule=${fillRule}` : null,
            xlinkHref ? `xlink:href=${xlinkHref}` : null,
          ];

          return `<path ${props.filter(Boolean).join(" ")} />`;
        },
      );

      const webIcon = Mustache.render(webIconTemplate, {
        name,
        paths: paths.join(),
        elementTag: iconInfo.kebabName,
      });

      console.log(webIcon);
    }
  };

  const generateReactComponents = async () => {
    console.log("> generating react components...");

    await ensureDirExists(reactDistDir);
    await ensureDirExists(reactTempDir);
  };

  return Promise.all([generateWebComponents(), generateReactComponents()]);
};

const createModulePackages = async () => {
  console.log("> creating module packages...");

  const moduleDirectories = globAsync
    .sync(path.join(distDir, "**/index.ts"))
    .map(p => path.dirname(p));

  for (const moduleDirectory of moduleDirectories) {
    const typesPath = path.join(moduleDirectory, "index.d.ts");
    const typesExist = await doesFileExist(typesPath);

    const packageJsonPath = path.join(moduleDirectory, "package.json");

    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(
        {
          sideEffects: false,
          types: typesExist ? "./index.d.ts" : undefined,
          main: "./index.js",
        },
        null,
        2,
      ),
    );
  }
};

const makePublishable = async () => {};

void (async () => {
  console.time("build");
  await execCmd(["shx", "rm", "-rf", distDir].join(" "));
  await generatePaths();
  await generateComponents();
  // await createModulePackages();
  // await makePublishable();
  // await createMainPackage(packageDir, distPath);
  // await createNPMRC(distPath);
  console.timeEnd("build");
})();
/* eslint-enable no-console */
