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
const iconsDir = path.join(packageDir, "src");
const distDir = path.join(packageDir, "dist");
const templatesDir = path.join(packageDir, "templates");

const pathsJSONFile = path.join(distDir, "paths.json");
const entryFile = path.join(distDir, "index.ts");
const entryTemplate = path.join(templatesDir, "entry.txt");
const tsconfigFile = path.join(packageDir, "tsconfig.build.json");

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

  await ensureDirExists(distDir);
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

  const entryTemplateStr = await fs.readFile(entryTemplate, {
    encoding: "utf-8",
  });

  const entryCode = Mustache.render(entryTemplateStr, {});

  await fs.writeFile(entryFile, entryCode, { encoding: "utf-8", flag: "w" });
  await execCmd(["tsc", "--project", tsconfigFile].join(" "));
  await execCmd(["shx", "rm", entryFile].join(" "));
};

const createModulePackages = async () => {
  console.log("> creating module packages...");

  const moduleDirectories = globAsync
    .sync(path.join(distDir, "**/index.js"))
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
          type: "module",
        },
        null,
        2,
      ),
    );
  }
};

void (async () => {
  console.time("build");
  await execCmd(["shx", "rm", "-rf", distDir].join(" "));
  await generatePaths();
  await createModulePackages();
  console.timeEnd("build");
})();
/* eslint-enable no-console */
