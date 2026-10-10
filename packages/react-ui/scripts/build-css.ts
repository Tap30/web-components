import cssnano from "cssnano";
import { globby } from "globby";
import { createHash } from "node:crypto";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import postcss, { type Plugin } from "postcss";
import postcssModules from "postcss-modules";
import { getFileMeta } from "../../../scripts/utils.ts";

/**
 * Turns the CSS modules under `src/` into shippable output.
 *
 * `tsc` neither emits CSS nor knows what a CSS module is, so both halves of the
 * transform happen here: the stylesheet's class names are scoped, and the
 * component's `import styles from "./button.module.css"` is replaced with the
 * names it resolves to, inlined.
 *
 * WHY THE TRANSFORM CANNOT BE LEFT TO THE CONSUMER'S BUNDLER: the package ships
 * an aggregate `dist/styles.css`. If each consumer scoped the stylesheet
 * themselves, every consumer would generate different class names, and the
 * aggregate would match none of them. Scoping once, here, is what keeps the
 * aggregate and the components in agreement.
 *
 * What ships is JS plus ONE stylesheet:
 *
 * - `dist/styles.css` — every scoped stylesheet concatenated. A consumer
 *   imports it once, at the root of their app:
 *
 *       import "@tapsioss/react-ui/styles.css";
 *
 * THE EMITTED JS IMPORTS NO CSS. This is deliberate (the same model as
 * Mantine): a `.css` import inside a published `.js` file breaks plain Node
 * (`ERR_UNKNOWN_FILE_EXTENSION`), test runners without a CSS transform, and
 * Next.js's Pages Router, which refuses global CSS imported from
 * `node_modules`. With the stylesheet as a separate, explicit import, the JS is
 * plain JS everywhere, and the styles are in the first server-rendered
 * response with no runtime injection. Do not add a stylesheet import back to
 * the emitted JS.
 *
 * The name map is a BUILD-TIME artifact and is NOT shipped: it is inlined into
 * the JS that uses it, which is what a bundler would do.
 *
 * Comments are stripped. The stylesheets carry long notes on what Figma binds,
 * where the token export falls short and why a rule is written the way it is —
 * useful to whoever edits them, and not something to publish.
 */

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const srcDir = path.join(packageDir, "src");
const distDir = path.join(packageDir, "dist");

/** How many base64url characters of the digest to keep. */
const HASH_LENGTH = 5;

/**
 * A default import of a CSS module, as `tsc` emits it — the whole statement, on
 * its own line, with the binding captured.
 *
 * Anchored to the start of a line (`m`) because the statement has to be the
 * first thing on it. Without the anchor this also matches the specifier inside
 * a JSDoc `@example` block, whose lines begin with ` * `.
 */
/** The trailing comment `tsc` adds to a file it emitted a source map for. */
const SOURCE_MAP_COMMENT = /\n\/\/# sourceMappingURL=\S+\s*$/;

const DEFAULT_IMPORT =
  /^import\s+(\w+)\s+from\s*["'](\.{1,2}\/[^"']*?)\.module\.css["'];?[ \t]*$/gm;

/**
 * The same, for a stylesheet imported only for its side effect. The emitted JS
 * imports no CSS, so this statement is removed outright.
 */
const BARE_IMPORT =
  /^import\s*["'](\.{1,2}\/[^"']*?)\.module\.css["'];?[ \t]*$/gm;

/**
 * Scoped names are `<local>_<hash>`: opaque enough that nothing outside the
 * package can depend on them, readable enough to recognise in devtools.
 *
 * The digest is taken over the stylesheet's path RELATIVE to `src` plus the
 * local name — not the file's contents — so it is identical on every machine
 * and does not churn every time a declaration is edited. Two stylesheets may
 * use the same local name without colliding, which is the point of scoping.
 *
 * `base64url` is used because its alphabet (`A-Za-z0-9_-`) is entirely valid in
 * a CSS identifier, unlike standard base64's `+` and `/`.
 */
const generateScopedName = (localName: string, filePath: string) => {
  const id = `${path.relative(srcDir, filePath)}|${localName}`;
  const hash = createHash("sha256")
    .update(id)
    .digest("base64url")
    .slice(0, HASH_LENGTH);

  return `${localName}_${hash}`;
};

/**
 * Source comments are for whoever maintains the stylesheet, not for consumers.
 *
 * This runs after `postcss-modules` so a comment cannot affect scoping, and the
 * blank lines the removed nodes leave behind are collapsed when the result is
 * stringified.
 */
const discardComments = (): Plugin => ({
  postcssPlugin: "discard-comments",
  OnceExit: root => {
    root.walkComments(comment => {
      comment.remove();
    });
  },
});

type ScopedStylesheet = {
  /** `src/button/button.module.css` -> `button/button` */
  stem: string;
  /** The stylesheet with every local name replaced by its scoped name. */
  css: string;
  /** Written name -> scoped name. */
  exports: Record<string, string>;
};

const writeFile = async (target: string, contents: string) => {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, contents, "utf8");
};

