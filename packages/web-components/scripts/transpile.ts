/* eslint-disable no-console */
import { exec } from "node:child_process";
import { promisify } from "node:util";

const transpile = async (config: {
  tsconfigPath: string;
  distDir: string;
  watch: boolean;
}) => {
  const execCmd = promisify(exec);
  const { distDir, tsconfigPath, watch } = config;

  if (watch) console.log(`👀 watching input files...`);
  else console.log(`👾 transpiling...`);

  await execCmd(["shx", "rm", "-rf", distDir].join(" "));

  const { stderr, stdout } = await execCmd(
    ["tsc", watch ? "--watch" : "", "--project", tsconfigPath].join(" "),
  );

  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);

  console.log(`✅ transpilation completed.`);
};

export default transpile;
/* eslint-enable no-console */
