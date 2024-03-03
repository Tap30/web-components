import { esbuildPlugin } from '@web/dev-server-esbuild';

export default /** @type {import('@web/test-runner').TestRunnerConfig} */ ({
  files: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true })],
});