const scopeAll = async (): Promise<ScopedStylesheet[]> => {
  const sources = (await globby(path.join(srcDir, "**/*.module.css"))).sort();

  if (sources.length === 0) {
    throw new Error(
      `No CSS modules found under ${srcDir}. Components import their own ` +
        `stylesheets, so an empty result means the build would ship broken imports.`,
    );
  }

  return Promise.all(
    sources.map(async source => {
      let exports: Record<string, string> = {};

      const result = await postcss([
        postcssModules({
          generateScopedName,
          // Taken from the callback rather than from a file on disk, so nothing
          // temporary is written next to the sources.
          getJSON: (_, json) => {
            exports = json;
          },
        }),
        discardComments(),
      ]).process(await fs.readFile(source, "utf8"), { from: source });

      return {
        stem: path.relative(srcDir, source).replace(/\.module\.css$/, ""),
        // Removing a comment node leaves the whitespace that preceded it.
        css: `${result.css.replace(/\n{3,}/g, "\n\n").trim()}\n`,
        exports,
      };
    }),
  );
};

/**
 * Writes the one stylesheet that ships: every component's, concatenated and
 * minified.
 *
 * Every consumer downloads this file whole, whichever components they use, so
 * its size is a cost the package imposes — hence the minification. It runs on
 * the CONCATENATED sheet, not per component, so identical rules can be merged
 * across components.
 *
 * `cssnano`'s default preset only: it is the set of transforms that are safe
 * without knowing the markup. It does not rename class names, keyframes or
 * custom properties, so the scoped names inlined into the JS still match and
 * `--tds-*` stays the public surface it is.
 */
const writeStylesheet = async (stylesheets: ScopedStylesheet[]) => {
  const source = stylesheets.map(({ css }) => css.trim()).join("\n\n");

  const { css } = await postcss([cssnano({ preset: "default" })]).process(
    source,
    // There is no single source file, and no map is shipped.
    { from: undefined, map: false },
  );

  await writeFile(path.join(distDir, "styles.css"), `${css}\n`);

  return { before: source.length, after: css.length };
};

/**
 * Replaces each CSS module import in the emitted JS with the scoped names it
 * resolves to — and nothing else. No stylesheet import is left behind; see the
 * header for why.
 */
const inlineClassNames = async (stylesheets: ScopedStylesheet[]) => {
  const byStem = new Map(stylesheets.map(sheet => [sheet.stem, sheet]));

  /** `dist/button/button.js` + `./button` -> `button/button` */
  const stemFor = (jsFile: string, specifier: string) =>
    path
      .relative(distDir, path.resolve(path.dirname(jsFile), specifier))
      .split(path.sep)
      .join("/");

  const jsFiles = await globby(path.join(distDir, "**/*.js"));

  let inlined = 0;

  for (const jsFile of jsFiles) {
    const source = await fs.readFile(jsFile, "utf8");
    const missing: string[] = [];

    let next = source.replace(
      DEFAULT_IMPORT,
      (whole, binding: string, specifier: string) => {
        const sheet = byStem.get(stemFor(jsFile, specifier));

        if (!sheet) {
          missing.push(specifier);

          return whole;
        }

        // ONE line, replacing one line: `tsc`'s source map for this file
        // was computed before this rewrite, and every line after the import
        // must stay where the map says it is.
        return `const ${binding} = ${JSON.stringify(sheet.exports)};`;
      },
    );

    // Replaced with nothing but the line itself kept, for the same source-map
    // reason as above.
    next = next.replace(BARE_IMPORT, "");

    if (missing.length > 0) {
      throw new Error(
        `${path.relative(distDir, jsFile)} imports ${missing.join(", ")}, ` +
          `which did not come from a stylesheet under src/. The emitted code ` +
          `would keep an import that resolves to nothing.`,
      );
    }

    if (next !== source) {
      await fs.writeFile(jsFile, next, "utf8");
      inlined += 1;
    }
  }

  return inlined;
};

/**
 * Removes the `//# sourceMappingURL` comment from every emitted file, keeping
 * the `.js.map` files themselves.
 *
 * The maps exist for `@tapsioss/react-ui`'s coverage report: the test
 * playground bundles `dist`, and maps it back to `src` through them. They are
 * NOT shipped (`files` excludes them — what ships is only CSS and JS), so a
 * published file pointing at its map would point at nothing and make every
 * consumer's bundler warn. The playground finds a map by its `<file>.map` name
 * instead.
 */
const detachSourceMaps = async () => {
  const jsFiles = await globby(path.join(distDir, "**/*.js"));

  for (const jsFile of jsFiles) {
    const source = await fs.readFile(jsFile, "utf8");
    const next = source.replace(SOURCE_MAP_COMMENT, "");

    if (next !== source) await fs.writeFile(jsFile, next, "utf8");
  }
};

void (async () => {
  console.time("build-css");

  const stylesheets = await scopeAll();

  const size = await writeStylesheet(stylesheets);

  const inlined = await inlineClassNames(stylesheets);

  await detachSourceMaps();

  console.log(
    `✅ scoped ${String(stylesheets.length)} CSS module(s), wrote ` +
      `dist/styles.css (${String(size.after)} bytes, minified from ` +
      `${String(size.before)}), inlined class names into ` +
      `${String(inlined)} file(s)`,
  );
  console.timeEnd("build-css");
})();
